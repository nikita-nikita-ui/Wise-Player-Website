import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCopyOutline } from "react-icons/io5";
import { Plus } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { formatDate } from "../auth/utilfunction";
import { useDashboard } from "../context/dashboardContext";

import {
  getActivationRequests,
  createActivationRequest,
  getPlans,
} from "../auth/api/activationRequest";

function RequestManagement() {
  const { userRole } = useAuth();

  const [requests, setRequests] = useState([]);
  const [tiers, setTiers] = useState([]);
  const [filter, setFilter] = useState("All");
  const [copied, setCopied] = useState({ id: null, field: null });
  const [showModal, setShowModal] = useState(false);
  const [apiError, setApiError] = useState("");

  const { refetchDashboard } = useDashboard();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [newRequest, setNewRequest] = useState({
    deviceId: "",
    planName: "",
  });

  // FETCH REQUESTS
  const fetchRequests = async () => {
    const res = await getActivationRequests(userRole);
    if (!res.success) return;

    const data = res.data?.content || [];

    setRequests(
      data.map((item) => ({
        id: item.id,
        status: item.status,
        createdAt: formatDate(item.createdAt),
        resellerId: item.resellerId,
        deviceId: item.deviceId,
        planName: item.planName,
        creditsUsed: item.creditsUsed,
      }))
    );
  };

  // FETCH PLANS
  const fetchPlans = async () => {
    const res = await getPlans();
    if (!res.success) return;

    setTiers(res.data.map((p) => p.name));
  };

  useEffect(() => {
    fetchRequests();
    fetchPlans();
    setCurrentPage(1);
  }, [userRole,filter]);

  // COPY
  const copyToClipboard = (text, id, field) => {
    navigator.clipboard.writeText(text);

    setCopied({ id, field });

    setTimeout(() => {
      setCopied({ id: null, field: null });
    }, 1500);
  };

  // SUBMIT
 const handleSubmit = async (e) => {
  e.preventDefault();
  setApiError("");

  const payload = {
    deviceId: newRequest.deviceId,
    planName: newRequest.planName,
    amount: 5,
    currency: "CREDITS",
  };

  const res = await createActivationRequest(userRole, payload);

  if (!res.success) {
    setApiError(res.message);
    return;
  }

  setShowModal(false);
  setNewRequest({ deviceId: "", planName: "" });

  await fetchRequests();

  // 🔥 THIS IS THE FIX
  await refetchDashboard();
};
  // FILTER
  const filteredRequests =
    filter === "All"
      ? requests
      : requests.filter((r) => r.status === filter.toUpperCase());

  // pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentRequests = filteredRequests.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  const maroonMain = "#800000";

 return (
  <div className="p-4 space-y-6">

    {/* HEADER */}
    <div className="flex justify-between items-center">
      <h2 className="text-lg font-semibold text-[#800000]">
        Request Management
      </h2>

      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 bg-[#800000] text-white px-4 py-2 rounded-lg text-sm hover:opacity-90"
      >
        <Plus size={16} /> New Request
      </button>
    </div>

    {/* FILTER */}
    <div className="flex gap-2 flex-wrap">
      {["All", "Pending", "Approved", "Rejected"].map((tab) => (
        <button
          key={tab}
          onClick={() => setFilter(tab)}
          className={`px-3 py-1 rounded-md text-sm transition ${
            filter === tab
              ? "bg-black text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>

    {/* DESKTOP TABLE */}
    <div className="hidden md:block bg-white rounded-xl shadow border overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-xs uppercase text-gray-600">
          <tr>
            <th className="px-4 py-3 text-center">Device ID</th>
            <th className="px-4 py-3 text-center">Reseller ID</th>
            <th className="px-4 py-3 text-center">Plan</th>
            <th className="px-4 py-3 text-center">Credits</th>
            <th className="px-4 py-3 text-center">Created</th>
            <th className="px-4 py-3 text-center">Status</th>
          </tr>
        </thead>

        <tbody>
          {currentRequests.length > 0 ? (
            currentRequests.map((req) => (
              <tr key={req.id} className="border-t text-center">

                {/* DEVICE */}
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2 items-center">
                    <span
                      className="text-blue-600 cursor-pointer"
                      title={req.deviceId}
                    >
                      {req.deviceId.slice(0, 8)}...
                    </span>

                    <button
                      onClick={() =>
                        copyToClipboard(req.deviceId, req.id, "device")
                      }
                      className="text-xs border px-2 py-1 rounded hover:bg-blue-50"
                    >
                      Copy
                    </button>

                    {copied.id === req.id &&
                      copied.field === "device" && (
                        <span className="absolute mt-[-30px] bg-black text-white text-[10px] px-2 py-1 rounded">
                          Copied!
                        </span>
                      )}
                  </div>
                </td>

                {/* RESELLER */}
                <td>
                  <div className="flex justify-center gap-2 items-center">
                    <span title={req.resellerId}>
                      {req.resellerId?.slice(0, 8)}...
                    </span>

                    <button
                      onClick={() =>
                        copyToClipboard(req.resellerId, req.id, "reseller")
                      }
                      className="text-xs border px-2 py-1 rounded hover:bg-blue-50"
                    >
                      Copy
                    </button>
                  </div>
                </td>

                <td>{req.planName}</td>
                <td>{req.creditsUsed ?? "-"}</td>
                <td>{req.createdAt}</td>

                {/* STATUS */}
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      req.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-600"
                        : req.status === "APPROVED"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="py-6 text-center">
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    {/* MOBILE CARDS */}
    <div className="md:hidden space-y-4">
      {currentRequests.length > 0 ? (
        currentRequests.map((req) => (
          <div
            key={req.id}
            className="bg-white p-4 rounded-xl shadow"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-blue-600">
                {req.deviceId.slice(0, 6)}...
              </span>

              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  req.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-600"
                    : req.status === "APPROVED"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {req.status}
              </span>
            </div>

            <div className="text-sm text-gray-500 mt-2 space-y-1">
              <p>Reseller: {req.resellerId}</p>
              <p>Plan: {req.planName}</p>
              <p>Credits: {req.creditsUsed ?? "-"}</p>
              <p>Created: {req.createdAt}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No Requests</p>
      )}
    </div>

    {/* PAGINATION */}
    {totalPages > 1 && (
      <div className="flex justify-center items-center gap-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="border px-3 py-1 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="border px-3 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    )}
    <AnimatePresence>
  {showModal && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.25 }}
        className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6"
      >
        {/* TITLE */}
        <h3 className="text-lg font-semibold text-[#800000] mb-4">
          Submit Request
        </h3>

        {/* ERROR */}
        {apiError && (
          <p className="text-red-500 text-sm mb-3">{apiError}</p>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* DEVICE ID */}
          <input
            type="text"
            placeholder="Device ID"
            value={newRequest.deviceId}
            onChange={(e) =>
              setNewRequest({
                ...newRequest,
                deviceId: e.target.value,
              })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#800000]"
          />

          {/* PLAN */}
          <select
            value={newRequest.planName}
            onChange={(e) =>
              setNewRequest({
                ...newRequest,
                planName: e.target.value,
              })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#800000]"
          >
            <option value="">Select Plan</option>
            {tiers.map((t, i) => (
              <option key={i} value={t}>
                {t}
              </option>
            ))}
          </select>

          {/* BUTTONS */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-[#800000] text-white py-2 rounded-lg text-sm hover:opacity-90"
            >
              Submit
            </button>

            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="flex-1 bg-gray-200 py-2 rounded-lg text-sm hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  )}
</AnimatePresence>
    </div>
  );
}


export default RequestManagement;