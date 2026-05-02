'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SERVICES, SERVICES_SECTION } from '@/lib/constants';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function Services() {
  return (
    <section id="services" className="bg-black py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <SectionLabel>WHAT WE DO</SectionLabel>
        <h2 className="font-display mb-3 mt-3 text-center text-[clamp(1.8rem,5vw,5rem)] uppercase">
          Four Weapons. <span className="text-blue-500">One Agency.</span>
        </h2>
        <p className="mx-auto max-w-xl text-center text-sm font-light leading-relaxed text-gray-400">
          {SERVICES_SECTION.subtext}
        </p>

        <div className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.num}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="group relative flex min-h-0 flex-col items-stretch overflow-hidden rounded-2xl border border-blue-500/20 bg-[#080d1a] transition-colors duration-300 hover:border-blue-500/40 sm:min-h-[240px] sm:flex-row"
              >
                <div className="z-10 flex flex-1 flex-col justify-between p-7 sm:p-8">
                  <div className="flex flex-col gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-600/20">
                      <Icon className="text-blue-400" size={18} aria-hidden />
                    </div>
                    <span className="inline-flex w-fit items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-blue-400">
                      {service.num} · {service.title}
                    </span>
                    <h3 className="font-display text-2xl uppercase leading-tight tracking-wide text-white sm:text-3xl">
                      {service.title}
                    </h3>
                    <p className="max-w-xs text-sm font-light leading-relaxed text-gray-400">{service.desc}</p>
                  </div>
                  <Link
                    href={service.href}
                    className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg border border-blue-500/30 bg-blue-500/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-widest text-blue-400 transition-colors hover:bg-blue-500/20"
                  >
                    Learn More →
                  </Link>
                </div>

                <div className="relative flex min-h-[140px] shrink-0 items-center justify-center overflow-hidden border-t border-blue-500/10 bg-[#050a15] sm:min-h-0 sm:w-[220px] sm:border-l sm:border-t-0 sm:border-blue-500/10 lg:w-[260px]">
                  <div
                    className="absolute bottom-0 left-1/2 h-8 w-32 -translate-x-1/2 rounded-full bg-blue-500/30 blur-2xl"
                    aria-hidden
                  />
                  <div className="relative z-10 flex h-full w-full items-center justify-center p-6">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={200}
                      height={200}
                      unoptimized
                      className="h-[120px] w-[120px] object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105 sm:h-[200px] sm:w-[200px]"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
