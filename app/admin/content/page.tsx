'use client';

import { useEffect, useState } from 'react';
import { getSiteSettings, updateSetting } from '@/lib/admin/client-settings';
import { SITE_SETTINGS_DEFAULTS, type SiteSettings } from '@/lib/site-settings';
import { CheckCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type ContentSelectField = {
  key: string;
  label: string;
  type: 'select';
  options: readonly string[];
  preview?: string;
};

type ContentField =
  | { key: string; label: string; type: 'text' | 'textarea' }
  | ContentSelectField;

type ContentSection = {
  section: string;
  fields: ContentField[];
};

const CONTENT_FIELDS: ContentSection[] = [
  {
    section: 'Hero Section',
    fields: [
      { key: 'hero_headline_1', label: 'Headline Line 1', type: 'text' },
      { key: 'hero_headline_2', label: 'Headline Line 2', type: 'text' },
      { key: 'hero_subtext', label: 'Subtext', type: 'textarea' },
    ],
  },
  {
    section: 'Font Sizes',
    fields: [
      {
        key: 'hero_headline_size',
        label: 'Hero Headline Size',
        type: 'select',
        options: ['text-5xl', 'text-6xl', 'text-7xl', 'text-8xl', 'text-9xl'],
      },
      {
        key: 'section_heading_size',
        label: 'Section Heading Size',
        type: 'select',
        options: ['text-3xl', 'text-4xl', 'text-5xl', 'text-6xl'],
      },
      {
        key: 'body_text_size',
        label: 'Body Text Size',
        type: 'select',
        options: ['text-sm', 'text-base', 'text-lg', 'text-xl'],
      },
    ],
  },
  {
    section: 'Mobile Font Sizes',
    fields: [
      {
        key: 'mobile_hero_headline_size',
        label: 'Hero Headline (Mobile)',
        type: 'select',
        options: [
          'clamp(0.75rem,4vw,6rem)',
          'clamp(0.85rem,4.5vw,6rem)',
          'clamp(0.95rem,5vw,6rem)',
          'clamp(1.1rem,5.5vw,6rem)',
          'clamp(1.3rem,6vw,6rem)',
        ],
        preview: "WE DON'T RUN ADS.",
      },
      {
        key: 'mobile_section_heading_size',
        label: 'Section Headings (Mobile)',
        type: 'select',
        options: [
          'clamp(1.4rem,4vw,3rem)',
          'clamp(1.6rem,4.5vw,3rem)',
          'clamp(1.8rem,5vw,3rem)',
          'clamp(2rem,5.5vw,3rem)',
          'clamp(2.2rem,6vw,3rem)',
        ],
        preview: 'FOUR WEAPONS. ONE AGENCY.',
      },
      {
        key: 'mobile_body_text_size',
        label: 'Body Text (Mobile)',
        type: 'select',
        options: ['text-xs', 'text-sm', 'text-base', 'text-lg'],
        preview: 'From Google & Meta ads to full website development.',
      },
      {
        key: 'mobile_card_title_size',
        label: 'Card Titles (Mobile)',
        type: 'select',
        options: ['text-lg', 'text-xl', 'text-2xl', 'text-3xl'],
        preview: 'GOOGLE ADS',
      },
      {
        key: 'mobile_subtext_size',
        label: 'Subtext / Descriptions (Mobile)',
        type: 'select',
        options: ['text-xs', 'text-sm', 'text-base', 'text-lg'],
        preview: 'Capture high-intent buyers searching for your services.',
      },
    ],
  },
  {
    section: 'Services Section',
    fields: [{ key: 'services_heading', label: 'Section Heading', type: 'text' }],
  },
  {
    section: 'Results Section',
    fields: [{ key: 'results_heading', label: 'Section Heading', type: 'text' }],
  },
  {
    section: 'Why Us Section',
    fields: [{ key: 'whyus_heading', label: 'Section Heading', type: 'text' }],
  },
  {
    section: 'Process Section',
    fields: [{ key: 'process_heading', label: 'Section Heading', type: 'text' }],
  },
  {
    section: 'CTA Section',
    fields: [{ key: 'cta_heading', label: 'CTA Heading', type: 'text' }],
  },
];

function SelectLivePreview({
  fieldKey,
  preview,
  resolvedValue,
}: {
  fieldKey: string;
  preview: string;
  resolvedValue: string;
}) {
  const resolved = resolvedValue.trim();
  const isClamp = resolved.startsWith('clamp(');

  return (
    <div className="mt-3 overflow-hidden rounded-lg border border-white/[0.07] bg-[#020202] px-4 py-3">
      <p className="mb-2 text-[0.6rem] uppercase tracking-widest text-gray-600">Preview</p>
      <p
        className={cn(
          'truncate leading-tight text-white',
          fieldKey !== 'mobile_body_text_size' && fieldKey !== 'mobile_subtext_size' && 'font-display uppercase',
          !isClamp && resolved,
        )}
        style={
          isClamp && resolved ? { fontSize: resolved } : undefined
        }
      >
        {preview}
      </p>
    </div>
  );
}

export default function ContentPage() {
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
    <div className="max-w-4xl p-6 lg:p-10">
      <h1 className="mb-2 font-display text-3xl uppercase tracking-wide text-white">Content Editor</h1>
      <p className="mb-10 text-sm font-light text-gray-400">
        Edit your website headlines and text content.
      </p>

      <div className="flex flex-col gap-8">
        {CONTENT_FIELDS.map((section) => (
          <div key={section.section} className="rounded-xl border border-white/[0.07] bg-[#080d1a] p-6">
            <h2 className="mb-6 border-b border-white/[0.07] pb-4 font-display text-lg uppercase tracking-wide text-white">
              {section.section}
            </h2>

            <div className="flex flex-col gap-6">
              {section.fields.map((field) => {
                const selectValue =
                  field.type === 'select'
                    ? (() => {
                        const sel = settings[field.key] ?? '';
                        return sel && field.options.includes(sel)
                          ? sel
                          : field.options[0];
                      })()
                    : '';

                return (
                  <div key={field.key}>
                    <label
                      htmlFor={`field-${field.key}`}
                      className="mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-gray-400"
                    >
                      {field.label}
                    </label>

                    {field.type === 'select' ? (
                      <>
                        <select
                          id={`field-${field.key}`}
                          value={selectValue}
                          onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
                          className="w-full rounded-lg border border-white/10 bg-[#0a0f1e] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-blue-500/50"
                        >
                          {field.options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        {'preview' in field && field.preview ? (
                          <SelectLivePreview
                            fieldKey={field.key}
                            preview={field.preview}
                            resolvedValue={selectValue}
                          />
                        ) : null}
                      </>
                    ) : field.type === 'textarea' ? (
                      <textarea
                        id={`field-${field.key}`}
                        value={settings[field.key] ?? ''}
                        onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
                        rows={3}
                        className="w-full resize-none rounded-lg border border-white/10 bg-[#0a0f1e] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-gray-600 focus:border-blue-500/50"
                      />
                    ) : (
                      <input
                        id={`field-${field.key}`}
                        type="text"
                        value={settings[field.key] ?? ''}
                        onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
                        className="w-full rounded-lg border border-white/10 bg-[#0a0f1e] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-gray-600 focus:border-blue-500/50"
                      />
                    )}

                    <button
                      type="button"
                      onClick={() => handleSave(field.key)}
                      disabled={saving === field.key}
                      className="mt-3 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                    >
                      {saving === field.key ? (
                        <>
                          <Loader2 className="h-3 w-3 animate-spin" /> Saving...
                        </>
                      ) : saved === field.key ? (
                        <>
                          <CheckCircle className="h-3 w-3" /> Saved!
                        </>
                      ) : (
                        'Save'
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
