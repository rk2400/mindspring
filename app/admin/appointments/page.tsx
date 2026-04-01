'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import AdminHeader from '@/components/AdminHeader';
import { createAdminAppointment, getAdminAppointments, getAdminUsers, updateAppointmentStatus } from '@/lib/api-client';
import toast from 'react-hot-toast';

const therapyOptions = [
  'Speech Therapy',
  'Occupational Therapy',
  'ABA Therapy',
  'Special Education',
  'Sensory Integration',
  'Cognitive Skills Training',
] as const;

interface Appointment {
  _id: string;
  therapyType: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  duration?: string;
  adminNote?: string;
  status: string;
  userId: {
    _id?: string;
    name?: string;
    email?: string;
  } | string;
  createdAt: string;
}

const statusOptions = ['REQUESTED', 'CONFIRMED', 'COMPLETED', 'CANCELLED'] as const;

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [bookTherapyType, setBookTherapyType] = useState<string>(therapyOptions[0]);
  const [bookDate, setBookDate] = useState('');
  const [bookTime, setBookTime] = useState('');
  const [duration, setDuration] = useState('60 minutes');
  const [bookNotes, setBookNotes] = useState('');
  const [adminNoteCreate, setAdminNoteCreate] = useState('');
  const [booking, setBooking] = useState(false);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [noteValues, setNoteValues] = useState<Record<string, string>>({});
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    async function loadAdminData() {
      setLoading(true);
      try {
        const [appointmentData, usersData] = await Promise.all([getAdminAppointments(), getAdminUsers()]);
        setAppointments(appointmentData);
        setUsers(usersData);
        setNoteValues(
          appointmentData.reduce((acc: Record<string, string>, appointment: Appointment) => {
            acc[appointment._id] = appointment.adminNote || '';
            return acc;
          }, {})
        );
      } catch (error: any) {
        toast.error(error?.message || 'Unable to load appointments');
      } finally {
        setLoading(false);
      }
    }

    loadAdminData();
  }, []);

  const sortedAppointments = useMemo(() => {
    return appointments.slice().sort((a, b) => {
      const dateA = new Date(`${a.preferredDate}T${a.preferredTime}`);
      const dateB = new Date(`${b.preferredDate}T${b.preferredTime}`);
      return dateA.getTime() - dateB.getTime();
    });
  }, [appointments]);

  const handleStatusUpdate = async (appointmentId: string, status: string) => {
    setSavingId(appointmentId);
    try {
      const note = noteValues[appointmentId];
      const updated = await updateAppointmentStatus(appointmentId, status, note);
      setAppointments((current) => current.map((item) => (item._id === appointmentId ? updated : item)));
      setNoteValues((current) => ({
        ...current,
        [appointmentId]: updated.adminNote || current[appointmentId] || '',
      }));
      toast.success('Appointment status updated');
    } catch (error: any) {
      toast.error(error?.message || 'Unable to update status');
    } finally {
      setSavingId(null);
    }
  };

  const handleCreateAppointment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedUserId) {
      toast.error('Select a user before creating an appointment.');
      return;
    }
    if (!bookDate || !bookTime) {
      toast.error('Please provide both a date and time.');
      return;
    }

    setBooking(true);
    try {
      const appointment = await createAdminAppointment({
        userId: selectedUserId,
        therapyType: bookTherapyType,
        preferredDate: bookDate,
        preferredTime: bookTime,
        duration,
        notes: bookNotes,
        adminNote: adminNoteCreate,
      });
      setAppointments((current) => [...current, appointment]);
      setSelectedUserId('');
      setBookTherapyType(therapyOptions[0]);
      setBookDate('');
      setBookTime('');
      setDuration('60 minutes');
      setBookNotes('');
      setAdminNoteCreate('');
      toast.success('Appointment created successfully.');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to create appointment');
    } finally {
      setBooking(false);
    }
  };

  const formatDate = (value: string) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(new Date(value));
  };

  const formatFullDate = (value: string) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(value));
  };

  const getUserLabel = (appointment: Appointment) => {
    if (typeof appointment.userId === 'string') return appointment.userId;
    return appointment.userId?.name || appointment.userId?.email || 'Unknown client';
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Appointments</h1>
          <p className="mt-3 text-slate-600 max-w-3xl">
            Review all session requests, confirm availability, and keep your therapy schedule up to date. Update status anytime to keep users informed.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <aside className="space-y-6">
            <div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Create appointment</h2>
              <p className="mt-2 text-sm text-slate-500">Book a session for any user with a custom duration.</p>
              <form onSubmit={handleCreateAppointment} className="space-y-4">
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">User</span>
                  <select
                    value={selectedUserId}
                    onChange={(event) => setSelectedUserId(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-primary-500 focus:outline-none"
                    required
                  >
                    <option value="">Select a user</option>
                    {users.map((user) => (
                      <option key={user._id} value={user._id}>{`${user.name || 'No name'} (${user.email})`}</option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Therapy type</span>
                  <select
                    value={bookTherapyType}
                    onChange={(event) => setBookTherapyType(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-primary-500 focus:outline-none"
                  >
                    {therapyOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">Date</span>
                    <input
                      type="date"
                      min={today}
                      value={bookDate}
                      onChange={(event) => setBookDate(event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-primary-500 focus:outline-none"
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">Time</span>
                    <input
                      type="time"
                      value={bookTime}
                      onChange={(event) => setBookTime(event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-primary-500 focus:outline-none"
                      required
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Duration</span>
                  <input
                    type="text"
                    value={duration}
                    onChange={(event) => setDuration(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-primary-500 focus:outline-none"
                    placeholder="e.g. 60 minutes"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Admin note</span>
                  <textarea
                    rows={3}
                    value={adminNoteCreate}
                    onChange={(event) => setAdminNoteCreate(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-primary-500 focus:outline-none"
                    placeholder="Optional note for the client"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Session details</span>
                  <textarea
                    rows={3}
                    value={bookNotes}
                    onChange={(event) => setBookNotes(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-primary-500 focus:outline-none"
                    placeholder="Optional booking instructions"
                  />
                </label>

                <button
                  type="submit"
                  disabled={booking}
                  className="btn btn-primary w-full py-3 text-sm font-semibold"
                >
                  {booking ? 'Booking…' : 'Book appointment'}
                </button>
              </form>
            </div>

            <div className="rounded-3xl bg-white p-5 border border-slate-200 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Status overview</h2>
              <div className="mt-4 space-y-3">
                {statusOptions.map((status) => (
                  <div key={status} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                    <span className="text-sm font-medium text-slate-700">{status}</span>
                    <span className="text-sm font-semibold text-slate-900">{appointments.filter((appointment) => appointment.status === status).length}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-primary-700 font-semibold">Session schedule</p>
                  <h2 className="mt-3 text-2xl font-semibold text-slate-900">All bookings</h2>
                </div>
                <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-600">
                  <span className="font-semibold">Total</span>
                  <span>{sortedAppointments.length}</span>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="rounded-3xl bg-white border border-slate-200 p-8 text-center text-slate-500">Loading appointments…</div>
            ) : sortedAppointments.length === 0 ? (
              <div className="rounded-3xl bg-white border border-slate-200 p-8 text-center text-slate-500">No appointments have been scheduled yet.</div>
            ) : (
              <div className="space-y-5">
                {sortedAppointments.map((appointment) => (
                  <div key={appointment._id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                    <div className="grid gap-5 lg:grid-cols-[1.2fr_0.9fr]">
                      <div className="space-y-4">
                        <div className="rounded-3xl bg-white p-5 border border-slate-200">
                          <p className="text-xs uppercase tracking-[0.35em] text-slate-500 font-semibold">Session request</p>
                          <h3 className="mt-3 text-xl font-semibold text-slate-900">{appointment.therapyType}</h3>
                          <p className="mt-2 text-sm text-slate-600">{formatFullDate(appointment.preferredDate)} · {appointment.preferredTime}</p>
                          <p className="mt-3 text-sm text-slate-500">Requested on {new Date(appointment.createdAt).toLocaleString()}</p>
                        </div>

                        <div className="rounded-3xl bg-white p-5 border border-slate-200">
                          <p className="text-xs uppercase tracking-[0.35em] text-slate-500 font-semibold">Client information</p>
                          <p className="mt-3 text-sm font-semibold text-slate-900">{typeof appointment.userId === 'string' ? appointment.userId : appointment.userId?.name || 'Unknown client'}</p>
                          <p className="mt-1 text-sm text-slate-600">{typeof appointment.userId === 'string' ? 'No email provided' : appointment.userId?.email || 'No email provided'}</p>
                        </div>
                      </div>

                      <div className="rounded-3xl bg-white p-5 border border-slate-200">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <p className="text-xs uppercase tracking-[0.35em] text-slate-500 font-semibold">Status</p>
                            <p className="mt-3 inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">{appointment.status}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs uppercase tracking-[0.35em] text-slate-500 font-semibold">Client note</p>
                            <p className="mt-3 text-sm text-slate-600">{appointment.notes || 'No additional information submitted.'}</p>
                          </div>
                        </div>

                        <div className="mt-5 flex flex-wrap items-center gap-3">
                          {typeof appointment.userId !== 'string' && appointment.userId?._id ? (
                            <a
                              href={`/admin/users/${appointment.userId._id}`}
                              className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                            >
                              View user profile
                            </a>
                          ) : null}
                          {(appointment.status === 'CANCELLED' ? ['CANCELLED'] : statusOptions).map((status) => (
                            <button
                              key={status}
                              type="button"
                              disabled={savingId === appointment._id || appointment.status === status}
                              onClick={() => handleStatusUpdate(appointment._id, status)}
                              className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${appointment.status === status ? 'bg-primary-600 text-white' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'} ${savingId === appointment._id ? 'opacity-60 cursor-not-allowed' : ''}`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 rounded-3xl bg-white p-4 border border-slate-200">
                      <label className="text-sm font-semibold text-slate-900" htmlFor={`admin-note-${appointment._id}`}>
                        Admin note
                      </label>
                      <textarea
                        id={`admin-note-${appointment._id}`}
                        rows={3}
                        value={noteValues[appointment._id] ?? ''}
                        onChange={(event) => setNoteValues((current) => ({
                          ...current,
                          [appointment._id]: event.target.value,
                        }))}
                        disabled={appointment.status === 'CANCELLED'}
                        className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                      />
                      {appointment.adminNote ? (
                        <p className="mt-3 text-sm text-slate-500">Existing note: {appointment.adminNote}</p>
                      ) : (
                        <p className="mt-3 text-sm text-slate-500">Add a note when updating the appointment.</p>
                      )}
                    </div>
                    {appointment.notes ? (
                      <div className="mt-4 rounded-2xl bg-white p-4 border border-slate-200">
                        <p className="text-sm font-semibold text-slate-900">Client notes</p>
                        <p className="mt-2 text-sm text-slate-600">{appointment.notes}</p>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
