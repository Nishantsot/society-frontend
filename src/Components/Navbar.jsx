import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-glass sticky-top">

      <div className="container">

        {/* LOGO */}
        <Link to="/" className="navbar-brand d-flex align-items-center">

          <img
            src={logo}
            alt="logo"
            height="42"
            className="me-2 logo-img"
          />

          <span className="fw-bold logo-text">
            Society Portal
          </span>

        </Link>

        {/* MOBILE MENU BUTTON */}
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

            <li className="nav-item">
              <Link className="nav-link nav-hover px-3" to="/">
                <i className="bi bi-house-door me-1"></i> Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link nav-hover px-3" to="/login">
                <i className="bi bi-box-arrow-in-right me-1"></i> Login
              </Link>
            </li>

            <li className="nav-item">
              <Link className="btn btn-premium ms-lg-3 mt-2 mt-lg-0 px-4" to="/register">
                <i className="bi bi-person-plus me-1"></i> Register
              </Link>
            </li>

          </ul>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;