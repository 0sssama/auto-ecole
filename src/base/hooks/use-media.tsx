import { useState, useEffect } from 'react';

/**
 * React hook to check when a valid media-query-string changes
 * (i.e. when the media query test starts or stops evaluating to true)
 *
 * @param {string} mediaQueryString valid media query string. E.g.: `(min-width: 425px)`
 * @returns {boolean} media-query matches value
 */
export const useMedia = (mediaQueryString: string) => {
  const [queryMatch, setQueryMatch] = useState<boolean>();

  useEffect(() => {
    const setMediaMatchHandler = (e: MediaQueryListEvent | MediaQueryList) => setQueryMatch(e.matches);

    const mediaQueryList = window.matchMedia(mediaQueryString);

    setMediaMatchHandler(mediaQueryList);
    mediaQueryList.addListener(setMediaMatchHandler);

    return () => mediaQueryList.removeListener(setMediaMatchHandler);
  }, [mediaQueryString]);

  return queryMatch;
};
