# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website with a built-in Todo application, built with Next.js 16 (App Router), TypeScript, and Tailwind CSS v4.

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Radix UI components
- **State Management**: Zustand
- **Database**: Prisma ORM with SQLite (development) / PostgreSQL (production)
- **Authentication**: Better Auth with OAuth support (GitHub, Google)
- **Package Manager**: Bun

## Common Commands

```bash
# Development
bun dev              # Start dev server with Turbopack
bun run dev          # Using npm script

# Build
bun run build        # Production build

# Linting
bun run lint         # Run ESLint

# Database (Prisma)
bun run db:gen       # Generate Prisma client
bun run db:md        # Run Prisma migrations (dev)
bun run db:mr        # Reset database migrations
bun run db:studio    # Open Prisma Studio
bun run db:format    # Format Prisma schema
```

## Architecture

### Database Layer
- Prisma schema in `prisma/schema.prisma`
- Multi-database support: SQLite for dev (`file:./dev.db`), PostgreSQL for production
- Prisma client at `lib/prisma.ts` with adapter selection based on `DATABASE_URL`

### Authentication
- Better Auth configuration in `lib/auth.ts`
- Auth client utilities in `lib/auth-client.ts`
- Session-based auth with cookie caching
- OAuth providers: GitHub, Google

### Server Actions
Located in `lib/actions/`:
- `lib/actions/todo/` - Todo-related actions (tasks, sets, substeps, ordering)
- `lib/actions/user/` - User profile actions

### State Management
- Zustand stores in `store/` directory
- `store/todo-app.ts` - Main todo application state

### Protected Routes
- `proxy.ts` acts as middleware, redirecting unauthenticated users to `/login` for routes matching `/todo` and `/profile`

## Key Directories

- `app/` - Next.js App Router pages and API routes
- `app/api/` - API endpoints (auth, todos, user)
- `app/todo/` - Todo application pages
- `app/profile/` - User profile pages
- `components/ui/` - Reusable UI components (shadcn/ui-like pattern)
- `lib/` - Utilities, actions, and auth configuration
- `store/` - Zustand state management

## Database Schema

Main models in `prisma/schema.prisma`:
- `User` - User account with relations to tasks, sets, sessions
- `Session` / `Account` - Better Auth models
- `TodoSet` - Customizable task collections
- `TodoTask` - Individual tasks with importance/today flags
- `TodoTaskStep` - Sub-steps within tasks

## Environment Variables

Key environment variables (see `.env`):
- `DATABASE_URL` - Database connection string
- `BETTER_AUTH_URL` - Auth base URL
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` - GitHub OAuth
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` - Google OAuth
