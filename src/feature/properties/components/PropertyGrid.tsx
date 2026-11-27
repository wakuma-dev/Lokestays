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
    <div className="grid w-full max-w-[1600px] grid-cols-2 gap-x-0 gap-y-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
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