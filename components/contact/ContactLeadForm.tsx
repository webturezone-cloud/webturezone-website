'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { CTA_SERVICE_OPTIONS } from '@/lib/constants';
import { submitContactSubmission } from '@/lib/contactSubmission';

const inputClass =
  'h-12 w-full rounded-lg border border-white/[0.12] bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-blue/50 focus:ring-2 focus:ring-blue/25';

const textareaClass =
  'min-h-[110px] w-full rounded-lg border border-white/[0.12] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-blue/50 focus:ring-2 focus:ring-blue/25';

const labelClass =
  'mb-1.5 block text-[0.7rem] font-medium uppercase tracking-[0.1em] text-white/45';

type ContactLeadFormProps = {
  submitLabel: string;
  idPrefix: string;
  className?: string;
};

export function ContactLeadForm({
  submitLabel,
  idPrefix,
  className = 'w-full rounded-2xl border border-white/[0.1] bg-black/50 p-6 shadow-[0_0_48px_-16px_rgba(78,102,212,0.35)] backdrop-blur-sm sm:p-8',
}: ContactLeadFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phone, setPhone] = useState<string>('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);

    const full_name = String(fd.get('fullName') ?? '').trim();
    const email = String(fd.get('email') ?? '').trim();
    const business_url = String(fd.get('businessUrl') ?? '').trim();
    const service_interested = String(fd.get('service') ?? '').trim();
    const message = String(fd.get('message') ?? '').trim();
    const phone_number = phone.trim();

    const formData = {
      name: full_name,
      email,
      phone: phone_number,
      business: business_url,
      service: service_interested,
      message,
    };

    setLoading(true);
    const result = await submitContactSubmission({
      full_name: formData.name,
      email: formData.email,
      phone_number: formData.phone,
      business_url: formData.business,
      service_interested: formData.service,
      message: formData.message,
    });
    setLoading(false);

    if (result.ok) {
      form.reset();
      setPhone('');
      router.push('/thank-you');
      return;
    }
    setError(result.message);
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label htmlFor={`${idPrefix}-fullName`} className={labelClass}>
            Full name
          </label>
          <input
            id={`${idPrefix}-fullName`}
            name="fullName"
            type="text"
            autoComplete="name"
            required
            className={inputClass}
            placeholder="Jane Doe"
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-email`} className={labelClass}>
            Email address
          </label>
          <input
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            className={inputClass}
            placeholder="you@company.com"
            disabled={loading}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={`${idPrefix}-phone`}
            className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-gray-400"
          >
            Phone Number
          </label>
          <PhoneInput
            international
            defaultCountry="PK"
            value={phone || undefined}
            onChange={(value) => setPhone(value ?? '')}
            className="phone-input-wrapper"
            disabled={loading}
            inputProps={{
              id: `${idPrefix}-phone`,
              name: 'phone',
              autoComplete: 'tel',
            }}
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor={`${idPrefix}-businessUrl`} className={labelClass}>
            Business / website URL
          </label>
          <input
            id={`${idPrefix}-businessUrl`}
            name="businessUrl"
            type="url"
            autoComplete="url"
            className={inputClass}
            placeholder="https://"
            disabled={loading}
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor={`${idPrefix}-service`} className={labelClass}>
            Service interested in
          </label>
          <select
            id={`${idPrefix}-service`}
            name="service"
            defaultValue=""
            className={`${inputClass} cursor-pointer appearance-none bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat pr-10`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
            }}
            disabled={loading}
          >
            <option value="">Select a service (optional)</option>
            {CTA_SERVICE_OPTIONS.map((opt) => (
              <option key={opt} value={opt} className="bg-navy text-white">
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label htmlFor={`${idPrefix}-message`} className={labelClass}>
            Message / project details
          </label>
          <textarea
            id={`${idPrefix}-message`}
            name="message"
            className={textareaClass}
            placeholder="Tell us about your goals, timeline, and current challenges…"
            disabled={loading}
          />
        </div>
      </div>

      {error ? (
        <p
          className="mt-4 rounded-lg border border-red-500/35 bg-red-500/10 px-4 py-3 text-sm text-red-200/95"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        aria-busy={loading}
        className="mt-5 flex h-12 w-full items-center justify-center rounded-lg bg-blue text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-blue-dim focus:outline-none focus:ring-2 focus:ring-blue/40 focus:ring-offset-2 focus:ring-offset-navy-secondary disabled:pointer-events-none disabled:opacity-60"
      >
        {loading ? 'Sending…' : submitLabel}
      </button>
    </form>
  );
}
