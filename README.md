# Meridian — Specialty Coffee (Coming Soon)

Editorial coming-soon landing for **Meridian**, a specialty coffee brand.

## Stack

- Astro 5 (server output) + `@astrojs/vercel`
- Tailwind v4 via `@tailwindcss/vite`
- Supabase (email capture + Harbor content table)
- Fraunces (serif) + JetBrains Mono (mono) from Google Fonts

## What's here

- `src/pages/index.astro` — hero, brand story, principles, origins preview, email capture
- `src/components/SubscribeForm.astro` — progressive-enhancement form, works without JS
- `src/components/ThemeToggle.astro` — light/dark editorial toggle (persists to localStorage)
- `src/pages/api/subscribe.ts` — POST endpoint, validates email, inserts into Supabase
- `src/pages/robots.txt.ts`, `src/pages/sitemap.xml.ts` — SEO
- `src/lib/supabase.ts` — shared client

## Supabase tables

- `meridian_subscribers` (email capture)
- `meridian_content` (Harbor content hook — articles get written here)

RLS is enabled on both; the anon role can insert subscribers and read
published content.

## Env vars

Copy `.env.example` → `.env` and fill:

- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`
- `PUBLIC_SITE_URL`

## Local dev

```bash
npm install --legacy-peer-deps
npm run dev
```

## TODO for the owner

- Connect a custom domain in Vercel (e.g. `meridiancoffee.co`)
- Decide on a transactional email provider once you open orders
- Replace the placeholder origin lineup with real lots when they land
