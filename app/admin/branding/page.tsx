'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { getSiteSettings, updateSetting, uploadMedia } from '@/lib/admin/client-settings';
import { SITE_SETTINGS_DEFAULTS, type SiteSettings } from '@/lib/site-settings';
import { CheckCircle, Loader2, Upload } from 'lucide-react';

const FONT_OPTIONS = [
  'Bebas Neue',
  'Inter',
  'Poppins',
  'Montserrat',
  'Oswald',
  'Raleway',
  'Space Grotesk',
  'Plus Jakarta Sans',
  'DM Sans',
];

export default function BrandingPage() {
  const [settings, setSettings] = useState<SiteSettings>({ ...SITE_SETTINGS_DEFAULTS });
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const logoRef = useRef<HTMLInputElement>(null);
  const faviconRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let active = true;
    getSiteSettings()
      .then((s) => {
        if (active) setSettings(s);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  function flashSaved(key: string) {
    setSaved(key);
    setTimeout(() => setSaved((current) => (current === key ? null : current)), 2000);
  }

  async function handleSave(key: string) {
    setSaving(key);
    const ok = await updateSetting(key, settings[key] ?? '');
    setSaving(null);
    if (ok) flashSaved(key);
  }

  async function handleUpload(key: string, folder: string, file: File) {
    setSaving(key);
    const url = await uploadMedia(file, folder);
    if (url) {
      const ok = await updateSetting(key, url);
      if (ok) {
        setSettings((prev) => ({ ...prev, [key]: url }));
        flashSaved(key);
      }
    }
    setSaving(null);
  }

  if (loading) return <div className="p-10 text-sm text-gray-400">Loading...</div>;

  return (
    <div className="max-w-4xl p-6 lg:p-10">
      <h1 className="mb-2 font-display text-3xl uppercase tracking-wide text-white">Branding</h1>
      <p className="mb-10 text-sm font-light text-gray-400">
        Manage logo, favicon, fonts, and brand colors.
      </p>

      <div className="flex flex-col gap-6">
        <div className="rounded-xl border border-white/[0.07] bg-[#080d1a] p-6">
          <h2 className="mb-6 border-b border-white/[0.07] pb-4 font-display text-lg uppercase text-white">
            Logo
          </h2>

          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <div className="flex h-20 w-32 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-[#0a0f1e]">
              {settings.logo_url ? (
                <Image
                  src={settings.logo_url}
                  alt="Logo"
                  width={120}
                  height={60}
                  className="object-contain"
                  unoptimized
                />
              ) : (
                <span className="text-xs text-gray-600">No logo</span>
              )}
            </div>
            <div>
              <input
                type="file"
                accept="image/*"
                ref={logoRef}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) void handleUpload('logo_url', 'logos', file);
                  e.target.value = '';
                }}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => logoRef.current?.click()}
                disabled={saving === 'logo_url'}
                className="inline-flex items-center gap-2 rounded-lg border border-blue-500/30 bg-blue-500/10 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-blue-400 transition-colors hover:bg-blue-500/20 disabled:opacity-50"
              >
                {saving === 'logo_url' ? (
                  <>
                    <Loader2 className="h-3 w-3 animate-spin" /> Uploading...
                  </>
                ) : saved === 'logo_url' ? (
                  <>
                    <CheckCircle className="h-3 w-3" /> Uploaded!
                  </>
                ) : (
                  <>
                    <Upload className="h-3 w-3" /> Upload Logo
                  </>
                )}
              </button>
              <p className="mt-2 text-xs text-gray-600">PNG, SVG recommended. Max 2MB.</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.07] bg-[#080d1a] p-6">
          <h2 className="mb-6 border-b border-white/[0.07] pb-4 font-display text-lg uppercase text-white">
            Favicon
          </h2>

          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-[#0a0f1e]">
              {settings.favicon_url ? (
                <Image
                  src={settings.favicon_url}
                  alt="Favicon"
                  width={48}
                  height={48}
                  className="object-contain"
                  unoptimized
                />
              ) : (
                <span className="text-[0.6rem] text-gray-600">No favicon</span>
              )}
            </div>
            <div>
              <input
                type="file"
                accept="image/x-icon,image/png,image/svg+xml"
                ref={faviconRef}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) void handleUpload('favicon_url', 'favicons', file);
                  e.target.value = '';
                }}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => faviconRef.current?.click()}
                disabled={saving === 'favicon_url'}
                className="inline-flex items-center gap-2 rounded-lg border border-blue-500/30 bg-blue-500/10 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-blue-400 transition-colors hover:bg-blue-500/20 disabled:opacity-50"
              >
                {saving === 'favicon_url' ? (
                  <>
                    <Loader2 className="h-3 w-3 animate-spin" /> Uploading...
                  </>
                ) : saved === 'favicon_url' ? (
                  <>
                    <CheckCircle className="h-3 w-3" /> Uploaded!
                  </>
                ) : (
                  <>
                    <Upload className="h-3 w-3" /> Upload Favicon
                  </>
                )}
              </button>
              <p className="mt-2 text-xs text-gray-600">ICO or PNG, 32x32px recommended.</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.07] bg-[#080d1a] p-6">
          <h2 className="mb-6 border-b border-white/[0.07] pb-4 font-display text-lg uppercase text-white">
            Brand Colors
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              { key: 'color_primary', label: 'Primary (Background)' },
              { key: 'color_accent', label: 'Accent (Blue)' },
            ].map((color) => (
              <div key={color.key}>
                <label
                  htmlFor={`color-${color.key}`}
                  className="mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-gray-400"
                >
                  {color.label}
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={settings[color.key] || '#000000'}
                    onChange={(e) => setSettings({ ...settings, [color.key]: e.target.value })}
                    className="h-12 w-12 cursor-pointer rounded-lg border border-white/10 bg-transparent"
                    aria-label={`${color.label} swatch`}
                  />
                  <input
                    id={`color-${color.key}`}
                    type="text"
                    value={settings[color.key] ?? ''}
                    onChange={(e) => setSettings({ ...settings, [color.key]: e.target.value })}
                    className="flex-1 rounded-lg border border-white/10 bg-[#0a0f1e] px-4 py-3 font-mono text-sm text-white outline-none transition-colors focus:border-blue-500/50"
                  />
                  <button
                    type="button"
                    onClick={() => handleSave(color.key)}
                    disabled={saving === color.key}
                    className="whitespace-nowrap rounded-lg bg-blue-600 px-4 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                  >
                    {saved === color.key ? '✓' : 'Save'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.07] bg-[#080d1a] p-6">
          <h2 className="mb-6 border-b border-white/[0.07] pb-4 font-display text-lg uppercase text-white">
            Fonts
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              { key: 'font_display', label: 'Display Font (Headlines)' },
              { key: 'font_body', label: 'Body Font (Text)' },
            ].map((font) => (
              <div key={font.key}>
                <label
                  htmlFor={`font-${font.key}`}
                  className="mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-gray-400"
                >
                  {font.label}
                </label>
                <select
                  id={`font-${font.key}`}
                  value={settings[font.key] ?? ''}
                  onChange={(e) => setSettings({ ...settings, [font.key]: e.target.value })}
                  className="mb-3 w-full rounded-lg border border-white/10 bg-[#0a0f1e] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-blue-500/50"
                >
                  {FONT_OPTIONS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => handleSave(font.key)}
                  disabled={saving === font.key}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                >
                  {saved === font.key ? (
                    <>
                      <CheckCircle className="h-3 w-3" /> Saved!
                    </>
                  ) : (
                    'Save Font'
                  )}
                </button>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-gray-600">
            Tip: changing fonts swaps the family used for headings/body via Google Fonts. Only the
            options above are pre-loaded.
          </p>
        </div>
      </div>
    </div>
  );
}
