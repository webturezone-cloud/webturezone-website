import type { Metadata } from 'next';

import PixelTracker from '@/components/PixelTracker';
import { ServiceDetailPage } from '@/components/services/ServiceDetailPage';
import { GOOGLE_ADS_PAGE } from '@/lib/servicePages';

export const metadata: Metadata = GOOGLE_ADS_PAGE.metadata;

export default function GoogleAdsPage() {
  return (
    <ServiceDetailPage
      copy={GOOGLE_ADS_PAGE}
      trackingSlot={<PixelTracker event="ViewContent" data="Google Ads" />}
    />
  );
}
