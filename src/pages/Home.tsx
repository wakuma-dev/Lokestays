import { Helmet } from "react-helmet-async";
import { AlertCircle, RefreshCw} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyCollections, usePropertiesQuery, PropertySkeleton } from "@/feature/properties";
export default function Home() {
  const {
    data,
    isPending,
    isError,
    error,
    refetch,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = usePropertiesQuery();

  const properties = data?.pages.flatMap((page) => page.properties) ?? [];
  return (
    <main className="h-auto min-h-screen w-full bg-white max-w-[1600px] mx-auto p-4 md:px-8 lg:px-12  text-black pt-14 md:pt-56">
      <Helmet>
        <title>Lokestays | Houses, Apartments & More</title>
        <meta
          name="description"
          content="Discover your perfect stay with Lokestays."
        />
      </Helmet>
     {isPending && (
        <PropertySkeleton />
      )}

      {isError && (
        <main className="p-4 bg-[#ffffff] min-w-0 text-black text-center">
          <section className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
            <AlertCircle className="text-destructive size-10" />
            <div className="flex flex-col items-center text-center gap-2">
              <h2 className="text-[18px] leading-[24px] font-medium">Unable to load property</h2>
              <p className="text-[14px] leading-[20px] text-muted-foreground">
              {error instanceof Error
                ? error.message
                : "This property doesn't exist or something went wrong while loading it."}
            </p>
            <Button 
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}>
                <RefreshCw className={`size-4 ${isFetching ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </section>
         </main>
      )}

      {!isPending && !isError && properties.length === 0 && (
        <main className="p-4 bg-[#ffffff] min-w-0 text-black text-center">
        <section className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <AlertCircle className="text-muted-foreground size-10" />
        <div className="flex flex-col items-center text-center gap-2">
          <h2 className="text-[18px] leading-[24px] font-medium">No properties available</h2>
          <p className="text-[14px] leading-[20px] text-muted-foreground">These properties don't exist or its no longer available</p>
        </div>
       </section>
        </main>
      )}

      {!isPending && !isError && properties.length > 0 && (
        <section className="">
          <PropertyCollections
            properties={properties}
            onSelectProperty={() => undefined}
          />

          {hasNextPage && (
            <div className="mt-10  flex justify-center">
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
        </section>
      )}
    </main>
  );
}