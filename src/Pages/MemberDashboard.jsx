import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axiosInstance from "../api/axios";
import { FiLogOut } from "react-icons/fi";

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

  // 🔥 FETCH DATA
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

  // 🔥 CATEGORY FALLBACK (if backend doesn't send category)
  const getCategory = (name = "") => {
    name = name.toLowerCase();

    if (name.includes("tech") || name.includes("gdgc") || name.includes("geek"))
      return "TECH";

    if (name.includes("dance") || name.includes("drama") || name.includes("art"))
      return "CULTURAL";

    return "NONTECH";
  };

  // 🔥 FILTER LOGIC
  const filtered = societies.filter((s) => {
    const matchSearch = s.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "ALL" ||
      (s.category
        ? s.category === category
        : getCategory(s.name) === category);

    return matchSearch && matchCategory;
  });

  // 🔥 IMAGE BASE
  const FILE_BASE = import.meta.env.VITE_API_URL.replace("/api", "");

  const getImageUrl = (url) => {
    if (!url) return "/no-image.png";
    if (url.startsWith("http")) return url;
    return `${FILE_BASE}${url}`;
  };

  const handleImageError = (e) => {
    if (e.target.dataset.failed) return;
    e.target.dataset.failed = "true";
    e.target.src = "/no-image.png";
  };

  // LOGOUT
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

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