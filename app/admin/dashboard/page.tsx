'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSiteSettings } from '@/lib/admin/client-settings';
import { SITE_SETTINGS_DEFAULTS, type SiteSettings } from '@/lib/site-settings';
import { CheckCircle, ExternalLink, Image as ImageIcon, Palette, Type } from 'lucide-react';

const QUICK_NAV = [
  { title: 'Content', desc: 'Edit headlines and text', href: '/admin/content', icon: Type },
  { title: 'Media', desc: 'Manage service images', href: '/admin/media', icon: ImageIcon },
  { title: 'Branding', desc: 'Logo, favicon, colors, fonts', href: '/admin/branding', icon: Palette },
];

const PREVIEW_FIELDS = [
  { label: 'Hero Headline 1', key: 'hero_headline_1' },
  { label: 'Hero Headline 2', key: 'hero_headline_2' },
  { label: 'Accent Color', key: 'color_accent' },
  { label: 'Display Font', key: 'font_display' },
];

export default function Dashboard() {
  const [settings, setSettings] = useState<SiteSettings>({ ...SITE_SETTINGS_DEFAULTS });
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

  return (
    <div className="max-w-6xl p-6 lg:p-10">
      <div className="mb-10">
        <h1 className="mb-2 font-display text-3xl uppercase tracking-wide text-white">Dashboard</h1>
        <p className="text-sm font-light text-gray-400">
          Manage your WebTureZone website content and settings.
        </p>
      </div>

      <div className="mb-8 flex w-fit items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
        <CheckCircle className="h-4 w-4" />
        Site is live at webturezone.netlify.app
        <Link href="/" target="_blank" aria-label="Open live site">
          <ExternalLink className="ml-1 h-3 w-3" />
        </Link>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {QUICK_NAV.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-xl border border-blue-500/20 bg-[#080d1a] p-6 transition-colors hover:border-blue-500/40"
            >
              <Icon className="mb-4 h-8 w-8 text-blue-400" />
              <h3 className="mb-1 font-display text-xl uppercase text-white">{card.title}</h3>
              <p className="text-xs font-light text-gray-400">{card.desc}</p>
            </Link>
          );
        })}
      </div>

      <div className="rounded-xl border border-white/[0.07] bg-[#080d1a] p-6">
        <h2 className="mb-6 font-display text-xl uppercase text-white">Current Content</h2>
        {loading ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : (
          <div className="flex flex-col gap-4">
            {PREVIEW_FIELDS.map((item) => (
              <div
                key={item.key}
                className="flex items-center gap-4 border-b border-white/[0.05] pb-4 last:border-0"
              >
                <span className="w-36 flex-shrink-0 text-xs uppercase tracking-widest text-gray-500">
                  {item.label}
                </span>
                <span className="text-sm font-light text-white">{settings[item.key] || '—'}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
