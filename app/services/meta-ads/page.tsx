import type { Metadata } from 'next';

import PixelTracker from '@/components/PixelTracker';
import { ServiceDetailPage } from '@/components/services/ServiceDetailPage';
import { META_ADS_PAGE } from '@/lib/servicePages';

export const metadata: Metadata = META_ADS_PAGE.metadata;

export default function MetaAdsPage() {
  return (
    <ServiceDetailPage
      copy={META_ADS_PAGE}
      trackingSlot={<PixelTracker event="ViewContent" data="Meta Ads" />}
    />
  );
}
