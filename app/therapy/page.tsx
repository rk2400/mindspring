import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { theme } from '@/config/theme';

export const metadata: Metadata = {
  title: `${theme.name} · Therapy`,
  description: 'Explore the therapy programs available at Mindspring for children with speech, learning, attention, behaviour, and sensory support.',
};

const therapies = [
  {
    title: 'Speech Therapy',
    image: 'https://plus.unsplash.com/premium_photo-1661724521974-d85c95c6d279?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Support for language development, communication skills, and confident expression.',
    highlights: ['Speech practice with caring coaches', 'Interactive language exercises', 'Confidence in everyday communication'],
  },
  {
    title: 'Occupational Therapy',
    image: 'https://plus.unsplash.com/premium_photo-1682089692543-99cfeb42a278?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Practical strategies for daily routines, motor coordination, and sensory balance.',
    highlights: ['Fine motor growth', 'Self-care skill building', 'Routine-friendly progress'],
  },
  {
    title: 'ABA Therapy',
    image: 'https://images.unsplash.com/photo-1708686816818-2b018e0c1296?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Structured support to build positive habits, social learning, and emotional regulation.',
    highlights: ['Positive behavior coaching', 'Clear progress pathways', 'Caregiver reinforcement tools'],
  },
  {
    title: 'Special Education',
    image: 'https://images.unsplash.com/photo-1772419186959-fdb8cc37e149?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Individualized learning support tailored to each child’s strengths and needs.',
    highlights: ['Personalized learning plans', 'Skill-based academic support', 'Strength-focused guidance'],
  },
  {
    title: 'Sensory Integration',
    image: 'https://plus.unsplash.com/premium_photo-1772784452588-d4c70ee3f9e6?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Careful sensory planning that helps children feel calm, safe, and more regulated.',
    highlights: ['Calming sensory tools', 'Reliable regulation strategies', 'Comfort through thoughtful design'],
  },
  {
    title: 'Cognitive Skills Training',
    image: 'https://images.unsplash.com/photo-1759678444821-565ff103465c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Tools for attention, memory, problem solving, and emotional awareness.',
    highlights: ['Memory-building games', 'Focus and reasoning practice', 'Growth-minded learning experiences'],
  },
];

export default function TherapyPage() {
  return (
    <main className="bg-sky-50">
      <PageHero
        backgroundImage={theme.therapy.hero.backgroundImage}
        alt={theme.therapy.hero.alt}
        tagline={theme.therapy.hero.tagline}
        title={theme.therapy.hero.title}
        subtitle={theme.therapy.hero.subtitle}
        primaryCta={{ label: 'Request a consultation', href: '/contact' }}
        secondaryCta={{ label: 'Learn about our approach', href: '/about' }}
      />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Therapy pathways</p>
              <h2 className="mt-4 text-3xl sm:text-4xl font-serif font-bold text-slate-900">
                Interactive therapy cards with images, stories, and real-child outcomes.
              </h2>
              <p className="mt-6 text-slate-600 leading-8">
                Select a path to explore how each therapy type supports communication, sensory confidence, school success, and everyday independence.
              </p>
              <div className="mt-10 space-y-6">
                <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                  <h3 className="text-xl font-semibold text-slate-900">Designed for children</h3>
                  <p className="mt-3 text-slate-600">Every program is built around real child learning routines, with flexible sessions and clear take-home tools.</p>
                </div>
                <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                  <h3 className="text-xl font-semibold text-slate-900">Engaging progress visuals</h3>
                  <p className="mt-3 text-slate-600">Our therapy plans include milestone maps, gentle step-by-step goals, and simple ways to celebrate every success.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-sky-50 via-cyan-100 to-white p-8 shadow-lg">
                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-500">Your therapy journey</p>
                  <h3 className="mt-4 text-2xl font-semibold text-slate-900">A visual map to the right path.</h3>
                  <p className="mt-4 text-slate-600 leading-7">
                    Start with strengths, add supportive practice, and watch confidence grow in school, play, and daily life.
                  </p>
                  <div className="mt-8 grid gap-4">
                    <div className="flex items-center gap-4 rounded-3xl bg-sky-100 p-4">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-700 text-sm font-bold text-white">1</span>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Explore goals</p>
                        <p className="text-sm text-slate-600">Talk through your child’s needs and strengths.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-3xl bg-slate-100 p-4">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-700 text-sm font-bold text-white">2</span>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Choose a path</p>
                        <p className="text-sm text-slate-600">Match the right therapy type to your child’s goals.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-3xl bg-sky-100 p-4">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-700 text-sm font-bold text-white">3</span>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Grow together</p>
                        <p className="text-sm text-slate-600">Use our tools at home and in sessions for steady progress.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {therapies.map((therapy) => (
              <article key={therapy.title} className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-2xl">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={therapy.image}
                    alt={therapy.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent px-6 py-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">{therapy.title}</p>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <div className="mb-6 inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                    Therapy pathway
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-slate-900">{therapy.title}</h3>
                    <p className="mt-4 text-slate-600 leading-7">{therapy.description}</p>
                    <ul className="mt-6 space-y-3">
                      {therapy.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-3 text-slate-600">
                          <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-700">✓</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 text-white py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Begin with clarity</p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-serif font-bold text-white">Interactive care that feels thoughtful, hopeful, and easy to start.</h2>
          <p className="mt-6 text-slate-200 leading-8">
            Mindspring helps children take the next step with gentle, structured therapy designed for learners who grow and thrive in their own rhythm.
          </p>
          <Link href="/contact" className="mt-10 inline-flex rounded-full bg-sky-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-sky-700">
            Book a discovery call
          </Link>
        </div>
      </section>
    </main>
  );
}
