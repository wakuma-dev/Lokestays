import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateUserProfile, type UpdateUserProfile, type UserProfile } from "@/feature/profile/"
import { userProfileQueryKey } from "../queries/profileQueries";
interface UpdateUserProfileVariables {
    uid: string;
    data: UpdateUserProfile
}
interface UpdateUserProfileContext {
    previousProfile: UserProfile | undefined;
}
export const useUpdateUserProfile = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, UpdateUserProfileVariables, UpdateUserProfileContext>({
        mutationKey: ["users"],
        mutationFn: ({uid, data}: UpdateUserProfileVariables) => updateUserProfile(uid, data),
        onMutate: async ({uid, data}) => {
           const queryKey = userProfileQueryKey(uid);
           await queryClient.cancelQueries({queryKey});
           const previousProfile = queryClient.getQueryData<UserProfile>(queryKey);
           queryClient.setQueryData<UserProfile>(queryKey, (currentProfile) => {
            if(!currentProfile){
                return currentProfile;
            }
            return {
                ...currentProfile,
                ...data
            }
           });
           return { previousProfile }
        },
        onError: (_error, variables, context) => {
        if(context?.previousProfile){
            queryClient.setQueryData(userProfileQueryKey(variables.uid), context.previousProfile)
        }
        },
        onSettled: async (_data, _error, variables) => {
           await queryClient.invalidateQueries({
                queryKey: userProfileQueryKey(variables.uid)
            });
        }
    });
}

