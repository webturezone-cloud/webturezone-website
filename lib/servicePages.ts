import type { Metadata } from 'next';

export type ServicePageCards = readonly { title: string; desc: string }[];
export type ServicePageStats = readonly { value: string; label: string }[];

export type ServicePageCopy = {
  metadata: Metadata;
  gridEyebrow: string;
  gridH2Before: string;
  gridH2Accent: string;
  badge: string;
  headlineBefore: string;
  headlineAccent: string;
  description: string;
  cards: ServicePageCards;
  stats: ServicePageStats;
  ctaHeadlineBefore: string;
  ctaHeadlineAccent: string;
  ctaSubtext: string;
};

export const NAV_SERVICE_LINKS = [
  { label: 'Google Ads', href: '/services/google-ads' },
  { label: 'Meta Ads', href: '/services/meta-ads' },
  { label: 'Website Development', href: '/services/web-development' },
  { label: 'Automation Systems', href: '/services/automation' },
] as const;

export const GOOGLE_ADS_PAGE: ServicePageCopy = {
  metadata: {
    title: 'Google Ads Agency Pakistan — WebTureZone',
    description:
      "Pakistan's performance-focused Google Ads agency. Search, Display, Shopping & YouTube campaigns that maximize ROAS and turn clicks into customers.",
    keywords: [
      'Google Ads agency Pakistan',
      'Google Ads management Pakistan',
      'PPC agency Pakistan',
      'Google Ads Karachi',
      'Google Ads Lahore',
      'Search ads Pakistan',
    ],
    openGraph: {
      title: 'Google Ads Agency Pakistan — WebTureZone',
      description:
        'Capture high-intent buyers the moment they search. Google Ads campaigns built for maximum ROAS.',
      url: 'https://webturezone.netlify.app/services/google-ads',
    },
  },
  gridEyebrow: 'What We Manage',
  gridH2Before: 'Every Type of ',
  gridH2Accent: 'Google Ad.',
  badge: '01 · Google Ads',
  headlineBefore: 'Google Ads That ',
  headlineAccent: 'Actually Convert.',
  description:
    'We build and manage Google Ads campaigns that capture high-intent buyers the moment they search for your services — turning clicks into customers, not just traffic.',
  cards: [
    {
      title: 'Search Ads',
      desc: 'Show up when people search for exactly what you offer. High intent, high conversion.',
    },
    {
      title: 'Display Ads',
      desc: 'Visual banner ads across millions of websites. Build brand awareness at scale.',
    },
    {
      title: 'Shopping Ads',
      desc: 'Product listings at the top of Google search. Perfect for e-commerce brands.',
    },
    {
      title: 'YouTube Ads',
      desc: 'Video ads that reach your target audience before and during YouTube videos.',
    },
  ],
  stats: [
    { value: '4.2×', label: 'Average ROAS' },
    { value: '67%', label: 'Lower Cost Per Click' },
    { value: '30d', label: 'Time to First Results' },
    { value: '200+', label: 'Campaigns Launched' },
  ],
  ctaHeadlineBefore: 'Ready to Scale With ',
  ctaHeadlineAccent: 'Google Ads?',
  ctaSubtext: 'Book a free strategy call and get a custom Google Ads plan for your business.',
};

export const META_ADS_PAGE: ServicePageCopy = {
  metadata: {
    title: 'Meta Ads Agency Pakistan — WebTureZone',
    description:
      'Facebook and Instagram Ads agency in Pakistan. Full-funnel Meta campaigns that generate leads, sales, and consistent brand growth.',
    keywords: [
      'Meta Ads agency Pakistan',
      'Facebook Ads Pakistan',
      'Instagram Ads Pakistan',
      'Facebook Ads agency Karachi',
      'Meta Ads management',
    ],
    openGraph: {
      title: 'Meta Ads Agency Pakistan — WebTureZone',
      description:
        'Full-funnel Facebook and Instagram campaigns built for leads, sales, and brand growth.',
      url: 'https://webturezone.netlify.app/services/meta-ads',
    },
  },
  gridEyebrow: 'What We Manage',
  gridH2Before: 'Every Placement We ',
  gridH2Accent: 'Optimize.',
  badge: '02 · Meta Ads',
  headlineBefore: 'Meta Ads That ',
  headlineAccent: 'Scale Your Brand.',
  description:
    'We run full-funnel Facebook and Instagram campaigns built to generate leads, sales, and consistent brand growth — from scroll-stopping creatives to precision targeting.',
  cards: [
    {
      title: 'Facebook Ads',
      desc: "Reach your ideal customers on the world's largest social network with laser-precise targeting.",
    },
    {
      title: 'Instagram Ads',
      desc: 'Visually stunning ads that stop the scroll and drive action on Instagram feed, Stories and Reels.',
    },
    {
      title: 'Retargeting',
      desc: "Re-engage visitors who didn't convert the first time. Turn warm audiences into paying customers.",
    },
    {
      title: 'Lookalike Audiences',
      desc: "Find new customers who look exactly like your best existing ones using Meta's AI.",
    },
  ],
  stats: [
    { value: '3.5×', label: 'Average ROAS' },
    { value: '52%', label: 'Lower Cost Per Lead' },
    { value: '14d', label: 'Campaign Launch Time' },
    { value: '150+', label: 'Brands Scaled' },
  ],
  ctaHeadlineBefore: 'Ready to Scale With ',
  ctaHeadlineAccent: 'Meta Ads?',
  ctaSubtext: 'Book a free strategy call and get a custom Meta Ads plan for your business.',
};

export const WEB_DEVELOPMENT_PAGE: ServicePageCopy = {
  metadata: {
    title: 'Website Development Agency Pakistan — WebTureZone',
    description:
      'High-converting websites built for Pakistani businesses. Fast, modern, SEO-optimized websites that turn visitors into customers.',
    keywords: [
      'website development Pakistan',
      'web design agency Pakistan',
      'Next.js development Pakistan',
      'landing page design Pakistan',
      'website design Karachi',
    ],
    openGraph: {
      title: 'Website Development Agency Pakistan — WebTureZone',
      description:
        'Fast, modern, conversion-focused websites built to turn visitors into customers.',
      url: 'https://webturezone.netlify.app/services/web-development',
    },
  },
  gridEyebrow: 'What We Build',
  gridH2Before: 'Web Experiences ',
  gridH2Accent: 'Built to Convert.',
  badge: '03 · Website Development',
  headlineBefore: 'Websites Built To ',
  headlineAccent: 'Convert.',
  description:
    "We build fast, modern, conversion-focused websites that look premium and guide every visitor toward taking action — whether that's a call, a form fill, or a purchase.",
  cards: [
    {
      title: 'Landing Pages',
      desc: 'High-converting single pages designed to turn ad traffic into leads and sales.',
    },
    {
      title: 'Business Websites',
      desc: 'Full multi-page websites that establish credibility and generate inbound leads.',
    },
    {
      title: 'E-commerce Stores',
      desc: 'Online stores built for speed, UX, and maximum conversion rate.',
    },
    {
      title: 'Web Applications',
      desc: 'Custom web apps and dashboards built with modern tech like Next.js and React.',
    },
  ],
  stats: [
    { value: '92%', label: 'Avg PageSpeed Score' },
    { value: '2×', label: 'More Conversions' },
    { value: '14d', label: 'Average Delivery' },
    { value: '50+', label: 'Sites Launched' },
  ],
  ctaHeadlineBefore: 'Ready for a Website That ',
  ctaHeadlineAccent: 'Performs?',
  ctaSubtext: 'Book a free strategy call and get a custom web build plan for your business.',
};

export const AUTOMATION_PAGE: ServicePageCopy = {
  metadata: {
    title: 'Marketing Automation Agency Pakistan — WebTureZone',
    description:
      'CRM automation, lead nurture sequences, and workflow systems for Pakistani businesses. Save time and scale revenue with smart automation.',
    keywords: [
      'marketing automation Pakistan',
      'CRM automation Pakistan',
      'GoHighLevel Pakistan',
      'n8n automation Pakistan',
      'business automation Karachi',
    ],
    openGraph: {
      title: 'Marketing Automation Agency Pakistan — WebTureZone',
      description:
        'CRM flows, nurture sequences, and workflows that save time and scale revenue.',
      url: 'https://webturezone.netlify.app/services/automation',
    },
  },
  gridEyebrow: 'What We Automate',
  gridH2Before: 'Business Flows ',
  gridH2Accent: 'Fully Automated.',
  badge: '04 · Automation Systems',
  headlineBefore: 'Automate Your ',
  headlineAccent: 'Revenue Growth.',
  description:
    'We build CRM flows, lead nurture sequences, reporting dashboards, and workflow systems that save time, eliminate manual work, and scale your revenue while you sleep.',
  cards: [
    {
      title: 'CRM Automation',
      desc: 'Automated pipelines in GoHighLevel, HubSpot or any CRM — leads flow in, deals close.',
    },
    {
      title: 'Lead Nurture',
      desc: 'Email and SMS sequences that follow up with leads automatically until they convert.',
    },
    {
      title: 'Reporting Dashboards',
      desc: 'Live dashboards showing your key metrics — no more manual reporting.',
    },
    {
      title: 'Workflow Systems',
      desc: 'n8n and Make.com automations that connect your tools and eliminate repetitive tasks.',
    },
  ],
  stats: [
    { value: '3.8×', label: 'Faster Lead Follow-up' },
    { value: '80%', label: 'Less Manual Work' },
    { value: '7d', label: 'Setup Time' },
    { value: '100+', label: 'Workflows Built' },
  ],
  ctaHeadlineBefore: 'Ready to Automate Your ',
  ctaHeadlineAccent: 'Business?',
  ctaSubtext: 'Book a free strategy call and get a custom automation roadmap for your business.',
};
