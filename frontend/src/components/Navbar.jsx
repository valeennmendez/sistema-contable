import { useEffect } from "react";
import { Settings, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../store/auth.store";
import toast from "react-hot-toast";

function NavBar() {
  const navigate = useNavigate();
  const { logout, checkAuth, authUser } = authStore();

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const res = await checkAuth();
        if (res.status !== 200) {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error al chequear autenticación:", error);
        navigate("/login");
      }
    };

    fetchAuth();
  }, []);

  async function handleLogout() {
    try {
      await logout();
      toast.success("Deslogueo exitoso!");
      navigate("/login");
    } catch (error) {
      console.log("Error en handleLogout: ", error);
    }
  }

  return (
    <div className="navbar bg-base-200 shadow-md flex h-13 items-center px-2">
      <div className="flex-1">
        <a
          className="btn btn-ghost text-xl font-bold"
          onClick={() => navigate("/")}
        >
          Nombre empresa
        </a>
      </div>
      <div className="mr-5">
        <ul className="flex gap-5 items-center">
          <li className="font-semibold">
            Bienvenido {authUser?.nombre_completo}
          </li>
          <li
            className="flex btn btn-ghost items-center gap-1 font-semibold "
            onClick={handleLogout}
          >
            <LogOut className="size-4" />
            Salir
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
