"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

function getViewportHeight(): number {
  return window.visualViewport?.height ?? window.innerHeight;
}

type Config = { 
    multiplier?: number;
}

/**
 * Returns true when the user scrolls past `multiplier * viewportHeight`.
 *
 * - `multiplier = 1` means 100vh
 * - `multiplier = 1.5` means 150vh
 */
export function useIsBeyondFold({
  multiplier = 1
}: Config) {
  const { scrollY } = useScroll();
  const [pastViewport, setPastViewport] = useState(false);

  const normalizedMultiplier =
    Number.isFinite(multiplier) && multiplier > 0 ? multiplier : 1;

  useMotionValueEvent(scrollY, "change", (current) => {
    const threshold = getViewportHeight() * normalizedMultiplier;
    setPastViewport(current > threshold);
  });

  return pastViewport;
}
