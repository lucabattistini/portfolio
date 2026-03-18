import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Bebas_Neue } from 'next/font/google';
import { ParticlesProvider } from '@/components/particles';
import { Cursor, CursorProvider } from '@/components/cursor';
import { NavbarProvider } from '@/components/navbar';
import { SmoothScroll } from '@/components/smooth-scroll';
import { RouteResetHandler } from '@/components/route-reset-handler';
import { siteConfig } from '@/lib/site';
import 'lenis/dist/lenis.css';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
});

const bebasNeue = Bebas_Neue({
  variable: '--font-bebas-neue',
  subsets: ['latin'],
  weight: '400',
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${bebasNeue.variable} antialiased`}>
        <SmoothScroll>
          <CursorProvider>
            <ParticlesProvider>
              <NavbarProvider>
                <RouteResetHandler />
                <Cursor />
                {children}
              </NavbarProvider>
            </ParticlesProvider>
          </CursorProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
