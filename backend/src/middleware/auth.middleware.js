import dotenv from "dotenv";
import prisma from "../utils/prisma.js";
import jwt from "jsonwebtoken";

dotenv.config();

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(403).json({ message: "Acceso denegado" });

    const decode = jwt.verify(token, process.env.SECRET_KEY);

    if (!decode) return res.status(401).json({ message: "Acceso denegado" });

    const usuario = await prisma.usuarios.findFirst({
      where: { id: decode.id },
      omit: { contrasenia: true },
    });

    req.user = usuario;

    next();
  } catch (error) {
    console.log("Se produjo un error en protectedRoute", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};
