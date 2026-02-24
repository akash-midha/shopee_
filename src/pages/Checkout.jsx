import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeall } from "../redux/slices/cartSlice";
import { toast } from "react-hot-toast";

const Checkout = () => {
  const { cart } = useSelector((state) => state);
  const { theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });
  const [payment, setPayment] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    nameOnCard: "",
  });
  const [step, setStep] = useState(1);

  const totalAmount = cart.reduce((acc, curr) => acc + curr.price * (curr.quantity ?? 1), 0).toFixed(2);
  const totalItems = cart.reduce((sum, i) => sum + (i.quantity ?? 1), 0);

  const handleAddressChange = (e) => {
    setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePaymentChange = (e) => {
    setPayment((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = () => {
    if (step === 1) {
      const required = ["name", "street", "city", "zip", "phone"];
      const missing = required.filter((f) => !address[f]?.trim());
      if (missing.length) {
        toast.error("Please fill all shipping fields.");
        return;
      }
      setStep(2);
      return;
    }
    if (step === 2) {
      if (!payment.cardNumber.trim() || !payment.expiry.trim() || !payment.cvv.trim()) {
        toast.error("Please fill card details (demo only – not processed).");
        return;
      }
    }
    dispatch(removeall());
    toast.success("Order placed successfully!");
    navigate("/feedback");
  };

  if (cart.length === 0) {
    return (
      <div className={theme ? "bg-slate-600 min-h-screen flex items-center justify-center" : "bg-gray-50 min-h-screen flex items-center justify-center"}>
        <div className="text-center">
          <p className={theme ? "text-slate-200" : "text-gray-700"}>Your cart is empty.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
          >
            Continue shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={theme ? "bg-slate-600 min-h-screen py-8" : "bg-gray-50 min-h-screen py-8"}>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className={`text-2xl font-bold mb-6 ${theme ? "text-white" : "text-gray-900"}`}>
          Checkout {step === 1 ? "– Shipping" : "– Payment"}
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          <div className={`flex-1 rounded-xl p-6 ${theme ? "bg-slate-700" : "bg-white"} shadow-lg`}>
            {step === 1 && (
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full name"
                  value={address.name}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={address.email}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  name="street"
                  placeholder="Address"
                  value={address.street}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={address.city}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={address.state}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <input
                  type="text"
                  name="zip"
                  placeholder="ZIP / Postal code"
                  value={address.zip}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={address.phone}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <p className={`text-sm ${theme ? "text-slate-400" : "text-gray-500"}`}>
                  Demo only – no real payment is processed.
                </p>
                <input
                  type="text"
                  name="nameOnCard"
                  placeholder="Name on card"
                  value={payment.nameOnCard}
                  onChange={handlePaymentChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card number"
                  value={payment.cardNumber}
                  onChange={handlePaymentChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    value={payment.expiry}
                    onChange={handlePaymentChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={payment.cvv}
                    onChange={handlePaymentChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>

          <div className={`md:w-80 rounded-xl p-6 h-fit ${theme ? "bg-slate-700" : "bg-white"} shadow-lg`}>
            <h2 className={`font-semibold text-lg mb-4 ${theme ? "text-white" : "text-gray-900"}`}>Order summary</h2>
            <p className={theme ? "text-slate-300" : "text-gray-600"}>Items: {totalItems}</p>
            <p className={`text-xl font-bold mt-2 ${theme ? "text-green-400" : "text-green-600"}`}>
              Total: ${totalAmount}
            </p>
            <div className="mt-6 flex flex-col gap-2">
              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full py-2 rounded-lg border border-gray-400"
                >
                  Back to shipping
                </button>
              )}
              <button
                onClick={handlePlaceOrder}
                className="w-full py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700"
              >
                {step === 1 ? "Continue to payment" : "Place order"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
