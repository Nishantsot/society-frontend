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
export const getAdminSocieties = (email) => {

  return axiosInstance.get(
    `/admin/societies?email=${email}`
  );
};

// =====================================================
// 🔥 ADMIN SINGLE SOCIETY
// =====================================================

export const getAdminSocietyById = (id) => {

  return axiosInstance.get(
    `/admin/society/${id}`
  );
};

// =====================================================
// 🔥 UPDATE SOCIETY
// =====================================================

export const updateSociety = (id, data) => {

  return axiosInstance.put(
    `/admin/society/${id}`,
    data
  );
};

// =====================================================
// 🔥 DELETE SOCIETY
// =====================================================

export const deleteSociety = (id) => {

  return axiosInstance.delete(
    `/admin/society/${id}`
  );
};

// =====================================================
// 🔓 LOGOUT
// =====================================================

export const logoutUser = () => {

  localStorage.removeItem("token");

  localStorage.removeItem("user");

  window.location.href = "/login";
};