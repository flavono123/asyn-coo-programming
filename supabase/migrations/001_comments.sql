-- Comments table
create table if not exists comments (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references comments(id) on delete cascade,
  content text not null check (char_length(content) <= 500),
  nickname text not null default '익명의 기둘기' check (char_length(nickname) <= 30),
  likes_count integer not null default 0,
  env text not null default 'production',
  created_at timestamptz not null default now()
);

-- Comment likes (one per fingerprint per comment)
create table if not exists comment_likes (
  id uuid primary key default gen_random_uuid(),
  comment_id uuid not null references comments(id) on delete cascade,
  fingerprint text not null,
  created_at timestamptz not null default now(),
  unique (comment_id, fingerprint)
);

-- Indexes
create index if not exists idx_comments_env_created on comments(env, created_at);
create index if not exists idx_comments_parent_id on comments(parent_id);
create index if not exists idx_comment_likes_comment_id on comment_likes(comment_id);

-- RLS
alter table comments enable row level security;
alter table comment_likes enable row level security;

-- Comments: anyone can read, insert, update likes_count
create policy "Anyone can read comments" on comments for select using (true);
create policy "Anyone can insert comments" on comments for insert with check (true);
create policy "Anyone can update comment likes_count" on comments for update using (true) with check (true);

-- Comment likes: anyone can read, insert, delete
create policy "Anyone can read likes" on comment_likes for select using (true);
create policy "Anyone can insert likes" on comment_likes for insert with check (true);
create policy "Anyone can delete likes" on comment_likes for delete using (true);
