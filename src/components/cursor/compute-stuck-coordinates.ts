import type { CursorPosition } from "./cursor-machine";

export function computeStuckCoordinates(rect: DOMRect): CursorPosition {
  return {
    x: Math.round(rect.left + rect.width / 2),
    y: Math.round(rect.top + rect.height / 2),
  };
}
