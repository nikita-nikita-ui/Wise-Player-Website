import React, { useEffect, useState } from "react";
import {
  UserPlus,
  Eye,
  Send,
  CheckCircle,
  Clock,
  AlertCircle,
  Search,
  Filter,
} from "lucide-react";
import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import { createReseller, getAllResellerInfo } from "../auth/reSeller";
import { formatDate } from "../auth/utilfunction";

const SubresellerDashboard = () => {
  const [openModel, setOpenModel] = useState(false);
  console.log("open Model : ", openModel);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullName: "",
  });
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    totalUser: "",
    pendingRequest: "",
    activeuser: "",
    Rejected: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await createReseller(formData);

    if (res.success) {
      console.log("✅ Reseller Created:", res.data);
      setOpenModel(false);
      setFormData({
        username: "",
        password: "",
        fullName: "",
      });
    } else {
      console.error("❌ Error:", res.message);
      setError(res.message);
    }
  };

  useEffect(() => {
    const fetchdata = async () => {
      const res = await getAllResellerInfo();
      console.log(res.data);
      setUsers(res?.data);
      setDashboardData((prev) => ({
        ...prev,
        totalUser: res?.data?.length,
        activeuser:res?.data?.filter(
        (user) => user?.active === true,
      ).length
      }));
     
    };
    fetchdata();
  }, []);

  const maroonMain = "#800000";

  // Mock Data for Users
  //   const [users, setUsers] = useState([
  //     {
  //       id: "USR-001",
  //       name: "Amit Sharma",
  //       email: "amit@example.com",
  //       plan: "Yearly Premium",
  //       status: "Active",
  //       requestStatus: "Approved",
  //     },
  //     {
  //       id: "USR-002",
  //       name: "Suresh Kumar",
  //       email: "suresh@example.com",
  //       plan: "Monthly Basic",
  //       status: "Inactive",
  //       requestStatus: "Pending",
  //     },
  //     {
  //       id: "USR-003",
  //       name: "Priya Singh",
  //       email: "priya@example.com",
  //       plan: "Quarterly Pro",
  //       status: "Inactive",
  //       requestStatus: "Not Submitted",
  //     },
  //     {
  //       id: "USR-004",
  //       name: "Rahul Verma",
  //       email: "rahul@example.com",
  //       plan: "Yearly Premium",
  //       status: "Active",
  //       requestStatus: "Approved",
  //     },
  //     {
  //       id: "USR-005",
  //       name: "Anjali Gupta",
  //       email: "anjali@example.com",
  //       plan: "Monthly Basic",
  //       status: "Inactive",
  //       requestStatus: "Rejected",
  //     },
  //   ]);

  // Status Badge Helper
  const getStatusBadge = (active) => {
    return active ? (
      <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
        Active
      </span>
    ) : (
      <span className="px-3 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full">
        Inactive
      </span>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container-fluid w-full p-4 bg-light min-vh-100"
    >
      {/* Header Section */}
      <div className="row mb-4 align-items-center">
        <div className="col-md-6">
          <h3 className="fw-bold m-0" style={{ color: maroonMain }}>
            Subreseller Panel
          </h3>
          <p className="text-muted">
            Manage your end-users and activation requests
          </p>
        </div>
        <div className="col-md-6 text-md-end">
          {/* POINT 1: CREATE END USERS BUTTON */}
          <button
            className="btn shadow-sm px-4 py-2 text-white"
            style={{ backgroundColor: maroonMain, borderRadius: "10px" }}
            data-bs-toggle="modal"
            data-bs-target="#createUserModal"
            onClick={() => setOpenModel(true)}
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
            <h3 className="fw-bold mt-1">{dashboardData?.totalUser}</h3>
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
            <h3 className="fw-bold mt-1 text-success">{dashboardData?.activeuser}</h3>
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
      <div className=" border-0 shadow-sm  rounded-4  w-full">
        <div className="card-header bg-white border-0 p-4">
          {/* <div className="d-flex justify-content-between align-items-center">
            <h5 className="fw-bold m-0">User Directory & Status Tracking</h5>
            <div className="d-flex gap-2">
              <div
                className="input-group input-group-sm"
                style={{ width: "250px" }}
              >
                <span className="input-group-text bg-white border-end-0">
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search users..."
                />
              </div>
              <button className="btn btn-outline-secondary btn-sm">
                <Filter size={16} />
              </button>
            </div>
          </div> */}
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            {/* POINT 2: VIEW CREATED USERS TABLE */}
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 text-center">
                <thead className="table-light">
                  <tr>
                    <th className="text-start ps-4">User Details</th>
                    <th>Email</th>
                    <th>Activation Status</th>
                    <th>Created At</th>
                    <th>Last Update</th>
                    <th>Coin</th>
                  </tr>
                </thead>

                <tbody>
                  {users?.map((user) => (
                    <tr key={user.id}>
                      {/* USER DETAILS */}
                      <td className="text-start ps-4">
                        <div className="fw-bold">{user.fullName}</div>
                        <div className="small text-muted">
                          parentId:{" "}
                          <span className="text-red-400"> {user.parentId}</span>{" "}
                          <br />
                          creatorId:{" "}
                          <span className="text-blue-400">
                            {user.creatorId}
                          </span>
                        </div>
                      </td>

                      {/* EMAIL */}
                      <td className="text-secondary fw-semibold">
                        {user?.email || "No Email Available"}
                      </td>

                      {/* STATUS */}
                      <td>{getStatusBadge(user.active)}</td>

                      {/* CREATED */}
                      <td>{formatDate(user?.createdAt)}</td>

                      {/* UPDATED */}
                      <td>{formatDate(user?.updatedAt)}</td>

                      {/* COIN */}
                      <td className="fw-bold text-yellow-400">
                        {user?.credits ?? 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* CREATE USER MODAL (Point 1 implementation) */}
      <div className="modal fade" id="createUserModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-4 border-0 shadow">
            <div className="modal-header border-0 p-4">
              <h5 className="modal-title fw-bold" style={{ color: maroonMain }}>
                Add New End-User
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body p-4 pt-0">
              <form>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Full Name</label>
                  <input
                    type="text"
                    className="form-control rounded-3"
                    placeholder="Enter user's name"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control rounded-3"
                    placeholder="user@example.com"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold">
                    Select Plan Type
                  </label>
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
      {openModel && (
        <>
          <div className="fixed inset-0 flex justify-center items-center bg-black/80 backdrop-blur-sm z-50">
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white/90 backdrop-blur-md px-4 py-4 rounded-2xl shadow-2xl w-[500px]"
            >
              <motion.h2 className="text-xl font-bold mb-4  flex justify-between">
                <span>Create Sub-Reseller</span>
                <span
                  className="cursor-pointer hover:text-red-500"
                  onClick={() => setOpenModel(false)}
                >
                  <MdClose />
                </span>
              </motion.h2>
              <div>{error && <div style={{ color: "red" }}>{error}</div>}</div>

              {/* Username */}
              <motion.input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full p-2 mb-3 border rounded-lg outline-none focus:outline-none focus:ring-0 hover:border-transparent"
              />

              {/* Password */}
              <motion.input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-2 mb-3 border rounded-lg outline-none focus:outline-none focus:ring-0 hover:border-transparent"
              />

              {/* Full Name */}
              <motion.input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-2 mb-3 border rounded-lg outline-none focus:outline-none focus:ring-0 hover:border-transparent"
              />

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-lg"
              >
                Submit
              </motion.button>
            </motion.form>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default SubresellerDashboard;
