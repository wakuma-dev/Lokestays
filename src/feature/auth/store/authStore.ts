import { create } from "zustand";
import { devtools} from "zustand/middleware"
import { type User} from "firebase/auth";
import type { RegisterDataType, LoginDataType } from "@/feature/auth"
import { login as loginService, signup as signupService, logout as logoutService} from "@/feature/auth"
type AuthState = {
   user: User | null;
   loading: boolean;
   error: string | null;
}
type AuthAction = {
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;
    signup: (data: RegisterDataType) => Promise<void>;
    login: (data: LoginDataType) => Promise<void>;
    logout: () => Promise<void>;
}
type AuthStore = AuthState & AuthAction;
export const useAuthStore = create<AuthStore>()(
    devtools((set) => ({
       user: null,
       loading: false,
       error: null,
       setUser: (user) => set({user}),
       setLoading: (loading) => set({loading}),
       signup: async (data) => {
        set({loading: true, error: null});
        try {
            await signupService(data);
            set({
                user: null,
                loading: false
            })
        }catch(error){
            console.error(error);
            set({loading: false, error: "failed to create account"});
            throw error
        }},
       login: async (data) => {
        set({loading: true, error: null});
        try {
            await loginService(data);
            set({
                user: null,
                loading: false
            })
        }catch(error){
            console.error(error);
            set({
                loading: false,
                error: "failed to login account"
            });
            throw error
        }
       },
       logout: async () => {
        set({loading: true, error: null});
        try {
            await logoutService();
            set({
                user: null,
                loading: false
            });
        }catch(error){
            console.error(error);
            set({
                loading: false,
                error: "failed to logout"
            });
            throw error;
        }
       } ,

    }))
)