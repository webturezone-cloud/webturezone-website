import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { SiteThemeOverride } from '@/components/admin/SiteThemeOverride';
import { getSiteSettingsServer } from '@/lib/site-settings';
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

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettingsServer();
  const siteName = settings.site_name || 'WebTureZone';
  const favicon = settings.favicon_url?.trim();

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://webturezone.com'),
    title: `${siteName} — Digital Growth Agency`,
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
      title: siteName,
      description: "We Don't Run Ads. We Engineer Results.",
      images: ['/images/og-image.png'],
    },
    icons: favicon ? { icon: favicon, shortcut: favicon, apple: favicon } : undefined,
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettingsServer();

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <SiteThemeOverride settings={settings} />
      </head>
      <body className="bg-navy font-sans text-[0.9rem] font-normal leading-relaxed text-white antialiased">
        {children}
      </body>
    </html>
  );
}
