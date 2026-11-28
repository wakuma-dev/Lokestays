import { createFileRoute } from "@tanstack/react-router";
import PropertyDetails from "@/pages/PropertyDetails";
export const Route = createFileRoute(
  "/_main/properties/$propertyId",
)({
  component: PropertyDetails,
});