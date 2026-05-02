import Link from 'next/link';
import { LayoutGrid } from 'lucide-react';
import { FOOTER, SITE } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-navy py-16 sm:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-12">
        <div className="mx-auto grid max-w-content grid-cols-2 gap-8 border-b border-white/[0.08] pb-14 sm:grid-cols-2 sm:gap-12 md:grid-cols-4">
          <div className="col-span-2 sm:col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-white">
                <LayoutGrid className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              </span>
              <span className="text-lg font-semibold tracking-tight text-white">
                <span className="text-accent-sky">{SITE.namePrefix}</span>
                {SITE.nameSuffix}
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-[0.85rem] font-normal leading-[1.65] text-white/50">{FOOTER.tagline}</p>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-white">
              {FOOTER.columns.services.title}
            </h3>
            {FOOTER.columns.services.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="mb-2 block text-sm font-normal text-white/50 transition-colors last:mb-0 hover:text-white"
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
                className="mb-2 block text-sm font-normal text-white/50 transition-colors last:mb-0 hover:text-white"
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
                className="mb-2 block text-sm font-normal text-white/50 transition-colors last:mb-0 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col flex-wrap items-center justify-between gap-2 border-t border-white/[0.07] pt-6 text-center text-xs text-gray-500 sm:flex-row sm:text-left">
          <p>© 2025 WebTureZone. All rights reserved.</p>
          <p>
            Built to <span className="text-blue">perform</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
