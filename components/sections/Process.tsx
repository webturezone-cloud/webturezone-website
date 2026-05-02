'use client';

import { motion } from 'framer-motion';
import { BlurText } from '@/components/ui/BlurText';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { PROCESS_STEPS, SECTION_HEADINGS, SECTION_LABELS } from '@/lib/constants';
import { fadeUp } from '@/lib/variants';

export function Process() {
  const processTitle = `${SECTION_HEADINGS.process.before} ${SECTION_HEADINGS.process.accent}`;

  return (
    <section id="process" className="py-16 sm:py-24 lg:py-32" aria-label="Process">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-12">
        <SectionLabel>{SECTION_LABELS.process}</SectionLabel>
        <div className="mx-auto mt-4 flex max-w-4xl justify-center text-center">
          <BlurText
            text={processTitle}
            className="font-display justify-center text-[clamp(1.8rem,5vw,5rem)] font-bold uppercase leading-[1.05] tracking-tight text-white text-balance"
            delay={0.1}
          />
        </div>

        <div className="mt-12 grid grid-cols-1 divide-y divide-white/[0.07] overflow-hidden rounded-xl border border-white/[0.07] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:mt-14 lg:grid-cols-4">
          {PROCESS_STEPS.map((step) => (
            <motion.div
              key={step.num}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative bg-canvas-card p-6 sm:p-8 lg:p-10"
            >
              <span className="absolute right-5 top-5 font-sans text-xs text-accent">→</span>
              <p className="mb-6 font-display text-6xl font-bold leading-none text-blue-500/20 sm:text-8xl">{step.num}</p>
              <h4 className="mb-3 font-display text-xl font-semibold uppercase tracking-tight text-white sm:text-2xl">
                {step.title}
              </h4>
              <p className="text-left text-[0.85rem] leading-[1.65] text-white/50">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
