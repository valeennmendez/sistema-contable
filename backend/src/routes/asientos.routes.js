import express from "express";
import {
  agregarAsientoController,
  auditoriaAsientoController,
  obtenerAsientoController,
  obtenerXIdAsientoController,
} from "../controllers/asientos.controllers.js";

const router = express.Router();

router.post("/asiento", agregarAsientoController);
router.get("/asientos", obtenerAsientoController); //tengo que poder filtrar por fechas
router.get("/asientosid", obtenerXIdAsientoController);
router.get("/asientos-auditoria", auditoriaAsientoController);

export default router;
