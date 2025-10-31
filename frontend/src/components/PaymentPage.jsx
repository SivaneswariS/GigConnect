import { useState } from "react";
import API from "../services/api";
import { useParams } from "react-router-dom";

export default function PaymentPage() {
  const { gigId } = useParams();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePay = async (e) => {
    e.preventDefault();

    if (!amount || amount <= 0) {
      return alert("Enter a valid amount");
    }

    try {
      setLoading(true);

      const { data } = await API.post("/payments/pay", {
        gigId,
        amount: Number(amount),
      });

      alert("✅ Payment successful! Transaction ID: " + data.transactionId);
    } catch (err) {
      alert(err.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-6 rounded shadow w-96" onSubmit={handlePay}>
        <h2 className="text-xl font-bold mb-4 text-center">Pay for Gig</h2>

        <input
          type="number"
          className="border w-full p-2 rounded mb-4"
          placeholder="Enter Amount"
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          className="bg-green-600 text-white py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
}
