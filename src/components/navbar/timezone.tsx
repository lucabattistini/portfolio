import { useSyncExternalStore } from 'react';

function getTimezone(): string {
  try {
    const parts = new Intl.DateTimeFormat('it-IT', {
      timeZone: 'Europe/Rome',
      timeZoneName: 'shortOffset',
    }).formatToParts(new Date());

    const offset = parts.find((p) => p.type === 'timeZoneName')?.value || 'GMT+1';

    return offset.replace('GMT', 'UTC');
  } catch {
    return 'UTC+1';
  }
}

const noop = () => () => {};

export function Timezone() {
  const timezone = useSyncExternalStore(noop, getTimezone, () => null);

  if (!timezone) return null;

  return <span className="text-primary font-sans text-lg font-bold">({timezone})</span>;
}
