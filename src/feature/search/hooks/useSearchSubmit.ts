import { useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";

import { searchSchema } from "../schema/searchSchema";
import type { SearchValues } from "../components/DesktopSearchBar";

export function useSearchSubmit() {
  const navigate = useNavigate();

  const handleSubmit = (values: SearchValues) => {
    const result = searchSchema.safeParse({
      destination: values.location.trim() || undefined,
      checkIn: values.dates?.from
        ? format(values.dates.from, "yyyy-MM-dd")
        : undefined,
      checkOut: values.dates?.to
        ? format(values.dates.to, "yyyy-MM-dd")
        : undefined,
      adults: values.guests.adults,
      children: values.guests.children,
      infants: values.guests.infants,
    });

    if (!result.success) {
      return;
    }

    void navigate({
      to: "/explore",
      search: result.data,
    });
  };

  return { handleSubmit };
}