import { BarChart2, Code2, Search, Zap } from 'lucide-react';

export const NAV_LINKS = ['Services', 'Results', 'Process'] as const;

export const SITE = {
  name: 'WebTureZone',
  namePrefix: 'Web',
  nameSuffix: 'TureZone',
} as const;

export const HERO_STATS = [
  { value: '4×', label: 'Avg. ROAS Delivered' },
  { value: '200+', label: 'Campaigns Launched' },
  { value: '98%', label: 'Client Retention' },
  { value: '5M+', label: 'Ad Spend Managed' },
] as const;

export const HERO = {
  badgeChip: 'New',
  badge: 'Digital Growth Agency',
  badgeArrow: '→',
  headlineLine1: "We Don't Run Ads. We",
  headlineLine2: 'Engineer',
  headlineLine3: 'Results.',
  subtext:
    'From Google & Meta ads to full website development and automation systems — we build digital infrastructure that scales your revenue.',
  primaryCta: 'Start Growing',
  secondaryCta: 'See Our Services',
} as const;

/** First three hero stats used in the hero trust bar (icon + label). */
export const HERO_TRUST_STATS = HERO_STATS.slice(0, 3);

export const SERVICES_SECTION = {
  subtext:
    'Full-funnel paid media, web, and automation — engineered as one growth system.',
  resultsLink: 'View results',
} as const;

export const SERVICES = [
  {
    num: '01',
    title: 'Google Ads',
    desc: 'Capture high-intent buyers searching for your services with conversion-focused campaigns that turn clicks into customers.',
    icon: Search,
    image: '/images/google-ads.png',
  },
  {
    num: '02',
    title: 'Meta Ads',
    desc: 'Launch scroll-stopping Facebook and Instagram campaigns built to generate leads, sales, and consistent brand growth.',
    icon: BarChart2,
    image: '/images/meta-ads.png',
  },
  {
    num: '03',
    title: 'Website Development',
    desc: 'Build fast, modern, conversion-focused websites that look premium and guide visitors toward action.',
    icon: Code2,
    image: '/images/website-development.png',
  },
  {
    num: '04',
    title: 'Automation Systems',
    desc: 'CRM flows, lead nurture sequences, reporting dashboards, and workflows that save time and scale revenue.',
    icon: Zap,
    image: '/images/automation-systems.png',
  },
] as const;

export const RESULTS = [
  { value: '4.2×', metric: 'Average ROAS', desc: 'Across Google & Meta campaigns' },
  { value: '67%', metric: 'Lower Cost Per Lead', desc: 'vs. industry average' },
  { value: '3.8×', metric: 'Faster Follow-up', desc: 'With automation systems' },
  { value: '92%', metric: 'PageSpeed Score', desc: 'On our web builds' },
  { value: '30d', metric: 'Time to Results', desc: 'From launch to measurable ROI' },
] as const;

export const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Discovery Call',
    desc: 'We audit your current setup, understand goals, and identify the biggest growth gaps in your funnel.',
  },
  {
    num: '02',
    title: 'Strategy Build',
    desc: 'Custom roadmap: ad structure, landing pages, targeting, budgets, and automation flows.',
  },
  {
    num: '03',
    title: 'Launch & Track',
    desc: 'We deploy everything, set up tracking and dashboards, and deliver first results within 30 days.',
  },
  {
    num: '04',
    title: 'Scale & Optimise',
    desc: 'Weekly reviews, constant A/B testing, and strategic scaling — results compound month after month.',
  },
] as const;

export const WHY_FEATURES = [
  {
    title: 'Data-Driven Decisions',
    desc: 'Every ad, page, and automation is backed by data — not guesswork. We measure everything and optimize relentlessly.',
  },
  {
    title: 'Fast Execution',
    desc: 'No 6-week onboarding. We move fast, launch quickly, and iterate based on live results.',
  },
  {
    title: 'Dedicated Strategist',
    desc: 'You work directly with a senior strategist — not a rotating team of juniors handling your account.',
  },
  {
    title: 'Full-Stack Capability',
    desc: "Ads + website + automation under one roof. No more chasing 3 freelancers who don't talk to each other.",
  },
] as const;

export const TRUST_INDUSTRIES = [
  'E-Commerce',
  'Real Estate',
  'Healthcare',
  'Education',
  'SaaS',
  'Retail',
] as const;

export const MARQUEE_ITEMS = [
  'Google Ads',
  'Meta Ads',
  'Website Development',
  'Automation Systems',
  'Lead Generation',
  'Performance Marketing',
  'Conversion Optimization',
] as const;

export const SECTION_LABELS = {
  services: 'WHAT WE DO',
  results: 'PROOF IT WORKS',
  why: 'WHY WEBTUREZONE',
  process: 'HOW WE WORK',
} as const;

export const SECTION_HEADINGS = {
  services: {
    before: 'Four Weapons.',
    accent: 'One Agency.',
  },
  results: {
    before: 'Numbers That',
    accent: "Don't Lie.",
  },
  why: {
    line1: 'We Think.',
    line2: 'We Build.',
    accent: 'You Scale.',
  },
  whySub:
    'Every campaign is built from scratch around your goals — no cookie-cutter strategies.',
  process: {
    before: 'Simple Process.',
    accent: 'Serious Results.',
  },
} as const;

export const TRUST_STRIP = {
  label: 'Trusted by companies around the world',
} as const;

export const CTA_SERVICE_OPTIONS = [
  'Google Ads',
  'Meta Ads',
  'Website Development',
  'Automation Systems',
  'Full Growth System',
] as const;

export const CTA_SECTION = {
  headlineLine1: 'Ready To Stop',
  headlineLine2: 'Wasting Budget?',
  subtext:
    'Book a free 30-minute strategy call and walk away with a clear action plan — whether you work with us or not.',
  button: 'Book Free Strategy Call',
  bookingEmail: 'hello@webturezone.com',
  bookingHref: 'mailto:hello@webturezone.com?subject=Book%20a%20free%20strategy%20call',
} as const;

export const FOOTER = {
  tagline:
    'A performance-first digital agency specializing in paid ads, web development, and automation systems that grow your revenue.',
  copyright: '© 2026 WebTureZone. All rights reserved.',
  built: 'Built to',
  builtAccent: 'perform',
  columns: {
    services: {
      title: 'Services',
      links: [
        { label: 'Google Ads', href: '#services' },
        { label: 'Meta Ads', href: '#services' },
        { label: 'Website Development', href: '#services' },
        { label: 'Automation Systems', href: '#services' },
      ],
    },
    company: {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#' },
        { label: 'Case Studies', href: '#' },
        { label: 'Pricing', href: '#' },
        { label: 'Blog', href: '#' },
      ],
    },
    contact: {
      title: 'Contact',
      links: [
        { label: 'hello@webturezone.com', href: 'mailto:hello@webturezone.com' },
        { label: 'Book a Call', href: '/contact' },
        { label: 'LinkedIn', href: 'https://linkedin.com' },
        { label: 'Instagram', href: 'https://instagram.com' },
      ],
    },
  },
} as const;

export const MARQUEE_ARIA_LABEL = 'Core marketing and development capabilities';

export const NAV_CTA = 'Get Started';

export const NAV_CTA_HREF = '/contact';

export const CONTACT_PAGE = {
  heroTitle: "Let's Build Your Growth System",
  heroSub:
    "Tell us what you're working on and we'll help you map the next best step.",
  detailsTitle: 'Contact Details',
  email: 'hello@webturezone.com',
  phone: '+92 300 123 4567',
  phoneHref: 'tel:+923001234567',
  location: 'Karachi, Pakistan · Remote worldwide',
  responseNote: 'We usually respond within 24 hours.',
} as const;
