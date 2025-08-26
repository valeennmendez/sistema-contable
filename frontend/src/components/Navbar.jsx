import React from "react";
import { Settings, User, LogOut } from "lucide-react";

function NavBar() {
  return (
    <div className="navbar bg-base-200 shadow-md flex h-13 items-center px-2">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl font-bold">Nombre empresa</a>
      </div>
      <div className="mr-5">
        <ul className="flex gap-5 items-center">
          <li className="font-semibold">Bienvenido Valentin Mendez</li>
          <li className="flex btn btn-ghost items-center gap-1 font-semibold ">
            <LogOut className="size-4" />
            Salir
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
