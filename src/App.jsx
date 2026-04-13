import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';
// Pages & Components Imports
import Sidebar from './component/Sidebar'; // Sidebar import kiya
import Navbar from './component/Navbar';
import Dashboard from './pages/Dashboard/Dashboard';
import UserManagement from "./pages/UserManagement";
import Home from './pages/Home/Home';
import WiseplayerUpload from './pages/UploadList/UploadList';
import WisePlayerActivation from './pages/Activation/Activation';
import Register from './pages/Ragister/Ragister';
import Login from './pages/login';
import ContactUs from './pages/Contact';
import Registersuccess from './pages/ragistersuccess';
import PlaylistManager from './pages/UploadPlaylist';
import TwentyFourSvn from './pages/twentyfoursvn';
import Privacy from './pages/secure';
import RequestManagement from './pages/RequestManagement';
import SubReseller from './pages/Subreseller';
import Reseller from './pages/Reseller';
import PurchaseCredit from './pages/PurchaseCredit';
import TransitionHistory from './pages/TransitionHistory';
// import PaymentStatus from './pages/PaymentStatus';
import PaymentRedirectHandler from './pages/PaymentRedirectHandler';
import PaymentStatus from './pages/PaymentStatus';

// Constants for Design
const maroonMain = "#800000";
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};


const AppLayout = ({ children }) => {

  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const currentLang = i18n.language?.toUpperCase() || 'EN';
  // Wo pages jahan Sidebar dikhana hai
  const adminPages = ['/dashboard', '/users', '/requests', '/subreseller', '/purchase-credit', '/transition-history', '/payment-status'];

  // Wo pages jahan Navbar hide karna hai (Login/Register/Admin pages)
  const hideNavbarOn = ['/login', '/register', '/registersuccess', ...adminPages];

  const isAdminPage = adminPages.includes(location.pathname.toLowerCase()); 
  const shouldHideNavbar = hideNavbarOn.includes(location.pathname);

  return (
    <div className="app-container">
      {/* 1. Navbar: Sirf normal pages par dikhega */}
      {!shouldHideNavbar && <Navbar />}

      {/* 2. Main Content Logic */}
      {isAdminPage ? (
        <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
          {/* Sidebar fix on left */}
          <Sidebar />

          {/* Page Content on right */}
          <div className="flex-grow-1" style={{ overflowX: 'hidden' }}>
            {/* Admin Header (Optional) */}
            <div className="bg-white shadow-sm p-3 d-flex justify-content-end align-items-center mb-3 gap-3">

              <span className="fw-bold" style={{ color: maroonMain }}>{t('reseller_panel')}</span>
              <div style={{ position: 'relative' }}>
                <div
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  style={{
                    width: '38px', height: '38px', borderRadius: '50%', border: '2px solid #e2e8f0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', fontWeight: '800', cursor: 'pointer', background: 'white',
                    boxShadow: isLangOpen ? `0 0 0 3px ${maroonMain}22` : 'none'
                  }}
                >
                  {currentLang}
                </div>

                {isLangOpen && (
                  <div style={{
                    position: 'absolute', top: '100%', right: 0, marginTop: '10px',
                    backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.1)', minWidth: '120px', zIndex: 1100
                  }}>
                    {['EN', 'FR'].map((lang) => (
                      <div
                        key={lang}
                        onClick={() => {
                          i18n.changeLanguage(lang); // <--- Changed: Removed .toLowerCase()
                          setIsLangOpen(false);
                        }}
                        style={{
                          padding: '10px 15px', fontSize: '13px', cursor: 'pointer',
                          fontWeight: currentLang === lang ? '700' : '500',
                          color: currentLang === lang ? maroonMain : '#475569',
                          backgroundColor: currentLang === lang ? '#fff5f5' : 'transparent',
                        }}
                      >
                        {lang === 'EN' ? 'English' : 'French'}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="p-3">
              {children}
            </div>
          </div>
        </div>
      ) : (
        // Normal Pages (Home, Contact etc.)
        <div className="content">{children}</div>
      )}
    </div>
  );
};

function App() {
  return (
    <Router>
       <PaymentRedirectHandler />
      <AppLayout>
        <Routes>
          {/* Sirf <Route> components hi hone chahiye yahan */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/upload-list" element={<WiseplayerUpload />} />
          <Route path="/upload-list/mac-address" element={<WiseplayerUpload />} />
          <Route path="/activation" element={<WisePlayerActivation />} />
          <Route path="/register" element={<Register />} />
          <Route path='/reseller' element={<Reseller />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/registersuccess" element={<Registersuccess />} />
          <Route path="/upload-playlist" element={<PlaylistManager />} />
          <Route path="/twentyfoursvn" element={<TwentyFourSvn />} />
          <Route path="/security" element={<Privacy />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<UserManagement />} />
<<<<<<< HEAD
           <Route path="/purchase-credit" element={<PurchaseCredit />} />
           <Route path='/payment-status' element={<PaymentStatus/>}/>
          
            <Route path="/transition-history" element={<TransitionHistory/>} />
=======
          <Route path="/purchase-credit" element={<PurchaseCredit />} />
>>>>>>> c0ef4f0 (dashboard toggle done)
          <Route
            path="/requests"
            element={<RequestManagement containerVariants={containerVariants} maroonMain={maroonMain} />}
          />
          <Route path="/subreseller" element={<SubReseller />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;