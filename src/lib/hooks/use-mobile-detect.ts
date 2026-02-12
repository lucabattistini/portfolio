import { useSyncExternalStore } from 'react';

const DEFAULT_MAX_WIDTH_PX = 768;

function getMatchMediaSnapshot(query: string): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(query).matches;
}

function subscribeMatchMedia(query: string, onStoreChange: () => void) {
  if (typeof window === 'undefined') return () => {};

  const mql = window.matchMedia(query);

  mql.addEventListener('change', onStoreChange);
  return () => mql.removeEventListener('change', onStoreChange);
}

/**
 * Detects “mobile” based on viewport width (responsive design), not user-agent sniffing.
 *
 * Notes:
 * - SSR-safe: returns `false` on the server.
 * - Reactive: updates when the media query match changes.
 */
export function useMobileDetect(maxWidthPx: number = DEFAULT_MAX_WIDTH_PX) {
  const query = `(max-width: ${maxWidthPx}px)`;

  return useSyncExternalStore(
    (onStoreChange) => subscribeMatchMedia(query, onStoreChange),
    () => getMatchMediaSnapshot(query),
    () => false,
  );
}
