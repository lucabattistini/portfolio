---
title: 'feat: Full SEO Setup'
type: feat
status: completed
date: 2026-03-18
origin: docs/brainstorms/2026-03-18-seo-setup-brainstorm.md
---

# feat: Full SEO Setup

## Overview

Complete SEO implementation for `lucabattistini.dev` using Next.js App Router's built-in Metadata API. Zero external dependencies. Covers sitemap, robots.txt, Open Graph/Twitter cards with auto-generated OG image, canonical URL, viewport/theme color, JSON-LD structured data, and 404 page metadata.

## Problem Statement / Motivation

The site currently has only a basic `title` and `description` in `layout.tsx`. Missing: `metadataBase`, Open Graph tags, Twitter cards, sitemap, robots.txt, structured data, canonical URL, and viewport export. This means poor search engine indexing, no rich social sharing previews, and no structured data for knowledge graph inclusion.

## Proposed Solution

Use Next.js App Router file conventions (`sitemap.ts`, `robots.ts`, `opengraph-image.tsx`) and the `metadata`/`viewport` exports — all built-in, zero deps (see brainstorm: `docs/brainstorms/2026-03-18-seo-setup-brainstorm.md`).

### Implementation Steps

#### Step 1: Create `src/lib/site.ts` — Site constants

Centralize site metadata to avoid duplication across files:

```ts
// src/lib/site.ts
export const siteConfig = {
  name: 'Luca Battistini',
  title: 'Luca Battistini — Senior Software Engineer',
  description: 'Hands-on software engineering with experience in technical leadership roles.',
  url: 'https://lucabattistini.dev',
  jobTitle: 'Senior Software Engineer',
  socials: {
    github: 'https://github.com/lucabattistini',
    linkedin: 'https://linkedin.com/in/lucabattistinidev',
    x: 'https://x.com/lucabattistini_',
    instagram: 'https://instagram.com/lucabattistini',
    bluesky: 'https://bsky.app/profile/luca-battistini.bsky.social',
  },
  themeColor: '#1b1b1b',
} as const;
```

#### Step 2: Enhance metadata in `src/app/layout.tsx`

Update the existing `metadata` export and add a `viewport` export:

```ts
// src/app/layout.tsx
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    creator: '@lucabattistini_',
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
};
```

#### Step 3: Create `src/app/robots.ts`

```ts
// src/app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://lucabattistini.dev/sitemap.xml',
  };
}
```

#### Step 4: Create `src/app/sitemap.ts`

```ts
// src/app/sitemap.ts
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://lucabattistini.dev',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
```

#### Step 5: Create `src/app/opengraph-image.tsx`

Auto-generated OG image (1200x630) using `ImageResponse` from `next/og`.

- Fonts: fetch Bebas Neue and Space Grotesk `.ttf` files from Google Fonts CDN as `ArrayBuffer` at build time (standard pattern — no local font files needed)
- Layout: `display: 'flex'` only (Satori constraint — no CSS Grid, no Tailwind)
- Export `alt`, `size`, and `contentType` constants
- Fallback: wrap font fetch in try/catch, fall back to system sans-serif on failure
- Design: dark background (`#1b1b1b`), name in Bebas Neue, job title in Space Grotesk, accent color (`#ffff9a`)

```ts
// src/app/opengraph-image.tsx
import { ImageResponse } from 'next/og';

export const alt = 'Luca Battistini — Senior Software Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  // Fetch fonts from Google Fonts CDN
  const [bebasNeue, spaceGrotesk] = await Promise.all([
    fetch('https://fonts.gstatic.com/s/bebasneue/v14/JTUSjIg69CK48gW7PXoo9Wlhyw.ttf')
      .then((res) => res.arrayBuffer())
      .catch(() => null),
    fetch('https://fonts.gstatic.com/s/spacegrotesk/v16/V8mDoQDjQSkFtoMM3T6r8E7mPbF4Cw.ttf')
      .then((res) => res.arrayBuffer())
      .catch(() => null),
  ]);

  return new ImageResponse(
    (
      <div style={{ /* dark bg, flex layout, name + title */ }}>
        {/* Design implementation */}
      </div>
    ),
    {
      ...size,
      fonts: [
        ...(bebasNeue ? [{ name: 'Bebas Neue', data: bebasNeue }] : []),
        ...(spaceGrotesk ? [{ name: 'Space Grotesk', data: spaceGrotesk }] : []),
      ],
    },
  );
}
```

No separate `twitter-image.tsx` — the 1200x630 OG image works well for Twitter's `summary_large_image` card type.

#### Step 6: Add JSON-LD structured data in `src/app/page.tsx`

Place in `page.tsx` (not `layout.tsx`) so it only renders on the homepage, not on the 404 page:

```tsx
// In src/app/page.tsx
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.name,
  jobTitle: siteConfig.jobTitle,
  url: siteConfig.url,
  description: siteConfig.description,
  sameAs: Object.values(siteConfig.socials),
};

// Render as <script type="application/ld+json"> in the component JSX
```

#### Step 7: Add 404 page metadata in `src/app/not-found.tsx`

Prevent crawlers from indexing 404 pages and give them a distinct title:

```ts
// src/app/not-found.tsx
export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: false },
};
```

## Technical Considerations

- **OG image font loading:** Google Fonts CDN URLs can change — the URLs in Step 5 are illustrative; verify actual URLs at implementation time. If they break, the fallback to system fonts ensures the image still renders (degraded but functional, not a 500 error).
- **Satori limitations:** `ImageResponse` only supports `display: 'flex'` layouts with inline styles. No CSS Grid, no Tailwind, limited `position: absolute` support.
- **`metadataBase`:** Required for Next.js to resolve relative OG image URLs to absolute URLs. Without it, social platforms receive relative paths that don't work.
- **Viewport export:** In Next.js 14+, `themeColor` must be in a separate `viewport` export, not inside `metadata`.

## Acceptance Criteria

- [x] `https://lucabattistini.dev/sitemap.xml` returns valid XML with the homepage entry
- [x] `https://lucabattistini.dev/robots.txt` returns valid robots.txt allowing all crawlers and pointing to sitemap
- [x] `https://lucabattistini.dev/opengraph-image` returns a 200 with `content-type: image/png` and a 1200x630 image
- [ ] Sharing `lucabattistini.dev` on Twitter/LinkedIn/Facebook shows a rich card with image, title, and description _(verify post-deploy)_
- [x] `<script type="application/ld+json">` with Person schema is present in the homepage HTML source
- [x] 404 page has `<meta name="robots" content="noindex, nofollow">` and a distinct `<title>`
- [x] Mobile browser address bar uses theme color `#1b1b1b`
- [x] `pnpm build` succeeds with no errors
- [x] `pnpm lint` passes

## Post-Implementation Validation

Verify with these tools after deployment:

- Google Rich Results Test — validate JSON-LD Person schema
- Facebook Sharing Debugger — validate OG tags
- `curl -I https://lucabattistini.dev/opengraph-image` — verify OG image returns 200

## Dependencies & Risks

- **No external dependencies** — all built-in to Next.js 16
- **Risk: Google Fonts CDN URL changes** — mitigated by try/catch fallback to system fonts
- **Risk: Satori rendering quirks** — keep OG image layout simple (flexbox only)

## Sources & References

- **Origin brainstorm:** [docs/brainstorms/2026-03-18-seo-setup-brainstorm.md](docs/brainstorms/2026-03-18-seo-setup-brainstorm.md) — key decisions: Next.js built-in API (zero deps), auto-generated OG image, JSON-LD Person schema with sameAs, domain `lucabattistini.dev`
- Existing metadata: `src/app/layout.tsx:15-18`
- Social links: `src/features/home/sections/contacts.tsx:25-45`
- Theme colors: `src/app/globals.css:4-6` (`--background: #1b1b1b`, `--accent: #ffff9a`)
- Font config: `src/app/layout.tsx:7-16` (Space Grotesk + Bebas Neue via next/font/google)
