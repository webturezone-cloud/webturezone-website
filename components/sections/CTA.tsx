'use client';

import type { CSSProperties } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { ContactLeadForm } from '@/components/contact/ContactLeadForm';
import { SplitText } from '@/components/ui/SplitText';
import { CTA_SECTION } from '@/lib/constants';
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

const TRUST_POINTS = [
  'Free 30-minute strategy call',
  'Clear action plan',
  'No pressure, just clarity',
] as const;

type CTAProps = {
  heading?: string;
  settings?: SiteSettings;
};

const FALLBACK_HEADLINE = 'text-3xl lg:text-4xl xl:text-5xl';
const FALLBACK_MOBILE_SECTION = 'clamp(1.8rem,5vw,3rem)';

export function CTA({ heading, settings }: CTAProps = {}) {
  const fallback = `${CTA_SECTION.headlineLine1} ${CTA_SECTION.headlineLine2}`;
  const headline = heading?.trim() || fallback;
  const desktopHeadline =
    settings?.section_heading_size?.trim() || FALLBACK_HEADLINE;
  const mobileHeadline =
    settings?.mobile_section_heading_size?.trim() || FALLBACK_MOBILE_SECTION;

  const bodyDesktop = settings?.body_text_size?.trim() || 'text-sm sm:text-[0.9rem]';
  const ctaBodyMobile = settings?.mobile_body_text_size?.trim()
    ? `max-sm:${settings.mobile_body_text_size.trim()}`
    : 'max-sm:text-sm';

  const headlineStyle = { '--mobile-h2': mobileHeadline } as CSSProperties;

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-navy-secondary py-14 lg:py-20 xl:py-24"
      aria-label="Contact"
    >
      <div className="pointer-events-none absolute inset-0 bg-hero-glow opacity-90" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="mx-auto w-full max-w-lg text-left lg:mx-0 lg:max-w-none">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <SplitText
                text={headline}
                style={headlineStyle}
                className={cn(
                  'justify-center font-display uppercase leading-[1.05] tracking-tight text-white text-balance lg:justify-start',
                  'max-sm:!text-[var(--mobile-h2)]',
                  desktopHeadline,
                )}
                from="bottom"
                splitBy="words"
                delay={0}
              />
            </motion.div>
            <p
              className={cn(
                'mt-4 max-w-md text-left leading-relaxed text-slate-300 text-balance lg:mt-5',
                ctaBodyMobile,
                bodyDesktop.includes(' ') ? bodyDesktop : `sm:${bodyDesktop}`,
              )}
            >
              {CTA_SECTION.subtext}
            </p>
            <ul className="mt-6 flex max-w-md flex-col items-start gap-3 text-left sm:mt-7">
              {TRUST_POINTS.map((point) => (
                <li
                  key={point}
                  className={cn(
                    'flex items-start gap-2.5 leading-snug text-white/75',
                    ctaBodyMobile,
                    bodyDesktop.includes(' ') ? bodyDesktop : `sm:${bodyDesktop}`,
                  )}
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-blue/35 bg-blue/10">
                    <Check className="h-2.5 w-2.5 text-blue" strokeWidth={3} aria-hidden />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="w-full"
          >
            <ContactLeadForm
              idPrefix="cta"
              submitLabel="Book My Strategy Call"
              className="mx-auto w-full max-w-lg rounded-2xl border border-white/[0.1] bg-black/50 p-5 shadow-[0_0_48px_-16px_rgba(78,102,212,0.35)] backdrop-blur-sm sm:p-8"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
