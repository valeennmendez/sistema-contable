import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import Menu from "./components/Menu";
import UsuariosPage from "./pages/UsuariosPage";

function App() {
  return (
    <div data-theme="nigth">
      <NavBar />
      <div className="flex">
        <Menu />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/usuarios" element={<UsuariosPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
