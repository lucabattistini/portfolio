import type { Metadata } from "next";
import { Space_Grotesk,  Bebas_Neue } from "next/font/google";
import { ParticlesProvider } from "@/components/particles";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400"
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
        className={`${spaceGrotesk.variable} ${bebasNeue.variable} antialiased`}
      >
        <ParticlesProvider>
          {children}
        </ParticlesProvider>
      </body>
    </html>
  );
}
