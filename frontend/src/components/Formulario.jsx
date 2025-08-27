import axios from "axios";
import { X } from "lucide-react";
import { useState } from "react";

function Formulario({ setOpen, open, fetchUsuarios }) {
  const [data, setData] = useState({
    nombre_completo: "",
    email: "",
    contrasenia: "",
    rol: "",
  });

  function handleForm() {
    setOpen(!open);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5001/api/auth/add-user",
        data
      );
      console.log(res);
      await fetchUsuarios();
      setOpen(!open);
    } catch (error) {
      console.log("Error al enviar los datos");
    } finally {
      setOpen(!open);
    }
  }

  return (
    <div className="relative bg-base-300 rounded-lg flex flex-col items-center p-5 w-[40rem] h-[30rem]">
      <div className="absolute right-0 px-5">
        <X
          className="text-base-content p-0 size-5 cursor-pointer"
          onClick={() => handleForm()}
        />
      </div>
      <div>
        <h1 className="font-bold text-base-content/90 text-3xl">
          Agregar nuevo usuario
        </h1>
        <h3 className="text-base-content/70 text-md">
          Llene los campos para agregar a un usuario
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
              className="input input-neutral w-full text-base-content border-none"
              onChange={(e) =>
                setData({ ...data, nombre_completo: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-base-content font-semibold">Email</span>
            <input
              type="email"
              className="input input-neutral w-full text-base-content border-none"
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-base-content font-semibold">Contraseña</span>
            <input
              type="password"
              className="input input-neutral w-full text-base-content border-none"
              onChange={(e) =>
                setData({ ...data, contrasenia: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-base-content font-semibold">Rol</span>
            <select
              name=""
              id=""
              className="bg-base-100 w-full h-10 text-base-content px-2 rounded-md"
              onChange={(e) => setData({ ...data, rol: e.target.value })}
            >
              <option value="" hidden>
                Elija el rol
              </option>
              <option value="A">Administrador</option>
              <option value="C">Contador</option>
            </select>
          </div>
          <div className="flex items-center justify-center">
            <button type="submit" className="btn btn-accent">
              Agregar Usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Formulario;
