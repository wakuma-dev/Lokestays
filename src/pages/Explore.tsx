import { format, parseISO } from "date-fns";
import { Helmet } from "react-helmet-async";
import { Route } from "@/routes/explore";
import { useSearchProperties } from "@/feature/search";

export default function Explore() {
  const search = Route.useSearch();
  const {
    data,
    isPending,
    isError,
    error,
    refetch,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = useSearchProperties({ destination: search.destination });
  const properties = data?.pages.flatMap((page) => page.properties) ?? [];

  const stayDates =
    search.checkIn && search.checkOut
      ? `${format(parseISO(search.checkIn), "MMM d")} – ${format(parseISO(search.checkOut), "MMM d")}`
      : search.checkIn
        ? `Check-in ${format(parseISO(search.checkIn), "MMM d")}`
        : undefined;
  const guestCount = search.adults + search.children;

  return (
    <main className="min-h-screen bg-white px-4 pb-16 pt-36 text-gray-900 md:px-8 md:pt-44">
      <Helmet>
        <title>
          {search.destination
            ? `Stays in ${search.destination}`
            : "Explore stays"}{" "}
          | Lokestays
        </title>
        <meta
          name="description"
          content="Explore approved stays and find a place for your next trip."
        />
      </Helmet>

      <section className="mx-auto max-w-7xl">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {search.destination
                ? `Stays in ${search.destination}`
                : "Explore stays"}
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              {stayDates ? `${stayDates} · ` : ""}
              {guestCount} {guestCount === 1 ? "guest" : "guests"}
            </p>
          </div>
          {!isPending && properties.length > 0 && (
            <p className="text-sm text-gray-600" aria-live="polite">
              {properties.length} {properties.length === 1 ? "stay" : "stays"}
              {hasNextPage ? " loaded" : ""}
            </p>
          )}
        </div>

        <p className="mb-6 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-600">
          Results include approved listings matched by city. Date and guest
          details are saved in your search; availability filtering requires
          listing availability data.
        </p>

        {isPending && (
          <div
            role="status"
            aria-live="polite"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {Array.from({ length: 8 }, (_, index) => (
              <div
                key={index}
                className="animate-pulse"
                aria-hidden="true"
              >
                <div className="aspect-[4/3] rounded-2xl bg-gray-200" />
                <div className="mt-4 h-4 w-2/3 rounded bg-gray-200" />
                <div className="mt-2 h-4 w-1/2 rounded bg-gray-100" />
              </div>
            ))}
            <span className="sr-only">Loading stays…</span>
          </div>
        )}

        {isError && properties.length === 0 && (
          <div
            role="alert"
            className="rounded-2xl border border-red-200 bg-red-50 p-6"
          >
            <h2 className="font-semibold text-red-900">
              We couldn’t load stays right now
            </h2>
            <p className="mt-2 text-sm text-red-800">
              {error instanceof Error
                ? error.message
                : "Please check your connection and try again."}
            </p>
            <button
              type="button"
              onClick={() => void refetch()}
              disabled={isFetching}
              className="mt-4 rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800 disabled:opacity-60"
            >
              {isFetching ? "Retrying…" : "Try again"}
            </button>
          </div>
        )}

        {!isPending && properties.length === 0 && !isError && (
          <div className="rounded-2xl border border-dashed border-gray-300 px-6 py-16 text-center">
            <h2 className="text-lg font-semibold">No stays found</h2>
            <p className="mt-2 text-sm text-gray-600">
              {search.destination
                ? `There are no approved listings for ${search.destination} yet. Try another city.`
                : "There are no approved listings to show yet."}
            </p>
          </div>
        )}

        {!isPending && properties.length > 0 && (
          <ul className="grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {properties.map((property) => (
              <li key={property.id} className="min-w-0">
                {property.photos[0] ? (
                  <img
                    src={property.photos[0]}
                    alt={property.title ?? `Stay in ${property.city ?? "Ethiopia"}`}
                    loading="lazy"
                    className="aspect-[4/3] w-full rounded-2xl bg-gray-100 object-cover"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-gradient-to-br from-rose-50 to-orange-100 text-sm text-gray-500"
                  >
                    Stay in {property.city ?? "Ethiopia"}
                  </div>
                )}
                <div className="mt-3">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-medium">
                      {property.title ?? `Stay in ${property.city ?? "Ethiopia"}`}
                    </h2>
                    {property.price !== undefined && (
                      <span className="shrink-0 text-sm font-medium">
                        {property.price.toLocaleString()}
                      </span>
                    )}
                  </div>
                  {property.city && (
                    <p className="mt-1 text-sm text-gray-600">
                      {property.city}
                    </p>
                  )}
                  {property.description && (
                    <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                      {property.description}
                    </p>
                  )}
                  {property.bedrooms !== undefined && (
                    <p className="mt-1 text-sm text-gray-500">
                      {property.bedrooms}{" "}
                      {property.bedrooms === 1 ? "bedroom" : "bedrooms"}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}

        {isFetchNextPageError && (
          <p role="alert" className="mt-6 text-sm text-red-700">
            Couldn’t load more stays.{" "}
            <button
              type="button"
              onClick={() => void fetchNextPage()}
              className="font-medium underline"
            >
              Try again
            </button>
          </p>
        )}

        {hasNextPage && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => void fetchNextPage()}
              disabled={isFetchingNextPage}
              className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-medium hover:border-gray-500 disabled:cursor-wait disabled:opacity-60"
            >
              {isFetchingNextPage ? "Loading more stays…" : "Show more stays"}
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
