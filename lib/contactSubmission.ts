import { getSupabaseBrowserClient } from '@/lib/supabase/browser';

/** Override via NEXT_PUBLIC_CONTACT_WEBHOOK_URL if needed. */
const DEFAULT_CONTACT_WEBHOOK_URL =
  'https://warrantyadvocatesllc.app.n8n.cloud/webhook/webturezone-contact';

export type ContactSubmissionInput = {
  full_name: string;
  email: string;
  phone_number: string;
  business_url: string;
  service_interested: string;
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactSubmission(input: {
  full_name: string;
  email: string;
}): string | null {
  if (!input.full_name.trim()) return 'Full name is required.';
  if (!input.email.trim()) return 'Email is required.';
  if (!EMAIL_RE.test(input.email.trim())) return 'Please enter a valid email address.';
  return null;
}

function emptyToNull(value: string): string | null {
  const t = value.trim();
  return t === '' ? null : t;
}

async function submitToWebhook(input: ContactSubmissionInput): Promise<{ ok: false; message: string } | null> {
  const url =
    process.env.NEXT_PUBLIC_CONTACT_WEBHOOK_URL?.trim() || DEFAULT_CONTACT_WEBHOOK_URL;

  const body = {
    full_name: input.full_name.trim(),
    email: input.email.trim(),
    phone_number: emptyToNull(input.phone_number),
    business_url: emptyToNull(input.business_url),
    service_interested: emptyToNull(input.service_interested),
    message: emptyToNull(input.message),
    created_at: new Date().toISOString(),
  };

  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
      mode: 'cors',
    });
  } catch {
    return {
      ok: false,
      message: 'Could not reach our server. Check your connection and try again.',
    };
  }

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    return {
      ok: false,
      message:
        text?.slice(0, 200) ||
        `Submission failed (${res.status}). Please try again or email us directly.`,
    };
  }

  return null;
}

/** Best-effort duplicate store when Supabase env is present (does not affect user-facing result). */
function insertSupabaseOptional(input: ContactSubmissionInput): void {
  try {
    const supabase = getSupabaseBrowserClient();
    void supabase
      .from('contact_submissions')
      .insert({
        full_name: input.full_name.trim(),
        email: input.email.trim(),
        phone_number: emptyToNull(input.phone_number),
        business_url: emptyToNull(input.business_url),
        service_interested: emptyToNull(input.service_interested),
        message: emptyToNull(input.message),
      })
      .then(({ error }) => {
        if (error) console.warn('[contact] Supabase insert:', error.message);
      });
  } catch {
    // Missing Supabase config — skipped
  }
}

export async function submitContactSubmission(
  input: ContactSubmissionInput,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const validationError = validateContactSubmission(input);
  if (validationError) return { ok: false, message: validationError };

  const webhookError = await submitToWebhook(input);
  if (webhookError) return webhookError;

  insertSupabaseOptional(input);

  return { ok: true };
}
