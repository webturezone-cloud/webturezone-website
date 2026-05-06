'use client';

import type { CSSProperties } from 'react';
import { motion } from 'motion/react';
import { Layers, TrendingUp, User, Zap } from 'lucide-react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SECTION_HEADINGS, SECTION_LABELS, WHY_FEATURES } from '@/lib/constants';
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

const WHY_ICONS = [TrendingUp, Zap, User, Layers] as const;

type WhyUsProps = {
  heading?: string;
  settings?: SiteSettings;
};

const FALLBACK_SECTION_HEADING = 'text-[clamp(2.2rem,6vw,4rem)]';
const FALLBACK_MOBILE_SECTION = 'clamp(18px, 6vw, 32px)';

export function WhyUs({ heading, settings }: WhyUsProps = {}) {
  const trimmedHeading = heading?.trim();
  const desktopHeading =
    settings?.section_heading_size?.trim() || FALLBACK_SECTION_HEADING;
  const mobileHeading =
    settings?.mobile_section_heading_size?.trim() || FALLBACK_MOBILE_SECTION;

  const bodyDesktop = settings?.body_text_size?.trim() || 'text-sm';
  const introBodyMobile = settings?.mobile_body_text_size?.trim()
    ? `max-sm:${settings.mobile_body_text_size.trim()}`
    : 'max-sm:text-sm';
  const featureBodyMobile = settings?.mobile_body_text_size?.trim()
    ? `max-sm:${settings.mobile_body_text_size.trim()}`
    : 'max-sm:text-sm';

  const h2Style = { '--mobile-h2': mobileHeading } as CSSProperties;

  return (
    <section
      id="why-us"
      className="min-w-0 overflow-x-hidden border-y border-white/[0.07] bg-surface py-12 sm:py-16 lg:py-32"
      aria-label="Why WebTureZone"
    >
      <div className="mx-auto w-full min-w-0 max-w-6xl px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <SectionLabel className="text-center lg:text-left">{SECTION_LABELS.why}</SectionLabel>
            <h2
              style={h2Style}
              className={cn(
                'mobile-heading mt-4 font-display uppercase leading-[1.02] tracking-tight text-white max-sm:leading-none max-sm:tracking-tight sm:text-balance',
                desktopHeading,
              )}
            >
              {trimmedHeading ? (
                <span className="inline-block max-w-full">{trimmedHeading}</span>
              ) : (
                <>
                  <span className="mobile-single-line-heading inline-flex justify-center text-center lg:hidden">
                    {SECTION_HEADINGS.why.line1} {SECTION_HEADINGS.why.line2}{' '}
                    <span className="text-blue">{SECTION_HEADINGS.why.accent}</span>
                  </span>
                  <span className="hidden text-balance lg:inline">
                    {SECTION_HEADINGS.why.line1}
                    <br />
                    {SECTION_HEADINGS.why.line2}
                    <br />
                    <span className="text-blue">{SECTION_HEADINGS.why.accent}</span>
                  </span>
                </>
              )}
            </h2>
            <p
              className={cn(
                'mx-auto mt-4 max-w-full font-light leading-relaxed text-slate-300 text-balance lg:mx-0 lg:max-w-sm',
                introBodyMobile,
                bodyDesktop.includes(' ') ? bodyDesktop : `sm:${bodyDesktop}`,
              )}
            >
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
                  viewport={{ once: true, amount: 0.1 }}
                  className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-5 transition-colors duration-200 hover:bg-white/10 sm:p-6"
                >
                  <div className="shrink-0 rounded-lg bg-blue/10 p-2 text-blue">
                    <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <h3 className="text-base font-semibold text-white">{feature.title}</h3>
                    <p
                      className={cn(
                        `mt-1.5 leading-relaxed text-slate-400`,
                        featureBodyMobile,
                        bodyDesktop.includes(' ') ? bodyDesktop : `sm:${bodyDesktop}`,
                      )}
                    >
                      {feature.desc}
                    </p>
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
