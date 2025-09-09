import express from "express";
import {
  crearCuentaController,
  //modificarCuentaController,
  obtenerCuentasController,
  eliminarCuentaController,
} from "../controllers/cuentas.controllers.js";

const router = express.Router();

router.post("/crear-cuenta", crearCuentaController);
//router.patch("/modificar-cuenta", modificarCuentaController);
router.get("/cuentas", obtenerCuentasController);
router.delete("/eliminar-cuenta", eliminarCuentaController);

export default router;
