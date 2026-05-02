import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /** Design system — Dark SaaS */
        blue: {
          DEFAULT: '#4E66D4',
          dim: '#3a4fa8',
        },
        gray: '#9A9A9A',
        surface: '#0d0d0f',
        navy: {
          DEFAULT: '#020818',
          secondary: '#050d1f',
        },
        canvas: {
          card: '#0a1628',
        },
        accent: {
          DEFAULT: '#2563EB',
          hover: '#1d4ed8',
          electric: '#3B82F6',
          highlight: '#60A5FA',
          sky: '#93C5FD',
        },
        online: {
          DEFAULT: '#22C55E',
          dot: '#16A34A',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'sans-serif'],
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      fontSize: {
        hero: ['clamp(2.8rem,6vw,4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        section: ['clamp(1.8rem,3.5vw,2.8rem)', { lineHeight: '1.2' }],
      },
      maxWidth: {
        content: '1200px',
        hero: '700px',
        sub: '440px',
        eyebrow: '80px',
      },
      spacing: {
        nav: '64px',
      },
      boxShadow: {
        'card-glow': '0 0 40px rgba(37, 99, 235, 0.12), 0 1px 3px rgba(0,0,0,0.5)',
        'btn-glow': '0 0 20px rgba(37, 99, 235, 0.40)',
        'icon-glow': '0 0 16px rgba(37, 99, 235, 0.30)',
        'nav-cta': '0 0 16px rgba(37,99,235,0.30)',
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(ellipse 120% 80% at 50% -10%, rgba(29,78,216,0.30) 0%, transparent 65%)',
        'hero-overlay':
          'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(29,78,216,0.25) 0%, transparent 70%)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
