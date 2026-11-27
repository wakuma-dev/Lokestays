import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Properties } from "../schema/propertiesSchema";
import PropertyCard from "./PropertyCard";
import { Button } from "@/components/ui/button";
import PropertyHeader from "./PropertyHeader";
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

  if (properties.length === 0) return null;

  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between">
        <PropertyHeader
          title={title}
          city={city}
          neighborhood={neighborhood ?? undefined}
        />

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <Button
            type="button"
            variant="outline"
            size="icon-xs"
            onClick={() => scrollCarousel("left")}
            aria-label="Scroll properties left"
            className="size-7 cursor-pointer rounded-full border border-border bg-[#ebebeb] transition hover:bg-muted"
          >
            <ChevronLeft className="size-4" />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon-xs"
            onClick={() => scrollCarousel("right")}
            aria-label="Scroll properties right"
            className="size-7 cursor-pointer rounded-full border border-border bg-[#ebebeb] transition hover:bg-muted"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {properties.map((property) => (
          <div
            key={property.id}
            className="w-[calc(50%_-_0.375rem)] shrink-0 snap-start sm:w-48"
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