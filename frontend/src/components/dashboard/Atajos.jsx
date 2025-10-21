import React from "react";
import { ListTree, Plus, Eye } from "lucide-react";
import AtajoItem from "./items/AtajoItem";

function Atajos() {
  return (
    <div className="flex flex-col gap-5">
      <AtajoItem
        title={"Ver árbol de cuentas"}
        Icon={ListTree}
        path={"/cuentas"}
      />
      <AtajoItem title={"Crear nuevo asiento"} Icon={Plus} path={"/asientos"} />
      <AtajoItem
        title={"Consultar Libro Diario"}
        Icon={Eye}
        path={"/librodiario"}
      />
      <AtajoItem
        title={"Consultar Libro Mayor"}
        Icon={Eye}
        path={"/libromayor"}
      />
    </div>
  );
}

export default Atajos;
