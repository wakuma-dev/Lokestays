import { BedDouble, Bath, Users, MapPin } from "lucide-react";
import type { Properties } from "../schema/propertiesSchema";

interface PropertyCardProps {
  property: Properties;
  onSelect?: (propertyId: string) => void;
}

const currencyFormatter = new Intl.NumberFormat("en-ET", {
  style: "currency",
  currency: "ETB",
  maximumFractionDigits: 0,
});

export default function PropertyCard({
  property,
  onSelect,
}: PropertyCardProps) {
  const coverPhoto = [...property.photos].sort(
    (first, second) => first.position - second.position,
  )[0];

  const location = property.location
    ? [
        property.location.neighborhood,
        property.location.city,
      ]
        .filter(Boolean)
        .join(", ")
    : "Location unavailable";

  return (
    <article className="group w-full overflow-hidden rounded-xl border border-border bg-card transition-shadow duration-200 hover:shadow-md">
      <button
        type="button"
        onClick={() => onSelect?.(property.id)}
        disabled={!onSelect}
        aria-label={`View property in ${location}`}
        className="block w-full text-left disabled:cursor-default"
      >
        {/* Property image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
          {coverPhoto ? (
            <img
              src={coverPhoto.url}
              alt={`Property in ${location}`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
              No image available
            </div>
          )}

          <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
            Approved
          </span>
        </div>

        {/* Property information */}
        <div className="space-y-3 p-4">
          {/* Location and price */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />

                <span className="truncate">{location}</span>
              </div>

              {property.structure && (
                <h3 className="mt-1 truncate text-base font-semibold text-foreground">
                  {property.structure}
                </h3>
              )}
            </div>

            <div className="shrink-0 text-right">
              <p className="font-semibold text-foreground">
                {currencyFormatter.format(property.pricePerNight)}
              </p>

              <p className="text-xs text-muted-foreground">
                per night
              </p>
            </div>
          </div>

          {/* Property features */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              <span>{property.guestCapacity} guests</span>
            </div>

            <div className="flex items-center gap-1.5">
              <BedDouble className="h-4 w-4" />
              <span>
                {property.bedrooms} bedrooms · {property.beds} beds
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Bath className="h-4 w-4" />
              <span>{property.bathrooms} baths</span>
            </div>
          </div>
        </div>
      </button>
    </article>
  );
}