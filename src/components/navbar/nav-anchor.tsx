"use client";

import { useIsBeyondFold } from "@/lib/hooks";
import { cn } from "@/lib/styles";
import { computeStuckCoordinates, useCursorActorRef } from "../cursor";

export function NavAnchor() {
  const isBeyondFold = useIsBeyondFold({ multiplier: 1.25 });
  const cursorActor = useCursorActorRef();

  const label = isBeyondFold ? "Back to top" : "Scroll";

  const onPointerEnter = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!isBeyondFold) return;
    cursorActor.send({
      type: "STICK",
      position: computeStuckCoordinates(
        event.currentTarget.getBoundingClientRect(),
      ),
    });
  };

  const onPointerLeave = () => {
    if (!isBeyondFold) return;
    cursorActor.send({ type: "UNSTICK" });
  };

  const onClick = () => {
    if (!isBeyondFold) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed max-w-384 flex items-start justify-between gap-0 w-full h-min p-0 overflow-visible z-20 bottom-8 px-16">
      <div className="relative flex items-center gap-4 w-full h-auto"></div>
      <div className="relative flex justify-between w-1/4">
        <button
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          onClick={onClick}
          aria-live="polite"
          className={cn(
            "text-xl text-primary transition font-sans font-bold select-none",
            {
              "cursor-pointer hover:text-accent": isBeyondFold,
            },
          )}
          type="button"
        >
          {label}
        </button>
      </div>
    </div>
  );
}
