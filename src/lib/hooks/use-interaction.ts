'use client';

import { useCursorActorRef } from '@/components/cursor';
import { useParticlesActorRef } from '@/components/particles';
import { useNavbarActorRef } from '@/components/navbar';
import type { CursorPosition } from '@/components/cursor';

export function useInteraction() {
  const cursorActor = useCursorActorRef();
  const particlesActor = useParticlesActorRef();
  const navbarActor = useNavbarActorRef();

  return {
    hover: () => cursorActor.send({ type: 'HOVER' }),
    unhover: () => cursorActor.send({ type: 'UNHOVER' }),

    stick: (position: CursorPosition) => {
      cursorActor.send({ type: 'STICK', position });
      particlesActor.send({ type: 'EXPLODE' });
    },
    unstick: () => {
      cursorActor.send({ type: 'UNSTICK' });
      particlesActor.send({ type: 'REPAIR' });
    },

    explode: () => particlesActor.send({ type: 'EXPLODE' }),
    repair: () => particlesActor.send({ type: 'REPAIR' }),

    show: () => {
      cursorActor.send({ type: 'SHOW' });
      particlesActor.send({ type: 'SHOW' });
    },
    hide: () => {
      cursorActor.send({ type: 'HIDE' });
      particlesActor.send({ type: 'HIDE' });
    },

    reset: () => {
      cursorActor.send({ type: 'UNHOVER' });
      cursorActor.send({ type: 'UNSTICK' });
      particlesActor.send({ type: 'REPAIR' });
      navbarActor.send({ type: 'CLOSE_MENU' });
    },
  };
}
