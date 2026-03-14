import React, { useState, useEffect } from 'react';
import { Store, Mail, Flame, Home, CloudDownload, Tag, Globe, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Color Palette
  const colors = {
    primary: '#b11905', // Deep Red
    secondary: '#690a72', // Purple
    accent: '#ff4d4d',
    glass: 'rgba(255, 255, 255, 0.8)',
    text: '#1a1a1a'
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/home', icon: <Home size={20} /> },
    { name: 'Upload List', path: '/upload-list', icon: <CloudDownload size={20} /> },
    { name: 'Activation', path: '/activation', icon: <Tag size={20} /> },
  ];

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 10px rgba(177, 25, 5, 0.2); }
          50% { box-shadow: 0 0 25px rgba(177, 25, 5, 0.5); }
        }

        @keyframes logo-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .glass-container {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-item {
          position: relative;
          color: #444;
          text-decoration: none;
          font-weight: 600;
          padding: 10px 20px;
          border-radius: 12px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          overflow: hidden;
        }

        .nav-item:hover {
          color: ${colors.primary};
          background: rgba(177, 25, 5, 0.05);
        }

        .nav-item.active {
          color: white;
          background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
          box-shadow: 0 4px 15px rgba(177, 25, 5, 0.3);
        }

        .nav-item.active svg {
          transform: scale(1.1);
        }

        .logo-text {
          font-weight: 900;
          font-size: 24px;
          background: linear-gradient(90deg, #111, ${colors.primary}, ${colors.secondary}, #111);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: logo-gradient 5s linear infinite;
        }

        .flame-icon {
          animation: float 3s ease-in-out infinite;
          filter: drop-shadow(0 0 5px ${colors.primary});
        }

        .utility-btn {
          padding: 8px 16px;
          border-radius: 50px;
          border: 1px solid #eee;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          background: white;
        }

        .utility-btn:hover {
          border-color: ${colors.primary};
          color: ${colors.primary};
          transform: translateY(-2px);
        }

        .lang-switch {
          background: #1a1a1a;
          color: white;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 800;
          cursor: pointer;
          border: 2px solid transparent;
          transition: 0.3s;
        }

        .lang-switch:hover {
          border-color: ${colors.primary};
          transform: rotate(360deg);
        }

        @media (max-width: 768px) {
          .mobile-nav {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            background: rgba(255,255,255,0.9);
            border-radius: 25px;
            padding: 10px;
            display: flex;
            justify-content: space-around;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            z-index: 1001;
          }
        }
      `}</style>

      <header style={{
        position: 'fixed',
        top: isScrolled ? '10px' : '0',
        left: '0',
        right: '0',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        padding: isScrolled ? '0 20px' : '0',
        transition: 'all 0.4s ease'
      }}>
        <div className="glass-container" style={{
          width: isScrolled ? '100%' : '100%',
          maxWidth: '1400px',
          height: '80px',
          padding: '0 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: isScrolled ? '24px' : '0',
          background: isScrolled ? 'rgba(255, 255, 255, 0.85)' : 'white',
          boxShadow: isScrolled ? '0 20px 40px rgba(0,0,0,0.1)' : 'none',
        }}>

          {/* LOGO SECTION */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div className="flame-icon">
              <Flame size={35} fill={colors.primary} color={colors.primary} />
            </div>
            <span className="logo-text">WISE PLAYER</span>
          </Link>

          {/* DESKTOP MENU */}
          <nav style={{ display: window.innerWidth > 768 ? 'flex' : 'none', gap: '10px' }}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`nav-item ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </nav>

          {/* RIGHT UTILITIES */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Link
              to="/reseller"
              className="utility-btn"
              style={{
                display: window.innerWidth > 768 ? 'flex' : 'none',
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              <Store size={18} />
              <span>Revendeur</span>
            </Link>

            <Link
              to="/contact"
              className="utility-btn"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Mail size={18} />
              <span style={{ display: window.innerWidth > 768 ? 'block' : 'none' }}>Contact</span>
            </Link>

            <div className="lang-switch">EN</div>

            {/* Mobile Menu Toggle */}
            <div
              style={{ display: window.innerWidth <= 768 ? 'block' : 'none', cursor: 'pointer' }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE BOTTOM NAVIGATION (Modern App Style) */}
      {window.innerWidth <= 768 && (
        <div className="mobile-nav glass-container">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textDecoration: 'none',
                color: location.pathname === link.path ? colors.primary : '#666',
                gap: '4px',
                fontSize: '12px',
                fontWeight: '700'
              }}
            >
              <div style={{
                padding: '8px 16px',
                borderRadius: '15px',
                background: location.pathname === link.path ? 'rgba(177, 25, 5, 0.1)' : 'transparent',
                transition: '0.3s'
              }}>
                {link.icon}
              </div>
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
      )}

      {/* Spacer to prevent content from going under navbar */}
      <div style={{ height: '100px' }}></div>
    </>
  );
};

export default Navbar;