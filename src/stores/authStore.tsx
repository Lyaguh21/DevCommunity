import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    nickname: string;
    role: string;
    token: string;
  } | null;

  setUser: (userData: {
    id: string;
    nickname: string;
    role: string;
    token: string;
  }) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      setUser: (userData) => {
        set({
          isAuthenticated: true,
          user: {
            id: userData.id,
            nickname: userData.nickname,
            role: userData.role,
            token: userData.token,
          },
        });
      },

      clearUser: () => {
        set({ isAuthenticated: false, user: null });
        localStorage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);
