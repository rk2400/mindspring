'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, logout as apiLogout } from '@/lib/api-client';
import toast from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  isAdmin?: boolean;
  address?: {
    full?: string;
    street?: string;
    city?: string;
    state?: string;
    pincode?: string;
  } | null;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Decode a JWT payload in-browser (no verification)
  const decodeJwt = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  };

  const checkUser = useCallback(async (showLoading = false) => {
    if (showLoading) {
      setLoading(true);
    }
    try {
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (error) {
      // If the API call failed, fall back to checking the token cookie (admin logins)
      const tokenCookie = document.cookie
        .split(';')
        .map((c) => c.trim())
        .find((c) => c.startsWith('token='));

      if (tokenCookie) {
        const token = tokenCookie.split('=')[1];
        const payload = decodeJwt(token);
        if (payload?.type === 'admin') {
          setUser({
            id: payload.adminId || '',
            name: '',
            email: payload.email || '',
            phone: '',
            isAdmin: true,
          });
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const refreshUser = async () => {
    setLoading(true);
    await checkUser(false);
  };

  const logout = async () => {
    try {
      await apiLogout();
      setUser(null);
      toast.success('Logged out successfully');
      router.push('/');
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || 'Failed to logout');
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, logout, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

