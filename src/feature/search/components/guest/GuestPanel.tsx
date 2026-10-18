import { Minus, Plus, Users, X } from "lucide-react";

import type { GuestCounts } from "../../types/search.types";
import {
  GUEST_LABELS,
  GUEST_LIMITS,
  GUEST_TYPES,
} from "../../constants/search.constants";

interface GuestsPanelProps {
  guests: GuestCounts;
  onChange: (guestType: keyof GuestCounts, count: number) => void;
  onClose?: () => void;
}

export default function GuestsPanel({
  guests,
  onChange,
  onClose,
}: GuestsPanelProps) {
  const totalGuests = guests.adults + guests.children;

  return (
    <section
      aria-label="Choose guests"
      className="w-full overflow-hidden rounded-2xl bg-white"
    >
      <header className="flex items-start justify-between gap-4 border-b border-gray-100 p-5">
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Who's coming?
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {totalGuests} {totalGuests === 1 ? "guest" : "guests"}
            {guests.infants > 0 &&
              ` · ${guests.infants} ${guests.infants === 1 ? "infant" : "infants"}`}
            {guests.pets > 0 &&
              ` · ${guests.pets} ${guests.pets === 1 ? "pet" : "pets"}`}
          </p>
        </div>

        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-700">
          <Users size={19} aria-hidden="true" />
        </span>
      </header>

      <div className="divide-y divide-gray-100 px-5">
        {GUEST_TYPES.map((guestType) => {
          const value = guests[guestType];
          const limits = GUEST_LIMITS[guestType];
          const label = GUEST_LABELS[guestType];

          const canDecrease = value > limits.min;
          const canIncrease = value < limits.max;

          return (
            <div
              key={guestType}
              className="flex items-center justify-between gap-4 py-5"
            >
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-gray-900">
                  {label.plural.charAt(0).toUpperCase() +
                    label.plural.slice(1)}
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  {label.description}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <button
                  type="button"
                  disabled={!canDecrease}
                  onClick={() =>
                    onChange(guestType, value - 1)
                  }
                  aria-label={`Remove one ${label.singular}`}
                  className="flex size-9 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition-colors hover:border-gray-900 hover:bg-gray-50 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-300"
                >
                  <Minus size={16} aria-hidden="true" />
                </button>

                <output
                  aria-label={`${label.plural} count`}
                  aria-live="polite"
                  className="w-5 text-center text-sm font-medium text-gray-900"
                >
                  {value}
                </output>

                <button
                  type="button"
                  disabled={!canIncrease}
                  onClick={() =>
                    onChange(guestType, value + 1)
                  }
                  aria-label={`Add one ${label.singular}`}
                  className="flex size-9 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition-colors hover:border-gray-900 hover:bg-gray-50 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-300"
                >
                  <Plus size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <footer className="flex items-center justify-between gap-4 border-t border-gray-100 px-5 py-4">
        <p className="text-xs text-gray-500">
          You can review the property's guest limits before booking.
        </p>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            <X size={15} aria-hidden="true" />
            Done
          </button>
        )}
      </footer>
    </section>
  );
}
