'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { motion } from 'motion/react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SERVICES, SERVICES_SECTION } from '@/lib/constants';
import type { SiteSettings } from '@/lib/site-settings';
import { cn } from '@/lib/utils';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

type ServicesProps = {
  heading?: string;
  imageOverrides?: Record<string, string>;
  settings?: SiteSettings;
};

const FALLBACK_SECTION_HEADING = 'text-[clamp(1.8rem,5vw,5rem)]';
const FALLBACK_MOBILE_SECTION = 'clamp(18px, 6vw, 32px)';

export function Services({
  heading,
  imageOverrides,
  settings,
}: ServicesProps = {}) {
  const trimmedHeading = heading?.trim();
  const desktopHeading =
    settings?.section_heading_size?.trim() || FALLBACK_SECTION_HEADING;
  const mobileHeading =
    settings?.mobile_section_heading_size?.trim() || FALLBACK_MOBILE_SECTION;

  const bodyDesktop = settings?.body_text_size?.trim() || 'text-sm';
  const introBodyMobile = settings?.mobile_body_text_size?.trim()
    ? `max-sm:${settings.mobile_body_text_size.trim()}`
    : 'max-sm:text-sm';

  const cardTitleMobile = settings?.mobile_card_title_size?.trim()
    ? `max-sm:${settings.mobile_card_title_size.trim()}`
    : 'max-sm:text-xl';
  const cardSubMobile = settings?.mobile_subtext_size?.trim()
    ? `max-sm:${settings.mobile_subtext_size.trim()}`
    : 'max-sm:text-sm';

  const h2Style = { '--mobile-h2': mobileHeading } as CSSProperties;

  return (
    <section id="services" className="min-w-0 overflow-x-hidden bg-black py-14 sm:py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <SectionLabel>WHAT WE DO</SectionLabel>
        <h2
          style={h2Style}
          className={cn(
            'font-display mobile-heading mb-3 mt-3 text-center uppercase leading-none tracking-tight text-white max-sm:leading-[0.98] max-sm:tracking-tight',
            desktopHeading,
          )}
        >
          {trimmedHeading ? (
            <span className="inline-block max-w-full px-1 text-balance">{trimmedHeading}</span>
          ) : (
            <span className="mobile-single-line-heading text-center">
              Four Weapons.<span className="text-blue-500"> One Agency.</span>
            </span>
          )}
        </h2>
        <p
          className={cn(
            `mx-auto max-w-xl text-center font-light leading-relaxed text-gray-400`,
            introBodyMobile,
            bodyDesktop.includes(' ') ? bodyDesktop : `sm:${bodyDesktop}`,
          )}
        >
          {SERVICES_SECTION.subtext}
        </p>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:mt-16 sm:gap-5 lg:grid-cols-2">
          {SERVICES.map((service) => {
            const overrideSrc = imageOverrides?.[service.num]?.trim();
            const imageSrc = overrideSrc || service.image;
            return (
              <motion.div
                key={service.num}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="group relative flex min-h-0 min-w-0 flex-col overflow-hidden rounded-2xl border border-blue-500/20 bg-[#080d1a] transition-colors duration-300 hover:border-blue-500/40 sm:min-h-[240px] sm:flex-row sm:items-stretch"
              >
                <div
                  className="relative order-first flex min-h-[180px] flex-shrink-0 items-center justify-center overflow-hidden border-b border-blue-500/10 bg-[#050a15] sm:order-last sm:min-h-0 sm:w-[220px] sm:border-b-0 sm:border-l sm:border-blue-500/10 lg:w-[260px]"
                >
                  <div
                    className="absolute bottom-0 left-1/2 h-8 w-32 -translate-x-1/2 rounded-full bg-blue-500/30 blur-2xl"
                    aria-hidden
                  />
                  <div className="relative z-10 flex h-full w-full items-center justify-center p-6">
                    <Image
                      src={imageSrc}
                      alt={service.title}
                      width={200}
                      height={200}
                      unoptimized
                      className="h-[clamp(100px,26vw,132px)] w-[clamp(100px,26vw,132px)] object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105 sm:h-[180px] sm:w-[180px]"
                    />
                  </div>
                </div>

                <div className="relative z-10 order-last flex flex-1 flex-col justify-between p-6 sm:order-first sm:p-8">
                  <div className="flex flex-col gap-4">
                    <span className="inline-flex w-fit items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-blue-400">
                      {service.num} · {service.title}
                    </span>
                    <h3
                      className={cn(
                        'font-display uppercase leading-tight tracking-wide text-white',
                        cardTitleMobile,
                        'sm:text-2xl lg:text-3xl',
                      )}
                    >
                      {service.title}
                    </h3>
                    <p
                      className={cn(
                        'max-w-xs font-light leading-relaxed text-gray-400',
                        cardSubMobile,
                        'sm:text-sm',
                      )}
                    >
                      {service.desc}
                    </p>
                  </div>
                  <Link
                    href={service.href}
                    className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg border border-blue-500/30 bg-blue-500/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-widest text-blue-400 transition-colors hover:bg-blue-500/20"
                  >
                    Learn More →
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
