import React from 'react';
import { LayoutDashboard, Users, Layers, Clock, PlusCircle, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const maroonMain = "#800000";
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/users', label: 'User Management', icon: Users },
    { path: '/resellers', label: 'Sub Resellers', icon: Layers },
    { path: '/requests', label: 'Activation Requests', icon: Clock },
    { path: '/new-activation', label: ' Track Activation Request', icon: PlusCircle },
    { path: '/logout', label: 'Logout', icon: LogOut },
  ];

  return (
    <div
      className="sidebar d-none d-lg-block shadow"
      style={{
        width: "280px",
        backgroundColor: maroonMain,
        position: 'sticky',
        top: 0,
        height: '100vh',
        zIndex: 1000
      }}
    >
      <div className="p-4 mb-4 text-center">
        <h3 className="text-white fw-bold letter-spacing-1">
          RESELLER<span style={{ color: '#ffc107' }}>HUB</span>
        </h3>
      </div>

      <div className="nav flex-column ps-3">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`nav-link w-100 text-start border-0 px-4 py-3 d-flex align-items-center mb-1 transition-all
              ${isActive ? 'bg-white shadow-sm' : 'bg-transparent text-white opacity-75'}`}
              style={{
                borderRadius: '12px 0 0 12px',
                color: isActive ? maroonMain : 'white',
                transition: 'all 0.3s ease'
              }}
            >
              <item.icon size={20} className="me-3" />
              <span className="fw-500">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;