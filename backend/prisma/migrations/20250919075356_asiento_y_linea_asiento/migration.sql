-- CreateTable
CREATE TABLE "public"."Asiento" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Asiento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LineaAsiento" (
    "id" SERIAL NOT NULL,
    "asientoId" INTEGER NOT NULL,
    "cuentaId" INTEGER NOT NULL,
    "debe" DOUBLE PRECISION,
    "haber" DOUBLE PRECISION,

    CONSTRAINT "LineaAsiento_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Asiento" ADD CONSTRAINT "Asiento_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LineaAsiento" ADD CONSTRAINT "LineaAsiento_asientoId_fkey" FOREIGN KEY ("asientoId") REFERENCES "public"."Asiento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LineaAsiento" ADD CONSTRAINT "LineaAsiento_cuentaId_fkey" FOREIGN KEY ("cuentaId") REFERENCES "public"."Cuenta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
