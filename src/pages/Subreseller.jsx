import React, { useEffect, useState } from "react";
import { UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import { createReseller, getAllResellerInfo } from "../auth/reSeller";
import { formatDate } from "../auth/utilfunction";
import TransferModal from "../component/TransferModal";
import { DashbaordOverview } from "../auth/dashboard";
import { useTranslation } from "react-i18next"; // ✅ ADD THIS

const SubresellerDashboard = () => {
  const { t } = useTranslation(); // ✅ INIT

  const [transferModal, setTransferModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [openModel, setOpenModel] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullName: "",
  });

  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  const [dashboardData, setDashboardData] = useState({
    credits: 0,
    pendingRequest: 0,
  });

  const maroonMain = "#800000";

  const handleOpenTransfer = (user) => {
    setSelectedUser(user);
    setTransferModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await createReseller(formData);

    if (res.success) {
      setOpenModel(false);
      setFormData({ username: "", password: "", fullName: "" });
      fetchdata();
    } else {
      setError(res.message);
    }
  };

  const fetchdata = async () => {
    try {
      const res = await getAllResellerInfo();
      const usersData = res?.data?.content ?? [];

      const dashRes = await DashbaordOverview();

      setUsers(Array.isArray(usersData) ? usersData : []);

      setDashboardData({
        credits: dashRes?.data?.credits ?? 0,
        pendingRequest: dashRes?.data?.pendingRequests ?? 0,
      });

      setCurrentPage(1);
    } catch (err) {
      console.error(err);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const totalPages = Math.ceil((users?.length || 0) / usersPerPage);
  const safePage = Math.min(currentPage, totalPages || 1);

  const indexOfLast = safePage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = (users || []).slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    if (currentPage !== safePage) {
      setCurrentPage(safePage);
    }
  }, [users, totalPages]);

  const getStatusBadge = (active) => (
    <span
      className={`px-3 py-1 text-xs fw-semibold rounded-pill ${
        active
          ? "bg-success-subtle text-success"
          : "bg-danger-subtle text-danger"
      }`}
    >
      {active ? t("active") : t("inactive")} {/* ✅ */}
    </span>
  );

  return (
    <div className="container-fluid p-3 p-md-4 bg-light min-vh-100">

      {/* HEADER */}
      <div className="row mb-4 align-items-center">
        <div className="col-md-6">
          <h3 className="fw-bold m-0" style={{ color: maroonMain }}>
            {t("subreseller_management")}
          </h3>
          <p className="text-muted">
            {t("manage_subreseller")}
          </p>
        </div>

        <div className="col-md-6 text-md-end mt-2 mt-md-0">
          <button
            className="btn shadow-sm px-4 py-2 text-white d-inline-flex align-items-center gap-2"
            style={{ backgroundColor: maroonMain, borderRadius: "10px" }}
            onClick={() => setOpenModel(true)}
          >
            <UserPlus size={18} />
            <span>{t("create_subreseller")}</span>
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="shadow-sm rounded-4 bg-white">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0 text-center">

            <thead className="table-light">
              <tr>
                <th className="text-start ps-4">{t("user_details")}</th>
                <th>{t("email")}</th>
                <th>{t("status")}</th>
                <th>{t("created")}</th>
                <th>{t("updated")}</th>
                <th>{t("coin")}</th>
                <th>{t("action")}</th>
              </tr>
            </thead>

            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <tr key={user.id || user.username}>
                    <td className="text-start ps-4">
                      <div className="fw-bold">{user.fullName}</div>
                      <div className="small text-muted">
                        {t("creator_id")}:{" "}
                        <span className="text-primary">
                          {user.creatorId}
                        </span>
                      </div>
                    </td>

                    <td className="fw-semibold">
                      {user.email || t("no_email")}
                    </td>

                    <td>{getStatusBadge(user.active)}</td>

                    <td>{formatDate(user.createdAt)}</td>
                    <td>{formatDate(user.updatedAt)}</td>

                    <td className="fw-bold text-warning">
                      {user.credits ?? 0}
                    </td>

                    <td>
                      <button
                        className="btn btn-sm text-white"
                        style={{
                          backgroundColor: maroonMain,
                          borderRadius: "8px",
                        }}
                        onClick={() => handleOpenTransfer(user)}
                      >
                        {t("transfer")}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-4">
                    {t("no_data")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center align-items-center gap-2 p-3 flex-wrap">
            <button
              className="btn btn-sm btn-outline-dark"
              disabled={safePage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              {t("prev")}
            </button>

            <span className="px-2">
              {t("page")} {safePage} {t("of")} {totalPages}
            </span>

            <button
              className="btn btn-sm btn-outline-dark"
              disabled={safePage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              {t("next")}
            </button>
          </div>
        )}
      </div>

      {/* MODAL */}
      {openModel && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/80 z-50">
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded-4 shadow w-100"
            style={{ maxWidth: "400px" }}
          >
            <h5 className="fw-bold d-flex justify-content-between">
              {t("create_subreseller")}
              <MdClose onClick={() => setOpenModel(false)} />
            </h5>

            {error && <div className="text-danger">{error}</div>}

            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder={t("username")}
              className="form-control my-2"
            />

            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t("password")}
              className="form-control my-2"
            />

            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder={t("full_name")}
              className="form-control my-2"
            />

            <button className="btn btn-primary w-100 mt-2">
              {t("submit")}
            </button>
          </motion.form>
        </div>
      )}

      {/* TRANSFER */}
      <TransferModal
        open={transferModal}
        onClose={() => setTransferModal(false)}
        selectedUser={selectedUser}
        availableCredits={dashboardData?.credits}
        refreshData={fetchdata}
      />
    </div>
  );
};

export default SubresellerDashboard;