import { create } from "zustand";
import uniqid from "uniqid";

type User = {
  id: string;
  email: string;
  userType: "normal" | "admin";
};

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (email, password) => {
    const user: User = {
      id: uniqid(),
      email,
      userType: "normal",
    };
    set({ isAuthenticated: true, user });
  },
  logout: () => {
    set({ isAuthenticated: false, user: null });
  },
}));

export default useAuthStore;
