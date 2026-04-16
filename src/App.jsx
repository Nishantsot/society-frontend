import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import MemberDashboard from "./Pages/MemberDashboard";
import SocietyDetail from "./Pages/SocietyDetail"; // 🔥 ADD THIS
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* 🏠 Home */}
        <Route path="/" element={<Home />} />

        {/* 🔐 Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 📊 Member Dashboard */}
        <Route
          path="/member-dashboard"
          element={
            <PrivateRoute role="MEMBER">
              <MemberDashboard />
            </PrivateRoute>
          }
        />

        {/* 🔥 SOCIETY DETAIL PAGE */}
        <Route
          path="/society/:id"
          element={
            <PrivateRoute role="MEMBER">
              <SocietyDetail />
            </PrivateRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;