import React, { useState, useEffect } from "react";
import { loginUser } from "../api/authservices";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Login() {

  const navigate = useNavigate();

  const [data, setData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁 toggle

  // 🔥 Auto redirect
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      user.role === "ADMIN"
        ? navigate("/admin-dashboard")
        : navigate("/member-dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleLogin = async () => {
    try {
      const res = await loginUser(data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      setMessage("✅ Login Successful");

      res.data.role === "ADMIN"
        ? navigate("/admin-dashboard")
        : navigate("/member-dashboard");

    } catch (err) {
      setMessage("❌ " + (err.response?.data || "Login Failed"));
    }
  };

  return (
    <div className="auth-container">

      {/* 🔥 BOX ANIMATION */}
      <motion.div
        className="auth-card-box"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >

        <h2 className="auth-title">🔐 Login</h2>
        <p className="auth-subtitle">Welcome back</p>

        {message && (
          <div className={`msg ${message.includes("❌") ? "error" : "success"}`}>
            {message}
          </div>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input-field"
          onChange={handleChange}
        />

        {/* 🔥 PASSWORD WITH ICON */}
        <div className="password-box">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="input-field"
            onChange={handleChange}
          />

          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁"}
          </span>
        </div>

        {/* 🔥 BUTTON ANIMATION */}
        <motion.button
          className="login-btn"
          onClick={handleLogin}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>

        <div className="extra">
          <span onClick={() => navigate("/forgot")}>Forgot Password?</span>
          <p>
            Don't have an account?{" "}
            <span onClick={() => navigate("/register")}>Register</span>
          </p>
        </div>

      </motion.div>
    </div>
  );
}

export default Login;