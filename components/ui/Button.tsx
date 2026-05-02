import type { MouseEventHandler, ReactNode, ButtonHTMLAttributes } from 'react';
import Link from 'next/link';

type Variant = 'solid' | 'ghost' | 'nav';

const variantClasses: Record<Variant, string> = {
  solid:
    'rounded-md border-0 bg-white px-7 py-3 text-[0.9rem] font-semibold text-navy shadow-none transition-all duration-200 hover:-translate-y-px hover:bg-slate-200',
  ghost:
    'rounded-md border-0 bg-transparent px-5 py-3 text-[0.9rem] font-normal text-white/[0.75] transition-all duration-200 hover:-translate-y-px hover:text-white',
  nav: 'rounded-lg bg-accent px-[1.1rem] py-[0.45rem] text-[0.875rem] font-medium text-white shadow-nav-cta transition-all duration-200 hover:-translate-y-px hover:bg-accent-hover',
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: Variant;
  children: ReactNode;
  href?: string;
};

export function Button({
  variant,
  className = '',
  children,
  href,
  type = 'button',
  onClick,
  ...props
}: ButtonProps) {
  const combined = `inline-flex items-center justify-center gap-2 ${variantClasses[variant]} ${className}`;

  const anchorOnClick = onClick as MouseEventHandler<HTMLAnchorElement> | undefined;

  if (href) {
    return (
      <Link href={href} className={combined} onClick={anchorOnClick} scroll={true}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={combined} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
