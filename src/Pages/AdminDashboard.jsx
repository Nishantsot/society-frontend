import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { motion } from "framer-motion";

import {
  FiEdit,
  FiTrash2,
  FiSave,
  FiInstagram,
  FiGlobe,
  FiYoutube,
  FiLogOut,
} from "react-icons/fi";
function AdminDashboard() {

  const [societies, setSocieties] = useState([]);
  const [selected, setSelected] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const logout = () => {

  localStorage.clear();

  window.location.href = "/login";
};

  const [form, setForm] = useState({
    name: "",
    description: "",
    vision: "",
    mission: "",
    recentEvent: "",
    achievements: "",
    instagram: "",
    website: "",
    youtube: "",
    linkedin: "",
    logoUrl: "",
    images: [],
    coreTeam: [],
  });

  const FILE_BASE =
    import.meta.env.VITE_API_URL.replace("/api", "");

  // =========================================
  // FETCH SOCIETIES
  // =========================================

  const fetchSocieties = async () => {

    try {

      const res = await axiosInstance.get(
        `/admin/societies?email=${user.email}`
      );

      setSocieties(res.data);

    } catch (err) {

      console.error(err);
    }
  };

  useEffect(() => {

    fetchSocieties();

  }, []);

  // =========================================
  // IMAGE FIX
  // =========================================

  const getImageUrl = (url) => {

    if (!url)
      return "https://via.placeholder.com/500";

    if (url.startsWith("http"))
      return url;

    return `${FILE_BASE}${url}`;
  };

  // =========================================
  // EDIT SOCIETY
  // =========================================

  const editSociety = async (id) => {

    try {

      const res = await axiosInstance.get(
        `/admin/society/${id}`
      );

      setSelected(id);

      setForm({
        ...res.data,
        images: res.data.images || [],
        coreTeam: res.data.coreTeam || [],
      });

      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });

    } catch (err) {

      console.error(err);
    }
  };

  // =========================================
  // HANDLE CHANGE
  // =========================================

  const handleChange = (e) => {

    setForm({
      ...form, 
      [e.target.name]: e.target.value,
    });
  };

  

  const updateSociety = async () => {

  try {

    await axiosInstance.put(
      `/admin/society/${selected}`,
      form
    );

    alert("✅ Society Updated");

    fetchSocieties();

    // 🔥 CLOSE FORM AFTER SAVE
    setSelected(null);

  } catch (err) {

    console.error(err);

    alert("❌ Failed");
  }
};

  // =========================================
  // DELETE
  // =========================================

  const deleteSociety = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this society?"
    );

    if (!confirmDelete) return;

    try {

      await axiosInstance.delete(
        `/admin/society/${id}`
      );

      alert("🗑 Society Deleted");

      fetchSocieties();

      setSelected(null);

    } catch (err) {

      console.error(err);
    }
  };

  return (

    <div
      className="min-vh-100 py-5"
      style={{
        background:
          "linear-gradient(to right, #0f172a, #1e293b)",
      }}
    >

      <div className="container-fluid px-3 px-md-5">

        {/* ========================================= */}
        {/* HEADER */}
        {/* ========================================= */}

      <div className="d-flex justify-content-between align-items-center mb-5 flex-wrap gap-3">

  <div>

    <h1
      className="fw-bold text-white"
      style={{
        fontSize: "3rem",
      }}
    >
      ⚙ Admin Dashboard
    </h1>

    <p className="text-light mb-0">
      Welcome, {user?.name}
    </p>

  </div>

  <button
    className="btn btn-danger rounded-pill px-4 py-2"
    onClick={logout}
  >
    <FiLogOut className="me-2" />
    Logout
  </button>

</div>
        {/* ========================================= */}
        {/* SOCIETY CARDS */}
        {/* ========================================= */}

        <div className="row g-5">

          {societies.map((s, index) => (

            <motion.div
              className="col-12 col-md-10 col-lg-8 mx-auto"
              key={s.id}
              initial={{ opacity: 0, y: 70 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >

              <div
                className="card border-0 shadow-lg overflow-hidden"
                style={{
                  borderRadius: "30px",
                  background: "#fff",
                }}
              >

                {/* LOGO */}

<div className="text-center pt-4 position-relative">

  <img
    src={getImageUrl(s.logoUrl)}
    alt="logo"
    className="shadow-lg"
    style={{
      width: "140px",
      height: "140px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "5px solid white",
      background: "#fff",
    }}
  />

  {/* ADMIN BADGE */}

  <div
    className="position-absolute top-0 end-0 bg-dark text-white px-4 py-2"
    style={{
      borderBottomLeftRadius: "20px",
      fontWeight: "600",
    }}
  >
    ADMIN
  </div>

</div>

                {/* BODY */}

                <div className="card-body p-4 p-md-5">

                  <h2
                    className="fw-bold mb-3"
                    style={{
                      fontSize: "2.3rem",
                    }}
                  >
                    {s.name}
                  </h2>

                  <p
                    className="text-secondary"
                    style={{
                      fontSize: "1.08rem",
                      lineHeight: "1.9",
                    }}
                  >
                    {s.description}
                  </p>

                  {/* SOCIALS */}

                  <div className="d-flex gap-3 flex-wrap mt-4 mb-4">

                    {s.instagram && (
                      <a
                        href={`https://instagram.com/${s.instagram}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-outline-danger rounded-pill px-4"
                      >
                        <FiInstagram className="me-2" />
                        Instagram
                      </a>
                    )}

                    {s.website && (
                      <a
                        href={s.website}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-outline-primary rounded-pill px-4"
                      >
                        <FiGlobe className="me-2" />
                        Website
                      </a>
                    )}

                    {s.youtube && (
                      <a
                        href={s.youtube}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-outline-danger rounded-pill px-4"
                      >
                        <FiYoutube className="me-2" />
                        YouTube
                      </a>
                    )}

                  </div>

                  {/* BUTTONS */}

                  <div className="d-flex flex-column flex-md-row gap-3 mt-4">

                    <button
                      className="btn btn-dark flex-fill py-3 rounded-pill fw-semibold"
                      onClick={() => editSociety(s.id)}
                    >
                      <FiEdit className="me-2" />
                      Edit Society
                    </button>

                    <button
                      className="btn btn-danger flex-fill py-3 rounded-pill fw-semibold"
                      onClick={() => deleteSociety(s.id)}
                    >
                      <FiTrash2 className="me-2" />
                      Delete Society
                    </button>

                  </div>

                </div>

              </div>

            </motion.div>
          ))}

        </div>

        {/* ========================================= */}
        {/* EDIT FORM */}
        {/* ========================================= */}

        {selected && (

          <motion.div
            className="card border-0 shadow-lg mt-5 p-4 p-md-5"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              borderRadius: "30px",
              maxWidth: "1200px",
              margin: "60px auto",
            }}
          >
<div className="d-flex justify-content-between align-items-center mb-4">

  <h2 className="fw-bold">
    ✏ Edit Society
  </h2>

  <button
    className="btn btn-danger rounded-pill px-4"
    onClick={() => setSelected(null)}
  >
    ✖ Close
  </button>

</div>
            <div className="row g-4">

              {/* NAME */}

              <div className="col-md-6">

                <label className="form-label fw-semibold">
                  Society Name
                </label>

                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />

              </div>

              {/* INSTAGRAM */}

              <div className="col-md-6">

                <label className="form-label fw-semibold">
                  Instagram
                </label>

                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="instagram"
                  value={form.instagram}
                  onChange={handleChange}
                />

              </div>

              {/* DESCRIPTION */}

              <div className="col-12">

                <label className="form-label fw-semibold">
                  Description
                </label>

                <textarea
                  rows="5"
                  className="form-control"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                />

              </div>

              {/* VISION */}

              <div className="col-md-6">

                <label className="form-label fw-semibold">
                  Vision
                </label>

                <textarea
                  rows="5"
                  className="form-control"
                  name="vision"
                  value={form.vision}
                  onChange={handleChange}
                />

              </div>

              {/* MISSION */}

              <div className="col-md-6">

                <label className="form-label fw-semibold">
                  Mission
                </label>

                <textarea
                  rows="5"
                  className="form-control"
                  name="mission"
                  value={form.mission}
                  onChange={handleChange}
                />

              </div>

              {/* ACHIEVEMENTS */}

              <div className="col-md-6">

                <label className="form-label fw-semibold">
                  Achievements
                </label>

                <textarea
                  rows="5"
                  className="form-control"
                  name="achievements"
                  value={form.achievements}
                  onChange={handleChange}
                />

              </div>

              {/* EVENTS */}

              <div className="col-md-6">

                <label className="form-label fw-semibold">
                  Recent Events
                </label>

                <textarea
                  rows="5"
                  className="form-control"
                  name="recentEvent"
                  value={form.recentEvent}
                  onChange={handleChange}
                />

              </div>

              {/* WEBSITE */}

              <div className="col-md-6">

                <label className="form-label fw-semibold">
                  Website
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                />

              </div>

              {/* YOUTUBE */}

              <div className="col-md-6">

                <label className="form-label fw-semibold">
                  YouTube
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="youtube"
                  value={form.youtube}
                  onChange={handleChange}
                />

              </div>

              {/* LINKEDIN */}

              <div className="col-md-6">

                <label className="form-label fw-semibold">
                  LinkedIn
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="linkedin"
                  value={form.linkedin}
                  onChange={handleChange}
                />

              </div>
              <div className="col-md-6">

  <label className="form-label fw-semibold">
    Logo URL
  </label>

  <input
    type="text"
    className="form-control"
    name="logoUrl"
    value={form.logoUrl}
    onChange={handleChange}
  />

</div>
<div className="col-12">

  <label className="form-label fw-semibold">
    Core Team
  </label>

  <textarea
    rows="4"
    className="form-control"
    placeholder="President - Nishant, Vice President - Rahul"
    value={form.coreTeam.join(", ")}
    onChange={(e) =>
      setForm({
        ...form,
        coreTeam: e.target.value
          .split(",")
          .map((m) => m.trim()),
      })
    }
  />

  <small className="text-muted">
    Separate members using commas
  </small>

</div>

{/* ========================================= */}
{/* GALLERY IMAGES */}
{/* ========================================= */}

<div className="col-12">

  <label className="form-label fw-semibold">
    Gallery Images
  </label>

  <textarea
    rows="4"
    className="form-control"
    placeholder="https://image1.jpg, https://image2.jpg"
    value={form.images.join(", ")}
    onChange={(e) =>
      setForm({
        ...form,
        images: e.target.value
          .split(",")
          .map((img) => img.trim()),
      })
    }
  />

  <small className="text-muted">
    Enter image URLs separated by commas
  </small>

</div>

{/* ========================================= */}
{/* PREVIEW IMAGES */}
{/* ========================================= */}

{form.images.length > 0 && (

  <div className="col-12">

    <label className="form-label fw-semibold mb-3">
      Gallery Preview
    </label>

    <div className="row g-3">

      {form.images.map((img, index) => (

        <div
          className="col-6 col-md-3"
          key={index}
        >

          <img
            src={img}
            alt="preview"
            className="img-fluid rounded shadow-sm"
            style={{
              height: "140px",
              width: "100%",
              objectFit: "cover",
            }}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/200";
            }}
          />

        </div>
      ))}

    </div>

  </div>
)}
              {/* LOGO */}

              <div className="col-md-6">

                <label className="form-label fw-semibold">
                  Logo URL
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="logoUrl"
                  value={form.logoUrl}
                  onChange={handleChange}
                />

              </div>

              {/* SAVE */}

              <div className="col-12 mt-4">

                <button
                  className="btn btn-success btn-lg w-100 py-3 rounded-pill"
                  onClick={updateSociety}
                >
                  <FiSave className="me-2" />
                  Save Changes
                </button>

              </div>

            </div>

          </motion.div>
        )}

      </div>

    </div>
  );
}

export default AdminDashboard;