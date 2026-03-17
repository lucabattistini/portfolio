---
title: 'fix: Scroll performance optimizations'
type: fix
status: completed
date: 2026-03-17
origin: docs/audits/2026-03-17-accessibility-performance-audit.md
---

# fix: Scroll Performance Optimizations

Address 6 performance findings (#16-#21) from the accessibility/performance audit, focused on reducing per-frame work during and after scrolling.

## Acceptance Criteria

### High Impact

- [x] **#16 — TouchTexture short-circuit** (`src/components/particles/touch-texture.ts:97-112`)
  - Track a `dirty` boolean: set `true` when trail has points, set `false` after clearing an empty trail
  - When `trail.length === 0 && !dirty` — skip `clear()`, `draw()`, and `texture.needsUpdate = true` entirely
  - When `trail.length === 0 && dirty` — clear the canvas one final time, mark `needsUpdate = true`, then set `dirty = false`
  - This ensures the last ripple frame doesn't stay "burned in" on the texture
  - Current: canvas redraws + GPU texture upload 60-120x/sec unconditionally

### Medium Impact

- [x] **#17 — blur(0px) → filter none** (`src/features/home/index.tsx:27`, `src/components/particles/particles.tsx:52`)
  - Change `'blur(0px)'` to `'none'` in both `animate` props so the browser drops the compositing layer when menu is closed
  - Affects: `<motion.article>` in `index.tsx:27` and `<motion.figure>` in `particles.tsx:52`

- [x] **#18 — Parallax epsilon snap** (`src/components/particles/scene.tsx:136`)
  - Add epsilon check before the lerp: if `Math.abs(current - target) < 0.01`, snap to target
  - Note: R3F's `useFrame` still runs every frame (it also updates `uTime` and calls `touchTexture.update()`), so this only saves the lerp math, not the frame itself. Still worth doing for correctness — prevents permanent asymptotic drift

### Low Impact

- [ ] **#19 — useIsBeyondFold optimization** _(skipped — low impact, React bailout sufficient)_ (`src/lib/hooks/use-is-beyond-fold.ts`)
  - Optional: replace `useMotionValueEvent(scrollY, 'change', ...)` with IntersectionObserver on a sentinel element
  - Current: fires callback every scroll frame, reads `window.visualViewport.height` each time
  - Skip if the effort doesn't justify the gain (React's same-value bailout already prevents re-renders)

- [x] **#20 — Hoist Color constant** (`src/components/particles/scene.tsx:176`)
  - Move `new Color(0xffffff)` to a module-level constant
  - Current: allocates a new Three.js Color object on every render

**Note on syncTouch (#21):** `syncTouch: true` bypasses native scroll optimizations on mobile. No code change needed now — revisit by setting `syncTouch: false` if mobile lag persists after the above fixes.

## Implementation Order

1. #16 (TouchTexture) — biggest single win
2. #17 (blur filter) — two-line change
3. #20 (Color constant) — one-line change
4. #18 (parallax epsilon) — small logic addition
5. #19 (useIsBeyondFold) — optional, skip if diminishing returns
6. #21 (syncTouch) — monitor only, no code change

## Sources

- **Origin audit:** [docs/audits/2026-03-17-accessibility-performance-audit.md](docs/audits/2026-03-17-accessibility-performance-audit.md) — findings #16-#21
- **Key files:** `touch-texture.ts:97`, `scene.tsx:136,176`, `particles.tsx:52`, `home/index.tsx:27`, `use-is-beyond-fold.ts:20`, `smooth-scroll.tsx:28`
