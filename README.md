# 비둘기 프로그래밍 — Asyn-Coo Programming

## Setup

```bash
pnpm install
cp .env.local.example .env.local
# fill in Supabase credentials
```

## Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Run `supabase/migrations/001_comments.sql` in the SQL Editor
3. Copy the project URL and anon key to `.env.local`

For local development, set `NEXT_PUBLIC_SUPABASE_ENV=development` to separate dev/prod comments.

## Dev

```bash
pnpm dev
```

## Deploy

```bash
vercel
```
