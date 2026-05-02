import type { Metadata } from 'next';

import { ServiceDetailPage } from '@/components/services/ServiceDetailPage';
import { GOOGLE_ADS_PAGE } from '@/lib/servicePages';

export const metadata: Metadata = GOOGLE_ADS_PAGE.metadata;

export default function GoogleAdsPage() {
  return <ServiceDetailPage copy={GOOGLE_ADS_PAGE} />;
}
