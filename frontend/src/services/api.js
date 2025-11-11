import axios from "axios";

const API = axios.create({
  baseURL: "https://gigconnect-auzq.onrender.com/api", // ✅ Add /api
  withCredentials: true,
});

// ✅ Auto attach JWT
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
