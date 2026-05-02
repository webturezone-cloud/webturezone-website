import type { SiteSettings } from '@/lib/site-settings';

const DEFAULT_PRIMARY = '#020202';
const DEFAULT_ACCENT = '#4E66D4';

/**
 * Accent color overrides for CMS-managed `color_accent`.
 * Fonts are controlled globally via `next/font` (Bebas Neue + DM Sans).
 */
export function SiteThemeOverride({ settings }: { settings: SiteSettings }) {
  const accent = (settings.color_accent || DEFAULT_ACCENT).trim();
  const primary = (settings.color_primary || DEFAULT_PRIMARY).trim();

  const css = `
:root {
  --wtz-color-primary: ${primary};
  --wtz-color-accent: ${accent};
}
${
  accent
    ? `.text-blue,
.text-blue-400,
.text-blue-500,
.text-blue-600 { color: ${accent} !important; }
.bg-blue,
.bg-blue-500,
.bg-blue-600,
.bg-blue-700 { background-color: ${accent} !important; }
.bg-blue-dim,
.hover\\:bg-blue-dim:hover,
.hover\\:bg-blue-700:hover { background-color: color-mix(in srgb, ${accent} 80%, black) !important; }
.border-blue,
.border-blue-500 { border-color: ${accent} !important; }
.border-blue-500\\/30 { border-color: color-mix(in srgb, ${accent} 30%, transparent) !important; }
.bg-blue-500\\/10 { background-color: color-mix(in srgb, ${accent} 10%, transparent) !important; }
.bg-blue-500\\/20 { background-color: color-mix(in srgb, ${accent} 20%, transparent) !important; }
.bg-blue-600\\/20 { background-color: color-mix(in srgb, ${accent} 20%, transparent) !important; }`
    : ''
}
`.trim();

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
