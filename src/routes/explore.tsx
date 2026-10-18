import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useMemo } from "react";
import { MapPin } from "lucide-react";

import { SearchBar } from "@/feature/search";
import {
  deserializeSearch,
  serializeSearch,
} from "@/feature/search/utils/search-serialization";
import { exploreSearchSchema } from "@/feature/search/schema/exploreSearchSchema";

export const Route = createFileRoute("/explore")({
  validateSearch: (search: Record<string, unknown>) => {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(search)) {
      if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
      ) {
        params.set(key, String(value));
      }
    }

    return exploreSearchSchema.parse(
      deserializeSearch(params),
    );
  },
  component: ExplorePage,
});

function ExplorePage() {
  const navigate = useNavigate({ from: "/explore" });
  const searchParams = Route.useSearch();

  const initialSearch = useMemo(
    () => searchParams,
    [searchParams],
  );

  const handleSearch = useCallback(
    (search: Parameters<typeof serializeSearch>[0]) => {
      const params = serializeSearch(search);

      void navigate({
        search: Object.fromEntries(params.entries()) as any,
        replace: false,
      });
    },
    [navigate],
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Find your next stay
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
            Discover comfortable places to stay across Ethiopia.
            Choose your destination, travel dates, and guests to
            start exploring.
          </p>
        </div>

        <SearchBar
          initialSearch={initialSearch}
          onSearch={handleSearch}
        />
      </section>

      <section
        aria-labelledby="explore-empty-state-title"
        className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"
      >
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-gray-100 text-gray-600">
            <MapPin size={25} aria-hidden="true" />
          </span>

          <h2
            id="explore-empty-state-title"
            className="mt-5 text-lg font-semibold text-gray-900"
          >
            Your next stay starts here
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
            Search for a destination to start discovering stays.
            Approved property listings will appear here when your
            listings integration is connected.
          </p>
        </div>
      </section>
    </main>
  );
}
