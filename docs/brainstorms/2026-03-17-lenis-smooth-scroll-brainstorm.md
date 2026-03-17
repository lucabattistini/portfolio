# Brainstorm: Lenis Smooth Scroll

**Date:** 2026-03-17
**Status:** Ready for planning

## What We're Building

Add Lenis smooth scroll to the portfolio site for a buttery inertial scrolling experience on both desktop (wheel) and touch devices (syncTouch). No anchor navigation or section links — purely the scroll feel.

## Why Lenis

- Lightweight, performant smooth scroll library from darkroom.engineering
- Uses native scroll position (not CSS transforms), so existing Motion `useScroll`, `whileInView`, and Intersection Observer all work without changes
- Official `lenis/react` package with `ReactLenis` component and `useLenis` hook
- Documented Framer Motion integration pattern for frame-synced animation

## Key Decisions

1. **Smooth scrolling only** — no anchor navigation or section IDs needed. The goal is the inertial scroll feel, not navigation features.

2. **Sync with Motion's frame loop** — use `frame.update` from `motion` (Framer Motion v12) to drive Lenis with `autoRaf: false`. This keeps particles parallax and scroll-triggered animations tightly coordinated with the scroll position.

3. **Simple wrapper component** — a thin `SmoothScroll` component wrapping `ReactLenis` with the Motion frame sync logic. No XState machine/store pattern — there's no complex state to manage here, so the overhead isn't justified.

4. **syncTouch enabled** — apply Lenis inertia to touch devices too for a consistent feel across all input methods.

## Assumptions Verified

- **`pointer-events-none` on article wrapper** — not a conflict. Lenis scrolls the `<html>` element, not the article, so pointer-events styling doesn't interfere.
- **Reduced motion** — when the user prefers reduced motion (`prefers-reduced-motion`), Lenis should be disabled or set to instant scrolling (no lerp). The codebase already respects this via `useReducedMotion()` in particles.

## Integration Points

- **layout.tsx**: Add `SmoothScroll` component as the outermost provider (before CursorProvider), since `ReactLenis root` controls the document-level scroll
- **NavAnchor**: Replace `window.scrollTo({ behavior: 'smooth' })` with Lenis's `scrollTo()` for the back-to-top button
- **particles.tsx**: Motion's `useScroll()` should work as-is since Lenis uses native scroll
- **use-is-beyond-fold.ts**: Motion's `useScroll()` + `scrollY` should work as-is
- **Section.Reveal**: `whileInView` uses Intersection Observer, compatible with native-scroll Lenis

## What We're NOT Building

- Anchor/section navigation
- Navbar scroll links
- Custom scroll speed per section
- Horizontal scroll sections
- Scroll-triggered page transitions
