'use client';

import { createElement, type ComponentProps } from 'react';
import { createActorContext } from '@xstate/react';
import type { SnapshotFrom } from 'xstate';
import { createNavbarMachine } from './machine';

type NavbarMachine = ReturnType<typeof createNavbarMachine>;
type NavbarSnapshot = SnapshotFrom<NavbarMachine>;

const navbarMachine = createNavbarMachine();
const NavbarStore = createActorContext(navbarMachine);

export function NavbarProvider(props: ComponentProps<typeof NavbarStore.Provider>) {
  return createElement(NavbarStore.Provider, props);
}

export function useNavbarActorRef() {
  return NavbarStore.useActorRef();
}

export function useNavbarSelector<T>(selector: (snapshot: NavbarSnapshot) => T): T {
  return NavbarStore.useSelector(selector);
}
