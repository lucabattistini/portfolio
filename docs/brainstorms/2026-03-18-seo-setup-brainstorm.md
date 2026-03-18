# Brainstorm: Full SEO Setup

**Date:** 2026-03-18
**Status:** Ready for planning

## What We're Building

A complete SEO setup for the portfolio site at `lucabattistini.dev` using Next.js App Router's built-in Metadata API. Zero external dependencies.

### Deliverables

1. **`src/app/sitemap.ts`** — Dynamic sitemap generation listing the single `/` route with `lastModified` date
2. **`src/app/robots.ts`** — Robots.txt allowing all crawlers, pointing to sitemap URL
3. **`src/app/opengraph-image.tsx`** — Auto-generated OG image using Next.js `ImageResponse` API with name and title. Fonts (Bebas Neue / Space Grotesk) fetched as ArrayBuffers from Google Fonts at build time since `next/font` isn't available in `ImageResponse`.
4. **Enhanced metadata in `src/app/layout.tsx`** — Add:
   - `metadataBase` set to `https://lucabattistini.dev`
   - `openGraph` tags (title, description, type: `website`, url, siteName)
   - `twitter` card tags (card: `summary_large_image`, creator: `@lucabattistini_`)
   - `alternates.canonical` pointing to `https://lucabattistini.dev`
5. **Viewport export in `src/app/layout.tsx`** — Explicit `viewport` export with `themeColor` (match site background)
6. **JSON-LD structured data** — `Person` schema rendered as `<script type="application/ld+json">` in layout, including:
   - `name`, `jobTitle`, `url`
   - `sameAs` array with social profiles:
     - `https://github.com/lucabattistini`
     - `https://linkedin.com/in/lucabattistinidev`
     - `https://x.com/lucabattistini_`

### Explicitly Out of Scope

- PWA manifest / `manifest.json`
- Favicon variants (apple-touch-icon, etc.) — only `favicon.ico` exists currently
- Multi-page sitemap considerations (single-page site)

## Why This Approach

- **Next.js built-in Metadata API** — No external dependencies needed. `sitemap.ts`, `robots.ts`, and `opengraph-image.tsx` are App Router conventions that are type-safe and auto-generated at build time.
- Single-page portfolio means the sitemap is trivial and external tools like `next-sitemap` would be overkill.
- Auto-generated OG image avoids needing a static design asset while still providing rich social sharing previews.

## Key Decisions

| Decision        | Choice                                  | Rationale                                                            |
| --------------- | --------------------------------------- | -------------------------------------------------------------------- |
| Domain          | `lucabattistini.dev`                    | User's production domain                                             |
| Approach        | Next.js built-in Metadata API           | Zero deps, type-safe, convention-based                               |
| OG Image        | Auto-generated via `ImageResponse`      | No design work needed, stays in sync with site content               |
| OG Image fonts  | Fetch from Google Fonts as ArrayBuffers | `next/font` unavailable in `ImageResponse` context                   |
| Structured data | JSON-LD `Person` schema with `sameAs`   | Best practice for personal portfolio SEO + knowledge graph           |
| Social profiles | GitHub, LinkedIn, X                     | Already present in `contacts.tsx` — reuse same URLs                  |
| Scope           | Full SEO setup                          | Sitemap, robots, OG/Twitter, canonical, structured data, theme color |

## Open Questions

None — all decisions resolved.
