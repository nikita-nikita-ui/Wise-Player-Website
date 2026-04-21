import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, Power, ShieldCheck, X } from "lucide-react";
import { subscibedUserinfo } from "../auth/userManagement";
import { formatDate } from "../auth/utilfunction";
import { DisableUserAccount, createUser } from "../auth/userManagement";
import { span } from "framer-motion/client";
function UserManagement() {
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "santosh",
      email: "skemail.com",
      status: "Active",
      plan: "preminum",
      joinDate: "1-1-1",
    },
  ]);
    const maroonMain = "#800000";
  const [devices, setDevices] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    deviceId: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [totalUser, setTotalUser] = useState("");
  const [activeUser, setActiveUser] = useState(null);
  console.log("activeUser", activeUser);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.backgroundColor = "#f4f7f6";
    document.body.style.fontFamily = "'Inter', sans-serif";
  }, []);

  const fetchDashboard = async () => {
    const res = await subscibedUserinfo();

    console.log("API Response:", res.data); // ✅ ab actual data aaye
    console.log("length : ", res.data.length);
    setTotalUser(res.data?.content?.length || 0);
    setActiveUser(
      res?.data?.content?.filter((u) => u.deviceStatus === "ACTIVE")?.length ||
        0,
    );

    if (res.success) {
      setDevices(res.data?.content || []);
    } else {
      console.error(res.message);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleDisable = async (deviceId) => {
    const response = await DisableUserAccount(deviceId);

    console.log(response.data);

    await fetchDashboard();
  };

  const handleAddUser = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (!newUser.deviceId) return;

    try {
      const response = await createUser(newUser.deviceId);
      console.log("API Response:", response);
      if (response?.success === true) {
        fetchDashboard();
        setShowModal(false);
        await fetchDashboard();
      } else {
        setError(response?.message);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  const toggleStatus = (id) => {
    setUsers(
      users.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "Active" ? "Disabled" : "Active" }
          : u,
      ),
    );
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Copied to clipboard:", text);
        // optional: show toast
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  };

  return (
    <div style={layoutStyle}>
      {/* Main Content - Now 100% Width */}
      <div style={mainContentStyle}>
        <header style={headerStyle}>
          <div>
            {/* <h2
              style={{
                margin: 0,
                color: "#2d3436",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              User Management
            </h2>
            <p style={{ margin: 0, fontSize: "14px", color: "#636e72" }}>
              Manage members and subscriptions
            </p> */}
            <div className="col-md-12">
          <h3 className="fw-bold m-0" style={{ color: maroonMain }}>
            Device Management
          </h3>
          <p className="text-muted">
             Manage members and subscriptions
          </p>
        </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            style={addBtnStyle}
          >
            <UserPlus size={18} /> Create New Device
          </motion.button>
        </header>

        {/* Stats Row */}
        <div style={statsRow}>
          <div style={statCard}>Total Users: {totalUser}</div>
          <div style={{ ...statCard, borderLeft: "4px solid #1e3a8a" }}>
            Active: {activeUser}
          </div>
        </div>

        {/* Grid Container - Full Width */}
        <div>
          <AnimatePresence>
            {/* {users.map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={cardStyle}
              >
                <div style={cardTop}>
                  <div style={avatarStyle}>{user.name.charAt(0)}</div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: 0, color: "#2d3436" }}>{user.name}</h4>
                    <span
                      style={
                        user.status === "Active" ? activeBadge : inactiveBadge
                      }
                    >
                      {user.status}
                    </span>
                  </div>
                  <div style={planBadge(user.plan === "Premium")}>
                    {user.plan}
                  </div>
                </div>

                <div style={cardBody}>
                  <p style={detailText}>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p style={detailText}>
                    <strong>Joined:</strong> {user.joinDate}
                  </p>
                </div>

                <div style={cardActions}>
                  <button
                    onClick={() => toggleStatus(user.id)}
                    style={user.status === "Active" ? disableBtn : enableBtn}
                  >
                    <Power size={14} />{" "}
                    {user.status === "Active" ? "Disable" : "Enable"}
                  </button>
                  <button
                    onClick={() => alert(`Plan: ${user.plan}`)}
                    style={checkBtn}
                  >
                    Subscription
                  </button>
                </div>
              </motion.div>
            ))} */}
            <div className="bg-white rounded-xl shadow border overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                {/* Header */}
                <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3">Device ID</th>

                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Subscription</th>
                    <th className="px-4 py-3">Expires</th>
                    <th className="px-4 py-3">Registered</th>
                    <th className="px-4 py-3">action</th>
                  </tr>
                </thead>

                {/* Body */}
                <tbody>
                  {devices.length > 0 ? (
                    devices.slice(0, 8).map((item, index) => (
                      <tr key={index} className="border-t hover:bg-gray-50">
                        {/* Device */}

                        {/* Device ID */}
                        <td className="px-3 line-clamp-1 truncate py-3 text-gray-600 flex items-center gap-2">
                          <span>{item.deviceId.slice(0, 8)}...</span>

                          <button
                            onClick={() => copyToClipboard(item.deviceId)}
                            className="text-blue-500 hover:text-blue-700 text-xs border px-2 py-1 rounded"
                          >
                            Copy
                          </button>
                        </td>

                        {/* Platform */}

                        {/* Status */}
                        <td className="px-3 py-3">
                          <span
                            className={`px-2 py-1 text-center text-xs rounded-full font-semibold ${
                              item.deviceStatus === "ACTIVE"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {item.deviceStatus}
                          </span>
                        </td>

                        {/* Subscription */}
                        <td className="px-2 text-center py-3">
                          {item.subscriptionType}
                        </td>

                        {/* Expires */}
                        <td className="px-2 text-center py-3">
                          {formatDate(item.expiresAt)}
                        </td>

                        {/* Registered */}
                        <td className="px-2 text-center py-3">
                          {formatDate(item.registeredAt)}
                        </td>

                        <td>
                          <button
                            onClick={() => handleDisable(item.deviceId)}
                            style={
                              item.deviceStatus === "INACTIVE"
                                ? disableBtn
                                : enableBtn
                            }
                          >
                            <Power size={14} />{" "}
                            {item.active === false ? "Disable" : "Enable"}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <>
                      <tr className="w-full ">
                        <td colSpan="6" className="py-6">
                          <div className="w-full flex justify-center items-center text-gray-500">
                            No User found
                          </div>
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </AnimatePresence>
        </div>
      </div>

      {/* Modal Code */}
      <AnimatePresence>
        {showModal && (
          <div style={modalOverlay}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={modalContainer}
            >
              <div style={modalHeader}>
                <h3>New User Registration</h3>
                <X
                  size={20}
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowModal(false)}
                />
              </div>
              <div>
                {error !== "" && (
                  <span className="text-sm text-red-400 py-1 px-1 font-semibold">
                    {error}
                  </span>
                )}
              </div>
              <form onSubmit={handleAddUser}>
                <input
                  required
                  placeholder="Device Id : 00:1A:2B:3C:4D:5E"
                  style={inputStyle}
                  type="text"
                  value={newUser.deviceId || ""}
                  onChange={(e) =>
                    setNewUser({ ...newUser, deviceId: e.target.value })
                  }
                />

                <button
                  type="submit"
                  style={submitBtn}
                  disabled={loading}
                  className="flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Confirm & Create"
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- संशोधित Styles ---

const layoutStyle = {
  width: "100%",
  minHeight: "100vh",
  display: "block", // Flex हटा दिया ताकि विड्थ सही रहे
};

const mainContentStyle = {
  width: "100%", // अब ये पूरी स्क्रीन लेगा
  padding: "20px",
  boxSizing: "border-box", // पैडिंग को विड्थ के अंदर रखने के लिए
  margin: "0", // कोई मार्जिन नहीं
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "40px",
  width: "100%",
};

const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
  gap: "25px",
  width: "100%", // सुनिश्चित करें कि ग्रिड पूरी जगह ले
};

// ... बाकी स्टाइल वही रहेंगे (Maroon/Blue थीम वाले) ...

const addBtnStyle = {
  background: "#800000",
  color: "white",
  border: "none",
  padding: "12px 24px",
  borderRadius: "12px",
  fontWeight: "bold",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  boxShadow: "0 4px 15px rgba(128, 0, 0, 0.2)",
};
const statsRow = { display: "flex", gap: "20px", marginBottom: "30px" };
const statCard = {
  background: "white",
  padding: "15px 25px",
  borderRadius: "12px",
  fontWeight: "bold",
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  borderLeft: "4px solid #800000",
};
const cardStyle = {
  background: "white",
  borderRadius: "20px",
  padding: "24px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
  border: "1px solid #eee",
};
const cardTop = {
  display: "flex",
  gap: "15px",
  alignItems: "center",
  marginBottom: "20px",
  borderBottom: "1px solid #f5f5f5",
  paddingBottom: "15px",
};
const avatarStyle = {
  width: "45px",
  height: "45px",
  background: "#f0f2f5",
  color: "#800000",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  fontSize: "20px",
};
const activeBadge = {
  fontSize: "11px",
  background: "#dcfce7",
  color: "#15803d",
  padding: "2px 8px",
  borderRadius: "20px",
  fontWeight: "bold",
};
const inactiveBadge = {
  fontSize: "11px",
  background: "#fee2e2",
  color: "#b91c1c",
  padding: "2px 8px",
  borderRadius: "20px",
  fontWeight: "bold",
};
const planBadge = (isPremium) => ({
  fontSize: "12px",
  color: isPremium ? "#1e3a8a" : "#636e72",
  fontWeight: "bold",
  textTransform: "uppercase",
  border: `1px solid ${isPremium ? "#1e3a8a" : "#ddd"}`,
  padding: "4px 10px",
  borderRadius: "8px",
});
const detailText = { margin: "5px 0", fontSize: "14px", color: "#636e72" };
const cardBody = { marginBottom: "20px" };
const cardActions = { display: "flex", gap: "10px" };
const disableBtn = {
  flex: 1,
  background: "#fff",
  border: "1px solid #800000",
  color: "#800000",
  padding: "10px",
  borderRadius: "10px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "5px",
  fontSize: "13px",
  fontWeight: "600",
};
const enableBtn = { ...disableBtn, background: "#800000", color: "#fff" };
const checkBtn = {
  flex: 1,
  background: "#1e3a8a",
  color: "#fff",
  border: "none",
  padding: "10px",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "600",
};
const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.6)",
  backdropFilter: "blur(5px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};
const modalContainer = {
  background: "white",
  padding: "35px",
  borderRadius: "24px",
  width: "400px",
  boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
};
const modalHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "25px",
  color: "#800000",
};
const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "20px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  outline: "none",
  boxSizing: "border-box",
};
const submitBtn = {
  width: "100%",
  padding: "14px",
  background: "linear-gradient(90deg, #800000, #1e3a8a)",
  color: "white",
  border: "none",
  borderRadius: "10px",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "16px",
};

export default UserManagement;
