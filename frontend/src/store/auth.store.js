import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";

export const authStore = create((set, get) => ({
  isLoginging: false,
  authUser: null,

  login: async (data) => {
    set({ isLoginging: true });
    try {
      const res = await axiosInstance.post("auth/login", data);
      console.log("RESPONSE: ", res);
      set({ authUser: res.data.usuario });
      return res;
    } catch (error) {
      toast.error(error.response.data.error);
      console.log("Ocurrio un error al logearse: ", error);
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

  logout: async () => {
    try {
      await axiosInstance.post("auth/logout");
    } catch (error) {
      console.error("Ocurrio un error al cerrar la cuenta.");
    }
  },

  desactivarUsuario: async (data) => {
    try {
      const res = await axiosInstance.patch(
        `auth/desactivar-usuario?id=${data}`
      );
      return res;
    } catch (error) {
      console.log("Error al desactivar al usuario: ", error);
      return;
    }
  },
}));
