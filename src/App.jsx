import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";

import Login from "./Pages/Login";

import Register from "./Pages/Register";

import MemberDashboard from "./Pages/MemberDashboard";

import SocietyDetail from "./Pages/SocietyDetail";

import AdminDashboard from "./Pages/AdminDashboard";

import PrivateRoute from "./Components/PrivateRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* ========================================= */}
        {/* 🏠 HOME */}
        {/* ========================================= */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* ========================================= */}
        {/* 🔐 AUTH */}
        {/* ========================================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ========================================= */}
        {/* 👤 MEMBER DASHBOARD */}
        {/* ========================================= */}

        <Route
          path="/member-dashboard"
          element={
            <PrivateRoute role="MEMBER">

              <MemberDashboard />

            </PrivateRoute>
          }
        />

        {/* ========================================= */}
        {/* 🔥 SOCIETY DETAIL */}
        {/* ========================================= */}

        <Route
          path="/society/:id"
          element={
            <PrivateRoute role="MEMBER">

              <SocietyDetail />

            </PrivateRoute>
          }
        />

        {/* ========================================= */}
        {/* ⚙ ADMIN DASHBOARD */}
        {/* ========================================= */}

        <Route
          path="/admin"
          element={
            <PrivateRoute role="ADMIN">

              <AdminDashboard />

            </PrivateRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;