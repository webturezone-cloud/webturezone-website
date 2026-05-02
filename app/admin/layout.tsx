'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getSupabaseAdminBrowserClient } from '@/lib/supabase/admin-client';
import {
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Menu,
  Palette,
  Settings,
  Type,
  X,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Content', href: '/admin/content', icon: Type },
  { label: 'Media', href: '/admin/media', icon: ImageIcon },
  { label: 'Branding', href: '/admin/branding', icon: Palette },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  if (pathname === '/admin/login') return <>{children}</>;

  async function handleLogout() {
    const supabase = getSupabaseAdminBrowserClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <div className="flex min-h-screen bg-[#020202]">
      <aside className="fixed z-40 hidden h-full w-64 flex-col border-r border-white/[0.07] bg-[#080d1a] lg:flex">
        <div className="border-b border-white/[0.07] px-6 py-6">
          <h1 className="font-display text-xl uppercase tracking-widest">
            <span className="text-blue-500">WEB</span>TUREZONE
          </h1>
          <p className="mt-1 text-[0.6rem] uppercase tracking-widest text-gray-600">Admin Panel</p>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-4 py-6">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors ${
                  active
                    ? 'border border-blue-500/30 bg-blue-600/20 text-blue-400'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/[0.07] px-4 py-6">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
          <Link
            href="/"
            target="_blank"
            className="mt-1 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-xs text-gray-600 transition-colors hover:text-gray-400"
          >
            View Live Site →
          </Link>
        </div>
      </aside>

      <div className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-white/[0.07] bg-[#080d1a] px-5 py-4 lg:hidden">
        <h1 className="font-display text-lg uppercase tracking-widest">
          <span className="text-blue-500">WEB</span>TUREZONE
        </h1>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-gray-400"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-40 bg-black/80 lg:hidden" onClick={() => setOpen(false)}>
          <div
            className="h-full w-64 border-r border-white/[0.07] bg-[#080d1a] p-6 pt-20"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  void handleLogout();
                }}
                className="mt-4 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </nav>
          </div>
        </div>
      ) : null}

      <main className="flex-1 pt-16 lg:ml-64 lg:pt-0">{children}</main>
    </div>
  );
}
