import { useRef, useState } from "react";
import { useParams } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Share2, Heart } from "lucide-react";
import { usePropertyQuery } from "@/feature/properties";
import { AlertCircle, RefreshCw} from "lucide-react";
import { Button } from "@/components/ui/button";
import ProfileDetailsSkeleton from "./ProfileDetailsSkeleton";
const currencyFormatter = new Intl.NumberFormat("en-ET", {
  style: "currency",
  currency: "ETB",
  maximumFractionDigits: 0,
});
export default function PropertyDetails() {
  const { propertyId } = useParams({
    from: "/_main/properties/$propertyId",
  });
  const {
    data: property,
    isPending,
    isError,
    error,
    isFetching,
    refetch
  } = usePropertyQuery({ propertyId });
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  if (isPending) {
   return <ProfileDetailsSkeleton />
  }
 if (isError) {
    return (
      <main className="p-4 bg-[#ffffff] min-w-0 text-black text-center">
        <section className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
          <AlertCircle className="text-destructive size-10" />
          <div className="flex flex-col items-center text-center gap-2">
              <h2 className="text-[18px] leading-[24px] font-medium">Unable to load property</h2>
              <p role="alert" 
                 className="text-[14px] leading-[20px] text-muted-foreground">
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
    );
  }
if (!property) {
    return (
      <main className="p-4 bg-[#ffffff] min-w-0 text-black text-center">
      <section className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <AlertCircle className="text-muted-foreground size-10" />
        <div className="flex flex-col items-center text-center gap-2">
          <h2 className="text-[18px] leading-[24px] font-medium">Property not found</h2>
          <p role="alert"
            className="text-[14px] leading-[20px] text-muted-foreground">
              This property may no longer be available.
          </p>
        </div>
       </section>
      </main>
    );
  }
const propertyType = property.structure?.trim() || property.privacyType?.trim() || "Stay";
const city = property.location?.city;
const title = city ? `${propertyType} in ${city}` : propertyType;
const photos = [...property.photos].sort(
    (first, second) => first.position - second.position,
  );

const handleGalleryScroll = () => {
    const gallery = galleryRef.current;
    if (!gallery || gallery.clientWidth === 0) return;
    const index = Math.round(
      gallery.scrollLeft / gallery.clientWidth,
    );
    setCurrentPhotoIndex(
      Math.min(Math.max(index, 0), photos.length - 1),
    );
  };

  // Share property.
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: "Check out this property on Lokestays.",
          url: window.location.href,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch (shareError) {
      if (
        shareError instanceof Error &&
        shareError.name !== "AbortError"
      ) {
        console.error("Unable to share property:", shareError);
      }
    }
  };

  const locationText = property.location
    ? [
        property.location.neighborhood,
        property.location.city,
        property.location.address,
      ]
        .filter(Boolean)
        .join(", ")
    : "";

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-0 pt-28 sm:px-4 sm:pt-40">
      <Helmet>
        <title>{title} | Lokestays</title>
      </Helmet>
    <div className="hidden md:block">
        <h1 className="text-[26px] font-semibold leading-[30px] tracking-tight text-[#222222] sm:text-3xl">
          {title}
        </h1>
       </div>
  {photos.length > 0 && (
        <section className="relative mt-0 sm:hidden">
          <div
            ref={galleryRef}
            onScroll={handleGalleryScroll}
            className="
              flex w-full
              snap-x snap-mandatory
              overflow-x-auto
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className="w-full shrink-0 snap-center"
              >
                <img
                  src={photo.url}
                  alt={`${title} - Photo ${index + 1}`}
                  draggable={false}
                  className="aspect-[1.12] w-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Back, share and favorite controls */}
          <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => window.history.back()}
              aria-label="Go back"
              className="flex size-12 items-center justify-center rounded-full bg-white/75 backdrop-blur-md"
            >
              <ArrowLeft className="size-6" />
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleShare}
                aria-label="Share property"
                className="flex size-12 items-center justify-center rounded-full bg-white/75 backdrop-blur-md"
              >
                <Share2 className="size-5" />
              </button>

              <button
                type="button"
                onClick={() => setIsFavorite((previous) => !previous)}
                aria-label={
                  isFavorite
                    ? "Remove from favorites"
                    : "Add to favorites"
                }
                aria-pressed={isFavorite}
                className="flex size-12 items-center justify-center rounded-full bg-white/75 backdrop-blur-md"
              >
                <Heart
                  className={`size-5 ${
                    isFavorite
                      ? "fill-red-500 text-red-500"
                      : "text-[#222222]"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Photo counter */}
          <div className="absolute bottom-5 right-4 rounded-md bg-black/60 px-3 py-1 text-sm font-semibold text-white">
            {currentPhotoIndex + 1} / {photos.length}
          </div>
        </section>
      )}

      {/* DESKTOP: Original five-image collage */}
      {photos.length > 0 && (
        <section className="mt-6 hidden gap-3 sm:grid sm:grid-cols-4 sm:grid-rows-2">
          {photos.slice(0, 5).map((photo, index) => (
            <img
              key={photo.id}
              src={photo.url}
              alt={`${title} - Photo ${index + 1}`}
              className={`h-full min-h-0 w-full object-cover ${
                index === 0
                  ? "col-span-2 row-span-2 aspect-[4/3] rounded-l-xl sm:aspect-auto"
                  : "aspect-[4/3]"
              }`}
            />
          ))}
        </section>
      )}

      {/* MOBILE: Overlapping property information card */}
      <section className="relative z-10 -mt-6 rounded-t-[28px] bg-white px-5 pb-10 pt-8 sm:hidden">
        <h1 className="text-center text-2xl font-semibold leading-tight tracking-tight text-[#222222]">
          {title}
        </h1>

        {locationText && (
          <p className="mt-5 text-center text-muted-foreground">
            {locationText}
          </p>
        )}

        <p className="mt-2 text-center text-muted-foreground">
          {property.guestCapacity} guests · {property.bedrooms} bedrooms ·{" "}
          {property.beds} beds · {property.bathrooms} baths
        </p>

        <div className="mt-8 border-t border-border pt-6">
          <p className="text-xl font-semibold">
            {currencyFormatter.format(property.pricePerNight)}
            <span className="ml-1 text-sm font-normal text-muted-foreground">
              per night
            </span>
          </p>
        </div>

        {property.amenities.length > 0 && (
          <div className="mt-8 border-t border-border pt-6">
            <h2 className="text-xl font-semibold">
              What this place offers
            </h2>

            <ul className="mt-4 flex flex-wrap gap-2">
              {property.amenities.map((amenity) => (
                <li
                  key={amenity}
                  className="rounded-full bg-muted px-3 py-1 text-sm"
                >
                  {amenity}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* DESKTOP: Original property information */}
      <section className="mt-6 hidden space-y-4 sm:block">
        <p className="text-lg font-semibold">
          {currencyFormatter.format(property.pricePerNight)} per night
        </p>

        <p>
          {property.guestCapacity} guests · {property.bedrooms} bedrooms ·{" "}
          {property.beds} beds · {property.bathrooms} bathrooms
        </p>

        {property.amenities.length > 0 && (
          <div>
            <h2 className="font-semibold">Amenities</h2>

            <ul className="mt-2 flex flex-wrap gap-2">
              {property.amenities.map((amenity) => (
                <li
                  key={amenity}
                  className="rounded-full bg-muted px-3 py-1 text-sm"
                >
                  {amenity}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </main>
  );
}