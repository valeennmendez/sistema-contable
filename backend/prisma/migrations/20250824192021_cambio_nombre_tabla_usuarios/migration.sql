/*
  Warnings:

  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Usuario";

-- CreateTable
CREATE TABLE "public"."Usuarios" (
    "id" SERIAL NOT NULL,
    "nombre_completo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contrasenia" TEXT NOT NULL,
    "rol" "public"."Rol" NOT NULL,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id")
);
