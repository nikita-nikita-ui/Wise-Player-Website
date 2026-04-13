import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { purchaseCredit } from "../auth/creditManagement";

const Coincalculator = () => {
  const [coins, setCoins] = useState("");
  const [price, setPrice] = useState(0);
  const params = new URLSearchParams(location.search);

  const token = params.get("token");
  const payerId = params.get("PayerID");
  useEffect(() => {
    if (token & payerId) {
      console.log("Token:", token);
      console.log("PayerID:", payerId);

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }
  }, []);

  console.log("Token:", token);
  console.log("PayerID:", payerId);

  const tiers = [
    { min: 10, max: 10, rate: 2.5 },
    { min: 11, max: 49, rate: 2.2 },
    { min: 50, max: 99, rate: 2.0 },
    { min: 100, max: 199, rate: 1.75 },
    { min: 200, max: 499, rate: 1.5 },
    { min: 500, max: 999, rate: 1.25 },
    { min: 1000, max: Infinity, rate: 1.0 },
  ];

  const calculatePrice = (value) => {
    const coinValue = Number(value);
    setCoins(value);

    const tier = tiers.find((t) => coinValue >= t.min && coinValue <= t.max);

    if (tier) {
      setPrice((coinValue * tier.rate).toFixed(2));
    } else {
      setPrice(0);
    }
  };

  const fetchdata = async (coins) => {
    if (coins < 10) {
      alert("Coins should be atleast 10");
      return;
    }
    const res = await purchaseCredit(coins);
    console.log("res :",res?.data);
    if (res?.data?.checkoutUrl) {
      // window.location.href = res.checkoutUrl;
      // window.open(res?.data?.checkoutUrl, "_blank");
      window.location.href = res?.data?.checkoutUrl;
    }
  };

  return (
    <div className=" p-6 flex flex-col items-center">
      {/* Input Section */}
      <div className="bg-gray-200 p-6 rounded-xl mb-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-3">Calculate Price</h2>

        <input
          type="number"
          placeholder="Enter coins"
          value={coins}
          onChange={(e) => calculatePrice(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-lg font-bold">
            Total Price: <span className="text-green-700">{price} €</span>
          </p>

          <button
            onClick={() => fetchdata(coins)}
            disabled={Number(coins) < 10}
            className={`px-4 py-2 rounded-lg w-full md:w-auto transition-all duration-200
    ${
      Number(coins) >= 10
        ? "bg-gray-700 text-white hover:bg-gray-800 cursor-pointer"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }
  `}
          >
            Buy Credit
          </button>
        </div>
      </div>

      {/* Existing UI */}
      <motion.h1 className="text-3xl font-bold mb-4">Credits System</motion.h1>
    </div>
  );
};

export default function PurchaseCredit() {
  const tiers = [
    { range: "10", price: "2.50 €" },
    { range: "10 - 50", price: "2.20 €" },
    { range: "50 - 100", price: "2.00 €" },
    { range: "100 - 200", price: "1.75 €" },
    { range: "200 - 500", price: "1.50 €" },
    { range: "500 - 1000", price: "1.25 €" },
    { range: "1000+", price: "1.00 €" },
  ];

  return (
    <div className="min-h-screen text-gray-900 p-6 flex flex-col items-center">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-900  mb-4"
      >
        Credits System
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-500 text-center max-w-xl mb-8"
      >
        Purchase credits and unlock premium features. Flexible plans designed
        for both users and resellers.
      </motion.p>

      {/* Customer Pricing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gray-200 p-6 rounded-2xl shadow-lg w-full max-w-md mb-6"
      >
        <h2 className="text-xl font-semibold text-red-800 mb-4">
          Customer Pricing
        </h2>

        <div className="flex justify-between mb-2">
          <span>1 Code (Annual)</span>
          <span className="text-yellow-800">5.99 €</span>
        </div>

        <div className="flex justify-between">
          <span>2 Codes (Offer)</span>
          <span className="text-yellow-800">14.99 €</span>
        </div>
      </motion.div>

      {/* Reseller Pricing */}
      {/* Reseller Pricing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-200 p-6 rounded-2xl shadow-lg w-full"
      >
        <h2 className="text-xl font-semibold text-red-800 mb-4">
          Reseller Pricing
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: Pricing Tiers - Using Grid instead of Flex */}
          <div className="w-full overflow-x-auto">
            <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
              {/* Table Head */}
              <thead className="bg-gray-200">
                <tr>
                  <th className="text-left p-3 text-sm font-semibold text-gray-700">
                    Quantity(Codes)
                  </th>
                  <th className="text-right p-3 text-sm font-semibold text-gray-700">
                    Unit Price
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {tiers.map((tier, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-gray-100 transition cursor-pointer"
                  >
                    <td className="p-3 text-gray-800 font-medium">
                      {tier.range}
                    </td>

                    <td className="p-3 text-right text-yellow-600 font-bold">
                      {tier.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* RIGHT: Calculator */}
          <div className="flex flex-col justify-center">
            <Coincalculator />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
