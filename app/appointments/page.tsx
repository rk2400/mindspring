'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useUser } from '@/lib/contexts/UserContext';
import { getAppointments, bookAppointment } from '@/lib/api-client';

const therapyOptions = [
  'Speech Therapy',
  'Occupational Therapy',
  'ABA Therapy',
  'Special Education',
  'Sensory Integration',
  'Cognitive Skills Training',
] as const;

const availableTimeSlots = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
] as const;

interface Appointment {
  _id: string;
  therapyType: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  status: string;
  createdAt: string;
}

export default function AppointmentsPage() {
  const { user, loading: userLoading } = useUser();
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [therapyType, setTherapyType] = useState<string>(therapyOptions[0]);
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loadingAppointments, setLoadingAppointments] = useState(false);
  const today = new Date().toISOString().slice(0, 10);
  const activeUpcomingAppointment = useMemo(
    () =>
      appointments.find((appointment) => {
        if (appointment.status === 'CANCELLED' || appointment.status === 'COMPLETED') {
          return false;
        }

        const appointmentDateTime = new Date(`${appointment.preferredDate}T${appointment.preferredTime}`);
        return appointmentDateTime.getTime() >= Date.now();
      }),
    [appointments]
  );
  const canBookAppointment = !activeUpcomingAppointment;

  useEffect(() => {
    if (!userLoading && !user) {
      router.push('/login');
    }
  }, [user, userLoading, router]);

  useEffect(() => {
    if (user) {
      loadAppointments();
    }
  }, [user]);

  const loadAppointments = async () => {
    setLoadingAppointments(true);
    try {
      const result = await getAppointments();
      setAppointments(result);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || 'Unable to load appointments');
    } finally {
      setLoadingAppointments(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!preferredDate || !preferredTime) {
      toast.error('Please select your preferred date and time');
      return;
    }

    if (!availableTimeSlots.includes(preferredTime as (typeof availableTimeSlots)[number])) {
      toast.error('Appointments can only be scheduled between 9:00 AM and 6:00 PM');
      return;
    }

    if (!canBookAppointment) {
      toast.error('You already have an active upcoming appointment');
      return;
    }

    setSubmitting(true);

    try {
      await bookAppointment({ therapyType, preferredDate, preferredTime, notes });
      toast.success('Appointment request submitted. We will confirm soon.');
      setPreferredDate('');
      setPreferredTime('');
      setNotes('');
      setTherapyType(therapyOptions[0]);
      await loadAppointments();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || 'Failed to book appointment');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (value: string) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(value));
  };

  const formatTime = (value: string) => {
    const [hours, minutes] = value.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-200">
          <div className="bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.15),_transparent_55%)] p-10 sm:p-16">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.35em] text-primary-700 font-semibold">Appointment booking</p>
              <h1 className="mt-4 text-4xl md:text-5xl font-serif text-slate-900">Schedule a Mindspring session</h1>
              <p className="mt-4 text-base md:text-lg text-slate-600 leading-8">
                Request a structured therapy session with one of our specialists. Select a therapy plan, choose an available daytime slot between 9:00 AM and 6:00 PM, and share goals so our team can review and confirm the appointment.
              </p>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] p-8 sm:p-12">
            <section className="space-y-6">
              <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                <div className="flex flex-col gap-4 border-b border-slate-200 pb-5">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900">Book a session</h2>
                    <p className="mt-2 text-sm text-slate-600">
                      Sessions are scheduled in daytime clinical hours only. One active upcoming appointment is allowed per account.
                    </p>
                  </div>

                </div>

                {activeUpcomingAppointment ? (
                  <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                    <p className="text-sm font-semibold text-amber-900">An active appointment is already scheduled</p>
                    <p className="mt-2 text-sm text-amber-800">
                      {activeUpcomingAppointment.therapyType} on {formatDate(activeUpcomingAppointment.preferredDate)} at {formatTime(activeUpcomingAppointment.preferredTime)}.
                      You can request another session after this one is completed or cancelled.
                    </p>
                  </div>
                ) : null}

                <form onSubmit={handleSubmit} className="space-y-5 mt-6">
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">Therapy type</span>
                    <select
                      value={therapyType}
                      onChange={(event) => setTherapyType(event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-primary-500 focus:outline-none"
                    >
                      {therapyOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-sm font-medium text-slate-700">Preferred date</span>
                      <input
                        type="date"
                        min={today}
                        value={preferredDate}
                        onChange={(event) => setPreferredDate(event.target.value)}
                        className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-primary-500 focus:outline-none"
                        required
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium text-slate-700">Preferred time</span>
                      <select
                        value={preferredTime}
                        onChange={(event) => setPreferredTime(event.target.value)}
                        className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-primary-500 focus:outline-none"
                        required
                      >
                        <option value="">Select a time slot</option>
                        {availableTimeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {formatTime(slot)}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">Session concerns and goals</span>
                    <textarea
                      value={notes}
                      onChange={(event) => setNotes(event.target.value)}
                      rows={4}
                      className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-primary-500 focus:outline-none"
                      placeholder="Describe concerns, therapy goals, school challenges, sensory needs, or anything our therapist should know before the session"
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={submitting || !canBookAppointment}
                    className="btn btn-primary w-full py-3 text-sm font-semibold"
                  >
                    {submitting ? 'Requesting…' : 'Request appointment'}
                  </button>
                  {!canBookAppointment ? (
                    <p className="mt-3 text-sm text-rose-600">
                      A new booking can only be requested when you do not have any active upcoming appointment.
                    </p>
                  ) : null}
                </form>
              </div>


            </section>

            <section className="space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-primary-700 font-semibold">Your schedule</p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-900">Upcoming requests</h2>
                  </div>
                </div>

                {loadingAppointments ? (
                  <div className="rounded-3xl p-8 bg-slate-50 text-center text-slate-500">
                    Loading appointments…
                  </div>
                ) : appointments.length === 0 ? (
                  <div className="rounded-3xl p-8 bg-slate-50 text-center text-slate-500">
                    No appointment requests yet. Submit one using the booking form.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div key={appointment._id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm text-slate-500">{appointment.therapyType}</p>
                            <h3 className="mt-1 text-lg font-semibold text-slate-900">{formatDate(appointment.preferredDate)}</h3>
                            <p className="text-sm text-slate-500">{formatTime(appointment.preferredTime)}</p>
                          </div>
                          <span className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-primary-700 bg-primary-50">
                            {appointment.status}
                          </span>
                        </div>
                        {appointment.notes ? (
                          <p className="mt-3 text-sm text-slate-600">Notes: {appointment.notes}</p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-primary-600 text-white rounded-3xl p-6">
                <h3 className="text-xl font-semibold">Need help confirming?</h3>
                <p className="mt-3 text-sm leading-6 text-slate-100">
                  If you have questions about available days or therapy recommendations, our team is happy to help. Reach out through the contact page.
                </p>
                <Link href="/contact" className="mt-5 inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-primary-700 hover:bg-slate-100">
                  Contact Mindspring
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
