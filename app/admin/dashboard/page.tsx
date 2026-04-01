'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminHeader from '@/components/AdminHeader';
import { getAdminAppointments, getAdminStats } from '@/lib/api-client';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [statsData, appointmentsData] = await Promise.all([getAdminStats(), getAdminAppointments()]);
        setStats(statsData);
        setAppointments(appointmentsData);
      } catch (error: any) {
        if (error.message.includes('Unauthorized') || error.message.includes('Admin')) {
          router.push('/admin/login');
        } else {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, [router]);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const currentMonthAppointments = appointments.filter((appointment) => {
    const date = new Date(appointment.preferredDate);
    return date.getFullYear() === currentYear && date.getMonth() === currentMonth;
  });

  const currentMonthDays = Array.from(
    { length: new Date(currentYear, currentMonth + 1, 0).getDate() },
    (_, index) => {
      const date = new Date(currentYear, currentMonth, index + 1);
      const dayLabel = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
      const dateKey = date.toISOString().slice(0, 10);
      const count = appointments.filter((appointment) => appointment.preferredDate === dateKey).length;
      return { date, dayLabel, count, dateKey };
    }
  );

  const upcomingAppointments = appointments
    .slice()
    .sort((a, b) => new Date(a.preferredDate).getTime() - new Date(b.preferredDate).getTime())
    .slice(0, 6);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-primary-600 font-semibold">Admin dashboard</p>
              <h1 className="mt-3 text-4xl font-bold text-slate-900">Mindspring Admin</h1>
              <p className="mt-4 max-w-2xl text-slate-600">
                Manage appointments, support users, and keep session scheduling organized from one place.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/admin/appointments" className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-700">
                View appointments
              </Link>
              <Link href="/admin/users" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                View users
              </Link>
            </div>
          </div>
        </div>

        {stats && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 mb-8">
            <div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm">
              <p className="text-sm text-slate-500">Total users</p>
              <p className="mt-3 text-3xl font-bold text-primary-600">{stats.totalUsers}</p>
            </div>
            <div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm">
              <p className="text-sm text-slate-500">Appointments this month</p>
              <p className="mt-3 text-3xl font-bold text-cyan-600">{currentMonthAppointments.length}</p>
            </div>
            <div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm">
              <p className="text-sm text-slate-500">Pending requests</p>
              <p className="mt-3 text-3xl font-bold text-amber-600">{stats.appointmentsByStatus?.REQUESTED || 0}</p>
            </div>
            <div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm">
              <p className="text-sm text-slate-500">Confirmed sessions</p>
              <p className="mt-3 text-3xl font-bold text-emerald-600">{stats.appointmentsByStatus?.CONFIRMED || 0}</p>
            </div>
          </div>
        )}

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.95fr]">
          <section className="space-y-6">
            <div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Upcoming appointments</h2>
              <p className="mt-4 text-slate-500 mb-6">A quick view of the next booked sessions and the users who requested them.</p>
              <div className="space-y-4">
                {upcomingAppointments.length === 0 ? (
                  <div className="rounded-3xl bg-slate-50 p-6 text-center text-slate-500">
                    No upcoming appointments have been scheduled yet.
                  </div>
                ) : (
                  upcomingAppointments.map((appointment) => {
                    const user = typeof appointment.userId === 'string' ? { name: appointment.userId, email: '' } : appointment.userId || { name: 'Unknown client', email: '' };
                    return (
                      <div key={appointment._id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                          <div className="space-y-2">
                            <p className="text-sm text-slate-500">{new Date(appointment.preferredDate).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} · {appointment.preferredTime}</p>
                            <h3 className="text-lg font-semibold text-slate-900">{appointment.therapyType}</h3>
                            <p className="text-sm text-slate-600">{user.name}{user.email ? ` • ${user.email}` : ''}</p>
                          </div>
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${appointment.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-700' : appointment.status === 'COMPLETED' ? 'bg-slate-100 text-slate-700' : appointment.status === 'REQUESTED' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                            {appointment.status}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Recent user requests</h2>
              <div className="grid gap-4">
                {appointments.slice(0, 4).map((appointment) => {
                  const user = typeof appointment.userId === 'string' ? { name: appointment.userId, email: '' } : appointment.userId || { name: 'Unknown client', email: '' };
                  return (
                    <div key={appointment._id} className="rounded-3xl bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-[0.35em] text-slate-500 font-semibold">{user.name}</p>
                      <p className="mt-2 text-sm text-slate-700">{user.email || 'No email available'}</p>
                      <p className="mt-3 text-sm text-slate-600">{appointment.therapyType} • {appointment.preferredDate} at {appointment.preferredTime}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Bookings by date</h2>
              <div className="space-y-3">
                {currentMonthAppointments.length === 0 ? (
                  <div className="rounded-3xl bg-slate-50 p-5 text-center text-slate-500">No appointments booked for this month yet.</div>
                ) : (
                  currentMonthAppointments.slice(0, 6).map((appointment) => (
                    <div key={appointment._id} className="rounded-3xl bg-slate-50 p-4 border border-slate-200">
                      <p className="text-xs uppercase tracking-[0.35em] text-slate-500 font-semibold">{new Date(appointment.preferredDate).toLocaleDateString(undefined, { weekday: 'short' })} · {appointment.preferredDate}</p>
                      <p className="mt-2 text-sm font-semibold text-slate-900">{appointment.therapyType}</p>
                      <p className="text-sm text-slate-600">{appointment.preferredTime} • {typeof appointment.userId === 'string' ? 'Unknown client' : appointment.userId?.name || appointment.userId?.email}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {stats && stats.appointmentsByStatus && (
              <div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-900 mb-4">Appointments by status</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Requested</p>
                    <p className="mt-2 text-3xl font-bold text-amber-600">{stats.appointmentsByStatus.REQUESTED || 0}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Confirmed</p>
                    <p className="mt-2 text-3xl font-bold text-emerald-600">{stats.appointmentsByStatus.CONFIRMED || 0}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Completed</p>
                    <p className="mt-2 text-3xl font-bold text-slate-900">{stats.appointmentsByStatus.COMPLETED || 0}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Cancelled</p>
                    <p className="mt-2 text-3xl font-bold text-red-600">{stats.appointmentsByStatus.CANCELLED || 0}</p>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}

