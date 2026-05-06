import { TRUST_INDUSTRIES, TRUST_STRIP } from '@/lib/constants';

export function TrustStrip() {
  return (
    <section id="trust" className="border-b border-white/[0.07] bg-navy py-8 sm:py-10" aria-label="Trusted industries">
      <div className="mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-6 lg:px-12">
        <p className="mb-5 text-center text-[0.7rem] leading-snug text-white/[0.35] sm:text-[0.75rem]">{TRUST_STRIP.label}</p>
        <div className="grid grid-cols-3 gap-4 sm:flex sm:flex-row sm:flex-wrap sm:justify-center sm:gap-10">
          {TRUST_INDUSTRIES.map((industry) => (
            <span
              key={industry}
              className="font-display text-center text-sm uppercase tracking-[0.12em] text-white/20 transition hover:text-white/50 sm:text-base"
            >
              {industry}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
