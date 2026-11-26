import { useCallback, useRef, useState } from "react";
import type {
  Coordinates,
  LocationStatus,
  UserLocation,
} from "../types/location.types";
interface UseUserLocationReturn {
  location: UserLocation | null;
  status: LocationStatus;
  error: string | null;
  requestLocation: () => void;
}

function isValidCoordinates(
  latitude: number,
  longitude: number,
): boolean {
  return (
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
}

export function useUserLocation(): UseUserLocationReturn {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [status, setStatus] = useState<LocationStatus>("idle");
 const [error, setError] = useState<string | null>(null);
 const requestIdRef = useRef(0);
 const requestLocation = useCallback(() => {
 const requestId = ++requestIdRef.current;

    if (!("geolocation" in navigator)) {
      setStatus("error");
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setStatus("loading");
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (requestId !== requestIdRef.current) return;

        const { latitude, longitude } = position.coords;

        if (!isValidCoordinates(latitude, longitude)) {
          setStatus("error");
          setError("Received invalid location coordinates.");
          return;
        }

        const coordinates: Coordinates = {
          latitude,
          longitude,
        };

        setLocation({ coordinates });
        setStatus("success");
      },

      (geolocationError) => {
        if (requestId !== requestIdRef.current) return;

        const errorMessages: Record<number, string> = {
          1: "Location permission was denied.",
          2: "Your current location is unavailable.",
          3: "Location request timed out.",
        };

        setError(
          errorMessages[geolocationError.code] ??
            "Unable to determine your location.",
        );

        setStatus("error");
      },

      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      },
    );
  }, []);

  return {
    location,
    status,
    error,
    requestLocation,
  };
}