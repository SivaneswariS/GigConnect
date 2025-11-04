// components/PaymentPage.jsx
import { useState } from "react";
import API from "../services/api";
import { useParams } from "react-router-dom";

export default function PaymentPage() {
  const { gigId } = useParams();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePay = async (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return alert("Enter valid amount");
    try {
      setLoading(true);
      const { data } = await API.post("/payments/pay", { gigId, amount: Number(amount) });
      alert("Payment done. Tx: " + data.transactionId);
    } catch (err) {
      alert(err.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-2xl border border-gray-800">
      <h3 className="text-cyan-300 font-bold mb-4">Pay for Gig</h3>
      <form onSubmit={handlePay} className="space-y-3">
        <input type="number" className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700" placeholder="Amount" onChange={e => setAmount(e.target.value)} />
        <button className="w-full bg-emerald-500 py-2 rounded" disabled={loading}>{loading ? "Processing..." : "Pay Now"}</button>
      </form>
    </div>
  );
}

