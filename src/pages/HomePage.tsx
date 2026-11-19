import { Helmet }  from "react-helmet-async"
import {
  PropertyCard,
  usePropertiesQuery,
} from "@/feature/properties";
import { useState } from "react";
export default function HomePage(){
     const {
        data,
        isPending,
        isError,
        error,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
      } = usePropertiesQuery();
    const [isAccepted, setIsAccepted] = useState(false);
    const properties =
    data?.pages.flatMap((page) => page.properties) ?? [];
    return(
      <main
       className="w-full md:pt-56 p-4 h-auto min-h-screen bg-white text-black">
          <Helmet>
            <title>Lokestays | houses, apartments & more</title>
            <meta 
                  name="description"
                  content="Discover your perfect stay with lokestays" 
                  />
        </Helmet>
        <section className="mb-8 space-y-2">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Explore properties
        </h1>

        <p className="text-muted-foreground">
          Find a place that feels like home.
        </p>
      </section>

      {/* Loading state */}
      {isPending && (
        <div className="py-16 text-center text-muted-foreground">
          Loading properties...
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="py-16 text-center">
          <p className="text-destructive">
            {error.message || "Failed to load properties."}
          </p>
        </div>
      )}

      {/* Empty state */}
      {!isPending && !isError && properties.length === 0 && (
        <div className="py-16 text-center">
          <h2 className="text-lg font-semibold">
            No properties available
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            There are no approved properties to display right now.
          </p>
        </div>
      )}

      {/* Properties grid */}
      {properties.length > 0 && (
        <>
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
              />
            ))}
          </section>

          {/* Pagination */}
          {hasNextPage && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => void fetchNextPage()}
                disabled={isFetchingNextPage}
                className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isFetchingNextPage
                  ? "Loading..."
                  : "Load more properties"}
              </button>
            </div>
          )}
      <h1>home</h1>
      <div
        role="checkbox"
        aria-checked={isAccepted}
        aria-labelledby="terms-label"
        tabIndex={0}
        onClick={() => setIsAccepted((previous) => !previous)}
        onKeyDown={(event) => {
          if (event.key === " ") {
            event.preventDefault();
            setIsAccepted((previous) => !previous);
          }
        }}
        className="mt-1 h-4 w-4 cursor-pointer rounded border border-gray-400"
      >
        {isAccepted && ""}
      </div>

      <label id="terms-label" className="text-sm">
        I accept the{" "}
        <a href="/terms" className="text-[#0f766e] underline">
          Terms and Conditions
        </a>{" "}
        and{" "}
        <a href="/privacy" className="text-teal-700 underline">
          Privacy Policy
        </a>
        .
      </label>
          </>
      )}
      </main>
    );
}