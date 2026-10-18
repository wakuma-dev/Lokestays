import { z } from "zod";

import type {
  ExploreSearch,
  SearchState,
} from "../types/search.types";

import { DEFAULT_GUESTS } from "../constants/search.constants";

import {
  isValidDateString,
} from "../utils/date-utils";

const dateSchema = z
  .string()
  .nullable()
  .refine(
    (value) => value === null || isValidDateString(value),
    { message: "Enter a valid date in YYYY-MM-DD format." },
  );

const coordinateSchema = z.number().finite();

export const exploreSearchSchema = z
  .object({
    destination: z.string().trim().default(""),
    destinationId: z.string().optional(),
    checkIn: dateSchema.default(null),
    checkOut: dateSchema.default(null),
    adults: z.number().int().min(1).max(16).default(1),
    children: z.number().int().min(0).max(10).default(0),
    infants: z.number().int().min(0).max(5).default(0),
    pets: z.number().int().min(0).max(5).default(0),
    lat: coordinateSchema.optional(),
    lng: coordinateSchema.optional(),
  })
  .superRefine((value, context) => {
    if (
      value.checkIn &&
      value.checkOut &&
      value.checkOut <= value.checkIn
    ) {
      context.addIssue({
        code: "custom",
        path: ["checkOut"],
        message: "Check-out must be after check-in.",
      });
    }

    const hasLat = value.lat !== undefined;
    const hasLng = value.lng !== undefined;

    if (hasLat !== hasLng) {
      context.addIssue({
        code: "custom",
        path: [hasLat ? "lng" : "lat"],
        message: "Latitude and longitude must be provided together.",
      });
    }

    if (
      value.lat !== undefined &&
      (value.lat < -90 || value.lat > 90)
    ) {
      context.addIssue({
        code: "custom",
        path: ["lat"],
        message: "Latitude must be between -90 and 90.",
      });
    }

    if (
      value.lng !== undefined &&
      (value.lng < -180 || value.lng > 180)
    ) {
      context.addIssue({
        code: "custom",
        path: ["lng"],
        message: "Longitude must be between -180 and 180.",
      });
    }
  });

export type ParsedExploreSearch = z.infer<
  typeof exploreSearchSchema
>;

export function createInitialState(
  search?: Partial<ExploreSearch>,
): SearchState {
  return {
    destination: search?.destination
      ? {
          id: search.destinationId ?? search.destination,
          label: search.destination,
          type: "custom",
          ...(search.lat !== undefined &&
          search.lng !== undefined
            ? {
                coordinates: {
                  lat: search.lat,
                  lng: search.lng,
                },
              }
            : {}),
        }
      : null,
    destinationQuery: search?.destination ?? "",
    checkIn: search?.checkIn ?? null,
    checkOut: search?.checkOut ?? null,
    guests: {
      adults: search?.adults ?? DEFAULT_GUESTS.adults,
      children: search?.children ?? DEFAULT_GUESTS.children,
      infants: search?.infants ?? DEFAULT_GUESTS.infants,
      pets: search?.pets ?? DEFAULT_GUESTS.pets,
    },
    activePanel: null,
  };
}

export function toExploreSearch(
  state: SearchState,
): ExploreSearch {
  const destination = state.destination;

  return {
    destination: destination?.label ?? state.destinationQuery.trim(),
    ...(destination?.id
      ? { destinationId: destination.id }
      : {}),
    checkIn: state.checkIn,
    checkOut: state.checkOut,
    adults: state.guests.adults,
    children: state.guests.children,
    infants: state.guests.infants,
    pets: state.guests.pets,
    ...(destination?.coordinates
      ? {
          lat: destination.coordinates.lat,
          lng: destination.coordinates.lng,
        }
      : {}),
  };
}
