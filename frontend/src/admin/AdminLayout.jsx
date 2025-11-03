import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex h-screen">
      {/* ✅ Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

        <nav className="space-y-3">
          <Link to="/admin/dashboard" className="block hover:text-blue-400">
            📊 Dashboard
          </Link>
          <Link to="/admin/users" className="block hover:text-blue-400">
            👥 Users
          </Link>
          <Link to="/admin/gigs" className="block hover:text-blue-400">
            🛠 Gigs
          </Link>
          <button
            className="mt-5 text-red-400 hover:text-red-600"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/admin/login";
            }}
          >
            🚪 Logout
          </button>
        </nav>
      </aside>

      {/* ✅ Main content */}
      <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
