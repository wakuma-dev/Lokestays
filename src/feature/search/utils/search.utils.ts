import type { DateRange } from "react-day-picker";

export interface SearchGuests {
  adults: number;
  children: number;
  infants: number;
}

export interface SearchValues {
  location: string;
  dates: DateRange | undefined;
  guests: SearchGuests;
}

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Builds a search URL from the user's selected filters.
 *
 * Time complexity: O(n), where n is the resulting URL length.
 */
export function buildSearchUrl(values: SearchValues): string {
  const params = new URLSearchParams();
  const location = values.location.trim();

  if (location) {
    params.set("location", location);
  }

  if (values.dates?.from) {
    params.set("checkIn", formatDate(values.dates.from));
  }

  if (values.dates?.to) {
    params.set("checkOut", formatDate(values.dates.to));
  }

  if (values.guests.adults > 0) {
    params.set("adults", String(values.guests.adults));
  }

  if (values.guests.children > 0) {
    params.set("children", String(values.guests.children));
  }

  if (values.guests.infants > 0) {
    params.set("infants", String(values.guests.infants));
  }

  const query = params.toString();

  return query ? `/search?${query}` : "/search";
}

/**
 * Formats a Date using its local calendar date.
 * Returns YYYY-MM-DD without a timezone conversion.
 *
 * Time complexity: O(1).
 */
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

/**
 * Calculates the number of nights between check-in and checkout.
 *
 * Dates must use YYYY-MM-DD format.
 * Checkout must be after check-in.
 *
 * Time complexity: O(1).
 */
export function calculateNights(
  checkIn: string,
  checkOut: string,
): number {
  const start = parseCalendarDate(checkIn);
  const end = parseCalendarDate(checkOut);

  const difference = end - start;

  if (difference <= 0) {
    throw new Error("Checkout must be after check-in.");
  }

  return difference / MILLISECONDS_PER_DAY;
}

/**
 * Validates a calendar date and converts it to a UTC timestamp.
 *
 * Time complexity: O(1).
 */
function parseCalendarDate(value: string): number {
  if (!DATE_PATTERN.test(value)) {
    throw new Error("Date must use YYYY-MM-DD format.");
  }

  const timestamp = Date.parse(`${value}T00:00:00.000Z`);

  if (
    !Number.isFinite(timestamp) ||
    new Date(timestamp).toISOString().slice(0, 10) !== value
  ) {
    throw new Error("Invalid calendar date.");
  }

  return timestamp;
}
