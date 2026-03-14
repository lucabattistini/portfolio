import { Particles } from '@/components/particles';
import { ErrorCode } from '@/features/error';

export default function NotFound() {
  return (
    <>
      <main className="relative h-screen w-full">
        <Particles picture="/me.png" className="blur-lg" />
        <ErrorCode code="404" message="This page isn't available" />
      </main>
    </>
  );
}
