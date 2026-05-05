import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axiosInstance from "../api/axios";
import { FiLogOut } from "react-icons/fi";
import socket from "../socket";        // ← Yeh line already hai

function MemberDashboard() {
  const [societies, setSocieties] = useState([]);
  const [search, setSearch] = useState("");
  const [openSidebar, setOpenSidebar] = useState(false);
  const [category, setCategory] = useState("ALL");

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔒 PROTECT DASHBOARD
  useEffect(() => {
    if (!user) navigate("/login");
  }, [navigate]);

  // 🔥 SOCKET CONNECTION (Yeh useEffect add kardo)
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("✅ Socket Connected Successfully");
    });

    socket.on("connect_error", (err) => {
      console.log("❌ Socket Connection Error:", err.message);
    });

    // Cleanup
    return () => {
      socket.off("connect");
      socket.off("connect_error");
    };
  }, []);

  // 🔥 FETCH DATA (yeh already hai)
  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("/user/societies");
      setSocieties(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // LOGOUT (updated)
  const logout = () => {
    socket.disconnect();
    localStorage.clear();
    navigate("/login");
  };

  // ... baaki pura code same rahega (getCategory, filtered, return etc.)

  return (
    <div className="dashboard">

      {/* OVERLAY */}
      {openSidebar && (
        <div
          className="overlay"
          onClick={() => setOpenSidebar(false)}
        />
      )}

      {/* LOGOUT */}
      
<button className="logout-btn" onClick={logout}>
  <FiLogOut />
</button>

      {/* BURGER */}
      <div
        className="burger"
        onClick={() => setOpenSidebar(!openSidebar)}
      >
        ☰
      </div>

      {/* SIDEBAR */}
      <div className={`sidebar ${openSidebar ? "active" : ""}`}>
        <h2>🎯 Explore</h2>

        <button onClick={() => setCategory("ALL")}>All</button>
        <button onClick={() => setCategory("TECH")}>Tech</button>
        <button onClick={() => setCategory("CULTURAL")}>Cultural</button>
        <button onClick={() => setCategory("NONTECH")}>Non-Tech</button>
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
                  src={getImageUrl(s.logoUrl)}
                  alt="logo"
                  className="society-logo"
                  onError={handleImageError}
                />
              </div>

              {/* NAME */}
              <h3 className="title">{s.name}</h3>

              {/* DESCRIPTION */}
              <p className="desc">{s.description}</p>

              {/* MEMBERS */}
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