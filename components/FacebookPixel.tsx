'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const FALLBACK_PIXEL_ID = '946334301338137';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function getPixelId(): string {
  const id = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID?.trim();
  if (!id || id === 'false') return FALLBACK_PIXEL_ID;
  return id;
}

function FacebookPixelInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const pixelId = getPixelId();
    if (typeof window === 'undefined') return;

    const already =
      typeof window.fbq === 'function' ||
      document.head.querySelector('script[data-facebook-pixel-init]');
    if (already) return;

    const script = document.createElement('script');
    script.dataset.facebookPixelInit = pixelId;
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);

    if (!document.body.querySelector('noscript[data-facebook-pixel]')) {
      const noscript = document.createElement('noscript');
      noscript.dataset.facebookPixel = 'true';
      noscript.innerHTML = `
        <img height="1" width="1" style="display:none"
          src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1"
          alt="" />
      `;
      document.body.appendChild(noscript);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const fb = window.fbq;
    if (typeof fb !== 'function') return;
    fb('track', 'PageView');
  }, [pathname, searchParams]);

  return null;
}

export default function FacebookPixel() {
  return (
    <Suspense fallback={null}>
      <FacebookPixelInner />
    </Suspense>
  );
}
