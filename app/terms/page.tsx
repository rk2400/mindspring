import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-sky-50">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-serif font-bold text-slate-900 mb-6">Terms of Service</h1>
        <p className="text-slate-600 mb-8">
          By using Mindspring’s services, you agree to these terms of use and our approach to care.
        </p>

        <section className="space-y-6 text-slate-700">
          <div>
            <h2 className="text-xl font-medium text-slate-900 mb-2">Service Agreement</h2>
            <p>
              Mindspring provides mental health and child development support. We work with families to offer tailored guidance, coaching, and resources.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium text-slate-900 mb-2">Booking and Scheduling</h2>
            <p>
              Sessions are scheduled by appointment. Availability may vary based on demand and our team’s calendar.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium text-slate-900 mb-2">Confidentiality</h2>
            <p>
              We maintain confidentiality for all clients within the limits of applicable laws and safety requirements.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium text-slate-900 mb-2">Payments</h2>
            <p>
              Fees are communicated at the time of booking. Payment instructions will be shared when your session is confirmed.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium text-slate-900 mb-2">Liability</h2>
            <p>
              To the extent permitted by law, Mindspring is not liable for indirect or consequential damages arising from the use of our services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium text-slate-900 mb-2">Intellectual Property</h2>
            <p>
              All content, logos, and designs on this website are owned by Mindspring. Do not copy or distribute without permission.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium text-slate-900 mb-2">Contact</h2>
            <p>
              For questions about these terms, contact us via the <Link className="text-sky-600 hover:text-sky-500" href="/contact">contact page</Link>.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
