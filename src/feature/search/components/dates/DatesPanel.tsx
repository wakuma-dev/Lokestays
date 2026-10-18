import { CalendarDays, RotateCcw } from "lucide-react";

import MonthCarousel from "./MonthCarousel";
import {
  formatDate,
  getNightCount,
  parseLocalDate,
  toLocalDateString,
} from "../../utils/date-utils";

interface DatesPanelProps {
  checkIn: string | null;
  checkOut: string | null;
  today: Date;
  onSelectDate: (date: string) => void;
  onClearDates: () => void;
  onClose?: () => void;
}

export default function DatesPanel({
  checkIn,
  checkOut,
  today,
  onSelectDate,
  onClearDates,
  onClose,
}: DatesPanelProps) {
  const checkInDate = checkIn ? parseLocalDate(checkIn) : null;
  const checkOutDate = checkOut ? parseLocalDate(checkOut) : null;

  const nightCount =
    checkIn && checkOut
      ? getNightCount(checkIn, checkOut)
      : 0;

  const hasDates = Boolean(checkIn || checkOut);
  const hasCompleteRange = Boolean(checkIn && checkOut);

  const handleClear = () => {
    onClearDates();
  };

  return (
    <section
      aria-label="Choose your travel dates"
      className="w-full overflow-hidden rounded-2xl bg-white"
    >
      <header className="border-b border-gray-100 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              When's your trip?
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {hasCompleteRange
                ? `${nightCount} ${nightCount === 1 ? "night" : "nights"} selected`
                : checkIn
                  ? "Now choose your check-out date"
                  : "Add your travel dates"}
            </p>
          </div>

          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-700">
            <CalendarDays size={19} aria-hidden="true" />
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <DateSummary
            label="CHECK-IN"
            date={checkInDate}
            emptyText="Add date"
            selected={Boolean(checkIn)}
          />

          <DateSummary
            label="CHECK-OUT"
            date={checkOutDate}
            emptyText="Add date"
            selected={Boolean(checkOut)}
          />
        </div>
      </header>

      <div className="p-4 sm:p-5">
        <MonthCarousel
          checkIn={checkIn}
          checkOut={checkOut}
          today={today}
          onSelectDate={onSelectDate}
        />
      </div>

      <footer className="flex items-center justify-between gap-3 border-t border-gray-100 px-5 py-4">
        <button
          type="button"
          onClick={handleClear}
          disabled={!hasDates}
          className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-gray-700 underline-offset-4 transition-colors hover:underline disabled:cursor-not-allowed disabled:text-gray-300 disabled:no-underline"
        >
          <RotateCcw size={15} aria-hidden="true" />
          Clear dates
        </button>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            Done
          </button>
        )}
      </footer>
    </section>
  );
}

interface DateSummaryProps {
  label: string;
  date: Date | null;
  emptyText: string;
  selected: boolean;
}

function DateSummary({
  label,
  date,
  emptyText,
  selected,
}: DateSummaryProps) {
  return (
    <div
      className={[
        "min-w-0 rounded-xl border p-3",
        selected
          ? "border-gray-900 bg-white"
          : "border-gray-200 bg-gray-50",
      ].join(" ")}
    >
      <p className="text-[10px] font-semibold tracking-wider text-gray-500">
        {label}
      </p>

      <p
        className={[
          "mt-1 truncate text-sm font-medium",
          selected ? "text-gray-900" : "text-gray-400",
        ].join(" ")}
      >
        {date ? formatDate(toLocalDateString(date)) : emptyText}
      </p>
    </div>
  );
}
