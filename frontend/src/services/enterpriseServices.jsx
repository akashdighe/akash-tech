import axios from "axios";
import instance from "./axiosInstance";

const API_URL = "/api/enterprise";

export const getEnterprises = async () => {
  const res = await instance.get(API_URL);
  return res.data;
};

export const getEnterpriseById = async (id) => {
  const res = await instance.get(`${API_URL}/${id}`);
  return res.data;
};

export const createEnterprise = async (data) => {
  const res = await instance.post(API_URL, data);
  return res.data;
};

export const updateEnterprise = async (id, data) => {
  const res = await instance.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteEnterprise = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
