import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { ContactForm } from '@/components/contact/ContactForm';
import { CONTACT_PAGE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: CONTACT_PAGE.heroSub,
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-0 overflow-x-hidden bg-navy pt-[60px] lg:pt-16">
        <section
          className="relative border-b border-white/[0.07] bg-navy-secondary px-5 py-16 sm:px-6 lg:px-12 lg:py-20"
          aria-label="Contact hero"
        >
          <div className="pointer-events-none absolute inset-0 bg-hero-glow opacity-80" aria-hidden />
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <h1 className="font-display text-3xl uppercase leading-[1.05] tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
              {CONTACT_PAGE.heroTitle}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-slate-300 text-balance sm:text-base">
              {CONTACT_PAGE.heroSub}
            </p>
          </div>
        </section>

        <section className="px-5 py-14 sm:px-6 lg:px-12 lg:py-20" aria-label="Contact details and form">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="text-center lg:text-left">
              <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
                {CONTACT_PAGE.detailsTitle}
              </h2>
              <ul className="mx-auto mt-6 max-w-md space-y-5 text-left lg:mx-0">
                <li>
                  <Link
                    href={`mailto:${CONTACT_PAGE.email}`}
                    className="group flex items-start gap-3 text-white/85 transition hover:text-white"
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-blue">
                      <Mail className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                    </span>
                    <span>
                      <span className="block text-[0.65rem] font-medium uppercase tracking-wider text-white/45">
                        Email
                      </span>
                      <span className="text-sm sm:text-[0.9rem]">{CONTACT_PAGE.email}</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={CONTACT_PAGE.phoneHref}
                    className="group flex items-start gap-3 text-white/85 transition hover:text-white"
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-blue">
                      <Phone className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                    </span>
                    <span>
                      <span className="block text-[0.65rem] font-medium uppercase tracking-wider text-white/45">
                        Phone
                      </span>
                      <span className="text-sm sm:text-[0.9rem]">{CONTACT_PAGE.phone}</span>
                    </span>
                  </Link>
                </li>
                <li className="flex items-start gap-3 text-white/85">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-blue">
                    <MapPin className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span>
                    <span className="block text-[0.65rem] font-medium uppercase tracking-wider text-white/45">
                      Location
                    </span>
                    <span className="text-sm sm:text-[0.9rem]">{CONTACT_PAGE.location}</span>
                  </span>
                </li>
              </ul>
              <p className="mx-auto mt-8 max-w-md text-sm leading-relaxed text-slate-400 lg:mx-0">
                {CONTACT_PAGE.responseNote}
              </p>
            </div>

            <div className="mx-auto w-full min-w-0 max-w-lg lg:mx-0 lg:max-w-none">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
