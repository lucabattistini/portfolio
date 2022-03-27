import { useState, useEffect } from 'react';

export interface MousePosition {
  x: number;
  y: number;
}

const useMousePosition = (): MousePosition => {
  const [position, setPosition] = useState<MousePosition>({ x: -95, y: -95 });

  const handleMousemove = (event: MouseEvent) => {
    setPosition({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMousemove);

    return () => {
      window.removeEventListener('mousemove', handleMousemove);
    };
  }, []);

  return position;
};

export default useMousePosition;
