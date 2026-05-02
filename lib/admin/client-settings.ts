'use client';

import { getSupabaseAdminBrowserClient } from '@/lib/supabase/admin-client';
import { SITE_SETTINGS_DEFAULTS, type SiteSettings } from '@/lib/site-settings';

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = getSupabaseAdminBrowserClient();
  const { data, error } = await supabase.from('site_settings').select('key, value');

  if (error || !data) return { ...SITE_SETTINGS_DEFAULTS };

  const merged: SiteSettings = { ...SITE_SETTINGS_DEFAULTS };
  for (const row of data as { key: string; value: string | null }[]) {
    merged[row.key] = row.value ?? '';
  }
  return merged;
}

export async function updateSetting(key: string, value: string): Promise<boolean> {
  const supabase = getSupabaseAdminBrowserClient();
  const { error } = await supabase
    .from('site_settings')
    .upsert({ key, value }, { onConflict: 'key' });

  if (error) return false;

  try {
    await fetch('/api/revalidate', { method: 'POST' });
  } catch {
    // best-effort
  }

  return true;
}

export async function uploadMedia(file: File, folder: string): Promise<string | null> {
  const supabase = getSupabaseAdminBrowserClient();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const ext = safeName.includes('.') ? safeName.split('.').pop() : 'bin';
  const filename = `${folder}/${Date.now()}-${safeName}`.replace(/\.[^.]+$/, `.${ext}`);

  const { error } = await supabase.storage
    .from('site-media')
    .upload(filename, file, { upsert: true, contentType: file.type || undefined });

  if (error) return null;

  const { data } = supabase.storage.from('site-media').getPublicUrl(filename);
  return data.publicUrl ?? null;
}
