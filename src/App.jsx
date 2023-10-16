import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import DashBoard from "./pages/dashboard/Dashboard";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Routes>
      <Route exact path="/" element={user ? <DashBoard /> : <Login />} />
      <Route path="/login" element={user ? <DashBoard /> : <Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
