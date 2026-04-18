import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axiosInstance from "../api/axios";
import axios from "axios"; 
function SocietyDetail() {
  const { id } = useParams();
  const [society, setSociety] = useState(null);

  // 🌐 BASE URL (works for local + live)
  const BASE_URL = import.meta.env.VITE_API_URL;
  const FILE_BASE = BASE_URL.replace("/api", "");

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/society/${id}`);
      setSociety(res.data);
    } catch (err) {
      console.error("Error fetching society:", err);
    }
  };

  if (!society)
    return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container py-5">
      <div className="detail-card p-4">

        {/* HEADER */}
        <div className="text-center mb-4">
          <img
            src={
              society.logoUrl?.startsWith("http")
                ? society.logoUrl
                : `${FILE_BASE}${society.logoUrl}`
            }
            alt="logo"
            className="detail-logo"
            onError={(e) => (e.target.src = "/default.png")}
          />
          <h2 className="mt-3 fw-bold">{society.name}</h2>
        </div>

        {/* DETAILS SECTIONS */}
        {[
          { title: "📖 Description", value: society.description },
          { title: "🎯 Vision", value: society.vision },
          { title: "🚀 Mission", value: society.mission },
          { title: "🏆 Achievements", value: society.achievements },
          { title: "📅 Recent Event", value: society.recentEvent }
        ].map((item, i) => (
          <div key={i} className="section-box hover-box">
            <h5 className="section-title">{item.title}</h5>

            <p className="text-content">
              {item.value
                ? item.value.split(/\r?\n/).map((line, index) => {
                    if (line.trim().startsWith("•")) {
                      return (
                        <li key={index} className="bullet-line">
                          {line.replace("•", "").trim()}
                        </li>
                      );
                    }
                    return (
                      <span key={index}>
                        {line}
                        <br />
                        <br />
                      </span>
                    );
                  })
                : "Not available"}
            </p>
          </div>
        ))}

        {/* 📸 IMAGES */}
        {society.images && society.images.length > 0 && (
          <div className="section-box">
            <h5 className="section-title">📸 Campus Photos</h5>

            <div className="image-grid">
              {society.images.map((img, i) => (
                <img
                  key={i}
                  src={
                    img.startsWith("http")
                      ? img
                      : `${FILE_BASE}${img}`
                  }
                  alt="campus"
                  className="gallery-img"
                  onError={(e) => {
                    console.log("FAILED:", img);
                    e.target.src = "/default.png";
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* 👥 TEAM */}
        <div className="section-box hover-box">
          <h5 className="section-title">👥 Core Team</h5>

          {society.coreTeam?.length > 0 ? (
            society.coreTeam.map((m, i) => {
              const [name, role] = m.split("–");

              return (
                <p key={i} className="team-line">
                  <strong>{role}</strong> – {name}
                </p>
              );
            })
          ) : (
            <p>No team data</p>
          )}
        </div>

        {/* 🌐 SOCIAL LINKS */}
        <div className="social-container">
          {society.website && (
            <a href={society.website} target="_blank" rel="noreferrer" className="btn website-btn">
              🌐 Website
            </a>
          )}

          {society.instagram && (
            <a
              href={`https://instagram.com/${society.instagram}`}
              target="_blank"
              rel="noreferrer"
              className="btn insta-btn"
            >
              📸 @{society.instagram}
            </a>
          )}

          {society.youtube && (
            <a
              href={`https://youtube.com/${society.youtube}`}
              target="_blank"
              rel="noreferrer"
              className="btn yt-btn"
            >
              ▶ YouTube
            </a>
          )}
        </div>

      </div>
    </div>
  );
}

export default SocietyDetail;