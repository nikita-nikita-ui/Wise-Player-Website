// import React from 'react';
// import { motion } from 'framer-motion';

// function RequestManagement() {
//   return (
//     <div
//       style={{
//         width: "100%",
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #667eea, #764ba2)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         color: "#fff",
//         fontFamily: "sans-serif",
//         margin: 0,
//         padding: 0,
//         boxSizing: "border-box"
//       }}
//     >
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//         style={{
//           background: "rgba(255,255,255,0.1)",
//           backdropFilter: "blur(12px)",
//           padding: "40px",
//           borderRadius: "24px",
//           boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
//           textAlign: "center",
//           width: "380px",
//           border: "1px solid rgba(255,255,255,0.1)"
//         }}
//       >
//         <h2 style={{ 
//           marginBottom: "15px", 
//           textTransform: "uppercase", 
//           letterSpacing: "1.5px",
//           fontSize: "22px" 
//         }}>
//           Request Management
//         </h2>
//         <p style={{ opacity: 0.8, marginBottom: "30px" }}>
//           Manage incoming requests here 📨
//         </p>

//         <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
//           <button style={buttonStyle}>Pending Requests</button>
//           <button style={buttonStyle}>Approved Requests</button>
//           <button style={{...buttonStyle, background: "rgba(255,255,255,0.1)", border: "1px solid white"}}>
//             Back to Dashboard
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// // Buttons के लिए कॉमन स्टाइल
// const buttonStyle = {
//   padding: "14px",
//   borderRadius: "12px",
//   border: "none",
//   background: "#1e293b",
//   color: "white",
//   fontSize: "15px",
//   fontWeight: "600",
//   cursor: "pointer",
//   transition: "all 0.3s ease",
//   boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
// };

// export default RequestManagement;

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Clock, CheckCircle, XCircle, Plus, Filter, ArrowLeft } from "lucide-react";

function RequestManagement() {
  // State for Requests
  const [requests, setRequests] = useState([
    { id: 1, title: "Server Access", description: "Need access to production server for deployment.", status: "Pending", date: "2023-10-24" },
    { id: 2, title: "Software License", description: "Requesting Adobe Suite license for design work.", status: "Approved", date: "2023-10-22" },
    { id: 3, title: "Hardware Upgrade", description: "Requesting 16GB RAM upgrade for workstation.", status: "Rejected", date: "2023-10-20" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newRequest, setNewRequest] = useState({ title: "", description: "" });
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.backgroundColor = "#f8fafc";
    document.body.style.fontFamily = "'Inter', sans-serif";
  }, []);

  // Submit Logic
  const handleSubmit = (e) => {
    e.preventDefault();
    const requestObj = {
      id: Date.now(),
      title: newRequest.title,
      description: newRequest.description,
      status: "Pending",
      date: new Date().toISOString().split('T')[0]
    };
    setRequests([requestObj, ...requests]);
    setShowModal(false);
    setNewRequest({ title: "", description: "" });
  };

  const filteredRequests = filter === "All" ? requests : requests.filter(r => r.status === filter);

  return (
    <div style={containerStyle}>
      {/* Header Section */}
      <header style={headerStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <div style={iconBox}><Send size={24} color="#fff" /></div>
          <div>
            <h1 style={{ margin: 0, fontSize: "24px", color: "#2d3436" }}>Request Management</h1>
            <p style={{ margin: 0, fontSize: "14px", color: "#636e72" }}>Submit and track your requests in real-time</p>
          </div>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowModal(true)}
          style={submitBtnTop}
        >
          <Plus size={18} /> Submit New Request
        </motion.button>
      </header>

      {/* Main Content Area */}
      <main style={mainContent}>
        
        {/* Statistics & Filter Bar */}
        <div style={filterBar}>
          <div style={{ display: "flex", gap: "10px" }}>
            {["All", "Pending", "Approved", "Rejected"].map((tab) => (
              <button 
                key={tab}
                onClick={() => setFilter(tab)}
                style={filter === tab ? activeTabStyle : tabStyle}
              >
                {tab}
              </button>
            ))}
          </div>
          <div style={statsText}>Showing {filteredRequests.length} Requests</div>
        </div>

        {/* Requests Grid */}
        <div style={gridContainer}>
          <AnimatePresence mode="popLayout">
            {filteredRequests.map((req) => (
              <motion.div
                key={req.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5 }}
                style={cardStyle}
              >
                <div style={cardHeader}>
                  <h3 style={cardTitle}>{req.title}</h3>
                  <div style={statusBadge(req.status)}>
                    {req.status === "Pending" && <Clock size={12} />}
                    {req.status === "Approved" && <CheckCircle size={12} />}
                    {req.status === "Rejected" && <XCircle size={12} />}
                    {req.status}
                  </div>
                </div>
                
                <p style={cardDesc}>{req.description}</p>
                
                <div style={cardFooter}>
                  <span style={dateText}>Date: {req.date}</span>
                  <span style={trackLink}>Track Details →</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Submit Request Modal */}
      <AnimatePresence>
        {showModal && (
          <div style={modalOverlay}>
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              style={modalContainer}
            >
              <div style={modalHeader}>
                <h2 style={{ margin: 0, color: "#800000" }}>Submit Request</h2>
                <XCircle size={24} color="#636e72" cursor="pointer" onClick={() => setShowModal(false)} />
              </div>
              <form onSubmit={handleSubmit}>
                <label style={labelStyle}>Request Title</label>
                <input 
                  required
                  placeholder="e.g. Access to Portal"
                  style={inputStyle} 
                  value={newRequest.title}
                  onChange={(e) => setNewRequest({...newRequest, title: e.target.value})}
                />
                
                <label style={labelStyle}>Description / Reason</label>
                <textarea 
                  required
                  rows="4"
                  placeholder="Explain why you need this..."
                  style={{...inputStyle, resize: "none"}}
                  value={newRequest.description}
                  onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                />

                <div style={modalActions}>
                  <button type="button" onClick={() => setShowModal(false)} style={cancelBtn}>Cancel</button>
                  <button type="submit" style={submitBtnForm}>Send Request</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Styles (Maroon & Blue Professional Theme) ---

const containerStyle = {
  width: "100%",
  minHeight: "100vh",
  boxSizing: "border-box",
};

const headerStyle = {
  background: "#fff",
  padding: "20px 5%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  borderBottom: "3px solid #800000" // Maroon accent line
};

const iconBox = {
  background: "#1e3a8a", // Blue
  padding: "10px",
  borderRadius: "12px"
};

const submitBtnTop = {
  background: "#800000", // Maroon
  color: "#fff",
  border: "none",
  padding: "12px 24px",
  borderRadius: "10px",
  fontWeight: "bold",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  boxShadow: "0 4px 15px rgba(128, 0, 0, 0.3)"
};

const mainContent = {
  padding: "40px 5%",
  maxWidth: "1400px",
  margin: "0 auto"
};

const filterBar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "30px"
};

const tabStyle = {
  padding: "8px 20px",
  borderRadius: "20px",
  border: "1px solid #ddd",
  background: "#fff",
  cursor: "pointer",
  fontSize: "14px",
  color: "#636e72",
  transition: "0.3s"
};

const activeTabStyle = {
  ...tabStyle,
  background: "#1e3a8a",
  color: "#fff",
  borderColor: "#1e3a8a"
};

const statsText = { fontSize: "14px", color: "#636e72", fontWeight: "600" };

const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
  gap: "25px"
};

const cardStyle = {
  background: "#fff",
  borderRadius: "20px",
  padding: "25px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.03)",
  border: "1px solid #edf2f7",
  position: "relative",
  overflow: "hidden"
};

const cardHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: "15px"
};

const cardTitle = { margin: 0, fontSize: "18px", color: "#2d3436" };

const statusBadge = (status) => ({
  display: "flex",
  alignItems: "center",
  gap: "5px",
  fontSize: "12px",
  fontWeight: "bold",
  padding: "4px 10px",
  borderRadius: "20px",
  background: status === "Pending" ? "#fff7ed" : status === "Approved" ? "#f0fdf4" : "#fef2f2",
  color: status === "Pending" ? "#c2410c" : status === "Approved" ? "#15803d" : "#b91c1c",
  border: `1px solid ${status === "Pending" ? "#fdba74" : status === "Approved" ? "#86efac" : "#fca5a5"}`
});

const cardDesc = {
  fontSize: "14px",
  color: "#636e72",
  lineHeight: "1.6",
  marginBottom: "20px",
  minHeight: "45px"
};

const cardFooter = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderTop: "1px solid #f1f5f9",
  paddingTop: "15px"
};

const dateText = { fontSize: "12px", color: "#94a3b8" };
const trackLink = { fontSize: "13px", color: "#1e3a8a", fontWeight: "bold", cursor: "pointer" };

// Modal Styles
const modalOverlay = {
  position: "fixed",
  top: 0, left: 0, right: 0, bottom: 0,
  background: "rgba(0,0,0,0.6)",
  backdropFilter: "blur(6px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000
};

const modalContainer = {
  background: "#fff",
  padding: "35px",
  borderRadius: "24px",
  width: "450px",
  boxShadow: "0 25px 50px rgba(0,0,0,0.2)"
};

const modalHeader = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" };

const labelStyle = { display: "block", marginBottom: "8px", fontWeight: "600", color: "#2d3436", fontSize: "14px" };

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "20px",
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box"
};

const modalActions = { display: "flex", gap: "12px", marginTop: "10px" };

const cancelBtn = {
  flex: 1,
  padding: "14px",
  background: "#f1f5f9",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "bold",
  color: "#64748b"
};

const submitBtnForm = {
  flex: 2,
  padding: "14px",
  background: "linear-gradient(90deg, #800000, #1e3a8a)",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "16px"
};

export default RequestManagement;