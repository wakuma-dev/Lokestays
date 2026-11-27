import { useParams } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";
import { usePropertyQuery } from "@/feature/properties";

const currencyFormatter = new Intl.NumberFormat("en-ET", {
  style: "currency",
  currency: "ETB",
  maximumFractionDigits: 0,
});

export default function PropertyDetails() {
  const { propertyId } = useParams({ from: "/_main/properties/$propertyId" });
  const { data: property, isPending, isError, error } = usePropertyQuery({
    propertyId,
  });

  if (isPending) {
    return (
      <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-8">
        <p role="status" className="text-muted-foreground">
          Loading property...
        </p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mx-auto mt-32 min-h-screen w-full max-w-5xl px-4 py-8">
        <p role="alert" className="text-destructive">
          {error.message || "Failed to load this property."}
        </p>
      </main>
    );
  }

  if (!property) {
    return (
      <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-semibold">Property not found</h1>
        <p className="mt-2 text-muted-foreground">
          This property may no longer be available.
        </p>
      </main>
    );
  }

  const propertyType =
    property.structure?.trim() || property.privacyType?.trim() || "Stay";
  const city = property.location?.city;
  const title = city ? `${propertyType} in ${city}` : propertyType;
  const photos = [...property.photos].sort(
    (first, second) => first.position - second.position,
  );

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-8">
      <Helmet>
        <title>{title} | Lokestays</title>
      </Helmet>

      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h1>
      {property.location && (
        <p className="mt-2 text-muted-foreground">
          {[
            property.location.neighborhood,
            property.location.city,
            property.location.address,
          ]
            .filter(Boolean)
            .join(", ")}
        </p>
      )}

      {photos.length > 0 && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {photos.slice(0, 5).map((photo) => (
            <img
              key={photo.id}
              src={photo.url}
              alt={title}
              className="aspect-[4/3] w-full rounded-xl object-cover"
            />
          ))}
        </div>
      )}

      <section className="mt-6 space-y-4">
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