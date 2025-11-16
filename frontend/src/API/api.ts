import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

// ------------------ AUTH ------------------ //
export const loginUser = async (data: { email: string; password: string }) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};

export const registerUser = async (data: { name: string; email: string; password: string }) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};

// ------------------ CARS CRUD ------------------ //
export const addCar = async (formData: FormData) => {
  const res = await API.post("/cars", formData);
  return res.data;
};

export const getAllCars = async () => {
  const res = await API.get("/cars");
  return res.data;
};

export const getCarDetails = async (id: string) => {
  const res = await API.get(`/cars/${id}`);
  return res.data;
};

export const buyCar = async (id: string) => {
  const res = await API.post(`/cars/buy/${id}`);
  return res.data;
};
