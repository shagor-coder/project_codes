import { create } from "zustand";

export const useAuth = create((set) => ({
  authUser: null,
  setauthUser: (authUser) => set(() => ({ authUser: authUser })),
  removeauthUser: (authUser) => set(() => ({ authUser: null })),
}));
