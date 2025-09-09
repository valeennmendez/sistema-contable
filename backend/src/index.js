import express from "express";
import authRoutes from "./routes/auth.routes.js";
import cuentasRoutes from "./routes/plancuentas.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());

app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/api/auth", authRoutes);
app.use("/api/plan-cuentas", cuentasRoutes);

app.listen(5001, () => {
  console.log("Servidor corriendo en puerto 5001");
});
