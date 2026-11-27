import { useMemo } from "react";
import type { Properties } from "../schema/propertiesSchema";
import PropertyCollectionSection from "./PropertyCollectionSection";

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
    let otherCityIndex = 0;

    for (const [key, cityProperties] of cityGroups) {
      const city = cityProperties[0]?.location?.city;

      if (!city) continue;

      const isAddisKetema = key === "addis ketema";
      const usePopularHomesTitle =
        isAddisKetema || otherCityIndex % 2 === 1;
      const titlePrefix = usePopularHomesTitle
        ? "Popular homes in"
        : "Stay in";

      result.push({
        id: `city-${key}`,
        title: `${titlePrefix} ${city}`,
        city,
        neighborhood: null,
        properties: cityProperties,
      });

      if (!isAddisKetema) otherCityIndex += 1;
    }

    return result;
  }, [properties]);

  return (
    <div className="space-y-3">
      {collections.map((collection) => (
        <PropertyCollectionSection
          key={collection.id}
          title={collection.title}
          city={collection.city}
          neighborhood={collection.neighborhood}
          properties={collection.properties}
          onSelectProperty={onSelectProperty}
        />
      ))}
    </div>
  );
}
