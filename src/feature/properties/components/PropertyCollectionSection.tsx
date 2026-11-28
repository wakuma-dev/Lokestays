import { useRef } from "react";
import type React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { Properties } from "../schema/propertiesSchema";
import PropertyCard from "./PropertyCard";
import PropertyHeader from "./PropertyHeader";
import { Button } from "@/components/ui/button";

interface DragState {
  isDragging: boolean;
  startX: number;
  startScrollLeft: number;
}

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

  const dragStateRef = useRef<DragState>({
    isDragging: false,
    startX: 0,
    startScrollLeft: 0,
  });

  const hasDraggedRef = useRef(false);

  // Start tracking mouse movement without capturing the pointer.
  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    const carousel = carouselRef.current;
    if (!carousel) return;

    dragStateRef.current = {
      isDragging: true,
      startX: event.clientX,
      startScrollLeft: carousel.scrollLeft,
    };

    hasDraggedRef.current = false;
  };

  // Start dragging only after the pointer moves beyond the threshold.
  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    const carousel = carouselRef.current;
    const drag = dragStateRef.current;

    if (!carousel || !drag.isDragging) return;

    const distance = event.clientX - drag.startX;

    if (Math.abs(distance) > 5 && !hasDraggedRef.current) {
      hasDraggedRef.current = true;

      event.currentTarget.setPointerCapture(event.pointerId);
    }

    if (hasDraggedRef.current) {
      carousel.scrollLeft = drag.startScrollLeft - distance;
    }
  };

  // Finish the current drag operation.
  const handlePointerUp = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    dragStateRef.current.isDragging = false;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  // Prevent accidental navigation after dragging.
  const handleClickCapture = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (!hasDraggedRef.current) return;

    event.preventDefault();
    event.stopPropagation();

    hasDraggedRef.current = false;
  };

  // Scroll the carousel using navigation buttons.
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
      {/* Collection heading and navigation controls */}
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

      {/* Property carousel */}
      <div
        ref={carouselRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClickCapture={handleClickCapture}
        className="w-full snap-x snap-mandatory overflow-x-auto -mx-4 scroll-smooth md:mx-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex gap-3 pl-4 pb-3 md:px-0">
          {properties.map((property) => (
            <div
              key={property.id}
              className="
                min-w-0 shrink-0 snap-start
                w-[calc((100%-12px)/2)]
                sm:w-[calc((100%-36px)/4)]
                lg:w-[calc((100%-72px)/7)]
              "
            >
              <PropertyCard
                property={property}
                onSelect={onSelectProperty}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}