import express from "express";
import {
  crearCuentaController,
  obtenerCuentasController,
  desactivarCuenta,
  eliminarCuentaController,
  obtenerCodigoController,
  obtenerSaldosCuentas,
} from "../controllers/cuentas.controllers.js";

const router = express.Router();

router.post("/crear-cuenta", crearCuentaController);
//router.patch("/modificar-cuenta", modificarCuentaController);
router.get("/cuentas", obtenerCuentasController);
router.delete("/eliminar-cuenta", eliminarCuentaController);
router.get("/obtener-codigo", obtenerCodigoController);
router.patch("/desactivar-cuenta", desactivarCuenta);
router.get("/estadisticas/saldos", obtenerSaldosCuentas);

export default router;
