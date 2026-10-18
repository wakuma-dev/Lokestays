import type {
  DestinationOption,
  GuestCounts,
} from "../types/search.types";

import {
  formatDate,
  getNightCount,
} from "./date-utils";

export interface SearchSummaries {
  destination: string;
  dates: string;
  guests: string;
}

export function getDestinationSummary(
  destination: DestinationOption | null,
  destinationQuery = "",
): string {
  const selectedDestination = destination?.label.trim();

  if (selectedDestination) {
    return selectedDestination;
  }

  const query = destinationQuery.trim();

  return query || "Add destination";
}

export function getDateSummary(
  checkIn: string | null,
  checkOut: string | null,
): string {
  if (!checkIn && !checkOut) {
    return "Add dates";
  }

  if (checkIn && !checkOut) {
    return `${formatDate(checkIn)} – Add checkout`;
  }

  if (!checkIn && checkOut) {
    return `Add check-in – ${formatDate(checkOut)}`;
  }

  const nights = getNightCount(checkIn, checkOut);

  if (nights <= 0) {
    return "Add dates";
  }

  return `${formatDate(checkIn)} – ${formatDate(checkOut)}`;
}

export function getGuestSummary(
  guests: GuestCounts,
): string {
  const totalGuests = guests.adults + guests.children;
  const totalInfants = guests.infants;
  const totalPets = guests.pets;

  const parts: string[] = [];

  if (totalGuests === 1) {
    parts.push("1 guest");
  } else {
    parts.push(`${totalGuests} guests`);
  }

  if (totalInfants > 0) {
    parts.push(
      totalInfants === 1
        ? "1 infant"
        : `${totalInfants} infants`,
    );
  }

  if (totalPets > 0) {
    parts.push(
      totalPets === 1
        ? "1 pet"
        : `${totalPets} pets`,
    );
  }

  return parts.join(", ");
}

export function getSearchSummaries(
  destination: DestinationOption | null,
  destinationQuery: string,
  checkIn: string | null,
  checkOut: string | null,
  guests: GuestCounts,
): SearchSummaries {
  return {
    destination: getDestinationSummary(
      destination,
      destinationQuery,
    ),
    dates: getDateSummary(checkIn, checkOut),
    guests: getGuestSummary(guests),
  };
}
