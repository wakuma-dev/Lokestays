import { create } from "zustand";
import { persist, createJSONStorage} from "zustand/middleware"
import type { AccountMode } from "../types/auth.types";

interface AccountModeState {
    activeMode: AccountMode,
    setActiveMode: (mode: AccountMode) => void;
}

export const useAccountModeStore = create<AccountModeState>()(
    persist((set) => ({
        activeMode: "guest",
        setActiveMode: (activeMode) => set({activeMode}),
    }), {
        name: "lokestays-account-mode",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          activeMode: state.activeMode
        })
    })
)