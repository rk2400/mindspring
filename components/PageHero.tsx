import Image from 'next/image';
import Link from 'next/link';

type HeroAction = {
  label: string;
  href: string;
};

type PageHeroProps = {
  backgroundImage: string;
  alt: string;
  tagline: string;
  title: string;
  subtitle?: string;
  primaryCta?: HeroAction;
  secondaryCta?: HeroAction;
};

export default function PageHero({
  backgroundImage,
  alt,
  tagline,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt={alt}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="max-w-3xl text-white">
          <span className="inline-block py-1 px-4 rounded-full bg-white/10 text-white text-sm font-semibold tracking-widest uppercase mb-6">
            {tagline}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-tight mb-6 text-white">
            {title}
          </h1>
          {subtitle ? (
            <p className="text-lg sm:text-xl text-white/85 leading-relaxed max-w-2xl mb-10">
              {subtitle}
            </p>
          ) : null}

          {(primaryCta || secondaryCta) && (
            <div className="flex flex-col sm:flex-row gap-4">
              {primaryCta ? (
                <Link href={primaryCta.href} className="btn btn-primary px-8 py-4">
                  {primaryCta.label}
                </Link>
              ) : null}
              {secondaryCta ? (
                <Link href={secondaryCta.href} className="btn btn-secondary px-8 py-4">
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
