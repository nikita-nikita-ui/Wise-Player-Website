

import React from "react";
import { UserPlus, Eye, Power } from "lucide-react";
import { motion } from "framer-motion";

const UserManagement = () => {
    // Colors matching your UI
    const maroonMain = "#800000";
    const darkBg = "#1e293b"; // Dark color for action buttons

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="container-fluid py-4 w-100" // container-fluid ensures full width
        >
            <div
                className="card border-0 shadow-sm rounded-4 overflow-hidden w-100"
                style={{ borderTop: `5px solid ${maroonMain}` }} // Adding the red top bar from image
            >
                <div className="card-body p-4">

                    {/* Header Section */}
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                        <div>
                            <h4 className="fw-bold m-0" style={{ color: maroonMain }}>
                                User Management
                            </h4>
                        </div>

                        <button
                            className="btn text-white px-4 py-2 d-flex align-items-center justify-content-center"
                            style={{
                                backgroundColor: maroonMain,
                                borderRadius: "10px",
                                fontWeight: "600",
                                width: "fit-content"
                            }}
                        >
                            <UserPlus size={20} className="me-2" />
                            Add New User
                        </button>
                    </div>

                    {/* Table Section */}
                    <div className="table-responsive">
                        <table className="table align-middle border-0 w-100">                            <thead>
                            <tr className="text-muted border-bottom">
                                <th className="py-3 ps-0" style={{ fontSize: "0.9rem", letterSpacing: "0.5px" }}>DETAILS</th>
                                <th className="py-3" style={{ fontSize: "0.9rem", letterSpacing: "0.5px" }}>PLAN TYPE</th>
                                <th className="py-3" style={{ fontSize: "0.9rem", letterSpacing: "0.5px" }}>STATUS</th>
                                <th className="py-3 text-center" style={{ fontSize: "0.9rem", letterSpacing: "0.5px" }}>ACTIONS</th>
                            </tr>
                        </thead>

                            <tbody className="border-0">
                                {[1, 2, 3, 4, 5].map((u) => (
                                    <tr key={u} className="border-bottom">
                                        <td className="py-3 ps-0">
                                            <div className="fw-bold text-dark mb-0" style={{ fontSize: "1.1rem" }}>.00{u}</div>
                                            <div className="text-muted" style={{ fontSize: "0.9rem" }}>
                                                user{u}@example.com
                                            </div>
                                        </td>

                                        <td className="py-3">
                                            <span
                                                className="badge fw-normal px-3 py-2 border text-dark bg-white"
                                                style={{ borderRadius: "6px", fontSize: "0.85rem" }}
                                            >
                                                Yearly Premium
                                            </span>
                                        </td>

                                        <td className="py-3">
                                            <span
                                                className="badge px-3 py-2"
                                                style={{
                                                    backgroundColor: "#e8f5e9",
                                                    color: "#2e7d32",
                                                    borderRadius: "20px",
                                                    fontSize: "0.85rem"
                                                }}
                                            >
                                                Active
                                            </span>
                                        </td>

                                        <td className="py-3">
                                            <div className="d-flex justify-content-center gap-2">
                                                {/* Dark Style Buttons matching your screenshot */}
                                                <button
                                                    className="btn btn-sm d-flex align-items-center justify-content-center shadow-sm"
                                                    style={{ backgroundColor: "#1e293b", color: "white", padding: "10px", borderRadius: "8px" }}
                                                >
                                                    <Eye size={18} />
                                                </button>

                                                <button
                                                    className="btn btn-sm d-flex align-items-center justify-content-center shadow-sm"
                                                    style={{ backgroundColor: "#1e293b", color: "white", padding: "10px", borderRadius: "8px" }}
                                                >
                                                    <Power size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default UserManagement;