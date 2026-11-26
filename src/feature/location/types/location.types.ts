export interface Coordinates {
  latitude: number;
  longitude: number;
}
export type LocationStatus =
  | "idle"
  | "loading"
  | "success"
  | "error";

export interface UserLocation {
  coordinates: Coordinates;
}