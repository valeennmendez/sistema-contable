-- CreateTable
CREATE TABLE "public"."Cuenta" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "padreId" INTEGER,
    "imputable" BOOLEAN NOT NULL DEFAULT false,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cuenta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cuenta_codigo_key" ON "public"."Cuenta"("codigo");

-- AddForeignKey
ALTER TABLE "public"."Cuenta" ADD CONSTRAINT "Cuenta_padreId_fkey" FOREIGN KEY ("padreId") REFERENCES "public"."Cuenta"("id") ON DELETE SET NULL ON UPDATE CASCADE;
