'use client';

import { useWebHaptics } from 'web-haptics/react';
import { useReducedMotion } from 'motion/react';
import { useRef, useCallback } from 'react';

const COOLDOWN_MS = 200;

export function useHaptics() {
  const { trigger, cancel, isSupported } = useWebHaptics({
    debug: process.env.NODE_ENV === 'development',
  });
  const reducedMotion = useReducedMotion();
  const lastTriggerRef = useRef(0);

  const throttledTrigger = useCallback(
    (preset?: string) => {
      if (reducedMotion || !isSupported) return;
      const now = Date.now();
      if (now - lastTriggerRef.current < COOLDOWN_MS) return;
      lastTriggerRef.current = now;
      trigger(preset);
    },
    [trigger, reducedMotion, isSupported],
  );

  return { trigger: throttledTrigger, cancel, isSupported };
}
