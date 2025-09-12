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
