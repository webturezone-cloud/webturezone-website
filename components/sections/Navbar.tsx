'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { LayoutGrid, Menu, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Magnet } from '@/components/ui/Magnet';
import { NAV_CTA, NAV_CTA_HREF, NAV_LINKS, SITE } from '@/lib/constants';
import { pixel } from '@/lib/pixel';
import { NAV_SERVICE_LINKS } from '@/lib/servicePages';

export function Navbar() {
  const [open, setOpen] = useState(false);

  function renderDesktopNavLink(link: string) {
    if (link === 'Services') {
      return (
        <div key={link} className="group relative">
          <button
            type="button"
            className="flex items-center gap-1 text-[0.875rem] font-normal uppercase tracking-[0.1em] text-white/[0.70] transition-colors hover:text-white"
          >
            Services
            <ChevronDown className="h-3 w-3" strokeWidth={2} aria-hidden />
          </button>
          <div
            className="invisible absolute left-0 top-full z-50 mt-2 w-56 rounded-xl border border-blue-500/20 bg-[#080d1a] py-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100"
            role="menu"
            aria-label="Services"
          >
            {NAV_SERVICE_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                className="block px-4 py-2.5 text-xs uppercase tracking-widest text-gray-400 transition-colors hover:bg-blue-500/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      );
    }
    return (
      <Link
        key={link}
        href={`/#${link.toLowerCase()}`}
        className="text-[0.875rem] font-normal text-white/[0.70] transition-colors hover:text-white"
      >
        {link}
      </Link>
    );
  }

  function renderMobileNavLink(link: string) {
    if (link === 'Services') {
      return (
        <div key={link} className="flex flex-col gap-2 border-t border-white/[0.06] pt-3 first:border-t-0 first:pt-0">
          <span className="px-1 text-[0.75rem] font-medium uppercase tracking-[0.15em] text-white/45">Services</span>
          <div className="flex flex-col gap-1">
            {NAV_SERVICE_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="min-h-11 rounded-lg py-2.5 pl-3 text-[0.875rem] font-normal text-white/[0.70] transition-colors hover:bg-white/[0.06] hover:text-white"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      );
    }
    return (
      <Link
        key={link}
        href={`/#${link.toLowerCase()}`}
        className="block min-h-11 rounded-lg px-1 py-2.5 text-[0.875rem] font-normal text-white/[0.70] transition-colors hover:bg-white/[0.06] hover:text-white"
        onClick={() => setOpen(false)}
      >
        {link}
      </Link>
    );
  }

  return (
    <header className="fixed top-0 z-50 h-[60px] w-full min-w-0 overflow-x-hidden border-b border-white/[0.06] bg-[rgba(2,8,24,0.80)] backdrop-blur-[12px] md:h-nav">
      <nav className="mx-auto flex h-full max-w-content items-center gap-2 px-4 sm:gap-3 sm:px-6 lg:px-12">
        <Link
          href="/"
          className="flex min-w-0 max-w-[min(100%,16rem)] flex-1 items-center gap-2.5 sm:max-w-none sm:gap-3 md:flex-none md:max-w-none"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-white shadow-icon-glow">
            <LayoutGrid className="h-4 w-4" strokeWidth={1.75} aria-hidden />
          </span>
          <span className="truncate text-lg font-semibold tracking-tight text-white sm:text-xl md:text-2xl">
            <span className="text-accent-sky">{SITE.namePrefix}</span>
            {SITE.nameSuffix}
          </span>
        </Link>

        <div className="hidden flex-[1.4] shrink-0 items-center justify-center gap-5 whitespace-nowrap md:flex lg:gap-6">
          <Link
            href="/"
            className="text-[0.875rem] font-normal text-white/[0.70] transition-colors hover:text-white"
          >
            Home
          </Link>
          {NAV_LINKS.map((link) => renderDesktopNavLink(link))}
          <Link
            href="/contact"
            className="text-[0.875rem] font-normal text-white/[0.70] transition-colors hover:text-white"
          >
            Contact
          </Link>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-2 md:max-w-none">
          <div className="hidden md:block">
            <Magnet strength={0.25}>
              <Button variant="nav" href={NAV_CTA_HREF} onClick={() => pixel.initiateCheckout()}>
                {NAV_CTA}
              </Button>
            </Magnet>
          </div>
          <button
            type="button"
            className="-mr-1 inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/[0.06] md:hidden"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" strokeWidth={1.5} /> : <Menu className="h-6 w-6" strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute left-0 top-full w-full overflow-hidden border-b border-white/[0.06] bg-[rgba(2,8,24,0.97)] backdrop-blur-[12px] md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-5 sm:px-6 lg:px-12">
              <Link
                href="/"
                className="min-h-11 rounded-lg px-1 py-2.5 text-[0.875rem] font-normal text-white/[0.70] transition-colors hover:bg-white/[0.06] hover:text-white"
                onClick={() => setOpen(false)}
              >
                Home
              </Link>
              {NAV_LINKS.map((link) => renderMobileNavLink(link))}
              <Link
                href="/contact"
                className="min-h-11 rounded-lg px-1 py-2.5 text-[0.875rem] font-normal text-white/[0.70] transition-colors hover:bg-white/[0.06] hover:text-white"
                onClick={() => setOpen(false)}
              >
                Contact
              </Link>
              <Magnet strength={0.25}>
                <Button
                  variant="nav"
                  className="w-full justify-center"
                  href={NAV_CTA_HREF}
                  onClick={() => {
                    setOpen(false);
                    pixel.initiateCheckout();
                  }}
                >
                  {NAV_CTA}
                </Button>
              </Magnet>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
