'use client';

import type { CSSProperties } from 'react';
import { motion } from 'motion/react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { RESULTS, SECTION_HEADINGS, SECTION_LABELS } from '@/lib/constants';
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

type ResultsProps = {
  heading?: string;
  settings?: SiteSettings;
};

const FALLBACK_SECTION_HEADING = 'text-[clamp(1.8rem,7vw,5rem)]';
const FALLBACK_MOBILE_SECTION = 'clamp(18px, 6vw, 32px)';

export function Results({ heading, settings }: ResultsProps = {}) {
  const trimmedHeading = heading?.trim();
  const desktopHeading =
    settings?.section_heading_size?.trim() || FALLBACK_SECTION_HEADING;
  const mobileHeading =
    settings?.mobile_section_heading_size?.trim() || FALLBACK_MOBILE_SECTION;

  const bodyDesktop = settings?.body_text_size?.trim() || 'text-xs';
  const metricBodyMobile = settings?.mobile_body_text_size?.trim()
    ? `max-sm:${settings.mobile_body_text_size.trim()}`
    : 'max-sm:text-xs';

  const h2Style = { '--mobile-h2': mobileHeading } as CSSProperties;

  return (
    <section id="results" className="min-w-0 overflow-x-hidden border-y border-white/[0.07] bg-surface py-12 sm:py-20 lg:py-24" aria-label="Results">
      <div className="mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="mb-3 text-center">
          <SectionLabel>{SECTION_LABELS.results}</SectionLabel>
        </div>
        <h2
          style={h2Style}
          className={cn(
            'mobile-heading mx-auto mt-3 max-w-4xl text-center font-display uppercase leading-[1.02] tracking-tight text-white max-sm:text-balance max-sm:leading-none max-sm:tracking-tight',
            desktopHeading,
          )}
        >
          {trimmedHeading ? (
            <span className="inline-block max-w-full px-1 text-balance">{trimmedHeading}</span>
          ) : (
            <span className="mobile-single-line-heading text-center">
              {SECTION_HEADINGS.results.before}{' '}
              <span className="text-blue">{SECTION_HEADINGS.results.accent}</span>
            </span>
          )}
        </h2>
        <div className="mt-10 grid min-w-0 grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/[0.07] bg-white/[0.07] sm:mt-12 lg:grid-cols-5">
          {RESULTS.map((result, index) => (
            <motion.div
              key={result.metric}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className={`min-w-0 overflow-hidden bg-[#020202] px-3 py-6 text-center sm:px-4 sm:py-8 ${
                RESULTS.length % 2 !== 0 && index === RESULTS.length - 1 ? 'col-span-2 lg:col-span-1' : ''
              }`}
            >
              <p className="font-display text-[clamp(1.75rem,6vw,2.75rem)] leading-none text-blue sm:text-5xl lg:text-6xl">
                {result.value}
              </p>
              <p
                className={cn(
                  'mt-2 max-w-[11rem] mx-auto font-medium uppercase leading-snug tracking-wider text-white sm:max-w-none sm:tracking-widest',
                  metricBodyMobile,
                  bodyDesktop.includes(' ') ? bodyDesktop : `sm:${bodyDesktop}`,
                )}
              >
                {result.metric}
              </p>
              <p
                className={cn(
                  'mt-1 text-gray-600',
                  metricBodyMobile,
                  bodyDesktop.includes(' ') ? bodyDesktop : `sm:${bodyDesktop}`,
                )}
              >
                {result.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
