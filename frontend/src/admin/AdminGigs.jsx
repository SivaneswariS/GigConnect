import { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminGigs() {
  const [gigs, setGigs] = useState([]);

  const loadGigs = async () => {
    const { data } = await API.get("/admin/gigs");
    setGigs(data);
  };

  const deleteGig = async (id) => {
    if (!confirm("Delete this gig?")) return;

    await API.delete(`/admin/delete-gig/${id}`);
    loadGigs();
  };

  useEffect(() => {
    loadGigs();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">🛠 Manage Gigs</h2>

      <div className="grid gap-4">
        {gigs.map((g) => (
          <div key={g._id} className="p-4 bg-white shadow rounded">
            <h3 className="text-lg font-semibold">{g.title}</h3>
            <p>{g.description}</p>
            <p className="text-sm mt-1">Client: {g.client?.name}</p>

            <button
              className="mt-2 text-red-500"
              onClick={() => deleteGig(g._id)}
            >
              Delete Gig
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
