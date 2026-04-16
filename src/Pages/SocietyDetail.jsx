import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

function SocietyDetail() {

  const { id } = useParams();
  const [society, setSociety] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get(`http://localhost:8080/api/user/society/${id}`);
    setSociety(res.data);
  };

  if (!society) return <p className="text-center mt-5">Loading...</p>;

  return (
    <motion.div
      className="container py-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >

      <motion.div
        className="society-card detail-card p-4"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
      >

        {/* 🔥 HEADER */}
        <motion.div
          className="text-center mb-4"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <motion.img
            src={`http://localhost:8080${society.logoUrl}`}
            alt="logo"
            className="detail-logo"
            whileHover={{ scale: 1.15, rotate: 3 }}
          />

          <motion.h2
            className="mt-3 fw-bold gradient-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {society.name}
          </motion.h2>
        </motion.div>

        {/* 🔥 DESCRIPTION */}
       {/* 🔥 DESCRIPTION (UPDATED BOX STYLE) */}
<motion.div
  className="mb-4"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.3 }}
>
  <h5 className="text-center mb-3">📖 Description</h5>

  <motion.div
    className="detail-box description-box"
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    whileHover={{ scale: 1.03 }}
  >
    <p className="text-muted mb-0">
      {society.description}
    </p>
  </motion.div>
</motion.div>

        {/* 🔥 GRID */}
        <div className="row g-3">

          {[
            { title: "🎯 Vision", value: society.vision },
            { title: "🚀 Mission", value: society.mission },
            { title: "🏆 Achievements", value: society.achievements },
            { title: "📅 Recent Event", value: society.recentEvent }
          ].map((item, i) => (

            <div key={i} className="col-12 col-md-6">
              <motion.div
                className="detail-box"
                whileHover={{ scale: 1.05 }}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.2 }}
              >
                <h6>{item.title}</h6>
                <p>{item.value}</p>
              </motion.div>
            </div>

          ))}

        </div>

        {/* 🔥 TEAM */}
        <motion.div
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h5 className="text-center mb-3">👥 Core Team</h5>

          <div className="row justify-content-center">
            {society.coreTeam?.map((m, i) => (
              <div key={i} className="col-6 col-md-4 col-lg-3 mb-2">
                <motion.div
                  className="team-chip text-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {m}
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 🔥 LINKS */}
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >

          {society.website && (
            <motion.a
              href={society.website}
              target="_blank"
              className="btn btn-danger m-2"
              whileHover={{ scale: 1.1 }}
            >
              🌐 Website
            </motion.a>
          )}

          {society.instagram && (
            <motion.a
              href={`https://instagram.com/${society.instagram}`}
              target="_blank"
              className="btn btn-outline-danger m-2"
              whileHover={{ scale: 1.1 }}
            >
              📸 Instagram
            </motion.a>
          )}

          {society.youtube && (
            <motion.a
              href={`https://youtube.com/${society.youtube}`}
              target="_blank"
              className="btn btn-outline-danger m-2"
              whileHover={{ scale: 1.1 }}
            >
              ▶ YouTube
            </motion.a>
          )}

        </motion.div>

      </motion.div>
    </motion.div>
  );
}

export default SocietyDetail;