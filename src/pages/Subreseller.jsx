import React, { useState } from "react";
import { UserPlus, Eye, Send, CheckCircle, Clock, AlertCircle, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";

const SubresellerDashboard = () => {
    const maroonMain = "#800000";

    // Mock Data for Users
    const [users, setUsers] = useState([
        { id: "USR-001", name: "Amit Sharma", email: "amit@example.com", plan: "Yearly Premium", status: "Active", requestStatus: "Approved" },
        { id: "USR-002", name: "Suresh Kumar", email: "suresh@example.com", plan: "Monthly Basic", status: "Inactive", requestStatus: "Pending" },
        { id: "USR-003", name: "Priya Singh", email: "priya@example.com", plan: "Quarterly Pro", status: "Inactive", requestStatus: "Not Submitted" },
        { id: "USR-004", name: "Rahul Verma", email: "rahul@example.com", plan: "Yearly Premium", status: "Active", requestStatus: "Approved" },
        { id: "USR-005", name: "Anjali Gupta", email: "anjali@example.com", plan: "Monthly Basic", status: "Inactive", requestStatus: "Rejected" },
    ]);

    // Status Badge Helper
    const getStatusBadge = (status) => {
        switch (status) {
            case "Approved": return <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-2 rounded-pill"><CheckCircle size={14} className="me-1"/> Approved</span>;
            case "Pending": return <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle px-3 py-2 rounded-pill"><Clock size={14} className="me-1"/> Pending Approval</span>;
            case "Rejected": return <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-3 py-2 rounded-pill"><AlertCircle size={14} className="me-1"/> Rejected</span>;
            default: return <span className="badge bg-secondary-subtle text-secondary border border-secondary-subtle px-3 py-2 rounded-pill">No Request</span>;
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="container-fluid p-4 bg-light min-vh-100"
        >
            {/* Header Section */}
            <div className="row mb-4 align-items-center">
                <div className="col-md-6">
                    <h3 className="fw-bold m-0" style={{ color: maroonMain }}>Subreseller Panel</h3>
                    <p className="text-muted">Manage your end-users and activation requests</p>
                </div>
                <div className="col-md-6 text-md-end">
                    {/* POINT 1: CREATE END USERS BUTTON */}
                    <button 
                        className="btn shadow-sm px-4 py-2 text-white" 
                        style={{ backgroundColor: maroonMain, borderRadius: "10px" }}
                        data-bs-toggle="modal" data-bs-target="#createUserModal"
                    >
                        <UserPlus size={20} className="me-2" />
                        Create New End-User
                    </button>
                </div>
            </div>

            {/* Stats Cards (Quick Tracking) */}
            <div className="row mb-4">
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm p-3 rounded-4">
                        <small className="text-muted fw-bold">TOTAL USERS</small>
                        <h3 className="fw-bold mt-1">248</h3>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm p-3 rounded-4 border-start border-warning border-4">
                        <small className="text-muted fw-bold">PENDING REQUESTS</small>
                        <h3 className="fw-bold mt-1 text-warning">12</h3>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm p-3 rounded-4 border-start border-success border-4">
                        <small className="text-muted fw-bold">ACTIVE USERS</small>
                        <h3 className="fw-bold mt-1 text-success">230</h3>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm p-3 rounded-4 border-start border-danger border-4">
                        <small className="text-muted fw-bold">REJECTED</small>
                        <h3 className="fw-bold mt-1 text-danger">6</h3>
                    </div>
                </div>
            </div>

            {/* Main Content Card */}
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden w-100">
                <div className="card-header bg-white border-0 p-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="fw-bold m-0">User Directory & Status Tracking</h5>
                        <div className="d-flex gap-2">
                            <div className="input-group input-group-sm" style={{ width: "250px" }}>
                                <span className="input-group-text bg-white border-end-0"><Search size={16}/></span>
                                <input type="text" className="form-control border-start-0" placeholder="Search users..." />
                            </div>
                            <button className="btn btn-outline-secondary btn-sm"><Filter size={16}/></button>
                        </div>
                    </div>
                </div>

                <div className="card-body p-0">
                    <div className="table-responsive">
                        {/* POINT 2: VIEW CREATED USERS TABLE */}
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="ps-4 py-3">USER DETAILS</th>
                                    <th className="py-3">SUBSCRIPTION PLAN</th>
                                    {/* POINT 4: TRACK REQUEST STATUS */}
                                    <th className="py-3">ACTIVATION STATUS</th>
                                    <th className="py-3 text-center">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="ps-4 py-3">
                                            <div className="fw-bold">{user.name}</div>
                                            <div className="small text-muted">{user.email} | {user.id}</div>
                                        </td>
                                        <td className="py-3 text-secondary fw-semibold">
                                            {user.plan}
                                        </td>
                                        <td className="py-3">
                                            {getStatusBadge(user.requestStatus)}
                                        </td>
                                        <td className="py-3">
                                            <div className="d-flex justify-content-center gap-2">
                                                <button className="btn btn-sm btn-light border shadow-sm rounded-3 p-2" title="View Details">
                                                    <Eye size={18} />
                                                </button>
                                                
                                                {/* POINT 3: SUBMIT ACTIVATION REQUEST */}
                                                {user.requestStatus !== "Approved" && (
                                                    <button 
                                                        className="btn btn-sm text-white shadow-sm rounded-3 p-2 d-flex align-items-center" 
                                                        style={{ backgroundColor: "#1e293b" }}
                                                        title="Submit Activation"
                                                    >
                                                        <Send size={16} className="me-1" /> Request
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* CREATE USER MODAL (Point 1 implementation) */}
            <div className="modal fade" id="createUserModal" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content rounded-4 border-0 shadow">
                        <div className="modal-header border-0 p-4">
                            <h5 className="modal-title fw-bold" style={{ color: maroonMain }}>Add New End-User</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body p-4 pt-0">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label small fw-bold">Full Name</label>
                                    <input type="text" className="form-control rounded-3" placeholder="Enter user's name" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label small fw-bold">Email Address</label>
                                    <input type="email" className="form-control rounded-3" placeholder="user@example.com" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label small fw-bold">Select Plan Type</label>
                                    <select className="form-select rounded-3">
                                        <option>Monthly Basic</option>
                                        <option>Quarterly Pro</option>
                                        <option>Yearly Premium</option>
                                    </select>
                                </div>
                                <button 
                                    type="submit" 
                                    className="btn w-100 text-white py-2 fw-bold mt-2" 
                                    style={{ backgroundColor: maroonMain, borderRadius: "10px" }}
                                >
                                    Save & Create User
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default SubresellerDashboard;