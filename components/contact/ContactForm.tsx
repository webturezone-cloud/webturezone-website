'use client';

import { ContactLeadForm } from '@/components/contact/ContactLeadForm';

export function ContactForm() {
  return <ContactLeadForm submitLabel="Send Message" idPrefix="contact" />;
}
