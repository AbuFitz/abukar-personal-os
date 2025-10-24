# Becoming (MVP)

Next.js 14 + Supabase + Tailwind. Magic-link auth, dashboard with Body/Mind/Soul daily index, and simple log forms.

## Setup
1. `npm install`
2. Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=YOUR_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON
```
3. Create the DB schema in Supabase (paste the SQL from chat).
4. `npm run dev`

## Deploy (Vercel)
- Add env vars in Vercel.
- In Supabase Auth → set Site URL to your deployed domain.
