import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/features/auth/authSlice";

function MainLayout() {
  const token = useSelector(selectCurrentToken) || localStorage.getItem("accessToken");
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default MainLayout;
