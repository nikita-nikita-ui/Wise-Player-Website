import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components aur Pages imports
import Navbar from './components/Navbar';
import Home from './pages/Home';
import WiseplayerUpload from './pages/UploadList';
import WisePlayerActivation from './pages/Activation';
import ResellerPage from './pages/ResellerPage';
import Register from './pages/Ragister'; // Spelling 'Ragister' folder check kar lein
import Login from './pages/login';
import ContactUs from './pages/Contact';
import Registersuccess from './pages/ragistersuccess';
import PlaylistManager from './pages/UploadPlaylist';
import TwentyFourSvn from './pages/twentyfoursvn';
import Privacy from './pages/secure';
const Navigation = () => {
  const location = useLocation();

  const hideNavbarOn = ['/login', '/register', '/registersuccess'];

  if (hideNavbarOn.includes(location.pathname)) {
    return null;
  }

  return <Navbar />;
};

function App() {
  return (
    <Router>
      {/* Navbar logic */}
      <Navigation />

      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/upload-list" element={<WiseplayerUpload />} />
        <Route path="/activation" element={<WisePlayerActivation />} />
        <Route path="/reseller" element={<ResellerPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/registersuccess" element={<Registersuccess />} />
        <Route path="/upload-playlist" element={< PlaylistManager />} />
        <Route path="*" element={<ResellerPage />} />
        <Route path="/twentyfoursvn" element={<TwentyFourSvn />} />
        <Route path="/security" element={<Privacy/>} />

      </Routes>
    </Router>
  );
}

export default App;