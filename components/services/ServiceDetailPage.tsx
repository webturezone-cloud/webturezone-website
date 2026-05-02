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
    <main className="relative min-h-screen overflow-hidden bg-[#020202]">
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

      <section className="relative z-10 px-5 pb-16 pt-36">
        <div className="mx-auto max-w-7xl">
          <span className="mb-6 inline-flex items-center gap-2 border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-blue-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />
            {copy.badge}
          </span>
          <h1 className="mb-6 max-w-4xl font-display text-[clamp(2.5rem,6vw,6rem)] uppercase leading-none tracking-tight text-white">
            {copy.headlineBefore}
            <span className="text-blue-500">{copy.headlineAccent}</span>
          </h1>
          <p className="mb-10 max-w-2xl text-lg font-light leading-relaxed text-gray-400">{copy.description}</p>
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

      <section className="relative z-10 border-t border-white/[0.07] px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-blue-400">{copy.gridEyebrow}</p>
          <h2 className="mb-12 font-display text-[clamp(2rem,4vw,3.5rem)] uppercase leading-none text-white">
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

      <section className="relative z-10 border-t border-white/[0.07] px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-blue-400">Results We Deliver</p>
          <h2 className="mb-12 font-display text-[clamp(2rem,4vw,3.5rem)] uppercase leading-none text-white">
            Numbers That <span className="text-blue-500">Prove It.</span>
          </h2>
          <div className="grid grid-cols-2 gap-px border border-white/[0.07] bg-white/[0.07] lg:grid-cols-4">
            {copy.stats.map((stat) => (
              <div key={stat.label} className="bg-[#020202] px-4 py-10 text-center">
                <p className="font-display text-5xl text-blue-500">{stat.value}</p>
                <p className="mt-2 text-xs uppercase tracking-widest text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 border-t border-white/[0.07] px-5 py-20">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-4 font-display text-[clamp(2rem,5vw,4rem)] uppercase leading-none text-white">
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
