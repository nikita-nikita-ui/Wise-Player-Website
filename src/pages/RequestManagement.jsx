import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCopyOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";
import { activationRequest } from "../auth/ativationRequest";
import { submitRequest, ActivationplanRequest } from "../auth/activationRequest";
import { formatDate } from "../auth/utilfunction";

function RequestManagement() {
  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newRequest, setNewRequest] = useState({
    deviceId: "",
    planName: "ANNUAL",
  });
  const [tiers, setTiers] = useState([])
  const [filter, setFilter] = useState("All");
  const [apiError, setApiError] = useState("");
  const { t } = useTranslation();
  // ✅ Fetch Requests
  const fetchRequests = async () => {
    try {
      const response = await activationRequest();
      const data = response?.data || [];

      setRequests(
        data?.content?.map((item) => ({
          id: item.id,
          status: item?.status,
          createdAt: formatDate(item.createdAt),
          resellerId: item?.resellerId,
          deviceId: item?.deviceId,
          planName: item?.planName,
          creditsUsed: item?.creditsUsed,
        })),
      );
    } catch (err) {
      console.error(err);
    }
  };
  const fetchPlan = async () => {
    const response = await ActivationplanRequest();
    const names = response?.map(item => item.name);

    console.log(names); // ["ANNUAL"]

    setTiers(names);


  }

  useEffect(() => {
    fetchRequests();
    fetchPlan()
  }, []);

  // ✅ Copy
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    try {
      const response = await submitRequest(newRequest);
      console.log(response);

      if (response.success == false) {
        setApiError(response?.message || "Something went wrong");
        return;
      }

      // ✅ success
      setShowModal(false);
      setNewRequest({ deviceId: "", planName: "" });
      fetchRequests();
    } catch (error) {
      setApiError(error?.response?.data?.message || "Something went wrong");
    }
  };

  // ✅ Filter
  const filteredRequests =
    filter === "All"
      ? requests
      : requests.filter((r) => r.status === filter.toUpperCase());

  // const tiers = [
  //   { planName: "ANNUAL" },
  //   { planName: "ANNUAL" },
  //   { planName: "LIFETIME" },
  //   { planName: "MONTHLY" },
  // ];
  const maroonMain = "#800000";

  return (
    <div style={{ padding: "20px" }}>
      {/* Header */}
      <div style={header}>
        <h3 className="fw-bold m-0" style={{ color: maroonMain }}>
          {t("subreseller_panel")}
        </h3>
        <button
          style={primaryBtn}
          onClick={() => setShowModal(true)}
          className="flex flex-row items-center space-x-3 gap-2"
        >
          <Plus size={16} /> {t("new_request")}
        </button>
      </div>

      {/* Filters */}
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
            {t(tab)}
          </button>
        ))}
      </div>

      {/* ✅ SINGLE TABLE */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>{t("device_id")}</th>
            <th>{t("reseller_id")}</th>
            <th>{t("plan_name")}</th>
            <th>{t("credits_used")}</th>
            <th>{t("created_at")}</th>
            <th>{t("status")}</th>
          </tr>
        </thead>

        <tbody>
          {filteredRequests?.length > 0 ? (
            filteredRequests?.map((req) => (
              <tr key={req.id}>
                <td>
                  {/* Device ID */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                    className="flex"
                  >
                    <span
                      style={{
                        maxWidth: "120px",
                        display: "inline-block",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        cursor: "pointer",
                      }}
                      title={req.deviceId} // 👈 full value on hover
                    >
                      {req.deviceId}
                    </span>

                    <button onClick={() => handleCopy(req.resellerId)}>
                      <IoCopyOutline />
                    </button>
                  </div>
                </td>
                <td>
                  {/* Reseller ID */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      marginTop: "4px",
                    }}
                  >
                    <span
                      style={{
                        maxWidth: "120px",
                        display: "inline-block",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        cursor: "pointer",
                      }}
                      title={req.resellerId}
                    >
                      {req.resellerId}
                    </span>

                    <button onClick={() => handleCopy(req.resellerId)}>
                      <IoCopyOutline />
                    </button>
                  </div>
                </td>

                <td>{req.planName}</td>

                <td>{req.creditsUsed ?? "N/A"}</td>

                <td>{req.createdAt}</td>

                <td>
                  {req.status === "PENDING" && (
                    <span style={{ color: "orange" }}>{t("pending")}</span>
                  )}
                  {req.status === "APPROVED" && (
                    <span style={{ color: "green" }}>{t("approved")}</span>
                  )}
                  {req.status === "REJECTED" && (
                    <span style={{ color: "red" }}>{t("rejected")}</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <>
              <tr className="w-full ">
                <td colSpan="6" className="py-6">
                  <div className="w-full flex justify-center items-center text-gray-500">
                    {t("no_devices")}
                  </div>
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <div style={overlay}>
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              exit={{ y: 50 }}
              style={modal}
              className="fixed ml-[13%]"
            >
              <h3 className="text-2xl text-red-500 font-semibold">
                {t("submit_request")}
              </h3>

              {apiError && <p style={errorText}>{apiError}</p>}

              <form onSubmit={handleSubmit}>
                <input
                  placeholder={t("device_id")}
                  value={newRequest.deviceId}
                  onChange={(e) =>
                    setNewRequest({
                      ...newRequest,
                      deviceId: e.target.value,
                    })
                  }
                  required
                  className="border border-gray-400"
                  style={input}
                />

                <select
                  value={newRequest.planName}
                  onChange={(e) =>
                    setNewRequest({
                      ...newRequest,
                      planName: e.target.value,
                    })
                  }
                  required
                  className="border border-gray-400"
                  style={input}
                >
                  <option value="">{t("select_plan")}</option>                  {tiers.map((t, i) => (
                    <option key={i} value={t.planName}>
                      {t}
                    </option>
                  ))}
                </select>

                <div
                  style={{ marginTop: "12px", display: "flex", gap: "10px" }}
                >
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      ...primaryBtn,
                    }}
                  >{t("submit")}         </button>

                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    style={{
                      flex: 1,
                      background: "#e5e7eb",
                      borderRadius: "8px",
                      padding: "8px",
                      cursor: "pointer",
                    }}
                  >
                    {t("cancel")}
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

/* Styles */
const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const primaryBtn = {
  background: "#800000",
  color: "#fff",
  padding: "8px 14px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const cancelBtn = {
  marginLeft: "10px",
  padding: "8px 14px",
};

const filterBtn = {
  marginRight: "10px",
  padding: "6px 12px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
};

const copyBtn = {
  padding: "4px 8px",
  cursor: "pointer",
};

const errorText = {
  color: "red",
  fontSize: "14px",
};

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
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
  marginBottom: "10px",
  marginTop: "10px",
};

export default RequestManagement;
