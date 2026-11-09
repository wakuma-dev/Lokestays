import { useMutation } from "@tanstack/react-query";
import { loginWithFacebook, loginWithFacebookRedirect} from "../api/auth.api"
import type { User } from "firebase/auth";
const isMobileDevice = (): boolean => {
    return window.matchMedia("(max-width: 767px)").matches;
};
export function useFacebookLogin(){
    return useMutation<User | null, Error, void>({
    mutationFn: async () => {
        if(isMobileDevice()){
            await loginWithFacebookRedirect();
            return null;
        }
        return loginWithFacebook()
    }
    })
}
