import prisma from "../utils/prisma.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";

export const loginController = async (req, res) => {
  const { email, contrasenia } = req.body;
  try {
    if (!email || !contrasenia)
      return res.status(400).json({ error: "Se requieren todos los campos" });

    const usuario = await prisma.usuarios.findFirst({
      where: { email: email },
    });

    if (!usuario)
      return res.status(400).json({ error: "El usuario no fue encontrado" });

    const compareHash = await bcrypt.compare(contrasenia, usuario.contrasenia);

    if (!compareHash) {
      return res.status(400).json({ error: "Las contraseñas no coinciden" });
    }

    await generateToken(usuario.id, res);

    return res.status(200).json({ usuario });
  } catch (error) {
    console.log("Se produjo un error en loginController: ", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

export const addUserController = async (req, res) => {
  const { nombre_completo, email, contrasenia, rol } = req.body;
  try {
    if (!nombre_completo || !email || !contrasenia || !rol)
      return res.status(400).json({ error: "Todos los campos son requeridos" });

    const emailExist = await prisma.usuarios.findFirst({
      where: { email },
    });

    if (emailExist)
      return res.status(400).json({ error: "El correo ya existe" });

    const salt = await bcrypt.genSalt(10);
    const hashedContrasenia = await bcrypt.hash(contrasenia, salt);

    const nuevoUsuario = await prisma.usuarios.create({
      data: {
        nombre_completo: nombre_completo,
        email: email,
        contrasenia: hashedContrasenia,
        rol: rol,
      },
    });

    if (nuevoUsuario)
      return res.status(200).json({ message: "Usuario creado!" });
    else {
      return res.status(500).json({ message: "No se pudo crear el usuario" });
    }
  } catch (error) {
    console.log("Se produjo un error en addUserController: ", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

export const getAllUserController = async (req, res) => {
  try {
    const usuarios = await prisma.usuarios.findMany();

    if (usuarios.length === 0)
      return res
        .status(404)
        .json({ error: "No se pudieron encontrar los usuarios." });

    return res.status(200).json({ usuarios });
  } catch (error) {
    console.log("Se produjo un error en getAllUserController: ", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

export const deleteUserController = async (req, res) => {
  const { id } = req.query;

  try {
    const usuarios = await prisma.usuarios.delete({
      where: { id: parseInt(id, 10) },
    });

    console.log(usuarios);

    return res.status(200).json({ message: "Usuario eliminado!" });
  } catch (error) {
    console.log("Se produjo un error en deleteUserController: ", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

export const checkController = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error en controlador checkController: ", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const logoutController = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "Deslogueado exitosamente." });
  } catch (error) {
    console.log("Error al desloguearse", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
