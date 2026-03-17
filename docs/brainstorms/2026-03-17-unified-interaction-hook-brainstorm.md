# Brainstorm: Unified Interaction Hook & Audit

**Date:** 2026-03-17
**Status:** Ready for planning

## What We're Building

### 1. `useInteraction()` Orchestrator Hook

A single hook that coordinates the cursor and particles XState actors, replacing manual dual-actor dispatch in components. It exposes unified action methods:

- `hover()` / `unhover()` — sends HOVER/UNHOVER to cursor
- `stick(rect)` / `unstick()` — sends STICK to cursor **and** EXPLODE to particles (unified behavior)
- `explode()` / `repair()` — sends EXPLODE/REPAIR to particles
- `reset()` — resets both machines to clean state (UNSTICK, UNHOVER, REPAIR, etc.)
- `show()` / `hide()` — sends SHOW/HIDE to both actors

**Key decision:** HOVER always triggers EXPLODE, UNHOVER always triggers REPAIR. Stick/unstick only affects the cursor.

### 2. Route-Change Reset

A `usePathname()` effect in the layout that calls `reset()` on navigation. This handles:

- Clearing `isExploded` when leaving the 404 page
- Clearing `isStuck` / `isHovered` cursor state
- Closing navbar menu

Requires adding a `CLOSE_MENU` event to the navbar machine (currently only has `TOGGLE_MENU`, which can't force-close).

Must be general-purpose since more pages are planned.

### 3. Accessibility, Performance & Best Practices Audit

A document-only audit covering:

- Semantic HTML and ARIA attributes
- Keyboard navigation (especially mobile menu)
- Skip-navigation link
- Color contrast
- Alt text for the particle portrait (or appropriate aria-label)
- Performance (bundle size, WebGL, font loading, image optimization)
- Core Web Vitals considerations
- Best practices (meta tags, OG tags, etc.)

Output: An audit report with findings and priorities. Fixes happen separately.

## Why This Approach

**Orchestrator hook over unified machine:** The cursor and particles are conceptually different systems that occasionally need coordination. A hook provides that coordination without merging their state, keeping each machine simple and testable. If coordination grows complex, upgrading to a parent XState machine is straightforward.

**Route-change reset:** Currently no reset logic exists. The XState actors persist in layout-level providers, so state leaks across navigations. `usePathname()` is the standard Next.js App Router way to detect route changes.

**Audit as document:** Allows prioritization and planning before committing to fixes. Some issues (like keyboard nav for mobile menu) may require design decisions.

## Key Decisions

1. **HOVER = EXPLODE** — These events are always paired. `unhover()` sends REPAIR. Stick/unstick only affects cursor.
2. **Hook lives in `src/lib/hooks/`** — Alongside existing hooks, exported via barrel.
3. **Touch texture stays internal** — The Three.js pointer-to-UV mouse tracking remains encapsulated in the particles scene. The hook only handles discrete events.
4. **Reset is general-purpose** — Built to work with future pages, not just home ↔ 404.
5. **Reset lives in layout, not in the hook** — A separate `usePathname()` effect in the layout calls `reset()`. The hook itself is a pure action dispatcher with no side effects.
6. **Navbar needs CLOSE_MENU event** — The current `TOGGLE_MENU` can't force-close. A new event is needed for `reset()` to work.
7. **show()/hide() kept** — For future page transition animations.
8. **Audit is document-only** — Findings documented with priorities, fixes are a separate effort.

## Resolved Questions

1. **reset() includes navbar** — `reset()` also closes the mobile menu. One call resets all interaction state (cursor, particles, navbar).
2. **Actions only** — The hook returns only action dispatchers. Components continue using `useCursorSelector` / `useParticlesSelector` for reads. Keeps the hook simple and avoids unnecessary re-renders.
