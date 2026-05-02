'use client';

import { motion } from 'framer-motion';
import { Layers, TrendingUp, User, Zap } from 'lucide-react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SECTION_HEADINGS, SECTION_LABELS, WHY_FEATURES } from '@/lib/constants';
import { fadeUp } from '@/lib/variants';

const WHY_ICONS = [TrendingUp, Zap, User, Layers] as const;

export function WhyUs() {
  return (
    <section
      id="why-us"
      className="border-y border-white/[0.07] bg-surface py-16 lg:py-32"
      aria-label="Why WebTureZone"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <SectionLabel className="text-center lg:text-left">{SECTION_LABELS.why}</SectionLabel>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,6vw,4rem)] uppercase leading-[1.05] tracking-tight text-balance">
              {SECTION_HEADINGS.why.line1}
              <br />
              {SECTION_HEADINGS.why.line2}
              <br />
              <span className="text-blue">{SECTION_HEADINGS.why.accent}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-full text-sm font-light leading-relaxed text-slate-300 text-balance lg:mx-0 lg:max-w-sm">
              {SECTION_HEADINGS.whySub}
            </p>
          </div>

          <div className="w-full min-w-0 space-y-4 lg:space-y-5">
            {WHY_FEATURES.map((feature, index) => {
              const Icon = WHY_ICONS[index];
              return (
                <motion.article
                  key={feature.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-5 transition-colors duration-200 hover:bg-white/10 sm:p-6"
                >
                  <div className="shrink-0 rounded-lg bg-blue/10 p-2 text-blue">
                    <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <h3 className="text-base font-semibold text-white">{feature.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{feature.desc}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
