'use client';

import { useEffect, useMemo, useRef } from 'react';
import {
  motion,
  useAnimation,
  useInView,
} from 'motion/react';
import { cn } from '@/lib/utils';

export type SplitTextFrom = 'bottom' | 'top' | 'left' | 'right';
export type SplitTextBy = 'words' | 'chars';

export type SplitTextProps = {
  text: string;
  className?: string;
  /** Seconds before stagger starts */
  delay?: number;
  /** Per-item transition duration */
  duration?: number;
  splitBy?: SplitTextBy;
  from?: SplitTextFrom;
  once?: boolean
};

function hiddenState(from: SplitTextFrom) {
  switch (from) {
    case 'top':
      return { opacity: 0, y: -40, x: 0 };
    case 'left':
      return { opacity: 0, x: -40, y: 0 };
    case 'right':
      return { opacity: 0, x: 40, y: 0 };
    case 'bottom':
    default:
      return { opacity: 0, y: 40, x: 0 };
  }
}

export function SplitText({
  text,
  className,
  delay = 0,
  duration = 0.5,
  splitBy = 'words',
  from = 'bottom',
  once = true,
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: '-10% 0px' });
  const controls = useAnimation();

  const items = useMemo(() => {
    if (splitBy === 'words') {
      return text.split(/\s+/).filter(Boolean);
    }
    return Array.from(text);
  }, [text, splitBy]);

  const h = hiddenState(from);

  useEffect(() => {
    if (!isInView) return;
    const t = window.setTimeout(() => {
      void controls.start('visible');
    }, delay * 1000);
    return () => window.clearTimeout(t);
  }, [isInView, delay, controls]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: h,
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={cn('inline-flex flex-wrap gap-x-[0.2em]', className)}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      aria-label={text}
    >
      {items.map((item, i) => (
        <motion.span
          key={`${splitBy}-${i}-${item}`}
          variants={itemVariants}
          className={cn(splitBy === 'words' && 'whitespace-nowrap')}
          style={{ display: 'inline-block' }}
        >
          {item}
        </motion.span>
      ))}
    </motion.span>
  );
}

// USAGE: <SplitText text="Hello World" className="text-6xl font-bold" from="bottom" splitBy="words" />
