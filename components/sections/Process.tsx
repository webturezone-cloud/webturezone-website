'use client';

import type { CSSProperties } from 'react';
import { motion } from 'motion/react';
import { BlurText } from '@/components/ui/BlurText';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { PROCESS_STEPS, SECTION_HEADINGS, SECTION_LABELS } from '@/lib/constants';
import type { SiteSettings } from '@/lib/site-settings';
import { cn } from '@/lib/utils';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

type ProcessProps = {
  heading?: string;
  settings?: SiteSettings;
};

const FALLBACK_TITLE_SIZE = 'text-[clamp(1.8rem,5vw,5rem)]';
const FALLBACK_MOBILE_SECTION = 'clamp(1.8rem,5vw,3rem)';

export function Process({ heading, settings }: ProcessProps = {}) {
  const fallbackTitle = `${SECTION_HEADINGS.process.before} ${SECTION_HEADINGS.process.accent}`;
  const processTitle = heading?.trim() || fallbackTitle;
  const desktopHeading =
    settings?.section_heading_size?.trim() || FALLBACK_TITLE_SIZE;
  const mobileHeading =
    settings?.mobile_section_heading_size?.trim() || FALLBACK_MOBILE_SECTION;

  const bodyDesktop = settings?.body_text_size?.trim() || 'text-[0.85rem]';
  const stepBodyMobile = settings?.mobile_body_text_size?.trim()
    ? `max-sm:${settings.mobile_body_text_size.trim()}`
    : 'max-sm:text-sm';

  const headingStyle = { '--mobile-h2': mobileHeading } as CSSProperties;

  return (
    <section id="process" className="py-16 sm:py-24 lg:py-32" aria-label="Process">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-12">
        <SectionLabel>{SECTION_LABELS.process}</SectionLabel>
        <div className="mx-auto mt-4 flex max-w-4xl justify-center text-center">
          <BlurText
            text={processTitle}
            style={headingStyle}
            className={cn(
              'mobile-heading font-display justify-center font-bold uppercase leading-[1.05] tracking-tight text-white text-balance',
              desktopHeading,
            )}
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
              viewport={{ once: true, amount: 0.1 }}
              className="relative bg-canvas-card p-6 sm:p-8 lg:p-10"
            >
              <span className="absolute right-5 top-5 font-sans text-xs text-accent">→</span>
              <p className="mb-6 font-display text-6xl font-bold leading-none text-blue-500/20 sm:text-8xl">{step.num}</p>
              <h4 className="mb-3 font-display text-xl font-semibold uppercase tracking-tight text-white sm:text-2xl">
                {step.title}
              </h4>
              <p
                className={cn(
                  'text-left leading-[1.65] text-white/50',
                  stepBodyMobile,
                  bodyDesktop.includes(' ') ? bodyDesktop : `sm:${bodyDesktop}`,
                )}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
