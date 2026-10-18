import { useEffect, useState } from "react";

const queryCache = new Map<string, MediaQueryList>();

function getMediaQueryList(query: string): MediaQueryList | null {
  if (typeof window === "undefined") {
    return null;
  }

  let mediaQuery = queryCache.get(query);

  if (!mediaQuery) {
    mediaQuery = window.matchMedia(query);
    queryCache.set(query, mediaQuery);
  }

  return mediaQuery;
}

function getMatches(query: string): boolean {
  return getMediaQueryList(query)?.matches ?? false;
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() =>
    getMatches(query),
  );

  useEffect(() => {
    const mediaQuery = getMediaQueryList(query);

    if (!mediaQuery) {
      return;
    }

    const updateMatches = () => {
      setMatches(mediaQuery.matches);
    };

    updateMatches();

    mediaQuery.addEventListener("change", updateMatches);

    return () => {
      mediaQuery.removeEventListener("change", updateMatches);
    };
  }, [query]);

  return matches;
}

export const SEARCH_MEDIA_QUERIES = {
  mobile: "(max-width: 767px)",
  tablet: "(min-width: 768px) and (max-width: 1023px)",
  desktop: "(min-width: 1024px)",
} as const;
