import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = async (id, res) => {
  const token = jwt.sign({ id: id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};
