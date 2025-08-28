import { create } from "zustand";
import { axiosInstance } from "../utils/axios";

export const authStore = create((set, get) => ({
  isLoginging: false,
  authUser: null,

  login: async (data) => {
    set({ isLoginging: true });
    try {
      const res = await axiosInstance.post("auth/login", data);
      set({ authUser: res.data.usuario });
      return res;
    } catch (error) {
      console.log("Ocurrio un error al logearse");
    } finally {
      set({ isLoginging: false });
    }
  },

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("auth/check", {
        withCredentials: true,
      });
      set({ authUser: res.data });
      return res;
    } catch (error) {
      console.log("Error en checkAuth", error);
      set({ authUser: null });
      return error;
    }
  },
}));
