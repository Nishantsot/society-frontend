import React, { useState, useEffect } from "react";
import { loginUser, forgotPassword, resetPassword } from "../api/authservices";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Login() {

  const navigate = useNavigate();

  const [data, setData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // 🔥 forgot states
  const [showForgot, setShowForgot] = useState(false);
  const [email, setEmail] = useState("");
  const [newPass, setNewPass] = useState("");

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

  // 🔐 LOGIN
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

  // 🔥 FORGOT PASSWORD
  const handleSendOtp = async () => {
    try {
      await forgotPassword({ email });
      setMessage("✅ Reset link / OTP sent");
    } catch {
      setMessage("❌ Failed to send reset");
    }
  };

  const handleReset = async () => {
    try {
      await resetPassword({ email, newPassword: newPass });
      setMessage("✅ Password reset successful");
      setShowForgot(false);
    } catch {
      setMessage("❌ Reset failed");
    }
  };

  return (
    <div className="auth-container">

      <motion.div
        className="auth-card-box"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >

        <h2 className="auth-title">
          {showForgot ? "🔑 Reset Password" : "🔐 Login"}
        </h2>

        {message && (
          <div className={`msg ${message.includes("❌") ? "error" : "success"}`}>
            {message}
          </div>
        )}

        {!showForgot ? (
          <>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input-field"
              onChange={handleChange}
            />

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

            <motion.button
              className="login-btn"
              onClick={handleLogin}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>

            <div className="extra">
              <span
                className="link"
                onClick={() => setShowForgot(true)}
              >
                Forgot Password?
              </span>

              <p>
                Don't have an account?{" "}
                <span onClick={() => navigate("/register")}>
                  Register
                </span>
              </p>
            </div>
          </>
        ) : (
          <>
            <input
              placeholder="Enter Email"
              className="input-field"
              onChange={(e) => setEmail(e.target.value)}
            />

            <button className="main-btn" onClick={handleSendOtp}>
              Send Reset
            </button>

            <input
              type="password"
              placeholder="New Password"
              className="input-field"
              onChange={(e) => setNewPass(e.target.value)}
            />

            <button className="main-btn" onClick={handleReset}>
              Reset Password
            </button>

            <p
              className="link"
              onClick={() => setShowForgot(false)}
              style={{ cursor: "pointer" }}
            >
              ← Back to Login
            </p>
          </>
        )}

      </motion.div>
    </div>
  );
}

export default Login;