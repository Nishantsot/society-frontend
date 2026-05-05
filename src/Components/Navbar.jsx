import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar() {
  return (
    <motion.nav
      className="navbar navbar-expand-lg navbar-glass sticky-top"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">

        {/* LOGO */}
        <Link to="/" className="navbar-brand d-flex align-items-center">

          <motion.img
            src={logo}
            alt="logo"
            height="42"
            className="me-2 logo-img"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />

          <motion.span
            className="fw-bold logo-text"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
          Adgips  Society Portal
          </motion.span>

        </Link>

        {/* MOBILE BUTTON */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* MENU */}
        <div className="collapse navbar-collapse" id="navbarMenu">

          <ul className="navbar-nav ms-auto align-items-lg-center">

            <motion.li
              className="nav-item"
              whileHover={{ scale: 1.1 }}
            >
              <Link className="nav-link nav-hover px-3" to="/">
                Home
              </Link>
            </motion.li>

            <motion.li
              className="nav-item"
              whileHover={{ scale: 1.1 }}
            >
              <Link className="nav-link nav-hover px-3" to="/login">
                Login
              </Link>
            </motion.li>

            <motion.li
              className="nav-item"
              whileHover={{ scale: 1.05 }}
            >
              <Link
                className="btn btn-premium ms-lg-3 mt-2 mt-lg-0 px-4"
                to="/register"
              >
                Register
              </Link>
            </motion.li>

          </ul>

        </div>

      </div>
    </motion.nav>
  );
}

export default Navbar;