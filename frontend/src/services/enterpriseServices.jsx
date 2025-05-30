import axios from "axios";
import instance from "./axiosInstance";

const API_URL = "/api/enterprise";

// Get all enterprises
export const getEnterprises = () => instance.get(API_URL);

// Get enterprise by ID
export const getEnterpriseById = (id) => instance.get(`${API_URL}/${id}`);

// Create enterprise
export const createEnterprise = (data) => instance.post(API_URL, data);

// Update enterprise
export const updateEnterprise = (id, data) =>
  instance.put(`${API_URL}/${id}`, data);

// Delete enterprise
export const deleteEnterprise = (id) => instance.delete(`${API_URL}/${id}`);
