---
title: Scroll performance — reducing per-frame overhead
category: performance-issues
date: 2026-03-17
tags: [scroll, r3f, three.js, gpu, compositing, lenis, motion]
components: [particles, touch-texture, home]
---

# Scroll Performance — Reducing Per-Frame Overhead

## Problem

After adding Lenis smooth scroll, scrolling felt laggy. Investigation revealed multiple sources of unnecessary per-frame work running 60-120x/sec, compounding during and after scroll.

## Root Cause

Four independent issues contributing to cumulative frame budget pressure:

1. **TouchTexture GPU upload every frame** — `touch-texture.ts` cleared a 64x64 canvas, redrew all trail points, and set `texture.needsUpdate = true` on every frame, even when no trail points existed. This forced a CPU-to-GPU texture transfer every frame for no visual change.

2. **`blur(0px)` kept compositor layers active** — Motion's `animate={{ filter: 'blur(0px)' }}` still sets the CSS `filter` property, preventing the browser from dropping the compositing layer. Two elements (article + particles figure) both had this.

3. **Parallax lerp never converged** — `MathUtils.lerp(current, target, 0.08)` asymptotically approaches the target but never reaches it, causing unnecessary lerp math for 50+ frames after scrolling stops.

4. **`new Color(0xffffff)` per render** — A Three.js Color object was allocated on every React render of the particles scene component.

## Solution

### TouchTexture dirty-flag short-circuit (`touch-texture.ts`)

Track a `dirty` boolean. When `trail.length === 0 && !dirty`, skip the entire update. When trail empties, do one final clear to avoid "burned in" ripple frames, then set `dirty = false`.

```typescript
let dirty = false;

const update = () => {
  if (trail.length === 0 && !dirty) return;
  // ... clear, age, draw ...
  dirty = trail.length > 0;
  texture.needsUpdate = true;
};
```

**Key insight:** Can't just check `trail.length === 0` — the last trail point ages out during update, so the canvas needs one final clear after all points expire.

### Filter none instead of blur(0px) (`particles.tsx`, `home/index.tsx`)

```tsx
// Before
animate={{ filter: isBlurred ? 'blur(16px)' : 'blur(0px)' }}

// After
animate={{ filter: isBlurred ? 'blur(16px)' : 'none' }}
```

### Parallax epsilon snap (`scene.tsx`)

```typescript
const currentX = groupRef.current.position.x;
groupRef.current.position.x =
  Math.abs(currentX - targetX) < 0.01
    ? targetX
    : MathUtils.lerp(currentX, targetX, 0.08);
```

Note: R3F `useFrame` still runs every frame (it also updates `uTime`), so this only saves the lerp math, not the frame itself.

### Hoist Color constant (`scene.tsx`)

```typescript
const WHITE = new Color(0xffffff); // module-level

// In JSX:
<meshBasicMaterial color={WHITE} ... />
```

## Prevention

- **GPU textures:** Only set `texture.needsUpdate = true` when the texture data actually changed. Track dirtiness explicitly.
- **CSS filters:** Use `'none'` instead of `'blur(0px)'` / `'opacity(1)'` / etc. The zero-value versions still activate compositor layers.
- **Asymptotic lerp:** Always add an epsilon snap when using `MathUtils.lerp` in render loops to prevent infinite convergence.
- **Object allocation in render:** Hoist any `new` calls (Color, Vector3, etc.) to module scope or refs when used in R3F components.
