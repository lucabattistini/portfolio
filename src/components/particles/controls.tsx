'use client';

import { useParticlesActorRef } from './store';

export function ParticlesControls() {
  const actorRef = useParticlesActorRef();
  return (
    <button
      onClick={() => actorRef.send({ type: 'TOGGLE_EXPLODE' })}
      className="bg-primary rounded-lg px-4 py-2 text-white"
    >
      Trigger Particles
    </button>
  );
}
