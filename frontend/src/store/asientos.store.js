import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";

export const asientoStore = create((set, get) => ({
  asientos: [],

  agregarAsiento: async (data) => {
    try {
      const res = await axiosInstance.post("asientos/asiento", data);
      if (res.status === 200) {
        toast.success("Asiento Cargado");
        return { ok: true };
      }
    } catch (error) {
      console.log("Error en agregarAsiento: ", error);
      toast.error("Error al cargar el asiento");
      return { ok: false, error };
    }
  },

  getAsientos: async (desde, hasta) => {
    try {
      const res = await axiosInstance.get(
        `asientos/asientos?desde=${desde}&hasta=${hasta}`
      );
      set({ asientos: res.data.asientos });
    } catch (error) {
      console.log("Error en getAsientos: ", error);
      toast.error("Error al obtener asientos");
      return { ok: false, error };
    }
  },

  getLibroMayor: async (desde, hasta, cuentaId) => {
    try {
      const res = await axiosInstance.get(
        `asientos/libromayor?desde=${desde}&hasta=${hasta}&cuentaId=${cuentaId}`
      );
      return res;
    } catch (error) {
      console.log("Error en getLibroMayor: ", error);
      return { ok: false, error };
    }
  },
}));
