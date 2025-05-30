import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/v1", // Replace with your API base URL
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login"; // Auto-logout on token expiry
    }
    return Promise.reject(error);
  }
);

export default instance;
