import { useState, useEffect } from "react";
import { UserPen, Trash2 } from "lucide-react";
import axios from "axios";

function UsuariosPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/auth/users");
        setData(res.data.usuarios);
      } catch (error) {
        console.log("Ocurrió un error al realizar el fetch");
      }
    };

    fetch();
  }, []);

  console.log(data);

  return (
    <div className="text-black min-w-[calc(100vw-15rem)] bg-base-100 p-5 min-h-[calc(100vh-4rem)]">
      <div>
        <h1 className="font-bold text-4xl text-base-content">Usuarios</h1>
        <h3 className="text-sm text-base-content/40 mt-1">
          Solo puedes modificar la tabla si eres administrador
        </h3>
      </div>
      <div className="flex justify-end">
        <span className=" btn btn-active">Agregar Usuario</span>
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
            {data.map((usuario, index) => (
              <tr key={index} className="text-base-content">
                <th>{index + 1}</th>
                <td>{usuario?.nombre_completo}</td>
                <td>{usuario?.email}</td>
                <td>{usuario?.rol === "A" ? `Administrador` : `Contador`}</td>
                <td className="flex flex-row gap-2">
                  <UserPen className="btn btn-info p-2.5 size-10" />
                  <Trash2 className="btn btn-error p-2.5 size-10" />
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
