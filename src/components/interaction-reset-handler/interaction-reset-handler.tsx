'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useInteraction } from '@/lib/hooks';

export function InteractionResetHandler() {
  const pathname = usePathname();
  const prevPathnameRef = useRef<string | null>(null);
  const { reset } = useInteraction();

  useEffect(() => {
    if (prevPathnameRef.current !== null && prevPathnameRef.current !== pathname) {
      reset();
    }
    prevPathnameRef.current = pathname;
  }, [pathname, reset]);

  return null;
}
