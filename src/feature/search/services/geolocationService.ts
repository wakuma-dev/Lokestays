import type { Coordinates } from "../types/search.types";

export type GeolocationErrorCode =
  | "UNSUPPORTED"
  | "PERMISSION_DENIED"
  | "POSITION_UNAVAILABLE"
  | "TIMEOUT"
  | "UNKNOWN";

export class GeolocationServiceError extends Error {
  public readonly code: GeolocationErrorCode;

  public constructor(
    code: GeolocationErrorCode,
    message: string,
  ) {
    super(message);
    this.name = "GeolocationServiceError";
    this.code = code;
  }
}

export interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

const DEFAULT_OPTIONS: Required<GeolocationOptions> = {
  enableHighAccuracy: false,
  timeout: 10_000,
  maximumAge: 60_000,
};

function mapGeolocationError(
  error: GeolocationPositionError,
): GeolocationServiceError {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return new GeolocationServiceError(
        "PERMISSION_DENIED",
        "Location permission was denied. Enable location access in your browser settings and try again.",
      );

    case error.POSITION_UNAVAILABLE:
      return new GeolocationServiceError(
        "POSITION_UNAVAILABLE",
        "Your current location is unavailable. Please try again.",
      );

    case error.TIMEOUT:
      return new GeolocationServiceError(
        "TIMEOUT",
        "The location request timed out. Please try again.",
      );

    default:
      return new GeolocationServiceError(
        "UNKNOWN",
        "Unable to determine your location.",
      );
  }
}

function validateCoordinates(
  latitude: number,
  longitude: number,
): Coordinates {
  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    throw new GeolocationServiceError(
      "UNKNOWN",
      "The browser returned invalid location coordinates.",
    );
  }

  return {
    lat: latitude,
    lng: longitude,
  };
}

export function isGeolocationSupported(): boolean {
  return (
    typeof navigator !== "undefined" &&
    "geolocation" in navigator
  );
}

export function getCurrentPosition(
  options: GeolocationOptions = {},
): Promise<Coordinates> {
  if (!isGeolocationSupported()) {
    return Promise.reject(
      new GeolocationServiceError(
        "UNSUPPORTED",
        "Geolocation is not supported by this browser.",
      ),
    );
  }

  const geolocationOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        try {
          resolve(
            validateCoordinates(
              position.coords.latitude,
              position.coords.longitude,
            ),
          );
        } catch (error) {
          reject(error);
        }
      },
      (error) => {
        reject(mapGeolocationError(error));
      },
      geolocationOptions,
    );
  });
}
