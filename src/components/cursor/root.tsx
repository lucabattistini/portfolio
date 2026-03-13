'use client';

import { useMobileDetect } from '@/lib/hooks';
import { Cursor } from './cursor';

export function CursorRoot() {
  const isMobile = useMobileDetect();

  if (isMobile) {
    return null;
  }

  return <Cursor />;
}
