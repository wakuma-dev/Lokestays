import {
  useEffect,
  useRef,
  type RefObject,
} from "react";

type OutsideEvent = MouseEvent | TouchEvent;

interface UseClickOutsideOptions {
  enabled?: boolean;
  eventTypes?: Array<"mousedown" | "click" | "touchstart">;
}

export function useClickOutside<T extends HTMLElement>(
  callback: (event: OutsideEvent) => void,
  options: UseClickOutsideOptions = {},
): RefObject<T | null> {
  const {
    enabled = true,
    eventTypes = ["mousedown", "touchstart"],
  } = options;

  const elementRef = useRef<T>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleOutsideEvent = (event: Event) => {
      const element = elementRef.current;

      if (!element || !(event instanceof MouseEvent || event instanceof TouchEvent)) {
        return;
      }

      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (!element.contains(target)) {
        callbackRef.current(event);
      }
    };

    for (const eventType of eventTypes) {
      document.addEventListener(
        eventType,
        handleOutsideEvent,
        true,
      );
    }

    return () => {
      for (const eventType of eventTypes) {
        document.removeEventListener(
          eventType,
          handleOutsideEvent,
          true,
        );
      }
    };
  }, [enabled, eventTypes]);

  return elementRef;
}
