import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from '@/lib/contexts/UserContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
          <Header />
          {children}
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 5000,
              style: {
                borderRadius: '20px',
                background: '#ffffff',
                color: '#111827',
                boxShadow: '0 24px 70px rgba(15, 23, 42, 0.18)',
                border: '1px solid rgba(148, 163, 184, 0.24)',
                padding: '18px 22px',
                minWidth: '320px',
                maxWidth: '460px',
                fontSize: '15px',
                lineHeight: '1.65',
              },
              success: {
                iconTheme: {
                  primary: '#16a34a',
                  secondary: '#ffffff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#dc2626',
                  secondary: '#ffffff',
                },
              },
            }}
          />
        </UserProvider>
      </body>
    </html>
  );
}

