# AGENTS.md

## Package manager
Use **Bun** (`bun`). A `bun.lock` is committed; no npm/pnpm/yarn lock exists.

## Commands
```bash
bun dev          # next dev --turbopack (port 3000)
bun run build    # next build
bun run lint     # next lint (includes TS type-checking via eslint-config-next)
```

No test script or test framework is configured.

## Database (PostgreSQL + Prisma)
- PostgreSQL runs via Docker: `docker compose up -d` (port **5433**, not 5432).
- `prisma.config.ts` reads `DATABASE_URL` from `.env` (gitignored). Create `.env` with that var before running DB commands.
- Prisma schema and migrations live at `prisma/schema.prisma` and `prisma/migrations/` — these **do not exist yet**; the DB layer is not scaffolded.

```bash
bun run db:gen       # prisma generate
bun run db:md        # prisma migrate dev
bun run db:mr        # prisma migrate reset
bun run db:studio    # prisma studio
bun run db:format    # prisma format
```

## Architecture
- **Next.js 16 App Router** (`app/` directory) with RSC (React Server Components by default).
- `app/layout.tsx` wraps everything in `ThemeProvider` (next-themes, class strategy, default "system").
- Pages: `app/page.tsx` (home), `app/about/page.tsx`, `app/projects.tsx` (component rendered on home page).
- `app/globals.css` — Tailwind v4 CSS-first config (`@import "tailwindcss"`). No `tailwind.config.ts`.

## Styling
- **Tailwind CSS v4** (CSS-first, no JS config file).
- `@theme inline` block in `globals.css` defines shadcn/ui design tokens.
- Dark mode via `.dark` class selector and `@custom-variant dark`.
- Utility: `cn()` from `@/lib/utils` (clsx + tailwind-merge) — use for all className merging.

## shadcn/ui
- `components.json` configured: new-york style, RSC, neutral base, CSS variables, Lucide icons.
- UI primitives in `components/ui/` (button, card, badge, avatar, etc.).

## Path alias
`@/*` → `./*` (so `@/lib/utils` = `lib/utils.ts`).

## Store
`store/index.ts` is an empty placeholder — no state management is wired in.

## Env
- `.env` is in `.gitignore`; `.env.vault` is not.
- `prisma.config.ts` imports `dotenv/config` at the top, so `process.env` is populated when running Prisma CLI.
