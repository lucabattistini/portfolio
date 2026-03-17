---
title: 'feat: Add Lenis smooth scroll'
type: feat
status: completed
date: 2026-03-17
origin: docs/brainstorms/2026-03-17-lenis-smooth-scroll-brainstorm.md
---

# feat: Add Lenis Smooth Scroll

## Overview

Add Lenis smooth scroll to the portfolio for buttery inertial scrolling on desktop (wheel/trackpad) and mobile (syncTouch). No anchor navigation — purely the scroll feel. (see brainstorm: docs/brainstorms/2026-03-17-lenis-smooth-scroll-brainstorm.md)

## Proposed Solution

Create a `SmoothScroll` client component that wraps `ReactLenis` with Motion frame sync (`autoRaf: false`). Place it as the outermost provider in `layout.tsx`. Replace the native `window.scrollTo` in NavAnchor with Lenis's `scrollTo`. Conditionally disable Lenis when the user prefers reduced motion.

## Technical Approach

### New Files

#### `src/components/smooth-scroll/smooth-scroll.tsx`

Client component (`'use client'`):

- Import `ReactLenis` and `LenisRef` from `lenis/react`
- Import `frame`, `cancelFrame` from `motion`
- Import `useReducedMotion` from `motion/react`
- Use a `useEffect` to register `lenis.raf(timestamp)` on `frame.update` with `autoRaf: false` (see brainstorm: decision #2)
- Cleanup: call `cancelFrame(update)` on unmount
- If `prefers-reduced-motion` is active, render children without `ReactLenis` (fully disable — no Lenis instance)
- Props: `children: React.ReactNode`
- Lenis options: `{ autoRaf: false, syncTouch: true }` (see brainstorm: decisions #2, #4)

#### `src/components/smooth-scroll/index.ts`

Barrel export: `export { SmoothScroll } from './smooth-scroll'`

### Modified Files

#### `src/app/layout.tsx`

- Import `SmoothScroll` from `@/components/smooth-scroll`
- Import `'lenis/dist/lenis.css'` for required Lenis styles
- Wrap existing provider chain: `SmoothScroll` → `CursorProvider` → `ParticlesProvider` → `NavbarProvider` (see brainstorm: integration point)

#### `src/components/navbar/nav-anchor.tsx` (line 39)

- Import `useLenis` from `lenis/react`
- Replace `window.scrollTo({ top: 0, behavior: 'smooth' })` with:
  - If Lenis instance available: `lenis.scrollTo(0)`
  - Fallback (reduced motion / no Lenis): `window.scrollTo({ top: 0, behavior: 'instant' })`
- The `useLenis` hook returns `null` when no `ReactLenis` ancestor exists (reduced motion case), making the fallback pattern clean

#### `src/app/globals.css`

- No manual CSS needed — `lenis/dist/lenis.css` handles the required `html.lenis` and `html.lenis-smooth` styles via the JS import

### No Changes Needed

- **`particles.tsx`**: Motion's `useScroll({ target: sentinelRef })` reads native scroll position — Lenis preserves this (see brainstorm: verified assumption)
- **`use-is-beyond-fold.ts`**: Motion's `useScroll()` + `scrollY` reads native scroll — works as-is
- **`section.tsx`**: `whileInView` uses IntersectionObserver — compatible with Lenis's native scroll

## Scroll Locking for Mobile Menu

When the mobile `NavMenu` overlay opens, background scrolling must be prevented. Add `lenis.stop()` on menu open and `lenis.start()` on menu close.

**Implementation**: In a component that has access to both the navbar XState store (to know when menu is open) and the Lenis instance (via `useLenis`). Options:

1. **Inside `NavMenu`** — add a `useLenis` + `useEffect` that calls `stop()`/`start()` based on menu state
2. **Inside `SmoothScroll`** — accept a `stopped` prop driven by navbar state (creates coupling)

Option 1 is simpler and keeps scroll-lock co-located with the menu. When Lenis is disabled (reduced motion), `useLenis` returns null and the effect is a no-op — native scroll lock via `overflow: hidden` on `<body>` would be the fallback (check if this is already handled).

## Reduced Motion Strategy

- Use `useReducedMotion()` from `motion/react` (already used in `particles.tsx`)
- When active: **do not render `ReactLenis`** — children render without a Lenis context
- NavAnchor's `useLenis` returns `null` → falls back to `window.scrollTo({ top: 0, behavior: 'instant' })`
- Menu scroll lock: `useLenis` returns `null` → no-op (rely on CSS `overflow: hidden` if present)
- This is the cleanest approach: no conditional Lenis options, no branching inside the smooth scroll component

## Acceptance Criteria

- [x] Smooth inertial scrolling on desktop wheel/trackpad input
- [x] Smooth inertial scrolling on mobile/touch via `syncTouch`
- [x] Lenis frame updates synced with Motion's `frame.update` loop
- [x] Particles parallax continues to work (Motion `useScroll` compatible)
- [x] `whileInView` section reveals continue to work (IntersectionObserver compatible)
- [x] "Back to top" button uses `lenis.scrollTo(0)` instead of `window.scrollTo`
- [x] Lenis fully disabled when `prefers-reduced-motion: reduce` is active
- [x] NavAnchor falls back to `window.scrollTo` when Lenis is disabled
- [x] Background scroll locked when mobile menu overlay is open
- [ ] Keyboard scrolling (Tab, Space, PgDown, arrows) works correctly
- [ ] No scroll jank on 404 page (Lenis is a no-op on non-scrollable content)
- [x] `lenis/dist/lenis.css` imported for required styles
- [x] Proper cleanup of frame callback on component unmount

## Manual Testing Plan

1. Desktop: wheel scroll through all sections — verify smooth inertia and particles parallax
2. Desktop: click "Back to top" — verify smooth scroll to top via Lenis
3. Mobile: touch scroll — verify syncTouch inertia feels natural
4. Mobile: open/close menu while mid-scroll — verify no background scrolling
5. Mobile: pull-to-refresh at top of page — verify native behavior not broken
6. Keyboard: Tab through page, use PgDown/Up, Home/End — verify scroll works
7. DevTools: toggle `prefers-reduced-motion: reduce` — verify native scroll, no Lenis
8. Navigate to 404 page — verify layout is correct with Lenis wrapper active
9. Verify particles parallax panning is smooth during Lenis inertia decay

## Dependencies

- `lenis` (npm package) — includes `lenis/react` and `lenis/dist/lenis.css`

## Sources

- **Origin brainstorm:** [docs/brainstorms/2026-03-17-lenis-smooth-scroll-brainstorm.md](docs/brainstorms/2026-03-17-lenis-smooth-scroll-brainstorm.md) — key decisions: Motion frame sync, simple wrapper (no XState), syncTouch enabled, reduced motion respect
- **Lenis React docs:** ReactLenis component, useLenis hook, LenisRef type, autoRaf option
- **Lenis CSS:** `lenis/dist/lenis.css` provides required `html.lenis` / `html.lenis-smooth` styles
- **Existing integration points:** `nav-anchor.tsx:39`, `particles.tsx:22-25`, `use-is-beyond-fold.ts:15-22`, `section.tsx:24-28`, `layout.tsx:33-41`
