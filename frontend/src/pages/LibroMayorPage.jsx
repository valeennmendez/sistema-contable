import { cuentaStore } from "@/store/cuentas.store";
import { useEffect, useState } from "react";
import { extraerImputables } from "@/utils/funciones";
import DatosCuenta from "../components/libromayor/DatosCuenta";
import { asientoStore } from "@/store/asientos.store";
import TablaLibroDiario from "../components/librodiario/TablaLibroDiario";

function LibroMayorPage() {
  const { getCuentas, cuentas } = cuentaStore();
  const { getLibroMayor } = asientoStore();
  const [cuentasImputables, setCuentasImputables] = useState(null);
  const [fechaDesde, setFechaDesde] = useState(null);
  const [fechaHasta, setFechaHasta] = useState(null);
  const [cuenta, setCuenta] = useState(null);
  const [libromayor, setLibroMayor] = useState([]);
  const [saldoInicial, setSaldoInicial] = useState(null);

  useEffect(() => {
    async function fetch() {
      const res = await getCuentas();
      const filtro = extraerImputables(res.data);
      setCuentasImputables(filtro);
    }
    fetch();
  }, []);

  useEffect(() => {
    async function fetch() {
      const res = await getLibroMayor(fechaDesde, fechaHasta, cuenta);
      setLibroMayor(res.data.asiento);
      setSaldoInicial(res.data.saldoInicial);
    }

    fetch();
  }, [fechaDesde, fechaHasta, cuenta]);

  console.log("Libro mayor:", libromayor);

  return (
    <div className="text-black min-w-[calc(100vw-15rem)] bg-base-100 p-5 min-h-[calc(100vh-4rem)]">
      <div>
        <h1 className="font-bold text-4xl text-base-content">Libro Mayor</h1>
        <h3 className="text-sm text-base-content/40 mt-1">
          En esta seccion podrás consultar el libro mayor.
        </h3>
      </div>
      <div className="flex gap-5">
        <DatosCuenta
          cuentasImputables={cuentasImputables}
          setFechaDesde={setFechaDesde}
          setFechaHasta={setFechaHasta}
          setCuenta={setCuenta}
        />
      </div>
      <div>
        <div className="w-full flex justify-end px-2">
          <span className="text-base-content font-mono font-semibold border-1 px-2 rounded-sm border-base-content/70">
            Saldo Inicial: $ {saldoInicial === null ? "-" : saldoInicial}
          </span>
        </div>
        <TablaLibroDiario asientos={libromayor} />
      </div>
    </div>
  );
}

export default LibroMayorPage;
