const DAY_IN_MS = 24 * 60 * 60 * 1000;

export interface CalendarDay {
  date: Date;
  dateString: string;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isPast: boolean;
}

export function getToday(): Date {
  const today = new Date();

  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
}

export function toLocalDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function parseLocalDate(
  value: string | null | undefined,
): Date | null {
  if (!value) {
    return null;
  }

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

export function isValidDateString(
  value: string | null | undefined,
): boolean {
  return parseLocalDate(value) !== null;
}

export function startOfDay(date: Date): Date {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
}

export function addDays(date: Date, amount: number): Date {
  const result = startOfDay(date);
  result.setDate(result.getDate() + amount);

  return result;
}

export function addMonths(date: Date, amount: number): Date {
  const result = startOfDay(date);
  const originalDay = result.getDate();

  result.setDate(1);
  result.setMonth(result.getMonth() + amount);

  const lastDayOfTargetMonth = new Date(
    result.getFullYear(),
    result.getMonth() + 1,
    0,
  ).getDate();

  result.setDate(Math.min(originalDay, lastDayOfTargetMonth));

  return result;
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export function isSameDay(
  first: Date | null | undefined,
  second: Date | null | undefined,
): boolean {
  if (!first || !second) {
    return false;
  }

  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

export function isSameMonth(
  first: Date | null | undefined,
  second: Date | null | undefined,
): boolean {
  if (!first || !second) {
    return false;
  }

  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth()
  );
}

export function isBeforeDay(first: Date, second: Date): boolean {
  return startOfDay(first).getTime() < startOfDay(second).getTime();
}

export function isAfterDay(first: Date, second: Date): boolean {
  return startOfDay(first).getTime() > startOfDay(second).getTime();
}

export function isDateInRange(
  date: Date,
  start: Date | null,
  end: Date | null,
): boolean {
  if (!start || !end) {
    return false;
  }

  const timestamp = startOfDay(date).getTime();
  const startTimestamp = startOfDay(start).getTime();
  const endTimestamp = startOfDay(end).getTime();

  return timestamp >= startTimestamp && timestamp <= endTimestamp;
}

export function getDaysBetween(
  start: Date,
  end: Date,
): number {
  const startTimestamp = Date.UTC(
    start.getFullYear(),
    start.getMonth(),
    start.getDate(),
  );

  const endTimestamp = Date.UTC(
    end.getFullYear(),
    end.getMonth(),
    end.getDate(),
  );

  return Math.round((endTimestamp - startTimestamp) / DAY_IN_MS);
}

export function getNightCount(
  checkIn: string | null,
  checkOut: string | null,
): number {
  const start = parseLocalDate(checkIn);
  const end = parseLocalDate(checkOut);

  if (!start || !end || !isAfterDay(end, start)) {
    return 0;
  }

  return getDaysBetween(start, end);
}

export function getMonthName(
  date: Date,
  format: "long" | "short" = "long",
): string {
  return new Intl.DateTimeFormat("en", {
    month: format,
  }).format(date);
}

export function getMonthYearLabel(date: Date): string {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatDate(
  value: string | null | undefined,
  options?: Intl.DateTimeFormatOptions,
): string {
  const date = parseLocalDate(value);

  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    ...options,
  }).format(date);
}

export function formatDateRange(
  checkIn: string | null,
  checkOut: string | null,
): string {
  if (!checkIn && !checkOut) {
    return "Add dates";
  }

  if (checkIn && !checkOut) {
    return `${formatDate(checkIn)} – Check-out`;
  }

  if (!checkIn && checkOut) {
    return `Check-in – ${formatDate(checkOut)}`;
  }

  const start = parseLocalDate(checkIn);
  const end = parseLocalDate(checkOut);

  if (!start || !end) {
    return "Add dates";
  }

  if (isSameMonth(start, end)) {
    return `${formatDate(checkIn)} – ${formatDate(checkOut, {
      year: "numeric",
    })}`;
  }

  return `${formatDate(checkIn, {
    year: "numeric",
  })} – ${formatDate(checkOut, {
    year: "numeric",
  })}`;
}

export function getCalendarDays(
  month: Date,
  today: Date = getToday(),
): CalendarDay[] {
  const firstDay = startOfMonth(month);
  const lastDay = endOfMonth(month);

  // Monday-first calendar: Monday = 0, Sunday = 6.
  const leadingDays = (firstDay.getDay() + 6) % 7;
  const totalDays = leadingDays + lastDay.getDate();
  const totalCells = Math.ceil(totalDays / 7) * 7;

  const calendarStart = addDays(firstDay, -leadingDays);

  return Array.from({ length: totalCells }, (_, index) => {
    const date = addDays(calendarStart, index);

    return {
      date,
      dateString: toLocalDateString(date),
      dayOfMonth: date.getDate(),
      isCurrentMonth: isSameMonth(date, month),
      isToday: isSameDay(date, today),
      isPast: isBeforeDay(date, today),
    };
  });
}

export function getNextAvailableDate(
  date: Date = getToday(),
): Date {
  return addDays(date, 1);
}

export function clampDate(
  date: Date,
  minimum: Date,
  maximum: Date,
): Date {
  const timestamp = startOfDay(date).getTime();
  const minimumTimestamp = startOfDay(minimum).getTime();
  const maximumTimestamp = startOfDay(maximum).getTime();

  return new Date(
    Math.min(
      Math.max(timestamp, minimumTimestamp),
      maximumTimestamp,
    ),
  );
}

export function getMaximumBookableDate(
  monthsAhead = 12,
  today: Date = getToday(),
): Date {
  return addMonths(today, monthsAhead);
}
