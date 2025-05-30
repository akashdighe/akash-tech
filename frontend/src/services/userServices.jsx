import axios from "axios";
import instance from "./axiosInstance";

const API_URL = "/api/users";

export const getUsers = () => instance.get(API_URL);
export const getUserById = (id) => instance.get(`${API_URL}/${id}`);
export const createUser = (data) => instance.post(API_URL, data);
export const updateUser = (id, data) => instance.put(`${API_URL}/${id}`, data);
export const deleteUser = (id) => instance.delete(`${API_URL}/${id}`);
export const resetPassword = (id, newPassword) =>
  instance.put(`${API_URL}/${id}/reset-password`, { newPassword });
