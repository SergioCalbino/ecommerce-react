
import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

interface User {
    name: string,
    email: string,
    role: string

}

interface Auth {
    token: string | null,
    accessToken: string | null
    user: User | null,
    isAuthenticated: boolean,
    registerAuth: (token: string, user: User) => void,
    login : (accessToken: string, user: User) => void,
    logout: () => void;
    
}


export const useAuthStore = create<Auth>()(
  persist(
    (set) => ({
      token: null,
      accessToken: null,
      user: null,
      isAuthenticated: false,
      
      registerAuth: (token, user) => set({token, user, isAuthenticated: true }),

      login: (accessToken, user) => set({ accessToken, user, isAuthenticated: true }),
      
      logout: () => set({
        token: null,
        accessToken: null,
        user: null,
        isAuthenticated: false, 
        
        }),
    }),
    
    {
      name: 'auth', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      partialize: (state) => ({
        token: state.token,
        accessToken: state.accessToken
      })
    },
  ),
)