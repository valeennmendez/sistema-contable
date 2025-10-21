import { useEffect } from "react";
import { authStore } from "../store/auth.store";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import LineChart from "@/components/dashboard/LineChart";
import Atajos from "@/components/dashboard/Atajos";

function HomePage() {
  const { checkAuth, authUser } = authStore();
  const navigate = useNavigate();

  console.log("Datos del usuario: ", authUser);

  const hoy = new Date();
  const fechaFormateada = hoy.toLocaleDateString("es-AR");

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

  return (
    <div className=" min-w-[calc(100vw-15rem)] bg-base-100 p-5 min-h-[calc(100vh-4rem)] ">
      <div className="flex justify-between">
        <div>
          <h1 className="font-bold text-4xl text-base-content">Dashboard</h1>
          <h3 className="text-sm text-base-content/40 mt-1">
            Bienvenido al sistema contable.
          </h3>
        </div>
        <div>
          <h3 className="font-semibold">
            Permisos: {authUser?.rol === "A" ? "Administrador" : "Contador"}
          </h3>
        </div>
      </div>
      <div className="flex gap-4 mt-3">
        <div className="w-[50rem] bg-base-300 flex  items-center justify-center flex-col p-5 rounded-md border-base-content/15 border-1">
          <h3 className="font-semibold text-lg">Saldos de Caja y Banco</h3>
          <LineChart />
        </div>
        <div className="flex flex-col w-[30rem] justify-between gap-3">
          <div className="bg-base-300 w-full flex flex-col items-center rounded-md py-4 font-semibold border-1 border-base-content/15 ">
            <h2 className="text-center mb-4">Atajos</h2>
            <Atajos />
          </div>
          <div className="bg-base-300 py-2 w-full rounded-md h-full border-1 flex flex-col  border-base-content/15 items-center justify-center ">
            <h4 className="font-semibold text-center">Fecha Actual: </h4>
            <h5 className="text-center font-semibold">{fechaFormateada}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
