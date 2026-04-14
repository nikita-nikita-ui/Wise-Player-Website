import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Layers,
  Clock,
  PlusCircle,
  LogOut,
  ShoppingCart,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useAuth } from "../context/AuthContext";
const Sidebar = () => {
  const { t } = useTranslation();
  const maroonMain = "#800000";
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const { userRole } = useAuth();
  console.log("user : ", userRole);

  const menuItems = [
    { path: "/dashboard", label: t('side_dashboard'), icon: LayoutDashboard },
    { path: "/users", label: t('side_users'), icon: Users },
    { path: "/subreseller", label: t('side_subreseller'), icon: Layers },
    { path: "/requests", label: t('side_requests'), icon: Clock },
    { path: "/new-activation", label: t('side_track'), icon: PlusCircle },
    { path: "/purchase-credit", label: t('side_purchase'), icon: ShoppingCart },
    { path: "/logout", label: t('side_logout'), icon: LogOut },
  ];

  const handleLogout = () => {
    // ❌ remove stored auth data
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("admin");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <>
      <div
        className="sidebar d-none d-lg-block shadow"
        style={{
          width: "280px",
          backgroundColor: maroonMain,
          position: "sticky",
          top: 0,
          height: "100vh",
          zIndex: 1000,
        }}
      >
        <div className="p-4 mb-4 text-center">
          <h3 className="text-white fw-bold letter-spacing-1">
            RESELLER<span style={{ color: "#ffc107" }}>HUB</span>
          </h3>
        </div>

        <div className="nav flex-column ps-3">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.path}
                // onClick={() => navigate(item.path)}
                onClick={() => {
                  if (item.path === "/logout") {
                    setShowLogoutPopup(true);
                  } else {
                    navigate(item.path);
                  }
                }}
                className={`nav-link w-100 text-start border-0 px-4 py-3 d-flex align-items-center mb-1 transition-all
              ${isActive ? "bg-white shadow-sm" : "bg-transparent text-white opacity-75"}`}
                style={{
                  borderRadius: "12px 0 0 12px",
                  color: isActive ? maroonMain : "white",
                  transition: "all 0.3s ease",
                }}
              >
                <item.icon size={20} className="me-3" />
                <span className="fw-500">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      {showLogoutPopup && (
        <div className="fixed pl-[26%]  inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Confirm Logout
            </h2>

            <p className="text-gray-600 mb-6">
              Are you sure you want to logout?
            </p>

            <div className="flex justify-center gap-4">
              {/* Cancel Button */}
              <button
                onClick={() => setShowLogoutPopup(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 transition"
              >
                Cancel
              </button>

              {/* Confirm Logout */}
              <button
                onClick={() => {
                  setShowLogoutPopup(false);
                  handleLogout();
                }}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
