import axios from "axios";

const API = axios.create({
  baseURL: "https://gigconnect-auzq.onrender.com", // your backend
  withCredentials: true,
});

// Add JWT to headers automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
