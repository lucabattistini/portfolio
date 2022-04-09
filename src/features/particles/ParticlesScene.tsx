import { useCallback, useEffect, useRef, VoidFunctionComponent } from 'react';
import { useTexture } from '@react-three/drei';
import { ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import { Color, InstancedBufferGeometry, Mesh, PerspectiveCamera, RawShaderMaterial } from 'three';
import usePoints from './usePoints';
import { ParticlesProps } from './Particles';
import { animate, useMotionValue } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectParticlesState, showParticles } from './particlesSlice';

export interface ParticleSceneProps extends ParticlesProps {
  scaleCoefficient: number;
}

const ParticlesScene: VoidFunctionComponent<ParticleSceneProps> = ({
  colorThreshold = 34,
  picture,
  scaleCoefficient = 1,
}) => {
  const state = useAppSelector(selectParticlesState);
  const texture = useTexture(picture);
  const meshRef = useRef<Mesh<InstancedBufferGeometry, RawShaderMaterial>>();
  const { shaders, pointerTexture } = usePoints(texture, colorThreshold);
  const uSize = useMotionValue(0.5);
  const uRandom = useMotionValue(1.0);
  const uDepth = useMotionValue(40.0);

  const dispatch = useAppDispatch();

  const handleOnMove = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      if (shaders && e.intersections.length > 0) {
        if (e.intersections[0].uv) {
          pointerTexture.addPoint(e.intersections[0].uv);
        }
      }
    },
    [shaders],
  );

  const scale = useThree((state) => {
    const camera = state.camera as PerspectiveCamera;
    const fovHeight =
      2 * Math.tan((camera.fov * Math.PI) / 180 / 2) * camera.position.z * scaleCoefficient;

    return fovHeight / texture.image.height;
  });

  useEffect(() => {
    if (meshRef.current && shaders && pointerTexture) {
      meshRef.current.material.uniforms.uTouch.value = pointerTexture.texture;
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
    if (shaders && meshRef.current && Object.keys(meshRef.current.material.uniforms).length > 0) {
      meshRef.current.material.uniforms.uSize.value = uSize.get();
      meshRef.current.material.uniforms.uRandom.value = uRandom.get();
      meshRef.current.material.uniforms.uDepth.value = uDepth.get();
      meshRef.current.material.uniforms.uTime.value += clockDelta;

      pointerTexture.update();
    }
  });

  return (
    <>
      <mesh ref={meshRef} scale={[scale, scale, 1]}>
        {shaders && (
          <>
            <rawShaderMaterial
              uniforms={shaders.material?.uniforms}
              vertexShader={shaders.material?.vertexShader}
              fragmentShader={shaders.material?.fragmentShader}
              depthTest={false}
              transparent={true}
              attach="material"
            />
            <instancedBufferGeometry
              attributes={shaders.geometry?.attributes}
              index={shaders.geometry?.index}
              attach="geometry"
            />
          </>
        )}
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
