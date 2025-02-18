import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, confirmPassword, navigate }) => {
    set({ loading: true });
    if (password !== confirmPassword) {
      set({ loading: false });
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("/auth/signup", {
        name,
        email,
        password,
      });

      set({ user: res.data, loading: false });
      toast.success("Signup successful");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to signup: " + error.message);
    }
  },

  login: async ({ email, password, navigate }) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      });
      console.log(res.data);

      set({ user: res.data, loading: false });
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      toast.error("Failed to login: " + error.message);
    }
    set({ loading: false });
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const res = await axios.get("/auth/profile");
      set({ user: res.data, checkingAuth: false });
    } catch (error) {
      set({ user: null, checkingAuth: false });
      console.log("Error in checkAuth: " + error.message);
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/logout");
      set({ user: null, loading: false });
    } catch (error) {
      toast.error("Failed to logout: " + error.message);
    }
  },
}));
