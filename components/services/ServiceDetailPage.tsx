import type { ReactNode } from 'react';
import Link from 'next/link';
import { Footer } from '@/components/sections/Footer';
import { Navbar } from '@/components/sections/Navbar';
import { Aurora } from '@/components/ui/Aurora';
import { Particles } from '@/components/ui/Particles';
import type { ServicePageCopy } from '@/lib/servicePages';

type Props = {
  copy: ServicePageCopy;
  /** Pixel / analytics slot rendered as first node inside `<main>` (e.g. ViewContent trackers). */
  trackingSlot?: ReactNode;
};

export function ServiceDetailPage({ copy, trackingSlot }: Props) {
  return (
    <main className="relative min-h-screen min-w-0 overflow-x-hidden bg-[#020202]">
      {trackingSlot}
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

      <section className="relative z-10 px-4 pb-14 pt-28 sm:px-5 sm:pb-16 sm:pt-32 md:pt-36">
        <div className="mx-auto min-w-0 max-w-7xl">
          <span className="mb-6 inline-flex items-center gap-2 border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-blue-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />
            {copy.badge}
          </span>
          <h1 className="mb-6 max-w-full font-display text-[clamp(1.85rem,7vw,6rem)] uppercase leading-[0.98] tracking-tight text-white sm:leading-none">
            {copy.headlineBefore}
            <span className="text-blue-500">{copy.headlineAccent}</span>
          </h1>
          <p className="mb-10 max-w-2xl text-base font-light leading-relaxed text-gray-400 sm:text-lg">{copy.description}</p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 px-8 py-4 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-blue-700"
            >
              Get a Free Audit →
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 border border-white/20 px-8 py-4 text-xs font-medium uppercase tracking-[0.12em] text-white transition-colors hover:border-white/50"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-t border-white/[0.07] px-4 py-14 sm:px-5 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-blue-400">{copy.gridEyebrow}</p>
          <h2 className="mb-8 font-display text-[clamp(1.45rem,5vw,3.5rem)] uppercase leading-tight tracking-tight text-white sm:mb-12 sm:leading-none">
            {copy.gridH2Before}
            <span className="text-blue-500">{copy.gridH2Accent}</span>
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {copy.cards.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-blue-500/20 bg-[#080d1a] p-6 transition-colors hover:border-blue-500/40"
              >
                <h3 className="mb-3 font-display text-xl uppercase text-white">{item.title}</h3>
                <p className="text-sm font-light leading-relaxed text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 border-t border-white/[0.07] px-4 py-14 sm:px-5 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-blue-400">Results We Deliver</p>
          <h2 className="mb-8 font-display text-[clamp(1.45rem,5vw,3.5rem)] uppercase leading-tight tracking-tight text-white sm:mb-12 sm:leading-none">
            Numbers That <span className="text-blue-500">Prove It.</span>
          </h2>
          <div className="grid grid-cols-2 gap-px border border-white/[0.07] bg-white/[0.07] lg:grid-cols-4">
            {copy.stats.map((stat) => (
              <div key={stat.label} className="min-w-0 bg-[#020202] px-2 py-6 text-center sm:px-4 sm:py-10">
                <p className="font-display text-[clamp(1.85rem,6.5vw,3.25rem)] leading-none text-blue-500 sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 px-1 text-[0.65rem] uppercase leading-snug tracking-wider text-gray-400 sm:text-xs sm:tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 border-t border-white/[0.07] px-4 py-14 sm:px-5 sm:py-20">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-4 font-display text-[clamp(1.5rem,5.5vw,4rem)] uppercase leading-tight tracking-tight text-white sm:leading-none">
            {copy.ctaHeadlineBefore}
            <span className="text-blue-500">{copy.ctaHeadlineAccent}</span>
          </h2>
          <p className="mx-auto mb-8 max-w-md font-light leading-relaxed text-gray-400">{copy.ctaSubtext}</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-blue-600 px-10 py-4 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-blue-700"
          >
            Book Free Strategy Call →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
