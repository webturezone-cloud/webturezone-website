import type { Metadata } from 'next';

import { ServiceDetailPage } from '@/components/services/ServiceDetailPage';
import { AUTOMATION_PAGE } from '@/lib/servicePages';

export const metadata: Metadata = AUTOMATION_PAGE.metadata;

export default function AutomationPage() {
  return <ServiceDetailPage copy={AUTOMATION_PAGE} />;
}
