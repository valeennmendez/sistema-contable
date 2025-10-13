import { useState, useEffect } from "react";
import { asientoStore } from "../../store/asientos.store";
import Tabla from "./Tabla";

function RegistroHistorico() {
  const { getAsientos, asientos } = asientoStore();
  const [desde, setDesde] = useState(null);
  const [hasta, setHasta] = useState(null);

  useEffect(() => {
    getAsientos(desde, hasta);
  }, [getAsientos, desde, hasta]);

  console.log("Asientos: ", asientos);

  return (
    <div className="mt-10">
      <div>
        <div>
          <h1 className="font-bold text-4xl text-base-content">
            Registro Histórico de Asientos
          </h1>
          <h3 className="text-sm text-base-content/40 mt-1">
            Listado de todos los asientos creados.
          </h3>
        </div>
        <div className="flex items-center justify-end">
          <form action="" className="flex gap-10">
            <div className="bg-base-content/20 px-2 py-1 rounded-md">
              <span className="font-semibold ">Desde: </span>
              <input
                type="date"
                onChange={(e) => setDesde(e.target.value)}
                className=" px-2 "
              />
            </div>
            <div className="bg-base-content/20 px-2 py-1 rounded-md flex items-center gap-1.5">
              <span className="font-semibold">Hasta:</span>
              <input
                type="date"
                onChange={(e) => setHasta(e.target.value)}
                className=" px-2 "
              />
            </div>
          </form>
        </div>
      </div>
      <div>
        <Tabla asientos={asientos} />
      </div>
    </div>
  );
}

export default RegistroHistorico;
