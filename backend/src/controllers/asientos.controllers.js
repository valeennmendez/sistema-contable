import prisma from "../utils/prisma.js";

export const agregarAsientoController = async (req, res) => {
  const { fecha, descripcion, usuarioId, lineas } = req.body;
  console.log("REQ BODY: ", req.body);
  try {
    if (!fecha || !descripcion || !usuarioId || !Array.isArray(lineas))
      return res.status(400).json({ error: "Datos incompletos" });

    const totalDebe = lineas.reduce((acc, linea) => acc + (linea.debe || 0), 0);
    const totalHaber = lineas.reduce(
      (acc, linea) => acc + (linea.haber || 0),
      0
    );

    if (totalDebe !== totalHaber)
      return res.status(400).json({ erro: "No se cumple la doble partida" });

    const asiento = await prisma.$transaction(async (prismaclte) => {
      const nuevoAsiento = await prismaclte.asiento.create({
        data: {
          fecha: new Date(fecha),
          descripcion: descripcion,
          usuarioId: usuarioId,
        },
      });

      for (const linea of lineas) {
        const cuenta = await prismaclte.cuenta.findUnique({
          where: { id: linea.cuentaId },
        });
        if (!cuenta) {
          throw new Error("Cuenta invalida o inexsistente");
        }

        await prismaclte.lineaAsiento.create({
          data: {
            asientoId: nuevoAsiento.id,
            cuentaId: cuenta.id,
            debe: linea.debe || 0,
            haber: linea.haber || 0,
          },
        });

        if (linea.debe && cuenta.recibeSaldo) {
          if (
            cuenta.tipo === "ACTIVO" ||
            cuenta.tipo === "RESULTADO_NEGATIVO"
          ) {
            const cuentaActualizada = await prismaclte.cuenta.update({
              where: { id: cuenta.id },
              data: { saldo: { increment: linea.debe } },
            });

            // ✅ Validación de saldo negativo
            if (cuentaActualizada.saldo < 0) {
              throw new Error(
                `Saldo negativo no permitido en la cuenta ${cuenta.nombre}`
              );
            }
          } else if (
            ["PASIVO", "PATRIMONIO", "RESULTADO_POSITIVO"].includes(cuenta.tipo)
          ) {
            await prismaclte.cuenta.update({
              where: { id: cuenta.id },
              data: { saldo: { decrement: linea.debe } },
            });
          }
        }

        if (linea.haber && cuenta.recibeSaldo) {
          if (
            cuenta.tipo === "ACTIVO" ||
            cuenta.tipo === "RESULTADO_NEGATIVO"
          ) {
            const cuentaActualizada = await prismaclte.cuenta.update({
              where: { id: cuenta.id },
              data: { saldo: { decrement: linea.haber } },
            });

            // ✅ Validación de saldo negativo
            if (cuentaActualizada.saldo < 0) {
              throw new Error(
                `Saldo negativo no permitido en la cuenta ${cuenta.nombre}`
              );
            }
          } else if (
            ["PASIVO", "PATRIMONIO", "RESULTADO_POSITIVO"].includes(cuenta.tipo)
          ) {
            await prismaclte.cuenta.update({
              where: { id: cuenta.id },
              data: { saldo: { increment: linea.haber } },
            });
          }
        }
      }

      return nuevoAsiento;
    });

    /*TENGO QUE VERIFICAR QUE LAS CUENTAS PUEDAN RECIBIR SALDO. */

    return res.status(200).json(asiento);
  } catch (error) {
    console.log("Se produjo un error en agregarAsientoController: ", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

export const obtenerAsientoController = async (req, res) => {
  const { desde, hasta } = req.query;

  try {
    const where = {};

    if (desde || hasta) {
      where.fecha = {};

      if (desde) {
        const fechaDesde = new Date(desde);
        if (!isNaN(fechaDesde)) {
          where.fecha.gte = fechaDesde;
        }
      }

      if (hasta) {
        const fechaHasta = new Date(hasta);
        if (!isNaN(fechaHasta)) {
          where.fecha.lte = fechaHasta;
        }
      }
    }

    const asientos = await prisma.asiento.findMany({
      where,
      include: { lineas: true },
    });

    if (!asientos)
      return res
        .status(400)
        .json({ error: "Ocurrio un error al buscar los asientos" });

    return res.status(200).json({ asientos });
  } catch (error) {
    console.log("Se produjo un error en obtenerAsientoController: ", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};
export const obtenerXIdAsientoController = async (req, res) => {
  const { id } = req.query;

  try {
    const asiento = await prisma.asiento.findUnique({
      where: { id: parseInt(id) },
      include: { lineas: true },
    });
    if (!asiento)
      return res.status(400).json({ error: "El asiento no existe" });

    return res.status(200).json({ asiento });
  } catch (error) {
    console.log("Se produjo un error en obtenerXIdAsientoController: ", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

export const auditoriaAsientoController = async (req, res) => {
  const { usuarioId } = req.query;

  try {
    const asientosUsuario = await prisma.asiento.findMany({
      where: { usuarioId: parseInt(usuarioId) },
      include: { lineas: true },
    });

    if (!asientosUsuario)
      return res
        .status(400)
        .json({ error: "No se encontran los asientos del usuario" });

    return res.status(200).json({ asientosUsuario });
  } catch (error) {
    console.log("Se produjo un error en auditoriaAsientoController: ", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

export const libroMayorController = async (req, res) => {
  const { desde, hasta, cuentaId } = req.query;

  try {
    if (!cuentaId)
      return res.status(400).json({ error: "Es necesario el id de la cuenta" });

    const filtrosFecha =
      desde && hasta && !isNaN(Date.parse(desde)) && !isNaN(Date.parse(hasta))
        ? {
            fecha: {
              gte: new Date(desde),
              lte: new Date(hasta),
            },
          }
        : {};

    const asiento = await prisma.asiento.findMany({
      where: {
        ...filtrosFecha,
        lineas: {
          some: {
            cuentaId: parseInt(cuentaId),
          },
        },
      },
      include: { lineas: { where: { cuentaId: parseInt(cuentaId) } } },
      orderBy: { fecha: "asc" },
    });

    const saldoInicialLineas = await prisma.lineaAsiento.findMany({
      where: {
        cuentaId: parseInt(cuentaId),
        asiento: { fecha: { lt: new Date(desde) } },
      },
      include: { asiento: true },
    });

    const saldoInicial = saldoInicialLineas.reduce(
      (acc, linea) => acc + linea.debe - linea.haber,
      0
    );

    return res.status(200).json({ asiento, saldoInicial });
  } catch (error) {
    console.log("Se produjo un error en libroMayorController: ", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};
