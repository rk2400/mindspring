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
      detail: 'Therapy sessions are guided by experts and shaped around each child’s learning style and pace.',
    },
    {
      title: 'Celebrate steady progress',
      detail: 'Every small win is tracked, shared, and connected to confidence at home, school, and play.',
    },
  ];

  const valueIcons = ['💡', '📊', '🤝'];

  return (
    <div className="bg-sky-50">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={theme.hero.backgroundImage}
            alt={theme.hero.alt}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-slate-900/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
          <div className="max-w-3xl text-white">
            <span className="inline-block py-1 px-4 rounded-full bg-primary-500/20 text-primary-100 text-sm font-semibold tracking-widest uppercase mb-6">
              {theme.hero.tagline}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-tight mb-6">
              {theme.hero.title}
            </h1>
            <p className="text-lg sm:text-xl text-slate-200 leading-relaxed max-w-2xl mb-10">
              {theme.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={theme.hero.primaryCta.href}
                className="btn btn-primary px-8 py-4"
              >
                {theme.hero.primaryCta.label}
              </Link>
              <Link
                href={theme.hero.secondaryCta.href}
                className="btn btn-secondary px-8 py-4"
              >
                {theme.hero.secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary-600 font-bold tracking-widest uppercase text-xs mb-2 block">
            {theme.collections.label}
          </span>
          <h2 className="text-4xl font-serif font-medium text-slate-900">
            {theme.collections.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {theme.collections.items.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group relative overflow-hidden rounded-3xl shadow-sm border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6">{service.subtitle}</p>
                <span className="inline-flex items-center gap-2 text-primary-600 font-semibold uppercase tracking-widest text-sm">
                  Learn more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-sky-100 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center">
            <div>
              <span className="text-primary-600 font-bold tracking-widest uppercase text-xs mb-3 inline-block">
                What makes Mindspring different
              </span>
              <h2 className="text-4xl font-serif font-medium text-slate-900 mb-6">
                Child development therapy with clear, confident progress.
              </h2>
              <p className="max-w-2xl text-slate-600 leading-relaxed">
                Every child deserves the chance to thrive. Our approach blends expert assessment, playful skill-building and meaningful progress that parents can see.
              </p>

              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
                {focusItems.map((item) => (
                  <div
                    key={item.title}
                    className="group rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 mb-5 transition group-hover:bg-sky-100">
                      <span className="text-xl font-semibold">✓</span>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-sky-700 via-cyan-600 to-sky-800 p-8 text-white shadow-2xl">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.25),_transparent_35%)]" />
              <div className="relative">
                <p className="text-sm uppercase tracking-[0.35em] text-sky-100 mb-4">How it works</p>
                <h3 className="text-3xl font-serif font-semibold mb-8">A simple path from assessment to confidence.</h3>
                <div className="space-y-6">
                  {processSteps.map((step, index) => (
                    <div key={step.title} className="flex gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-slate-900 font-bold text-xl">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold">{step.title}</h4>
                        <p className="mt-2 text-slate-200 leading-relaxed">{step.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-10 rounded-[2rem] bg-white/10 p-6 ring-1 ring-white/20">
                <p className="text-sm uppercase tracking-[0.35em] text-sky-100 mb-3">Practice focus</p>
                <p className="text-sm text-slate-200 leading-relaxed">
                  Progress is real when children feel safe, understood, and supported by a plan that keeps them moving ahead.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-bold tracking-widest uppercase text-xs mb-2 block">
              Why Parents Choose Mindspring
            </span>
            <h2 className="text-4xl font-serif font-medium text-slate-900">
              A calm, practical approach to emotional growth
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {theme.values.map((value, index) => (
              <div key={value.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                  <span className="text-4xl leading-none">{valueIcons[index]}</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary-600 font-bold tracking-widest uppercase text-xs mb-2 block">Stories of growth</span>
          <h2 className="text-4xl font-serif font-medium text-slate-900">Trusted support from parents and children</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {theme.testimonials.map((testimonial) => (
            <div key={testimonial.name} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative h-14 w-14 overflow-hidden rounded-full bg-slate-100">
                  <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.location}</p>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed">{testimonial.quote}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative py-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Image
            src={theme.about.hero.backgroundImage}
            alt={theme.about.hero.alt}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs font-bold tracking-widest uppercase mb-8">
            {theme.about.hero.tagline}
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-medium mb-8 leading-tight text-white/90">
            {theme.about.hero.title}
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-300 mb-10 leading-relaxed">
            {theme.about.story.paragraphs.join(' ')}
          </p>
          <Link href="/about" className="btn btn-primary bg-white text-slate-900 hover:bg-slate-100 border-none inline-flex">
            Read Our Full Story
          </Link>
        </div>
      </section>
    </div>
  );
}
