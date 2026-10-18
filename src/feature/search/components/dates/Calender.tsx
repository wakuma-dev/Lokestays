import {
  getCalendarDays,
  isAfterDay,
  isBeforeDay,
  isSameDay,
  isSameMonth,
  parseLocalDate,
} from "../../utils/date-utils";

interface CalendarProps {
  month: Date;
  checkIn: string | null;
  checkOut: string | null;
  today: Date;
  onSelectDate: (date: string) => void;
}

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Calendar({
  month,
  checkIn,
  checkOut,
  today,
  onSelectDate,
}: CalendarProps) {
  const calendarDays = getCalendarDays(month);
  const normalizedToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const checkInDate = checkIn ? parseLocalDate(checkIn) : null;
  const checkOutDate = checkOut ? parseLocalDate(checkOut) : null;

  return (
    <section
      aria-label={`Calendar for ${month.toLocaleDateString(undefined, {
        month: "long",
        year: "numeric",
      })}`}
      className="min-w-0"
    >
      <h3 className="mb-5 text-center text-base font-semibold text-gray-900">
        {month.toLocaleDateString(undefined, {
          month: "long",
          year: "numeric",
        })}
      </h3>

      <div
        role="grid"
        aria-label="Choose dates"
        className="grid grid-cols-7 gap-y-1"
      >
        {WEEKDAYS.map((weekday) => (
          <div
            key={weekday}
            role="columnheader"
            aria-label={weekday}
            className="flex h-9 items-center justify-center text-xs font-medium text-gray-500"
          >
            {weekday}
          </div>
        ))}

        {calendarDays.map((calendarDay) => {
          const { date, dateString } = calendarDay;
          const isCurrentMonth = isSameMonth(date, month);
          const isPast = isBeforeDay(date, normalizedToday);
          const isCheckIn =
            checkInDate !== null && isSameDay(date, checkInDate);
          const isCheckOut =
            checkOutDate !== null && isSameDay(date, checkOutDate);

          const isInRange =
            checkInDate !== null &&
            checkOutDate !== null &&
            isAfterDay(date, checkInDate) &&
            isBeforeDay(date, checkOutDate);

          const isDisabled = isPast;
          const isSelected = isCheckIn || isCheckOut;

          const accessibleLabel = date.toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          });

          return (
            <div
              key={dateString}
              role="gridcell"
              aria-selected={isSelected}
              className={[
                "relative flex h-10 items-center justify-center",
                isInRange ? "bg-gray-100" : "",
                isCheckIn ? "rounded-l-full bg-gray-100" : "",
                isCheckOut ? "rounded-r-full bg-gray-100" : "",
              ].join(" ")}
            >
              <button
                type="button"
                disabled={isDisabled}
                aria-label={[
                  accessibleLabel,
                  isCheckIn ? "Check-in" : "",
                  isCheckOut ? "Check-out" : "",
                  isInRange ? "Selected date range" : "",
                  isDisabled ? "Unavailable" : "",
                ]
                  .filter(Boolean)
                  .join(", ")}
                aria-pressed={isSelected}
                onClick={() => onSelectDate(dateString)}
                className={[
                  "relative z-10 flex size-10 items-center justify-center rounded-full text-sm transition-colors",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900",
                  isSelected
                    ? "bg-gray-900 font-semibold text-white"
                    : isDisabled
                      ? "cursor-not-allowed text-gray-300 line-through"
                      : isCurrentMonth
                        ? "text-gray-900 hover:border hover:border-gray-900"
                        : "text-gray-400 hover:border hover:border-gray-400",
                ].join(" ")}
              >
                {date.getDate()}
              </button>
            </div>
          );
        })}
      </div>

      <p className="sr-only">
        Dates are displayed Monday through Sunday. Select a check-in date,
        then select a later date for check-out.
      </p>
    </section>
  );
}
