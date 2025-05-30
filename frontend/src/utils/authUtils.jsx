// src/utils/authUtils.js
export const getToken = () => localStorage.getItem("token");

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const logoutUser = () => {
  removeToken();
  localStorage.removeItem("user");
};
