import Image from 'next/image';
import { theme } from '@/config/theme';
import PageHero from '@/components/PageHero';

export default function AboutPage() {
  const valueIcons = ['💡', '📊', '🤝'];

  return (
    <div className="bg-stone-50 min-h-screen">
      <PageHero
        backgroundImage={theme.about.hero.backgroundImage}
        alt={theme.about.hero.alt}
        tagline={theme.about.hero.tagline}
        title={theme.about.hero.title}
      />

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
              src={theme.about.story.image}
              alt={theme.about.story.imageAlt}
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
            {theme.about.commitments.items.map((item, index) => (
              <ValueCard
                key={item.title}
                title={item.title}
                description={item.description}
                icon={valueIcons[index]}
              />
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
            How Mindspring supports children
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

function ValueCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 mb-6">
        <span className="text-4xl leading-none">{icon}</span>
      </div>
      <h3 className="text-xl font-serif text-stone-900 mb-3">{title}</h3>
      <p className="text-stone-500 leading-relaxed">{description}</p>
    </div>
  );
}

