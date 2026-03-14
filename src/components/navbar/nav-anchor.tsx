'use client';

import * as motion from 'motion/react-client';
import { type Variants } from 'motion/react';
import { useIsBeyondFold } from '@/lib/hooks';
import { cn } from '@/lib/styles';
import { useCursorActorRef } from '../cursor';

const animation: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delay: 0.6,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function NavAnchor() {
  const isBeyondFold = useIsBeyondFold({ multiplier: 1.25 });
  const cursorActor = useCursorActorRef();

  const label = isBeyondFold ? 'Back to top' : 'Scroll';

  const onPointerEnter = () => {
    if (!isBeyondFold) return;
    cursorActor.send({
      type: 'HOVER',
    });
  };

  const onPointerLeave = () => {
    if (!isBeyondFold) return;
    cursorActor.send({ type: 'UNHOVER' });
  };

  const onClick = () => {
    if (!isBeyondFold) return;
    cursorActor.send({ type: 'UNHOVER' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      variants={animation}
      initial="hidden"
      animate="show"
      className="fixed bottom-8 z-20 flex h-min w-full max-w-384 items-start justify-between gap-0 overflow-visible p-0 px-16"
    >
      <div className="relative flex h-auto w-[67%] items-center gap-4"></div>
      <div className="relative flex w-1/4 justify-between">
        <button
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          onClick={onClick}
          aria-live="polite"
          className={cn('text-primary font-sans text-xl font-bold transition select-none', {
            'hover:text-accent cursor-pointer': isBeyondFold,
          })}
          type="button"
        >
          {label}
        </button>
      </div>
    </motion.div>
  );
}
