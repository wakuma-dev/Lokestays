import { useState } from "react";
import { format } from "date-fns";
import { Search, X } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import type { SearchValues } from "../utils/search.utils";

interface DesktopSearchBarProps {
  onSearch: (values: SearchValues) => void;
}

type SearchPanel = "where" | "when" | "who" | null;

const destinations = ["Addis Ababa", "Hawassa", "Bahir Dar"];

export default function DesktopSearchBar({
  onSearch,
}: DesktopSearchBarProps) {
  const [panel, setPanel] = useState<SearchPanel>(null);
  const [location, setLocation] = useState("");
  const [dates, setDates] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0 });
  const [today] = useState(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  });

  const updateGuest = (guest: keyof typeof guests, amount: number) => {
    setGuests((current) => ({
      ...current,
      [guest]: Math.max(guest === "adults" ? 1 : 0, current[guest] + amount),
    }));
  };

  const submitSearch = () => {
    setPanel(null);
    onSearch({ location, dates, guests });
  };

  const dateLabel = dates?.from
    ? `${format(dates.from, "MMM d")}${dates.to ? ` – ${format(dates.to, "MMM d")}` : ""}`
    : "Add dates";
  const guestCount = guests.adults + guests.children;

  return (
    <div className="relative mx-auto hidden w-full max-w-2xl md:block">
      <div className="flex items-center rounded-full border border-gray-200 bg-white p-2 shadow-sm">
        <button
          type="button"
          aria-expanded={panel === "where"}
          onClick={() => setPanel(panel === "where" ? null : "where")}
          className="min-w-0 flex-1 rounded-full px-5 py-2 text-left hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
        >
          <span className="block text-xs font-semibold">Where</span>
          <span className="block truncate text-sm text-gray-600">
            {location || "Search destinations"}
          </span>
        </button>
        <button
          type="button"
          aria-expanded={panel === "when"}
          onClick={() => setPanel(panel === "when" ? null : "when")}
          className="min-w-0 flex-1 border-l border-gray-200 px-5 py-2 text-left hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
        >
          <span className="block text-xs font-semibold">When</span>
          <span className="block truncate text-sm text-gray-600">{dateLabel}</span>
        </button>
        <button
          type="button"
          aria-expanded={panel === "who"}
          onClick={() => setPanel(panel === "who" ? null : "who")}
          className="min-w-0 flex-1 border-l border-gray-200 px-5 py-2 text-left hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
        >
          <span className="block text-xs font-semibold">Who</span>
          <span className="block truncate text-sm text-gray-600">
            {guestCount} {guestCount === 1 ? "guest" : "guests"}
          </span>
        </button>
        <button
          type="button"
          aria-label="Search stays"
          onClick={submitSearch}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rose-600 text-white transition-colors hover:bg-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
        >
          <Search size={20} aria-hidden="true" />
        </button>
      </div>

      {panel && (
        <section
          aria-label={`${panel} search options`}
          className="absolute left-0 right-0 top-full z-50 mt-3 max-h-[min(70vh,32rem)] overflow-y-auto rounded-3xl border border-gray-100 bg-white p-5 shadow-xl"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {panel === "where" ? "Choose a destination" : panel === "when" ? "Choose your dates" : "Add guests"}
            </h2>
            <button
              type="button"
              aria-label="Close search options"
              onClick={() => setPanel(null)}
              className="rounded-full p-2 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
            >
              <X size={18} />
            </button>
          </div>

          {panel === "where" && (
            <div className="space-y-3">
              <label className="sr-only" htmlFor="desktop-destination">
                Destination
              </label>
              <input
                id="desktop-destination"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") submitSearch();
                }}
                placeholder="Search by city"
                autoComplete="off"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
              />
              <div className="flex flex-wrap gap-2">
                {destinations.map((destination) => (
                  <button
                    key={destination}
                    type="button"
                    onClick={() => {
                      setLocation(destination);
                      setPanel("when");
                    }}
                    className="rounded-full border border-gray-200 px-4 py-2 text-sm hover:border-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                  >
                    {destination}
                  </button>
                ))}
                {location && (
                  <button
                    type="button"
                    onClick={() => setLocation("")}
                    className="rounded-full px-3 py-2 text-sm text-gray-600 underline"
                  >
                    Clear destination
                  </button>
                )}
              </div>
            </div>
          )}

          {panel === "when" && (
            <div className="flex justify-center overflow-x-auto">
              <Calendar
                mode="range"
                selected={dates}
                onSelect={setDates}
                disabled={{ before: today }}
                numberOfMonths={2}
                autoFocus
              />
            </div>
          )}

          {panel === "who" && (
            <div className="space-y-4">
              {([
                ["adults", "Adults", "Ages 13 or above"],
                ["children", "Children", "Ages 2–12"],
                ["infants", "Infants", "Under 2"],
              ] as const).map(([guest, label, description]) => (
                <div key={guest} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{label}</p>
                    <p className="text-sm text-gray-500">{description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      aria-label={`Remove one ${label.toLowerCase()}`}
                      disabled={guests[guest] <= (guest === "adults" ? 1 : 0)}
                      onClick={() => updateGuest(guest, -1)}
                      className="h-9 w-9 rounded-full border disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      −
                    </button>
                    <span aria-live="polite" className="min-w-4 text-center">
                      {guests[guest]}
                    </span>
                    <button
                      type="button"
                      aria-label={`Add one ${label.toLowerCase()}`}
                      disabled={
                        guest === "adults"
                          ? guests.adults >= 13 || guestCount >= 15
                          : guest === "children"
                            ? guestCount >= 15
                            : guests.infants >= 5
                      }
                      onClick={() => updateGuest(guest, 1)}
                      className="h-9 w-9 rounded-full border disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-5 flex justify-end border-t pt-4">
            <button
              type="button"
              onClick={submitSearch}
              className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-3 font-medium text-white hover:bg-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
            >
              <Search size={18} aria-hidden="true" />
              Search stays
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
