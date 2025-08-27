import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import Menu from "./components/Menu";
import UsuariosPage from "./pages/UsuariosPage";
import LoginPage from "./pages/LoginPage";
import { LayoutConMenu } from "./pages/Layouts/LayoutConMenu";
import { LayoutLogin } from "./pages/Layouts/LayoutLogin";

function App() {
  return (
    <div data-theme="numb">
      <Routes>
        <Route element={<LayoutConMenu />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/usuarios" element={<UsuariosPage />} />
        </Route>

        <Route element={<LayoutLogin />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
