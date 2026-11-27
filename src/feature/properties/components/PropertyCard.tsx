import type { Properties } from "../schema/propertiesSchema";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/feature/auth";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
interface PropertyCardProps {
  property: Properties;
  onSelect?: (propertyId: string) => void;
 isFavorite?: boolean;
  onFavoriteToggle?: (propertyId: string) => void;
}
const currencyFormatter = new Intl.NumberFormat("en-ET", {
  style: "currency",
  currency: "ETB",
  maximumFractionDigits: 0,
});
export default function PropertyCard({
  property,
  onSelect,
  isFavorite = false,
  onFavoriteToggle,
}: PropertyCardProps) {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const authLoading = useAuthStore((state) => state.loading);
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
    property.structure?.trim() ||
    property.privacyType?.trim() ||
    "Stay";

  const city = property.location?.city;
  const title = city
    ? `${propertyType} in ${city}`
    : propertyType;
 function handleFavoriteClick(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    event.preventDefault();
    event.stopPropagation();
    if (authLoading) return;
    if (!user) {
      const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
      const pathname = window.location.pathname.startsWith(basePath)
        ? window.location.pathname.slice(basePath.length) || "/"
        : window.location.pathname;
      const redirectPath = `${pathname}${window.location.search}${window.location.hash}`;
      void navigate({
        to: "/login",
        search: { redirect: redirectPath },
      });
      return;
    }

    onFavoriteToggle?.(property.id);
  }

  return (
    <article className="group w-full overflow-hidden">
    <div className="relative">
        <Link
          to="/properties/$propertyId"
          params={{ propertyId: property.id }}
          onClick={() => onSelect?.(property.id)}
          aria-label={`View ${title}, ${location}`}
          className="block w-full">
          <AspectRatio
            ratio={1}
            className="w-full overflow-hidden rounded-xl bg-muted">
            {coverPhoto ? (
              <img
                src={coverPhoto.url}
                alt={title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                No image available
              </div>
            )}
          </AspectRatio>
        </Link>
      <div className="absolute inset-x-2 top-2 z-10 flex items-center justify-between">
        <Badge
          variant="secondary"
          className="h-auto px-2 py-1 text-[12px] font-semibold leading-[16px] pointer-events-none"
        >
          Approved
        </Badge>
        <Button
          type="button"
          variant="outline"
          onClick={handleFavoriteClick}
          disabled={authLoading}
          aria-label={
            isFavorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
          aria-pressed={isFavorite}
          className="border-0 cursor-pointer bg-transparent p-0 hover:bg-transparent"
        >
          <Heart
            strokeWidth={1}
            className={`cursor-pointer size-7 ${isFavorite
              ? "fill-[#ff385c] text-[#ff385c]"
              : "fill-black/35 text-white"
           }`}
          />
        </Button>
      </div>
      </div>
     <Link
        to="/properties/$propertyId"
        params={{ propertyId: property.id }}
        onClick={() => onSelect?.(property.id)}
        className="mt-1 flex flex-col gap-0.5"
      >
        <h3 className="truncate text-[14px] leading-[20px] font-semibold text-[#222222]">
          {title}
        </h3>

        <p className="text-[12px] leading-[16px] font-normal text-[#6c6c6c]">
          <span className="tracking-tight">
            {currencyFormatter.format(property.pricePerNight)}
          </span>{" "}
          <span className="tracking-normal">
            per night
          </span>
        </p>
    </Link>
    </article>
  );
}