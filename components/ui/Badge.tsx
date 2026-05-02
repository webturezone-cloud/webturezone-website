import type { ReactNode } from 'react';

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-md border border-accent/35 bg-accent/15 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.05em] text-accent-sky">
      {children}
    </span>
  );
}
