import { assign, createMachine } from 'xstate';

export type ParticlesContext = {
  isVisible: boolean;
  isExploded: boolean;
};

export type ParticlesEvent =
  | { type: 'SHOW' }
  | { type: 'HIDE' }
  | { type: 'EXPLODE' }
  | { type: 'REPAIR' };

export function createParticlesMachine() {
  return createMachine({
    id: 'particles',
    initial: 'hidden',
    context: {
      isVisible: false,
      isExploded: false,
    } satisfies ParticlesContext,
    types: {} as {
      context: ParticlesContext;
      events: ParticlesEvent;
    },
    states: {
      hidden: {
        entry: assign({ isVisible: false }),
        on: {
          SHOW: { target: 'visible' },
        },
      },
      visible: {
        entry: assign({ isVisible: true }),
        on: {
          HIDE: { target: 'hidden' },
          EXPLODE: { actions: assign({ isExploded: true }) },
          REPAIR: { actions: assign({ isExploded: false }) },
        },
      },
    },
  });
}
