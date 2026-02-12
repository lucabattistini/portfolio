'use client';

import { useEffect, useRef, useState } from 'react';

export type MousePosition = {
  x: number;
  y: number;
};

export function useMouse(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: -95, y: -95 });

  const latestPositionRef = useRef<MousePosition>(position);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMousemove = (event: MouseEvent) => {
      latestPositionRef.current = { x: event.clientX, y: event.clientY };

      if (frameRef.current !== null) return;

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        setPosition(latestPositionRef.current);
      });
    };

    window.addEventListener('mousemove', handleMousemove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMousemove);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, []);

  return position;
}
