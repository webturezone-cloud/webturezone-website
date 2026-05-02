'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

export type ParticlesProps = {
  count?: number;
  color?: string;
  speed?: number;
  maxRadius?: number;
  connectDistance?: number;
  className?: string;
};

export function Particles({
  count = 80,
  color = '#4E66D4',
  speed = 1,
  maxRadius = 3,
  connectDistance = 120,
  className,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const randomParticle = (): Particle => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * speed * 1.8,
      vy: (Math.random() - 0.5) * speed * 1.8,
      r: Math.random() * maxRadius * 0.6 + maxRadius * 0.35,
    });

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = Math.max(1, w * dpr);
      canvas.height = Math.max(1, h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (w > 2 && h > 2) {
        particlesRef.current = Array.from({ length: count }, randomParticle);
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);

      if (w < 2 || h < 2) return;

      ctx.clearRect(0, 0, w, h);

      const parts = particlesRef.current;
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        p.x = Math.max(0, Math.min(w, p.x));
        p.y = Math.max(0, Math.min(h, p.y));
      }

      const d2 = connectDistance * connectDistance;
      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const a = parts[i];
          const b = parts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < d2 && dist2 > 0) {
            const dist = Math.sqrt(dist2);
            const alpha = (1 - dist / connectDistance) ** 1.5 * 0.45;
            ctx.strokeStyle = color;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      ctx.fillStyle = color;
      for (const p of parts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [count, color, speed, maxRadius, connectDistance]);

  return <canvas ref={canvasRef} className={cn('block h-full w-full', className)} aria-hidden />;
}

// USAGE: <div className="absolute inset-0"><Particles count={80} color="#4E66D4" /></div>
