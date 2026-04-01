import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from '@/lib/contexts/UserContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { siteConfig } from '@/config/site-config';

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
      <body style={{ fontFamily: "Tahoma, 'MS Sans Serif', Arial, sans-serif" }}>
        <UserProvider>
          <Header />
          {children}
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 5000,
              style: {
                borderRadius: '0',
                background: '#d4d0c8',
                color: '#000000',
                boxShadow: '2px 2px 0 #808080',
                border: '2px solid',
                borderTopColor: '#ffffff',
                borderLeftColor: '#ffffff',
                borderRightColor: '#404040',
                borderBottomColor: '#404040',
                padding: '8px 12px',
                minWidth: '240px',
                maxWidth: '400px',
                fontSize: '13px',
                fontFamily: "Tahoma, 'MS Sans Serif', Arial, sans-serif",
              },
            }}
          />
        </UserProvider>
      </body>
    </html>
  );
}
