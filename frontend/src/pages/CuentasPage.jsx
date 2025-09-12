import { useState, useEffect } from "react";
import { cuentaStore } from "../store/cuentas.store";
import { TreeTable } from "@/components/PlanDeCuentas";
import Toggle from "../components/Toggle";
import { Plus } from "lucide-react";
import { SelectDemo } from "../components/Select";
import { recolectarNombresNoImputables } from "../utils/funciones";

function CuentasPage() {
  const { getCuentas, cuentas, getCodigo, agregarCuenta } = cuentaStore();
  const itemsTipos = [
    { nombre: "Activo", id: "ACTIVO" },
    { nombre: "Pasivo", id: "PASIVO" },
    { nombre: "R+", id: "RESULTADO_POSITIVO" },
    { nombre: "R-", id: "RESULTADO_NEGATIVO" },
  ];
  const [codigo, setCodigo] = useState("Se genera automaticamente");
  const [cuentaPadre, setCuentaPadre] = useState("");
  const [itemsCuentasPadres, setItemsCuentasPadres] = useState([]);
  const [tipoCuenta, setTipoCuenta] = useState("");

  const [cuentaData, setCuentaData] = useState({
    codigo: codigo,
    nombre: "",
    padreId: null,
    imputable: false,
    activa: true,
    tipo: "",
  });

  console.log("CuentaData: ", cuentaData);

  useEffect(() => {
    if (cuentas) {
      const nombresNoImputables = recolectarNombresNoImputables(
        cuentas,
        tipoCuenta
      );
      const conSinPadre = [
        { nombre: "Sin padre", id: "null" },
        ...nombresNoImputables,
      ];

      const filtradasPorTipo = conSinPadre.filter(
        (cuenta) => cuenta.tipo === tipoCuenta || cuenta.id === "null"
      );

      setItemsCuentasPadres(filtradasPorTipo);
    }
  }, [cuentas, tipoCuenta]);

  useEffect(() => {
    getCuentas();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const res = await getCodigo(cuentaPadre);
      setCodigo(res);
      setCuentaData({ ...cuentaData, codigo: res });
    };

    fetch();
  }, [cuentaPadre]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await agregarCuenta(cuentaData);
      await getCuentas();
    } catch (error) {
      console.log("Ocurrio un error en handleSubmit: ", error);
      return;
    }
  };

  console.log("Tipo de cuenta desde padre: ", tipoCuenta);

  return (
    <div className=" text-black min-w-[calc(100vw-15rem)] bg-base-100 p-5 min-h-[calc(100vh-4rem)]">
      <div>
        <h1 className="font-bold text-4xl text-base-content">Cuentas</h1>
        <h3 className="text-sm text-base-content/40 mt-1">
          Solo puedes agregar, eliminar o editar cuentas si eres administrador
        </h3>
      </div>
      <div className="m-auto text-base-content w-[60%] mt-4 border-1 border-base-content/10 rounded-md p-5">
        <div>
          <div className="flex items-center gap-1">
            <Plus />
            <h2 className="font-bold text-xl">Agregar Nueva Cuenta</h2>
          </div>
          <span className="text-sm text-base-content/50">
            Complete los campos para crear una cuenta contable
          </span>
        </div>
        <form onSubmit={handleSubmit} className="mt-5">
          <div className="grid grid-cols-2 grid-rows-2">
            <div className="flex flex-col">
              <span className="font-semibold text-base-content">Codigo</span>
              <input
                placeholder={codigo}
                type="text"
                className="w-70 h-9 rounded-md px-3 mt-1 mb-1 bg-base-300 border-base-content/20 border-1"
                readOnly
                value={codigo}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-base-content">Nombre</span>
              <input
                placeholder="Ej. Inversiones"
                type="text"
                className="w-70 h-9 px-3 rounded-md mt-1 mb-1 border-base-content/20 border-1"
                onChange={(e) =>
                  setCuentaData({ ...cuentaData, nombre: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-base-content mb-1">Tipo</span>
              <SelectDemo
                items={itemsTipos}
                placeholder={"Selecciona el tipo"}
                onChange={(e) => {
                  setCuentaData({ ...cuentaData, tipo: e });
                  setTipoCuenta(e);
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-base-content mb-1">
                Cuenta Padre
              </span>
              <SelectDemo
                items={itemsCuentasPadres}
                placeholder={"Seleccione la cuenta padre"}
                onChange={(value) => {
                  setCuentaPadre(value.toString());
                  setCuentaData({ ...cuentaData, padreId: value });
                }}
                clickeado={cuentaPadre}
              />
            </div>
          </div>
          <div className="flex justify-between mt-3 px-5 w-[90%]">
            <div>
              <span className="font-semibold ">Imputable/Recibe Saldo</span>
              <input
                type="checkbox"
                defaultChecked
                className="toggle w-10 bg-base-300 border-1 border-base-content/70 rounded-full ml-4"
                onChange={(e) =>
                  setCuentaData({ ...cuentaData, imputable: e.target.checked })
                }
              />
            </div>
            <div>
              <span className="font-semibold">Activa</span>
              <input
                type="checkbox"
                defaultChecked
                className="toggle w-10 bg-base-300 border-1 border-base-content/70 rounded-full ml-4"
                onChange={(e) =>
                  setCuentaData({ ...cuentaData, activa: e.target.checked })
                }
              />
            </div>
          </div>
          <div>
            <button
              className="bg-base-content text-base-300 font-semibold rounded-md w-full h-8 mt-5 cursor-pointer"
              type="submit"
            >
              Agregar Cuenta
            </button>
          </div>
        </form>
      </div>
      <div>
        <TreeTable data={cuentas} />
      </div>
    </div>
  );
}

export default CuentasPage;
