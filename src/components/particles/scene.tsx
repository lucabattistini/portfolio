'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { type ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import {
  Color,
  type InstancedBufferGeometry,
  type Mesh,
  type PerspectiveCamera,
  type RawShaderMaterial,
} from 'three';
import { animate } from 'motion';
import { useMotionValue } from 'motion/react';
import { usePoints } from './use-points';
import { useParticlesActorRef, useParticlesSelector } from './store';
import { getTextureImage } from './texture-image';

export type ParticlesSceneProps = {
  colorThreshold?: number;
  picture: string;
  scaleCoefficient: number;
};

export function ParticlesScene({
  colorThreshold = 34,
  picture,
  scaleCoefficient,
}: ParticlesSceneProps) {
  const actorRef = useParticlesActorRef();
  const { isVisible, isExploded } = useParticlesSelector((s) => s.context);
  const texture = useTexture(picture);
  const image = getTextureImage(texture);
  const meshRef = useRef<Mesh<InstancedBufferGeometry, RawShaderMaterial> | null>(null);
  const points = usePoints(texture, colorThreshold);
  const uSize = useMotionValue(0.5);
  const uRandom = useMotionValue(1.0);
  const uDepth = useMotionValue(40.0);

  const handleOnMove = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      if (points.status === 'ready' && e.intersections.length > 0 && e.intersections[0]?.uv) {
        points.touchTexture.addPoint(e.intersections[0].uv);
      }
    },
    [points],
  );

  const scale = useThree((state) => {
    const camera = state.camera as PerspectiveCamera;
    const fovHeight =
      2 * Math.tan((camera.fov * Math.PI) / 180 / 2) * camera.position.z * scaleCoefficient;

    return image ? fovHeight / image.height : 1;
  });

  useEffect(() => {
    if (meshRef.current && points.status === 'ready') {
      meshRef.current.material.uniforms.uTouch.value = points.touchTexture.texture;
      actorRef.send({ type: 'SHOW' });
    }
  }, [points, actorRef]);

  useEffect(() => {
    const baseDuration = 0.9;

    const uSizeAnimation = animate(uSize.get(), isVisible ? 1.0 : 0.5, {
      duration: baseDuration,
      ease: 'easeOut',
      onUpdate: (latest) => uSize.set(latest),
    });

    const uRandomAnimation = animate(uRandom.get(), 2.0, {
      duration: baseDuration,
      ease: 'easeOut',
      onUpdate: (latest) => uRandom.set(latest),
    });

    const uDepthAnimation = animate(uDepth.get(), isVisible ? 4.0 : 40.0, {
      duration: baseDuration * 1.5,
      ease: 'easeOut',
      onUpdate: (latest) => uDepth.set(latest),
    });

    return () => {
      uSizeAnimation.stop();
      uRandomAnimation.stop();
      uDepthAnimation.stop();
    }
  }, [isVisible, uDepth, uRandom, uSize]);

  useEffect(() => {
    const baseDuration = 0.9;

    const uRandomAnimation = animate(uRandom.get(), isExploded ? 40.0 : 2.0, {
      duration: baseDuration,
      ease: 'easeOut',
      onUpdate: (latest) => uRandom.set(latest),
    });

    const uDepthAnimation = animate(uDepth.get(), isExploded ? 10.0 : 4.0, {
      duration: baseDuration * 1.5,
      ease: 'easeOut',
      onUpdate: (latest) => uDepth.set(latest),
    });

    return () => {
      uRandomAnimation.stop();
      uDepthAnimation.stop();
    };
  }, [isExploded, uDepth, uRandom]);

  useFrame((_, clockDelta) => {
    if (points.status === 'ready' && meshRef.current && meshRef.current.material.uniforms) {
      const uniforms = meshRef.current.material.uniforms;

      uniforms.uSize.value = uSize.get();
      uniforms.uRandom.value = uRandom.get();
      uniforms.uDepth.value = uDepth.get();
      uniforms.uTime.value += clockDelta;

      points.touchTexture.update();
    }
  });

  return (
    <>
      <mesh ref={meshRef} scale={[scale, scale, 1]}>
        {points.status === 'ready' ? (
          <>
            <rawShaderMaterial
              uniforms={points.shaders.material.uniforms}
              vertexShader={points.shaders.material.vertexShader}
              fragmentShader={points.shaders.material.fragmentShader}
              depthTest={false}
              transparent
              attach="material"
            />
            <instancedBufferGeometry
              attributes={points.shaders.geometry.attributes}
              index={points.shaders.geometry.index}
              attach="geometry"
            />
          </>
        ) : null}
      </mesh>

      <mesh scale={[scale, scale, 1]} onPointerMove={handleOnMove}>
        <meshBasicMaterial
          color={new Color(0xffffff)}
          depthTest={false}
          visible={false}
          wireframe={false}
          attach="material"
        />
        {image ? (
          <planeGeometry args={[image.width, image.height, 1, 1]} attach="geometry" />
        ) : null}
      </mesh>
    </>
  );
}
