import React from "react";
import logo from "../assets/logo.png";   // logo path

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">

      <div className="container">

        {/* LEFT SIDE LOGO */}

        <a className="navbar-brand d-flex align-items-center">

          <img
            src={logo}
            alt="logo"
            height="40"
            className="me-2"
          />

          <span className="fw-bold text-danger">
            Society Portal
          </span>

        </a>

        {/* MOBILE MENU BUTTON */}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* RIGHT SIDE MENU */}

        <div className="collapse navbar-collapse" id="navbarMenu">

          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item">
              <a className="nav-link nav-hover">
                <i className="bi bi-house-door me-1"></i> Home
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link nav-hover">
                <i className="bi bi-box-arrow-in-right me-1"></i> Login
              </a>
            </li>

            <li className="nav-item">
              <a className="btn btn-danger ms-lg-3 mt-2 mt-lg-0 px-4">
                <i className="bi bi-person-plus me-1"></i> Register
              </a>
            </li>

          </ul>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;