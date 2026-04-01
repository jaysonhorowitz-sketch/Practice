-- UGC Studio — Supabase Schema
-- Run this in the Supabase SQL editor to set up your database.

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- CLIENTS
-- ============================================================
create table if not exists clients (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  created_at timestamptz not null default now()
);

-- ============================================================
-- CAMPAIGNS
-- ============================================================
create type campaign_status as enum ('DRAFT', 'GENERATING', 'DONE', 'FAILED');

create table if not exists campaigns (
  id uuid primary key default uuid_generate_v4(),
  client_name text not null,
  product_name text not null,
  product_one_liner text not null,
  target_audience text not null,
  status campaign_status not null default 'DRAFT',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger campaigns_updated_at
  before update on campaigns
  for each row execute procedure set_updated_at();

-- ============================================================
-- BRIEFS
-- ============================================================
create table if not exists briefs (
  id uuid primary key default uuid_generate_v4(),
  campaign_id uuid not null references campaigns(id) on delete cascade,
  hook_concept text not null,
  key_talking_points jsonb not null default '[]',
  cta_text text not null,
  generated_at timestamptz not null default now()
);

-- ============================================================
-- SCRIPTS
-- ============================================================
create table if not exists scripts (
  id uuid primary key default uuid_generate_v4(),
  brief_id uuid not null references briefs(id) on delete cascade,
  hook_line text not null,
  body text not null,
  cta_line text not null,
  full_text text not null,
  generated_at timestamptz not null default now()
);

-- ============================================================
-- VIDEOS
-- ============================================================
create type video_status as enum ('PENDING', 'PROCESSING', 'DONE', 'FAILED');

create table if not exists videos (
  id uuid primary key default uuid_generate_v4(),
  script_id uuid not null references scripts(id) on delete cascade,
  heygen_job_id text,
  status video_status not null default 'PENDING',
  video_url text,
  audio_url text,
  heygen_credits_used numeric(10,4) default 0,
  elevenlabs_chars_used integer default 0,
  openai_tokens_used integer default 0,
  estimated_cost_usd numeric(10,4) default 0,
  completed_at timestamptz
);

-- ============================================================
-- NOTIFICATIONS
-- ============================================================
create table if not exists notifications (
  id uuid primary key default uuid_generate_v4(),
  video_id uuid references videos(id) on delete set null,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============================================================
-- INDEXES
-- ============================================================
create index if not exists campaigns_status_idx on campaigns(status);
create index if not exists campaigns_created_at_idx on campaigns(created_at desc);
create index if not exists briefs_campaign_id_idx on briefs(campaign_id);
create index if not exists scripts_brief_id_idx on scripts(brief_id);
create index if not exists videos_script_id_idx on videos(script_id);
create index if not exists videos_status_idx on videos(status);
create index if not exists notifications_read_idx on notifications(read);
create index if not exists notifications_created_at_idx on notifications(created_at desc);

-- ============================================================
-- ROW LEVEL SECURITY (disable for service-role key usage)
-- ============================================================
alter table clients disable row level security;
alter table campaigns disable row level security;
alter table briefs disable row level security;
alter table scripts disable row level security;
alter table videos disable row level security;
alter table notifications disable row level security;
