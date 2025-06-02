import axios from "axios";
import instance from "./axiosInstance";

const API_URL = "/api/products";

export const getProducts = () => instance.get(API_URL);

export const createProduct = (formData) =>
  instance.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateProduct = (id, formData) =>
  instance.put(`${API_URL}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteProduct = (id) => instance.delete(`${API_URL}/${id}`);
