import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./features/dashboard/Dashboard";
import MainLayout from "./components/layout/MainLayout";
import AuthLayout from "./components/layout/AuthLayout";
import Login from "./features/auth/Login";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./features/auth/authSlice";
import { useEffect } from "react";

function App() {
  const token = useSelector(selectCurrentToken) || localStorage.getItem("accessToken");
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);


  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
      </Route>

      {/*  Private Routes */}
      <Route element={<MainLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
