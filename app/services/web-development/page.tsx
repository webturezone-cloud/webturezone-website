import type { Metadata } from 'next';

import PixelTracker from '@/components/PixelTracker';
import { ServiceDetailPage } from '@/components/services/ServiceDetailPage';
import { WEB_DEVELOPMENT_PAGE } from '@/lib/servicePages';

export const metadata: Metadata = WEB_DEVELOPMENT_PAGE.metadata;

export default function WebDevelopmentPage() {
  return (
    <ServiceDetailPage
      copy={WEB_DEVELOPMENT_PAGE}
      trackingSlot={<PixelTracker event="ViewContent" data="Website Development" />}
    />
  );
}
