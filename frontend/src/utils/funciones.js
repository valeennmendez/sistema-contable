import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const recolectarNombresNoImputables = (lista) => {
  let resultado = [];

  lista.forEach((cuenta) => {
    if (cuenta.imputable === false) {
      resultado.push({
        nombre: cuenta.nombre,
        id: cuenta.id,
        tipo: cuenta.tipo,
      });
    }

    if (cuenta.hijos && cuenta.hijos.length > 0) {
      resultado = resultado.concat(recolectarNombresNoImputables(cuenta.hijos));
    }
  });

  return resultado;
};

export const extraerImputables = (cuentas) => {
  let resultado = [];

  for (const cuenta of cuentas) {
    if (cuenta.imputable) {
      resultado.push({
        nombre: cuenta.nombre,
        id: cuenta.id,
      });
    }

    if (cuenta.hijos && cuenta.hijos.length > 0) {
      resultado = resultado.concat(extraerImputables(cuenta.hijos));
    }
  }

  return resultado;
};
