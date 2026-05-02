'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export type AuroraProps = {
  colorStops?: string[];
  /** Motion scale (0.15–0.5 typical) */
  amplitude?: number;
  /** Layer opacity multiplier (0–1) */
  blend?: number;
  /** Time scale */
  speed?: number;
  className?: string;
};

const DEFAULT_STOPS = ['#1e3a8a', '#2563eb', '#0ea5e9'];

export function Aurora({
  colorStops = DEFAULT_STOPS,
  amplitude = 0.35,
  blend = 0.85,
  speed = 0.45,
  className,
}: AuroraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = Math.max(1, w * dpr);
      canvas.height = Math.max(1, h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w >= 1 && h >= 1) {
        const phase = performance.now() * 0.001 * speed;

        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = '#020818';
        ctx.fillRect(0, 0, w, h);

        ctx.globalCompositeOperation = 'screen';

        const cx = w * 0.5;
        const cy = h * 0.45;
        const baseR = Math.max(w, h) * 0.55;
        const a = amplitude * Math.max(w, h) * 0.4;

        colorStops.forEach((color, i) => {
          const n = colorStops.length;
          const ox =
            Math.sin(phase * 0.7 + i * 1.7) * a + Math.cos(phase * 0.35 + i) * (a * 0.35);
          const oy =
            Math.cos(phase * 0.55 + i * 1.2) * a * 0.8 +
            Math.sin(phase * 0.5 + i * 0.9) * (a * 0.25);

          const gx = cx + ox;
          const gy = cy + oy;
          const r = baseR * (0.55 + 0.15 * Math.sin(phase + i));

          const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, r);
          g.addColorStop(0, color);
          g.addColorStop(0.45, color);
          g.addColorStop(1, 'rgba(2,8,24,0)');

          ctx.globalAlpha = blend * (0.55 + (0.45 * (n - i)) / n);
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, w, h);
        });

        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [colorStops, amplitude, blend, speed]);

  return <canvas ref={canvasRef} className={cn('block h-full w-full', className)} aria-hidden />;
}

// USAGE: <div className="absolute inset-0"><Aurora colorStops={["#020818","#2563eb","#0ea5e9"]} /></div>
