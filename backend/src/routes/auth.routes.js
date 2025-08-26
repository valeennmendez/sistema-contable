import express from "express";
import {
  loginController,
  addUserController,
  getAllUserController,
  deleteUserController,
} from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/login", loginController);
router.post("/add-user", addUserController);
router.get("/users", getAllUserController);
router.delete("/delete-user", deleteUserController);

export default router;
