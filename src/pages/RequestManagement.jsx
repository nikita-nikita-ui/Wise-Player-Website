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
    <div style={{ padding: "20px" }}>
      {/* HEADER (UI from first file) */}
      <div style={header}>
        <h3 className="fw-bold m-0" style={{ color: maroonMain }}>
          Request Management
        </h3>

        <button style={primaryBtn} onClick={() => setShowModal(true)}>
          <Plus size={16} /> New Request
        </button>
      </div>

      {/* FILTER (same style as first) */}
      <div style={{ margin: "20px 0" }}>
        {["All", "Pending", "Approved", "Rejected"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            style={{
              ...filterBtn,
              background: filter === tab ? "#333" : "#eee",
              color: filter === tab ? "#fff" : "#000",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TABLE (styled like first) */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Device Id</th>
            <th>Reseller Id</th>
            <th>Plan Name</th>
            <th>Credits Used</th>
            <th>Created At</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredRequests.length > 0 ? (
            currentRequests.map((req) => (
              <tr key={req.id}>
                <td>
                  <div style={{ ...cellFlex, position: "relative" }}>
                    <span style={ellipsis} title={req.deviceId}>
                      {req.deviceId}
                    </span>

                    <button
                      onClick={() =>
                        copyToClipboard(req.deviceId, req.id, "device")
                      }
                      className="text-blue-500 text-xs border px-2 py-1 rounded"
                    >
                      <IoCopyOutline />
                    </button>

                    {copied.id === req.id && copied.field === "device" && (
                      <div className="absolute top-[-25px] left-0 bg-black text-white text-xs px-2 py-1 rounded">
                        Copied!
                      </div>
                    )}
                  </div>
                </td>

                <td>
                  <div style={{ ...cellFlex, position: "relative" }}>
                    <span style={ellipsis} title={req.resellerId}>
                      {req.resellerId}
                    </span>

                    <button
                      onClick={() =>
                        copyToClipboard(req.resellerId, req.id, "reseller")
                      }
                      className="text-blue-500 text-xs border px-2 py-1 rounded"
                    >
                      <IoCopyOutline />
                    </button>

                    {copied.id === req.id && copied.field === "reseller" && (
                      <div className="absolute top-[-25px] left-0 bg-black text-white text-xs px-2 py-1 rounded">
                        Copied!
                      </div>
                    )}
                  </div>
                </td>

                <td>{req.planName}</td>
                <td>{req.creditsUsed ?? "N/A"}</td>
                <td>{req.createdAt}</td>

                <td>
                  {req.status === "PENDING" && (
                    <span style={{ color: "orange" }}>Pending</span>
                  )}
                  {req.status === "APPROVED" && (
                    <span style={{ color: "green" }}>Approved</span>
                  )}
                  {req.status === "REJECTED" && (
                    <span style={{ color: "red" }}>Rejected</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">
                <div className="text-center text-gray-500 py-3">
                  No Data Found
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center gap-3 p-3 flex-wrap">

          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="btn btn-sm btn-outline-dark"
          >
            Prev
          </button>

          <span style={{ fontWeight: "500" }}>
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="btn btn-sm btn-outline-dark"
          >
            Next
          </button>

        </div>
      )}
      {/* MODAL (styled like first file) */}
      <AnimatePresence>
        {showModal && (
          <div style={overlay}>
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              exit={{ y: 50 }}
              style={modal}
            >
              <h3 style={{ color: maroonMain, fontWeight: "600" }}>
                Submit Request
              </h3>

              {apiError && <p style={errorText}>{apiError}</p>}

              <form onSubmit={handleSubmit}>
                <input
                  placeholder="Device ID"
                  value={newRequest.deviceId}
                  onChange={(e) =>
                    setNewRequest({ ...newRequest, deviceId: e.target.value })
                  }
                  style={input}
                />

                <select
                  value={newRequest.planName}
                  onChange={(e) =>
                    setNewRequest({ ...newRequest, planName: e.target.value })
                  }
                  style={input}
                >
                  <option value="">Select Plan</option>
                  {tiers.map((t, i) => (
                    <option key={i} value={t}>
                      {t}
                    </option>
                  ))}
                </select>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button type="submit" style={{ ...primaryBtn, flex: 1 }}>
                    Submit
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    style={cancelBtn}
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

/* ================= UI STYLES (from first file) ================= */

const maroonMain = "#800000";

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const primaryBtn = {
  background: maroonMain,
  color: "#fff",
  padding: "8px 14px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  display: "flex",
  gap: "6px",
  alignItems: "center",
};

const cancelBtn = {
  flex: 1,
  background: "#e5e7eb",
  borderRadius: "8px",
  padding: "8px",
  cursor: "pointer",
  border: "none",
};

const filterBtn = {
  marginRight: "10px",
  padding: "6px 12px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
};

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modal = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  width: "400px",
};

const input = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  border: "1px solid #ccc",
  borderRadius: "6px",
};

const errorText = {
  color: "red",
  fontSize: "14px",
};

const cellFlex = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
};

const ellipsis = {
  maxWidth: "120px",
  display: "inline-block",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  cursor: "pointer",
};

export default RequestManagement;