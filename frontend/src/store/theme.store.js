import toast from "react-hot-toast";
import { create } from "zustand";

export const themeStore = create((set, get) => ({
  modoNoche: false,

  cambiarTheme: (data) => {
    if (data === false)
      toast("Modo Noche Activado", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    console.log("data: ", data);
    set({ modoNoche: data });
  },
}));
