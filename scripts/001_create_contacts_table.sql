-- Create contacts table to store form submissions
create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company text,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.contacts enable row level security;

-- Allow anyone to insert (public form submissions)
create policy "contacts_insert_public"
  on public.contacts for insert
  with check (true);

-- Only allow authenticated users to read (admin only)
create policy "contacts_select_authenticated"
  on public.contacts for select
  using (auth.uid() is not null);

-- Create an index on created_at for faster sorting
create index if not exists contacts_created_at_idx on public.contacts(created_at desc);
