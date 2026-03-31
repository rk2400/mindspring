'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminLogin, login as sendOTP, verifyOTP } from '@/lib/api-client';
import { useUser } from '@/lib/contexts/UserContext';
import toast from 'react-hot-toast';
import { siteConfig } from '@/config/site-config';

export default function AdminLoginPage() {
  const router = useRouter();
  const { refreshUser } = useUser();
  const [tab, setTab] = useState<'password' | 'otp'>('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpStep, setOtpStep] = useState<'send' | 'verify'>('send');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await adminLogin(email, password);
      toast.success('Admin login successful');
      // refresh user context then route
      await refreshUser();
      router.push('/admin/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  }

  async function handleSendOTP(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await sendOTP(email);
      toast.success('OTP sent to admin email');
      setOtpStep('verify');
    } catch (err: any) {
      toast.error(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOTP(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await verifyOTP(email, otp);
      toast.success('Admin authenticated');
      // refresh user and go to dashboard
      await refreshUser();
      router.push('/admin/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-stone-100 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="hidden lg:flex flex-col justify-between p-12 bg-primary-600 text-white">
            <div>
              <h1 className="text-3xl font-serif font-bold">Admin Portal</h1>
              <p className="mt-4 text-stone-100/90">Manage products, orders, and customers from a single dashboard.</p>
            </div>
            <div className="text-sm text-white/70">
              <p>Need help?</p>
              <p className="mt-1">Contact support at <span className="font-medium">{siteConfig.contact.email}</span></p>
            </div>
          </div>

          <div className="p-12 lg:p-16">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
              <div>
                <h2 className="text-2xl font-serif font-bold text-stone-900">Admin Sign In</h2>
                <p className="text-sm text-stone-500">Use your admin credentials or OTP to access the dashboard.</p>
              </div>
              <button
                onClick={() => router.push('/')}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                Back to Store
              </button>
            </div>

            <div className="rounded-xl border border-stone-100 bg-stone-50 p-8 sm:p-10 shadow-sm">
              <div className="flex items-center justify-between mb-6 gap-2">
                <button
                  onClick={() => setTab('password')}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                    tab === 'password'
                      ? 'bg-white text-primary-700 shadow'
                      : 'bg-transparent text-stone-500 hover:text-stone-700'
                  }`}
                >
                  Password
                </button>
                <button
                  onClick={() => setTab('otp')}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                    tab === 'otp'
                      ? 'bg-white text-primary-700 shadow'
                      : 'bg-transparent text-stone-500 hover:text-stone-700'
                  }`}
                >
                  OTP
                </button>
              </div>

              {tab === 'password' ? (
                <form onSubmit={handlePasswordLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Admin Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                      placeholder="admin@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                      placeholder="Password"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full btn btn-primary py-3"
                    disabled={loading}
                  >
                    {loading ? 'Logging in…' : 'Login'}
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  {otpStep === 'send' ? (
                    <form onSubmit={handleSendOTP} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">Admin Email</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                          placeholder="admin@example.com"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full btn btn-primary py-3"
                        disabled={loading}
                      >
                        {loading ? 'Sending…' : 'Send OTP'}
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyOTP} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">Enter OTP</label>
                        <input
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          className="w-full px-4 py-3 bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 text-center text-2xl tracking-widest font-serif"
                          maxLength={6}
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full btn btn-primary py-3"
                        disabled={loading || otp.length !== 6}
                      >
                        {loading ? 'Verifying…' : 'Verify OTP'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setOtpStep('send')}
                        className="w-full btn btn-secondary py-3"
                      >
                        Change Email
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



