---
title: 'feat: Integrate web-haptics for mobile tactile feedback'
type: feat
status: completed
date: 2026-03-24
origin: docs/brainstorms/2026-03-24-web-haptics-requirements.md
---

# feat: Integrate web-haptics for mobile tactile feedback

## Overview

Add haptic feedback to key interaction moments in the portfolio using the `web-haptics` library. The portfolio already has rich visual interactions (custom cursor, particle explosions, smooth scroll) but no tactile layer on mobile. This adds subtle vibration feedback to four high-impact triggers without any additional UI.

## Problem Statement / Motivation

Mobile visitors interact with the site through touch but receive only visual feedback. Haptic feedback on key actions (menu toggle, copy confirmation, link taps) makes the experience more tactile and polished on supported devices (primarily Android Chrome). (see origin: `docs/brainstorms/2026-03-24-web-haptics-requirements.md`)

## Proposed Solution

Install `web-haptics` and create a thin `useHaptics` wrapper hook that adds cooldown and reduced-motion suppression. Wire haptic triggers into four locations: the navbar menu toggle, the contacts section (copy + links), and the particles scene (initial reveal on app load).

### Architecture

**No new provider.** The `useWebHaptics` hook is lightweight (wraps `navigator.vibrate()`) and safe to instantiate in multiple components. A provider would add unnecessary complexity for four call sites.

**New hook:** `src/lib/hooks/use-haptics.ts`

- Wraps `useWebHaptics` from `web-haptics/react`
- Adds a cooldown (200ms minimum between triggers) to prevent rapid-fire vibration from fast hover events
- Checks `prefers-reduced-motion` via Motion's `useReducedMotion()` and suppresses all haptics when active
- Enables `debug: true` in development for audio-based desktop testing
- Exposes: `{ trigger, cancel, isSupported }`

**Integration points (3 existing files to modify + 1 new hook):**

| Trigger           | File                                                                      | Event                                      | Preset      |
| ----------------- | ------------------------------------------------------------------------- | ------------------------------------------ | ----------- |
| Menu toggle       | `src/components/navbar/nav-menu.tsx:70`                                   | `onClick` on toggle button                 | `"nudge"`   |
| Copy to clipboard | `src/features/home/sections/contacts.tsx:86`                              | `onClick` on copy button (optimistic)      | `"success"` |
| External link tap | `src/features/home/sections/contacts.tsx:74-81` + social links `:129-138` | `onClick` on `<Link>` elements             | `"nudge"`   |
| Particle reveal   | `src/components/particles/scene.tsx:83`                                   | When `isVisible` becomes `true` (app load) | `"nudge"`   |

### Haptic Pattern Map

| Action            | Preset      | Rationale                                                                      |
| ----------------- | ----------- | ------------------------------------------------------------------------------ |
| Menu open/close   | `"nudge"`   | Short tactile confirmation of toggle                                           |
| Copy (optimistic) | `"success"` | Double-tap confirmation fired on click, visual checkmark confirms async result |
| Link tap          | `"nudge"`   | Light acknowledgement, not distracting                                         |
| Particle reveal   | `"nudge"`   | Tactile "welcome" when the particle background first appears on app load       |

### Cooldown Mechanism

Simple timestamp check inside `useHaptics`:

```
if (Date.now() - lastTriggerRef.current < 200) return;
```

This prevents rapid-fire vibration when tapping multiple elements in quick succession on mobile (e.g., the 4 social links).

### Reduced Motion Handling

Suppress **all** haptics when `prefers-reduced-motion` is enabled. Vibration is a motion-adjacent sensory output — functional feedback (copy success) still has visual confirmation via the checkmark icon. (see origin: requirements R3)

### SSR Safety

`useWebHaptics` is marked `'use client'` and returns `isSupported: false` during SSR. All consumer components (`nav-menu.tsx`, `contacts.tsx`, `scene.tsx`) already have `'use client'` directives. No additional SSR guards needed.

### R3F Compatibility Note

The particle reveal haptic fires inside `scene.tsx`, which renders within React Three Fiber's `<Canvas>`. R3F uses a separate React reconciler, but `useWebHaptics` only accesses `navigator.vibrate()` — no DOM context providers needed. If issues arise during implementation, the haptic can be lifted to the `Particles` wrapper component outside Canvas by watching the particles store selector.

## Technical Considerations

- **Bundle size:** `web-haptics` is small. The portfolio already ships Three.js/R3F — this is negligible in comparison.
- **Browser support:** Vibration API works on Android Chrome/Firefox. Safari (iOS/macOS) and desktop browsers silently no-op via `isSupported: false`. No fallback UI needed. (see origin: requirements R4)
- **Multiple hook instances:** `useWebHaptics` will be instantiated in ~4 components. Each creates a `WebHaptics` instance, but they all call the same `navigator.vibrate()` — no conflicts.
- **Debug mode:** `debug: true` in development plays audio feedback so haptics can be verified without a mobile device.

## Acceptance Criteria

- [ ] `web-haptics` installed as a dependency
- [ ] New `src/lib/hooks/use-haptics.ts` hook with cooldown + reduced-motion suppression
- [ ] Hook exported from `src/lib/hooks/index.ts` barrel
- [ ] Navbar menu toggle fires `"nudge"` haptic on click (`nav-menu.tsx`)
- [ ] Copy-to-clipboard fires `"success"` haptic on click, optimistically (`contacts.tsx`)
- [ ] External link taps fire `"nudge"` haptic on click (`contacts.tsx` — both contact links and social links)
- [ ] Particle reveal fires `"nudge"` haptic when `isVisible` becomes `true` on app load (`scene.tsx`)
- [ ] All haptics suppressed when `prefers-reduced-motion` is active
- [ ] No errors on desktop/Safari (silent no-op)
- [ ] No visual or functional regressions
- [ ] `pnpm build` passes
- [ ] `pnpm lint` passes

## Implementation Steps

### Step 1: Install dependency

```bash
pnpm add web-haptics
```

### Step 2: Create `src/lib/hooks/use-haptics.ts`

```ts
// src/lib/hooks/use-haptics.ts
'use client';

import { useWebHaptics } from 'web-haptics/react';
import { useReducedMotion } from 'motion/react';
import { useRef, useCallback } from 'react';

const COOLDOWN_MS = 200;

export function useHaptics() {
  const { trigger, cancel, isSupported } = useWebHaptics({
    debug: process.env.NODE_ENV === 'development',
  });
  const reducedMotion = useReducedMotion();
  const lastTriggerRef = useRef(0);

  const throttledTrigger = useCallback(
    (preset?: string) => {
      if (reducedMotion || !isSupported) return;
      const now = Date.now();
      if (now - lastTriggerRef.current < COOLDOWN_MS) return;
      lastTriggerRef.current = now;
      trigger(preset);
    },
    [trigger, reducedMotion, isSupported],
  );

  return { trigger: throttledTrigger, cancel, isSupported };
}
```

### Step 3: Export from barrel (`src/lib/hooks/index.ts`)

Add `export { useHaptics } from './use-haptics';`

### Step 4: Wire into `scene.tsx` (particle reveal)

- Import `useHaptics`
- In the `useEffect` that watches `isVisible` (line 83), call `trigger('nudge')` when `isVisible` becomes `true`
- This fires once on app load when particles first appear

### Step 5: Wire into `nav-menu.tsx`

- Import `useHaptics`
- Call `trigger('nudge')` in the toggle button's `onClick`

### Step 6: Wire into `contacts.tsx`

- Import `useHaptics`
- In `CallToAction`: call `trigger('success')` in the copy button's `onClick`, alongside `copyToClipboard(value)` (optimistic — visual checkmark confirms the async result)
- In `CallToAction`: call `trigger('nudge')` on `onClick` of the `<Link>` element
- In `Contacts` socials: call `trigger('nudge')` on `onClick` of each social `<Link>`

### Step 7: Verify

- `pnpm build` — no errors
- `pnpm lint` — no warnings
- Manual test on mobile device or with debug audio on desktop

## Dependencies & Risks

- **Dependency:** `web-haptics` package (MIT, ~2.3k GitHub stars, actively maintained)
- **Risk:** Library is v0.0.6 — API could change. Low impact since the wrapper hook isolates the library from the rest of the codebase.
- **Risk:** iOS Safari does not support the Vibration API and likely never will. This feature is Android-only in practice. Acceptable for a portfolio site.

## Sources & References

- **Origin document:** [docs/brainstorms/2026-03-24-web-haptics-requirements.md](docs/brainstorms/2026-03-24-web-haptics-requirements.md) — Key decisions: use library (not custom), key moments only, system preference only (no toggle UI)
- **Library:** [github.com/lochie/web-haptics](https://github.com/lochie/web-haptics)
- **React API:** `import { useWebHaptics } from 'web-haptics/react'` — returns `{ trigger, cancel, isSupported }`
- **Vibration API support:** [caniuse.com/vibration](https://caniuse.com/vibration)
