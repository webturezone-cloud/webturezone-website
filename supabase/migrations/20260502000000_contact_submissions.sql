-- Contact / strategy-call lead capture (public insert via anon key + RLS)
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone_number text,
  business_url text,
  service_interested text,
  message text,
  created_at timestamptz not null default now()
);

comment on table public.contact_submissions is 'Marketing site contact and strategy call form submissions';

alter table public.contact_submissions enable row level security;

create policy "Allow anonymous insert for contact_submissions"
  on public.contact_submissions
  for insert
  to anon
  with check (true);

-- No select/update/delete policies for anon — rows are backend-only for reads.
