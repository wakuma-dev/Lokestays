import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Calendar from "./Calendar";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { CALENDAR_MONTHS_AHEAD } from "../../constants/search.constants";
import {
  addMonths,
  isBeforeDay,
  startOfMonth,
  toLocalDateString,
} from "../../utils/date-utils";

interface MonthCarouselProps {
  checkIn: string | null;
  checkOut: string | null;
  today: Date;
  onSelectDate: (date: string) => void;
}

export default function MonthCarousel({
  checkIn,
  checkOut,
  today,
  onSelectDate,
}: MonthCarouselProps) {
  const isMobile = useMediaQuery("(max-width: 767px)");

  const [visibleMonth, setVisibleMonth] = useState(() =>
    startOfMonth(today),
  );

  useEffect(() => {
    setVisibleMonth((currentMonth) => {
      const currentMonthStart = startOfMonth(currentMonth);
      const todayMonthStart = startOfMonth(today);

      return isBeforeDay(currentMonthStart, todayMonthStart)
        ? todayMonthStart
        : currentMonthStart;
    });
  }, [today]);

  const monthCount = isMobile ? 1 : 2;
  const todayMonth = startOfMonth(today);
  const lastAvailableMonth = addMonths(
    todayMonth,
    CALENDAR_MONTHS_AHEAD,
  );

  const canGoPrevious = isBeforeDay(todayMonth, visibleMonth);

  const lastVisibleMonth = addMonths(
    visibleMonth,
    monthCount - 1,
  );

  const canGoNext = isBeforeDay(
    lastVisibleMonth,
    lastAvailableMonth,
  );

  const months = Array.from({ length: monthCount }, (_, index) =>
    addMonths(visibleMonth, index),
  );

  const handlePrevious = () => {
    if (!canGoPrevious) return;

    setVisibleMonth((currentMonth) =>
      addMonths(currentMonth, -1),
    );
  };

  const handleNext = () => {
    if (!canGoNext) return;

    setVisibleMonth((currentMonth) =>
      addMonths(currentMonth, 1),
    );
  };

  return (
    <section
      aria-label="Choose check-in and check-out dates"
      className="w-full"
    >
      <div className="mb-5 flex items-center justify-between">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={!canGoPrevious}
          aria-label="Show previous month"
          className="flex size-9 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>

        <p className="text-sm font-medium text-gray-600">
          {months.length === 2
            ? `${months[0].toLocaleDateString(undefined, {
                month: "short",
                year: "numeric",
              })} – ${months[1].toLocaleDateString(undefined, {
                month: "short",
                year: "numeric",
              })}`
            : months[0].toLocaleDateString(undefined, {
                month: "long",
                year: "numeric",
              })}
        </p>

        <button
          type="button"
          onClick={handleNext}
          disabled={!canGoNext}
          aria-label="Show next month"
          className="flex size-9 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
        {months.map((month) => (
          <Calendar
            key={toLocalDateString(month)}
            month={month}
            checkIn={checkIn}
            checkOut={checkOut}
            today={today}
            onSelectDate={onSelectDate}
          />
        ))}
      </div>
    </section>
  );
}
