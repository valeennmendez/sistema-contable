import { useState, useEffect } from "react";
import { UserPen, Trash2 } from "lucide-react";
import axios from "axios";
import Formulario from "../components/Formulario";
import { useNavigate } from "react-router-dom";
import { authStore } from "../store/auth.store";

function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { checkAuth } = authStore();

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

  const fetch = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/auth/users");
      setUsuarios(res.data.usuarios);
    } catch (error) {
      console.log("Ocurrió un error al realizar el fetch: ", error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  function handleForm(e) {
    e.preventDefault();

    setOpen(!open);
  }

  const handleDelete = async (e, id, rol) => {
    e.preventDefault();
    try {
      if (rol === "A") {
        window.alert("No puedes eliminar a otros administradores");
        return;
      }
      if (window.confirm("¿Estas seguro de eliminar al usuario?")) {
        const res = await axios.delete(
          `http://localhost:5001/api/auth/delete-user?id=${id}`
        );
        await fetch();
        console.log(res);
      }
    } catch (error) {
      console.log("Ocurrio un error al eliminar el usuario: ", error);
    }
  };

  return (
    <div className="relative text-black min-w-[calc(100vw-15rem)] bg-base-100 p-5 min-h-[calc(100vh-4rem)]">
      <div
        className={`${
          open ? `flex` : `hidden`
        } w-full h-full overflow-hidden  items-center justify-center inset-0 absolute z-10`}
      >
        <Formulario setOpen={setOpen} open={open} fetchUsuarios={fetch} />
      </div>
      <div>
        <h1 className="font-bold text-4xl text-base-content">Usuarios</h1>
        <h3 className="text-sm text-base-content/40 mt-1">
          Solo puedes modificar la tabla si eres administrador
        </h3>
      </div>
      <div className="flex justify-end">
        <span
          className=" btn btn-accent text-base-100"
          onClick={(e) => handleForm(e)}
        >
          Agregar Usuario
        </span>
      </div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Nombre Completo</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, index) => (
              <tr
                key={usuario.id}
                className="text-base-content hover:bg-base-300"
              >
                <th>{index + 1}</th>
                <td className="font-semibold text-base-content/70">
                  {usuario?.nombre_completo}
                </td>
                <td>{usuario?.email}</td>
                <td className="">
                  {usuario?.rol === "A" ? (
                    <span className="bg-base-300 font-semibold px-3 py-1 rounded-md">
                      Administrador
                    </span>
                  ) : (
                    `Contador`
                  )}
                </td>
                <td className="flex flex-row gap-2">
                  <span className="border-1 rounded-md border-transparent hover:border-base-content/70">
                    <UserPen className="p-1 size-7" />
                  </span>
                  <span className="border-1 rounded-md border-transparent hover:border-base-content">
                    <Trash2
                      onClick={(e) =>
                        handleDelete(e, usuario?.id, usuario?.rol)
                      }
                      className="p-1 size-7"
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsuariosPage;
