import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://webturezone.com'),
  title: 'WebTureZone — Digital Growth Agency',
  description:
    'Google Ads, Meta Ads, Website Development & Automation Systems. We engineer results that scale your revenue.',
  keywords: [
    'Google Ads agency',
    'Meta Ads',
    'Performance marketing Pakistan',
    'Website Development',
    'Marketing Automation',
  ],
  openGraph: {
    title: 'WebTureZone',
    description: "We Don't Run Ads. We Engineer Results.",
    images: ['/images/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-navy font-sans text-[0.9rem] font-normal leading-relaxed text-white antialiased">
        {children}
      </body>
    </html>
  );
}
