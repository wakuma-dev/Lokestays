import { useEffect, useState } from "react";

import {
  getToday,
  toLocalDateString,
} from "../utils/date-utils";

export interface TodayValue {
  today: Date;
  todayString: string;
}

function getTodayValue(): TodayValue {
  const today = getToday();

  return {
    today,
    todayString: toLocalDateString(today),
  };
}

function getMillisecondsUntilNextDay(): number {
  const now = new Date();

  const nextDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
  );

  return Math.max(1, nextDay.getTime() - now.getTime());
}

export function useToday(): TodayValue {
  const [value, setValue] = useState<TodayValue>(getTodayValue);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const updateToday = () => {
      setValue(getTodayValue());

      timeoutId = setTimeout(
        updateToday,
        getMillisecondsUntilNextDay(),
      );
    };

    timeoutId = setTimeout(
      updateToday,
      getMillisecondsUntilNextDay(),
    );

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        clearTimeout(timeoutId);
        setValue(getTodayValue());

        timeoutId = setTimeout(
          updateToday,
          getMillisecondsUntilNextDay(),
        );
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    return () => {
      clearTimeout(timeoutId);

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
    };
  }, []);

  return value;
}
