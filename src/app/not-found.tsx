import { Particles } from "@/components/particles";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <main className="relative w-full h-screen">
        <Particles picture="/me.png" className="blur-lg" />
        <div className="relative flex flex-col items-center justify-center w-full h-screen gap-12 text-center">
          <div className="flex flex-col items-center justify-center gap-4 z-1">
            <h1 className="font-sans text-8xl font-bold text-primary">404</h1>

            <h2 className="font-sans text-4xl font-semibold text-accent">
              This page isn&apos;t available
            </h2>
          </div>

          <div className="flex justify-end">
            <Link
              href="/"
              className="text-lg font-bold  font-sans text-primary hover:text-accent transition"
            >
              Go to the Home Page
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
