import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


export default function AdminProtected({ children }) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/admin/login" />;

  const user = jwtDecode(token);

  if (user.role !== "Admin") {
    return <Navigate to="/admin/login" />;
  }

  return children;
}
