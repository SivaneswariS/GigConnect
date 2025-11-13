
import { useEffect, useState } from "react";
import API from "../services/api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Pick an image");
    const fd = new FormData();
    fd.append("image", file);
    try {
      setLoading(true);
      const { data } = await API.post("/upload/profile", fd, { headers: { "Content-Type": "multipart/form-data" } });
      setUser((p) => ({ ...p, profileImage: data.imageUrl }));
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-2xl border border-gray-800">
      <div className="flex flex-col items-center">
        <img src={user.profileImage || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
          alt="profile" className="w-28 h-28 rounded-full mb-4 object-cover border-4 border-cyan-400" />
        <h2 className="text-2xl font-bold text-cyan-300">{user.name}</h2>
        <p className="text-gray-300">{user.email}</p>
        <p className="text-gray-400 mt-2">Role: {user.role}</p>

        <form onSubmit={handleUpload} className="mt-4 w-full flex flex-col items-center gap-3">
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="text-sm text-gray-400" />
          <button disabled={loading} className="px-4 py-2 bg-cyan-500 rounded">
            {loading ? "Uploading..." : "Upload Image"}
          </button>
        </form>
      </div>
    </div>
  );
}


