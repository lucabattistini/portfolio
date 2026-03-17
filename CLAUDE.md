# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `pnpm dev` (Next.js with Turbopack)
- **Build:** `pnpm build`
- **Lint:** `pnpm lint` (runs ESLint + TypeScript type-check via `tsc --noEmit`)
- **Format:** `pnpm format` (Prettier with tailwindcss plugin)

No test framework is configured.

## Architecture

This is a **Next.js 16 App Router** single-page portfolio site deployed to **Vercel** via GitHub Actions (preview on PRs, production on main).

### Key tech choices

- **Tailwind CSS v4** via `@tailwindcss/postcss` — use `cn()` from `@/lib/styles` (clsx + tailwind-merge) for conditional classes
- **XState v5 + @xstate/react** for component-level state machines — each stateful component follows the pattern: `machine.ts` (state machine definition), `store.ts` (React context via `createActorContext`), plus UI components
- **React Three Fiber + drei** for the interactive 3D particle background
- **Motion** (Framer Motion v12) for animations
- **GLSL shaders** loaded via `raw-loader` + `glslify-loader` (Turbopack config in `next.config.ts`), with type declarations in `types/glsl.d.ts`
- **SVGs** imported as React components via `@svgr/webpack`, with type declarations in `types/svg.d.ts`

### Path aliases

- `@/*` → `./src/*`
- `@public/*` → `./public/*`

### Source layout

- `src/app/` — Next.js App Router (layout, page, not-found)
- `src/features/` — page-level feature modules (home sections, error)
- `src/components/` — shared interactive components (cursor, navbar, particles, section), each with barrel `index.ts` exports
- `src/lib/` — utilities (hooks, styles/cn, shaders, split-text)

### Global providers (in layout.tsx)

`CursorProvider` → `ParticlesProvider` → `NavbarProvider` — all wrap the app and expose state via XState actor context hooks.

### Fonts

Space Grotesk (body) and Bebas Neue (display), loaded via `next/font/google` as CSS variables.
