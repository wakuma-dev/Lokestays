import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { User } from "firebase/auth";

import type { RegisterDataType, LoginDataType } from "@/feature/auth";
import {
  login as loginService,
  signup as signupService,
  logout as logoutService,
} from "@/feature/auth";

type AuthState = {
  user: User | null;
  loading: boolean;
  isSubmitting: boolean;
  error: string | null;
};

type AuthAction = {
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  signup: (data: RegisterDataType) => Promise<void>;
  login: (data: LoginDataType) => Promise<void>;
  logout: () => Promise<void>;
};

type AuthStore = AuthState & AuthAction;

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      user: null,
      loading: true,
      isSubmitting: false,
      error: null,

      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ loading }),

      signup: async (data) => {
        set({ isSubmitting: true, error: null });

        try {
          await signupService(data);
        } catch (error: unknown) {
          console.error("Signup failed:", error);
          set({ error: "Failed to create account." });
          throw error;
        } finally {
          set({ isSubmitting: false });
        }
      },

      login: async (data) => {
        set({ isSubmitting: true, error: null });

        try {
          await loginService(data);
        } catch (error: unknown) {
          console.error("Login failed:", error);
          set({ error: "Failed to log in." });
          throw error;
        } finally {
          set({ isSubmitting: false });
        }
      },

      logout: async () => {
        set({ isSubmitting: true, error: null });

        try {
          await logoutService();
        } catch (error: unknown) {
          console.error("Logout failed:", error);
          set({ error: "Failed to log out." });
          throw error;
        } finally {
          set({ isSubmitting: false });
        }
      },
    }),
    { name: "auth-store" },
  ),
);
