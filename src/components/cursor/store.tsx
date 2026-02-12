"use client";

import { createElement, type ComponentProps } from "react";
import { createActorContext } from "@xstate/react";
import type { SnapshotFrom } from "xstate";
import { createCursorMachine } from "./machine";

type CursorMachine = ReturnType<typeof createCursorMachine>;
export type CursorSnapshot = SnapshotFrom<CursorMachine>;

const cursorMachine = createCursorMachine();
const CursorStore = createActorContext(cursorMachine);

export function CursorProvider(props: ComponentProps<typeof CursorStore.Provider>) {
  return createElement(CursorStore.Provider, props);
}

export function useCursorActorRef() {
  return CursorStore.useActorRef();
}

export function useCursorSelector<T>(selector: (snapshot: CursorSnapshot) => T): T {
  return CursorStore.useSelector(selector);
}
