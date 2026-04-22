import React, { useState } from "react";
import { registerUser, verifyOtp } from "../api/authservices";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    branch: "CSE",
    year: "THIRD"
  });

  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [timer, setTimer] = useState(0);
  const [loadingResend, setLoadingResend] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
  };

  const startTimer = () => {
    setTimer(30);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleRegister = async () => {
    try {
      const res = await registerUser(form);
      setMessage("✅ " + res.data);

      if (res.data.includes("OTP")) {
        setShowOtp(true);
        startTimer();
      }

    } catch (err) {
      setMessage("❌ " + (err.response?.data || "Registration Failed"));
    }
  };

  const handleVerify = async () => {
    try {
      const res = await verifyOtp({
        email: form.email,
        otp: otp
      });

      setMessage("✅ " + res.data);
      setTimeout(() => navigate("/login"), 1500);

    } catch (err) {
      setMessage("❌ " + (err.response?.data || "Verification Failed"));
    }
  };

  const handleResendOtp = async () => {
    try {
      setLoadingResend(true);

      await registerUser(form);
      setMessage("✅ OTP Resent");

      startTimer();

    } catch (err) {
      setMessage("❌ Failed to resend OTP");
    } finally {
      setLoadingResend(false);
    }
  };

  return (
    <div className="auth-container">

      <motion.div
        className="auth-card-box"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >

        <h2 className="auth-title">🚀 Register</h2>
        <p className="auth-subtitle">Create your account</p>

        {message && (
          <div className={`msg ${message.includes("❌") ? "error" : "success"}`}>
            {message}
          </div>
        )}

        {!showOtp && (
          <>
            <input name="name" placeholder="Full Name" className="input-field" onChange={handleChange}/>
            <input name="email" placeholder="Email" className="input-field" onChange={handleChange}/>

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

            <select name="branch" className="input-field" onChange={handleChange}>
              <option>CSE</option>
              <option>IT</option>
              <option>ECE</option>
            </select>

            <select name="year" className="input-field" onChange={handleChange}>
              <option>FIRST</option>
              <option>SECOND</option>
              <option>THIRD</option>
              <option>FOURTH</option>
            </select>

            <motion.button
              className="main-btn"
              onClick={handleRegister}
              whileHover={{ scale: 1.05 }}
            >
              Register
            </motion.button>
          </>
        )}

        {showOtp && (
          <>
            <input
              placeholder="Enter OTP"
              className="input-field"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <motion.button
              className="main-btn success-btn"
              onClick={handleVerify}
              whileHover={{ scale: 1.05 }}
            >
              Verify OTP
            </motion.button>

            <button
              className="resend-btn"
              onClick={handleResendOtp}
              disabled={timer > 0 || loadingResend}
            >
              {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
            </button>
          </>
        )}

        <p className="extra">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>

      </motion.div>
    </div>
  );
}

export default Register;