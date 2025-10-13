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

    if (usuario.activa === false) {
      return res.status(404).json({
        error:
          "La cuenta esta desactivada. Por favor, contactate con un administrador",
      });
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

export const desactivarUsuarioController = async (req, res) => {
  const { id } = req.query;
  try {
    if (!id) return res.status(400).json({ error: "Es necesario el id" });

    const usuario = await prisma.usuarios.findUnique({
      where: { id: parseInt(id) },
    });

    if (!usuario) return res.status(400).json({ error: "La cuenta no existe" });

    const desactivar = await prisma.usuarios.update({
      where: { id: parseInt(id) },
      data: {
        activa: !usuario.activa,
      },
    });

    if (!desactivar)
      return res
        .status(400)
        .json({ error: "Ocurrio un error al desactivar la cuenta" });

    return res.status(200).json({ message: "Cuenta desactivada" });
  } catch (error) {
    console.log("Ocurrio un error en desactivarCuenta: ", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

export const modificarUsuarioController = async (req, res) => {
  const { nombre_completo, email, contrasenia, rol } = req.body;
  const { id } = req.query;

  try {
    const datosCuenta = await prisma.usuarios.findUnique({
      where: { id: parseInt(id) },
    });

    if (!datosCuenta)
      return res.status(400).json({ error: "No se encontro la cuenta" });

    console.log("Datos cuenta: ", datosCuenta);

    let hashedContrasenia;

    if (contrasenia) {
      const salt = await bcrypt.genSalt(10);
      hashedContrasenia = await bcrypt.hash(contrasenia, salt);
    }

    const modificarDatos = await prisma.usuarios.update({
      where: { id: parseInt(id) },
      data: {
        nombre_completo: nombre_completo || datosCuenta.nombre_completo,
        email: email || datosCuenta.email,
        contrasenia: hashedContrasenia || datosCuenta.contrasenia,
        rol: rol || datosCuenta.rol,
      },
    });

    if (!modificarDatos)
      return res.status(400).json({ error: "Error al modificar usuario." });

    return res.status(200).json({
      datosAntiguos: {
        id: datosCuenta.id,
        nombre_completo: datosCuenta.nombre_completo,
        email: datosCuenta.email,
        rol: datosCuenta.rol,
      },
      message: "Usuario modificado",
    });
  } catch (error) {
    console.log("Ocurrio un error en modificarUsuarioController: ", error);
    return res.status(500).json({ error: "Error en el servidor." });
  }
};

export const obtenerUsuarioController = async (req, res) => {
  const { id } = req.query;

  try {
    if (!id) return res.status(400).json({ error: "Es necesario el id" });

    const usuario = await prisma.usuarios.findUnique({
      where: { id: parseInt(id) },
    });

    if (!usuario)
      return res.status(400).json({ error: "El usuarion no existe" });

    return res.status(200).json({
      datosUsuario: {
        nombre_completo: usuario.nombre_completo,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.log("Error en obtenerUsuarioController: ", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};
