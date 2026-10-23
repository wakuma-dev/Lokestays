import { useQuery } from "@tanstack/react-query";
import { searchProperties } from "../api/search.api";
type UseSearchPropertiesParams = {
    destination?: string;
};
export function useSearchProperties({destination}: UseSearchPropertiesParams = {}){
     const normalizedDestination = destination?.trim() ?? "";
    return useQuery({
        queryKey: ["properties", "search", normalizedDestination],
        queryFn: () => searchProperties({
            destination: normalizedDestination
        })
    });
}