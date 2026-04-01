import PageHero from '@/components/PageHero';
import { theme } from '@/config/theme';

export default function ShippingReturnsPage() {
  return (
    <div className="bg-stone-50 min-h-screen">
      <PageHero
        backgroundImage={theme.shipping.hero.backgroundImage}
        alt={theme.shipping.hero.alt}
        tagline={theme.shipping.hero.tagline}
        title={theme.shipping.hero.title}
        subtitle={theme.shipping.hero.subtitle}
      />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="card p-8">
          <h2 className="text-2xl font-serif text-stone-900 mb-4">Shipping</h2>
          <ul className="space-y-2 text-stone-700">
            <li>We are a small business, and shipping is fulfilled by trusted third-party partners.</li>
            <li>We bear shipping costs for standard deliveries within supported metro ZIP codes.</li>
            <li>Orders typically dispatch within 2–3 business days; delivery takes 5–7 business days.</li>
            <li>Tracking details are shared via email after dispatch.</li>
          </ul>
        </div>
        <div className="card p-8">
          <h2 className="text-2xl font-serif text-stone-900 mb-4">Order Cancellations</h2>
          <p className="text-stone-700">
            We currently do not support order cancellations once the order has shipped. If you need assistance before dispatch, contact us and we will try our best to help.
          </p>
        </div>
        <div className="card p-8">
          <h2 className="text-2xl font-serif text-stone-900 mb-4">Returns & Exchanges</h2>
          <ul className="space-y-2 text-stone-700">
            <li>We do not offer returns at this stage; we are still growing and optimizing operations.</li>
            <li>If a product arrives damaged or broken, we will offer an exchange for the same item.</li>
            <li>Please report damage within 48 hours of delivery with photos of the packaging and product.</li>
            <li>Exchanges are processed after verification; we cover re-shipment costs for approved cases.</li>
          </ul>
        </div>
        <div className="card p-8">
          <h2 className="text-2xl font-serif text-stone-900 mb-4">Contact & Support</h2>
          <p className="text-stone-700">
            Your support in our initial stage is truly valuable. For any shipping or exchange queries, reach us via the contact page with your order ID—we respond within 24–48 hours.
          </p>
        </div>
      </main>
    </div>
  );
}
