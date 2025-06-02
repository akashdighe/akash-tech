import axios from "axios";
import instance from "./axiosInstance";

const API = "/api/employees";

export const getEmployees = () => instance.get(API).then((res) => res.data);
export const getEmployeeById = (id) =>
  instance.get(`${API}/${id}`).then((res) => res.data);
export const createEmployee = (data) => instance.post(API, data);
export const updateEmployee = (id, data) => instance.put(`${API}/${id}`, data);
export const deleteEmployee = (id) => instance.delete(`${API}/${id}`);
