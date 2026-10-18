
// Components
export { default as SearchBar } from "./components/SearchBar";
export { default as SearchDialog } from "./components/SearchDialog";
export { default as MobileCard } from "./components/MobileCard";

export { default as DestinationPanel } from "./components/destination/DestinationPanel";
export { default as DatesPanel } from "./components/dates/DatesPanel";
export { default as Calendar } from "./components/dates/Calendar";
export { default as MonthCarousel } from "./components/dates/MonthCarousel";
export { default as GuestsPanel } from "./components/guests/GuestsPanel";

// Types and constants
export * from "./model";

// Schema and state
export {
  exploreSearchSchema,
  createInitialState,
  toExploreSearch,
} from "./schemas/exploreSearchSchema";

export { searchReducer } from "./state/search-reducer";

// Hooks
export { useDestinationSuggestions } from "./hooks/useDestinationSuggestions";
export { useRecentDestinations } from "./hooks/useRecentDestinations";
export { useClickOutside } from "./hooks/useClickOutside";
export {
  useMediaQuery,
  SEARCH_MEDIA_QUERIES,
} from "./hooks/useMediaQuery";
export { useToday } from "./hooks/useToday";

// Services
export {
  destinationProvider,
  searchDestinations,
  getPopularDestinations,
  getDestinationById,
  ETHIOPIAN_DESTINATIONS,
} from "./services/destinationService";

export {
  GeolocationServiceError,
  isGeolocationSupported,
  getCurrentPosition,
} from "./services/geolocationService";

// Utilities
export * from "./utils/date-utils";
export * from "./utils/search-summaries";
export * from "./utils/search-serialization";
