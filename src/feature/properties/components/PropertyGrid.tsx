import type { Properties } from "../schema/propertiesSchema";
import PropertyCard from "./PropertyCard";
interface PropertyGridProps {
  properties: Properties[];
  onSelectProperty: (propertyId: string) => void;
}
export default function PropertyGrid({
  properties,
  onSelectProperty,
}: PropertyGridProps) {
  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-7">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          onSelect={onSelectProperty}
        />
      ))}
    </div>
  );
}