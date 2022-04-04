import { Texture, Vector2 } from 'three';
import { easeOutSine } from '../../lib/utils';

export interface Trail {
  x: number;
  y: number;
  age: number;
  force: number;
}

export default class PointerTexture {
  public texture: Texture;

  private size: number;

  private maxAge: number;

  private radius: number;

  private trail: Trail[];

  private canvas: HTMLCanvasElement;

  private context: CanvasRenderingContext2D | null;

  public constructor() {
    this.size = 64;
    this.maxAge = 120;
    this.radius = 0.15;
    this.trail = [];

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.canvas.height = this.size;
    this.context = this.canvas.getContext('2d');

    if (this.context !== null) {
      this.context.fillStyle = 'black';
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    this.texture = new Texture(this.canvas);

    this.canvas.id = 'pointerTexture';
    this.canvas.style.width = this.canvas.style.height = `${this.canvas.width}px`;
  }

  public addPoint(point: Vector2) {
    let force = 0;
    const last = this.trail[this.trail.length - 1];

    if (last) {
      const dx = last.x - point.x;
      const dy = last.y - point.y;
      const dd = dx * dx + dy * dy;
      force = Math.min(dd * 10000, 1);
    }
    this.trail.push({ x: point.x, y: point.y, age: 0, force });
  }

  public update() {
    this.clear();

    this.trail.forEach((point, i) => {
      point.age++;

      if (point.age > this.maxAge) {
        this.trail.splice(i, 1);
      }
    });

    this.trail.forEach((point) => {
      this.draw(point);
    });

    this.texture.needsUpdate = true;
  }

  private clear() {
    this.context!.fillStyle = 'black';
    this.context!.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private draw(trail: Trail) {
    const pos = {
      x: trail.x * this.size,
      y: (1 - trail.y) * this.size,
    };

    let intensity = 1;
    if (trail.age < this.maxAge * 0.3) {
      intensity = easeOutSine(trail.age / (this.maxAge * 0.3), 0, 1, 1);
    } else {
      intensity = easeOutSine(1 - (trail.age - this.maxAge * 0.3) / (this.maxAge * 0.7), 0, 1, 1);
    }

    intensity *= trail.force;

    if (this.context !== null) {
      const radius = this.size * this.radius * intensity;
      const gradient = this.context.createRadialGradient(
        pos.x,
        pos.y,
        radius * 0.25,
        pos.x,
        pos.y,
        radius,
      );
      gradient.addColorStop(0, `rgba(255, 255, 255, 0.2)`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.0)');
      this.context.beginPath();
      this.context.fillStyle = gradient;
      this.context.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
      this.context.fill();
    }
  }
}
