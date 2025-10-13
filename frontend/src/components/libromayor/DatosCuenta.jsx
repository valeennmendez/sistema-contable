import { SelectDemo } from "../Select";

function DatosCuenta({
  cuentasImputables,
  setFechaDesde,
  setFechaHasta,
  setCuenta,
}) {
  return (
    <>
      <div className="mt-3 bg-base-300 w-[20rem] rounded-md p-2 justify-center items-center flex flex-col gap-3">
        <span className="font-semibold text-center text-base-content">
          Ingresa la cuenta a consultar
        </span>
        <SelectDemo
          placeholder={"Selecciona la cuenta"}
          items={cuentasImputables}
          onChange={(value) => setCuenta(value)}
        />
      </div>
      <div className="mt-3 bg-base-300 w-[32rem] rounded-md p-2 justify-center items-center flex flex-col gap-3">
        <span className="font-semibold text-base-content">
          Ingrese rango de fechas a consultar:
        </span>
        <div>
          <span className="text-base-content font-semibold  mr-2">Desde:</span>
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
    </>
  );
}

export default DatosCuenta;
