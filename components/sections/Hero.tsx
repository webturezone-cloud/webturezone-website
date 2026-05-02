'use client';

import { motion } from 'motion/react';
import { Aurora } from '@/components/ui/Aurora';
import { BlurText } from '@/components/ui/BlurText';
import { Magnet } from '@/components/ui/Magnet';
import { Particles } from '@/components/ui/Particles';
import { SplitText } from '@/components/ui/SplitText';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function Hero() {
  return (
    <section
      className="relative flex flex-col items-center overflow-hidden"
      aria-label="Hero"
    >
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

        <div className="mx-auto w-full max-w-4xl text-center">
          <SplitText
            text="We Don't Run Ads."
            className="font-display justify-center text-3xl uppercase leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
            from="bottom"
            splitBy="words"
            delay={0.1}
          />

          <div className="mt-0.5 font-display text-3xl uppercase leading-[1.05] tracking-tight sm:mt-1 sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="text-white">We </span>
            <SplitText
              text="Engineer"
              className="justify-center text-blue"
              from="bottom"
              splitBy="words"
              delay={0.25}
            />
            <span className="text-white"> Results.</span>
          </div>
        </div>

        <BlurText
          text="From Google & Meta ads to full website development and automation systems — we build digital infrastructure that scales your revenue."
          className="mx-auto mt-4 max-w-xl justify-center text-center text-sm font-light leading-relaxed text-gray-400 text-balance sm:max-w-2xl sm:text-base"
          delay={0.4}
          stepDelay={0.03}
        />

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

        <div className="mt-8 grid w-full grid-cols-2 justify-center gap-6 border-t border-white/[0.07] pt-6 sm:mt-9 sm:flex sm:flex-row sm:gap-10 sm:pt-7">
          {[
            { value: '4×', label: 'Avg. ROAS Delivered' },
            { value: '200+', label: 'Campaigns Launched' },
            { value: '98%', label: 'Client Retention' },
            { value: '5M+', label: 'Ad Spend Managed' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl leading-none text-white sm:text-4xl">{stat.value}</div>
              <div className="mt-1 text-[0.65rem] uppercase tracking-[0.1em] text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
