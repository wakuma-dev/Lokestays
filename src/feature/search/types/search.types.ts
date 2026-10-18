export type DestinationType =
  | "city"
  | "region"
  | "country"
  | "landmark"
  | "custom";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface DestinationOption {
  id: string;
  label: string;
  subtitle?: string;
  type: DestinationType;
  coordinates?: Coordinates;
}

export interface DateRange {
  checkIn: string | null;
  checkOut: string | null;
}

export interface GuestCounts {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

export interface ExploreSearch {
  destination: string;
  destinationId?: string;
  checkIn: string | null;
  checkOut: string | null;
  adults: number;
  children: number;
  infants: number;
  pets: number;
  lat?: number;
  lng?: number;
}

export interface SearchState {
  destination: DestinationOption | null;
  destinationQuery: string;
  checkIn: string | null;
  checkOut: string | null;
  guests: GuestCounts;
  activePanel: SearchPanel;
}

export type SearchPanel =
  | "destination"
  | "dates"
  | "guests"
  | null;

export type SearchAction =
  | {
      type: "SET_DESTINATION_QUERY";
      payload: string;
    }
  | {
      type: "SELECT_DESTINATION";
      payload: DestinationOption;
    }
  | {
      type: "CLEAR_DESTINATION";
    }
  | {
      type: "SELECT_DATE";
      payload: string;
    }
  | {
      type: "CLEAR_DATES";
    }
  | {
      type: "SET_GUEST_COUNT";
      payload: {
        guestType: keyof GuestCounts;
        count: number;
      };
    }
  | {
      type: "SET_ACTIVE_PANEL";
      payload: SearchPanel;
    }
  | {
      type: "RESET_SEARCH";
    }
  | {
      type: "HYDRATE_SEARCH";
      payload: Partial<SearchState>;
    };

export interface DestinationProvider {
  searchDestinations(
    query: string,
    signal?: AbortSignal,
  ): Promise<DestinationOption[]>;
}

export interface RecentDestinationsStorage {
  getRecentDestinations(): DestinationOption[];
  saveRecentDestination(destination: DestinationOption): void;
  clearRecentDestinations(): void;
}
