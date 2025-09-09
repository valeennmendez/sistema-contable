/*
  Warnings:

  - Added the required column `tipo` to the `Cuenta` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."TipoCuenta" AS ENUM ('ACTIVO', 'PASIVO', 'PATRIMONIO', 'RESULTADO_POSITIVO', 'RESULTADO_NEGATIVO');

-- AlterTable
ALTER TABLE "public"."Cuenta" ADD COLUMN     "recibeSaldo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "tipo" "public"."TipoCuenta" NOT NULL;
