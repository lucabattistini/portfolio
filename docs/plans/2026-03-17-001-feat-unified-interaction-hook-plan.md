---
title: 'feat: Unified interaction hook with route-change reset'
type: feat
status: completed
date: 2026-03-17
origin: docs/brainstorms/2026-03-17-unified-interaction-hook-brainstorm.md
---

# feat: Unified interaction hook with route-change reset

## Overview

Create a `useInteraction()` orchestrator hook that coordinates cursor, particles, and navbar XState actors through unified action methods. Add a route-change reset mechanism to clear transient interaction state on navigation. Produce a document-only accessibility, performance, and best practices audit.

## Problem Statement / Motivation

Currently, components that need to coordinate cursor and particles actors must import both `useCursorActorRef()` and `useParticlesActorRef()` separately and manually dispatch to each. Only `error-code.tsx` does this today, but the pattern will grow as more pages are added. Additionally, XState actors persist in layout-level providers, so interaction state (`isExploded`, `isStuck`, `isHovered`, `isMenuOpen`) leaks across navigations — there is no reset logic anywhere in the codebase.

## Proposed Solution

### Phase 1: Navbar machine enhancement

Add a `CLOSE_MENU` event to the navbar machine for deterministic (idempotent) menu closing.

**File:** `src/components/navbar/machine.ts`

```ts
// Add alongside existing TOGGLE_MENU
CLOSE_MENU: {
  actions: assign({ isMenuOpen: false }),
}
```

Export `useNavbarActorRef` from the navbar barrel if not already exported (currently it is).

### Phase 2: `useInteraction()` hook

**New file:** `src/lib/hooks/use-interaction.ts`

```ts
'use client';

import { useCursorActorRef } from '@/components/cursor';
import { useParticlesActorRef } from '@/components/particles';
import { useNavbarActorRef } from '@/components/navbar';
import type { CursorPosition } from '@/components/cursor/machine';

export function useInteraction() {
  const cursorActor = useCursorActorRef();
  const particlesActor = useParticlesActorRef();
  const navbarActor = useNavbarActorRef();

  return {
    hover: () => cursorActor.send({ type: 'HOVER' }),
    unhover: () => cursorActor.send({ type: 'UNHOVER' }),

    stick: (position: CursorPosition) => {
      cursorActor.send({ type: 'STICK', position });
      particlesActor.send({ type: 'EXPLODE' });
    },
    unstick: () => {
      cursorActor.send({ type: 'UNSTICK' });
      particlesActor.send({ type: 'REPAIR' });
    },

    explode: () => particlesActor.send({ type: 'EXPLODE' }),
    repair: () => particlesActor.send({ type: 'REPAIR' }),

    show: () => {
      cursorActor.send({ type: 'SHOW' });
      particlesActor.send({ type: 'SHOW' });
    },
    hide: () => {
      cursorActor.send({ type: 'HIDE' });
      particlesActor.send({ type: 'HIDE' });
    },

    reset: () => {
      cursorActor.send({ type: 'UNHOVER' });
      cursorActor.send({ type: 'UNSTICK' });
      particlesActor.send({ type: 'REPAIR' });
      navbarActor.send({ type: 'CLOSE_MENU' });
    },
  };
}
```

**Barrel update:** `src/lib/hooks/index.ts` — add `export { useInteraction } from './use-interaction';`

### Phase 3: Route-change reset component

**New file:** `src/components/route-reset-handler.tsx`

A client component that listens for pathname changes and calls `reset()`. Uses a ref to skip the initial mount.

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useInteraction } from '@/lib/hooks';

export function RouteResetHandler() {
  const pathname = usePathname();
  const prevPathnameRef = useRef<string | null>(null);
  const { reset } = useInteraction();

  useEffect(() => {
    if (prevPathnameRef.current !== null && prevPathnameRef.current !== pathname) {
      reset();
    }
    prevPathnameRef.current = pathname;
  }, [pathname, reset]);

  return null;
}
```

**Layout update:** `src/app/layout.tsx` — render `<RouteResetHandler />` inside `NavbarProvider` (innermost provider, so it has access to all three actor contexts).

### Phase 4: Migrate consumers

Replace direct actor ref usage with `useInteraction()` in all external consumers:

| File                                      | Before                                                             | After                                                             |
| ----------------------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `src/components/navbar/navbar.tsx`        | `useCursorActorRef` → `HOVER`/`UNHOVER`                            | `useInteraction` → `hover()`/`unhover()`                          |
| `src/components/navbar/nav-anchor.tsx`    | `useCursorActorRef` → `HOVER`/`UNHOVER`                            | `useInteraction` → `hover()`/`unhover()`                          |
| `src/features/home/sections/contacts.tsx` | `useCursorActorRef` → `HOVER`/`UNHOVER`/`STICK`/`UNSTICK`          | `useInteraction` → `hover()`/`unhover()`/`stick(pos)`/`unstick()` |
| `src/features/home/sections/hobbies.tsx`  | `useCursorActorRef` → `HOVER`/`UNHOVER`                            | `useInteraction` → `hover()`/`unhover()`                          |
| `src/features/error/error-code.tsx`       | `useCursorActorRef` + `useParticlesActorRef` → manual coordination | `useInteraction` → `hover()`/`unhover()`/`explode()`/`repair()`   |

**Internal consumers that do NOT migrate:**

- `cursor.tsx` — sends `SHOW`, `SET_SPEED`, `SET_POSITION` (drives cursor rendering internals)
- `scene.tsx` — sends `SHOW` (drives particle mesh readiness)
- `nav-menu.tsx` — sends `TOGGLE_MENU` (mobile menu toggle is a distinct action from `CLOSE_MENU`)

**Behavioral change in contacts.tsx:** `stick(position)` now also sends `EXPLODE` to particles. This means copy-button hovers on the home page will scatter the particle portrait. This is intentional per brainstorm decision.

### Phase 5: Accessibility, performance & best practices audit

Produce a document-only audit report at `docs/audits/2026-03-17-accessibility-performance-audit.md`.

**Audit areas:**

- **Semantic HTML & ARIA:** Check all landmarks, roles, aria attributes, label/description associations
- **Keyboard navigation:** Mobile menu focus trap, Escape key handling, `aria-expanded` on menu toggle
- **Skip navigation:** Missing skip-to-content link
- **Particle canvas:** Missing `aria-label` or `<figcaption>` on the `<figure>` wrapping the WebGL canvas
- **Color contrast:** WCAG AA compliance for text colors against backgrounds
- **Reduced motion:** Already uses `useReducedMotion()` for parallax; verify completeness
- **Performance:** Bundle size impact of Three.js, font loading strategy, image optimization
- **Core Web Vitals:** LCP (particle texture load), CLS (font swap), INP (hover handlers)
- **Meta tags:** OG tags, Twitter cards, favicon, manifest
- **Best practices:** CSP headers, HTTPS, canonical URLs

Output format: Findings grouped by priority (Critical / Important / Nice-to-have) with specific file references.

## Technical Considerations

- **CursorPosition type export:** The cursor machine defines `CursorPosition` locally. It needs to be exported from the cursor barrel (`src/components/cursor/index.ts`) for the hook to import it. Check if `computeStuckCoordinates` also needs re-export.

- **EXPLODE in hidden state:** If `stick()` is called when particles are in `hidden` state (before texture loads), the EXPLODE event is silently ignored by XState. This is acceptable — the explosion would be invisible anyway.

- **Mobile no-ops:** On mobile, `CursorRoot` returns `null` and never sends `SHOW`, so the cursor stays in `hidden` state. All cursor events from `useInteraction()` are silently dropped by XState (HOVER, STICK etc. are only handled in `visible` state). This is correct behavior.

- **Animation during reset:** If `reset()` fires while an explode/repair animation is mid-transition in `scene.tsx`, the motion library handles interpolation from the current intermediate values. No special handling needed.

- **`reset()` stability:** The function reference changes on every render since `useInteraction()` creates new closures. `RouteResetHandler` includes `reset` in the useEffect deps array, but since the actor refs are stable (from `createActorContext`), the reset function body is functionally equivalent across renders. If needed, wrap in `useCallback` — but the deps array should prevent unnecessary re-runs since it also depends on `pathname`.

## Acceptance Criteria

- [x] Navbar machine accepts `CLOSE_MENU` event (idempotent, sets `isMenuOpen: false`)
- [x] `useInteraction()` hook exists at `src/lib/hooks/use-interaction.ts` and is exported from barrel
- [x] `stick()` sends both `STICK` to cursor and `EXPLODE` to particles
- [x] `unstick()` sends both `UNSTICK` to cursor and `REPAIR` to particles
- [x] `reset()` sends `UNHOVER` + `UNSTICK` to cursor, `REPAIR` to particles, `CLOSE_MENU` to navbar
- [x] `RouteResetHandler` resets all interaction state on pathname change (skips initial mount)
- [x] All 5 external consumer components migrated to `useInteraction()`
- [x] Internal consumers (`cursor.tsx`, `scene.tsx`, `nav-menu.tsx`) remain unchanged
- [x] `pnpm lint` passes (eslint + tsc --noEmit)
- [x] `pnpm format` applied
- [x] Audit report produced at `docs/audits/2026-03-17-accessibility-performance-audit.md`

## Dependencies & Risks

- **CursorPosition type export:** Requires checking if the type is already exported from the cursor barrel. If not, add it.
- **Behavioral change risk:** `stick()` triggering `EXPLODE` on the home page contacts section is a deliberate UX change. Verify visually that the portrait scatter on copy-button hover feels intentional.
- **No test framework:** Changes cannot be verified with automated tests. Manual verification required on both desktop and mobile.

## Sources & References

- **Origin brainstorm:** [docs/brainstorms/2026-03-17-unified-interaction-hook-brainstorm.md](docs/brainstorms/2026-03-17-unified-interaction-hook-brainstorm.md) — Key decisions: STICK=EXPLODE, actions-only hook, soft reset includes navbar, show/hide kept for transitions
- Cursor machine: `src/components/cursor/machine.ts`
- Particles machine: `src/components/particles/machine.ts`
- Navbar machine: `src/components/navbar/machine.ts`
- ErrorCode (current dual-actor coordination): `src/features/error/error-code.tsx`
- Contacts (current STICK consumer): `src/features/home/sections/contacts.tsx`
