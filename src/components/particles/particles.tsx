"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ParticlesScene } from "./scene";
import { cn } from "@/lib/styles";

type ParticlesProps = {
  colorThreshold?: number;
  picture: string;
  className?: string;
};

export function Particles({
  colorThreshold = 34,
  picture,
  className,
}: ParticlesProps) {
  return (
    <figure className={cn("fixed h-full w-full left-0 top-0", className)}>
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
          />
        </Suspense>
      </Canvas>
    </figure>
  );
}
