import { useInfiniteQuery } from "@tanstack/react-query";
import type {
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { searchProperties } from "../api/search.api";

type UseSearchPropertiesParams = {
  destination?: string;
};

export function useSearchProperties({
  destination,
}: UseSearchPropertiesParams = {}) {
  const normalizedDestination = destination?.trim() ?? "";

  return useInfiniteQuery({
    queryKey: ["properties", "search", normalizedDestination],
    initialPageParam: undefined as QueryDocumentSnapshot<DocumentData> | undefined,
    queryFn: ({ pageParam }) =>
      searchProperties({
        destination: normalizedDestination || undefined,
        cursor: pageParam,
      }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}