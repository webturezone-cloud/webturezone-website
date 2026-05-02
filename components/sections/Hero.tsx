'use client';

import { motion } from 'motion/react';
import { Aurora } from '@/components/ui/Aurora';
import { BlurText } from '@/components/ui/BlurText';
import { Magnet } from '@/components/ui/Magnet';
import { Particles } from '@/components/ui/Particles';
import { SplitText } from '@/components/ui/SplitText';

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
  heroHeadlineSize?: string;
  bodyTextSize?: string;
};

const DEFAULT_LINE_1 = "We Don't Run Ads.";
const DEFAULT_LINE_2 = 'We Engineer Results.';
const DEFAULT_SUBTEXT =
  'From Google & Meta ads to full website development and automation systems — we build digital infrastructure that scales your revenue.';

/** Mobile-safe headline sizing (CMS size overrides when set). */
const HEADLINE_CLAMP_SIZE = 'text-[clamp(1.1rem,5.5vw,6rem)]';

export function Hero({
  headlineLine1,
  headlineLine2,
  subtext,
  heroHeadlineSize,
  bodyTextSize,
}: HeroProps = {}) {
  const line1 = headlineLine1?.trim() || DEFAULT_LINE_1;
  const line2 = headlineLine2?.trim() || DEFAULT_LINE_2;
  const sub = subtext?.trim() || DEFAULT_SUBTEXT;
  const headlineSizeOnly = heroHeadlineSize?.trim() || HEADLINE_CLAMP_SIZE;
  const bodySizeClass = bodyTextSize?.trim() || 'text-sm sm:text-base';

  return (
    <section className="relative flex flex-col items-center overflow-hidden" aria-label="Hero">
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

      <div className="relative z-10 mx-auto flex w-full min-w-0 max-w-7xl flex-col items-center overflow-x-hidden px-5 pt-[120px] pb-[100px] text-center sm:px-6 lg:px-12 lg:pt-[150px] lg:pb-[150px]">
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <span className="mb-4 inline-flex items-center gap-2 border border-blue/30 bg-blue/10 px-4 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-blue sm:mb-5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue" />
            Digital Growth Agency
          </span>
        </motion.div>

        <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-1 text-center sm:gap-2">
          <SplitText
            text={line1}
            className={`font-display justify-center uppercase tracking-tight text-white ${headlineSizeOnly} leading-[0.95] sm:leading-[0.92]`}
            from="bottom"
            splitBy="words"
            delay={0.1}
          />

          <div className={`font-display w-full uppercase tracking-tight ${headlineSizeOnly}`}>
            <SplitText
              text={line2}
              className="justify-center text-white leading-[0.95] sm:leading-[0.92]"
              from="bottom"
              splitBy="words"
              delay={0.25}
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
            className={`mx-auto justify-start text-left font-light leading-relaxed text-gray-400 text-balance sm:justify-center sm:text-center ${bodySizeClass}`}
            delay={0.4}
            stepDelay={0.03}
          />
        </motion.div>

        <div className="mx-auto mt-4 flex w-full max-w-md min-w-0 flex-nowrap items-center justify-center gap-3 sm:mt-5 sm:gap-4">
          <Magnet strength={0.3} className="block min-w-0 flex-1">
            <a
              href="/contact"
              className="inline-flex w-full min-w-0 max-w-full items-center justify-center gap-1 whitespace-nowrap bg-blue px-4 py-2 text-center text-sm font-bold uppercase tracking-[0.06em] text-white transition-all hover:bg-blue-dim sm:px-6 sm:py-3 sm:text-base sm:tracking-[0.1em] md:tracking-[0.12em]"
            >
              Start Growing →
            </a>
          </Magnet>

          <Magnet strength={0.3} className="block min-w-0 flex-1">
            <a
              href="#services"
              className="inline-flex w-full min-w-0 max-w-full items-center justify-center whitespace-nowrap border border-white/20 px-4 py-2 text-center text-sm font-medium uppercase tracking-[0.06em] text-white transition-all hover:border-white/50 sm:px-6 sm:py-3 sm:text-base sm:tracking-[0.1em] md:tracking-[0.12em]"
            >
              See Our Services
            </a>
          </Magnet>
        </div>

        <div className="mt-8 grid w-full grid-cols-2 justify-center gap-8 border-t border-white/[0.07] pt-6 sm:mt-9 sm:flex sm:flex-row sm:gap-10 sm:pt-7">
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
              className="text-center"
            >
              <div className="font-display text-4xl leading-none text-white sm:text-5xl">{stat.value}</div>
              <div className="mt-1 text-[0.7rem] uppercase tracking-[0.1em] text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
