'use client';

/**
 * Renders the lead form. Facebook **Lead** pixel events fire from `ContactLeadForm` after a successful submission.
 */
import { ContactLeadForm } from '@/components/contact/ContactLeadForm';

export function ContactForm() {
  return <ContactLeadForm submitLabel="Send Message" idPrefix="contact" />;
}
