import { useState } from "react";
import API from "../services/api";

export default function ProfileImageUpload({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Select an image first");

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      const { data } = await API.post("/upload/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Uploaded!");
      onUploaded?.(data.imageUrl); // callback to parent (optional)
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="space-y-3">
      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="block"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {loading ? "Uploading..." : "Upload Profile Image"}
      </button>
    </form>
  );
}
