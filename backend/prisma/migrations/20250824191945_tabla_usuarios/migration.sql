-- CreateEnum
CREATE TYPE "public"."Rol" AS ENUM ('A', 'C');

-- CreateTable
CREATE TABLE "public"."Usuario" (
    "id" SERIAL NOT NULL,
    "nombre_completo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contrasenia" TEXT NOT NULL,
    "rol" "public"."Rol" NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);
