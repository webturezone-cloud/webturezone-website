import Link from 'next/link';
import { LayoutGrid } from 'lucide-react';
import { FOOTER, SITE } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="min-w-0 overflow-x-hidden border-t border-white/[0.08] bg-navy py-14 sm:py-20 lg:py-32">
      <div className="mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="mx-auto grid max-w-content grid-cols-1 gap-10 border-b border-white/[0.08] pb-12 sm:grid-cols-2 sm:gap-12 sm:pb-14 md:grid-cols-4 md:gap-10">
          <div className="sm:col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-white">
                <LayoutGrid className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              </span>
              <span className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                <span className="text-accent-sky">{SITE.namePrefix}</span>
                {SITE.nameSuffix}
              </span>
            </Link>
            <p className="mt-5 max-w-full text-[0.85rem] font-normal leading-[1.65] text-white/50 md:max-w-xs">
              {FOOTER.tagline}
            </p>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-white">
              {FOOTER.columns.services.title}
            </h3>
            {FOOTER.columns.services.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block min-h-10 max-w-full break-words rounded-md py-1.5 text-sm font-normal leading-snug text-white/50 transition-colors first:pt-0 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-white">
              {FOOTER.columns.company.title}
            </h3>
            {FOOTER.columns.company.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block min-h-10 max-w-full break-words rounded-md py-1.5 text-sm font-normal leading-snug text-white/50 transition-colors first:pt-0 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-white">
              {FOOTER.columns.contact.title}
            </h3>
            {FOOTER.columns.contact.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block min-h-10 max-w-full break-words rounded-md py-1.5 text-sm font-normal leading-snug text-white/50 transition-colors first:pt-0 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col flex-wrap items-center justify-center gap-2 border-t border-white/[0.07] pt-6 text-center text-xs text-gray-500 sm:flex-row sm:items-start sm:justify-between sm:text-left">
          <p>{FOOTER.copyright}</p>
          <p>
            {FOOTER.built}{' '}
            <span className="text-blue">{FOOTER.builtAccent}</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
