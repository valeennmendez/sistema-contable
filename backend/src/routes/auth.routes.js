import express from "express";
import {
  loginController,
  addUserController,
  getAllUserController,
  deleteUserController,
  checkController,
  logoutController,
  desactivarUsuarioController,
} from "../controllers/auth.controllers.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", loginController);
router.post("/add-user", addUserController);
router.get("/users", getAllUserController);
router.delete("/delete-user", deleteUserController);
router.post("/logout", logoutController);
router.get("/check", protectedRoute, checkController);
router.patch("/desactivar-usuario", desactivarUsuarioController);

export default router;
