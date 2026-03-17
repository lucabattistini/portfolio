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

## Summary

| Priority     | Count | Key Areas                                                                          |
| ------------ | ----- | ---------------------------------------------------------------------------------- |
| Critical     | 3     | Mobile menu keyboard/a11y, skip-to-content link, canvas alt text                   |
| Important    | 5     | Pointer-only effects, menu semantics, external link indicators, motion preferences |
| Nice-to-have | 7     | Meta tags, bundle size, font/image perf, CWV                                       |

**Recommended fix order:**

1. Mobile menu focus trap + `aria-expanded` + Escape key (highest user impact)
2. Skip-to-content link (quick win)
3. Canvas `aria-label` or `<figcaption>` (quick win)
4. OG/Twitter meta tags (SEO impact)
5. Reduced motion for Section.Reveal and particles shader
