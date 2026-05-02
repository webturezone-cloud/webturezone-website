import { SectionLabel } from '@/components/ui/SectionLabel';
import { RESULTS, SECTION_HEADINGS, SECTION_LABELS } from '@/lib/constants';

export function Results() {
  return (
    <section id="results" className="border-y border-white/[0.07] bg-surface py-16 sm:py-20 lg:py-24" aria-label="Results">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-12">
        <div className="mb-3 text-center">
          <SectionLabel>{SECTION_LABELS.results}</SectionLabel>
        </div>
        <h2 className="mx-auto mt-3 max-w-4xl text-center font-display text-[clamp(1.8rem,7vw,5rem)] uppercase leading-[1.05] tracking-tight text-balance">
          {SECTION_HEADINGS.results.before}{' '}
          <span className="text-blue">{SECTION_HEADINGS.results.accent}</span>
        </h2>
        <div className="mt-12 grid grid-cols-2 gap-px border border-white/[0.07] bg-white/[0.07] lg:grid-cols-5">
          {RESULTS.map((result, index) => (
            <div
              key={result.metric}
              className={`bg-[#020202] px-4 py-8 text-center ${
                RESULTS.length % 2 !== 0 && index === RESULTS.length - 1 ? 'col-span-2 lg:col-span-1' : ''
              }`}
            >
              <p className="font-display text-4xl text-blue sm:text-5xl lg:text-6xl">{result.value}</p>
              <p className="mt-2 text-[0.6rem] font-medium uppercase tracking-widest text-white sm:text-xs">
                {result.metric}
              </p>
              <p className="mt-1 text-[0.6rem] text-gray-600 sm:text-xs">{result.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
