import { authStore } from "@/store/auth.store";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

function ModificarUsuario({
  id,
  setModificarUsuario,
  modificarUsuario,
  fetch,
}) {
  const { obtenerUsuario, usuarioXId, modificarUsuarios } = authStore();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (id) obtenerUsuario(id);
  }, [id]);

  useEffect(() => {
    if (usuarioXId) {
      setFormData({
        nombre_completo: usuarioXId.nombre_completo,
        email: usuarioXId.email,
        rol: usuarioXId.rol,
      });
    }
  }, [usuarioXId]);

  function handleForm() {
    setModificarUsuario(!modificarUsuario);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await modificarUsuarios(formData, id);
    setModificarUsuario(false);
    fetch();
  }

  return (
    <div className="relative bg-base-100 border-1 border-base-content/20 rounded-lg flex flex-col items-center p-5 w-[40rem] h-[30rem]">
      <div className="absolute right-0 px-5">
        <X
          className="text-base-content p-0 size-5 cursor-pointer"
          onClick={() => handleForm()}
        />
      </div>
      <div>
        <h1 className="font-bold text-center text-base-content/90 text-3xl">
          Modificar Usuario
        </h1>
        <h3 className="text-base-content/70 text-md text-center">
          Modifique los datos que necesite
        </h3>
      </div>
      <div className=" w-full h-[24rem] py-5 flex items-center justify-center">
        <form
          action=""
          className="w-[100%] flex flex-col gap-4"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex flex-col gap-2">
            <span className="text-base-content font-semibold">
              Nombre completo
            </span>
            <input
              type="text"
              className="bg-base-100 px-2 py-1.5 rounded-md w-full text-base-content border-1 border-base-content/40 "
              value={formData?.nombre_completo}
              onChange={(e) =>
                setFormData({ ...formData, nombre_completo: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-base-content font-semibold">Email</span>
            <input
              type="email"
              className="bg-base-100 px-2 py-1.5 rounded-md w-full text-base-content border-1 border-base-content/40 "
              value={formData?.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-base-content font-semibold">Rol</span>
            <select
              name=""
              id=""
              className="bg-base-100 px-2 py-1.5 rounded-md w-full text-base-content border-1 border-base-content/40 "
              value={formData?.rol}
              onChange={(e) =>
                setFormData({ ...formData, rol: e.target.value })
              }
            >
              <option value="" hidden>
                Elija el rol
              </option>
              <option value="A">Administrador</option>
              <option value="C">Contador</option>
            </select>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-base-content w-full h-8 mt-5 font-semibold rounded-md text-base-100"
            >
              Modificar Usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModificarUsuario;
