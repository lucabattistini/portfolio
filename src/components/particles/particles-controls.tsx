"use client";

import { useParticlesActorRef } from "./store";

export function ParticlesControls() {
  const actorRef = useParticlesActorRef();
  return (
    <button
      onClick={() => actorRef.send({ type: "TOGGLE_EXPLODE" })}
      className="px-4 py-2 bg-primary text-white rounded-lg"
    >
      Trigger Particles
    </button>
  );
}
