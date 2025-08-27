import { Outlet } from "react-router-dom";

export function LayoutLogin() {
  return (
    <div className="login-wrapper">
      <Outlet />
    </div>
  );
}
