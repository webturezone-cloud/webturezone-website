'use client';

import { createBrowserClient, type CookieOptionsWithName } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import { getSupabasePublicEnv } from './env';

let adminClient: SupabaseClient | null = null;

const cookieOptions: CookieOptionsWithName = {
  name: 'wtz-admin-auth',
};

/**
 * Cookie-backed Supabase client used inside /admin pages.
 *
 * Why a separate client from `getSupabaseBrowserClient`?
 * The public site's contact form uses the standard `@supabase/supabase-js`
 * client with localStorage. Middleware can only read cookies, so admin auth
 * needs the SSR client. Keeping them separate avoids touching the public
 * contact-form session.
 */
export function getSupabaseAdminBrowserClient(): SupabaseClient {
  if (adminClient) return adminClient;
  const { url, anonKey } = getSupabasePublicEnv();
  adminClient = createBrowserClient(url, anonKey, { cookieOptions });
  return adminClient;
}
