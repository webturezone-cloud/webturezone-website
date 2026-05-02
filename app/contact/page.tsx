import type { Metadata } from 'next';
import PixelTracker from '@/components/PixelTracker';
import { ContactForm } from '@/components/contact/ContactForm';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { Aurora } from '@/components/ui/Aurora';
import { Particles } from '@/components/ui/Particles';

export const metadata: Metadata = {
  title: 'Contact Us — WebTureZone | Book a Free Strategy Call',
  description:
    "Book a free 30-minute strategy call with WebTureZone. We'll audit your current setup and build a custom growth plan for your business.",
  keywords: [
    'contact WebTureZone',
    'book strategy call',
    'Google Ads agency Pakistan',
    'Meta Ads agency contact',
    'digital marketing consultation',
  ],
  openGraph: {
    title: 'Contact WebTureZone — Book a Free Strategy Call',
    description:
      'Get a free 30-minute strategy call. Google Ads, Meta Ads, Web Development & Automation experts.',
    url: 'https://webturezone.netlify.app/contact',
  },
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020202]">
      <PixelTracker event="Contact" />
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Aurora
          colorStops={['#020202', '#0a1628', '#4E66D4']}
          blend={0.3}
          speed={0.2}
          amplitude={0.8}
        />
      </div>
      <div className="absolute inset-0 z-0">
        <Particles count={40} color="#4E66D4" speed={0.2} connectDistance={80} />
      </div>

      <Navbar />

      {/* Page Header */}
      <section className="relative z-10 px-5 pb-12 pt-36 text-center">
        <div className="mx-auto max-w-7xl">
          {/* Badge */}
          <span className="mb-6 inline-flex items-center gap-2 border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-blue-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />
            Free Strategy Call
          </span>

          <h1 className="font-display mb-4 text-[clamp(2.5rem,6vw,5rem)] uppercase leading-none tracking-tight text-white">
            Let&apos;s Build Your
            <span className="text-blue-500"> Growth Plan</span>
          </h1>

          <p className="mx-auto max-w-xl text-base font-light leading-relaxed text-gray-400">
            Fill out the form below and we&apos;ll get back to you within 24 hours with a custom strategy for your
            business.
          </p>

          {/* 3 trust points */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs font-light text-gray-500">
            {['✓ Free 30-min strategy call', '✓ No obligation', '✓ Response within 24 hours'].map((item) => (
              <span key={item} className="text-gray-400">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="relative z-10 px-5 pb-24">
        <div className="mx-auto max-w-2xl">
          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
