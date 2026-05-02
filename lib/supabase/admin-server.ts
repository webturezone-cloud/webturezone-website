import { createServerClient, type CookieOptionsWithName } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getSupabasePublicEnv } from './env';

const cookieOptions: CookieOptionsWithName = {
  name: 'wtz-admin-auth',
};

/**
 * Read-only server client for admin pages.
 *
 * Server components cannot mutate cookies, so the `setAll` callback is a
 * no-op here — the middleware refreshes the session and rewrites cookies on
 * every request, which is the source of truth.
 */
export function getSupabaseAdminServerClient() {
  const { url, anonKey } = getSupabasePublicEnv();
  const cookieStore = cookies();

  return createServerClient(url, anonKey, {
    cookieOptions,
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll() {
        // no-op: server components cannot set cookies
      },
    },
  });
}
