import type { Metadata } from 'next';
import { Space_Grotesk, Bebas_Neue } from 'next/font/google';
import { ParticlesProvider } from '@/components/particles';
import { Cursor, CursorProvider } from '@/components/cursor';
import { NavbarProvider } from '@/components/navbar';
import { SmoothScroll } from '@/components/smooth-scroll';
import { RouteResetHandler } from '@/components/route-reset-handler';
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
  title: 'Luca Battistini — Senior Software Engineer',
  description: 'Hands-on software engineering with experience in technical leadership roles.',
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
