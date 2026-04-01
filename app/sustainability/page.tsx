import PageHero from '@/components/PageHero';
import { theme } from '@/config/theme';

export default function SustainabilityPage() {
  return (
    <div className="bg-stone-50 min-h-screen">
      <PageHero
        backgroundImage={theme.sustainability.hero.backgroundImage}
        alt={theme.sustainability.hero.alt}
        tagline={theme.sustainability.hero.subtitle}
        title={theme.sustainability.hero.title}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {theme.sustainability.initiatives.map((initiative) => (
            <div key={initiative.title} className="card p-6">
              <h3 className="text-xl font-serif text-stone-900 mb-3">{initiative.title}</h3>
              <p className="text-stone-600">{initiative.description}</p>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-100 mb-12">
          <h2 className="text-2xl font-serif text-stone-900 mb-4">Our Approach</h2>
          <p className="text-stone-600 leading-relaxed">
            {theme.sustainability.community.description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card p-8">
            <h3 className="text-xl font-serif text-stone-900 mb-3">Care & Reuse</h3>
            <ul className="space-y-2 text-stone-600">
              {theme.sustainability.careTips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>
          <div className="card p-8">
            <h3 className="text-xl font-serif text-stone-900 mb-3">{theme.sustainability.community.title}</h3>
            <p className="text-stone-600">{theme.sustainability.community.description}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
