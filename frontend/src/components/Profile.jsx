import { useEffect, useState } from "react";
import API from "../services/api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch user info
  const fetchUser = async () => {
    try {
      const { data } = await API.get("/users/me");
      setUser(data);
    } catch (err) {
      alert("Please log in again");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Handle image upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please choose an image first!");

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      const { data } = await API.post("/upload/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Profile image uploaded successfully!");
      setUser((prev) => ({ ...prev, profileImage: data.imageUrl }));
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  if (!user)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 text-lg">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={
              user.profileImage ||
              "https://cdn-icons-png.flaticon.com/512/847/847969.png"
            }
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover mb-3 border-4 border-blue-200"
          />

          <form onSubmit={handleUpload} className="flex flex-col items-center">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="text-sm text-gray-600 mb-2"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              {loading ? "Uploading..." : "Upload Image"}
            </button>
          </form>
        </div>

        {/* User Details */}
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">
          {user.name}
        </h2>
        <p className="text-gray-600 mb-2">Role: {user.role}</p>
        <p className="text-gray-600">Email: {user.email}</p>
      </div>
    </div>
  );
}

