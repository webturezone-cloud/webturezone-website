'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

const NEXT_STEPS = [
  { step: '01', text: "We review your submission and what you're looking to achieve." },
  { step: '02', text: 'If needed, we may follow up with a few quick questions by email.' },
  { step: '03', text: "You'll get a clear next step from our team within 24 hours." },
] as const;

export default function ThankYouPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020202] px-5">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px]"
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-lg rounded-2xl border border-blue-500/20 bg-[#080d1a] p-10 text-center sm:p-14"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
          className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-blue-500/30 bg-blue-600/20"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4E66D4"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </motion.div>

        <h1 className="font-display mb-4 text-4xl uppercase leading-none tracking-wide text-white sm:text-5xl">
          We Got Your <span className="text-blue-500">Message</span>
        </h1>

        <p className="mx-auto mb-10 max-w-sm text-base font-light leading-relaxed text-gray-400">
          Thanks for reaching out. Our team will review your details and get back to you within{' '}
          <span className="font-medium text-white">24 hours</span>.
        </p>

        <div className="mb-8 border-t border-white/[0.07]" />

        <div className="mb-10 flex flex-col gap-4 text-left">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-white/40">
            What happens next
          </p>
          {NEXT_STEPS.map((item) => (
            <div key={item.step} className="flex gap-4">
              <span className="mt-0.5 shrink-0 font-mono text-xs tracking-wider text-blue-400">
                {item.step}
              </span>
              <p className="text-sm font-light leading-relaxed text-gray-400">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-blue-500/30 bg-blue-500/10 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-blue-400 transition-colors hover:bg-blue-500/20"
          >
            Back to home
          </Link>
          <Link
            href="/#services"
            className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white/90 transition-colors hover:bg-white/10"
          >
            Explore services
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
