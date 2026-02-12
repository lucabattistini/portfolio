import { Particles } from '@/components/particles';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <main className="relative h-screen w-full">
        <Particles picture="/me.png" className="blur-lg" />
        <div className="relative flex h-screen w-full flex-col items-center justify-center gap-12 text-center">
          <div className="z-1 flex flex-col items-center justify-center gap-4">
            <h1 className="text-primary font-sans text-8xl font-bold">404</h1>

            <h2 className="text-accent font-sans text-4xl font-semibold">
              This page isn&apos;t available
            </h2>
          </div>

          <div className="flex justify-end">
            <Link
              href="/"
              className="text-primary hover:text-accent font-sans text-lg font-bold transition"
            >
              Go to the Home Page
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
