import instance from "./axiosInstance";

const API_URL = "/api/roles"; // adjust if needed

export const getRoles = () => instance.get(API_URL);
export const getRoleById = (id) => instance.get(`${API_URL}/${id}`);
export const createRole = (data) => instance.post(API_URL, data);
export const updateRole = (id, data) => instance.put(`${API_URL}/${id}`, data);
export const deleteRole = (id) => instance.delete(`${API_URL}/${id}`);
