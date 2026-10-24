import { useQuery } from "@tanstack/react-query"
import { getUserProfile} from "@/feature/profile"
export const userProfileQueryKey = (uid: string) => ["users", "profile", uid] as const;
export const useUserProfile = (uid: string) => {
   return useQuery({
    queryKey: userProfileQueryKey(uid),
    queryFn: () => getUserProfile(uid),
    enabled: uid.trim().length > 0
   });
}