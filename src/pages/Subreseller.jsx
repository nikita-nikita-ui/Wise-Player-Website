import React, { useEffect, useState } from "react";
import { UserPlus, Pencil } from "lucide-react";
import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import {
  createReseller,
  getAllResellerInfo,
  updateSubReseller,
} from "../auth/reSeller";
import { formatDate } from "../auth/utilfunction";
import TransferModal from "../component/TransferModal";
import { useTranslation } from "react-i18next";
import { useDashboard } from "../context/dashboardContext";

const SubresellerDashboard = () => {
  const { t } = useTranslation();
  const { dashboard, refetchDashboard } = useDashboard();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [openModel, setOpenModel] = useState(false);
  const [transferModal, setTransferModal] = useState(false);

  // EDIT STATE
  const [editModal, setEditModal] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [editData, setEditData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullName: "",
  });

  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  const maroonMain = "#800000";

  // FETCH
  const fetchdata = async () => {
    try {
      const res = await getAllResellerInfo();
      const usersData = res?.data?.content ?? [];
      setUsers(Array.isArray(usersData) ? usersData : []);
      setCurrentPage(1);
    } catch (err) {
      console.error(err);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  // CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createReseller(formData);

    if (res.success) {
      setOpenModel(false);
      setFormData({ username: "", password: "", fullName: "" });
      await fetchdata();
      await refetchDashboard();
    } else {
      setError(res.message);
    }
  };

  // EDIT OPEN
  const handleEditOpen = (user) => {
    setEditUserId(user.id);
    setEditData({
      fullName: user.fullName || "",
      email: user.email || "",
      password: "",
    });
    setEditModal(true);
  };

  // UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();

    const payload = {
      fullName: editData.fullName,
      email: editData.email,
    };

    if (editData.password) payload.password = editData.password;

    const res = await updateSubReseller(editUserId, payload);

    if (res.success) {
      setEditModal(false);
      await fetchdata();
    } else {
      setError(res.message);
    }
  };

  // TRANSFER
  const handleOpenTransfer = (user) => {
    setSelectedUser({
      fullName: user.fullName,
      credits: dashboard?.stats?.creditCoin ?? 0,
      id: user.id,
      subResellerCredits: user.credits,
    });
    setTransferModal(true);
  };

  // PAGINATION
  const totalPages = Math.ceil(users.length / usersPerPage);
  const safePage = Math.min(currentPage, totalPages || 1);
  const indexOfLast = safePage * usersPerPage;
  const currentUsers = users.slice(indexOfLast - usersPerPage, indexOfLast);

  const getStatusBadge = (active) => (
    <span
      className={`px-3 py-1 rounded-pill small fw-semibold ${active
          ? "bg-success-subtle text-success"
          : "bg-danger-subtle text-danger"
        }`}
    >
      {active ? t("active") : t("inactive")}
    </span>
  );

  return (
    <div className="container-fluid p-3 bg-light min-vh-100">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
  <div>
    <h4 className="fw-bold mb-1" style={{ color: maroonMain }}>
      {t("subreseller_management")}
    </h4>
    <p className="text-muted m-0 small">
      {t("manage_subreseller")}
    </p>
  </div>

  <div className="d-flex align-items-center">
    <button
      className="btn text-white d-flex align-items-center justify-content-center gap-2"
      style={{
        background: maroonMain,
        borderRadius: "8px",
        height: "40px",
        padding: "0 14px",
        fontSize: "14px",
        lineHeight: "1",
      }}
      onClick={() => setOpenModel(true)}
    >
      <UserPlus size={14} />
      {t("create_subreseller")}
    </button>
  </div>
</div>

      {/* TABLE */}
      <div className="bg-white shadow-sm rounded-4 p-2">
        <table className="table table-hover text-center align-middle mb-0">

          <thead className="table-light">
            <tr>
              <th className="text-start">{t("user_details")}</th>
              <th>{t("status")}</th>
              <th>{t("created")}</th>
              <th>{t("coin")}</th>
              <th>{t("action")}</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td className="text-start">
                  <div className="fw-bold">{user.fullName}</div>
                  <div className="small text-muted">
                    {t("username_label")}:{" "}
                    <span className="text-primary">{user.username}</span>
                  </div>
                  <div className="small text-muted">      
{t("id_label")}: <span className="text-primary">{user.id}</span>
                  </div>
                </td>

                <td>{getStatusBadge(user.active)}</td>
                <td>{formatDate(user.createdAt)}</td>

                <td className="fw-bold text-dark">
                  {user.credits ?? 0}
                </td>

                {/* ✅ FIXED ACTION COLUMN */}
                <td>
  <div className="d-flex justify-content-center align-items-center gap-2">

    {/* TRANSFER */}
    <button
      className="btn text-white d-flex align-items-center justify-content-center gap-1"
      style={{
        backgroundColor: maroonMain,
        borderRadius: "6px",
        height: "35px",
        padding: "0 10px",
        fontSize: "13px",
        minWidth: "80px",
      }}
      onClick={() => handleOpenTransfer(user)}
    >
      <span style={{ fontSize: "12px" }}>💰</span>
      {t("transfer")}
    </button>

    {/* EDIT */}
    <button
      className="btn btn-outline-dark d-flex align-items-center justify-content-center gap-1"
      style={{
        borderRadius: "6px",
        height: "35px",
        padding: "0 10px",
        fontSize: "13px",
        minWidth: "70px",
      }}
      onClick={() => handleEditOpen(user)}
    >
      <Pencil size={12} />
      {t("edit")}
    </button>

  </div>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CREATE MODAL */}
      {openModel && (
        <div className="fixed inset-0 d-flex justify-content-center align-items-center bg-dark bg-opacity-75 z-50">
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded-4 shadow"
            style={{ width: "400px" }}
          >
            <div className="d-flex justify-content-between mb-3">
              <h5>{t("create_subreseller")}</h5>
              <MdClose onClick={() => setOpenModel(false)} />
            </div>

            {error && <div className="text-danger">{error}</div>}

            <input
              className="form-control my-2"
              placeholder={t("username")}
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />

            <input
              className="form-control my-2"
              type="password"
              placeholder={t("password")}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <input
              className="form-control my-2"
              placeholder={t("full_name")}
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />

            <button className="btn btn-primary w-100 mt-2">
              {t("submit")}
            </button>
          </motion.form>
        </div>
      )}

      {/* EDIT MODAL */}
      {editModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.7)", zIndex: 99999 }}>
          <motion.form
            onSubmit={handleUpdate}
            className="bg-white p-4 rounded-4 shadow"
            style={{ width: "400px" }}
          >
            <div className="d-flex justify-content-between mb-3">
              <h5>{t("update")}</h5>
              <MdClose onClick={() => setEditModal(false)} />
            </div>

            <input
              className="form-control my-2"
              value={editData.fullName}
              onChange={(e) =>
                setEditData({ ...editData, fullName: e.target.value })
              }
            />

            {/* <input
              className="form-control my-2"
              value={editData.email}
              onChange={(e) =>
                setEditData({ ...editData, email: e.target.value })
              }
            /> */}

            <input
              className="form-control my-2"
              type="password"
              placeholder={t("password")}
              value={editData.password}
              onChange={(e) =>
                setEditData({ ...editData, password: e.target.value })
              }
            />

            <button className="btn btn-primary w-100 mt-2">
              {t("update")}
            </button>
          </motion.form>
        </div>
      )}

      {/* ✅ CONSISTENT PAGINATION (UserManagement style) */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center gap-3 p-3 flex-wrap">

          <button
            disabled={safePage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="btn btn-sm btn-outline-dark"
          >
           {t("prev")}
          </button>

          <span style={{ fontWeight: "500" }}>
           {t("page_of", { current: safePage, total: totalPages })}
          </span>

          <button
            disabled={safePage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="btn btn-sm btn-outline-dark"
          >
           {t("next")}
          </button>

        </div>
      )}

      {/* TRANSFER */}
      <TransferModal
        open={transferModal}
        onClose={() => setTransferModal(false)}
        selectedUser={selectedUser}
        availableCredits={selectedUser?.credits}
        refreshData={async () => {
          await fetchdata();
          await refetchDashboard();
        }}
      />
    </div>
  );
};

export default SubresellerDashboard;