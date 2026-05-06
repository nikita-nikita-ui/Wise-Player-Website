import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Layers,
  Clock,
  LogOut,
  ShoppingCart,
  Menu,
  X,
  CirclePlus,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

const Sidebar = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userRole } = useAuth();
  const { t } = useTranslation();

  const [showLogoutPopup, setShowLogoutPopup] = useState(false);



  const maroonMain = "#800000";

  const menuItems = [
    { path: "/dashboard", label: t("dashboard"), icon: LayoutDashboard },
    { path: "/users", label: t("device_management"), icon: Users },

    userRole === "RESELLER" && {
      path: "/subreseller",
      label: t("sub_reseller"),
      icon: Layers,
    },

    { path: "/requests", label: t("activation_requests"), icon: Clock },
    { path: "/transition-history", label: t("transaction_history"), icon: CirclePlus },
    { path: "/purchase-credit", label: t("purchase_credit"), icon: ShoppingCart },
    { path: "/logout", label: t("logout"), icon: LogOut },
  ].filter(Boolean);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      {/* MOBILE BUTTON */}
      {mobileOpen && (
  <div
    className="fixed inset-0 bg-black/40 z-[2000] md:hidden"
    onClick={() => setMobileOpen(false)}
  />
)}

<div
  className={`
    fixed top-0 left-0 h-full z-[3000]
    transition-all duration-300
    flex flex-col

    bg-[#800000]

    ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0

    ${collapsed ? "md:w-[90px]" : "md:w-[260px]"}
    w-[260px]
  `}
>

      {/* SIDEBAR */}
      

        {/* HEADER */}
        <div className="d-flex align-items-center justify-content-between px-3 py-3 text-white">
          {!collapsed && (
            <h5 className="m-0 fw-bold" style={{ letterSpacing: "0.5px" }}>
              RESELLER
              <span style={{ color: "#ffc107", marginLeft: 4 }}>HUB</span>
            </h5>
          )}

          <div className={`flex items-center gap-2 ${collapsed ? "justify-center w-full" : ""}`}>
            <Menu
              onClick={() => setCollapsed(!collapsed)}
              style={{ cursor: "pointer" }}
            />

          </div>
        </div>

        {/* MENU */}
        <div className="d-flex flex-column mt-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <div key={item.path} style={{ padding: "4px 10px" }}>
                <button
                  onClick={() => {
                    if (item.path === "/logout") {
                      setShowLogoutPopup(true);
                    } else {
                      navigate(item.path);
                      setMobileOpen(false);
                    }
                  }}
                  className="w-100 border-0 d-flex align-items-center"
                  style={{
                    borderRadius: "12px 0 0 12px",
                    padding: collapsed ? "12px 0" : "12px 14px",
                    justifyContent: collapsed ? "center" : "flex-start",
                    background: isActive
                      ? "#ffffff"
                      : "transparent",
                    color: isActive ? maroonMain : "#ffffff",
                    transition: "all 0.25s ease",
                    fontSize: "14px",
                    fontWeight: "500",
                    lineHeight: "1.2",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.15)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  <item.icon size={20} />

                  {!collapsed && (
                    <span
                      className="ms-3"
                      style={{
                        whiteSpace: "nowrap",
overflow: "hidden",
textOverflow: "ellipsis",
                      }}
                    >
                      {item.label}
                    </span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 🔥 LOGOUT MODAL */}
      {showLogoutPopup && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "26px",
              width: "100%",
              maxWidth: "360px",
              textAlign: "center",
              boxShadow: "0 12px 35px rgba(0,0,0,0.18)",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {/* ICON */}
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                background: "#fdecea",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 10px",
              }}
            >
              <LogOut color="#dc3545" size={22} />
            </div>

            <h5 className="fw-bold mb-2">
              {t("confirm_logout")}
            </h5>

            <p className="text-muted mb-4" style={{ fontSize: "14px" }}>
              {t("are_you_sure_logout")}
            </p>

            <div className="d-flex gap-2">
              <button
                onClick={() => setShowLogoutPopup(false)}
                className="btn w-50"
                style={{
                  background: "#f1f5f9",
                  color: "#475569",
                  borderRadius: "10px",
                  fontWeight: "600",
                  fontSize: "14px",
                  border: "1px solid #e2e8f0",
                }}
              >
                {t("cancel")}
              </button>

              <button
                onClick={() => {
                  setShowLogoutPopup(false);
                  handleLogout();
                }}
                className="btn w-50 text-white"
                style={{
                  background: "#dc3545",
                  borderRadius: "10px",
                  fontWeight: "600",
                  fontSize: "14px",
                  boxShadow: "0 4px 12px rgba(220, 53, 69, 0.2)",
                }}
              >
                {t("logout")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;