'use client';

import type { CSSProperties } from 'react';
import { useEffect, useMemo, useRef } from 'react';
import {
  motion,
  useAnimation,
  useInView,
} from 'motion/react';
import { cn } from '@/lib/utils';

export type BlurTextProps = {
  text: string;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  duration?: number;
  /** Stagger between words in seconds */
  stepDelay?: number;
  once?: boolean;
  /** Keep words on one row below `lg` when enabled. Avoid for long CMS strings. */
  mobileSingleLine?: boolean;
};

export function BlurText({
  text,
  className,
  style,
  delay = 0,
  duration = 0.55,
  stepDelay = 0.08,
  once = true,
  mobileSingleLine = false,
}: BlurTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: '-10% 0px' });
  const controls = useAnimation();

  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);

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
        staggerChildren: stepDelay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 16,
      filter: 'blur(12px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={cn(
        'inline-flex flex-wrap',
        mobileSingleLine && 'max-lg:w-full max-lg:min-w-0 max-lg:flex-nowrap max-lg:justify-center',
        className,
      )}
      style={style}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span
          key={`w-${i}-${word}`}
          variants={itemVariants}
          className={cn(i < words.length - 1 && 'mr-[0.3em]')}
          style={{ display: 'inline-block' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

// USAGE: <BlurText text="Welcome to WebTureZone" className="text-4xl" delay={0.2} />
