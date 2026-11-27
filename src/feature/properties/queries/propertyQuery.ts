import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getProperties, getPropertyById, type GetPropertiesResponse} from "../api/properties.api";
import type { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
const PROPERTIES_QUERY_KEY = ["propertyDrafts"] as const;
const PAGE_SIZE = 12;
interface UsePropertyQueryParams {
  propertyId: string;
}
export function usePropertyQuery({propertyId}: UsePropertyQueryParams){
    const normalizedId = propertyId.trim();
    return useQuery({
      queryKey: ["propertyDrafts", "details", normalizedId],
      queryFn: () => getPropertyById(normalizedId),
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      retry: 2
    })
}
export function usePropertiesQuery() {
  return useInfiniteQuery<
    GetPropertiesResponse,
    Error,
    {
      pages: GetPropertiesResponse[];
      pageParams: (QueryDocumentSnapshot<DocumentData> | null)[];
    },
    typeof PROPERTIES_QUERY_KEY,
    QueryDocumentSnapshot<DocumentData> | null
  >({
    queryKey: PROPERTIES_QUERY_KEY,

    queryFn: ({ pageParam }) =>
      getProperties({
        cursor: pageParam,
        pageSize: PAGE_SIZE,
      }),

    initialPageParam: null,

    getNextPageParam: (lastPage) =>
      lastPage.hasMore
        ? lastPage.lastDocument
        : undefined,

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}