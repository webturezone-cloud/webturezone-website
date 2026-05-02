import { createServerClient, type CookieOptionsWithName } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { tryGetSupabasePublicEnv } from '@/lib/supabase/env';

const cookieOptions: CookieOptionsWithName = {
  name: 'wtz-admin-auth',
};

export async function middleware(req: NextRequest) {
  const env = tryGetSupabasePublicEnv();
  if (!env) return NextResponse.next();

  let res = NextResponse.next({ request: req });

  const supabase = createServerClient(env.url, env.anonKey, {
    cookieOptions,
    cookies: {
      getAll() {
        return req.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value));
        res = NextResponse.next({ request: req });
        cookiesToSet.forEach(({ name, value, options }) => res.cookies.set(name, value, options));
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = req.nextUrl.pathname;
  const isAdminArea = path.startsWith('/admin');
  const isLoginPage = path === '/admin/login';

  if (isAdminArea && !isLoginPage && !user) {
    const redirectUrl = new URL('/admin/login', req.url);
    return NextResponse.redirect(redirectUrl);
  }

  if (isLoginPage && user) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*'],
};
