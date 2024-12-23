import axiosInstance from "../api/axiosInstance";

export const login = async (credentials) => {
  const response = await axiosInstance.post("/api/user/login", credentials);
  return response.data;
};

export const signup = async (userData) => {
  const response = await axiosInstance.post("/api/users/signup", userData);
  return response.data;
};
