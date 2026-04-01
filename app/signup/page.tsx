'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import AuthTabs from '@/components/AuthTabs';
import { createAccount, login } from '@/lib/api-client';
import toast from 'react-hot-toast';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function validatePhone(phone: string): boolean {
    return /^[6-9]\d{9}$/.test(phone);
  }

  function validateForm(): boolean {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Phone must be 10 digits starting with 6, 7, 8, or 9';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const res = await createAccount(formData.name, formData.email, formData.phone);
      await login(formData.email, 'signup');
      toast.success('Account created! We sent a verification OTP to your email.');
      router.push(`/login?email=${encodeURIComponent(formData.email)}&step=otp`);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1604881991720-f91add269bed?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          fill
          className="object-cover"
          quality={90}
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority alt={''}        />
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900/95 via-stone-900/75 to-stone-900/30" />
        <div className="absolute inset-0 flex flex-col justify-between p-12 text-white">
          <div className="flex items-center justify-between gap-4">
            {/* <Link href="/" className="text-2xl font-serif tracking-wide">Mindspring</Link> */}
            <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/80 shadow-sm">
              Child-centred care
            </span>
          </div>
          <div className="max-w-md space-y-6">
            <div className="rounded-[28px] border border-white/15 bg-white/10 p-8 shadow-[0_28px_80px_rgba(15,23,42,0.24)] backdrop-blur-xl">
              <h2 className="text-4xl font-serif mb-4 text-white">Join our supportive community</h2>
              <p className="text-stone-200 text-lg">Create an account to receive service updates, appointment details, and child development insights.</p>
            </div>
            <div className="grid gap-3 text-sm text-white/80">
              <p className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                Expert guidance
              </p>
   
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-serif text-stone-900">Create Account</h1>
            <p className="text-stone-500 mt-2">Sign up for a free account to get started.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
                className={`w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:border-primary-500 transition-colors ${errors.name ? 'border-red-500' : 'border-stone-200'}`}
                placeholder="Jane Doe"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                className={`w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:border-primary-500 transition-colors ${errors.email ? 'border-red-500' : 'border-stone-200'}`}
                placeholder="name@example.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) });
                  if (errors.phone) setErrors({ ...errors, phone: '' });
                }}
                className={`w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:border-primary-500 transition-colors ${errors.phone ? 'border-red-500' : 'border-stone-200'}`}
                placeholder="9876543210"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary py-3"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="pt-6 text-center text-sm text-stone-500">
            Already have an account?{' '}
            <Link href="/login" className="text-primary-600 font-medium hover:text-primary-700 underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
