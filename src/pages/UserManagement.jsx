

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, Power, ShieldCheck, X } from "lucide-react";

function UserManagement() {
  const [users, setUsers] = useState([
    { id: 1, name: "Aditya Verma", email: "aditya@domain.com", status: "Active", plan: "Premium", joinDate: "12 Oct 2023" },
    { id: 2, name: "Jasprit Kaur", email: "jasprit@domain.com", status: "Active", plan: "Standard", joinDate: "05 Jan 2024" },
    { id: 3, name: "Vikram Rathore", email: "vikram@domain.com", status: "Disabled", plan: "Premium", joinDate: "20 Feb 2024" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", plan: "Standard" });

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.backgroundColor = "#f4f7f6"; 
    document.body.style.fontFamily = "'Inter', sans-serif";
  }, []);

  const handleAddUser = (e) => {
    e.preventDefault();
    const user = { 
      id: Date.now(), 
      ...newUser, 
      status: "Active", 
      joinDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) 
    };
    setUsers([user, ...users]);
    setShowModal(false);
  };

  const toggleStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === "Active" ? "Disabled" : "Active" } : u));
  };

  return (
    <div style={layoutStyle}>
      {/* Main Content - Now 100% Width */}
      <div style={mainContentStyle}>
        <header style={headerStyle}>
          <div>
            <h2 style={{ margin: 0, color: "#2d3436", textTransform: "uppercase", letterSpacing: "1px" }}>User Management</h2>
            <p style={{ margin: 0, fontSize: "14px", color: "#636e72" }}>Manage members and subscriptions</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            style={addBtnStyle}
          >
            <UserPlus size={18} /> Create New User
          </motion.button>
        </header>

        {/* Stats Row */}
        <div style={statsRow}>
            <div style={statCard}>Total Users: {users.length}</div>
            <div style={{...statCard, borderLeft: "4px solid #1e3a8a"}}>Active: {users.filter(u=>u.status==="Active").length}</div>
        </div>

        {/* Grid Container - Full Width */}
        <div style={gridContainer}>
          <AnimatePresence>
            {users.map((user) => (
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
                        <span style={user.status === "Active" ? activeBadge : inactiveBadge}>{user.status}</span>
                    </div>
                    <div style={planBadge(user.plan === "Premium")}>{user.plan}</div>
                </div>

                <div style={cardBody}>
                    <p style={detailText}><strong>Email:</strong> {user.email}</p>
                    <p style={detailText}><strong>Joined:</strong> {user.joinDate}</p>
                </div>

                <div style={cardActions}>
                    <button onClick={() => toggleStatus(user.id)} style={user.status === "Active" ? disableBtn : enableBtn}>
                        <Power size={14} /> {user.status === "Active" ? "Disable" : "Enable"}
                    </button>
                    <button onClick={() => alert(`Plan: ${user.plan}`)} style={checkBtn}>
                        Subscription
                    </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal Code */}
      <AnimatePresence>
        {showModal && (
          <div style={modalOverlay}>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} style={modalContainer}>
              <div style={modalHeader}>
                <h3>New User Registration</h3>
                <X size={20} style={{ cursor: "pointer" }} onClick={() => setShowModal(false)} />
              </div>
              <form onSubmit={handleAddUser}>
                <input required placeholder="Full Name" style={inputStyle} type="text" onChange={(e) => setNewUser({...newUser, name: e.target.value})} />
                <input required placeholder="Email" style={inputStyle} type="email" onChange={(e) => setNewUser({...newUser, email: e.target.value})} />
                <select style={inputStyle} onChange={(e) => setNewUser({...newUser, plan: e.target.value})}>
                  <option value="Standard">Standard</option>
                  <option value="Premium">Premium</option>
                </select>
                <button type="submit" style={submitBtn}>Confirm & Create</button>
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
  padding: "40px",
  boxSizing: "border-box", // पैडिंग को विड्थ के अंदर रखने के लिए
  margin: "0" // कोई मार्जिन नहीं
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "40px",
  width: "100%"
};

const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
  gap: "25px",
  width: "100%" // सुनिश्चित करें कि ग्रिड पूरी जगह ले
};

// ... बाकी स्टाइल वही रहेंगे (Maroon/Blue थीम वाले) ...

const addBtnStyle = { background: "#800000", color: "white", border: "none", padding: "12px 24px", borderRadius: "12px", fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 4px 15px rgba(128, 0, 0, 0.2)" };
const statsRow = { display: "flex", gap: "20px", marginBottom: "30px" };
const statCard = { background: "white", padding: "15px 25px", borderRadius: "12px", fontWeight: "bold", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", borderLeft: "4px solid #800000" };
const cardStyle = { background: "white", borderRadius: "20px", padding: "24px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", border: "1px solid #eee" };
const cardTop = { display: "flex", gap: "15px", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid #f5f5f5", paddingBottom: "15px" };
const avatarStyle = { width: "45px", height: "45px", background: "#f0f2f5", color: "#800000", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "20px" };
const activeBadge = { fontSize: "11px", background: "#dcfce7", color: "#15803d", padding: "2px 8px", borderRadius: "20px", fontWeight: "bold" };
const inactiveBadge = { fontSize: "11px", background: "#fee2e2", color: "#b91c1c", padding: "2px 8px", borderRadius: "20px", fontWeight: "bold" };
const planBadge = (isPremium) => ({ fontSize: "12px", color: isPremium ? "#1e3a8a" : "#636e72", fontWeight: "bold", textTransform: "uppercase", border: `1px solid ${isPremium ? "#1e3a8a" : "#ddd"}`, padding: "4px 10px", borderRadius: "8px" });
const detailText = { margin: "5px 0", fontSize: "14px", color: "#636e72" };
const cardBody = { marginBottom: "20px" };
const cardActions = { display: "flex", gap: "10px" };
const disableBtn = { flex: 1, background: "#fff", border: "1px solid #800000", color: "#800000", padding: "10px", borderRadius: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", fontSize: "13px", fontWeight: "600" };
const enableBtn = { ...disableBtn, background: "#800000", color: "#fff" };
const checkBtn = { flex: 1, background: "#1e3a8a", color: "#fff", border: "none", padding: "10px", borderRadius: "10px", cursor: "pointer", fontSize: "13px", fontWeight: "600" };
const modalOverlay = { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(5px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 };
const modalContainer = { background: "white", padding: "35px", borderRadius: "24px", width: "400px", boxShadow: "0 20px 50px rgba(0,0,0,0.3)" };
const modalHeader = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", color: "#800000" };
const inputStyle = { width: "100%", padding: "12px", marginBottom: "20px", borderRadius: "10px", border: "1px solid #ddd", outline: "none", boxSizing: "border-box" };
const submitBtn = { width: "100%", padding: "14px", background: "linear-gradient(90deg, #800000, #1e3a8a)", color: "white", border: "none", borderRadius: "10px", fontWeight: "bold", cursor: "pointer", fontSize: "16px" };

export default UserManagement;