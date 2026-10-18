import type { GuestCounts, SearchPanel } from "../types/search.types";

export const DEFAULT_GUESTS: GuestCounts = {
  adults: 1,
  children: 0,
  infants: 0,
  pets: 0,
};

export const GUEST_LIMITS = {
  adults: {
    min: 1,
    max: 16,
  },
  children: {
    min: 0,
    max: 10,
  },
  infants: {
    min: 0,
    max: 5,
  },
  pets: {
    min: 0,
    max: 5,
  },
} as const;

export const GUEST_LABELS = {
  adults: {
    singular: "adult",
    plural: "adults",
    description: "Ages 13 or above",
  },
  children: {
    singular: "child",
    plural: "children",
    description: "Ages 2–12",
  },
  infants: {
    singular: "infant",
    plural: "infants",
    description: "Under 2",
  },
  pets: {
    singular: "pet",
    plural: "pets",
    description: "Bringing a service animal?",
  },
} as const;

export const DEFAULT_SEARCH_PANEL: SearchPanel = null;

export const CALENDAR_MONTHS_TO_SHOW = 2;

export const CALENDAR_MONTHS_AHEAD = 12;

export const DESTINATION_SUGGESTION_LIMIT = 8;

export const RECENT_DESTINATIONS_LIMIT = 5;

export const RECENT_DESTINATIONS_STORAGE_KEY =
  "lokestays:recent-destinations";

export const SEARCH_QUERY_KEYS = {
  destination: "destination",
  destinationId: "destinationId",
  checkIn: "checkIn",
  checkOut: "checkOut",
  adults: "adults",
  children: "children",
  infants: "infants",
  pets: "pets",
  lat: "lat",
  lng: "lng",
} as const;

export const SEARCH_DEFAULTS = {
  destination: "",
  checkIn: null,
  checkOut: null,
  ...DEFAULT_GUESTS,
} as const;

export const GUEST_TYPES = [
  "adults",
  "children",
  "infants",
  "pets",
] as const;
