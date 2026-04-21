import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axiosInstance from "../api/axios";

function SocietyDetail() {
  const { id } = useParams();
  const [society, setSociety] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_URL;
  const FILE_BASE = BASE_URL.replace("/api", "");

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get(`/user/society/${id}`);
      setSociety(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ SAFE IMAGE FALLBACK
const handleImageError = (e) => {
  if (e.target.dataset.failed) return;
  e.target.dataset.failed = "true";
  e.target.src = "/no-image.png";   // ✅ FIX
};

  // ✅ UNIVERSAL IMAGE FIX FUNCTION
const getImageUrl = (url) => {
  if (!url) return "/no-image.png";   // ✅ FIX

  url = url.replace(/Uploads/g, "uploads");

  if (url.startsWith("http")) return url;

  if (!url.startsWith("/")) url = "/" + url;

  return `${FILE_BASE}${url}`;
};

  if (!society)
    return <p className="text-center mt-5 text-white">Loading...</p>;

  return (
    <div className="detail-bg">
      <div className="container py-5">

        <motion.div
          className="detail-card p-4"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
        >

          {/* HEADER */}
          <div className="text-center mb-4">
            <motion.img
              src={getImageUrl(society.logoUrl)}
              className="detail-logo"
              onError={handleImageError}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            />

            <h2 className="gradient-text mt-3">{society.name}</h2>
          </div>

          {/* DETAILS */}
          {[
            { title: "📖 Description", value: society.description },
            { title: "🎯 Vision", value: society.vision },
            { title: "🚀 Mission", value: society.mission },
            { title: "🏆 Achievements", value: society.achievements },
            { title: "📅 Events", value: society.recentEvent }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="section-box"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <h5>{item.title}</h5>

              <p>
                {item.value
                  ? item.value.split("\n").map((line, idx) => (
                      <span key={idx}>
                        {line}
                        <br />
                      </span>
                    ))
                  : "Not available"}
              </p>
            </motion.div>
          ))}

          {/* 📸 GALLERY */}
          {society.images?.length > 0 && (
            <div className="section-box">
              <h5>📸 Gallery</h5>

              <div className="image-grid">
                {society.images.map((img, i) => (
                  <motion.img
                    key={i}
                    src={getImageUrl(img)}
                    onError={handleImageError}
                    whileHover={{ scale: 1.1 }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 👥 TEAM */}
          <div className="section-box">
            <h5>👥 Core Team</h5>

            <div className="team-list">
              {society.coreTeam?.map((m, i) => {
                const parts = m.split(/–|-/); // safer split

                const name = parts[0]?.trim();
                const role = parts[1]?.trim();

                return (
                  <div key={i} className="team-item">
                    <strong className="role">{role}</strong> – {name}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 🌐 SOCIAL */}
          <div className="social-container">
            {society.website && (
              <a href={society.website} target="_blank" rel="noreferrer" className="btn">
                🌐 Website
              </a>
            )}

            {society.instagram && (
              <a
                href={`https://instagram.com/${society.instagram}`}
                target="_blank"
                rel="noreferrer"
                className="btn insta"
              >
                📸 Instagram
              </a>
            )}

            {society.youtube && (
              <a
                href={`https://youtube.com/${society.youtube}`}
                target="_blank"
                rel="noreferrer"
                className="btn yt"
              >
                ▶ YouTube
              </a>
            )}

            {society.linkedin && (
              <a
                href={society.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn ln"
              >
                🔗 LinkedIn
              </a>
            )}
          </div>

        </motion.div>
      </div>
    </div>
  );
}

export default SocietyDetail;