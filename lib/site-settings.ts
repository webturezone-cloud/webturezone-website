import { unstable_noStore as noStore } from 'next/cache';
import { createClient } from '@supabase/supabase-js';
import { tryGetSupabasePublicEnv } from './supabase/env';

export type SiteSettings = Record<string, string>;

export const SITE_SETTINGS_DEFAULTS: SiteSettings = {
  hero_headline_1: "We Don't Run Ads.",
  hero_headline_2: 'We Engineer Results.',
  hero_subtext:
    'From Google & Meta ads to full website development and automation systems — we build digital infrastructure that scales your revenue.',
  services_heading: 'Four Weapons. One Agency.',
  results_heading: "Numbers That Don't Lie.",
  whyus_heading: 'We Think. We Build. You Scale.',
  process_heading: 'Simple Process. Serious Results.',
  cta_heading: 'Ready To Stop Wasting Budget?',
  hero_headline_size: 'text-7xl',
  section_heading_size: 'text-5xl',
  body_text_size: 'text-base',
  font_display: 'Bebas Neue',
  font_body: 'DM Sans',
  color_primary: '#020202',
  color_accent: '#4E66D4',
  site_name: 'WebTureZone',
  logo_url: '',
  favicon_url: '',
  google_ads_image: '/images/google-ads.png',
  meta_ads_image: '/images/meta-ads.png',
  web_dev_image: '/images/website-development.png',
  automation_image: '/images/automation-systems.png',
};

/** Server-side fetch (used in RSC + route handlers). Falls back to defaults. */
export async function getSiteSettingsServer(): Promise<SiteSettings> {
  noStore();
  const env = tryGetSupabasePublicEnv();
  if (!env) return { ...SITE_SETTINGS_DEFAULTS };

  const supabase = createClient(env.url, env.anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await supabase.from('site_settings').select('key, value');

  if (error || !data) return { ...SITE_SETTINGS_DEFAULTS };

  const merged: SiteSettings = { ...SITE_SETTINGS_DEFAULTS };
  for (const row of data as { key: string; value: string | null }[]) {
    const value = (row.value ?? '').trim();
    if (value) merged[row.key] = row.value ?? '';
    else if (!(row.key in merged)) merged[row.key] = '';
  }
  return merged;
}
