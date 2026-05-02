import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type Align = 'center' | 'left';

export function SectionLabel({
  children,
  align = 'center',
  className,
}: {
  children: ReactNode;
  align?: Align;
  className?: string;
}) {
  const alignClass = align === 'left' ? 'text-left' : 'text-center';

  return (
    <p
      className={cn(
        alignClass,
        'text-[0.75rem] font-medium uppercase tracking-[0.12em] text-white/[0.45]',
        className,
      )}
    >
      {children}
    </p>
  );
}
