import { useMutation } from "@tanstack/react-query";
import { loginWithGoogle, loginWithGoogleRedirect} from "../api/auth.api"
import type { User } from "firebase/auth";
const isMobileDevice = (): boolean => {
    return window.matchMedia("(max-width: 767px)").matches;
};
export function useGoogleLogin(){
    return useMutation<User | null, Error, void>({
     mutationFn: async () => {
        if(isMobileDevice()){
            await loginWithGoogleRedirect();
            return null
        }
        return loginWithGoogle()
     }
});
}