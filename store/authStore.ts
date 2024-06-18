import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  email: string;
  userType: "normal" | "admin";
};

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  login: (
    email: string,
    password: string,
    isAdmin: boolean
  ) => { success: boolean };
  logout: () => void;
};

const authStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (email, password, isAdmin) => {
        const user: User = {
          email,
          userType: isAdmin ? "admin" : "normal",
        };
        set({ isAuthenticated: true, user });
        return { success: true };
      },
      logout: () => {
        set({ isAuthenticated: false, user: null });
      },
    }),

    {
      name: "auth-storage",
    }
  )
);

export default authStore;
