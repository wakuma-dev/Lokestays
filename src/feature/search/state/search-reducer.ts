import {
  DEFAULT_GUESTS,
  GUEST_LIMITS,
} from "../constants/search.constants";

import {
  isValidDateString,
  parseLocalDate,
} from "../utils/date-utils";

import type {
  SearchAction,
  SearchState,
} from "../types/search.types";

import { createInitialState } from "./createInitialState";

function clampGuestCount(
  guestType: keyof SearchState["guests"],
  count: number,
): number {
  const limits = GUEST_LIMITS[guestType];

  if (!Number.isFinite(count)) {
    return limits.min;
  }

  return Math.min(
    limits.max,
    Math.max(limits.min, Math.floor(count)),
  );
}

function selectDate(
  state: SearchState,
  selectedDate: string,
): SearchState {
  if (!isValidDateString(selectedDate)) {
    return state;
  }

  const selected = parseLocalDate(selectedDate);

  if (!selected) {
    return state;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selected < today) {
    return state;
  }

  const { checkIn, checkOut } = state;

  // Start a new date range when no check-in exists,
  // or when the previous range is already complete.
  if (!checkIn || checkOut) {
    return {
      ...state,
      checkIn: selectedDate,
      checkOut: null,
      activePanel: "dates",
    };
  }

  const currentCheckIn = parseLocalDate(checkIn);

  if (!currentCheckIn) {
    return {
      ...state,
      checkIn: selectedDate,
      checkOut: null,
      activePanel: "dates",
    };
  }

  // Selecting the same date or an earlier date restarts the range.
  if (selected <= currentCheckIn) {
    return {
      ...state,
      checkIn: selectedDate,
      checkOut: null,
      activePanel: "dates",
    };
  }

  // The selected date is later than check-in, so use it as checkout.
  return {
    ...state,
    checkOut: selectedDate,
    activePanel: null,
  };
}

export function searchReducer(
  state: SearchState,
  action: SearchAction,
): SearchState {
  switch (action.type) {
    case "SET_DESTINATION_QUERY":
      return {
        ...state,
        destinationQuery: action.payload,
        destination: null,
      };

    case "SELECT_DESTINATION":
      return {
        ...state,
        destination: action.payload,
        destinationQuery: action.payload.label,
        activePanel: null,
      };

    case "CLEAR_DESTINATION":
      return {
        ...state,
        destination: null,
        destinationQuery: "",
      };

    case "SELECT_DATE":
      return selectDate(state, action.payload);

    case "CLEAR_DATES":
      return {
        ...state,
        checkIn: null,
        checkOut: null,
      };

    case "SET_GUEST_COUNT": {
      const { guestType, count } = action.payload;

      return {
        ...state,
        guests: {
          ...state.guests,
          [guestType]: clampGuestCount(guestType, count),
        },
      };
    }

    case "SET_ACTIVE_PANEL":
      return {
        ...state,
        activePanel: action.payload,
      };

    case "RESET_SEARCH":
      return createInitialState({
        adults: DEFAULT_GUESTS.adults,
        children: DEFAULT_GUESTS.children,
        infants: DEFAULT_GUESTS.infants,
        pets: DEFAULT_GUESTS.pets,
      });

    case "HYDRATE_SEARCH": {
      const hydrated = createInitialState({
        destination: action.payload.destination?.label,
        destinationId: action.payload.destination?.id,
        checkIn: action.payload.checkIn,
        checkOut: action.payload.checkOut,
        adults: action.payload.guests?.adults,
        children: action.payload.guests?.children,
        infants: action.payload.guests?.infants,
        pets: action.payload.guests?.pets,
        lat: action.payload.destination?.coordinates?.lat,
        lng: action.payload.destination?.coordinates?.lng,
      });

      return {
        ...hydrated,
        destinationQuery:
          action.payload.destinationQuery ??
          hydrated.destinationQuery,
        activePanel: action.payload.activePanel ?? null,
      };
    }

    default:
      return state;
  }
}
