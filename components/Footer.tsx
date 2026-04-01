import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-serif text-white tracking-wide">Mindspring</span>
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-xs">
              Mindspring helps children build emotional strength, confident routines, and resilient support skills.
            </p>
            <div className="flex gap-4">
              <SocialLink href="#" label="Instagram" icon={<path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6a5 5 0 100 10 5 5 0 000-10z" />} />
              <SocialLink href="#" label="Twitter" icon={<path d="M8 19c7.732 0 11.964-6.405 11.964-11.964 0-.182 0-.365-.013-.546A8.554 8.554 0 0022 4.56a8.28 8.28 0 01-2.357.646A4.11 4.11 0 0021.447 3a8.22 8.22 0 01-2.605.996A4.104 4.104 0 0015.448 3c-2.266 0-4.103 1.835-4.103 4.102 0 .322.036.636.106.936A11.654 11.654 0 013 4.897a4.1 4.1 0 001.27 5.47 4.06 4.06 0 01-1.858-.513v.05c0 1.99 1.415 3.65 3.292 4.027a4.09 4.09 0 01-1.85.07c.52 1.62 2.03 2.797 3.82 2.833A8.235 8.235 0 012 17.58 11.616 11.616 0 008 19" />} />
              <SocialLink href="#" label="Facebook" icon={<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />} />
            </div>
          </div>

          <div>
            <h4 className="text-white font-serif text-lg mb-6">Explore</h4>
            <ul className="space-y-4">
              <FooterLink href="/about">About Mindspring</FooterLink>
              <FooterLink href="/help">Help Center</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
              <FooterLink href="/about">Child Development</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif text-lg mb-6">Company</h4>
            <ul className="space-y-4">
              <FooterLink href="/about">Our Story</FooterLink>
              <FooterLink href="/help">FAQs</FooterLink>
              <FooterLink href="/contact">Get In Touch</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif text-lg mb-6">Wellbeing Notes</h4>
            <p className="text-slate-400 mb-4 text-sm">
              Subscribe for child development updates, practical therapy tips, and confident growth ideas.
            </p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-primary-500 text-slate-200 placeholder:text-slate-500 transition-colors" 
              />
              <button className="w-full px-4 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-all duration-300 font-medium tracking-wide">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Mindspring. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-slate-400 hover:text-primary-300 transition-colors flex items-center gap-2 group">
        <span className="w-0 group-hover:w-2 h-px bg-primary-300 transition-all duration-300"></span>
        {children}
      </Link>
    </li>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a 
      href={href} 
      aria-label={label}
      className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary-600 hover:text-white transition-all duration-300"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        {icon}
      </svg>
    </a>
  );
}
