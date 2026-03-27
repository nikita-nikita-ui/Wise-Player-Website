// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Dashboard from './pages/Dashboard/Dashboard';
// import UserManagement from "./pages/UserManagement";
// // Components aur Pages imports
// import Navbar from './component/Navbar';
// import Home from './pages/Home/Home';
// import WiseplayerUpload from './pages/UploadList/UploadList';
// import WisePlayerActivation from './pages/Activation/Activation';
// // import ResellerPage from './pages/ResellerPage';
// import Register from './pages/Ragister/Ragister'; // Spelling 'Ragister' folder check kar lein
// import Login from './pages/login';
// import ContactUs from './pages/Contact';
// import Registersuccess from './pages/ragistersuccess';
// import PlaylistManager from './pages/UploadPlaylist';
// import TwentyFourSvn from './pages/twentyfoursvn';
// import Privacy from './pages/secure';
// import RequestManagement from './pages/RequestManagement';
// import SubReseller from './pages/Subreseller';
// const Navigation = () => {
//   const location = useLocation();

//   const hideNavbarOn = ['/login', '/register', '/registersuccess', '/dashboard', '/users',
//     '/requests', '/subreseller'];

//   if (hideNavbarOn.includes(location.pathname)) {
//     return null;
//   }

//   return <Navbar />;
// };

// function App() {
//   return (
//     <Router>
//       {/* Navbar logic */}
//       <Navigation />

//       <Routes>
//         {/* Main Routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/upload-list" element={<WiseplayerUpload />} />
//         <Route path="/upload-list/mac-address" element={<WiseplayerUpload />} />
//         <Route path="/activation" element={<WisePlayerActivation />} />
//         {/* <Route path="/reseller" element={<ResellerPage />} /> */}
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/contact" element={<ContactUs />} />
//         <Route path="/registersuccess" element={<Registersuccess />} />
//         <Route path="/upload-playlist" element={< PlaylistManager />} />
//         <Route path="*" element={<Home />} />
//         <Route path="/twentyfoursvn" element={<TwentyFourSvn />} />
//         <Route path="/security" element={<Privacy />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/users" element={<UserManagement />} />
//         <Route path="/requests" element={< RequestManagement />} />
//         <Route path="/subreseller" element={<SubReseller />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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

// Constants for Design
const maroonMain = "#800000";
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

// --- Layout Wrapper Component ---
// Ye component decide karega ki Sidebar dikhana hai ya normal Navbar
const AppLayout = ({ children }) => {
  const location = useLocation();

  // Wo pages jahan Sidebar dikhana hai
  const adminPages = ['/dashboard', '/users', '/requests', '/subreseller'];
  
  // Wo pages jahan Navbar hide karna hai (Login/Register/Admin pages)
  const hideNavbarOn = ['/login', '/register', '/registersuccess', ...adminPages];

  const isAdminPage = adminPages.includes(location.pathname);
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
            <div className="bg-white shadow-sm p-3 d-flex justify-content-end mb-3">
               <span className="fw-bold" style={{ color: maroonMain }}>Reseller Panel</span>
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
      <AppLayout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/upload-list" element={<WiseplayerUpload />} />
          <Route path="/upload-list/mac-address" element={<WiseplayerUpload />} />
          <Route path="/activation" element={<WisePlayerActivation />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/registersuccess" element={<Registersuccess />} />
          <Route path="/upload-playlist" element={<PlaylistManager />} />
          <Route path="/twentyfoursvn" element={<TwentyFourSvn />} />
          <Route path="/security" element={<Privacy />} />

          {/* Admin Routes with Sidebar */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<UserManagement />} />
          <Route 
            path="/requests" 
            element={
              <RequestManagement 
                containerVariants={containerVariants} 
                maroonMain={maroonMain} 
              />
            } 
          />
          <Route path="/subreseller" element={<SubReseller />} />

          {/* 404 Redirect */}
          <Route path="*" element={<Home />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;