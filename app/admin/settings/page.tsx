'use client';

import { useEffect, useState } from 'react';
import { getSiteSettings, updateSetting } from '@/lib/admin/client-settings';
import { SITE_SETTINGS_DEFAULTS, type SiteSettings } from '@/lib/site-settings';
import { CheckCircle, Loader2 } from 'lucide-react';

const FIELDS: { key: string; label: string }[] = [{ key: 'site_name', label: 'Site Name' }];

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({ ...SITE_SETTINGS_DEFAULTS });
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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

  async function handleSave(key: string) {
    setSaving(key);
    const ok = await updateSetting(key, settings[key] ?? '');
    setSaving(null);
    if (ok) {
      setSaved(key);
      setTimeout(() => setSaved((current) => (current === key ? null : current)), 2000);
    }
  }

  if (loading) return <div className="p-10 text-sm text-gray-400">Loading...</div>;

  return (
    <div className="max-w-2xl p-6 lg:p-10">
      <h1 className="mb-2 font-display text-3xl uppercase tracking-wide text-white">Settings</h1>
      <p className="mb-10 text-sm font-light text-gray-400">
        General site settings and configuration.
      </p>

      <div className="rounded-xl border border-white/[0.07] bg-[#080d1a] p-6">
        <h2 className="mb-6 border-b border-white/[0.07] pb-4 font-display text-lg uppercase text-white">
          General
        </h2>
        <div className="flex flex-col gap-6">
          {FIELDS.map((field) => (
            <div key={field.key}>
              <label
                htmlFor={`setting-${field.key}`}
                className="mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-gray-400"
              >
                {field.label}
              </label>
              <input
                id={`setting-${field.key}`}
                type="text"
                value={settings[field.key] ?? ''}
                onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-[#0a0f1e] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-blue-500/50"
              />
              <button
                type="button"
                onClick={() => handleSave(field.key)}
                disabled={saving === field.key}
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
              >
                {saved === field.key ? (
                  <>
                    <CheckCircle className="h-3 w-3" /> Saved!
                  </>
                ) : saving === field.key ? (
                  <>
                    <Loader2 className="h-3 w-3 animate-spin" /> Saving...
                  </>
                ) : (
                  'Save'
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
