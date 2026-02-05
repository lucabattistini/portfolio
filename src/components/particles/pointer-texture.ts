import {
  ClampToEdgeWrapping,
  DataTexture,
  LinearFilter,
  RGBAFormat,
  Vector2,
} from 'three';

type Trail = {
  x: number;
  y: number;
  age: number;
  force: number;
};

const easeOutSine = (t: number) => {
  return Math.sin((t * Math.PI) / 2);
};

export type PointerTextureApi = {
  texture: DataTexture;
  addPoint: (point: Vector2) => void;
  update: () => void;
};

export function createPointerTexture(): PointerTextureApi {
  const size = 64;
  // Match the original implementation defaults.
  const maxAge = 120;
  const radiusNorm = 0.15;
  const trail: Trail[] = [];

  const data = new Uint8Array(size * size * 4);
  const texture = new DataTexture(data, size, size, RGBAFormat);
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  texture.wrapS = ClampToEdgeWrapping;
  texture.wrapT = ClampToEdgeWrapping;
  texture.needsUpdate = true;

  const clear = () => {
    data.fill(0);
  };

  const draw = (t: Trail) => {
    const px = t.x * size;
    const py = (1 - t.y) * size;

    let intensity = 1;
    if (t.age < maxAge * 0.3) {
      intensity = easeOutSine(t.age / (maxAge * 0.3));
    } else {
      intensity = easeOutSine(1 - (t.age - maxAge * 0.3) / (maxAge * 0.7));
    }

    intensity *= t.force;

    const radius = size * radiusNorm * intensity;
    if (radius <= 0.5) return;

    // Match the original canvas radial gradient:
    // createRadialGradient(pos, radius*0.25, pos, radius)
    const innerRadius = radius * 0.25;

    const minX = Math.max(0, Math.floor(px - radius));
    const maxX = Math.min(size - 1, Math.ceil(px + radius));
    const minY = Math.max(0, Math.floor(py - radius));
    const maxY = Math.min(size - 1, Math.ceil(py + radius));

    // Slightly lower than the original (0.2) to better match perceived intensity
    // with our DataTexture + filtering pipeline.
    const base = 0.15 * 255;

    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        const dx = x + 0.5 - px;
        const dy = y + 0.5 - py;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d > radius) continue;

        let v = base;
        if (d > innerRadius) {
          const t01 = 1 - (d - innerRadius) / (radius - innerRadius);
          v = base * Math.max(0, t01);
        }

        const i = (y * size + x) * 4;

        // Canvas-like alpha compositing (source-over) against black:
        // dst = src*a + dst*(1-a), where src=1.0 (white).
        // Here `v` is already 255*a.
        const prev = data[i] ?? 0;
        const a = v / 255;
        const next = Math.min(255, Math.round(prev + (255 - prev) * a));

        data[i] = next;
        data[i + 1] = next;
        data[i + 2] = next;
        data[i + 3] = 255;
      }
    }
  };

  const addPoint = (point: Vector2) => {
    let force = 0;
    const last = trail[trail.length - 1];

    if (last) {
      const dx = last.x - point.x;
      const dy = last.y - point.y;
      const dd = dx * dx + dy * dy;

      // Same force mapping as the original TouchTexture.
      force = Math.min(dd * 10000, 1);
    }

    trail.push({ x: point.x, y: point.y, age: 0, force });
  };

  const update = () => {
    clear();

    for (let i = trail.length - 1; i >= 0; i--) {
      trail[i]!.age += 1;
      if (trail[i]!.age > maxAge) {
        trail.splice(i, 1);
      }
    }

    trail.forEach(draw);
    texture.needsUpdate = true;
  };

  return { texture, addPoint, update };
}
