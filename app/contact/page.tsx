"use client";

import { useState, useEffect } from 'react';
import { useUser } from '@/lib/contexts/UserContext';
import toast from 'react-hot-toast';
import PageHero from '@/components/PageHero';
import { siteConfig } from '@/config/site-config';
import { theme } from '@/config/theme';

export default function ContactPage() {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
      }));
    }
  }, [user]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      toast.success(data.message || 'Thank you for your message! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      console.error('Contact form error:', error);
      toast.error(error.message || 'Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(siteConfig.contact.email);
      toast.success('Email copied to clipboard');
    } catch (e) {
      toast(siteConfig.contact.email);
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <PageHero
        backgroundImage={theme.contact.hero.backgroundImage}
        alt={theme.contact.hero.alt}
        tagline={theme.contact.hero.tagline}
        title={theme.contact.hero.title}
        subtitle={theme.contact.hero.subtitle}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          
          {/* Contact Info Card */}
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-lg border border-slate-200">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-600 mb-4">Get in touch</p>
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-slate-900 mb-6">
                Personalized support starts with one message.
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Whether you are exploring therapy, parent coaching, or early child development support, our team is ready to listen and help you book the right first step.
              </p>
              
              <div className="mt-10 space-y-6">
                <ContactItem 
                  icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />}
                  label="Email"
                  value={siteConfig.contact.email}
                  action={
                    <button onClick={copyEmail} className="text-xs text-sky-600 font-semibold uppercase tracking-wider hover:text-sky-700 ml-2">
                      Copy
                    </button>
                  }
                />
                <ContactItem 
                  icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />}
                  label="Phone"
                  value={siteConfig.contact.phone}
                />
                <ContactItem 
                  icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />}
                  label="Studio"
                  value={siteConfig.contact.address}
                />
              </div>
            </div>

            <div className="mt-10 pt-10 border-t border-slate-200">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-600 mb-4">Consultation hours</p>
              <div className="space-y-2 text-sm text-slate-600">
                <p>Monday - Friday: 9:00 am – 5:00 pm</p>
                <p>Saturday: By appointment only</p>
              </div>
            </div>

            <div className="mt-10 pt-10 border-t border-slate-200">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-600 mb-4">Follow our work</p>
              <div className="flex flex-wrap gap-3">
                <SocialButton label="Instagram" />
                <SocialButton label="Twitter" />
                <SocialButton label="LinkedIn" />
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-lg border border-slate-200">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-600 mb-4">Send a message</p>
            <h2 className="text-3xl font-serif font-semibold text-slate-900 mb-4">Start your consultation request</h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              Share your details below and we’ll respond with available times and next steps for your child’s support.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white"
                  placeholder="email@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white h-40 resize-none"
                  placeholder="Tell us about your child, your goals, or any questions."
                  required
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full rounded-2xl bg-sky-700 px-6 py-4 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

        </div>

        <section className="bg-white rounded-[2rem] border border-slate-200 shadow-lg overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] items-start">
            <div className="p-8 md:p-12">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-600 mb-4">Visit us</p>
              <h2 className="text-3xl font-serif font-semibold text-slate-900 mb-4">Our studio location</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                A calm, child-focused space for first consultations, child development planning, and therapy sessions.
              </p>
              <p className="text-sm text-slate-500">
                Use the map below for a quick overview, then open the location in Google Maps for turn-by-turn directions.
              </p>
              <a
                href="https://maps.app.goo.gl/GaccgKELwMNUhjqD8?g_st=iw"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center rounded-full bg-sky-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-800"
              >
                Open in Google Maps
              </a>
            </div>
            <div className="relative h-[28rem] overflow-hidden bg-slate-100">
              <iframe
                title="Mindspring studio location"
                src="https://maps.google.com/maps?q=28.640707,77.340614&z=17&output=embed"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function ContactItem({ icon, label, value, action }: { icon: React.ReactNode; label: string; value: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-primary-600 flex-shrink-0">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {icon}
        </svg>
      </div>
      <div>
        <p className="text-sm font-medium text-stone-900">{label}</p>
        <div className="flex items-center">
          <p className="text-stone-600">{value}</p>
          {action}
        </div>
      </div>
    </div>
  );
}

function SocialButton({ label }: { label: string }) {
  return (
    <button className="px-4 py-2 rounded-full border border-stone-200 text-stone-600 text-sm hover:bg-stone-50 hover:border-stone-300 transition-colors">
      {label}
    </button>
  );
}
