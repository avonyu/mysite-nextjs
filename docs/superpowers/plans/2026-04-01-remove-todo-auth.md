# Remove Todo & Auth Features Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove all todo application remnants and authentication system, leaving a clean static portfolio website.

**Architecture:** Delete unused files/directories, modify Header to remove auth UI, simplify Prisma schema, and remove auth dependencies from package.json.

**Tech Stack:** Next.js 16, TypeScript, Prisma, Bun

---

## Files Overview

**Files to delete:**
- `contexts/todo-context.tsx`
- `app/todo/components/` (entire directory)
- `app/login/page.tsx`
- `app/register/page.tsx`
- `app/profile/` (entire directory)
- `app/api/auth/` (entire directory)
- `app/api/user/` (entire directory)
- `components/oauth-buttons.tsx`
- `components/user-avatar.tsx`
- `lib/auth.ts`
- `lib/auth-client.ts`
- `lib/actions/user/` (entire directory)
- `lib/actions/types.ts`
- `proxy.ts`
- `lib/zod.ts`

**Files to modify:**
- `components/header.tsx` - Remove auth imports, session check, login/register/UserAvatar
- `prisma/schema.prisma` - Remove all models
- `package.json` - Remove auth-related dependencies

---

### Task 1: Delete Todo Remnants

**Files:**
- Delete: `contexts/todo-context.tsx`
- Delete: `app/todo/components/` directory

- [ ] **Step 1: Remove todo context file**

```bash
rm contexts/todo-context.tsx
```

- [ ] **Step 2: Remove todo components directory**

```bash
rm -rf app/todo
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "remove: delete todo application remnants"
```

---

### Task 2: Delete Login/Register Pages

**Files:**
- Delete: `app/login/page.tsx`
- Delete: `app/register/page.tsx`

- [ ] **Step 1: Remove login page**

```bash
rm app/login/page.tsx
```

- [ ] **Step 2: Remove register page**

```bash
rm app/register/page.tsx
```

- [ ] **Step 3: Remove empty directories if needed**

```bash
rm -rf app/login app/register
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "remove: delete login and register pages"
```

---

### Task 3: Delete Profile Pages and Components

**Files:**
- Delete: `app/profile/` (entire directory including components)

- [ ] **Step 1: Remove profile directory**

```bash
rm -rf app/profile
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "remove: delete profile pages and components"
```

---

### Task 4: Delete Auth API Routes

**Files:**
- Delete: `app/api/auth/` (entire directory)
- Delete: `app/api/user/` (entire directory)

- [ ] **Step 1: Remove auth API route**

```bash
rm -rf app/api/auth
```

- [ ] **Step 2: Remove user API route**

```bash
rm -rf app/api/user
```

- [ ] **Step 3: Remove empty api directory if needed**

```bash
rm -rf app/api
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "remove: delete auth and user API routes"
```

---

### Task 5: Delete Auth Components

**Files:**
- Delete: `components/oauth-buttons.tsx`
- Delete: `components/user-avatar.tsx`

- [ ] **Step 1: Remove OAuth buttons component**

```bash
rm components/oauth-buttons.tsx
```

- [ ] **Step 2: Remove user avatar component**

```bash
rm components/user-avatar.tsx
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "remove: delete OAuth buttons and user avatar components"
```

---

### Task 6: Delete Auth Library Files

**Files:**
- Delete: `lib/auth.ts`
- Delete: `lib/auth-client.ts`
- Delete: `lib/actions/user/` (entire directory)
- Delete: `lib/actions/types.ts`
- Delete: `lib/zod.ts`
- Delete: `proxy.ts`

- [ ] **Step 1: Remove auth config files**

```bash
rm lib/auth.ts lib/auth-client.ts
```

- [ ] **Step 2: Remove user actions directory**

```bash
rm -rf lib/actions/user
```

- [ ] **Step 3: Remove actions types file if empty**

```bash
rm lib/actions/types.ts
rm -rf lib/actions
```

- [ ] **Step 4: Remove zod schema file**

```bash
rm lib/zod.ts
```

- [ ] **Step 5: Remove proxy middleware**

```bash
rm proxy.ts
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "remove: delete auth library files, actions, and proxy middleware"
```

---

### Task 7: Modify Header Component

**Files:**
- Modify: `components/header.tsx`

- [ ] **Step 1: Update header to remove auth UI**

Replace the entire file content with:

```tsx
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Header() {
  return (
    <header
      className={cn(
        "sticky top-0 w-full flex justify-between p-4 bg-white/80 backdrop-blur border-b border-gray-200 z-10",
        "dark:border-gray-800 dark:bg-gray-950/80",
      )}
    >
      <Link
        href="/"
        className={cn(
          "p-1 text-cyan-500 font-bold text-xl",
          "dark:text-cyan-400",
        )}
      >
        {"Avon's Page"}
      </Link>
      <div className="flex gap-2 items-center">
        <ThemeToggle />
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/header.tsx
git commit -m "refactor: remove auth UI from header component"
```

---

### Task 8: Simplify Prisma Schema

**Files:**
- Modify: `prisma/schema.prisma`

- [ ] **Step 1: Remove all models from schema**

Replace schema content with minimal placeholder:

```prisma
generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
}
```

- [ ] **Step 2: Format schema**

```bash
bun run db:format
```

- [ ] **Step 3: Generate Prisma client**

```bash
bun run db:gen
```

- [ ] **Step 4: Commit**

```bash
git add prisma/schema.prisma
git commit -m "refactor: remove auth models from Prisma schema"
```

---

### Task 9: Remove Auth Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Remove auth-related dependencies from package.json**

Remove these lines from dependencies:
- `"@auth/pg-adapter": "^1.11.1",`
- `"@auth/prisma-adapter": "^2.11.1",`
- `"bcrypt": "^6.0.0",`
- `"better-auth": "^1.4.18",`

- [ ] **Step 2: Remove bcrypt type from devDependencies**

Remove:
- `"@types/bcrypt": "^5.0.2",`

- [ ] **Step 3: Install to update lock file**

```bash
bun install
```

- [ ] **Step 4: Commit**

```bash
git add package.json bun.lock
git commit -m "remove: delete auth-related dependencies from package.json"
```

---

### Task 10: Clean Up Generated Files and Verify

- [ ] **Step 1: Remove old Prisma generated client if needed**

```bash
rm -rf generated/prisma
bun run db:gen
```

- [ ] **Step 2: Verify build passes**

```bash
bun run build
```

Expected: Build completes without errors

- [ ] **Step 3: Run lint check**

```bash
bun run lint
```

Expected: No lint errors related to removed auth/todo code

- [ ] **Step 4: Final commit if any cleanup needed**

```bash
git add -A
git commit -m "chore: cleanup after removing todo and auth features"
```