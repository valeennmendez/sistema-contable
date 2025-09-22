import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UsuariosPage from "./pages/UsuariosPage";
import LoginPage from "./pages/LoginPage";
import { LayoutConMenu } from "./pages/Layouts/LayoutConMenu";
import { LayoutLogin } from "./pages/Layouts/LayoutLogin";
import CuentasPage from "./pages/CuentasPage";
import { themeStore } from "./store/theme.store";
import { Toaster } from "react-hot-toast";
import AsientosPage from "./pages/AsientosPage";

function App() {
  const { modoNoche } = themeStore();

  return (
    <div data-theme={modoNoche ? `light` : `numb`}>
      <Routes>
        <Route element={<LayoutConMenu />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/usuarios" element={<UsuariosPage />} />
          <Route path="/cuentas" element={<CuentasPage />} />
          <Route path="/asientos" element={<AsientosPage />} />
        </Route>

        <Route element={<LayoutLogin />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;

/* VER SI SE PUEDE MEJORAR CON MULTIPLE PROTECTED ROUTES (OUTLER) VER VIDEO DE FAZT
https://www.youtube.com/watch?v=42tFXd1PdCk
*/
