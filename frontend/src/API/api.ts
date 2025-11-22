// src/API/api.ts
import axios from "axios";

const API = axios.create({
  baseURL: "https://carrental-o4g2.onrender.com/api",
});

// Add token automatically from localStorage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;

/* Auth */
export const loginUser = async (data: { email: string; password: string }) => {
  const res = await API.post("/auth/login", data);
  return res.data; // expected { token }
};

export const registerUser = async (data: { name: string; email: string; password: string }) => {
  const res = await API.post("/auth/register", data);
  return res.data; // expected { message, user }
};

/* Cars */
export const getAllCars = async () => {
  const res = await API.get("/cars");
  return res.data; // expected array of cars
};

export const getCarById = async (id: string) => {
  const res = await API.get(`/cars/${id}`);
  return res.data; // expected car object
};

export const getMyCars = async () => {
  const res = await API.get("/cars/my-cars");
  return res.data; // expected array of cars
};

export const addCarAPI = async (formData: FormData) => {
  // Backend must accept FormData with images
  const res = await API.post("/cars/add", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteCar = async (id: string) => {
  const res = await API.delete(`/cars/${id}`);
  return res.data;
};

export const buyCarAPI = async (id: string) => {
  const res = await API.post(`/cars/buy/${id}`);
  return res.data; // expected { message, ownerDetails }
};

export const toggleCarLiveStatus = async (id: string) => {
  const res = await API.patch(`/cars/toggle-live/${id}`);
  return res.data;
}
