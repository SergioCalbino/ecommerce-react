import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id: number;
  name: string;
  email: string;
  role: "CUSTOMER" | "ADMIN";
  telephone: string;
  address: string;
}

interface Auth {
  token: string | null; // refresh token
  accessToken: string | null; // access token
  user: User | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  registerAuth: (token: string, user: User) => void;
  login: (accessToken: string, refreshToken: string, user: User) => void;
  setUser: (user: User) => void;
  setIsHydrated: (v: boolean) => void;
  logout: () => void;
  refreshAccessToken: () => Promise<string | null>;
}

export const authStore = create<Auth>()(
  persist(
    (set, get) => ({
      token: null,
      accessToken: null,
      user: null,
      refreshToken: null,
      isAuthenticated: false,
      isHydrated: false,
      setIsHydrated: (v) => set({ isHydrated: v }),
      setUser: (user) => set({ user }),
      registerAuth: (token, user) => set({ token, user, isAuthenticated: true }),
      login: (accessToken, refreshToken, user) => set({ accessToken, refreshToken, user, isAuthenticated: true }),
      logout: () => {
        set({
          token: null,
          accessToken: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        });
        localStorage.removeItem("auth"); 
      },

      refreshAccessToken: async () => {
        const state = get();
        if (!state.refreshToken) return null;
     
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken: state.refreshToken }),
          });

          if (!response.ok) throw new Error("No se pudo refrescar el token");

          const data = await response.json();
          console.log("Data del refresh token:", data);

          set({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            user: data.customer,
            isAuthenticated: true,
          });

          return data.accessToken;
        } catch (error) {
          console.error("Error refrescando el token:", error);
          set({
            accessToken: null,
            refreshToken: null,
            token: null,
            user: null,
            isAuthenticated: false,
          });
          return null;
        }
      },
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // token: state.token,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
        refreshToken: state.refreshToken,
        user: state.user
      }),
      onRehydrateStorage: () => (state) => {
        state?.setIsHydrated(true);
      },
    },
  ),
);
