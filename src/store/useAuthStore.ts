import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  name: string;
  email: string;
  role: string;
  telephone: string;
  address: string;
}

interface Auth {
  token: string | null;
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  registerAuth: (token: string, user: User) => void;
  login: (accessToken: string, user: User) => void;
  setUser: (user: User) => void;
  setIsHydrated: (v: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<Auth>()(
  persist(
    (set) => ({
      token: null,
      accessToken: null,
      user: null,
      isAuthenticated: false,
      isHydrated: false,
      setIsHydrated: (v) => set({ isHydrated: v }),
      setUser: (user) => set({ user }),
      registerAuth: (token, user) => set({ token, user, isAuthenticated: true }),
      login: (accessToken, user) => set({ accessToken, user, isAuthenticated: true }),
      logout: () => set({
        token: null,
        accessToken: null,
        user: null,
        isAuthenticated: false,
      }),
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setIsHydrated(true);
      },
    },
  ),
);