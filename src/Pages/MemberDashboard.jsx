import React, { useEffect, useState } from "react";
import { getMySocieties } from "../api/authservices";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axiosInstance from "../api/axios";
import axios from "axios";

function MemberDashboard() {
  const [societies, setSocieties] = useState([]);
  const [search, setSearch] = useState("");
  const [openSidebar, setOpenSidebar] = useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email;

  // 🔒 PROTECT DASHBOARD
  useEffect(() => {
    if (!user) navigate("/login");
  }, [navigate]);

  // FETCH DATA
  const fetchData = async () => {
  try {
    const res = await axiosInstance.get("/user/societies");
    console.log("DATA:", res.data); // optional debug
    setSocieties(res.data);
  } catch (err) {
    console.error(err);
  }
};

// 🔥 CALL IT
useEffect(() => {
  fetchData();
}, []);
  // LOGOUT
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const filtered = societies.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">

      {/* LOGOUT */}
      <button className="logout-btn" onClick={logout}>Logout</button>

      {/* BURGER */}
      <div className="burger" onClick={() => setOpenSidebar(!openSidebar)}>
        ☰
      </div>

      {/* SIDEBAR */}
      <div className={`sidebar ${openSidebar ? "active" : ""}`}>
        <h2>🎯 Explore</h2>
        <button>All</button>
        <button>Tech</button>
        <button>Cultural</button>
        <button>Non-Tech</button>
      </div>

      {/* MAIN */}
      <div className="main">

        <motion.h1
          className="heading"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🏛 Societies
        </motion.h1>

        {/* SEARCH */}
        <input
          className="search-bar"
          placeholder="🔍 Search societies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* GRID */}
        <div className="card-grid">

          {filtered.length === 0 && (
            <p className="no-data">No societies found</p>
          )}

          {filtered.map((s, index) => (
            <motion.div
              className="card-premium"
              key={s.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >

              {/* IMAGE */}
           <div className="logo-wrapper">
  <img
  src={
    s.logoUrl?.startsWith("http")
      ? s.logoUrl
      : `${import.meta.env.VITE_API_URL.replace("/api","")}${s.logoUrl}`
  }
  alt="logo"
  className="society-logo"
  onError={(e) => (e.target.src = "/default.png")}
/>
</div>

              {/* NAME */}
              <h3 className="title">{s.name}</h3>

              {/* DESCRIPTION (CLAMPED 🔥) */}
              <p className="desc">{s.description}</p>

              {/* MEMBERS INLINE 🔥 */}
              <div className="members-preview">
                {s.members?.length > 0
                  ? s.members.slice(0, 3).join(", ")
                  : "No members"}
              </div>

              {/* INSTAGRAM */}
             {s.instagram && (
  <a
    href={`https://instagram.com/${s.instagram}`}
    target="_blank"
    rel="noreferrer"
    className="insta-btn"
  >
    <i className="bi bi-instagram"></i>
    <span>@{s.instagram}</span>
  </a>
)}

              {/* BUTTON */}
              <button
                className="btn-view"
                onClick={() => navigate(`/society/${s.id}`)}
              >
                View Details →
              </button>

            </motion.div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default MemberDashboard;