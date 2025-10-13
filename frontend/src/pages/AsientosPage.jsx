import React, { useEffect } from "react";
import { Plus, Trash, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import { SelectDemo } from "../components/Select";
import { asientoStore } from "../store/asientos.store";
import { authStore } from "../store/auth.store";
import { cuentaStore } from "../store/cuentas.store";
import { extraerImputables } from "../utils/funciones";
import RegistroHistorico from "../components/asientos/RegistroHistorico";

function AsientosPage() {
  const [movimientos, setMovimientos] = useState([{ id: crypto.randomUUID() }]);
  const { authUser } = authStore();
  const { agregarAsiento, getAsientos } = asientoStore();
  const { getCuentas } = cuentaStore();
  const [cuentasImputables, setCuentasImputables] = useState(null);
  const [totalDebe, setTotalDebe] = useState(0.0);
  const [totalHaber, setTotalHaber] = useState(0.0);
  const [usuarioId, setUsuarioId] = useState(0);
  const [asientoData, setAsientoData] = useState({
    fecha: "",
    descripcion: "",
    usuarioId: authUser?.id,
    lineas: [{ cuentaId: null, debe: 0, haber: 0 }],
  });

  useEffect(() => {
    async function fetch() {
      const res = await getCuentas();
      const filtro = extraerImputables(res.data);

      setCuentasImputables(filtro);
    }

    fetch();
  }, []);

  useEffect(() => {
    if (authUser) {
      setAsientoData((prev) => ({
        ...prev,
        usuarioId: authUser.id,
      }));
    }
  }, [authUser]);

  useEffect(() => {
    const lineas = asientoData?.lineas || [];

    const debe = lineas.reduce(
      (acc, linea) => acc + parseFloat(linea.debe || 0),
      0
    );
    const haber = lineas.reduce(
      (acc, linea) => acc + parseFloat(linea.haber || 0),
      0
    );

    setTotalDebe(debe);
    setTotalHaber(haber);
  }, [asientoData.lineas]);

  function agregarMovimiento() {
    setMovimientos([...movimientos, { id: crypto.randomUUID() }]);
  }

  function eliminarMovimiento(id, index) {
    setMovimientos(movimientos.filter((mov) => mov.id !== id));
    setAsientoData((prev) => ({
      ...prev,
      lineas: prev.lineas.filter((_, i) => i !== index), // 🔑 filtrás todo menos el index
    }));
  }

  function agregarLineaData(index, field, value) {
    const valor = parseFloat(value);

    setAsientoData((prev) => {
      const nuevasLineas = [...prev.lineas];

      nuevasLineas[index] = {
        ...nuevasLineas[index],
        [field]: valor,
        ...(field === "debe" ? { haber: 0 } : {}),
        ...(field === "haber" ? { debe: 0 } : {}),
      };

      return { ...prev, lineas: nuevasLineas };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await agregarAsiento(asientoData);
    if (!res.ok) {
      console.error(res.error);
    }
    await getAsientos();
  }

  console.log("Asiento Data: ", asientoData);

  return (
    <div className="text-black min-w-[calc(100vw-15rem)] bg-base-100 p-5 min-h-[calc(100vh-4rem)]">
      <div>
        <h1 className="font-bold text-4xl text-base-content">Asientos</h1>
        <h3 className="text-sm text-base-content/40 mt-1">
          Crea los asientos contables en esta sección
        </h3>
      </div>
      <div className="m-auto text-base-content w-[90%] mt-4 border-1 border-base-content/10 rounded-md p-5">
        <div>
          <div className="flex items-center gap-1">
            <Plus />
            <h2 className="font-bold text-xl">Agregar Asiento Contable</h2>
          </div>
          <span className="text-sm text-base-content/50">
            Registre el asiento utilizando el principio de partida doble
          </span>
        </div>
        <form
          action=""
          className="text-base-content"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex mt-5 justify-around">
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-base-content">Fecha</span>
              <input
                type="date"
                className="border-1  border-base-content/30 rounded-sm w-[20rem] px-3 py-1"
                onChange={(e) =>
                  setAsientoData({
                    ...asientoData,
                    fecha: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-base-content">
                Descripcion
              </span>
              <input
                type="text"
                className="border-1 border-base-content/30 rounded-sm w-[20rem] px-3 py-1"
                placeholder="Agrega la descripción"
                onChange={(e) =>
                  setAsientoData({
                    ...asientoData,
                    descripcion: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="">
            <div className="flex items-center justify-between mb-2 mt-2">
              <h2 className="font-bold text-lg py-3 mt-2">
                Movimientos - <span className="font-light">Partida Doble</span>
              </h2>
              <span
                className="cursor-pointer mt-2 bg-base-content text-sm text-base-300 font-semibold flex items-center px-2 py-1 rounded-sm"
                onClick={() => agregarMovimiento()}
              >
                {<Plus className="size-4" />} Agregar Linea
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {movimientos.map((mov, index) => (
                <div
                  className="flex justify-around items-center border-1 rounded-md border-base-content/10 bg-base-200 py-4"
                  key={mov.id}
                >
                  <div className="flex flex-col gap-1 w-[15rem]">
                    <span className="font-semibold">Cuenta</span>
                    <SelectDemo
                      placeholder={"Selecciona la cuenta"}
                      items={cuentasImputables}
                      onChange={(value) => {
                        agregarLineaData(index, "cuentaId", value);
                      }}
                      clickeado={mov.cuentaId}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">Deber</span>
                    <input
                      type="number"
                      value={asientoData.lineas[index]?.debe || ""}
                      placeholder="0.00"
                      className="input border-1 border-base-content/10 rounded-md w-25 h-9"
                      onChange={(e) =>
                        agregarLineaData(index, "debe", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">Haber</span>
                    <input
                      type="number"
                      value={asientoData.lineas[index]?.haber || ""}
                      placeholder="0.00"
                      className="input border-1 border-base-content/10 rounded-md w-25 h-9"
                      onChange={(e) =>
                        agregarLineaData(index, "haber", e.target.value)
                      }
                    />
                  </div>
                  <div className="">
                    <span className="">
                      <Trash
                        onClick={() => eliminarMovimiento(mov.id, index)}
                        className="border-1 p-1 mt-8 size-8 rounded-md border-base-content/70 bg-base-content text-base-300 cursor-pointer"
                      />
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-5 mt-4 items-center justify-between">
              <div>
                <span className="font-semibold">
                  Total Debe:{" "}
                  <span className="border-1 rounded-md px-2 py-0.5 border-base-content/30 font-mono font-light text-sm">
                    ${totalDebe}
                  </span>{" "}
                </span>
                <span className="font-semibold">
                  Total Haber:{" "}
                  <span className="border-1 rounded-md px-2 py-0.5 border-base-content/30 font-mono font-light text-sm">
                    ${totalHaber}
                  </span>{" "}
                </span>
              </div>
              <div>
                {totalDebe === totalHaber ? (
                  <div className="flex  items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="text-green-600">Asiento equilibrado</span>
                  </div>
                ) : (
                  <div className="flex  items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span className="text-red-600">Asiento NO equilibrado</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <button
                className={`${
                  totalDebe === totalHaber
                    ? `bg-base-content`
                    : `bg-base-content/30`
                }  text-base-300 font-semibold rounded-md w-full h-8 mt-5 cursor-pointer transition-colors duration-300`}
                type="submit"
                disabled={totalDebe !== totalHaber}
              >
                Agregar Asiento
              </button>
            </div>
          </div>
        </form>
      </div>
      <RegistroHistorico />
    </div>
  );
}

export default AsientosPage;

/* COMPONETIZAR LO MAS POSIBLE DESPUES */
