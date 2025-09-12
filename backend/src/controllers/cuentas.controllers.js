import prisma from "../utils/prisma.js";

export const crearCuentaController = async (req, res) => {
  const {
    codigo,
    nombre,
    padreId,
    imputable = false,
    activa = true,
    tipo,
  } = req.body;

  const tiposValidos = [
    "ACTIVO",
    "PASIVO",
    "PATRIMONIO",
    "RESULTADO_POSITIVO",
    "RESULTADO_NEGATIVO",
  ];

  try {
    if (!codigo || !nombre) {
      return res.status(400).json({ error: "Código y nombre son requeidos." });
    }

    console.log("TIPO DE DATO: ", typeof codigo);
    console.log("CODIGO: ", codigo);

    const cuenta = await prisma.cuenta.findUnique({
      where: { codigo: codigo.toString() },
    });

    if (cuenta)
      return res
        .status(400)
        .json({ error: "Ya existe una cuenta con ese codigo." });

    if (!tiposValidos.includes(tipo)) {
      return res.status(400).json({ error: "Tipo de cuenta inválido." });
    }

    if (padreId) {
      const padre = await prisma.cuenta.findUnique({
        where: { id: parseInt(padreId) },
      });
      if (!padre) {
        return res.status(400).json({ error: "La cuenta padre no existe" });
      }
      if (padre.imputable) {
        return res.status(400).json({
          error: "No se puede agregar una cuenta hija a una cuenta imputable",
        });
      }
    }

    const nuevaCuenta = await prisma.cuenta.create({
      data: {
        codigo: codigo.toString(),
        nombre: nombre,
        padreId: parseInt(padreId),
        imputable: imputable,
        tipo: tipo,
        activa: activa,
        recibeSaldo: imputable,
      },
    });

    if (nuevaCuenta)
      return res
        .status(201)
        .json({ message: "Cuenta creada exitosamente!", cuenta: nuevaCuenta });
    else {
      return res
        .status(400)
        .json({ error: "Ocurrio un error al crear la cuenta" });
    }
  } catch (error) {
    console.log("Se produjo un error en crearCuentaController: ", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const obtenerCuentasController = async (req, res) => {
  try {
    const cuentas = await prisma.cuenta.findMany({
      where: { activa: true },
      orderBy: { codigo: "asc" },
    });

    const mapa = new Map();
    cuentas.forEach((cuenta) => {
      mapa.set(cuenta.id, { ...cuenta, hijos: [] });
    });

    const arbol = [];

    mapa.forEach((cuenta) => {
      if (cuenta.padreId) {
        const padre = mapa.get(cuenta.padreId);
        if (padre) {
          padre.hijos.push(cuenta);
        }
      } else {
        arbol.push(cuenta);
      }
    });

    res.status(200).json(arbol);
  } catch (error) {
    console.log("Ocurrio un error en obtenerCuentasController: ", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

/* export const modificarCuentaController = (req, res) => { Preguntar si debo permitir la edicion de cuentas 
  const { id } = req.query;

  try {
  } catch (error) {
    console.log("Ocurrio un error en modificarCuentaController: ", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
}; */

export const eliminarCuentaController = async (req, res) => {
  const { id } = req.query;

  try {
    const cuenta = await prisma.cuenta.findUnique({
      where: { id: parseInt(id) },
      include: { hijos: true },
    });
    if (!cuenta) return res.status(400).json({ error: "La cuenta no existe" });

    if (cuenta.hijos.length !== 0) {
      return res
        .status(400)
        .json({ error: "No se puede eliminar una cuenta con cuentas hijas." });
    }

    /*AGREGAR VERIFICACION DE QUE LA CUENTA NO FUE USADA EN NINGUN ASIENTO*/

    const eliminar = await prisma.cuenta.delete({ where: { id: id } });
    if (eliminar) {
      return res
        .status(200)
        .json({ message: "Cuenta eliminada exitosamente!" });
    }
  } catch (error) {
    console.log("Ocurrio un error en eliminarCuentaController: ", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

export const obtenerCodigoController = async (req, res) => {
  const { id } = req.query;
  try {
    if (!id || id === "null") {
      const cuentasRaiz = await prisma.cuenta.findMany({
        where: { padreId: null },
      });

      const nuevoCodigo = (cuentasRaiz.length + 1) * 100;

      return res.status(200).json({ codigo: nuevoCodigo.toString() });
    }

    const codigoPadre = await prisma.cuenta.findUnique({
      where: { id: parseInt(id) },
      include: { hijos: true },
    });

    if (!codigoPadre)
      return res.status(400).json({ error: "No existe cuenta con ese id" });

    let codigoGenerado;

    if (codigoPadre.padreId === null) {
      //Significa que es la raiz
      codigoGenerado =
        parseInt(codigoPadre.codigo) + (codigoPadre.hijos.length + 1) * 10;
    } else {
      codigoGenerado =
        parseInt(codigoPadre.codigo) + codigoPadre.hijos.length + 1;
    }

    return res.status(200).json({ codigo: codigoGenerado });
  } catch (error) {
    console.log("Ocurrio un error en obtenerCodigoController: ", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

/*AGREGAR FUNCIONALIDADES A LOS BOTONES Y LISTO 
EN EL FRONT AGREGAR EL MIDDLEWARE
*/
