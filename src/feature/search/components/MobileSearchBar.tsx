import { useEffect, useRef, useState } from "react";
import {
  Search,
  X,
  Landmark,
  DoorClosed,
  Home,
  type LucideIcon,
} from "lucide-react";
import type { DateRange } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";
import type { SearchValues } from "../utils/search.utils";

type Tabs = "where" | "when" | "who";

interface LocationProps {
  icon: LucideIcon;
  title: string;
  subTitle: string;
}

interface UserProps {
  id: "adults" | "children" | "infants";
  title: string;
  subTitle: string;
}

const locations: LocationProps[] = [
  {
    icon: Landmark,
    title: "Addis Ababa",
    subTitle: "Near you",
  },
  {
    icon: DoorClosed,
    title: "Hawassa",
    subTitle: "Explore stays by the lake",
  },
  {
    icon: Home,
    title: "Bahir Dar",
    subTitle: "Discover stays by Lake Tana",
  },
];

const userRanges: UserProps[] = [
  {
    id: "adults",
    title: "Adults",
    subTitle: "Ages 13 or above",
  },
  {
    id: "children",
    title: "Children",
    subTitle: "Ages 2-12",
  },
  {
    id: "infants",
    title: "Infants",
    subTitle: "Under 2",
  },
];

interface MobileSearchBarProps {
  onSearch: (values: SearchValues) => void;
}

export default function MobileSearchBar({
  onSearch,
}: MobileSearchBarProps) {
  const [activeTab, setActiveTab] = useState<Tabs>("where");
  const [isOpen, setIsOpen] = useState(false);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const destinationInputRef = useRef<HTMLInputElement>(null);
  const wasOpenRef = useRef(false);

  const [location, setLocation] = useState("");
  const [dates, setDates] = useState<DateRange | undefined>();

  const [guests, setGuests] = useState<SearchValues["guests"]>({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [today] = useState(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  });

  useEffect(() => {
    if (!isOpen) {
      if (wasOpenRef.current) {
        wasOpenRef.current = false;
        searchButtonRef.current?.focus();
      }
      return;
    }

    wasOpenRef.current = true;
    destinationInputRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  const updateGuest = (type: keyof SearchValues["guests"], amount: number) => {
    setGuests((prev) => ({
      ...prev,
      [type]: Math.max(type === "adults" ? 1 : 0, prev[type] + amount),
    }));
  };

  const clearGuests = () => {
    setGuests({
      adults: 1,
      children: 0,
      infants: 0,
    });
  };

  const totalGuests = guests.adults + guests.children;

  const dateLabel = dates?.from
    ? `${dates.from.toLocaleDateString()}${
        dates.to ? ` - ${dates.to.toLocaleDateString()}` : ""
      }`
    : "Add dates";

  const guestLabel =
    totalGuests > 0
      ? `${totalGuests} ${totalGuests === 1 ? "guest" : "guests"}`
      : "Add guests";

  const handleSearch = () => {
    setIsOpen(false);
    onSearch({ location, dates, guests });
  };

  const clearLocation = () => {
    setLocation("");
    setActiveTab("where");
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        ref={searchButtonRef}
        aria-label="Open stay search"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => {
          setActiveTab("where");
          setIsOpen(true);
        }}
        className="md:hidden flex items-center justify-center w-full bg-white rounded-full p-4"
      >
        <Search size={14} />

        <span className="pl-4 text-[14px] leading-[18px] font-medium text-[#222]">
          Start your search
        </span>
      </button>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search for a stay"
      className="md:hidden fixed inset-0 z-[60] block h-[100dvh] w-full overflow-y-auto bg-gray-50 px-4 pb-8 pt-4"
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const focusable = event.currentTarget.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        const first = focusable.item(0);
        const last = focusable.item(focusable.length - 1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
    >
      {/* CLOSE */}
      <button
        type="button"
        aria-label="Close search"
        className="cursor-pointer flex items-center justify-center h-10 w-10 bg-white rounded-full absolute right-3"
        onClick={() => setIsOpen(false)}
      >
        <X size={16} />
      </button>

      <div className="mt-14 flex flex-col gap-3">
        {/* WHERE */}
        <div
          onClick={() => setActiveTab("where")}
          className={`bg-white rounded-2xl flex p-4 flex-col gap-3 ${
            activeTab === "where" ? "min-h-[300px]" : "min-h-auto"
          }`}
        >
          {activeTab === "where" ? (
            <div className="flex flex-col gap-5">
              <span className="text-[20px] leading-[24px] font-semibold text-[#222]">
                Where
              </span>

              {/* LOCATION INPUT */}
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                />

                <input
                  ref={destinationInputRef}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSearch();
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Search destinations"
                  className="w-full rounded-xl border p-4 pl-11 outline-none"
                />

                {location && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      clearLocation();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    aria-label="Clear location"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {/* LOCATIONS */}
              <div className="flex flex-col gap-2">
                {locations.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLocation(item.title);
                        setActiveTab("when");
                      }}
                      className="flex items-center gap-3 rounded-xl p-3 text-left hover:bg-gray-100"
                    >
                      <Icon size={20} />

                      <div>
                        <p className="font-medium">{item.title}</p>

                        <p className="text-sm text-muted-foreground">
                          {item.subTitle}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <p className="text-[14px] leading-[18px] text-[#c1c1c1] font-medium">
                Where
              </p>

              <div className="flex items-center gap-2">
                <span className="text-[14px] leading-[18px] text-[#222] font-medium">
                  {location || "I'm flexible"}
                </span>

                {location && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      clearLocation();
                    }}
                    aria-label="Clear location"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* WHEN */}
        <div
          onClick={() => setActiveTab("when")}
          className={`bg-white rounded-2xl flex p-4 flex-col gap-3 ${
            activeTab === "when" ? "min-h-[300px]" : "min-h-auto"
          }`}
        >
          {activeTab === "when" ? (
            <div className="flex flex-col gap-3">
              <span className="text-[20px] leading-[24px] font-semibold text-[#222]">
                When
              </span>

              {/* CALENDAR */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="overflow-hidden"
              >
                <Calendar
                  mode="range"
                  selected={dates}
                  onSelect={(range) => {
                    setDates(range);

                    if (range?.from && range?.to) {
                      setActiveTab("who");
                    }
                  }}
                  disabled={{ before: today }}
                  numberOfMonths={1}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <p className="text-[14px] leading-[18px] text-[#C1C1C1] font-medium">
                When
              </p>

              <span className="text-[14px] leading-[18px] text-[#222] font-medium">
                {dates?.from ? dateLabel : "I'm flexible"}
              </span>
            </div>
          )}
        </div>

        {/* WHO */}
        <div
          onClick={() => setActiveTab("who")}
          className={`bg-white rounded-2xl flex flex-col p-4 gap-3 ${
            activeTab === "who" ? "min-h-[300px]" : "min-h-auto"
          }`}
        >
          {activeTab === "who" ? (
            <div className="flex flex-col gap-5">
              <span className="text-[20px] leading-[24px] font-semibold text-[#222]">
                Who
              </span>

              {/* GUEST TYPES */}
              <div className="flex flex-col gap-5">
                {userRanges.map((user) => (
                  <div
                    key={user.id}
                    className="flex w-full items-center justify-between"
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[14px] font-medium leading-[18px]">
                        {user.title}
                      </span>

                      <p className="text-[14px] font-normal leading-[18px] text-muted-foreground">
                        {user.subTitle}
                      </p>
                    </div>

                    <div
                      className="flex items-center gap-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => updateGuest(user.id, -1)}
                        disabled={guests[user.id] <= (user.id === "adults" ? 1 : 0)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        −
                      </button>

                      <span className="min-w-4 text-center">
                        {guests[user.id]}
                      </span>

                      <button
                        type="button"
                        onClick={() => updateGuest(user.id, 1)}
                        disabled={
                          user.id === "adults"
                            ? guests.adults + guests.children >= 15 || guests.adults >= 13
                            : user.id === "children"
                              ? guests.adults + guests.children >= 15
                              : guests.infants >= 5
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-full border disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* CLEAR GUESTS */}
              {totalGuests > 0 || guests.infants > 0 ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearGuests();
                  }}
                  className="self-end text-sm underline"
                >
                  Clear guests
                </button>
              ) : null}

              {/* SEARCH */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSearch();
                }}
                className="mt-auto flex w-full items-center justify-center gap-3 rounded-xl bg-[#E41D59] p-4 text-white"
              >
                <Search size={20} />

                <span className="text-[16px] leading-[20px] font-medium">
                  Search
                </span>
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <p className="text-[14px] leading-[18px] text-[#c1c1c1] font-medium">
                Who
              </p>

              <span className="text-[14px] leading-[18px] text-[#222] font-medium">
                {totalGuests > 0 || guests.infants > 0
                  ? guestLabel
                  : "I'm flexible"}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}