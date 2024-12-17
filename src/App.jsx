import { Routes, Route } from "react-router-dom";
import Dashboard from "./features/dashboard/Dashboard";
import MainLayout from "./components/layout/MainLayout";
import AuthLayout from "./components/layout/AuthLayout";
import Login from "./features/auth/Login";

import Registration from "./features/auth/Register";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Registration />} />
      </Route>
      {/*  Private Routes */}
      <Route element={<MainLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
