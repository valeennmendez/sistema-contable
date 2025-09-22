import React from "react";
import { DatePicker } from "../components/DatePicker";
import { Plus, Trash } from "lucide-react";
import { useState } from "react";
import { SelectDemo } from "../components/Select";

function AsientosPage() {
  const [movimientos, setMovimientos] = useState([{ id: crypto.randomUUID() }]);

  function agregarMovimiento() {
    setMovimientos([...movimientos, { id: crypto.randomUUID() }]);
  }

  function eliminarMovimiento(id) {
    setMovimientos(movimientos.filter((mov) => mov.id !== id));
  }

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
        <form action="" className="text-base-content">
          <div className="flex mt-5 justify-around">
            <div className="flex flex-col ">
              <span className="font-semibold text-base-content">Fecha</span>
              <input
                type="date"
                className="border-1  border-base-content/30 rounded-sm px-3 py-1"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-base-content">
                Descripcion
              </span>
              <input
                type="text"
                className="border-1 border-base-content/30 rounded-sm px-3 py-1"
                placeholder="Agrega la descripción"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2 mt-2">
              <h2 className="font-bold text-lg py-3 mt-2">Movimientos</h2>
              <span
                className="cursor-pointer mt-2 bg-base-content text-base-300 font-semibold px-2 py-1 rounded-md"
                onClick={() => agregarMovimiento()}
              >
                Agregar Linea
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {movimientos.map((mov) => (
                <div
                  className="flex justify-around items-center border-1 rounded-md border-base-content/10 bg-base-200 py-4"
                  key={mov.id}
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">Cuenta</span>
                    <SelectDemo placeholder={"Selecciona la cuenta"} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">Deber</span>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="input border-1 border-base-content/10 rounded-md w-25 h-9"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">Haber</span>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="input border-1 border-base-content/10 rounded-md w-25 h-9"
                    />
                  </div>
                  <div className="">
                    <span className="">
                      <Trash
                        onClick={() => eliminarMovimiento(mov.id)}
                        className="border-1 p-1 mt-8 size-8 rounded-md border-base-content/70 bg-base-content text-base-300 cursor-pointer"
                      />
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <button
                className="bg-base-content text-base-300 font-semibold rounded-md w-full h-8 mt-5 cursor-pointer"
                type="submit"
              >
                Agregar Cuenta
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AsientosPage;
