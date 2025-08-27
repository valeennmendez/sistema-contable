import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Menu from "../../components/Menu";

export function LayoutConMenu() {
  return (
    <>
      <NavBar />
      <div className="flex">
        <Menu />
        <Outlet />
      </div>
    </>
  );
}
