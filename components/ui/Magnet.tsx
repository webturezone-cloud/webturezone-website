'use client';

import type { ReactNode } from 'react';
import { useRef } from 'react';
import {
  motion,
  useSpring,
} from 'motion/react';
import { cn } from '@/lib/utils';

const spring = {
  stiffness: 200,
  damping: 18,
  mass: 0.5,
};

export type MagnetProps = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

export function Magnet({
  children,
  strength = 0.4,
  className,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={cn('inline-block will-change-transform', className)}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}

// USAGE: <Magnet strength={0.4}><button>Click Me</button></Magnet>
