'use client';

import { ScrollVelocity } from '@/components/ui/ScrollVelocity';

export function Marquee() {
  return (
    <section className="overflow-hidden border-y border-white/[0.07] bg-surface py-2 sm:py-3">
      <ScrollVelocity
        texts={[
          'Google Ads ● Meta Ads ● Website Development ● Automation Systems ● Lead Generation ● Performance Marketing ● Conversion Optimization',
        ]}
        velocity={60}
        separator=""
        className="font-display text-[0.6rem] uppercase tracking-[0.15em] text-gray-500 sm:text-xs"
      />
    </section>
  );
}
