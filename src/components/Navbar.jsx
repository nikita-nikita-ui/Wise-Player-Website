import React, { useState, useEffect } from 'react';
import { Store, Mail, Flame, Home, CloudDownload, Tag, Menu, X, ChevronRight, UserPlus, LogIn } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const colors = {
    primary: '#b11905', // Deep Red
    secondary: '#690a72', // Purple
    dark: '#0f172a',
    light: '#f8fafc',
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/home', icon: <Home size={18} /> },
    { name: 'Upload List', path: '/upload-list', icon: <CloudDownload size={18} /> },
    { name: 'Activation', path: '/activation', icon: <Tag size={18} /> },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');

        body { font-family: 'Plus Jakarta Sans', sans-serif; margin: 0; }

        .nav-glass {
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          background: ${isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.98)'};
          border-bottom: 1px solid ${isScrolled ? 'rgba(0,0,0,0.06)' : 'transparent'};
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-link {
          position: relative;
          color: #475569;
          font-weight: 600;
          font-size: 14px;
          padding: 8px 16px;
          border-radius: 12px;
          transition: 0.3s;
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
        }

        .nav-link:hover {
          color: ${colors.primary};
          background: rgba(177, 25, 5, 0.05);
        }

        .nav-link.active {
          color: ${colors.primary};
          background: rgba(177, 25, 5, 0.08);
        }

        /* Auth Buttons Style */
        .auth-group {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-right: 10px;
        }

        .btn-base {
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
          padding: 8px 18px;
          border-radius: 50px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .login-outline {
          color: ${colors.dark};
          border: 1.5px solid #e2e8f0;
        }
        .login-outline:hover {
          background: #f8fafc;
          border-color: ${colors.primary};
          color: ${colors.primary};
        }

        .register-solid {
          background: ${colors.dark};
          color: white;
          border: 1.5px solid ${colors.dark};
        }
        .register-solid:hover {
          background: #000;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .contact-cta {
          background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
          color: white !important;
          padding: 10px 22px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          box-shadow: 0 4px 15px rgba(177, 25, 5, 0.2);
          transition: 0.3s;
        }

        .contact-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(177, 25, 5, 0.3);
        }

        @keyframes flame-pulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 2px ${colors.primary}); }
          50% { transform: scale(1.1); filter: drop-shadow(0 0 10px ${colors.primary}); }
        }

        .logo-anim { animation: flame-pulse 2s infinite ease-in-out; }

        @media (max-width: 768px) {
          .mobile-hide { display: none !important; }
          .mobile-nav-dock {
            position: fixed; bottom: 20px; left: 15px; right: 15px; height: 65px;
            background: ${colors.dark}; border-radius: 20px;
            display: flex; justify-content: space-around; align-items: center;
            z-index: 2000; box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          }
        }
      `}</style>

      <header className="nav-glass" style={{
        position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000,
        height: isScrolled ? '75px' : '90px',
        display: 'flex', alignItems: 'center', transition: '0.4s ease'
      }}>
        <div style={{
          width: '100%', padding: '0 4%', display: 'flex',
          alignItems: 'center', justifyContent: 'space-between'
        }}>
          
          {/* LOGO */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div className="logo-anim">
              <Flame size={35} fill={colors.primary} color={colors.primary} />
            </div>
            <div style={{ lineHeight: 1 }}>
              <span style={{ fontSize: '24px', fontWeight: '900', color: colors.dark, letterSpacing: '-1px' }}>WISE PLAYER</span>
              <div style={{ fontSize: '10px', fontWeight: '700', color: colors.primary, letterSpacing: '2px', marginTop: '2px' }}>PREMIUM EXPERIENCE</div>
            </div>
          </Link>

          {/* MAIN NAV (CENTER) */}
          <nav className="mobile-hide" style={{ display: 'flex', gap: '8px' }}>
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}>
                {link.icon}
                {link.name}
              </Link>
            ))}
          </nav>

          {/* RIGHT ACTIONS */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            
            {/* LOGIN & REGISTER (Label removed) */}
            <div className="auth-group mobile-hide">
              <Link to="/login" className="btn-base login-outline">
                <LogIn size={16} /> Login
              </Link>
              <Link to="/register" className="btn-base register-solid">
                <UserPlus size={16} /> Register
              </Link>
            </div>

            {/* CONTACT BUTTON */}
            <Link to="/contact" className="contact-cta">
              <Mail size={18} />
              <span className="mobile-hide">Contact</span>
              <ChevronRight size={16} />
            </Link>

            {/* LANGUAGE */}
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #e2e8f0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '11px', fontWeight: '800', cursor: 'pointer', background: 'white'
            }}>EN</div>
          </div>
        </div>
      </header>

      {/* MOBILE NAVIGATION DOCK */}
      <div className="mobile-nav-dock" style={{ display: window.innerWidth <= 768 ? 'flex' : 'none' }}>
        {navLinks.map((link) => (
          <Link key={link.name} to={link.path} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none',
            color: location.pathname === link.path ? 'white' : '#94a3b8', gap: '4px'
          }}>
            <div style={{
              padding: '8px 15px', borderRadius: '12px',
              background: location.pathname === link.path ? colors.primary : 'transparent'
            }}>{link.icon}</div>
            <span style={{ fontSize: '10px', fontWeight: '600' }}>{link.name}</span>
          </Link>
        ))}
        <Link to="/login" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', color: '#94a3b8' }}>
          <div style={{ padding: '8px 15px' }}><LogIn size={18} /></div>
          <span style={{ fontSize: '10px', fontWeight: '600' }}>Login</span>
        </Link>
      </div>

      {/* Hero Spacer */}
      <div style={{ height: isScrolled ? '75px' : '90px' }}></div>
    </>
  );
};

export default Navbar;