'use client';

import { useEffect } from 'react';
import { pixel } from '@/lib/pixel';

interface Props {
  event: 'ViewContent' | 'Contact';
  data?: string;
}

export default function PixelTracker({ event, data }: Props) {
  useEffect(() => {
    if (event === 'ViewContent' && data) pixel.viewContent(data);
    else if (event === 'Contact') pixel.contact();
  }, [event, data]);

  return null;
}
