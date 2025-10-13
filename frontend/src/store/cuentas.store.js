import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";

export const cuentaStore = create((set, get) => ({
  cuentas: [],
  cuentasActivas: [],
  cuentasDesactivadas: [],

  getCuentas: async () => {
    try {
      const res = await axiosInstance.get("plan-cuentas/cuentas");
      set({ cuentas: res.data });
      return res;
    } catch (error) {
      console.log("Ocurrio un error en getcuentas: ", error);
      return;
    }
  },

  getCodigo: async (data) => {
    try {
      const res = await axiosInstance.get(
        `plan-cuentas/obtener-codigo?id=${data}`
      );
      return res.data.codigo;
    } catch (error) {
      console.log("Error en getCodigo: ", error);
      return;
    }
  },

  agregarCuenta: async (data) => {
    try {
      if (data.padreId === "null") {
        data.padreId = null;
      }
      const res = await axiosInstance.post("plan-cuentas/crear-cuenta", data);
      return res.data;
    } catch (error) {
      console.log("Error en agregarCuenta: ", error);
      return;
    }
  },

  eliminarCuenta: async (data) => {
    try {
      const res = await axiosInstance.delete(
        `plan-cuentas/eliminar-cuenta?id=${data}`
      );
      return res;
    } catch (error) {
      console.log("Error en eliminarCuenta: ", error);
      toast.error(error.response.data.error);
      return;
    }
  },

  desactivarCuenta: async (data) => {
    try {
      const res = await axiosInstance.patch(
        `plan-cuentas/desactivar-cuenta?id=${data}`
      );
      return res;
    } catch (error) {
      console.log("Error al desactivar la cuenta: ", error);
      return;
    }
  },
}));
