import React, { useState, useEffect } from "react";
import { loginUser, forgotPassword, resetPassword } from "../api/authservices";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Login() {

  const navigate = useNavigate();

  const [data, setData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [showForgot, setShowForgot] = useState(false);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPass, setNewPass] = useState("");

  const [step, setStep] = useState(1);
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);

  // 🔥 AUTO REDIRECT
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
    if (!data.email || !data.password) {
      return setMessage("❌ Enter email & password");
    }

    try {
      setLoading(true);

      const res = await loginUser(data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      setMessage("✅ Login Successful");

      res.data.role === "ADMIN"
        ? navigate("/admin-dashboard")
        : navigate("/member-dashboard");

    } catch (err) {
      setMessage("❌ " + (err.response?.data || "Login Failed"));
    } finally {
      setLoading(false);
    }
  };

  // ⏳ TIMER
  const startTimer = () => {
setTimer(120);
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

  // 🔥 SEND OTP
  const handleSendOtp = async () => {
    if (!email) return setMessage("❌ Enter email");

    try {
      setLoading(true);

      await forgotPassword({ email });

      setMessage("✅ OTP sent to email");
      setStep(2);
      startTimer();

    } catch {
      setMessage("❌ Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // 🔁 RESEND OTP
  const handleResend = async () => {
    try {
      await forgotPassword({ email });
      setMessage("✅ OTP resent");
      startTimer();
    } catch {
      setMessage("❌ Resend failed");
    }
  };

  // 🔐 RESET PASSWORD
  const handleReset = async () => {
    if (!otp || !newPass) {
      return setMessage("❌ Fill all fields");
    }

    try {
      setLoading(true);

      await resetPassword({
        email,
        otp,
        newPassword: newPass
      });

      setMessage("✅ Password reset successful");

      setShowForgot(false);
      setStep(1);
      setEmail("");
      setOtp("");
      setNewPass("");

    } catch {
      setMessage("❌ Reset failed");
    } finally {
      setLoading(false);
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
              disabled={loading}
            >
              {loading ? "Logging..." : "Login"}
            </motion.button>

            <div className="extra">
              <span
                className="link"
                onClick={() => {
                  setShowForgot(true);
                  setMessage("");
                }}
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
            {step === 1 && (
              <>
                <input
                  placeholder="Enter Email"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button className="main-btn" onClick={handleSendOtp}>
                  Send OTP
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <input
                  placeholder="Enter OTP"
                  className="input-field"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="New Password"
                  className="input-field"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                />

                <button className="main-btn" onClick={handleReset}>
                  Reset Password
                </button>

                <button
                  className="resend-btn"
                  onClick={handleResend}
                  disabled={timer > 0}
                >
                  {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
                </button>
              </>
            )}

            <p
              className="link"
              onClick={() => {
                setShowForgot(false);
                setMessage("");
              }}
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