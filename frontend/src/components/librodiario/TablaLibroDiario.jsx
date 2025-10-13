import { useMemo } from "react";
import { cuentaStore } from "../../store/cuentas.store";

function TablaLibroDiario({ asientos = [] }) {
  const { getCuentas, cuentas } = cuentaStore();

  const cuentaMap = useMemo(() => {
    const map = new Map();

    const recorrer = (cuentas) => {
      cuentas.forEach((cuenta) => {
        map.set(cuenta.id, cuenta.nombre);
        if (cuenta.hijos && cuenta.hijos.length > 0) {
          recorrer(cuenta.hijos);
        }
      });
    };
    recorrer(cuentas);
    return map;
  }, [cuentas]);

  return (
    <div className="border-1 border-base-content/5 rounded-md mt-6 overflow-hidden">
      <table className="w-full ">
        <thead className="bg-transparent text-base-content/70  text-left">
          <tr>
            <th className="p-2 font-semibold">Fecha</th>
            <th className="p-2 font-semibold">Descripción</th>
            <th className="p-2 font-semibold">Cuenta</th>
            <th className="p-2 font-semibold">Debe</th>
            <th className="p-2 font-semibold ">Haber</th>
          </tr>
        </thead>
        <tbody className="text-base-content">
          {asientos.map((asiento) => {
            const totalDebe = asiento.lineas.reduce(
              (acc, l) => acc + l.debe,
              0
            );
            const totalHaber = asiento.lineas.reduce(
              (acc, l) => acc + l.haber,
              0
            );

            return (
              <>
                <tr
                  key={asiento.id}
                  className="cursor-pointer hover:bg-base-200 transition-colors duration-300 font-normal border-t-1 border-base-content/10"
                >
                  <td className="p-2 px-3 font-semibold font-mono">
                    {new Date(asiento.fecha).toLocaleDateString("es-AR", {
                      timeZone: "UTC",
                    })}
                  </td>
                  <td className="p-2">{asiento.descripcion}</td>
                  <td className="p-2">
                    <span className="bg-base-300 px-2 rounded-md text-sm font-semibold py-0.5">
                      {asiento.lineas.length} movimientos{" "}
                    </span>
                  </td>
                  <td className="p-2 font-mono">
                    <span>
                      {totalDebe === 0 ? (
                        "-"
                      ) : (
                        <span>$ {totalDebe.toFixed(2)}</span>
                      )}
                    </span>
                  </td>
                  <td className="p-2 font-mono">
                    <span>
                      {totalHaber === 0 ? (
                        "-"
                      ) : (
                        <span>$ {totalHaber.toFixed(2)}</span>
                      )}
                    </span>
                  </td>
                </tr>

                {/* filas detalle */}
                {asiento.lineas.map((linea, i) => (
                  <tr key={`${asiento.id}-${i}`} className="bg-base-200">
                    <td className="p-2"></td>
                    <td className="p-2"></td>
                    <td
                      className={`p-2 font-normal ${
                        linea.debe ? "text-left" : "text-right"
                      }`}
                    >
                      <span
                        className={`${
                          linea.debe != 0 ? `text-green-600` : `text-blue-600`
                        } text-sm font-semibold`}
                      >
                        {" "}
                        {cuentaMap.get(linea.cuentaId)}
                      </span>
                    </td>
                    <td className="p-2  text-sm font-mono">
                      {linea.debe ? (
                        <span className=" rounded-sm px-1 py-0.5 bg-green-500/10 border-1 border-green-600 font-semibold text-green-600">
                          ${linea.debe.toFixed(2)}
                        </span>
                      ) : (
                        <span className="">-</span>
                      )}
                    </td>
                    <td className="p-2  text-sm font-mono">
                      {linea.haber ? (
                        <span className=" rounded-sm px-1 py-0.5 bg-blue-500/10 border-1 border-blue-600 font-semibold text-blue-600">
                          ${linea.haber.toFixed(2)}
                        </span>
                      ) : (
                        <span className="">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TablaLibroDiario;
