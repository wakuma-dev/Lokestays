import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  RECENT_DESTINATIONS_LIMIT,
  RECENT_DESTINATIONS_STORAGE_KEY,
} from "../constants/search.constants";

import type {
  DestinationOption,
  RecentDestinationsStorage,
} from "../types/search.types";

function isDestinationOption(
  value: unknown,
): value is DestinationOption {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const destination = value as Record<string, unknown>;

  if (
    typeof destination.id !== "string" ||
    typeof destination.label !== "string" ||
    typeof destination.type !== "string"
  ) {
    return false;
  }

  const validTypes = [
    "city",
    "region",
    "country",
    "landmark",
    "custom",
  ];

  if (!validTypes.includes(destination.type)) {
    return false;
  }

  if (
    destination.subtitle !== undefined &&
    typeof destination.subtitle !== "string"
  ) {
    return false;
  }

  if (destination.coordinates !== undefined) {
    if (
      typeof destination.coordinates !== "object" ||
      destination.coordinates === null
    ) {
      return false;
    }

    const coordinates = destination.coordinates as Record<
      string,
      unknown
    >;

    if (
      typeof coordinates.lat !== "number" ||
      !Number.isFinite(coordinates.lat) ||
      coordinates.lat < -90 ||
      coordinates.lat > 90 ||
      typeof coordinates.lng !== "number" ||
      !Number.isFinite(coordinates.lng) ||
      coordinates.lng < -180 ||
      coordinates.lng > 180
    ) {
      return false;
    }
  }

  return true;
}

function getBrowserStorage(): Storage | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function readRecentDestinations(): DestinationOption[] {
  const storage = getBrowserStorage();

  if (!storage) {
    return [];
  }

  try {
    const storedValue = storage.getItem(
      RECENT_DESTINATIONS_STORAGE_KEY,
    );

    if (!storedValue) {
      return [];
    }

    const parsed: unknown = JSON.parse(storedValue);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter(isDestinationOption)
      .slice(0, RECENT_DESTINATIONS_LIMIT);
  } catch {
    return [];
  }
}

function writeRecentDestinations(
  destinations: DestinationOption[],
): void {
  const storage = getBrowserStorage();

  if (!storage) {
    return;
  }

  try {
    storage.setItem(
      RECENT_DESTINATIONS_STORAGE_KEY,
      JSON.stringify(
        destinations.slice(0, RECENT_DESTINATIONS_LIMIT),
      ),
    );
  } catch {
    // Storage may be unavailable or full.
    // The current session can still use in-memory state.
  }
}

export const recentDestinationsStorage: RecentDestinationsStorage = {
  getRecentDestinations() {
    return readRecentDestinations();
  },

  saveRecentDestination(destination) {
    const existing = readRecentDestinations();

    const updated = [
      destination,
      ...existing.filter(
        (item) => item.id !== destination.id,
      ),
    ].slice(0, RECENT_DESTINATIONS_LIMIT);

    writeRecentDestinations(updated);
  },

  clearRecentDestinations() {
    const storage = getBrowserStorage();

    if (!storage) {
      return;
    }

    try {
      storage.removeItem(RECENT_DESTINATIONS_STORAGE_KEY);
    } catch {
      // Ignore storage access failures.
    }
  },
};

export interface UseRecentDestinationsResult {
  recentDestinations: DestinationOption[];
  addRecentDestination: (
    destination: DestinationOption,
  ) => void;
  clearRecentDestinations: () => void;
}

export function useRecentDestinations(): UseRecentDestinationsResult {
  const [recentDestinations, setRecentDestinations] = useState<
    DestinationOption[]
  >([]);

  // Read browser storage after mounting to avoid SSR hydration mismatches.
  useEffect(() => {
    setRecentDestinations(
      recentDestinationsStorage.getRecentDestinations(),
    );
  }, []);

  const addRecentDestination = useCallback(
    (destination: DestinationOption) => {
      setRecentDestinations((current) => {
        const updated = [
          destination,
          ...current.filter(
            (item) => item.id !== destination.id,
          ),
        ].slice(0, RECENT_DESTINATIONS_LIMIT);

        writeRecentDestinations(updated);

        return updated;
      });
    },
    [],
  );

  const clearRecentDestinations = useCallback(() => {
    recentDestinationsStorage.clearRecentDestinations();
    setRecentDestinations([]);
  }, []);

  return {
    recentDestinations,
    addRecentDestination,
    clearRecentDestinations,
  };
}
