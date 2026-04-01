import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { theme } from '@/config/theme';

const privacySections = [
  {
    title: '1. Information We Collect',
    body: [
      'We collect information you choose to share with us when you create an account, book appointments, place orders, contact our team, or interact with our services. This may include your name, email address, phone number, delivery address, appointment preferences, therapy-related notes you voluntarily submit, and purchase history.',
      'We may also collect limited technical information such as browser type, device information, IP address, general location data, and usage activity to help us maintain site security, improve performance, and understand how visitors use the website.',
    ],
  },
  {
    title: '2. How We Use Your Information',
    body: [
      'We use your information to operate the website, manage accounts, process orders, coordinate appointments, respond to enquiries, provide customer support, send service-related updates, and improve the quality of our offerings.',
      'If you contact us or submit appointment-related details, we may use that information to review your request, plan follow-up communication, and deliver a more thoughtful and relevant support experience.',
    ],
  },
  {
    title: '3. Appointments and Care-Related Information',
    body: [
      'Some information shared through appointment forms may relate to therapy goals, concerns, developmental needs, or scheduling preferences. We treat this information with care and use it only for appointment coordination, service preparation, and internal administrative review.',
      'Please avoid submitting highly sensitive medical records or confidential health documents through general website forms unless we specifically request them through an appropriate process.',
    ],
  },
  {
    title: '4. Orders and Payments',
    body: [
      'When you purchase products through the website, we use your information to process orders, verify payments, arrange fulfilment, and send order updates. Payment-related verification may involve trusted third-party payment providers or operational partners.',
      'We do not intentionally store complete card or banking credentials on our own servers. Payment processing and verification are handled through the systems and workflows required to complete the transaction securely.',
    ],
  },
  {
    title: '5. Cookies and Similar Technologies',
    body: [
      'We use cookies and similar technologies to keep you signed in, remember preferences, maintain session security, and improve the usability of the website. These tools may also help us understand traffic patterns and diagnose technical issues.',
      'You can control cookies through your browser settings. Disabling some cookies may affect the functionality of certain parts of the website.',
    ],
  },
  {
    title: '6. When We Share Information',
    body: [
      'We do not sell your personal information. We share information only when it is necessary to operate the website and deliver services, such as with payment providers, technical service providers, communications tools, logistics partners, or internal administrative personnel handling appointments and support.',
      'We may also disclose information if required by law, to protect our legal rights, to investigate misuse, or to maintain the safety and integrity of our users, systems, and operations.',
    ],
  },
  {
    title: '7. Data Retention',
    body: [
      'We keep personal information only for as long as it is reasonably necessary for business, legal, operational, support, and record-keeping purposes. The retention period may vary depending on the type of information involved and the purpose for which it was collected.',
      'When information is no longer required, we aim to delete, anonymize, or securely limit access to it in accordance with our internal practices.',
    ],
  },
  {
    title: '8. Data Security',
    body: [
      'We use reasonable administrative, technical, and organizational measures to help protect personal information from unauthorized access, misuse, loss, alteration, or disclosure. However, no website or online transmission can be guaranteed to be completely secure.',
      'You are responsible for maintaining the confidentiality of your account access details and for using the website in a secure manner.',
    ],
  },
  {
    title: '9. Your Choices and Rights',
    body: [
      'You may request access to the personal information we hold about you, ask us to correct inaccurate details, or request deletion of information where appropriate and legally permissible. You may also contact us with questions about how your information is used.',
      'If you no longer wish to receive promotional communications, you may opt out using the unsubscribe option where available or by contacting us directly.',
    ],
  },
  {
    title: '10. Children’s Privacy',
    body: [
      'Because our services may involve children through parents, guardians, or caregivers, we expect personal information relating to children to be submitted responsibly by an authorized adult. We do not knowingly collect information directly from children through unsupervised interactions on the site.',
      'If you believe information relating to a child has been submitted to us improperly, please contact us so we can review the matter promptly.',
    ],
  },
  {
    title: '11. Policy Updates',
    body: [
      'We may update this Privacy Policy from time to time to reflect changes in our services, practices, legal requirements, or operational needs. The most current version will always be posted on this page.',
      'Your continued use of the website after updates are published means you acknowledge the revised policy.',
    ],
  },
];

const summaryCards = [
  {
    label: 'Collected data',
    value: 'Account details, appointments, orders, support requests, and limited technical information.',
  },
  {
    label: 'Primary use',
    value: 'To manage services, coordinate appointments, process purchases, and improve the website experience.',
  },
  {
    label: 'Your control',
    value: 'You can request access, correction, or deletion where appropriate by contacting our team.',
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffaf5_0%,#ffffff_35%,#fff7ed_100%)]">
      <PageHero
        backgroundImage={theme.privacy.hero.backgroundImage}
        alt={theme.privacy.hero.alt}
        tagline={theme.privacy.hero.tagline}
        title={theme.privacy.hero.title}
        subtitle={theme.privacy.hero.subtitle}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="rounded-[32px] border border-orange-100 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.08)] overflow-hidden">
          <div className="border-b border-orange-100 bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 px-6 py-8 sm:px-8 sm:py-10">
            <p className="text-sm uppercase tracking-[0.35em] text-primary-700 font-semibold">Privacy at Mindspring</p>
            <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-900">Privacy Policy</h1>
            <p className="mt-4 max-w-3xl text-sm sm:text-base leading-8 text-slate-600">
              We are committed to handling your information with care, transparency, and respect. This policy explains
              what we collect, how we use it, when we may share it, and the choices available to you when using the
              Mindspring website and services.
            </p>
            <div className="mt-6 inline-flex rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-medium text-orange-700">
              Effective for website visitors, customers, and appointment requests
            </div>
          </div>

          <div className="px-6 py-8 sm:px-8 sm:py-10">
            <div className="grid gap-4 sm:grid-cols-3">
              {summaryCards.map((card, index) => (
                <div
                  key={card.label}
                  className={`rounded-[24px] border p-5 ${
                    index === 0
                      ? 'border-amber-100 bg-amber-50/70'
                      : index === 1
                        ? 'border-orange-100 bg-orange-50/70'
                        : 'border-rose-100 bg-rose-50/70'
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500 font-semibold">{card.label}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{card.value}</p>
                </div>
              ))}
            </div>

            <section className="mt-8 rounded-[28px] border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-slate-900">Overview</h2>
              <p className="mt-4 text-sm leading-8 text-slate-700">
                This Privacy Policy applies to information collected through the Mindspring website, including account
                registration, contact submissions, appointment requests, purchases, and customer support interactions.
                By using the website, you acknowledge the practices described on this page.
              </p>
            </section>

            <div className="mt-8 space-y-5">
              {privacySections.map((section, index) => (
                <section
                  key={section.title}
                  className={`rounded-[28px] border p-6 sm:p-8 ${
                    index % 3 === 0
                      ? 'border-amber-100 bg-amber-50/55'
                      : index % 3 === 1
                        ? 'border-rose-100 bg-rose-50/55'
                        : 'border-orange-100 bg-orange-50/55'
                  }`}
                >
                  <h3 className="text-xl font-semibold text-slate-900">{section.title}</h3>
                  <div className="mt-4 space-y-4 text-sm leading-8 text-slate-700">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <section className="mt-8 rounded-[28px] bg-slate-900 p-6 sm:p-8 text-white">
              <h2 className="text-xl font-semibold">Questions or privacy requests</h2>
              <p className="mt-4 text-sm leading-8 text-slate-200">
                If you have questions about this Privacy Policy, want to request access to your information, or need help
                with a privacy-related concern, please contact us through the{' '}
                <Link className="font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white" href="/contact">
                  contact page
                </Link>.
                We will make reasonable efforts to review and respond within an appropriate timeframe.
              </p>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}
