import { Navigate, Outlet } from "react-router-dom";

function ProtectedAdminRoute() {
  let session = null;

  try {
    session = JSON.parse(localStorage.getItem("grandstayAuth") || "null");
  } catch {
    session = null;
  }

  if (!session || session.role !== "admin") {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}

export default ProtectedAdminRoute;