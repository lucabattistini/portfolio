"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ParticlesScene } from "./particles-scene";

type ParticlesProps = {
  colorThreshold?: number;
  picture: string;
};

export function Particles({ colorThreshold = 34, picture }: ParticlesProps) {
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 1024px)").matches;

  return (
    <div className="h-screen w-full">
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
            scaleCoefficient={isMobile ? 0.55 : 1}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
