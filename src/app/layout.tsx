import type { Metadata } from "next";
import { Roboto_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ParticlesProvider } from "@/components/particles/particles-store";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "luca battistini — senior software engineer",
  description: "hands-on software engineering with experience in technical leadership roles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${robotoMono.variable} antialiased`}
      >
        <ParticlesProvider>
          {children}
        </ParticlesProvider>
      </body>
    </html>
  );
}
