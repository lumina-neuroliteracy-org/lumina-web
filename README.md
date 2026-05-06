# Luminar

A confidence-first literacy support platform helping families, schools, and adult learners understand and navigate dyslexia. Luminar connects learners with 1:1 guidance, live classes, workshops, and curated resources — turning uncertainty into actionable learning plans.

## Tech Stack

- **Framework** — Next.js (App Router) with TypeScript
- **Styling** — Tailwind CSS v4 + shadcn/ui
- **Backend** — Supabase (PostgreSQL + Auth)
- **Email** — Resend
- **Animations** — Framer Motion

## Features

- Public marketing site with services, workshops, and dyslexia education hub
- Student portal — dashboard, live classes, resources, profile
- Admin portal — user management, class/event/resource management, analytics
- Role-based access control (student, admin, super_admin)
- Dyslexia accessibility mode (font, spacing, and color adjustments)

## Getting Started

```bash
npm install
cp .env.example .env.local   # add your Supabase and Resend keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |
| `RESEND_API_KEY` | Resend API key for transactional email |

## Scripts

```bash
npm run dev      # development server
npm run build    # production build
npm run start    # production server
npm run lint     # ESLint
```

## Project Structure

```
app/
  (main)/      # public-facing pages
  (auth)/      # sign in, sign up, reset password
  (student)/   # student dashboard and portal
  (admin)/     # admin dashboard and management
components/    # reusable UI components
lib/           # Supabase clients, server actions, utilities
hooks/         # custom React hooks
```

## Deployment

Deployed on [Vercel](https://vercel.com). Add all environment variables in the Vercel project settings before deploying.
