import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: '#d4d0c8', borderTop: '2px solid #808080' }}>
      {/* ── Win separator ── */}
      <div className="win-separator" style={{ margin: '0' }} />

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '12px 8px' }}>
        {/* ── Main footer columns ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
          {/* Brand */}
          <div className="win-raised" style={{ padding: '10px' }}>
            <div className="win-titlebar" style={{ marginBottom: '8px' }}>
              <span>Mindspring</span>
            </div>
            <p style={{ fontSize: '12px', marginBottom: '8px', lineHeight: '1.5' }}>
              Expert child development therapy and emotional support for children and families in Vaishali, Ghaziabad.
            </p>
            <p style={{ fontSize: '11px', color: '#404040' }}>
              📞 +91 9971996493<br />
              📞 +91 9266561109
            </p>
          </div>

          {/* Explore */}
          <div className="win-raised" style={{ padding: '10px' }}>
            <div className="win-titlebar" style={{ marginBottom: '8px' }}>
              <span>Explore</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '12px' }}>
              {[
                { label: 'About Mindspring', href: '/about' },
                { label: 'Therapy Services', href: '/therapy' },
                { label: 'Help Center', href: '/help' },
                { label: 'Contact Us', href: '/contact' },
              ].map((link) => (
                <li key={link.href} style={{ marginBottom: '4px' }}>
                  <Link href={link.href} style={{ color: '#0000ff' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="win-raised" style={{ padding: '10px' }}>
            <div className="win-titlebar" style={{ marginBottom: '8px' }}>
              <span>Company</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '12px' }}>
              {[
                { label: 'Our Story', href: '/about' },
                { label: 'FAQs', href: '/help' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
              ].map((link) => (
                <li key={link.href} style={{ marginBottom: '4px' }}>
                  <Link href={link.href} style={{ color: '#0000ff' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="win-raised" style={{ padding: '10px' }}>
            <div className="win-titlebar" style={{ marginBottom: '8px' }}>
              <span>Wellbeing Notes</span>
            </div>
            <p style={{ fontSize: '12px', marginBottom: '8px' }}>
              Subscribe for child development tips:
            </p>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '6px' }} onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="email@example.com"
                className="input"
                style={{ fontSize: '12px', padding: '3px 6px' }}
              />
              <button type="submit" className="btn btn-primary" style={{ fontSize: '12px', padding: '3px 10px' }}>
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* ── Separator ── */}
        <div className="win-separator" style={{ margin: '12px 0 8px' }} />

        {/* ── Bottom bar ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', fontSize: '11px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Fake IE-era "made with" badges */}
            <span className="win-raised" style={{ padding: '2px 6px', fontSize: '10px', fontWeight: 'bold', color: '#000080' }}>
              IE 6.0
            </span>
            <span className="win-raised" style={{ padding: '2px 6px', fontSize: '10px', fontWeight: 'bold', color: '#004080' }}>
              Netscape
            </span>
            <span style={{ color: '#404040' }}>
              © {new Date().getFullYear()} Mindspring. All rights reserved.
            </span>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link href="/privacy" style={{ fontSize: '11px', color: '#0000ff' }}>Privacy Policy</Link>
            <Link href="/terms" style={{ fontSize: '11px', color: '#0000ff' }}>Terms of Service</Link>
          </div>
        </div>

        {/* ── Hit counter ── */}
        <div style={{ marginTop: '8px', textAlign: 'center' }}>
          <span style={{ fontSize: '10px', color: '#404040' }}>
            You are visitor number&nbsp;
          </span>
          {['0','0','4','2','3','8','7'].map((digit, i) => (
            <span
              key={i}
              className="win-inset"
              style={{
                display: 'inline-block',
                width: '16px',
                textAlign: 'center',
                fontSize: '11px',
                fontWeight: 'bold',
                fontFamily: 'monospace',
                color: '#000080',
                padding: '1px 2px',
              }}
            >
              {digit}
            </span>
          ))}
        </div>
      </div>

      {/* ── Taskbar ── */}
      <div className="win-taskbar" style={{ borderTop: '2px solid #ffffff' }}>
        <button className="win-start-btn">
          <span style={{ fontSize: '14px' }}>🪟</span>
          <strong>Start</strong>
        </button>
        <div className="win-separator" style={{ height: '100%', width: '2px', borderTop: 'none', borderLeft: '1px solid #808080', borderRight: '1px solid #ffffff', margin: '0 2px' }} />
        <span className="win-raised" style={{ padding: '2px 10px', fontSize: '11px', fontWeight: 'bold', background: 'linear-gradient(to right, #0a246a, #1264d3)', color: '#ffffff' }}>
          🌐 Mindspring
        </span>
        <div style={{ flex: 1 }} />
        <div className="win-inset" style={{ padding: '2px 8px', fontSize: '11px', whiteSpace: 'nowrap' }}>
          🔊 &nbsp; <ClockDisplay />
        </div>
      </div>
    </footer>
  );
}

function ClockDisplay() {
  // Static time for SSR – a real app could hydrate this client-side
  return <span>12:00 PM</span>;
}
