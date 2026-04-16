import React, { useEffect, useState } from "react";
import { getMySocieties } from "../api/authservices";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function MemberDashboard() {
  const [societies, setSocieties] = useState([]);
  const [search, setSearch] = useState("");
  const [openSidebar, setOpenSidebar] = useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email;

  // ✅ 🔒 PROTECT DASHBOARD (login required)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  // ✅ FETCH DATA
  useEffect(() => {
    if (email) fetchData();
  }, [email]);

  const fetchData = async () => {
    try {
      const res = await getMySocieties(email);
      setSocieties(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const filtered = societies.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">

      {/* 🔥 LOGOUT BUTTON */}
      <div style={{ position: "absolute", top: "20px", right: "20px" }}>
        <button onClick={logout} className="logout-btn">
          <i className="bi bi-box-arrow-right"></i>
        </button>
      </div>

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
            <p style={{ textAlign: "center" }}>No societies found</p>
          )}

          {filtered.map((s, index) => {

            console.log("LOGO:", s.logoUrl); // ✅ debug

            return (
              <motion.div
                className="card-premium"
                key={s.id}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >

                {/* ✅ IMAGE */}
                <img
                  src={s.logoUrl}
                  alt="logo"
                  className="society-logo"
                  onError={(e) => {
                    console.log("FAILED:", s.logoUrl);
                    e.target.src = "/default.png"; // 🔥 local fallback
                  }}
                />

                {/* NAME */}
                <h3 className="title">{s.name}</h3>

                {/* DESCRIPTION */}
                <p className="desc">{s.description}</p>

                {/* MEMBERS */}
                <div className="members-preview">
                  {s.members?.slice(0, 3).map((m, i) => (
                    <span key={i}>
                      {m}{i < 2 ? ", " : ""}
                    </span>
                  ))}
                </div>

                {/* INSTAGRAM */}
                <div className="socials">
                  {s.instagram && (
                    <a
                      href={`https://instagram.com/${s.instagram}`}
                      target="_blank"
                      rel="noreferrer"
                      className="insta-link"
                    >
                      <i className="bi bi-instagram"></i>
                      <span>@{s.instagram}</span>
                    </a>
                  )}
                </div>

                {/* BUTTON */}
                <button
                  className="btn-view"
                  onClick={() => navigate(`/society/${s.id}`)}
                >
                  View Details →
                </button>

              </motion.div>
            );
          })}

        </div>
      </div>
    </div>
  );
}

export default MemberDashboard;