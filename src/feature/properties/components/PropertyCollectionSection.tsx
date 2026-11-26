import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import type { Properties } from "../schema/propertiesSchema";
import PropertyCard from "./PropertyCard";

interface PropertyCollectionSectionProps {
  title: string;
  city: string;
  neighborhood: string | null;
  properties: Properties[];
  onSelectProperty: (propertyId: string) => void;
}

export default function PropertyCollectionSection({
  title,
  city,
  neighborhood,
  properties,
  onSelectProperty,
}: PropertyCollectionSectionProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollCarousel = (direction: "left" | "right") => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    carousel.scrollBy({
      left:
        direction === "right"
          ? carousel.clientWidth * 0.8
          : -carousel.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  const handleShowAll = () => {
    navigate({
      to: "/properties",
      search: {
        city,
        ...(neighborhood ? { neighborhood } : {}),
      },
    });
  };

  if (properties.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleShowAll}
            className="text-sm font-medium underline underline-offset-4"
          >
            Show all
          </button>

          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollCarousel("left")}
              aria-label="Scroll properties left"
              className="rounded-full border p-2 transition hover:bg-muted"
            >
              <ChevronLeft className="size-4" />
            </button>

            <button
              type="button"
              onClick={() => scrollCarousel("right")}
              aria-label="Scroll properties right"
              className="rounded-full border p-2 transition hover:bg-muted"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {properties.map((property) => (
          <div
            key={property.id}
            className="w-[260px] shrink-0 snap-start sm:w-[280px] lg:w-[300px]"
          >
            <PropertyCard
              property={property}
              onSelect={onSelectProperty}
            />
          </div>
        ))}
      </div>
    </section>
  );
}