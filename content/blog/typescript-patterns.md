---
title: TypeScript Patterns I Use Every Day
date: 2026-03-10
description: A collection of TypeScript patterns that make development faster and code safer.
tags: [TypeScript, patterns]
slug: typescript-patterns
---

## 1. Discriminated Unions

Use a `type` or `kind` field to narrow types:

```typescript
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
  }
}
```

## 2. `satisfies` Operator

Validate against a type while preserving narrower inference:

```typescript
const routes = {
  home: "/",
  about: "/about",
  blog: "/blog",
} satisfies Record<string, string>;
// Type is still `{ home: "/"; about: "/about"; blog: "/blog"; }`
```

## 3. Branded Types

Prevent mixing up IDs:

```typescript
type Brand<T, B> = T & { __brand: B };

type UserId = Brand<string, "UserId">;
type PostId = Brand<string, "PostId">;

function getUser(id: UserId) { /* ... */ }
function getPost(id: PostId) { /* ... */ }
```

## 4. `const` Assertions

Lock arrays and objects as read-only literals:

```typescript
const colors = ["red", "green", "blue"] as const;
type Color = (typeof colors)[number]; // "red" | "green" | "blue"
```

---

These patterns help keep code safe and predictable. Happy typing!
