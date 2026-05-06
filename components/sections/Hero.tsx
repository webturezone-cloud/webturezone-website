'use client';

import type { CSSProperties } from 'react';
import { motion } from 'motion/react';
import { Aurora } from '@/components/ui/Aurora';
import { BlurText } from '@/components/ui/BlurText';
import { Magnet } from '@/components/ui/Magnet';
import { Particles } from '@/components/ui/Particles';
import { SplitText } from '@/components/ui/SplitText';
import type { SiteSettings } from '@/lib/site-settings';
import { pixel } from '@/lib/pixel';
import { cn } from '@/lib/utils';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

type HeroProps = {
  headlineLine1?: string;
  headlineLine2?: string;
  subtext?: string;
  settings?: SiteSettings;
};

const DEFAULT_LINE_1 = "We Don't Run Ads.";
const DEFAULT_LINE_2 = 'We Engineer Results.';
const DEFAULT_SUBTEXT =
  'From Google & Meta ads to full website development and automation systems — we build digital infrastructure that scales your revenue.';

/** Tuned for narrow phones through `lg` clamp override (see `headlineClass`). */
const DEFAULT_MOBILE_HEADLINE = 'clamp(13px, 3.5vw + 0.45rem, 30px)';
const DEFAULT_DESKTOP_HEADLINE = 'sm:text-7xl';
export function Hero({ headlineLine1, headlineLine2, subtext, settings }: HeroProps = {}) {
  const line1 = headlineLine1?.trim() || DEFAULT_LINE_1;
  const line2 = headlineLine2?.trim() || DEFAULT_LINE_2;
  const sub = subtext?.trim() || DEFAULT_SUBTEXT;

  const mobileHeadlineSize = settings?.mobile_hero_headline_size?.trim() || DEFAULT_MOBILE_HEADLINE;
  const desktopHeadlineSize = settings?.hero_headline_size?.trim() || DEFAULT_DESKTOP_HEADLINE;

  const headlineStyle = { '--mobile-hl': mobileHeadlineSize } as CSSProperties;
  /** Only default hero lines use flex-nowrap on small screens; CMS copy may wrap to avoid overflow */
  const heroHeadlineSingleLine =
    line1 === DEFAULT_LINE_1 && line2 === DEFAULT_LINE_2;

  const headlineClass = cn(
    'w-full min-w-0 justify-center font-display uppercase leading-[0.92] tracking-tight text-white sm:leading-[0.92]',
    'max-lg:!text-[var(--mobile-hl)]',
    desktopHeadlineSize,
  );

  const bodyDesktop = settings?.body_text_size?.trim() || 'text-base';
  const heroBodyMobile = settings?.mobile_body_text_size?.trim()
    ? `max-sm:${settings.mobile_body_text_size.trim()}`
    : 'max-sm:text-sm';

  return (
    <section className="relative flex min-w-0 flex-col items-center overflow-x-hidden" aria-label="Hero">
      <div className="absolute inset-0 z-0">
        <Aurora
          colorStops={['#020202', '#0a1628', '#4E66D4']}
          blend={0.4}
          speed={0.3}
          amplitude={1.0}
        />
      </div>

      <div className="absolute inset-0 z-0">
        <Particles
          count={60}
          color="#4E66D4"
          speed={0.3}
          connectDistance={100}
          maxRadius={2}
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full min-w-0 max-w-7xl flex-col items-center overflow-x-hidden px-4 pb-[72px] pt-[104px] text-center sm:px-6 sm:pb-[88px] sm:pt-[120px] lg:px-12 lg:pb-[150px] lg:pt-[150px]">
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <span className="mb-4 inline-flex items-center gap-2 border border-blue/30 bg-blue/10 px-4 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-blue sm:mb-5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue" />
            Digital Growth Agency
          </span>
        </motion.div>

        <div className="mx-auto flex w-full min-w-0 max-w-4xl flex-col items-center gap-0.5 text-center sm:gap-2">
          <SplitText
            text={line1}
            style={headlineStyle}
            className={cn('justify-center', headlineClass)}
            from="bottom"
            splitBy="words"
            delay={0.1}
            mobileSingleLine={heroHeadlineSingleLine}
          />

          <div className="font-display w-full min-w-0 uppercase tracking-tight">
            <SplitText
              text={line2}
              style={headlineStyle}
              className={cn('justify-center', headlineClass)}
              from="bottom"
              splitBy="words"
              delay={0.25}
              mobileSingleLine={heroHeadlineSingleLine}
            />
          </div>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mx-auto mt-4 w-full max-w-xl sm:max-w-2xl"
        >
          <BlurText
            text={sub}
            className={cn(
              'mx-auto justify-start text-left font-light leading-relaxed text-gray-400 text-balance sm:justify-center sm:text-center',
              heroBodyMobile,
              bodyDesktop.includes(' ')
                ? bodyDesktop
                : `sm:${bodyDesktop}`,
            )}
            delay={0.4}
            stepDelay={0.03}
          />
        </motion.div>

        <div className="mx-auto mt-4 flex w-full max-w-md min-w-0 flex-col items-stretch justify-center gap-3 sm:mt-5 md:flex-row md:flex-nowrap md:items-center md:gap-4 md:max-w-xl">
          <Magnet strength={0.3} className="block w-full min-w-0 md:flex-1 md:max-w-none">
            <a
              href="/contact"
              className="inline-flex w-full min-w-0 max-w-full items-center justify-center gap-1 whitespace-nowrap rounded-md bg-blue px-4 py-3 text-center text-[0.8rem] font-bold uppercase tracking-[0.06em] text-white transition-all hover:bg-blue-dim sm:px-6 sm:py-3 sm:text-base sm:tracking-[0.1em] md:tracking-[0.12em]"
              onClick={() => pixel.schedule()}
            >
              Start Growing →
            </a>
          </Magnet>

          <Magnet strength={0.3} className="block w-full min-w-0 md:flex-1 md:max-w-none">
            <a
              href="#services"
              className="inline-flex w-full min-w-0 max-w-full items-center justify-center whitespace-nowrap rounded-md border border-white/20 px-4 py-3 text-center text-[0.8rem] font-medium uppercase tracking-[0.06em] text-white transition-all hover:border-white/50 sm:px-6 sm:py-3 sm:text-base sm:tracking-[0.1em] md:tracking-[0.12em]"
            >
              See Our Services
            </a>
          </Magnet>
        </div>

        <div className="mt-8 grid w-full max-w-lg grid-cols-2 gap-x-4 gap-y-6 border-t border-white/[0.07] pt-6 sm:mt-9 sm:flex sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-12 sm:gap-y-7 sm:pt-7 lg:gap-x-14">
          {[
            { value: '4×', label: 'Avg. ROAS Delivered' },
            { value: '200+', label: 'Campaigns Launched' },
            { value: '98%', label: 'Client Retention' },
            { value: '5M+', label: 'Ad Spend Managed' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="min-w-0 text-center"
            >
              <div className="font-display text-[clamp(1.65rem,5.5vw,2.85rem)] leading-none text-white sm:text-5xl">
                {stat.value}
              </div>
              <div className="mt-1 text-[0.65rem] uppercase leading-snug tracking-[0.1em] text-gray-500 sm:text-[0.7rem]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
