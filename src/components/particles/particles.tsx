'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { useReducedMotion, useScroll } from 'motion/react';
import { ParticlesScene } from './scene';
import { cn } from '@/lib/styles';
import { useMobileDetect } from '@/lib/hooks';

type ParticlesProps = {
  colorThreshold?: number;
  picture: string;
  className?: string;
};

export function Particles({ colorThreshold = 34, picture, className }: ParticlesProps) {
  const isMobile = useMobileDetect();
  const shouldReduceMotion = useReducedMotion();
  const parallaxEnabled = !isMobile && !shouldReduceMotion;

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sentinelRef,
    offset: ['start start', 'end start'],
  });

  const pan = parallaxEnabled
    ? {
        progress: scrollYProgress,
        fraction: 0.28,
      }
    : undefined;

  return (
    <>
      <div
        ref={sentinelRef}
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 h-screen w-px"
      />

      <figure className={cn('fixed top-0 left-0 h-full w-full', className)}>
        <Canvas
          camera={{
            fov: 50,
            near: 1,
            far: 10000,
            position: [0, 0, 300],
          }}
          gl={{ antialias: true, alpha: true }}
          className="cursor-auto"
        >
          <Suspense fallback={null}>
            <ParticlesScene
              colorThreshold={colorThreshold}
              picture={picture}
              scaleCoefficient={1}
              pan={pan}
            />
          </Suspense>
        </Canvas>
      </figure>
    </>
  );
}
