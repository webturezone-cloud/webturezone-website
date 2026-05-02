const fbq = (...args: unknown[]) => {
  if (typeof window === 'undefined') return;
  const w = window as Window & { fbq?: (...a: unknown[]) => void };
  if (typeof w.fbq !== 'function') return;
  w.fbq(...args);
};

export const pixel = {
  pageView: () => fbq('track', 'PageView'),

  lead: (service?: string) =>
    fbq('track', 'Lead', {
      content_name: service || 'General Inquiry',
      content_category: 'Contact Form',
    }),

  contact: () => fbq('track', 'Contact'),

  viewContent: (service: string) =>
    fbq('track', 'ViewContent', {
      content_name: service,
      content_type: 'service',
    }),

  schedule: () =>
    fbq('track', 'Schedule', {
      content_name: 'Free Strategy Call',
    }),

  initiateCheckout: () =>
    fbq('track', 'InitiateCheckout', {
      content_name: 'Strategy Call CTA',
    }),
};
