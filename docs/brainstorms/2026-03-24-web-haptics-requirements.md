---
date: 2026-03-24
topic: web-haptics
---

# Web Haptics Integration

## Problem Frame

The portfolio has rich visual interactions (custom cursor, particle explosions, smooth scroll) but no tactile feedback on mobile. Adding haptic feedback to key moments would make the experience more immersive and polished on supported devices.

## Requirements

- R1. Install and integrate the `web-haptics` library using its React hook (`useWebHaptics`)
- R2. Trigger haptic feedback on these key moments:
  - Navbar menu open/close toggle
  - Contact actions (copy email to clipboard, open external links)
  - Particle explosion on hero interaction
- R3. Disable haptics when the user's system has `prefers-reduced-motion` enabled
- R4. Gracefully degrade on unsupported browsers (desktop, Safari) — no errors, no fallback UI

## Success Criteria

- Haptic feedback fires on the three trigger categories on supported mobile browsers
- No visual or functional regressions on desktop or unsupported devices
- No additional UI chrome (no toggle, no indicator)

## Scope Boundaries

- No user-facing haptics toggle — rely on system `prefers-reduced-motion`
- No ambient/scroll-based haptics
- No haptics on general navigation links or section anchors
- No custom haptic patterns — use library presets (`nudge`, `success`, etc.)
- No debug audio mode in production

## Key Decisions

- **Use web-haptics library**: Mature, has React hook, no need to build custom
- **Key moments only**: Three high-impact trigger points to avoid haptic fatigue
- **System preference only**: No custom toggle UI — keeps the portfolio clean

## Outstanding Questions

### Deferred to Planning

- [Affects R1][Needs research] Best way to wire haptics into the existing `use-interaction.ts` hook vs. calling directly in components
- [Affects R2][Technical] Which preset pattern fits each trigger (e.g., `nudge` for menu, `success` for copy)

## Next Steps

→ `/ce:plan` for structured implementation planning
