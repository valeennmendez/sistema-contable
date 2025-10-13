import TablaLibroDiario from "../components/librodiario/TablaLibroDiario";
import { asientoStore } from "../store/asientos.store";
import { useEffect, useState } from "react";

function LibroDiarioPage() {
  const { getAsientos, asientos } = asientoStore();
  const [fechaDesde, setFechaDesde] = useState(null);
  const [fechaHasta, setFechaHasta] = useState(null);
  const [totalDebe, setTotalDebe] = useState(0);
  const [totalHaber, setTotalHaber] = useState(0);

  useEffect(() => {
    getAsientos(fechaDesde, fechaHasta);
  }, [getAsientos, fechaDesde, fechaHasta]);

  useEffect(() => {
    const totalDebeGlobal = asientos.reduce((accAsientos, asiento) => {
      const lineas = asiento?.lineas || [];
      const totalDebeAsiento = lineas.reduce(
        (accLineas, linea) => accLineas + linea.debe,
        0
      ); 
      return accAsientos + totalDebeAsiento;
    }, 0);

    const totalHaberGlobal = asientos.reduce((accAsientos, asiento) => {
      const lineas = asiento?.lineas || [];
      const totalDebeAsiento = lineas.reduce(
        (accLineas, linea) => accLineas + linea.debe,
        0
      );
      return accAsientos + totalDebeAsiento;
    }, 0);

    setTotalDebe(totalDebeGlobal);
    setTotalHaber(totalHaberGlobal);
  }, [asientos]);

  return (
    <div className="text-black min-w-[calc(100vw-15rem)] bg-base-100 p-5 min-h-[calc(100vh-4rem)]">
      <div>
        <h1 className="font-bold text-4xl text-base-content">Libro diario</h1>
        <h3 className="text-sm text-base-content/40 mt-1">
          En esta seccion podrás consultar el libro diario.
        </h3>
      </div>
      <div>
        <div className="flex flex-row gap-4 justify-between">
          <div className="mt-3 bg-base-300 w-[32rem] rounded-md p-2 justify-center items-center flex flex-col gap-3">
            <span className="font-semibold text-base-content">
              Ingrese rango de fechas a consultar:
            </span>
            <div>
              <span className="text-base-content font-semibold  mr-2">
                Desde:
              </span>
              <input
                type="date"
                className="border-base-content/70 border-1 rounded-sm text-base-content font-semibold px-3 w-42"
                onChange={(e) => setFechaDesde(e.target.value)}
              />
              <span className="text-base-content font-semibold ml-5 mr-2">
                Hasta:
              </span>
              <input
                type="date"
                className="border-base-content/70 border-1 rounded-sm text-base-content font-semibold px-3 w-42"
                onChange={(e) => setFechaHasta(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-3 bg-base-300 w-[32rem] rounded-md p-2 justify-center items-center flex flex-row gap-3">
            <span className="text-green-600 font-semibold">
              Total Debe:{" "}
              <span className="font-mono bg-green-500/10 px-1 py-0.5 rounded-sm border-1 border-green-600">
                ${totalDebe}
              </span>
            </span>
            <span className="text-blue-600 font-semibold">
              Total haber:{" "}
              <span className="font-mono bg-blue-500/10 px-1 py-0.5 rounded-sm border-1 border-blue-600">
                ${totalHaber}
              </span>
            </span>
          </div>
        </div>

        <TablaLibroDiario asientos={asientos} />
      </div>
    </div>
  );
}

export default LibroDiarioPage;
