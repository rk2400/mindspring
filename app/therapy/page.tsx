import type { Metadata } from 'next';
import Link from 'next/link';
import { theme } from '@/config/theme';

export const metadata: Metadata = {
  title: `${theme.name} · Therapy`,
  description: 'Explore the therapy programs available at Mindspring for children and families.',
};

const therapies = [
  {
    title: 'Speech Therapy',
    image: 'https://images.unsplash.com/photo-1537432376769-00a0ccb7c3ef?auto=format&fit=crop&w=900&q=80',
    description: 'Support for language development, communication skills, and confident expression.',
    highlights: ['Speech practice with caring coaches', 'Interactive language exercises', 'Confidence in everyday communication'],
  },
  {
    title: 'Occupational Therapy',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80',
    description: 'Practical strategies for daily routines, motor coordination, and sensory balance.',
    highlights: ['Fine motor growth', 'Self-care skill building', 'Routine-friendly progress'],
  },
  {
    title: 'ABA Therapy',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=900&q=80',
    description: 'Structured support to build positive habits, social learning, and emotional regulation.',
    highlights: ['Positive behavior coaching', 'Clear progress pathways', 'Family reinforcement tools'],
  },
  {
    title: 'Special Education',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    description: 'Individualized learning support tailored to each child’s strengths and needs.',
    highlights: ['Personalized learning plans', 'Skill-based academic support', 'Strength-focused guidance'],
  },
  {
    title: 'Sensory Integration',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
    description: 'Careful sensory planning that helps children feel calm, safe, and more regulated.',
    highlights: ['Calming sensory tools', 'Reliable regulation strategies', 'Comfort through thoughtful design'],
  },
  {
    title: 'Cognitive Skills Training',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80',
    description: 'Tools for attention, memory, problem solving, and emotional awareness.',
    highlights: ['Memory-building games', 'Focus and reasoning practice', 'Growth-minded learning experiences'],
  },
];

export default function TherapyPage() {
  return (
    <main className="bg-sky-50">
      <section className="relative overflow-hidden bg-sky-100 py-24">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top_left,_#9be7ff,_transparent_40%)]" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-sky-200 px-4 py-1 text-sm font-semibold uppercase tracking-[0.24em] text-sky-800">
              Therapy at Mindspring
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl font-serif font-bold tracking-tight text-slate-900">
              Discover guided therapy paths for stronger learning, growth, and emotional wellbeing.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-700">
              Explore warm, evidence-informed programs designed for children, families, and educators. Each path includes interactive tools and supportive coaching to make progress feel clear and hopeful.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact" className="inline-flex items-center rounded-full bg-sky-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-sky-800">
                Request a consultation
              </Link>
              <Link href="/about" className="inline-flex items-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                Learn about our approach
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Therapy pathways</p>
              <h2 className="mt-4 text-3xl sm:text-4xl font-serif font-bold text-slate-900">
                Interactive therapy cards with images, stories, and real-family outcomes.
              </h2>
              <p className="mt-6 text-slate-600 leading-8">
                Select a path to explore how each therapy type supports communication, sensory confidence, school success, and everyday independence.
              </p>
              <div className="mt-10 space-y-6">
                <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                  <h3 className="text-xl font-semibold text-slate-900">Designed for families</h3>
                  <p className="mt-3 text-slate-600">Every program is built around real family routines, with flexible sessions and clear take-home tools.</p>
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
                        <p className="text-sm text-slate-600">Match the right therapy type to your family goals.</p>
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
              <article key={therapy.title} className="group overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-2xl">
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
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-slate-900">{therapy.title}</h3>
                  <p className="mt-3 text-slate-600 leading-7">{therapy.description}</p>
                  <ul className="mt-5 space-y-3">
                    {therapy.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-3 text-slate-600">
                        <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-700">✓</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="mt-8 inline-flex items-center rounded-full bg-sky-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-800"
                  >
                    Explore this path
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 text-white py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-300">Begin with clarity</p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-serif font-bold">Interactive care that feels thoughtful, hopeful, and easy to start.</h2>
          <p className="mt-6 text-slate-300 leading-8">
            Mindspring helps families take the next step with gentle, structured therapy designed for children who learn, grow, and thrive in their own rhythm.
          </p>
          <Link href="/contact" className="mt-10 inline-flex rounded-full bg-sky-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-sky-700">
            Book a discovery call
          </Link>
        </div>
      </section>
    </main>
  );
}
