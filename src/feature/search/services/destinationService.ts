import {
  DESTINATION_SUGGESTION_LIMIT,
} from "../constants/search.constants";

import type {
  DestinationOption,
  DestinationProvider,
} from "../types/search.types";

export const ETHIOPIAN_DESTINATIONS: DestinationOption[] = [
  {
    id: "addis-ababa",
    label: "Addis Ababa",
    subtitle: "Ethiopia's capital",
    type: "city",
    coordinates: {
      lat: 8.9806,
      lng: 38.7578,
    },
  },
  {
    id: "hawassa",
    label: "Hawassa",
    subtitle: "Sidama, Ethiopia",
    type: "city",
    coordinates: {
      lat: 7.0621,
      lng: 38.4764,
    },
  },
  {
    id: "adama",
    label: "Adama",
    subtitle: "Oromia, Ethiopia",
    type: "city",
    coordinates: {
      lat: 8.5414,
      lng: 39.2689,
    },
  },
  {
    id: "bahir-dar",
    label: "Bahir Dar",
    subtitle: "Amhara, Ethiopia",
    type: "city",
    coordinates: {
      lat: 11.5742,
      lng: 37.3614,
    },
  },
  {
    id: "dire-dawa",
    label: "Dire Dawa",
    subtitle: "Eastern Ethiopia",
    type: "city",
    coordinates: {
      lat: 9.6009,
      lng: 41.8501,
    },
  },
  {
    id: "gondar",
    label: "Gondar",
    subtitle: "Amhara, Ethiopia",
    type: "city",
    coordinates: {
      lat: 12.603,
      lng: 37.4521,
    },
  },
  {
    id: "jimma",
    label: "Jimma",
    subtitle: "Oromia, Ethiopia",
    type: "city",
    coordinates: {
      lat: 7.6734,
      lng: 36.8344,
    },
  },
  {
    id: "mekelle",
    label: "Mekelle",
    subtitle: "Tigray, Ethiopia",
    type: "city",
    coordinates: {
      lat: 13.4967,
      lng: 39.4753,
    },
  },
  {
    id: "lalibela",
    label: "Lalibela",
    subtitle: "Amhara, Ethiopia",
    type: "city",
    coordinates: {
      lat: 12.0319,
      lng: 39.0473,
    },
  },
  {
    id: "arbaminch",
    label: "Arba Minch",
    subtitle: "South Ethiopia",
    type: "city",
    coordinates: {
      lat: 6.0329,
      lng: 37.5547,
    },
  },
];

export const destinationProvider: DestinationProvider = {
  async searchDestinations(query, signal) {
    if (signal?.aborted) {
      return [];
    }

    const normalizedQuery = query.trim().toLocaleLowerCase();

    if (!normalizedQuery) {
      return ETHIOPIAN_DESTINATIONS.slice(
        0,
        DESTINATION_SUGGESTION_LIMIT,
      );
    }

    const matches = ETHIOPIAN_DESTINATIONS.filter(
      (destination) => {
        const labelMatches = destination.label
          .toLocaleLowerCase()
          .includes(normalizedQuery);

        const subtitleMatches = destination.subtitle
          ?.toLocaleLowerCase()
          .includes(normalizedQuery);

        return labelMatches || subtitleMatches;
      },
    );

    if (signal?.aborted) {
      return [];
    }

    return matches.slice(0, DESTINATION_SUGGESTION_LIMIT);
  },
};

export async function searchDestinations(
  query: string,
  signal?: AbortSignal,
): Promise<DestinationOption[]> {
  return destinationProvider.searchDestinations(query, signal);
}

export function getPopularDestinations(): DestinationOption[] {
  return ETHIOPIAN_DESTINATIONS.slice(
    0,
    DESTINATION_SUGGESTION_LIMIT,
  );
}

export function getDestinationById(
  id: string,
): DestinationOption | undefined {
  return ETHIOPIAN_DESTINATIONS.find(
    (destination) => destination.id === id,
  );
}
