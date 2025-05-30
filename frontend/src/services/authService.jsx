import instance from "./axiosInstance";

export const loginUser = async (credentials) => {
  const response = await instance.post("/auth/login", credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await instance.post("/auth/register", userData);
  return response.data;
};
