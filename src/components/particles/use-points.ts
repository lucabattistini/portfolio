'use client';

import { useMemo } from 'react';
import {
  BufferAttribute,
  InstancedBufferAttribute,
  InterleavedBufferAttribute,
  type IUniform,
  type Texture,
  Vector2,
} from 'three';
import { createPointerTexture, type PointerTextureApi } from './pointer-texture';
import { particlesFragmentShader, particlesVertexShader } from './generated-shaders';
import { getTextureImage } from './texture-image';

type PointsShaders = {
  material?: {
    uniforms: Record<string, IUniform>;
    vertexShader: string;
    fragmentShader: string;
  };
  geometry?: {
    attributes: Record<string, BufferAttribute | InterleavedBufferAttribute>;
    index: BufferAttribute | null;
  };
}

type UsePointsResult = {
  shaders?: PointsShaders;
  pointerTexture: PointerTextureApi;
};

const pseudoRandom01 = (n: number) => {
  const x = Math.sin(n * 12.9898) * 43758.5453123;
  return x - Math.floor(x);
};

function usePoints(texture: Texture, colorThreshold: number) {
  const pointerTexture = useMemo(() => createPointerTexture(), []);

  const shaders = useMemo<PointsShaders | undefined>(() => {
    if (typeof document === 'undefined') return undefined;

    const image = getTextureImage(texture);
    if (!image) return undefined;

    const pixelsCount = image.width * image.height;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) return undefined;

    let visiblePixelsCount = 0;

    canvas.width = image.width;
    canvas.height = image.height;
    context.scale(1, -1);
    context.drawImage(image, 0, 0, image.width, image.height * -1);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = Float32Array.from(imageData.data);

    for (let i = 0; i < pixelsCount; i++) {
      if (pixels[i * 4 + 0] > colorThreshold) {
        visiblePixelsCount++;
      }
    }

    const uniforms: Record<string, IUniform> = {
      uTime: { value: 0.0 },
      uRandom: { value: 1.0 },
      uDepth: { value: 2.0 },
      uSize: { value: 0.0 },
      uTextureSize: { value: new Vector2(image.width, image.height) },
      uTexture: { value: texture },
      uTouch: { value: null },
      uInvert: { value: 0.0 },
    };

    const positions = new BufferAttribute(new Float32Array(4 * 3), 3);
    positions.setXYZ(0, -0.5, 0.5, 0.0);
    positions.setXYZ(1, 0.5, 0.5, 0.0);
    positions.setXYZ(2, -0.5, -0.5, 0.0);
    positions.setXYZ(3, 0.5, -0.5, 0.0);

    const uvs = new BufferAttribute(new Float32Array(4 * 2), 2);
    uvs.setXY(0, 0.0, 0.0);
    uvs.setXY(1, 1.0, 0.0);
    uvs.setXY(2, 0.0, 1.0);
    uvs.setXY(3, 1.0, 1.0);

    const indices = new Uint16Array(visiblePixelsCount);
    const offsets = new Float32Array(visiblePixelsCount * 3);
    const angles = new Float32Array(visiblePixelsCount);

    for (let i = 0, j = 0; i < pixelsCount; i++) {
      if (pixels[i * 4 + 0] <= colorThreshold) {
        continue;
      }

      offsets[j * 3 + 0] = i % image.width;
      offsets[j * 3 + 1] = Math.floor(i / image.width);

      indices[j] = i;
      angles[j] = pseudoRandom01(i) * Math.PI;
      j++;
    }

    const vertexShader = particlesVertexShader();
    const fragmentShader = particlesFragmentShader();

    return {
      material: {
        uniforms,
        vertexShader,
        fragmentShader,
      },
      geometry: {
        attributes: {
          position: positions,
          uv: uvs,
          pindex: new InstancedBufferAttribute(indices, 1, false),
          offset: new InstancedBufferAttribute(offsets, 3, false),
          angle: new InstancedBufferAttribute(angles, 1, false),
        },
        index: new BufferAttribute(new Uint16Array([0, 2, 1, 2, 3, 1]), 1),
      },
    };
  }, [texture, colorThreshold]);

  return useMemo<UsePointsResult>(() => {
    return { shaders, pointerTexture };
  }, [shaders, pointerTexture]);
};

export { usePoints };
