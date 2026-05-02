'use client';

import { motion } from 'motion/react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { RESULTS, SECTION_HEADINGS, SECTION_LABELS } from '@/lib/constants';

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
  sectionHeadingSize?: string;
  bodyTextSize?: string;
};

const FALLBACK_SECTION_HEADING = 'text-[clamp(1.8rem,7vw,5rem)]';

export function Results({ heading, sectionHeadingSize, bodyTextSize }: ResultsProps = {}) {
  const trimmedHeading = heading?.trim();
  const sectionSize = sectionHeadingSize?.trim() || FALLBACK_SECTION_HEADING;
  const bodySize = bodyTextSize?.trim() || 'text-xs';

  return (
    <section id="results" className="border-y border-white/[0.07] bg-surface py-16 sm:py-20 lg:py-24" aria-label="Results">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-12">
        <div className="mb-3 text-center">
          <SectionLabel>{SECTION_LABELS.results}</SectionLabel>
        </div>
        <h2
          className={`mx-auto mt-3 max-w-4xl text-center font-display uppercase leading-[1.05] tracking-tight text-balance ${sectionSize}`}
        >
          {trimmedHeading ? (
            <span className="text-white">{trimmedHeading}</span>
          ) : (
            <>
              {SECTION_HEADINGS.results.before}{' '}
              <span className="text-blue">{SECTION_HEADINGS.results.accent}</span>
            </>
          )}
        </h2>
        <div className="mt-12 grid grid-cols-2 gap-px border border-white/[0.07] bg-white/[0.07] lg:grid-cols-5">
          {RESULTS.map((result, index) => (
            <motion.div
              key={result.metric}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className={`bg-[#020202] px-4 py-8 text-center ${
                RESULTS.length % 2 !== 0 && index === RESULTS.length - 1 ? 'col-span-2 lg:col-span-1' : ''
              }`}
            >
              <p className="font-display text-4xl text-blue sm:text-5xl lg:text-6xl">{result.value}</p>
              <p className={`mt-2 font-medium uppercase tracking-widest text-white ${bodySize}`}>{result.metric}</p>
              <p className={`mt-1 text-gray-600 ${bodySize}`}>{result.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
