import React, { useState, useEffect } from 'react';
import { Mail, Flame, Home, CloudDownload, Tag, Menu, X, ChevronRight, UserPlus } from 'lucide-react'; // LogIn and Store removed as unused
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const Navbar = () => {
    const { t, i18n } = useTranslation(); // Use both t and i18n
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // Set initial language based on i18n state or default ('EN')
    const [currentLang, setCurrentLang] = useState(i18n.language || 'EN');

    const availableLanguages = [
        { code: 'EN', name: 'English' },
        { code: 'FR', name: 'French' }, // Only EN and FR are configured in your i18n setup
        // Baki languages yahan hain, lekin unke translation files nahi hain
        { code: 'ZH', name: 'Mandarin Chinese' },
        { code: 'HI', name: 'Hindi' },
        { code: 'ES', name: 'Spanish' },
        { code: 'AR', name: 'Standard Arabic' },
        { code: 'BN', name: 'Bengali' },
        { code: 'PT', name: 'Portuguese' },
        { code: 'RU', name: 'Russian' },
        { code: 'ID', name: 'Indonesian' },
    ];

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
        { name: t('nav_home'), path: '/home', icon: <Home size={18} /> }, // *** TRANSLATED ***
        { name: t('nav_upload_list'), path: '/upload-list', icon: <CloudDownload size={18} /> }, // *** TRANSLATED ***
        { name: t('nav_activation'), path: '/activation', icon: <Tag size={18} /> }, // *** TRANSLATED ***
    ];

    // Update currentLang state when i18n language changes globally (e.g., from another component)
    useEffect(() => {
        setCurrentLang(i18n.language);
    }, [i18n.language]);


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

        @media (min-width: 769px) {
  .desktop-hide { display: none !important; }
}

@media (max-width: 768px) {
  .mobile-hide { display: none !important; }
  .desktop-hide { display: block !important; }
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

                        <div className="auth-group mobile-hide">
                            <Link to="/reseller" className="btn-base register-solid">
                                <UserPlus size={16} /> {t('nav_reseller')} {/* *** TRANSLATED *** */}
                            </Link>
                        </div>

                        {/* CONTACT BUTTON */}
                        <Link to="/contact" className="contact-cta">
                            <Mail size={18} />
                            <span className="mobile-hide">{t('nav_contact')}</span> {/* *** TRANSLATED *** */}
                            <ChevronRight size={16} />
                        </Link>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                            className="desktop-hide" // You'll need to define this to hide on desktop
                        >
                            {isMenuOpen ? <X size={28} color={colors.dark} /> : <Menu size={28} color={colors.dark} />}
                        </button>
                        {/* LANGUAGE */}
                        <div style={{ position: 'relative' }}>
                            {/* Language Button (EN/Current Lang) */}
                            <div
                                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                                style={{
                                    width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #e2e8f0',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '11px', fontWeight: '800', cursor: 'pointer', background: 'white',
                                    boxShadow: isLanguageDropdownOpen ? `0 0 0 3px ${colors.primary}` : 'none' // Highlight when open
                                }}
                            >
                                {currentLang}
                            </div>

                            {/* Language Dropdown List */}
                            {isLanguageDropdownOpen && (
                                <div style={{
                                    position: 'absolute', top: '100%', right: 0, marginTop: '10px',
                                    backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px',
                                    boxShadow: '0 8px 20px rgba(0,0,0,0.1)', minWidth: '120px', zIndex: 1100
                                }}>
                                    {availableLanguages.map((lang) => (
                                        <div
                                            key={lang.code}
                                            onClick={() => {
                                                if (lang.code === 'EN' || lang.code === 'FR') { // Only change language if EN/FR translation exists
                                                    i18n.changeLanguage(lang.code); // Change language using i18n object
                                                    setCurrentLang(lang.code); // Update local state
                                                    setIsLanguageDropdownOpen(false); // Close dropdown
                                                }
                                            }}
                                            style={{
                                                padding: '10px 15px',
                                                fontSize: '13px',
                                                cursor: (lang.code === 'EN' || lang.code === 'FR') ? 'pointer' : 'not-allowed',
                                                color: (lang.code === 'EN' || lang.code === 'FR') ? (lang.code === currentLang ? colors.primary : colors.dark) : '#aaa',
                                                fontWeight: lang.code === currentLang ? '700' : '500',
                                                backgroundColor: lang.code === currentLang ? 'rgba(177, 25, 5, 0.05)' : 'transparent',
                                            }}
                                            onMouseEnter={(e) => {
                                                if (lang.code === 'EN' || lang.code === 'FR') {
                                                    e.currentTarget.style.backgroundColor = 'rgba(230, 230, 230, 0.5)';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (lang.code !== currentLang && (lang.code === 'EN' || lang.code === 'FR')) {
                                                    e.currentTarget.style.backgroundColor = 'transparent';
                                                }
                                            }}
                                        >
                                            {lang.name} {!(lang.code === 'EN' || lang.code === 'FR') && " (N/A)"}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* MOBILE DROPDOWN MENU */}
                {/* MOBILE DROPDOWN MENU */}
                {isMenuOpen && (
                    <div style={{
                        position: 'absolute',
                        top: '90%', // Small gap from top
                        left: '5%', // Margin from left
                        width: '90%', // Not full width (looks more premium)
                        background: 'white',
                        borderRadius: '20px', // Smooth rounded corners
                        padding: '25px 20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        boxShadow: '0 15px 40px rgba(0,0,0,0.12)', // Soft shadow
                        border: '1px solid rgba(0,0,0,0.05)',
                        zIndex: 1001
                    }}>
                        {/* Navigation Links */}
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                style={{
                                    textDecoration: 'none',
                                    color: '#475569',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    fontSize: '16px'
                                }}
                            >
                                <span style={{ color: colors.primary }}>{link.icon}</span>
                                {link.name}
                            </Link>
                        ))}

                        {/* Separator Line */}
                        <div style={{ height: '1px', background: '#f1f5f9', margin: '5px 0' }}></div>

                        {/* Reseller Button - More Balanced */}
                        <Link
                            to="/reseller"
                            onClick={() => setIsMenuOpen(false)}
                            style={{
                                textDecoration: 'none',
                                background: colors.dark,
                                color: 'white',
                                padding: '14px',
                                borderRadius: '14px',
                                textAlign: 'center',
                                fontWeight: '700',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                fontSize: '15px',
                                transition: '0.2s'
                            }}
                        >
                            <UserPlus size={18} /> {t('nav_reseller')}
                        </Link>
                    </div>
                )}
            </header>



            {/* Hero Spacer */}
            <div style={{ height: isScrolled ? '75px' : '90px' }}></div>
        </>
    );
};

export default Navbar;