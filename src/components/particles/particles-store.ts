'use client';

import { createElement, type ComponentProps } from 'react';
import { createActorContext } from '@xstate/react';
import type { SnapshotFrom } from 'xstate';
import { createParticlesMachine } from './particles-machine';

type ParticlesMachine = ReturnType<typeof createParticlesMachine>;
type ParticlesSnapshot = SnapshotFrom<ParticlesMachine>;

const particlesMachine = createParticlesMachine();
const ParticlesStore = createActorContext(particlesMachine);

export function ParticlesProvider(props: ComponentProps<typeof ParticlesStore.Provider>) {
	return createElement(ParticlesStore.Provider, props);
}

export function useParticlesActorRef() {
	return ParticlesStore.useActorRef();
}

export function useParticlesSelector<T>(selector: (snapshot: ParticlesSnapshot) => T): T {
	return ParticlesStore.useSelector(selector);
}
