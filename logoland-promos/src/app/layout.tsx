import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/components/providers/CartProvider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta',
});

export const metadata: Metadata = {
  title: 'Logoland Promos | Custom Branded Products & Promotional Items',
  description:
    'Create custom branded promotional products for your business. From apparel to drinkware, office supplies to tech accessories. Fast turnaround, competitive pricing, and expert design support.',
  keywords: [
    'promotional products',
    'custom branded items',
    'corporate gifts',
    'branded apparel',
    'custom drinkware',
    'promotional merchandise',
  ],
  authors: [{ name: 'Logoland Promos' }],
  creator: 'Logoland Promos',
  publisher: 'Logoland Promos',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://logolandpromos.com',
    title: 'Logoland Promos | Custom Branded Products & Promotional Items',
    description:
      'Premium custom branded promotional products and corporate gifts. Design studio, fast production, competitive pricing.',
    siteName: 'Logoland Promos',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Logoland Promos | Custom Branded Products & Promotional Items',
    description:
      'Premium custom branded promotional products and corporate gifts.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <head>
        <meta name="theme-color" content="#020617" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-dark-950 text-white font-inter overflow-x-hidden">
        <CartProvider>
          <Header />
          <main className="pt-16 sm:pt-20">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
