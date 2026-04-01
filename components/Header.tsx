"use client";

import Link from 'next/link';
import { useUser } from '@/lib/contexts/UserContext';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const { user, loading, logout } = useUser();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

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
    <header>
      {/* ── Marquee announcement bar ── */}
      <div className="win-marquee-wrap" style={{ borderBottom: 'none' }}>
        <span className="animate-marquee text-xs" style={{ color: '#000080', fontWeight: 'bold' }}>
          ★ Welcome to Mindspring Child Development &amp; Therapy ★ &nbsp;&nbsp;&nbsp;
          Expert child therapy, parent coaching, and developmental support in Vaishali, Ghaziabad &nbsp;&nbsp;&nbsp;
          ★ Book your free consultation today! ★ &nbsp;&nbsp;&nbsp;
          Phone: +91 9971996493 | +91 9266561109 &nbsp;&nbsp;&nbsp;
          ★ Best viewed in Internet Explorer 6.0 at 800×600 resolution ★ &nbsp;&nbsp;&nbsp;
        </span>
      </div>

      {/* ── Browser chrome / window title bar ── */}
      <div
        style={{
          background: 'linear-gradient(to right, #0a246a 0%, #1264d3 60%, #a6caf0 100%)',
          padding: '3px 6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: '22px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {/* Fake IE globe icon */}
          <span style={{ fontSize: '14px' }}>🌐</span>
          <span
            style={{
              color: '#ffffff',
              fontFamily: "Tahoma, 'MS Sans Serif', Arial, sans-serif",
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            Mindspring – Child Development &amp; Therapy – Microsoft Internet Explorer
          </span>
        </div>
        <div style={{ display: 'flex', gap: '2px' }}>
          {['_', '□', '✕'].map((label, i) => (
            <span
              key={i}
              className="win-titlebar-btn"
              style={{
                fontFamily: "Marlett, Tahoma, Arial, sans-serif",
                fontSize: i === 2 ? '9px' : '10px',
                fontWeight: 'bold',
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* ── IE6 toolbar ── */}
      <div
        className="win-raised"
        style={{ padding: '3px 4px', borderTop: 'none', display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}
      >
        <button className="btn" style={{ padding: '2px 10px', fontSize: '12px' }}>◀ Back</button>
        <button className="btn" style={{ padding: '2px 10px', fontSize: '12px' }}>▶ Forward</button>
        <button className="btn" style={{ padding: '2px 10px', fontSize: '12px' }}>✕ Stop</button>
        <button className="btn" style={{ padding: '2px 10px', fontSize: '12px' }}>↻ Refresh</button>
        <button className="btn" style={{ padding: '2px 10px', fontSize: '12px' }}>🏠 Home</button>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '4px', minWidth: '200px' }}>
          <span style={{ fontSize: '12px', whiteSpace: 'nowrap' }}>Address</span>
          <div className="win-inset" style={{ flex: 1, padding: '2px 6px', fontSize: '12px', fontFamily: 'monospace', minWidth: 0 }}>
            http://www.mindspring.in/
          </div>
          <button className="btn" style={{ padding: '2px 14px', fontSize: '12px' }}>Go</button>
        </div>
      </div>

      {/* ── Menu bar (nav links) ── */}
      <div className="win-menubar">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="win-menuitem"
          >
            <u style={{ textDecoration: link.name.charAt(0) !== '' ? 'none' : 'underline' }}>
              {link.name.charAt(0)}
            </u>
            {link.name.slice(1)}
          </Link>
        ))}

        <div style={{ flex: 1 }} />

        {loading ? (
          <span className="win-menuitem" style={{ color: '#808080', fontSize: '11px' }}>Loading...</span>
        ) : user ? (
          <>
            <Link href="/profile" className="win-menuitem">My Profile</Link>
            {user.isAdmin && (
              <Link href="/admin/dashboard" className="win-menuitem" style={{ fontWeight: 'bold' }}>
                Admin
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="win-menuitem"
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '13px' }}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="win-menuitem">Log In</Link>
            <Link href="/signup" className="win-menuitem" style={{ fontWeight: 'bold' }}>Sign Up</Link>
          </>
        )}
      </div>

      {/* ── Status bar ── */}
      <div
        style={{
          background: '#d4d0c8',
          borderTop: '1px solid #808080',
          padding: '1px 4px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '11px',
        }}
      >
        <span style={{ flex: 1 }}>✅ Done</span>
        <span>🌐 Internet zone</span>
      </div>
    </header>
  );
}
