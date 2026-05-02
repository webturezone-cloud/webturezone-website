'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { LayoutGrid, Menu, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Magnet } from '@/components/ui/Magnet';
import { NAV_CTA, NAV_CTA_HREF, NAV_LINKS, SITE } from '@/lib/constants';
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
        <div key={link} className="flex flex-col gap-3">
          <span className="text-[0.75rem] font-medium uppercase tracking-[0.15em] text-white/45">Services</span>
          {NAV_SERVICE_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.875rem] font-normal text-white/[0.70] transition-colors hover:text-white pl-2 border-l border-white/[0.1]"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      );
    }
    return (
      <Link
        key={link}
        href={`/#${link.toLowerCase()}`}
        className="text-[0.875rem] font-normal text-white/[0.70] transition-colors hover:text-white"
        onClick={() => setOpen(false)}
      >
        {link}
      </Link>
    );
  }

  return (
    <header className="fixed top-0 z-50 h-[60px] w-full border-b border-white/[0.06] bg-[rgba(2,8,24,0.80)] backdrop-blur-[12px] lg:h-nav">
      <nav className="mx-auto flex h-full max-w-content items-center px-5 sm:px-6 lg:px-12">
        <Link href="/" className="flex flex-1 items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-white shadow-icon-glow">
            <LayoutGrid className="h-4 w-4" strokeWidth={1.75} aria-hidden />
          </span>
          <span className="text-xl font-semibold tracking-tight text-white lg:text-2xl">
            <span className="text-accent-sky">{SITE.namePrefix}</span>
            {SITE.nameSuffix}
          </span>
        </Link>

        <div className="hidden flex-[2] items-center justify-center gap-6 lg:flex">
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

        <div className="hidden flex flex-1 items-center justify-end lg:flex">
          <Magnet strength={0.25}>
            <Button variant="nav" href={NAV_CTA_HREF}>
              {NAV_CTA}
            </Button>
          </Magnet>
        </div>

        <button
          type="button"
          className="ml-auto text-white lg:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" strokeWidth={1.5} /> : <Menu className="h-6 w-6" strokeWidth={1.5} />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute left-0 top-full w-full overflow-hidden border-b border-white/[0.06] bg-[rgba(2,8,24,0.97)] backdrop-blur-[12px] lg:hidden"
          >
            <div className="flex flex-col gap-6 px-5 py-6 sm:px-6 lg:px-12">
              <Link
                href="/"
                className="text-[0.875rem] font-normal text-white/[0.70] transition-colors hover:text-white"
                onClick={() => setOpen(false)}
              >
                Home
              </Link>
              {NAV_LINKS.map((link) => renderMobileNavLink(link))}
              <Link
                href="/contact"
                className="text-[0.875rem] font-normal text-white/[0.70] transition-colors hover:text-white"
                onClick={() => setOpen(false)}
              >
                Contact
              </Link>
              <Magnet strength={0.25}>
                <Button
                  variant="nav"
                  className="w-full justify-center"
                  href={NAV_CTA_HREF}
                  onClick={() => setOpen(false)}
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
