'use client';

import { useLayoutEffect, useRef } from 'react';
import type { MotionValue } from 'motion/react';
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useVelocity,
  useAnimationFrame,
} from 'motion/react';
import { cn } from '@/lib/utils';

export type ScrollVelocityProps = {
  texts: string[];
  velocity?: number;
  className?: string;
  separator?: string;
};

type RowProps = {
  text: string;
  velocity: number;
  separator: string;
  direction: 1 | -1;
  scrollVel: MotionValue<number>;
};

function ScrollVelocityRow({ text, velocity, separator, direction, scrollVel }: RowProps) {
  const x = useMotionValue(0);
  const segmentRef = useRef<HTMLSpanElement>(null);
  const segW = useRef(0);

  const unit = separator === '' ? `${text} ` : `${text} ${separator} `;

  useLayoutEffect(() => {
    const el = segmentRef.current;
    if (!el) return;
    const measure = () => {
      segW.current = el.offsetWidth;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [text, separator]);

  useAnimationFrame((_, delta) => {
    const sw = segW.current;
    if (sw <= 0) return;

    const vx = scrollVel.get();
    const scrollBoost = vx * 0.12;
    const pixelsPerSecond = direction * (velocity + scrollBoost);
    const dx = pixelsPerSecond * (delta / 1000);
    let next = x.get() - dx;

    while (next <= -sw) next += sw;
    while (next > 0) next -= sw;

    x.set(next);
  });

  return (
    <div className="relative w-full overflow-hidden py-2">
      <motion.div style={{ x }} className="flex w-max will-change-transform">
        {Array.from({ length: 4 }, (_, i) => (
          <span
            key={i}
            ref={i === 0 ? segmentRef : undefined}
            className="inline-block shrink-0 whitespace-nowrap font-medium text-white/70"
          >
            {unit}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function ScrollVelocity({
  texts,
  velocity = 80,
  className,
  separator = '●',
}: ScrollVelocityProps) {
  const { scrollY } = useScroll();
  const rawVel = useVelocity(scrollY);
  const smoothVel = useSpring(rawVel, { stiffness: 400, damping: 45, mass: 0.15 });

  return (
    <div className={cn('w-full', className)}>
      {texts.map((line, row) => (
        <ScrollVelocityRow
          key={`${line}-${row}`}
          text={line}
          velocity={velocity}
          separator={separator}
          direction={row % 2 === 0 ? 1 : -1}
          scrollVel={smoothVel}
        />
      ))}
    </div>
  );
}

// USAGE: <ScrollVelocity texts={["Google Ads", "Meta Ads", "Web Dev", "Automation"]} velocity={80} />
