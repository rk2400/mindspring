import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from '@/lib/contexts/UserContext';
import { CartProvider } from '@/lib/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Script from 'next/script';
import { siteConfig } from '@/config/site-config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `${siteConfig.name} – ${siteConfig.description}`,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: 'website',
    images: [{ url: siteConfig.logo.icon, alt: `${siteConfig.name} logo` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.logo.icon],
  },
  icons: {
    icon: siteConfig.logo.icon,
    apple: siteConfig.logo.icon,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <CartProvider>
            <Header />
              {children}
              <Footer />
            <Toaster position="top-right" />
            {process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID && (
              <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="lazyOnload"
              />
            )}
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}

