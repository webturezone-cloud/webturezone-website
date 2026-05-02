import type { SiteSettings } from '@/lib/site-settings';

const DEFAULT_PRIMARY = '#020202';
const DEFAULT_ACCENT = '#4E66D4';

const PRELOADABLE_FONTS = new Set([
  'Bebas Neue',
  'Inter',
  'Poppins',
  'Montserrat',
  'Oswald',
  'Raleway',
  'Space Grotesk',
  'Plus Jakarta Sans',
  'DM Sans',
]);

function googleFontUrl(family: string) {
  const encoded = family.trim().replace(/\s+/g, '+');
  return `https://fonts.googleapis.com/css2?family=${encoded}:wght@400;500;600;700&display=swap`;
}

/**
 * Server-rendered theme overrides that read from `site_settings`.
 * Injects a Google-Fonts <link> + a <style> block that overrides the
 * Tailwind blue accent + display/body fonts so admin edits show up live.
 */
export function SiteThemeOverride({ settings }: { settings: SiteSettings }) {
  const accent = (settings.color_accent || DEFAULT_ACCENT).trim();
  const primary = (settings.color_primary || DEFAULT_PRIMARY).trim();
  const displayFont = (settings.font_display || '').trim();
  const bodyFont = (settings.font_body || '').trim();

  const fontFamilies = new Set<string>();
  if (displayFont && PRELOADABLE_FONTS.has(displayFont)) fontFamilies.add(displayFont);
  if (bodyFont && PRELOADABLE_FONTS.has(bodyFont)) fontFamilies.add(bodyFont);

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
${
  displayFont && PRELOADABLE_FONTS.has(displayFont)
    ? `.font-display { font-family: '${displayFont}', system-ui, sans-serif !important; }`
    : ''
}
${
  bodyFont && PRELOADABLE_FONTS.has(bodyFont)
    ? `body, .font-sans { font-family: '${bodyFont}', system-ui, sans-serif !important; }`
    : ''
}
`.trim();

  return (
    <>
      {Array.from(fontFamilies).map((family) => (
        <link key={family} rel="stylesheet" href={googleFontUrl(family)} />
      ))}
      <style dangerouslySetInnerHTML={{ __html: css }} />
    </>
  );
}
