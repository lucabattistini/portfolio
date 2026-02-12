'use client';

import { useIsBeyondFold } from '@/lib/hooks';
import { cn } from '@/lib/styles';
import { computeStuckCoordinates, useCursorActorRef } from '../cursor';

export function NavAnchor() {
  const isBeyondFold = useIsBeyondFold({ multiplier: 1.25 });
  const cursorActor = useCursorActorRef();

  const label = isBeyondFold ? 'Back to top' : 'Scroll';

  const onPointerEnter = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!isBeyondFold) return;
    cursorActor.send({
      type: 'STICK',
      position: computeStuckCoordinates(event.currentTarget.getBoundingClientRect()),
    });
  };

  const onPointerLeave = () => {
    if (!isBeyondFold) return;
    cursorActor.send({ type: 'UNSTICK' });
  };

  const onClick = () => {
    if (!isBeyondFold) return;
    cursorActor.send({ type: 'UNSTICK' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-8 z-20 flex h-min w-full max-w-384 items-start justify-between gap-0 overflow-visible p-0 px-16">
      <div className="relative flex h-auto w-full items-center gap-4"></div>
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
    </div>
  );
}
