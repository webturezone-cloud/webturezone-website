'use client';

import { motion } from 'framer-motion';

export function HeroVisual() {
  return (
    <motion.div
      className="relative -mx-[5vw] mt-16 w-[100vw] max-w-none overflow-hidden"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: 'easeOut', delay: 0.2 }}
      aria-hidden
    >
      <div className="h-[min(42vh,420px)] w-full min-h-[220px]">
        <svg
          viewBox="0 0 1440 420"
          className="h-full w-full object-cover"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="ribbon-a" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="45%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
            <linearGradient id="ribbon-b" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#020818" stopOpacity="0" />
            </linearGradient>
            <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="24" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect width="1440" height="420" fill="url(#ribbon-b)" opacity="0.35" />
          <g filter="url(#soft-glow)" opacity="0.95">
            <path
              fill="url(#ribbon-a)"
              d="M-120 340 C 180 120, 420 80, 720 180 C 1020 280, 1260 200, 1560 320 L 1560 420 L -120 420 Z"
            />
            <path
              fill="#60a5fa"
              fillOpacity="0.35"
              d="M-80 360 C 220 200, 460 140, 760 220 C 1080 300, 1320 240, 1580 340 L 1580 420 L -80 420 Z"
            />
            <path
              stroke="rgba(147,197,253,0.5)"
              strokeWidth="1.5"
              fill="none"
              d="M 0 260 Q 360 80, 720 200 T 1440 240"
            />
          </g>
        </svg>
      </div>
    </motion.div>
  );
}
