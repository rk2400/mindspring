import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site-config';
import { theme } from '@/config/theme';

export const metadata: Metadata = {
  title: `${siteConfig.name} · Home`,
  description: siteConfig.description,
};

export default function HomePage() {
  const focusItems = [
    {
      title: 'Child-first therapy',
      description:
        'Every session is designed to support speech, attention, behaviour, and sensory development with practical next steps.',
    },
    {
      title: 'Evidence-based progress',
      description:
        'Assessment-led plans help children move from challenge to confidence with clear milestones and encouragement.',
    },
    {
      title: 'Engaging learning tools',
      description:
        'Playful, supportive activities make each therapy session feel meaningful and easy to bring into daily life.',
    },
  ];

  const processSteps = [
    {
      title: 'Assess, understand, plan',
      detail: 'We begin with a friendly assessment that identifies strengths, needs, and a practical path forward.',
    },
    {
      title: 'Build skills with care',
      detail: 'Therapy sessions are guided by experts and shaped around each child\'s learning style and pace.',
    },
    {
      title: 'Celebrate steady progress',
      detail: 'Every small win is tracked, shared, and connected to confidence at home, school, and play.',
    },
  ];

  const valueIcons = ['💡', '📊', '🤝'];

  return (
    <main style={{ background: '#d4d0c8', minHeight: '100vh' }}>
      {/* ═══════════════════════════════════════════════
          HERO — styled as a Windows dialog/popup window
          ═══════════════════════════════════════════════ */}
      <section style={{ padding: '12px 8px', maxWidth: '960px', margin: '0 auto' }}>
        <div className="win-raised" style={{ overflow: 'hidden' }}>
          {/* Window title bar */}
          <div className="win-titlebar">
            <span>🌟 Welcome to Mindspring – Child Development &amp; Therapy</span>
            <div style={{ display: 'flex', gap: '2px' }}>
              {['_', '□', '✕'].map((l, i) => (
                <span key={i} className="win-titlebar-btn">{l}</span>
              ))}
            </div>
          </div>

          {/* Hero content */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 320px',
              gap: '0',
            }}
          >
            {/* Left: text */}
            <div style={{ padding: '16px', background: '#d4d0c8' }}>
              <p style={{ fontSize: '10px', color: '#000080', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>
                ✦ {theme.hero.tagline} ✦
              </p>
              <h1 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '10px', lineHeight: '1.3', fontFamily: "'Times New Roman', Times, serif" }}>
                {theme.hero.title}
              </h1>
              <div className="win-separator" />
              <p style={{ fontSize: '13px', marginBottom: '14px', lineHeight: '1.6', marginTop: '8px' }}>
                {theme.hero.subtitle}
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <Link href={theme.hero.primaryCta.href} className="btn btn-primary" style={{ border: '2px solid #000000' }}>
                  {theme.hero.primaryCta.label}
                </Link>
                <Link href={theme.hero.secondaryCta.href} className="btn btn-secondary">
                  {theme.hero.secondaryCta.label}
                </Link>
              </div>

              {/* Fake "under construction" gif area */}
              <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>🚧</span>
                <span style={{ fontSize: '11px', color: '#808080' }}>Site last updated: April 2026 | This page is best viewed at 800×600</span>
              </div>
            </div>

            {/* Right: hero image in an inset frame */}
            <div
              className="win-inset"
              style={{ position: 'relative', minHeight: '260px', overflow: 'hidden', borderTop: 'none', borderRight: 'none', borderBottom: 'none' }}
            >
              <Image
                src={theme.hero.backgroundImage}
                alt={theme.hero.alt}
                fill
                priority
                className="object-cover object-center"
              />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,80,0.08)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SERVICES — table-style card grid
          ═══════════════════════════════════════ */}
      <section style={{ maxWidth: '960px', margin: '0 auto', padding: '0 8px 16px' }}>
        <div className="win-raised" style={{ overflow: 'hidden' }}>
          <div className="win-titlebar">
            <span>📁 {theme.collections.label} – {theme.collections.heading}</span>
          </div>

          {/* Fake tab strip */}
          <div style={{ display: 'flex', borderBottom: '1px solid #808080', paddingTop: '6px', paddingLeft: '6px', background: '#d4d0c8' }}>
            <span className="win-tab win-tab-active">All Services</span>
            <span className="win-tab">Child Dev.</span>
            <span className="win-tab">Coaching</span>
            <span className="win-tab">Wellness</span>
          </div>

          <div style={{ padding: '12px', background: '#d4d0c8' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {theme.collections.items.map((service) => (
                <Link
                  key={service.title}
                  href={service.href}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="win-raised" style={{ overflow: 'hidden', cursor: 'pointer' }}>
                    <div className="win-titlebar" style={{ fontSize: '11px', padding: '2px 6px' }}>
                      <span>📂 {service.title}</span>
                    </div>
                    <div className="win-inset" style={{ position: 'relative', height: '140px', overflow: 'hidden' }}>
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div style={{ padding: '8px' }}>
                      <p style={{ fontSize: '11px', color: '#404040', marginBottom: '6px' }}>{service.subtitle}</p>
                      <span style={{ color: '#0000ff', fontSize: '11px', textDecoration: 'underline' }}>Learn more &gt;&gt;</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WHAT MAKES US DIFFERENT + HOW IT WORKS
          ═══════════════════════════════════════ */}
      <section style={{ maxWidth: '960px', margin: '0 auto', padding: '0 8px 16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>

          {/* Left panel: Focus items */}
          <div className="win-raised" style={{ overflow: 'hidden' }}>
            <div className="win-titlebar">
              <span>ℹ️ What Makes Mindspring Different</span>
            </div>
            <div style={{ padding: '10px', background: '#d4d0c8' }}>
              <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#000080', marginBottom: '6px' }}>
                Child development therapy with clear, confident progress.
              </p>
              <p style={{ fontSize: '12px', color: '#404040', marginBottom: '10px', lineHeight: '1.5' }}>
                Every child deserves the chance to thrive. Our approach blends expert assessment, playful skill-building and meaningful progress that parents can see.
              </p>
              <div className="win-separator" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
                {focusItems.map((item) => (
                  <div key={item.title} className="win-inset" style={{ padding: '8px' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span
                        className="win-raised"
                        style={{ width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold', color: '#000080', flexShrink: 0 }}
                      >
                        ✓
                      </span>
                      <div>
                        <p style={{ fontWeight: 'bold', fontSize: '12px', marginBottom: '2px' }}>{item.title}</p>
                        <p style={{ fontSize: '11px', color: '#404040', lineHeight: '1.4' }}>{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel: Process steps */}
          <div className="win-raised" style={{ overflow: 'hidden' }}>
            <div className="win-titlebar">
              <span>📋 How It Works – Step-by-Step Wizard</span>
            </div>
            <div style={{ padding: '10px', background: '#d4d0c8' }}>
              <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#000080', marginBottom: '8px' }}>
                A simple path from assessment to confidence.
              </p>

              {processSteps.map((step, index) => (
                <div key={step.title} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <span
                      className="win-raised"
                      style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px', flexShrink: 0, color: '#000080', fontFamily: "'Times New Roman', serif" }}
                    >
                      {index + 1}
                    </span>
                    <div className="win-inset" style={{ flex: 1, padding: '6px 8px' }}>
                      <p style={{ fontWeight: 'bold', fontSize: '12px', marginBottom: '2px' }}>{step.title}</p>
                      <p style={{ fontSize: '11px', color: '#404040', lineHeight: '1.4' }}>{step.detail}</p>
                    </div>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div style={{ textAlign: 'center', fontSize: '14px', marginTop: '4px', color: '#808080' }}>▼</div>
                  )}
                </div>
              ))}

              <div className="win-separator" />
              <div className="win-inset" style={{ padding: '8px', marginTop: '8px' }}>
                <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#000080', marginBottom: '4px' }}>Practice focus:</p>
                <p style={{ fontSize: '11px', color: '#404040', lineHeight: '1.4' }}>
                  Progress is real when children feel safe, understood, and supported by a plan that keeps them moving ahead.
                </p>
              </div>

              {/* Fake progress bar */}
              <div style={{ marginTop: '10px' }}>
                <p style={{ fontSize: '11px', marginBottom: '4px' }}>Overall progress: 78%</p>
                <div className="win-progress-track">
                  <div className="win-progress-fill" style={{ width: '78%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          VALUES
          ═══════════════════════════════════════ */}
      <section style={{ maxWidth: '960px', margin: '0 auto', padding: '0 8px 16px' }}>
        <div className="win-raised" style={{ overflow: 'hidden' }}>
          <div className="win-titlebar">
            <span>⭐ Why Parents Choose Mindspring</span>
          </div>
          <div style={{ padding: '12px', background: '#d4d0c8' }}>
            <p style={{ fontSize: '14px', fontWeight: 'bold', textAlign: 'center', marginBottom: '12px', fontFamily: "'Times New Roman', serif" }}>
              A calm, practical approach to emotional growth
            </p>
            <div className="win-separator" style={{ marginBottom: '12px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {theme.values.map((value, index) => (
                <div key={value.title} className="win-inset" style={{ padding: '10px', textAlign: 'center' }}>
                  <div
                    className="win-raised"
                    style={{
                      width: '40px',
                      height: '40px',
                      margin: '0 auto 8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '22px',
                    }}
                  >
                    {valueIcons[index]}
                  </div>
                  <p style={{ fontWeight: 'bold', fontSize: '12px', marginBottom: '4px' }}>{value.title}</p>
                  <p style={{ fontSize: '11px', color: '#404040', lineHeight: '1.4' }}>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TESTIMONIALS
          ═══════════════════════════════════════ */}
      <section style={{ maxWidth: '960px', margin: '0 auto', padding: '0 8px 16px' }}>
        <div className="win-raised" style={{ overflow: 'hidden' }}>
          <div className="win-titlebar">
            <span>💬 Stories of Growth – Trusted Support from Parents and Children</span>
          </div>
          <div style={{ padding: '12px', background: '#d4d0c8' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {theme.testimonials.map((testimonial) => (
                <div key={testimonial.name} className="win-inset" style={{ padding: '10px' }}>
                  {/* Quote icon */}
                  <div style={{ fontSize: '24px', color: '#000080', marginBottom: '6px', lineHeight: 1 }}>&quot;</div>
                  <p style={{ fontSize: '12px', lineHeight: '1.5', color: '#000000', marginBottom: '8px', fontStyle: 'italic' }}>
                    {testimonial.quote}
                  </p>
                  <div className="win-separator" />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                    <div
                      className="win-raised"
                      style={{ width: '32px', height: '32px', overflow: 'hidden', position: 'relative', flexShrink: 0 }}
                    >
                      <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p style={{ fontWeight: 'bold', fontSize: '11px' }}>{testimonial.name}</p>
                      <p style={{ fontSize: '10px', color: '#808080' }}>{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA / ABOUT SECTION
          ═══════════════════════════════════════ */}
      <section style={{ maxWidth: '960px', margin: '0 auto', padding: '0 8px 20px' }}>
        <div className="win-raised" style={{ overflow: 'hidden' }}>
          <div className="win-titlebar">
            <span>🏥 {theme.about.hero.tagline} – Our Mission</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '0' }}>
            <div style={{ padding: '16px', background: '#d4d0c8' }}>
              <p style={{ fontSize: '10px', color: '#000080', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>
                {theme.about.hero.tagline}
              </p>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', lineHeight: '1.3', fontFamily: "'Times New Roman', Times, serif" }}>
                {theme.about.hero.title}
              </h2>
              <div className="win-separator" />
              <p style={{ fontSize: '12px', marginTop: '10px', marginBottom: '8px', lineHeight: '1.6', color: '#404040' }}>
                {theme.about.story.paragraphs[0]}
              </p>
              <p style={{ fontSize: '12px', marginBottom: '14px', lineHeight: '1.6', color: '#404040' }}>
                {theme.about.story.paragraphs[1]}
              </p>
              <div style={{ display: 'flex', gap: '6px' }}>
                <Link href="/about" className="btn btn-primary" style={{ border: '2px solid #000000', fontSize: '12px' }}>
                  Read Our Full Story
                </Link>
                <Link href="/contact" className="btn btn-secondary" style={{ fontSize: '12px' }}>
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Image panel */}
            <div className="win-inset" style={{ position: 'relative', overflow: 'hidden', borderTop: 'none', borderRight: 'none', borderBottom: 'none' }}>
              <Image
                src={theme.about.hero.backgroundImage}
                alt={theme.about.hero.alt}
                fill
                className="object-cover"
                priority
              />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,50,0.12)' }} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
