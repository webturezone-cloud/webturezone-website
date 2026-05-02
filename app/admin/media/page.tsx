'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { getSiteSettings, updateSetting, uploadMedia } from '@/lib/admin/client-settings';
import { SITE_SETTINGS_DEFAULTS, type SiteSettings } from '@/lib/site-settings';
import { CheckCircle, Loader2, Upload } from 'lucide-react';

const MEDIA_FIELDS = [
  { key: 'google_ads_image', label: 'Google Ads Image', folder: 'services' },
  { key: 'meta_ads_image', label: 'Meta Ads Image', folder: 'services' },
  { key: 'web_dev_image', label: 'Website Development Image', folder: 'services' },
  { key: 'automation_image', label: 'Automation Systems Image', folder: 'services' },
];

export default function MediaPage() {
  const [settings, setSettings] = useState<SiteSettings>({ ...SITE_SETTINGS_DEFAULTS });
  const [uploading, setUploading] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

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

  async function handleUpload(key: string, folder: string, file: File) {
    setUploading(key);
    const url = await uploadMedia(file, folder);
    if (url) {
      const ok = await updateSetting(key, url);
      if (ok) {
        setSettings((prev) => ({ ...prev, [key]: url }));
        setSaved(key);
        setTimeout(() => setSaved((current) => (current === key ? null : current)), 2000);
      }
    }
    setUploading(null);
  }

  if (loading) return <div className="p-10 text-sm text-gray-400">Loading...</div>;

  return (
    <div className="max-w-4xl p-6 lg:p-10">
      <h1 className="mb-2 font-display text-3xl uppercase tracking-wide text-white">Media Manager</h1>
      <p className="mb-10 text-sm font-light text-gray-400">
        Upload and manage service card images.
      </p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {MEDIA_FIELDS.map((field) => (
          <div key={field.key} className="rounded-xl border border-white/[0.07] bg-[#080d1a] p-6">
            <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-gray-400">
              {field.label}
            </p>

            <div className="relative mb-4 flex h-40 w-full items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-[#0a0f1e]">
              {settings[field.key] ? (
                <Image
                  src={settings[field.key]}
                  alt={field.label}
                  fill
                  className="object-contain p-4"
                  unoptimized
                />
              ) : (
                <p className="text-xs text-gray-600">No image</p>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              ref={(el) => {
                inputRefs.current[field.key] = el;
              }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void handleUpload(field.key, field.folder, file);
                e.target.value = '';
              }}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => inputRefs.current[field.key]?.click()}
              disabled={uploading === field.key}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-xs font-bold uppercase tracking-widest text-blue-400 transition-colors hover:bg-blue-500/20 disabled:opacity-50"
            >
              {uploading === field.key ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin" /> Uploading...
                </>
              ) : saved === field.key ? (
                <>
                  <CheckCircle className="h-3 w-3" /> Uploaded!
                </>
              ) : (
                <>
                  <Upload className="h-3 w-3" /> Upload Image
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
