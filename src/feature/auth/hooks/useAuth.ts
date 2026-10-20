import { auth } from "@/lib/firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthStore } from "@/feature/auth"
import { router } from "@/app/router/router";

export default function useAuth(){
    const setLoading = useAuthStore.getState().setLoading;
    const setUser = useAuthStore.getState().setUser;
    return onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
        void router.invalidate();
    });
}