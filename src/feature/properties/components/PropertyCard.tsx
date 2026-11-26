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
  const propertyType =
    property.structure?.trim() || property.privacyType?.trim() || "Stay";
  const city = property.location?.city;
  const title = city ? `${propertyType} in ${city}` : propertyType;

  return (
    <article className="group w-full">
      <button
        type="button"
        onClick={() => onSelect?.(property.id)}
        disabled={!onSelect}
        aria-label={`View ${title}, ${location}`}
        className="block w-full text-left disabled:cursor-default"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted">
          {coverPhoto ? (
            <img
              src={coverPhoto.url}
              alt={title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
              No image available
            </div>
          )}
        </div>

        <div className="space-y-1 pt-3">
          <h3 className="truncate text-sm font-semibold text-foreground">
            {title}
          </h3>
          <p className="truncate text-sm text-muted-foreground">
            {location}
          </p>
          <p className="pt-1 text-sm text-foreground">
            <span className="font-semibold">
              {currencyFormatter.format(property.pricePerNight)}
            </span>{" "}
            <span className="text-muted-foreground">night</span>
          </p>
        </div>
      </button>
    </article>
  );
}