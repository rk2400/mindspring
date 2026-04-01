'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminHeader from '@/components/AdminHeader';
import { getAdminUser, getAdminUserAppointments, updateAdminUser } from '@/lib/api-client';
import toast from 'react-hot-toast';

export default function AdminUserProfilePage() {
  const params = useParams();
  const router = useRouter();
  const userId = params?.id as string;
  const [user, setUser] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [adminNotes, setAdminNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    async function loadUserProfile() {
      setLoading(true);
      try {
        const [userData, appointmentsData] = await Promise.all([
          getAdminUser(userId),
          getAdminUserAppointments(userId),
        ]);
        setUser(userData);
        setAppointments(appointmentsData);
        setAdminNotes(userData.adminNotes || '');
      } catch (error: any) {
        if (error.message.includes('Unauthorized') || error.message.includes('Admin')) {
          router.push('/admin/login');
        } else {
          toast.error(error.message || 'Unable to load user profile');
        }
      } finally {
        setLoading(false);
      }
    }

    loadUserProfile();
  }, [userId, router]);

  const formatDateTime = (date: string, time: string) => {
    return `${new Date(date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} at ${time}`;
  };

  const handleSaveNotes = async () => {
    if (!user?._id) return;

    setSavingNotes(true);
    try {
      const updatedUser = await updateAdminUser(user._id, { adminNotes });
      setUser(updatedUser);
      setAdminNotes(updatedUser.adminNotes || '');
      toast.success('Admin notes saved');
    } catch (error: any) {
      toast.error(error.message || 'Unable to save admin notes');
    } finally {
      setSavingNotes(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading profile...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50">
        <AdminHeader />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="rounded-3xl bg-white p-10 border border-slate-200 shadow-sm text-center">
            <p className="text-xl font-semibold text-slate-900">User profile not found.</p>
            <Link href="/admin/users" className="mt-6 inline-flex rounded-full bg-primary-600 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-700">
              Back to users
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-primary-600 font-semibold">User profile</p>
            <h1 className="mt-3 text-4xl font-bold text-slate-900">{user.name || 'Unnamed user'}</h1>
            <p className="mt-2 text-slate-600">Review this user’s bookings, account status, and recent appointment history.</p>
          </div>
          <Link href="/admin/users" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Back to users
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.1fr] mb-8">
          <div className="space-y-6">
            <div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Account details</h2>
              <div className="space-y-4 text-sm text-slate-700">
              <div>
                <p className="text-slate-500">Name</p>
                <p className="mt-1 font-semibold text-slate-900">{user.name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-slate-500">Email</p>
                <p className="mt-1 font-semibold text-slate-900">{user.email}</p>
              </div>
              <div>
                <p className="text-slate-500">Phone</p>
                <p className="mt-1 font-semibold text-slate-900">{user.phone || 'N/A'}</p>
              </div>
              <div>
                <p className="text-slate-500">Joined</p>
                <p className="mt-1 font-semibold text-slate-900">{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-slate-500">Status</p>
                <p className={`mt-1 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${user.locked ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  {user.locked ? 'Locked' : 'Active'}
                </p>
              </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">Admin notes</h2>
                  <p className="mt-2 text-sm text-slate-600">Visible only to admins on this user profile.</p>
                </div>
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  disabled={savingNotes}
                  className="inline-flex rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {savingNotes ? 'Saving...' : 'Save notes'}
                </button>
              </div>
              <textarea
                value={adminNotes}
                onChange={(event) => setAdminNotes(event.target.value)}
                rows={8}
                maxLength={2000}
                placeholder="Add private notes about this user for the admin team..."
                className="mt-5 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
              <p className="mt-2 text-xs text-slate-500">{adminNotes.length}/2000 characters</p>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Recent bookings</h2>
            {appointments.length === 0 ? (
              <div className="rounded-3xl bg-slate-50 p-6 text-center text-slate-500">No bookings have been created for this user yet.</div>
            ) : (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment._id} className="rounded-3xl bg-slate-50 p-4 border border-slate-200">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{appointment.therapyType}</p>
                        <p className="mt-2 text-sm text-slate-600">{formatDateTime(appointment.preferredDate, appointment.preferredTime)}</p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${appointment.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-700' : appointment.status === 'COMPLETED' ? 'bg-slate-100 text-slate-700' : appointment.status === 'REQUESTED' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                        {appointment.status}
                      </span>
                    </div>
                    {appointment.notes ? <p className="mt-3 text-sm text-slate-600">Notes: {appointment.notes}</p> : null}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
