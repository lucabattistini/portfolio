import { assign, createMachine } from 'xstate';

export type NavbarContext = {
  isMenuOpen: boolean;
};

export type NavbarEvent = { type: 'TOGGLE_MENU' } | { type: 'CLOSE_MENU' };

export function createNavbarMachine() {
  return createMachine({
    id: 'navbar',
    initial: 'idle',
    context: {
      isMenuOpen: false,
    } satisfies NavbarContext,
    types: {} as {
      context: NavbarContext;
      events: NavbarEvent;
    },
    states: {
      idle: {
        entry: assign({ isMenuOpen: false }),
        on: {
          TOGGLE_MENU: {
            actions: assign({
              isMenuOpen: ({ context }) => !context.isMenuOpen,
            }),
          },
          CLOSE_MENU: {
            actions: assign({ isMenuOpen: false }),
          },
        },
      },
    },
  });
}
