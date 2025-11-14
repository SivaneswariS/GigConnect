import { createContext, useState, useEffect } from "react";
import API from "../services/api";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user if token exists (on refresh)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    API.get("/users/me")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    setUser(data.user); // 🔥 update navbar instantly
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
