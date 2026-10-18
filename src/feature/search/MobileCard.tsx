
import { Search, SlidersHorizontal } from "lucide-react";

interface MobileCardProps {
  destinationSummary: string;
  dateSummary: string;
  guestSummary: string;
  onOpenSearch: () => void;
  onOpenFilters?: () => void;
}

export default function MobileCard({
  destinationSummary,
  dateSummary,
  guestSummary,
  onOpenSearch,
  onOpenFilters,
}: MobileCardProps) {
  return (
    <div className="flex w-full items-center gap-3">
      <button
        type="button"
        onClick={onOpenSearch}
        aria-label={`Edit search. ${destinationSummary}. ${dateSummary}. ${guestSummary}.`}
        className="flex min-h-[64px] min-w-0 flex-1 items-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-3 text-left shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
      >
        <Search
          size={21}
          aria-hidden="true"
          className="shrink-0 text-gray-900"
        />

        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-gray-900">
            {destinationSummary || "Where to?"}
          </span>

          <span className="mt-1 block truncate text-xs text-gray-500">
            {[dateSummary, guestSummary]
              .filter(Boolean)
              .join(" · ") || "Add dates and guests"}
          </span>
        </span>
      </button>

      {onOpenFilters && (
        <button
          type="button"
          onClick={onOpenFilters}
          aria-label="Open search filters"
          className="flex size-12 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          <SlidersHorizontal size={19} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
