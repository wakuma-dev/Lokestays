import { useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Properties } from "../schema/propertiesSchema";

import PropertyHeader from "./PropertyHeader";
import PropertyCard from "./PropertyCard";

interface PropertyCollection {
  id: string;
  title: string;
  city: string;
  neighborhood: string | null;
  properties: Properties[];
}

interface PropertyCollectionsProps {
  properties: Properties[];
  onSelectProperty: (propertyId: string) => void;
}

export default function PropertyCollections({
  properties,
  onSelectProperty,
}: PropertyCollectionsProps) {
  const collections = useMemo<PropertyCollection[]>(() => {
    const cityGroups = new Map<string, Properties[]>();

    for (const property of properties) {
      if (property.status !== "approved" || !property.location) {
        continue;
      }

      const city = property.location.city.trim();

      if (!city) continue;

      const cityKey = city.toLowerCase();

      const cityGroup = cityGroups.get(cityKey) ?? [];
      cityGroup.push(property);
      cityGroups.set(cityKey, cityGroup);
    }

    const result: PropertyCollection[] = [];

    for (const [key, cityProperties] of cityGroups) {
      const city = cityProperties[0]?.location?.city;

      if (!city) continue;

      result.push({
        id: `city-${key}`,
        title: `Stay in ${city}`,
        city,
        neighborhood: null,
        properties: cityProperties,
      });
    }

    return result;
  }, [properties]);

  return (
    <div className="space-y-10">
      {collections.map((collection) => (
        <PropertyCollectionSection
          key={collection.id}
          collection={collection}
          onSelectProperty={onSelectProperty}
        />
      ))}
    </div>
  );
}

interface PropertyCollectionSectionProps {
  collection: PropertyCollection;
  onSelectProperty: (propertyId: string) => void;
}

function PropertyCollectionSection({
  collection,
  onSelectProperty,
}: PropertyCollectionSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;

    if (!container) return;

    container.scrollBy({
      left:
        direction === "right"
          ? container.clientWidth * 0.8
          : -container.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <PropertyHeader
          title={collection.title}
          city={collection.city}
          neighborhood={collection.neighborhood ?? undefined}
        />

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Scroll properties left"
            className="rounded-full border border-border p-2 hover:bg-muted"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Scroll properties right"
            className="rounded-full border border-border p-2 hover:bg-muted"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3 scrollbar-hide"
      >
        {collection.properties.map((property) => (
          <div
            key={property.id}
            className="w-[280px] shrink-0 snap-start sm:w-[300px]"
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
