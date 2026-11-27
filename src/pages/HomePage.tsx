import { Helmet } from "react-helmet-async";
import { PropertyCollections, usePropertiesQuery } from "@/feature/properties";
export default function HomePage() {
  const {
    data,
    isPending,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = usePropertiesQuery();

  const properties =
    data?.pages.flatMap((page) => page.properties) ?? [];

  return (
    <main className="min-h-screen w-full bg-white max-w-[1600px] mx-auto p-4 md:px-8 lg:px-12  text-black pt-20 md:pt-56">
      <Helmet>
        <title>Lokestays | Houses, Apartments & More</title>
        <meta
          name="description"
          content="Discover your perfect stay with Lokestays."
        />
      </Helmet>

      {isPending && (
        <div className="py-16 text-center text-muted-foreground">
          Loading properties...
        </div>
      )}

      {isError && (
        <div className="py-16 text-center">
          <p className="text-destructive">
            {error.message || "Failed to load properties."}
          </p>
        </div>
      )}

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

      {!isPending && !isError && properties.length > 0 && (
        <>
          <PropertyCollections
            properties={properties}
            onSelectProperty={() => undefined}
          />

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
        </>
      )}
    </main>
  );
}