'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { getAppointments } from '@/lib/api-client';
import { useUser } from '@/lib/contexts/UserContext';

export default function ProfilePage() {
  const { user, loading: userLoading } = useUser();
  const router = useRouter();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);

  useEffect(() => {
    if (!userLoading && !user) {
      router.push('/login');
    }
  }, [user, userLoading, router]);

  useEffect(() => {
    if (userLoading || !user) {
      return;
    }

    async function loadAppointments() {
      try {
        const result = await getAppointments();
        setAppointments(result);
      } catch (error: any) {
        toast.error(error.message || 'Unable to load appointments');
      } finally {
        setAppointmentsLoading(false);
      }
    }

    loadAppointments();
  }, [user, userLoading]);

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

  const formatDateTime = (date: string, time: string) =>
    `${new Date(date).toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })} at ${time}`;

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

          <div className="lg:col-span-2 space-y-8">


            <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-6">
              <div className="flex items-center justify-between gap-4 border-b border-stone-100 pb-4">
                <div>
                  <h2 className="text-xl font-serif text-stone-900">My Appointments</h2>
                  <p className="mt-1 text-sm text-stone-500">Track your upcoming and past session requests in one place.</p>
                </div>
                <Link href="/appointments" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                  Book new
                </Link>
              </div>

              {appointmentsLoading ? (
                <div className="py-10 text-center text-stone-500">Loading appointments...</div>
              ) : appointments.length === 0 ? (
                <div className="py-10 text-center text-stone-500">
                  No appointments yet. Your future therapy sessions will appear here once booked.
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment._id} className="rounded-xl border border-stone-200 bg-stone-50 p-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-base font-semibold text-stone-900">{appointment.therapyType}</p>
                          <p className="mt-1 text-sm text-stone-600">
                            {formatDateTime(appointment.preferredDate, appointment.preferredTime)}
                          </p>
                          {appointment.duration ? (
                            <p className="mt-1 text-sm text-stone-500">Duration: {appointment.duration}</p>
                          ) : null}
                        </div>
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            appointment.status === 'CONFIRMED'
                              ? 'bg-emerald-100 text-emerald-700'
                              : appointment.status === 'COMPLETED'
                                ? 'bg-slate-200 text-slate-700'
                                : appointment.status === 'REQUESTED'
                                  ? 'bg-amber-100 text-amber-700'
                                  : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </div>

                      {appointment.notes ? (
                        <div className="mt-4 rounded-lg bg-white px-4 py-3 border border-stone-200">
                          <p className="text-xs font-medium uppercase tracking-wider text-stone-400">Your notes</p>
                          <p className="mt-2 text-sm text-stone-600">{appointment.notes}</p>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}
