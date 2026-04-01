'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/lib/contexts/UserContext';

export default function ProfilePage() {
  const { user, loading: userLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!userLoading && !user) {
      router.push('/login');
    }
  }, [user, userLoading, router]);

  if (userLoading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <h1 className="text-4xl font-serif text-stone-900 mb-8">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-6">
              <h2 className="text-xl font-serif text-stone-900 mb-6 border-b border-stone-100 pb-4">Account Information</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">Name</p>
                  <p className="font-medium text-stone-900 text-lg">{user.name || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">Email</p>
                  <p className="font-medium text-stone-900 text-lg">{user.email}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">Phone</p>
                  <p className="font-medium text-stone-900 text-lg">{user.phone || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-6">
              <h2 className="text-xl font-serif text-stone-900 mb-4 border-b border-stone-100 pb-4">Welcome back</h2>
              <p className="text-stone-600 leading-relaxed mb-6">
                Mindspring is here to support your child’s emotional wellbeing and development journey. Explore our therapy services or reach out to book a session.
              </p>
              <div className="grid gap-4">
                <Link href="/appointments" className="btn btn-primary w-full text-center">
                  Schedule an Appointment
                </Link>
                <Link href="/therapy" className="btn btn-secondary w-full text-center">
                  Explore Therapy Services
                </Link>
                <Link href="/contact" className="btn btn-ghost w-full text-center">
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
