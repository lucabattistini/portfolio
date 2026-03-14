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
import { createTouchTexture, type TouchTexture } from './touch-texture';
import { fragmentShader, vertexShader } from '@/lib/shaders';
import { getTextureImage } from './texture-image';

type PointsShaders = {
  material: {
    uniforms: Record<string, IUniform>;
    vertexShader: string;
    fragmentShader: string;
  };
  geometry: {
    attributes: Record<string, BufferAttribute | InterleavedBufferAttribute>;
    index: BufferAttribute | null;
  };
};

type UsePointsResult = {
  touchTexture: TouchTexture;
} & (
  | { status: 'loading' }
  | { status: 'ready'; shaders: PointsShaders }
  | { status: 'error'; error: unknown }
);

const pseudoRandom01 = (n: number) => {
  const x = Math.sin(n * 12.9898) * 43758.5453123;
  return x - Math.floor(x);
};

function usePoints(texture: Texture, colorThreshold: number) {
  const touchTexture = useMemo(() => createTouchTexture(), []);

  const result = useMemo<UsePointsResult>(() => {
    if (typeof document === 'undefined') {
      return { status: 'loading', touchTexture };
    }

    const image = getTextureImage(texture);
    if (!image) {
      return { status: 'loading', touchTexture };
    }

    const pixelsCount = image.width * image.height;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
      return { status: 'loading', touchTexture };
    }

    let visiblePixelsCount = 0;

    canvas.width = image.width;
    canvas.height = image.height;
    let pixels: Float32Array;

    try {
      context.scale(1, -1);
      context.drawImage(image, 0, 0, image.width, image.height * -1);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      pixels = Float32Array.from(imageData.data);
    } catch (error) {
      return { status: 'error', touchTexture, error };
    }

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

    const shaders: PointsShaders = {
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

    return { status: 'ready', touchTexture, shaders };
  }, [texture, touchTexture, colorThreshold]);

  return result;
}

export { usePoints };
