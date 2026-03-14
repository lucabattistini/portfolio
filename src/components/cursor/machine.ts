import { assign, createMachine } from 'xstate';

export type CursorPosition = {
  x: number;
  y: number;
};

export type CursorContext = {
  isHovered: boolean;
  isVisible: boolean;
  isStuck: boolean;
  position: CursorPosition;
  speed: number;
};

export type CursorEvent =
  | { type: 'SHOW' }
  | { type: 'HIDE' }
  | { type: 'SET_POSITION'; position: CursorPosition }
  | { type: 'SET_SPEED'; speed: number }
  | { type: 'HOVER' }
  | { type: 'UNHOVER' }
  | { type: 'STICK'; position: CursorPosition }
  | { type: 'UNSTICK' };

export function createCursorMachine() {
  return createMachine({
    id: 'cursor',
    initial: 'hidden',
    context: {
      isHovered: false,
      isStuck: false,
      isVisible: false,
      position: { x: -80, y: -80 },
      speed: 0,
    } satisfies CursorContext,
    types: {} as {
      context: CursorContext;
      events: CursorEvent;
    },
    states: {
      hidden: {
        entry: assign({ isVisible: false }),
        on: {
          SHOW: { target: 'visible' },
          SET_SPEED: { actions: assign({ speed: ({ event }) => event.speed }) },
          SET_POSITION: {
            actions: assign({ position: ({ event }) => event.position }),
          },
        },
      },
      visible: {
        entry: assign({ isVisible: true }),
        on: {
          HIDE: { target: 'hidden' },
          SET_SPEED: { actions: assign({ speed: ({ event }) => event.speed }) },
          SET_POSITION: {
            actions: assign({ position: ({ event }) => event.position }),
          },
          HOVER: { actions: assign({ isHovered: true }) },
          UNHOVER: { actions: assign({ isHovered: false }) },
          STICK: {
            actions: assign({
              isStuck: true,
              position: ({ event }) => event.position,
            }),
          },
          UNSTICK: { actions: assign({ isStuck: false }) },
        },
      },
    },
  });
}
