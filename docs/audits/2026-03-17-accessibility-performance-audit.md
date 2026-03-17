# Accessibility, Performance & Best Practices Audit

**Date:** 2026-03-17
**Scope:** Full site (lucabattistini.dev)
**Type:** Document-only — findings and recommendations, no fixes applied

---

## Critical

### 1. Mobile menu has no focus trap or keyboard support

**File:** `src/components/navbar/nav-menu.tsx`

- The menu button has no `aria-expanded` attribute
- When the menu opens, focus does not move into the menu
- No focus trap — Tab key moves focus behind the overlay
- No `Escape` key handler to close the menu
- Screen reader users cannot tell whether the menu is open or closed
- **WCAG:** 2.1.1 Keyboard, 2.4.3 Focus Order, 4.1.2 Name, Role, Value

### 2. No skip-to-content link

**File:** `src/app/layout.tsx`

- No skip navigation link exists. Keyboard users must tab through the entire navbar on every page load
- **WCAG:** 2.4.1 Bypass Blocks

### 3. Particle canvas has no accessible alternative

**Files:** `src/components/particles/particles.tsx`

- The `<figure>` wrapping the WebGL canvas has no `<figcaption>` or `aria-label`
- The portrait rendered via particles (`me.png`) has no text alternative
- Screen readers have no way to know what the canvas displays
- **WCAG:** 1.1.1 Non-text Content

---

## Important

### 4. Color contrast — accent on background

**File:** `src/app/globals.css`

- `--accent: #ffff9a` (yellow) on `--background: #1b1b1b` (dark gray)
- Contrast ratio is approximately **12.8:1** — passes WCAG AA and AAA for normal text
- `--primary: #ededed` on `--background: #1b1b1b` — approximately **14.4:1** — passes
- `--primary` at 70% opacity (`text-primary/70`) on background — approximately **9.2:1** — passes AA
- **Status:** Passes. No action needed.

### 5. Interactive elements are pointer-only

**Files:** `src/components/navbar/navbar.tsx`, `src/features/home/sections/contacts.tsx`, `src/features/home/sections/hobbies.tsx`

- Hover/stick/explode effects are triggered only by `onPointerEnter`/`onPointerLeave`
- Keyboard `focus`/`blur` events do not trigger cursor or particle effects
- This is acceptable if cursor effects are considered purely decorative (the cursor itself is `aria-hidden`)
- **Recommendation:** Consider adding `onFocus`/`onBlur` handlers as a visual enhancement for keyboard users, but not a WCAG requirement since the effects are decorative

### 6. `<menu>` element semantics

**File:** `src/components/navbar/nav-menu.tsx:64`

- Uses `<menu>` element which has inconsistent screen reader support
- Contains links inside `<ul>/<li>`, which is correct structure
- **Recommendation:** Consider replacing `<menu>` with `<div role="dialog" aria-modal="true" aria-label="Navigation menu">` for the overlay, or `<nav>` for the link list

### 7. External links lack accessible indicators

**Files:** Various sections (contacts, hobbies, navbar)

- Links opening in new tabs (`target="_blank"`) have `rel="noopener noreferrer"` (good)
- No visual or screen reader indicator that the link opens in a new window
- **WCAG:** 3.2.5 Change on Request (AAA)
- **Recommendation:** Add `aria-label` suffix like "opens in a new tab" or a visual icon

### 8. Motion/animation accessibility

**File:** `src/components/particles/particles.tsx`

- `useReducedMotion()` is used to disable parallax and switch to opacity fade — good
- However, the particle canvas itself still renders and animates (position jitter, touch texture ripple) even with `prefers-reduced-motion`
- The `Section.Reveal` scroll-triggered animations (`whileInView`) do not respect reduced motion
- **Recommendation:** Wrap `Section.Reveal` animation in a reduced motion check; consider pausing particle shader animation when reduced motion is preferred

---

## Nice-to-have

### 9. Missing meta tags

**File:** `src/app/layout.tsx`

- No Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`)
- No Twitter Card tags (`twitter:card`, `twitter:title`, `twitter:image`)
- No `<link rel="canonical">` tag
- No `favicon.ico` or `apple-touch-icon` in `public/`
- **Recommendation:** Add OG/Twitter metadata in `layout.tsx` via Next.js `metadata` export. Add favicon files to `public/`.

### 10. Performance — Three.js bundle size

**Dependency:** `three@0.182.0`, `@react-three/fiber@9.5.0`, `@react-three/drei@10.7.7`

- Three.js adds ~600-700KB to the JavaScript bundle (minified, before gzip)
- drei imports should be checked for tree-shaking — importing the full module can pull in unused code
- **Recommendation:** Verify that only used drei exports are imported. Consider dynamic import for the particle canvas to avoid blocking initial render.

### 11. Performance — Font loading

**File:** `src/app/layout.tsx`

- Two Google Fonts loaded (Space Grotesk, Bebas Neue) via `next/font/google`
- `next/font` handles optimal loading (preload, `font-display: swap`) automatically
- **Status:** Well configured. Minor CLS risk from font swap if fonts are large.

### 12. Performance — Image optimization

**File:** `public/me.png`

- The portrait image is loaded as a raw texture for WebGL, not through `<img>` or `next/image`
- Cannot use Next.js image optimization for WebGL textures
- **Recommendation:** Ensure `me.png` is appropriately sized and compressed. Consider providing a low-res placeholder for faster LCP.

### 13. Performance — Core Web Vitals considerations

- **LCP:** The particle canvas + texture load determines visual completeness. The `<Suspense fallback={null}>` means no content shows until Three.js scene is ready. Consider a lightweight placeholder.
- **CLS:** Font swap is handled by `next/font`. No other layout shift sources identified.
- **INP:** Pointer event handlers (`onPointerEnter`/`onPointerLeave`) are lightweight synchronous state sends. No INP concerns.

### 14. Landmark structure

**Files:** `src/app/layout.tsx`, `src/features/home/index.tsx`, `src/app/not-found.tsx`

- `<main>` is used correctly on both home and 404 pages
- `<header>` used for hero section — good
- `<nav>` used for navbar — good
- `<article>` wraps the content body — acceptable
- `<section>` used for each content section with `<h2>` headings — good heading hierarchy
- **Status:** Landmark structure is solid.

### 15. `aria-hidden` on animated word spans

**Files:** `src/features/error/error-code.tsx`, `src/components/navbar/nav-menu.tsx`

- Individual animated `<span>` elements are `aria-hidden`, with parent having `aria-label` for the full text
- This is the correct pattern for split-text animations
- **Status:** Well implemented.

---

## Scroll Performance (added post-Lenis integration)

### 16. TouchTexture redraws + GPU upload every frame (High Impact)

**File:** `src/components/particles/touch-texture.ts:97-112`

- `update()` clears and redraws the entire 64x64 canvas **every frame** (60-120fps)
- Sets `texture.needsUpdate = true` unconditionally, forcing a CPU-to-GPU texture upload every frame
- This happens even when the trail array is empty and nothing visual changed
- **Fix:** Short-circuit `update()` when `trail.length === 0`; only set `needsUpdate = true` when there are active trail points

### 17. `filter: blur(0px)` keeps compositor layer active (Medium Impact)

**Files:** `src/features/home/index.tsx:26-28, 52`

- Both `<Particles>` wrapper and `<motion.article>` animate to `blur(0px)` when menu is closed
- `filter: blur(0px)` still sets the CSS `filter` property, preventing the browser from removing the compositing layer
- **Fix:** Use `filter: 'none'` instead of `'blur(0px)'` when menu is closed

### 18. Parallax lerp never converges, keeps R3F render loop busy (Medium Impact)

**File:** `src/components/particles/scene.tsx:136`

- `MathUtils.lerp(groupRef.current.position.x, targetX, 0.08)` asymptotically approaches but never reaches target
- Combined with a slow spring (`stiffness: 75, damping: 36, mass: 1.8, restDelta: 0.0005`), the R3F `useFrame` loop stays active for 50+ frames after scrolling stops
- **Fix:** Add epsilon check: skip the lerp and snap to target when `Math.abs(current - target) < 0.01`

### 19. `useIsBeyondFold` runs callback on every scroll frame (Low Impact)

**File:** `src/lib/hooks/use-is-beyond-fold.ts:20`

- `useMotionValueEvent(scrollY, 'change', ...)` fires on every scroll event
- Calls `getViewportHeight()` (reads `window.visualViewport.height`) every time
- React's same-value bailout prevents re-renders when the boolean doesn't change, so impact is low
- **Fix (optional):** Replace with IntersectionObserver on a sentinel element at 1.25x viewport height — zero per-frame cost

### 20. `new Color(0xffffff)` allocated on every render (Low Impact)

**File:** `src/components/particles/scene.tsx:178`

- `<meshBasicMaterial color={new Color(0xffffff)} />` creates a new Three.js Color object on every render
- **Fix:** Hoist to a module-level constant

### 21. Lenis `syncTouch: true` bypasses native scroll optimizations on mobile

**File:** `src/components/smooth-scroll/smooth-scroll.tsx:28`

- `syncTouch: true` makes Lenis intercept all touch events and run its own physics in JS
- Native compositor-driven scroll and passive event listener fast paths are bypassed
- Combined with R3F rendering particles on the main thread, this creates contention
- **Note:** This was a deliberate choice for consistent UX — may need revisiting if mobile lag is noticeable

---

## Summary

| Priority     | Count | Key Areas                                                                          |
| ------------ | ----- | ---------------------------------------------------------------------------------- |
| Critical     | 3     | Mobile menu keyboard/a11y, skip-to-content link, canvas alt text                   |
| Important    | 5     | Pointer-only effects, menu semantics, external link indicators, motion preferences |
| Scroll Perf  | 6     | TouchTexture per-frame redraw, blur(0px) compositor, parallax lerp, syncTouch      |
| Nice-to-have | 7     | Meta tags, bundle size, font/image perf, CWV                                       |

**Recommended fix order:**

1. Mobile menu focus trap + `aria-expanded` + Escape key (highest user impact)
2. **TouchTexture short-circuit** — biggest single perf win, stops unnecessary GPU uploads every frame (#16)
3. **`blur(0px)` → `'none'`** — quick win, removes unnecessary compositor layer (#17)
4. **Parallax epsilon check** — stops R3F loop from running 50+ extra frames after scroll (#18)
5. Skip-to-content link (quick win)
6. Canvas `aria-label` or `<figcaption>` (quick win)
7. OG/Twitter meta tags (SEO impact)
8. Reduced motion for Section.Reveal and particles shader
