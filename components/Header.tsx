"use client";

import Link from 'next/link';
import { useUser } from '@/lib/contexts/UserContext';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const { user, loading, logout } = useUser();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Therapy', href: '/therapy' },
    ...(user ? [{ name: 'Appointments', href: '/appointments' }] : []),
    { name: 'Help', href: '/help' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <div className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-6">
              <button className="md:hidden p-2 rounded-full hover:bg-slate-100 transition-colors" onClick={() => setOpen(!open)} aria-label="menu">
                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <Link href="/" className="text-3xl font-serif font-bold text-slate-900 tracking-tight hover:opacity-80 transition-opacity">
                Mindspring
              </Link>

              <nav className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm font-medium uppercase tracking-widest text-slate-500 hover:text-primary-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-5">
              {loading ? (
                <div className="w-24 h-6 bg-slate-100 animate-pulse rounded-full"></div>
              ) : user ? (
                <>
                  <Link
                    href="/profile"
                    className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
                  >
                    My Profile
                  </Link>
                  {user.isAdmin && (
                    <Link
                      href="/admin/dashboard"
                      className="text-xs font-bold uppercase tracking-wider text-primary-600 hover:text-primary-700 border border-primary-200 px-3 py-1 rounded-full hover:bg-primary-50 transition-all"
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="hidden md:flex items-center gap-4">
                  <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">
                    Log In
                  </Link>
                  <Link href="/signup" className="btn btn-primary text-sm px-5 py-2">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {open && (
          <div className="md:hidden border-t border-slate-200 bg-white py-4">
            <nav className="flex flex-col gap-1 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-600 font-medium"
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-slate-100 my-2" />
              {user ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-600 font-medium"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      setOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-600 font-medium"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-600 font-medium"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 rounded-lg hover:bg-slate-50 text-slate-600 font-medium"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
  );
}
