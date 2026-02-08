import {
  Texture,
  Vector2,
} from "three";

function easeOutSine(
  elapsed: number,
  initialValue: number,
  amountOfChange: number,
  duration: number,
) {
  return (
    amountOfChange * Math.sin((elapsed / duration) * (Math.PI / 2)) +
    initialValue
  );
}

type Trail = {
  x: number;
  y: number;
  age: number;
  force: number;
};

export type TouchTexture = {
  texture: Texture;
  addPoint: (point: Vector2) => void;
  update: () => void;
};

export function createTouchTexture(): TouchTexture {
  const size = 64;
  const maxAge = 120;
  const radius = 0.15;
  const trail: Trail[] = [];

  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const context = canvas.getContext("2d");

  if (context !== null) {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  const texture = new Texture(canvas);

  canvas.id = "pointerTexture";
  canvas.style.width = canvas.style.height = `${canvas.width}px`;

  const clear = () => {
    context!.fillStyle = "black";
    context!.fillRect(0, 0, canvas.width, canvas.height);
  };

  const draw = (trail: Trail) => {
    const pos = {
      x: trail.x * size,
      y: (1 - trail.y) * size,
    };

    let intensity = 1;
    if (trail.age < maxAge * 0.3) {
      intensity = easeOutSine(trail.age / (maxAge * 0.3), 0, 1, 1);
    } else {
      intensity = easeOutSine(1 - (trail.age - maxAge * 0.3) / (maxAge * 0.7), 0, 1, 1);
    }

    intensity *= trail.force;

    if (context !== null) {
      const normalizedRadius = size * radius * intensity;
      const gradient = context.createRadialGradient(
        pos.x,
        pos.y,
        normalizedRadius * 0.25,
        pos.x,
        pos.y,
        normalizedRadius,
      );
      gradient.addColorStop(0, `rgba(255, 255, 255, 0.2)`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.0)');
      context.beginPath();
      context.fillStyle = gradient;
      context.arc(pos.x, pos.y, normalizedRadius, 0, Math.PI * 2);
      context.fill();
    }
  
  };

  const addPoint = (point: Vector2) => {
    let force = 0;
    const last = trail[trail.length - 1];

    if (last) {
      const dx = last.x - point.x;
      const dy = last.y - point.y;
      const dd = dx * dx + dy * dy;
      force = Math.min(dd * 10000, 1);
    }
    trail.push({ x: point.x, y: point.y, age: 0, force });
  };

  const update = () => {
    clear();

    trail.forEach((point, i) => {
      point.age++;

      if (point.age > maxAge) {
        trail.splice(i, 1);
      }
    });

    trail.forEach((point) => {
      draw(point);
    });

    texture.needsUpdate = true;
  };

  return { texture, addPoint, update };
}
