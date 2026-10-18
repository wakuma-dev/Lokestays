
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import type {
  DestinationOption,
  GuestCounts,
  SearchPanel,
} from "./types/search.types";

import DestinationPanel from "./components/destination/DestinationPanel";
import DatesPanel from "./components/dates/DatesPanel";
import GuestsPanel from "./components/guests/GuestsPanel";

interface SearchDialogProps {
  open: boolean;
  activePanel: SearchPanel;
  destinationQuery: string;
  selectedDestination: DestinationOption | null;
  checkIn: string | null;
  checkOut: string | null;
  guests: GuestCounts;
  today: Date;
  onDestinationQueryChange: (query: string) => void;
  onSelectDestination: (destination: DestinationOption) => void;
  onSelectDate: (date: string) => void;
  onClearDates: () => void;
  onGuestChange: (guestType: keyof GuestCounts, count: number) => void;
  onPanelChange: (panel: SearchPanel) => void;
  onClose: () => void;
  onSearch: () => void;
}

export default function SearchDialog({
  open,
  activePanel,
  destinationQuery,
  selectedDestination,
  checkIn,
  checkOut,
  guests,
  today,
  onDestinationQueryChange,
  onSelectDestination,
  onSelectDate,
  onClearDates,
  onGuestChange,
  onPanelChange,
  onClose,
  onSearch,
}: SearchDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocusedElement = document.activeElement;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;

      if (
        previouslyFocusedElement instanceof HTMLElement &&
        previouslyFocusedElement.isConnected
      ) {
        previouslyFocusedElement.focus();
      }
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") {
    return null;
  }

  const handleBackdropMouseDown = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleSearch = () => {
    onSearch();
    onClose();
  };

  const panelTitle =
    activePanel === "destination"
      ? "Find your destination"
      : activePanel === "dates"
        ? "Choose your dates"
        : activePanel === "guests"
          ? "Add guests"
          : "Search stays";

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 p-0 backdrop-blur-[2px] sm:items-center sm:p-4"
      onMouseDown={handleBackdropMouseDown}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-dialog-title"
        className="flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:max-h-[88vh] sm:rounded-3xl"
      >
        <header className="flex shrink-0 items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6">
          <h2
            id="search-dialog-title"
            className="text-base font-semibold text-gray-900"
          >
            {panelTitle}
          </h2>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close search dialog"
            className="flex size-9 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            <X size={19} aria-hidden="true" />
          </button>
        </header>

        <nav
          aria-label="Search categories"
          className="grid shrink-0 grid-cols-3 border-b border-gray-100 px-3 sm:px-5"
        >
          <DialogTab
            active={activePanel === "destination"}
            label="Where"
            value={
              selectedDestination?.label ||
              destinationQuery ||
              "Destination"
            }
            onClick={() => onPanelChange("destination")}
          />

          <DialogTab
            active={activePanel === "dates"}
            label="When"
            value={
              checkIn && checkOut
                ? `${checkIn} – ${checkOut}`
                : "Add dates"
            }
            onClick={() => onPanelChange("dates")}
          />

          <DialogTab
            active={activePanel === "guests"}
            label="Who"
            value={`${guests.adults + guests.children} ${
              guests.adults + guests.children === 1
                ? "guest"
                : "guests"
            }`}
            onClick={() => onPanelChange("guests")}
          />
        </nav>

        <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-5">
          {activePanel === "destination" && (
            <DestinationPanel
              query={destinationQuery}
              selectedDestination={selectedDestination}
              onQueryChange={onDestinationQueryChange}
              onSelectDestination={onSelectDestination}
              onClose={onClose}
            />
          )}

          {activePanel === "dates" && (
            <DatesPanel
              checkIn={checkIn}
              checkOut={checkOut}
              today={today}
              onSelectDate={onSelectDate}
              onClearDates={onClearDates}
            />
          )}

          {activePanel === "guests" && (
            <GuestsPanel
              guests={guests}
              onChange={onGuestChange}
            />
          )}
        </div>

        <footer className="flex shrink-0 items-center justify-between gap-4 border-t border-gray-100 bg-white px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={() => {
              onDestinationQueryChange("");
              onClearDates();
            }}
            className="rounded-lg px-2 py-2 text-sm font-medium text-gray-700 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            Clear search
          </button>

          <button
            type="button"
            onClick={handleSearch}
            className="rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            <span>Search stays</span>
          </button>
        </footer>
      </div>
    </div>,
    document.body,
  );
}

interface DialogTabProps {
  active: boolean;
  label: string;
  value: string;
  onClick: () => void;
}

function DialogTab({
  active,
  label,
  value,
  onClick,
}: DialogTabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "min-w-0 border-b-2 px-2 py-3 text-left transition-colors sm:px-3",
        active ? "border-gray-900" : "border-transparent",
      ].join(" ")}
    >
      <span className="block text-xs font-medium text-gray-500">
        {label}
      </span>

      <span
        className={[
          "mt-1 block truncate text-sm",
          active
            ? "font-semibold text-gray-900"
            : "font-medium text-gray-700",
        ].join(" ")}
      >
        {value}
      </span>
    </button>
  );
}
