import Image from 'next/image';
import { theme } from '@/config/theme';

export default function AboutPage() {
  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-stone-900">
        <div className="absolute inset-0">
          <Image
            src={theme.about.hero.backgroundImage}
            alt={theme.about.hero.alt}
            fill
            className="object-cover opacity-50"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="block text-white/80 text-sm font-bold tracking-[0.2em] uppercase mb-4">
            {theme.about.hero.tagline}
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
            {theme.about.hero.title}
          </h1>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-serif text-stone-900 mb-6">{theme.about.story.heading}</h2>
            <div className="prose prose-stone text-lg text-stone-600 leading-relaxed space-y-6">
              {theme.about.story.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="order-1 md:order-2 relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={theme.collections.items[0].image}
              alt={theme.collections.items[0].title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-3xl p-12 md:p-20 shadow-sm border border-stone-100 mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-serif text-stone-900 mb-4">{theme.about.commitments.heading}</h2>
            <p className="text-stone-500">{theme.about.commitments.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {theme.about.commitments.items.map((item) => (
              <ValueCard key={item.title} title={item.title} description={item.description} />
            ))}
          </div>
        </div>

        {/* Quotes */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <blockquote className="text-2xl md:text-3xl font-serif text-stone-800 leading-relaxed">
            {theme.about.quote.text}
          </blockquote>
          <p className="mt-4 text-stone-500">{theme.about.quote.author}</p>
        </div>

        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-500">
            Our practice in focus
          </p>
          <h2 className="text-3xl font-serif text-stone-900 mt-4">
            How Mindspring supports families
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-stone-500">
            Real moments from the work we do with children, caregivers, and educators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {theme.about.gallery.items.map((item) => (
            <div
              key={item.title}
              className="group overflow-hidden rounded-[2rem] border border-slate-200 shadow-sm bg-white"
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function ValueCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 mb-6">
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-serif text-stone-900 mb-3">{title}</h3>
      <p className="text-stone-500 leading-relaxed">{description}</p>
    </div>
  );
}

