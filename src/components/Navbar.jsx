import React, { useState, useEffect } from 'react';
import { Store, Mail, Flame, Home, CloudDownload, Tag } from 'lucide-react';

function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('Accueil');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const topSectionResponsive = {
    ...styles.topSection,
    padding: isMobile ? '10px 15px' : '10px 60px',
  };

  const bottomNavResponsive = {
    ...styles.bottomNav,
    padding: isMobile ? '0 15px' : '0 60px',
    gap: isMobile ? '20px' : '40px',
  };

  return (
    <header style={styles.header}>
      {/* Advanced Animations CSS */}
      <style>{`
        @keyframes flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .nav-link {
          position: relative;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          color: #333;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 15px 0;
          cursor: pointer;
        }

        /* Hover Effect: Text & Icon */
        .nav-link:hover {
          color: #b11905 !important;
          transform: translateY(-2px);
        }

        /* Underline Animation */
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, #000, #b11905, #000);
          transition: all 0.4s ease;
          transform: translateX(-50%);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        /* Active State Underline */
        .nav-link.active::after {
          width: 100%;
          background: linear-gradient(90deg, #b11905, #000);
        }

        /* Logo Gradient */
        .logo-text {
          background: linear-gradient(90deg, #000, #b11905);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 800;
        }

        .utility-link {
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          color: #6b0303;
        }

        .utility-link:hover {
          color: #000;
          transform: scale(1.05);
        }

        .lang-badge {
          background: linear-gradient(45deg, #1a202c, #4a1111);
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          transition: transform 0.3s ease;
        }

        .lang-badge:hover {
          transform: rotate(5deg) scale(1.1);
        }
      `}</style>

      {/* --- TOP SECTION --- */}
      <div style={topSectionResponsive}>
        <div style={styles.logoContainer}>
          <Flame color="#861303" size={isMobile ? 30 : 38} fill="#b11905" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'}} />
          <span style={{ ...styles.logoText, fontSize: isMobile ? '22px' : '30px' }} className="logo-text">
            Wise Player
          </span>
        </div>

        <div style={{ ...styles.rightLinks, gap: isMobile ? '15px' : '30px' }}>
          <div className="utility-link" style={{fontSize: isMobile ? '13px' : '15px', fontWeight: '600'}}>
            <Store size={isMobile ? 18 : 20} />
            {!isMobile && <span>Revendeur</span>}
          </div>
          <div className="utility-link" style={{fontSize: isMobile ? '13px' : '15px', fontWeight: '600'}}>
            <Mail size={isMobile ? 18 : 20} />
            <span>{isMobile ? 'Gmail' : 'Contact Gmail'}</span>
          </div>
          <div style={styles.langBadge} className="lang-badge">EN</div>
        </div>
      </div>

      {/* --- Animated Middle Separator --- */}
      <div style={styles.separator} />

      {/* --- BOTTOM NAVIGATION --- */}
      <div style={bottomNavResponsive}>
        <div
          className={`nav-link ${activeTab === 'Accueil' ? 'active' : ''}`}
          onClick={() => setActiveTab('Accueil')}
          style={activeTab === 'Accueil' ? {color: '#b11905', fontWeight: '800'} : {fontWeight: '600'}}
        >
          <Home size={20} />
          <span>Home</span>
        </div>

        <div
          className={`nav-link ${activeTab === 'Download' ? 'active' : ''}`}
          onClick={() => setActiveTab('Download')}
          style={activeTab === 'Download' ? {color: '#b11905', fontWeight: '800'} : {fontWeight: '600'}}
        >
          <CloudDownload size={20} />
          <span>Upload List</span>
        </div>

        <div
          className={`nav-link ${activeTab === 'Activation' ? 'active' : ''}`}
          onClick={() => setActiveTab('Activation')}
          style={activeTab === 'Activation' ? {color: '#b11905', fontWeight: '800'} : {fontWeight: '600'}}
        >
          <Tag size={20} />
          <span>Activation</span>
        </div>
      </div>
    </header>
  );
}

const styles = {
  header: {
    width: '100%',
    backgroundColor: '#ffffff',
    fontFamily: "'Inter', sans-serif",
    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.15)',
    boxSizing: 'border-box',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  topSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'white',
  },
  separator: {
    height: '3px',
    width: '100%',
    background: 'linear-gradient(90deg, #000 0%, #b11905 50%, #000 100%)',
    backgroundSize: '200% 100%',
    animation: 'flow 5s linear infinite',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer'
  },
  rightLinks: {
    display: 'flex',
    alignItems: 'center',
  },
  langBadge: {
    color: '#fff',
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginLeft: '10px'
  },
  bottomNav: {
    display: 'flex',
    backgroundColor: '#fff',
    overflowX: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  },
};

export default Navbar;