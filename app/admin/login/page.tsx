'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseAdminBrowserClient } from '@/lib/supabase/admin-client';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = getSupabaseAdminBrowserClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError('Invalid email or password');
      setLoading(false);
      return;
    }

    router.push('/admin/dashboard');
    router.refresh();
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-[#020202] px-5">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[100px]" />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-10 text-center">
          <h1 className="font-display text-3xl uppercase tracking-widest text-white">
            <span className="text-blue-500">WEB</span>TUREZONE
          </h1>
          <p className="mt-2 text-xs uppercase tracking-widest text-gray-500">Admin Panel</p>
        </div>

        <div className="rounded-2xl border border-blue-500/20 bg-[#080d1a] p-8">
          <h2 className="mb-6 font-display text-2xl uppercase tracking-wide text-white">Sign In</h2>

          {error ? (
            <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          ) : null}

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <label
                htmlFor="admin-email"
                className="mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-gray-400"
              >
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@webturezone.com"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-white/10 bg-[#0a0f1e] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-gray-600 focus:border-blue-500/50"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-gray-400"
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-white/10 bg-[#0a0f1e] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-gray-600 focus:border-blue-500/50"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-lg bg-blue-600 py-4 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
