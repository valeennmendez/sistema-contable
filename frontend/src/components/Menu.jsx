import { Home, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-4rem)] w-60  bg-base-200">
      <div className="p-5 flex justify-center">
        <ul className="flex flex-col gap-3">
          <li
            className="btn btn-ghost font-semibold flex flex-row"
            onClick={() => navigate("/")}
          >
            <Home className="size-6" />
            Inicio
          </li>
          <li
            className="btn btn-ghost font-semibold flex flex-row"
            onClick={() => navigate("/usuarios")}
          >
            <User className="size-6" />
            Usuarios
          </li>
          <li className="btn btn-ghost font-semibold flex flex-row">
            <User className="size-6" />
            Opcion 2
          </li>
          <li className="btn btn-ghost font-semibold flex flex-row">
            <User className="size-6" />
            Opcion 3
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Menu;
