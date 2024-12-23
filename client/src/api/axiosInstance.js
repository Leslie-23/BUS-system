import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // Replace with your backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token to requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
