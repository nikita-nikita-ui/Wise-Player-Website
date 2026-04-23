import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, Power, X } from "lucide-react";
import {
  subscibedUserinfo,
  DisableUserAccount,
  createUser,
} from "../auth/userManagement";
import { formatDate } from "../auth/utilfunction";

function UserManagement() {
  const maroonMain = "#800000";

  const [devices, setDevices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ deviceId: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalUser, setTotalUser] = useState("");
  const [activeUser, setActiveUser] = useState(null);

  // ✅ pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchDashboard = async () => {
    const res = await subscibedUserinfo();

    if (res.success) {
      const data = res.data?.content || [];

      const sortedData = [...data].sort(
        (a, b) => new Date(b.registeredAt) - new Date(a.registeredAt)
      );

      setDevices(sortedData);
      setTotalUser(data.length);
      setActiveUser(
        data.filter((u) => u.deviceStatus === "ACTIVE").length
      );

      setCurrentPage(1);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // ✅ prevent invalid page
  useEffect(() => {
    const totalPages = Math.ceil((devices?.length || 0) / itemsPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [devices, currentPage]);

  const handleDisable = async (deviceId) => {
  const targetUser = devices.find((d) => d.deviceId === deviceId);

  const isCurrentlyActive = targetUser?.deviceStatus === "ACTIVE";

  const confirmAction = window.confirm(
    `Are you sure you want to ${
      isCurrentlyActive ? "disable" : "activate"
    } this user?`
  );

  if (!confirmAction) return;

  await DisableUserAccount(deviceId);

  setDevices((prev) => {
    const updated = prev.map((item) =>
      item.deviceId === deviceId
        ? {
            ...item,
            deviceStatus:
              item.deviceStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE",
          }
        : item
    );

    // keep your existing logic
    const activeCount = updated.filter(
      (u) => u.deviceStatus === "ACTIVE"
    ).length;

    setActiveUser(activeCount);

    return updated.sort(
      (a, b) => new Date(b.registeredAt) - new Date(a.registeredAt)
    );
  });
};


  const handleAddUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await createUser(newUser.deviceId);

      if (response?.success) {
        setShowModal(false);
        fetchDashboard();
        setNewUser({ deviceId: "" });
        setError("");
      } else {
        setError(response?.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  // ✅ pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentDevices =
    devices.length > 0
      ? devices.slice(indexOfFirst, indexOfLast)
      : [];

  const totalPages = Math.ceil((devices?.length || 0) / itemsPerPage);

  return (
    <div style={{ minHeight: "100vh", width: "100%" }}>
      <div style={mainContentStyle}>
        
        {/* HEADER */}
        <header style={headerStyle}>
          <div>
            <h3 className="fw-bold m-0" style={{ color: maroonMain }}>
              Device Management
            </h3>
            <p className="text-muted">Manage members and subscriptions</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            style={addBtnStyle}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <UserPlus size={18} />
              <span>Create New Device</span>
            </div>
          </motion.button>
        </header>

        {/* STATS */}
        <div style={statsRow}>
          <div style={statCard}>Total Users: {totalUser}</div>
          <div style={{ ...statCard, borderLeft: "4px solid #1e3a8a" }}>
            Active: {activeUser}
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow border">
          <div style={{ overflowX: "auto" }}>
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 text-center">Device ID</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-center">Subscription</th>
                  <th className="px-4 py-3 text-center">Expires</th>
                  <th className="px-4 py-3 text-center">Registered</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {currentDevices.length > 0 ? (
                  currentDevices.map((item) => (
                    <tr key={item.deviceId} className="border-t text-center">
                      
                      <td className="px-3 py-3 text-gray-600">
                        <div className="d-flex justify-content-center align-items-center gap-2">
                          <span>{item.deviceId.slice(0, 8)}...</span>
                          <button
                            onClick={() => copyToClipboard(item.deviceId)}
                            className="text-blue-500 text-xs border px-2 py-1 rounded"
                          >
                            Copy
                          </button>
                        </div>
                      </td>

                      <td className="px-3 py-3">
                        <span
                          className={`px-2 py-1 text-xs rounded-full fw-semibold ${
                            item.deviceStatus === "ACTIVE"
                              ? "bg-success-subtle text-success"
                              : "bg-danger-subtle text-danger"
                          }`}
                        >
                          {item.deviceStatus}
                        </span>
                      </td>

                      <td className="px-2 py-3">{item.subscriptionType}</td>

                      <td className="px-2 py-3">
                        {formatDate(item.expiresAt)}
                      </td>

                      <td className="px-2 py-3">
                        {formatDate(item.registeredAt)}
                      </td>

                      <td className="px-2 py-3">
                        <button
                          onClick={() => handleDisable(item.deviceId)}
                          style={
                            item.deviceStatus === "INACTIVE"
                              ? disableBtn
                              : enableBtn
                          }
                        >
                          <Power size={14} />
                        </button>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-6">
                      No User found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ✅ UPDATED PAGINATION */}
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
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {showModal && (
          <div style={modalOverlay}>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              style={modalContainer}
            >
              <div style={modalHeader}>
                <h5>New Device</h5>
                <X onClick={() => setShowModal(false)} />
              </div>

              {error && <p style={{ color: "red" }}>{error}</p>}

              <form onSubmit={handleAddUser}>
                <input
                  required
                  style={inputStyle}
                  value={newUser.deviceId}
                  onChange={(e) =>
                    setNewUser({ deviceId: e.target.value })
                  }
                  placeholder="Enter Device ID"
                />

                <button style={submitBtn} disabled={loading}>
                  {loading ? "Processing..." : "Create"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* STYLES (UNCHANGED) */

const mainContentStyle = {
  width: "100%",
  padding: "16px",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "10px",
  marginBottom: "30px",
};

const statsRow = {
  display: "flex",
  gap: "15px",
  flexWrap: "wrap",
  marginBottom: "20px",
};

const statCard = {
  flex: "1 1 150px",
  background: "white",
  padding: "15px",
  borderRadius: "12px",
  fontWeight: "bold",
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  borderLeft: "4px solid #800000",
};

const addBtnStyle = {
  background: "#800000",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "10px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const disableBtn = {
  border: "1px solid #800000",
  color: "#800000",
  padding: "6px 10px",
};

const enableBtn = {
  ...disableBtn,
  background: "#800000",
  color: "#fff",
};

const modalOverlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalContainer = {
  background: "#fff",
  padding: "20px",
  borderRadius: "16px",
  width: "90%",
  maxWidth: "400px",
};

const modalHeader = {
  display: "flex",
  justifyContent: "space-between",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
};

const submitBtn = {
  width: "100%",
  padding: "12px",
  background: "#800000",
  color: "#fff",
  border: "none",
};

export default UserManagement;