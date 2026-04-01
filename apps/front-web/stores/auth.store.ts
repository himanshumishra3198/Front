import { create } from "zustand";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

type User = {
  id: string;
  email: string;
  username: string | null;
};

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  initialize: () => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  // ✅ Restore session on refresh
  initialize: () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      set({
        token,
        user: JSON.parse(user),
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      set({ isLoading: false });
    }
  },

  // ✅ LOGIN
  login: async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    set({
      token: data.token,
      user: data.user,
      isAuthenticated: true,
    });
  },

  // ✅ SIGNUP (auto login)
  signup: async (email, password) => {
    console.log(email, password);
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error);

    // assume signup returns token (recommended)
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    set({
      token: data.token,
      user: data.user,
      isAuthenticated: true,
    });
  },

  // ✅ LOGOUT
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
}));
