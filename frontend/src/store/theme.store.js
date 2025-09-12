import { create } from "zustand";

export const themeStore = create((set, get) => ({
  modoNoche: false,

  cambiarTheme: (data) => {
    set({ modoNoche: data });
  },
}));
