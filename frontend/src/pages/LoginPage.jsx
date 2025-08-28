import { useNavigate } from "react-router-dom";
import { ArrowLeft, Computer } from "lucide-react";
import { authStore } from "../store/auth.store";
import { useState } from "react";

function LoginPage() {
  const [data, setData] = useState({
    email: "",
    contrasenia: "",
  });
  const navigate = useNavigate();
  const { login, isLoginging } = authStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(data);
    if (res.status === 200) {
      navigate("/");
    } else {
      console.log("Ocurrio un error");
    }
  };

  return (
    <div className="overflow-hidden min-h-screen  w-full bg-base-200 flex flex-col justify-center items-center  px-3 sm:px-10 ">
      <div className="m-auto w-[100%] lg:w-[36rem]">
        <div className="flex flex-col items-center">
          <div className="border-1 w-25 mb-3 flex items-center justify-center p-4 rounded-full btn btn-accent h-24 ">
            <Computer className="size-15 text-base-100" />
          </div>
        </div>
        <div className="bg-base-200  flex flex-col px-10 rounded-lg">
          <div className="text-center mb-5">
            <h1 className="font-bold text-base-500 text-2xl sm:text-3xl md:text-4xl ">
              Nombre de la empresa
            </h1>
            <h3 className=" text-base-content/50 text-sm">
              Accede al sistema contable.
            </h3>
          </div>
          <div className="min-h-[15rem]">
            <form
              action="post"
              className="flex flex-col gap-5"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="flex flex-col gap-2">
                <span className="font-semibold">Correo electrónico</span>
                <input
                  type="email"
                  className="border-2 border-base-content/30 h-12 rounded-lg px-5"
                  placeholder="tumail@example.com"
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-semibold">Contraseña</span>
                <input
                  type="password"
                  className="border-2 border-base-content/30 h-12 rounded-lg px-5"
                  placeholder="*********"
                  onChange={(e) =>
                    setData({ ...data, contrasenia: e.target.value })
                  }
                />
              </div>
              <button
                className="h-12 w-full text-base-100 text-center btn btn-accent flex justify-center items-center rounded-lg cursor-pointer"
                type="submit"
              >
                {isLoginging ? (
                  <span className="loading text-base-300 loading-spinner loading-xs"></span>
                ) : (
                  "Iniciar Sesion"
                )}
              </button>
            </form>
            <div className="flex justify-center mt-2">
              <span className="text-sm text-center text-base-content/40">
                En caso de no recordar tu contraseña debes contactar con un
                administrador
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
