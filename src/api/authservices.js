import axiosInstance from "./axios";

// 🔐 REGISTER
export const registerUser = (data) => {
  return axiosInstance.post("/auth/register", data);
};

// 🔢 VERIFY OTP
export const verifyOtp = (data) => {
  return axiosInstance.post("/auth/verify", data);
};

// 🔁 RESEND OTP
export const resendOtp = (data) => {
  return axiosInstance.post("/auth/resend-otp", data);
};

// 🔐 LOGIN
export const loginUser = async (data) => {
  const response = await axiosInstance.post("/auth/login", data);

  // 🔥 save token
  localStorage.setItem("token", response.data.token);

  return response;
};

// 🔁 FORGOT PASSWORD
export const forgotPassword = (data) => {
  return axiosInstance.post("/auth/forgot-password", data);
};

// 🔑 RESET PASSWORD
export const resetPassword = (data) => {
  return axiosInstance.post("/auth/reset-password", data);
};
// 🔥 MEMBER DASHBOARD (GET ALL SOCIETIES)
export const getMySocieties = (email) => {
  return axiosInstance.get(`/user/my-societies?email=${email}`);
};

// 🔥 SOCIETY DETAIL PAGE
export const getSocietyById = (id) => {
  return axiosInstance.get(`/user/society/${id}`);
};