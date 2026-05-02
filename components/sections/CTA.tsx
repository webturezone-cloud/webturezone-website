'use client';

import { Check } from 'lucide-react';
import { ContactLeadForm } from '@/components/contact/ContactLeadForm';
import { SplitText } from '@/components/ui/SplitText';
import { CTA_SECTION } from '@/lib/constants';

const TRUST_POINTS = [
  'Free 30-minute strategy call',
  'Clear action plan',
  'No pressure, just clarity',
] as const;

type CTAProps = {
  heading?: string;
};

export function CTA({ heading }: CTAProps = {}) {
  const fallback = `${CTA_SECTION.headlineLine1} ${CTA_SECTION.headlineLine2}`;
  const headline = heading?.trim() || fallback;

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-navy-secondary py-14 lg:py-20 xl:py-24"
      aria-label="Contact"
    >
      <div className="pointer-events-none absolute inset-0 bg-hero-glow opacity-90" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="mx-auto w-full max-w-lg text-center lg:mx-0 lg:max-w-none lg:text-left">
            <SplitText
              text={headline}
              className="justify-center font-display text-3xl uppercase leading-[1.05] tracking-tight text-white text-balance lg:text-4xl xl:text-5xl lg:justify-start"
              from="bottom"
              splitBy="words"
              delay={0}
            />
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-300 text-balance sm:text-[0.9rem] lg:mx-0 lg:mt-5">
              {CTA_SECTION.subtext}
            </p>
            <ul className="mx-auto mt-6 flex max-w-md flex-col gap-3 text-left sm:mt-7 lg:mx-0">
              {TRUST_POINTS.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 text-[0.8rem] leading-snug text-white/75 sm:text-[0.85rem]"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-blue/35 bg-blue/10">
                    <Check className="h-2.5 w-2.5 text-blue" strokeWidth={3} aria-hidden />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <ContactLeadForm
            idPrefix="cta"
            submitLabel="Book My Strategy Call"
            className="mx-auto w-full max-w-lg rounded-2xl border border-white/[0.1] bg-black/50 p-5 shadow-[0_0_48px_-16px_rgba(78,102,212,0.35)] backdrop-blur-sm sm:p-8"
          />
        </div>
      </div>
    </section>
  );
}
