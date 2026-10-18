import type {
  ExploreSearch,
  GuestCounts,
} from "../types/search.types";

import {
  SEARCH_QUERY_KEYS,
} from "../constants/search.constants";

import {
  isValidDateString,
} from "./date-utils";

const DEFAULT_GUEST_COUNTS: GuestCounts = {
  adults: 1,
  children: 0,
  infants: 0,
  pets: 0,
};

function parsePositiveInteger(
  value: string | null,
  fallback: number,
  maximum: number,
): number {
  if (value === null || value.trim() === "") {
    return fallback;
  }

  const parsed = Number(value);

  if (
    !Number.isSafeInteger(parsed) ||
    parsed < 0 ||
    parsed > maximum
  ) {
    return fallback;
  }

  return parsed;
}

function parseOptionalCoordinate(
  value: string | null,
): number | undefined {
  if (value === null || value.trim() === "") {
    return undefined;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return undefined;
  }

  return parsed;
}

function isValidCoordinatePair(
  lat: number | undefined,
  lng: number | undefined,
): boolean {
  return (
    lat !== undefined &&
    lng !== undefined &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  );
}

export function serializeSearch(
  search: ExploreSearch,
): URLSearchParams {
  const params = new URLSearchParams();

  const destination = search.destination.trim();

  if (destination) {
    params.set(
      SEARCH_QUERY_KEYS.destination,
      destination,
    );
  }

  if (search.destinationId) {
    params.set(
      SEARCH_QUERY_KEYS.destinationId,
      search.destinationId,
    );
  }

  if (
    search.checkIn &&
    isValidDateString(search.checkIn)
  ) {
    params.set(
      SEARCH_QUERY_KEYS.checkIn,
      search.checkIn,
    );
  }

  if (
    search.checkOut &&
    isValidDateString(search.checkOut)
  ) {
    params.set(
      SEARCH_QUERY_KEYS.checkOut,
      search.checkOut,
    );
  }

  params.set(
    SEARCH_QUERY_KEYS.adults,
    String(search.adults),
  );

  params.set(
    SEARCH_QUERY_KEYS.children,
    String(search.children),
  );

  params.set(
    SEARCH_QUERY_KEYS.infants,
    String(search.infants),
  );

  params.set(
    SEARCH_QUERY_KEYS.pets,
    String(search.pets),
  );

  if (
    isValidCoordinatePair(search.lat, search.lng)
  ) {
    params.set(
      SEARCH_QUERY_KEYS.lat,
      String(search.lat),
    );

    params.set(
      SEARCH_QUERY_KEYS.lng,
      String(search.lng),
    );
  }

  return params;
}

export function deserializeSearch(
  params: URLSearchParams,
): ExploreSearch {
  const destination =
    params.get(SEARCH_QUERY_KEYS.destination)?.trim() ?? "";

  const destinationId =
    params.get(SEARCH_QUERY_KEYS.destinationId) ?? undefined;

  const rawCheckIn =
    params.get(SEARCH_QUERY_KEYS.checkIn);

  const rawCheckOut =
    params.get(SEARCH_QUERY_KEYS.checkOut);

  let checkIn =
    rawCheckIn && isValidDateString(rawCheckIn)
      ? rawCheckIn
      : null;

  let checkOut =
    rawCheckOut && isValidDateString(rawCheckOut)
      ? rawCheckOut
      : null;

  // A checkout date must be later than the check-in date.
  if (
    checkIn &&
    checkOut &&
    checkOut <= checkIn
  ) {
    checkOut = null;
  }

  const lat = parseOptionalCoordinate(
    params.get(SEARCH_QUERY_KEYS.lat),
  );

  const lng = parseOptionalCoordinate(
    params.get(SEARCH_QUERY_KEYS.lng),
  );

  const coordinatesAreValid =
    isValidCoordinatePair(lat, lng);

  return {
    destination,
    ...(destinationId ? { destinationId } : {}),
    checkIn,
    checkOut,
    adults: Math.max(
      1,
      parsePositiveInteger(
        params.get(SEARCH_QUERY_KEYS.adults),
        DEFAULT_GUEST_COUNTS.adults,
        16,
      ),
    ),
    children: parsePositiveInteger(
      params.get(SEARCH_QUERY_KEYS.children),
      DEFAULT_GUEST_COUNTS.children,
      10,
    ),
    infants: parsePositiveInteger(
      params.get(SEARCH_QUERY_KEYS.infants),
      DEFAULT_GUEST_COUNTS.infants,
      5,
    ),
    pets: parsePositiveInteger(
      params.get(SEARCH_QUERY_KEYS.pets),
      DEFAULT_GUEST_COUNTS.pets,
      5,
    ),
    ...(coordinatesAreValid
      ? { lat, lng }
      : {}),
  };
}

export function searchToQueryString(
  search: ExploreSearch,
): string {
  const params = serializeSearch(search);
  const query = params.toString();

  return query ? `?${query}` : "";
}

export function searchFromQueryString(
  queryString: string,
): ExploreSearch {
  const params = new URLSearchParams(
    queryString.startsWith("?")
      ? queryString.slice(1)
      : queryString,
  );

  return deserializeSearch(params);
}
