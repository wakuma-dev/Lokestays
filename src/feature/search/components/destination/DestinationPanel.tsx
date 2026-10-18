import { useMemo, useState, type KeyboardEvent } from "react";
import { Clock3, MapPin, Search, X } from "lucide-react";

import type { DestinationOption } from "../../types/search.types";
import { useDestinationSuggestions } from "../../hooks/useDestinationSuggestions";
import { useRecentDestinations } from "../../hooks/useRecentDestinations";

interface DestinationPanelProps {
  query: string;
  selectedDestination: DestinationOption | null;
  onQueryChange: (query: string) => void;
  onSelectDestination: (destination: DestinationOption) => void;
  onClose?: () => void;
}

export default function DestinationPanel({
  query,
  selectedDestination,
  onQueryChange,
  onSelectDestination,
  onClose,
}: DestinationPanelProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const {
    suggestions,
    isLoading,
    error,
  } = useDestinationSuggestions({
    query,
    enabled: true,
  });

  const {
    recentDestinations,
    addRecentDestination,
  } = useRecentDestinations();

  const normalizedQuery = query.trim();

  const destinations = useMemo(() => {
    if (normalizedQuery) {
      return suggestions;
    }

    const seenIds = new Set<string>();

    return [...recentDestinations, ...suggestions].filter(
      (destination) => {
        if (seenIds.has(destination.id)) {
          return false;
        }

        seenIds.add(destination.id);
        return true;
      },
    );
  }, [normalizedQuery, recentDestinations, suggestions]);

  const handleSelect = (destination: DestinationOption) => {
    addRecentDestination(destination);
    onSelectDestination(destination);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      onClose?.();
      return;
    }

    if (destinations.length === 0) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      setActiveIndex((currentIndex) =>
        currentIndex >= destinations.length - 1
          ? 0
          : currentIndex + 1,
      );

      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setActiveIndex((currentIndex) =>
        currentIndex <= 0
          ? destinations.length - 1
          : currentIndex - 1,
      );

      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();

      const destination = destinations[activeIndex];

      if (destination) {
        handleSelect(destination);
      }
    }
  };

  const handleQueryChange = (value: string) => {
    setActiveIndex(0);
    onQueryChange(value);
  };

  return (
    <section
      aria-label="Choose a destination"
      className="w-full overflow-hidden rounded-2xl bg-white"
    >
      <div className="border-b border-gray-100 p-4">
        <label
          htmlFor="destination-search"
          className="mb-3 block text-sm font-semibold text-gray-900"
        >
          Where to?
        </label>

        <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-3 transition-colors focus-within:border-gray-900">
          <Search
            size={19}
            aria-hidden="true"
            className="shrink-0 text-gray-500"
          />

          <input
            id="destination-search"
            type="text"
            value={query}
            onChange={(event) =>
              handleQueryChange(event.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="Search destinations"
            autoComplete="off"
            aria-label="Search destinations"
            aria-controls="destination-options"
            className="min-w-0 flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
          />

          {query.length > 0 && (
            <button
              type="button"
              onClick={() => handleQueryChange("")}
              aria-label="Clear destination search"
              className="flex size-7 shrink-0 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              <X size={16} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <div className="p-2">
        {!normalizedQuery && recentDestinations.length > 0 && (
          <div className="mb-2">
            <h3 className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Recent destinations
            </h3>

            <ul className="space-y-1">
              {recentDestinations.map((destination) => (
                <li key={`recent-${destination.id}`}>
                  <DestinationOptionButton
                    destination={destination}
                    icon="recent"
                    selected={
                      selectedDestination?.id === destination.id
                    }
                    onSelect={handleSelect}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h3 className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
            {normalizedQuery
              ? "Search results"
              : recentDestinations.length > 0
                ? "Popular destinations"
                : "Explore destinations"}
          </h3>

          {isLoading ? (
            <div
              role="status"
              className="px-3 py-6 text-center text-sm text-gray-500"
            >
              Searching destinations…
            </div>
          ) : error ? (
            <div
              role="alert"
              className="px-3 py-6 text-center text-sm text-red-600"
            >
              Unable to load destinations. Please try again.
            </div>
          ) : destinations.length === 0 ? (
            <div className="px-3 py-8 text-center">
              <MapPin
                size={24}
                aria-hidden="true"
                className="mx-auto mb-2 text-gray-400"
              />

              <p className="text-sm font-medium text-gray-900">
                No destinations found
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Try another city or destination.
              </p>
            </div>
          ) : (
            <ul id="destination-options" className="space-y-1">
              {destinations.map((destination, index) => (
                <li key={destination.id}>
                  <DestinationOptionButton
                    destination={destination}
                    icon="destination"
                    selected={
                      selectedDestination?.id === destination.id
                    }
                    highlighted={activeIndex === index}
                    onSelect={handleSelect}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

interface DestinationOptionButtonProps {
  destination: DestinationOption;
  icon: "recent" | "destination";
  selected: boolean;
  highlighted?: boolean;
  onSelect: (destination: DestinationOption) => void;
}

function DestinationOptionButton({
  destination,
  icon,
  selected,
  highlighted = false,
  onSelect,
}: DestinationOptionButtonProps) {
  const Icon = icon === "recent" ? Clock3 : MapPin;

  return (
    <button
      type="button"
      onClick={() => onSelect(destination)}
      aria-pressed={selected}
      className={[
        "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gray-900",
        highlighted || selected
          ? "bg-gray-100"
          : "hover:bg-gray-50",
      ].join(" ")}
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600">
        <Icon size={19} aria-hidden="true" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-gray-900">
          {destination.label}
        </span>

        {destination.subtitle && (
          <span className="mt-0.5 block truncate text-xs text-gray-500">
            {destination.subtitle}
          </span>
        )}
      </span>

      {selected && (
        <span className="shrink-0 text-xs font-medium text-gray-600">
          Selected
        </span>
      )}
    </button>
  );
}
