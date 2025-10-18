import { useEffect, useMemo, useState } from 'react';
import {
  BufferAttribute,
  InstancedBufferAttribute,
  InterleavedBufferAttribute,
  IUniform,
  Texture,
  Vector2,
} from 'three';
import PointerTexture from './pointerTexture';
import { Theme } from '../theme/themeSlice';

import vertex from './glsl/shader.vert';
import fragment from './glsl/shader.frag';

export interface PointsShaders {
  material?: {
    uniforms: { [uniform: string]: IUniform };
    vertexShader: string;
    fragmentShader: string;
  };
  geometry?: {
    attributes: {
      [name: string]: BufferAttribute | InterleavedBufferAttribute;
    };
    index: BufferAttribute | null;
  };
}

const usePoints = (texture: Texture, colorThreshold: number, theme: Theme) => {
  const [shaders, setShaders] = useState<PointsShaders>();

  useEffect(() => {
    const pixelsCount = texture.image.width * texture.image.height;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (context !== null) {
      let visiblePixelsCount = 0;

      canvas.width = texture.image.width;
      canvas.height = texture.image.height;
      context.scale(1, -1);
      context.drawImage(texture.image, 0, 0, texture.image.width, texture.image.height * -1);

      const image = context.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = Float32Array.from(image.data);

      for (let i = 0; i < pixelsCount; i++) {
        if (pixels[i * 4 + 0] > colorThreshold) {
          visiblePixelsCount++;
        }
      }
      const uniforms = {
        uTime: {
          value: 0.0,
        },
        uRandom: {
          value: 1.0,
        },
        uDepth: {
          value: 2.0,
        },
        uSize: {
          value: 0.0,
        },
        uTextureSize: {
          value: new Vector2(texture.image.width, texture.image.height),
        },
        uTexture: {
          value: texture,
        },
        uTouch: {
          value: null,
        },
        uInvert: {
          value: theme === 'light' ? 1.0 : 0.0,
        },
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

        offsets[j * 3 + 0] = i % texture.image.width;
        offsets[j * 3 + 1] = Math.floor(i / texture.image.width);

        indices[j] = i;

        angles[j] = Math.random() * Math.PI;

        j++;
      }

      setShaders({
        material: {
          uniforms: uniforms,
          vertexShader: vertex,
          fragmentShader: fragment,
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
      });
    }
  }, [texture, colorThreshold, theme]);

  return useMemo(() => {
    return {
      shaders,
      pointerTexture: new PointerTexture(),
    };
  }, [shaders]);
};

export default usePoints;
