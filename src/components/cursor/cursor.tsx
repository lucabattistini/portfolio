'use client';

import * as motion from 'motion/react-client';
import { useEffect } from 'react';
import { cn } from '@/lib/styles';
import { useMouse } from '@/lib/hooks';
import { useCursorActorRef, useCursorSelector } from './store';

export function Cursor() {
  const actorRef = useCursorActorRef();
  const mousePosition = useMouse();

  const { isVisible, isHovered, position, speed } = useCursorSelector((s) => s.context);

  useEffect(() => {
    actorRef.send({ type: 'SHOW' });
    const timer = setTimeout(() => {
      actorRef.send({ type: 'SET_SPEED', speed: 0.2 });
    }, 100);

    return () => clearTimeout(timer);
  }, [actorRef]);

  useEffect(() => {
    actorRef.send({ type: 'SET_POSITION', position: mousePosition });
  }, [actorRef, mousePosition]);

  return (
    <>
      <motion.div
        className={cn(
          'fixed',
          'left-0',
          'top-0',
          'z-50',
          'flex',
          'h-16',
          'w-16',
          '-translate-x-1/2',
          '-translate-y-1/2',
          'origin-center',
          'items-center',
          'justify-center',
          'overflow-visible',
          'rounded-full',
          'pointer-events-none',
          'border-2',
          'border-primary',
          isHovered ? 'border-accent bg-accent/60' : 'bg-transparent',
        )}
        initial={{ opacity: 0 }}
        animate={{
          opacity: isVisible ? (isHovered ? 0.6 : 0.2) : 0,
          x: position.x,
          y: position.y,
        }}
        transition={{ ease: [0.22, 1, 0.36, 1], duration: speed }}
        aria-hidden
      />

      <motion.div
        className={cn(
          'fixed',
          'left-0',
          'top-0',
          'z-50',
          'h-2',
          'w-2',
          '-translate-x-1/2',
          '-translate-y-1/2',
          'rounded-full',
          'bg-accent',
          'pointer-events-none',
        )}
        initial={{ opacity: 0 }}
        animate={{
          opacity: isVisible && !isHovered ? 1 : 0,
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ duration: 0 }}
        aria-hidden
      />
    </>
  );
}
