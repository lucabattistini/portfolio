import type { Metadata } from 'next';
import { Particles } from '@/components/particles';
import { ErrorCode } from '@/features/error';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <main className="relative h-screen w-full">
        <Particles picture="/me.png" isBlurred />
        <ErrorCode code="404" message={`This page \nisn't available`} />
      </main>
    </>
  );
}
