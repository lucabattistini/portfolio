import { useCallback, useEffect, VoidFunctionComponent } from 'react';
import { useTexture } from '@react-three/drei';
import { ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import { Color, PerspectiveCamera } from 'three';
import usePoints from './usePoints';
import { ParticlesProps } from './Particles';
import { animate, useMotionValue } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectParticlesState, showParticles } from './particlesSlice';

const ParticlesScene: VoidFunctionComponent<ParticlesProps> = ({
  colorThreshold = 34,
  picture,
}) => {
  const state = useAppSelector(selectParticlesState);

  const texture = useTexture(picture);

  const scale = useThree((state) => {
    const camera = state.camera as PerspectiveCamera;
    const fovHeight = 2 * Math.tan((camera.fov * Math.PI) / 180 / 2) * camera.position.z;

    return fovHeight / texture.image.height;
  });

  const { pointsMaterialRef, pointsGeometryRef, pointerTexture } = usePoints(
    texture,
    colorThreshold,
  );

  const uSize = useMotionValue(0.5);

  const uRandom = useMotionValue(1.0);

  const uDepth = useMotionValue(40.0);

  const dispatch = useAppDispatch();

  const handleOnMove = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      if (pointerTexture && e.intersections.length > 0) {
        if (e.intersections[0].uv) {
          pointerTexture.addPoint(e.intersections[0].uv);
        }
      }
    },
    [pointerTexture],
  );

  useEffect(() => {
    if (pointsMaterialRef.current && pointerTexture) {
      pointsMaterialRef.current.uniforms.uTouch.value = pointerTexture.texture;
    }

    dispatch(showParticles());
  }, [pointerTexture]);

  useEffect(() => {
    const baseDuration = 0.9;

    const uSizeAnimation = animate(uSize.get(), state.isVisible ? 1.0 : 0.5, {
      duration: baseDuration,
      ease: 'easeOut',
      onUpdate: (latest) => uSize.set(latest),
    });

    const uRandomAnimation = animate(uRandom.get(), 2.0, {
      duration: baseDuration,
      ease: 'easeOut',
      onUpdate: (latest) => uRandom.set(latest),
    });

    const uDepthAnimation = animate(uDepth.get(), state.isVisible ? 4.0 : 40.0, {
      duration: baseDuration * 1.5,
      ease: 'easeOut',
      onUpdate: (latest) => uDepth.set(latest),
    });

    return () => {
      uSizeAnimation.stop();
      uRandomAnimation.stop();
      uDepthAnimation.stop();
    };
  }, [state.isVisible]);

  useEffect(() => {
    const baseDuration = 0.9;

    const uRandomAnimation = animate(uRandom.get(), state.isExploded ? 40.0 : 2.0, {
      duration: baseDuration,
      ease: 'easeOut',
      onUpdate: (latest) => uRandom.set(latest),
    });

    const uDepthAnimation = animate(uDepth.get(), state.isExploded ? 10.0 : 4.0, {
      duration: baseDuration * 1.5,
      ease: 'easeOut',
      onUpdate: (latest) => uDepth.set(latest),
    });

    return () => {
      uRandomAnimation.stop();
      uDepthAnimation.stop();
    };
  }, [state.isExploded]);

  useFrame((threeState, clockDelta) => {
    if (pointsMaterialRef.current) {
      pointsMaterialRef.current.uniforms.uSize.value = uSize.get();
      pointsMaterialRef.current.uniforms.uRandom.value = uRandom.get();
      pointsMaterialRef.current.uniforms.uDepth.value = uDepth.get();
      pointsMaterialRef.current.uniforms.uTime.value += clockDelta;

      pointerTexture.update();
    }
  });

  return (
    <>
      <mesh scale={[scale, scale, 1]}>
        <rawShaderMaterial ref={pointsMaterialRef} attach="material" />
        <instancedBufferGeometry ref={pointsGeometryRef} attach="geometry" />
      </mesh>
      <mesh scale={[scale, scale, 1]} onPointerMove={(e) => handleOnMove(e)}>
        <meshBasicMaterial
          color={new Color(0xffffff)}
          depthTest={false}
          visible={false}
          wireframe={false}
          attach="material"
        />
        <planeGeometry args={[texture.image.width, texture.image.height, 1, 1]} attach="geometry" />
      </mesh>
    </>
  );
};

export default ParticlesScene;
