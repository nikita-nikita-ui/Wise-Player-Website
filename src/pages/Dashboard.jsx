import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";
import UserManagement from "./UserManagement";
import RequestManagement from "./RequestManagement";
import SubReseller from "./Subreseller";
import { Users, CheckCircle, Clock } from "lucide-react";
import { BsCoin } from "react-icons/bs";
import { formatDate } from "../auth/utilfunction";
import { motion, AnimatePresence } from "framer-motion";
import { useDashboard } from "../context/dashboardContext";

const Dashboard = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("overview");
  const { dashboard, refetchDashboard } = useDashboard();

  const maroonMain = "#800000";
  const maroonLight = "#fdf2f2";

  const stats = [
    {
      title: t("total_users"),
      count: `${dashboard?.stats?.totalUsers}`,
      icon: <Users size={22} />,
      trend: "+12%",
    },
    {
      title: t("active_subs"),
      count: `${dashboard?.stats?.activeSub}`,
      icon: <CheckCircle size={22} />,
      trend: "+5%",
    },
    {
      title: t("pending_req"),
      count: `${dashboard?.stats?.pending}`,
      icon: <Clock size={22} />,
      trend: "-2%",
    },
    {
      title: t("total_coins"),
      count: `${dashboard?.stats?.creditCoin || 0}`,
      icon: <BsCoin size={22} />,
      trend: "+18%",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  useEffect(() => {
    refetchDashboard();
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div
      className="container-fluid p-0"
      style={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="w-100" style={{ minWidth: 0 }}>
        
        {/* HEADER */}
        <header className="bg-white border-bottom px-3 px-md-4 py-3 d-flex flex-wrap justify-content-between align-items-center gap-2 sticky-top">
          <h5
            className="fw-bold text-dark m-0 text-uppercase"
            style={{ fontSize: "0.9rem", letterSpacing: "1px" }}
          >
            {t("panel")} /{" "}
            <span style={{ color: maroonMain }}>{t(activeTab)}</span>
          </h5>

          <div className="d-flex align-items-center gap-3">
            <div className="text-end d-none d-sm-block">
              <p className="m-0 fw-bold small">{t("admin_user")}</p>
              <p className="m-0 text-success small d-flex align-items-center justify-content-end gap-1">
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "green",
                    borderRadius: "50%",
                  }}
                ></span>
                {t("online")}
              </p>
            </div>

            <div
              className="rounded-circle shadow-sm border border-white"
              style={{ width: "42px", height: "42px", background: maroonMain }}
            ></div>
          </div>
        </header>

        {/* MAIN */}
        <main className="p-3 p-md-4">
          <AnimatePresence mode="wait">
            
            {/* OVERVIEW */}
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {/* STATS */}
                <div className="row g-3 g-md-4 mb-4">
                  {stats.map((item, i) => (
                    <div className="col-12 col-sm-6 col-xl-3" key={i}>
                      <div className="card border-0 shadow-sm p-3 rounded-4 h-100 bg-white">
                        <div className="d-flex justify-content-between">
                          <div
                            className="p-2 rounded-3"
                            style={{
                              background: maroonLight,
                              color: maroonMain,
                            }}
                          >
                            {item.icon}
                          </div>

                          <span
                            className={`small fw-bold ${
                              item.trend.startsWith("+")
                                ? "text-success"
                                : "text-danger"
                            }`}
                          >
                            {item.trend}
                          </span>
                        </div>

                        <h3 className="mt-3 mb-1 fw-bold">{item.count}</h3>
                        <p className="text-muted small mb-0 fw-medium">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* TABLE */}
                <div className="bg-white rounded-xl shadow border">
                  <div style={{ overflowX: "auto" }}>
                    <table className="min-w-full text-sm">
                      <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                        <tr>
                          <th className="px-4 py-3 text-center">
                            {t("device_id")}
                          </th>
                          <th className="px-4 py-3 text-center">
                            {t("status")}
                          </th>
                          <th className="px-4 py-3 text-center">
                            {t("subscription")}
                          </th>
                          <th className="px-4 py-3 text-center">
                            {t("registered")}
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {dashboard?.devices?.length > 0 ? (
                          dashboard.devices.slice(0, 8).map((item) => (
                            <tr
                              key={item.deviceId}
                              className="border-top text-center"
                            >
                              <td className="px-3 py-3">
                                <div className="d-flex justify-content-center align-items-center gap-2">
                                  <span>
                                    {item.deviceId?.slice(0, 8)}...
                                  </span>
                                  <button
                                    onClick={() =>
                                      copyToClipboard(item.deviceId)
                                    }
                                    className="text-blue-500 text-xs border px-2 py-1 rounded"
                                  >
                                    Copy
                                  </button>
                                </div>
                              </td>

                              <td className="px-3 py-3">
                                {item.deviceStatus}
                              </td>

                              <td className="px-3 py-3">
                                {item.subscriptionType}
                              </td>

                              <td className="px-3 py-3">
                                {formatDate(item.registeredAt)}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" className="text-center py-4">
                              No devices found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* OTHER TABS */}
            {activeTab === "users" && <UserManagement />}
            {activeTab === "requests" && <RequestManagement />}
            {activeTab === "subreseller" && <SubReseller />}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;