import type { Metadata } from 'next';

import { ServiceDetailPage } from '@/components/services/ServiceDetailPage';
import { META_ADS_PAGE } from '@/lib/servicePages';

export const metadata: Metadata = META_ADS_PAGE.metadata;

export default function MetaAdsPage() {
  return <ServiceDetailPage copy={META_ADS_PAGE} />;
}
