import { useEffect, useState } from 'react';

const getInitialState = (query: string, defaultState?: boolean) => {
  if (defaultState !== undefined) {
    return defaultState;
  }

  if (typeof window !== 'undefined') {
    return window.matchMedia(query).matches;
  }

  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      '`useMedia` When server side rendering, defaultState should be defined to prevent a hydration mismatches.',
    );
  }

  return false;
};

export const useMedia = (query: string, defaultState?: boolean) => {
  const [state, setState] = useState(getInitialState(query, defaultState));

  useEffect(() => {
    let mounted = true;
    const mql = window.matchMedia(query);
    const onChange = () => {
      if (!mounted) {
        return;
      }
      setState(!!mql.matches);
    };

    mql.addEventListener('change', onChange);
    setState(mql.matches);

    return () => {
      mounted = false;
      mql.removeEventListener('change', onChange);
    };
  }, [query]);

  return state;
};
