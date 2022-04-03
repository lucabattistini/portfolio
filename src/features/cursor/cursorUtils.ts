import { MousePosition } from '../../common/hooks/useMousePosition';

export const computeStuckCoordinates = (rect: DOMRect): MousePosition => {
  return {
    x: Math.round(rect.left + rect.width / 2),
    y: Math.round(rect.top + rect.height / 2),
  };
};
