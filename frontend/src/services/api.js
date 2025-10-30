import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5050/api", // your backend
  withCredentials: true,
});

// Add JWT to headers automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
