
import {
  useEffect,
  useState,
} from "react";

import {
  DESTINATION_SUGGESTION_LIMIT,
} from "../constants/search.constants";

import {
  searchDestinations,
} from "../services/destinationService";

import type {
  DestinationOption,
} from "../types/search.types";

export interface UseDestinationSuggestionsOptions {
  query: string;
  enabled?: boolean;
  debounceMs?: number;
}

export interface UseDestinationSuggestionsResult {
  suggestions: DestinationOption[];
  isLoading: boolean;
  error: string | null;
}

export function useDestinationSuggestions({
  query,
  enabled = true,
  debounceMs = 200,
}: UseDestinationSuggestionsOptions): UseDestinationSuggestionsResult {
  const [suggestions, setSuggestions] = useState<
    DestinationOption[]
  >([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setSuggestions([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    const normalizedQuery = query.trim();
    const controller = new AbortController();

    setIsLoading(true);
    setError(null);

    const timeoutId = setTimeout(() => {
      void searchDestinations(
        normalizedQuery,
        controller.signal,
      )
        .then((results) => {
          if (controller.signal.aborted) {
            return;
          }

          setSuggestions(
            results.slice(0, DESTINATION_SUGGESTION_LIMIT),
          );
        })
        .catch((cause: unknown) => {
          if (controller.signal.aborted) {
            return;
          }

          setSuggestions([]);

          setError(
            cause instanceof Error
              ? cause.message
              : "Unable to load destinations. Please try again.",
          );
        })
        .finally(() => {
          if (!controller.signal.aborted) {
            setIsLoading(false);
          }
        });
    }, Math.max(0, debounceMs));

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [query, enabled, debounceMs]);

  return {
    suggestions,
    isLoading,
    error,
  };
}
