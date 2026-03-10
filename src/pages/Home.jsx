import React from 'react';
import {
    Flame, Facebook, Twitter, Instagram, Linkedin,
    ShieldCheck, FileText, Mail, Phone, Star
} from 'lucide-react';
import img1 from '../assets/LGG.png';
import img2 from '../assets/LG.png';
import img3 from '../assets/image.png';
import img4 from '../assets/sam.png';

const WisePlayerHome = () => {
    const featureData = [
        { title: "Simple interface", desc: "An easy and intuitive interface for the user." },
        { title: "Favorite list", desc: "Create a favorite list where you can save your preferred Channels." },
        { title: "Navigate", desc: "Switch between channels by their numbers using your remote." },
        { title: "Search", desc: "Search for your channel/movie/series by a keyword." },
        { title: "Sort channels", desc: "Sort your Channels alphabetically A-Z / Z-A." },
        { title: "Parental Controls", desc: "Lock / Hide content with PIN." },
        { title: "Multi List", desc: "You can upload up to 3 Lists and switch between them." },
        { title: "Lock Mac", desc: "Avoid your playlist being reset by somebody else." },
    ];

    const faqData = [
        {
            q: "Where can I download WisePlayer from ?",
            a: "Our application is available to download on Samsung Tizen TV store and Play Store."
        },
        {
            q: "Does WisePlayer contain channels and from where can I get a playlist ?",
            a: "No, WisePlayer is a pure MEDIA PLAYER where you can run your Playlist. In that way, we provide a player with no content of channels. In addition, application developers are not responsible for the content uploaded to WisePlayer."
        },
        {
            q: "Is the app fee paid monthly ?",
            a: "WisePlayer can be activated after a one-time fee of 162 MAD (~14.99 EUR) for each TV/device, or 65 MAD (~5.99 EUR) for 1 year. You don't need to pay any future fee as we mentioned on our website."
        },
        {
            q: "How can i Lock my TV's MAC address ?",
            a: "You can lock your MAC address in application settings by using the Lock MAC button to avoid your playlist being reset by somebody else or if you shared your MAC address with some third party."
        },
    ];
    return (
        <>
            <style>
                {`
                .home-container {
                    min-height: 100vh;
                    background-color: #f8f9fa;
                    padding-top: 40px;
                    padding-left: 60px;
                    padding-right: 30px;
                    font-family: sans-serif;
                }

                .content-wrapper {
                    width: 100%;
                    max-width: 100%; /* Full width for disclaimer and features */
                }

                .hero-title {
                    font-size: 2rem;
                    font-weight: 900;
                    color: #0c1b2d;
                    line-height: 1.1;
                    letter-spacing: -0.025em;
                    margin-bottom: 10px;
                }

                .brand-name { color: #72160a; }

                .yellow-badge {
                    display: inline-block;
                    background-color: #ad1b07;
                    color: White;
                    font-size: 12px;
                    font-weight: bold;
                    padding: 4px 24px;
                    border-radius: 2px;
                    margin-bottom: 24px;
                    text-transform: uppercase;
                }

                .description-section {
                    margin-top: 32px;
                    color: #4a5568;
                    font-size: 1.125rem;
                    line-height: 1.625;
                    max-width: 896px; /* Text reading width */
                }

                .gray-disclaimer {
                    margin-top: 40px;
                    background-color: rgb(201, 131, 131);
                    padding: 16px;
                    border-radius: 6px;
                    border-left: 4px solid #41020d;
                    max-width: 896px;
                }

                .gray-disclaimer p { color: white; font-size: 1rem; }

                /* DISCLAIMER SECTION (Pink Box) */
                .red-section {
                    background-color: #fee2e2;
                    padding: 40px;
                    margin-top: 25px;
                    margin-bottom: 60px;
                    width: 100%;
                }

                .red-section-inner {
                    width: 100%;
                    margin: 0 auto;
                }

                .grid-layout {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 40px;
                }

                @media (min-width: 768px) {
                    .grid-layout { grid-template-columns: 1.5fr 1fr; }
                }

                /* FEATURES SECTION STYLING */
                .features-section {
                    padding: 60px 0;
                    text-align: center;
                    width: 100%;
                }

                .features-title {
                    font-size: 2.5rem;
                    font-weight: 800;
                    color: #0c1b2d;
                    margin-bottom: 5px;
                }

                .orange-bar {
                    width: 70px;
                    height: 4px;
                    background-color: #ffae00;
                    margin: 0 auto 20px;
                }

                .features-subtitle {
                    color: #666;
                    font-size: 1.1rem;
                    margin-bottom: 50px;
                }

                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(1, 1fr);
                    gap: 20px;
                }

                @media (min-width: 768px) {
                    .features-grid { grid-template-columns: repeat(2, 1fr); }
                }

                @media (min-width: 1024px) {
                    .features-grid { grid-template-columns: repeat(4, 1fr); }
                }

                .feature-card {
                    background: #ffffff;
                    padding: 25px;
                    border-radius: 8px;
                    border: 1px solid #e2e8f0;
                    text-align: left;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
                }

                .card-header {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 12px;
                }

                .star-icon { color: #ffae00; font-size: 1.2rem; }

                .card-header h3 {
                    font-size: 1.15rem;
                    color: #1a2b3c;
                    margin: 0;
                    font-weight: 700;
                }

                .feature-card p {
                    color: #718096;
                    font-size: 0.95rem;
                    line-height: 1.5;
                    margin: 0;
                }

                .bullet-item { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 15px; }
                .bullet-icon { color: #ef4444; font-weight: bold; }

/* PRICING SECTION STYLING */
                .trial-banner {
                    background-color: rgb(225, 235, 241);
                    padding: 50px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 30px;
                    border-radius: 4px;
                }
                .trial-text h2 { font-size: 2rem; color: #0c1b2d; margin: 0; }
                .trial-text p { font-size: 1.5rem; color: #f39c12; font-weight: bold; margin: 5px 0 0 0; }
                
                .pricing-container { padding: 60px 0; text-align: center; }
                .pricing-title { 
                    font-size: 2.2rem; 
                    font-weight: 800; 
                    display: inline-block;
                    border-bottom: 4px solid #f39c12;
                    margin-bottom: 50px;
                }
                .pricing-grid {
                    display: flex;
                    justify-content: center;
                    gap: 30px;
                    flex-wrap: wrap;
                }
                .price-card {
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 15px;
                    padding: 40px 30px;
                    width: 320px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
                    position: relative;
                }
                .popular-badge {
                    position: absolute;
                    top: -15px; left: 50%;
                    transform: translateX(-50%);
                    background: #f39c12;
                    color: white;
                    padding: 5px 15px;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: bold;
                }
                .price-card h4 { font-size: 1.4rem; margin-bottom: 20px; color: #333; }
                .price-value { font-size: 1rem; font-weight: 900; color: #000; }
                .price-euro { color: #666; margin: 10px 0 30px; font-size: 1.1rem; }
                .activate-btn {
                    background: #ffc107;
                    border: none;
                    padding: 15px;
                    width: 100%;
                    border-radius: 8px;
                    font-weight: bold;
                    color: #444;
                    cursor: pointer;
                    font-size: 1rem;
                }

                /* RESELLER SECTION STYLING */
                .reseller-banner {
                    background-color: #f5f5f5; /* Light gray background */
                    padding: 40px 60px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 20px;
                    margin-bottom: 60px;
                    border-radius: 4px;
                }

                .reseller-text h2 {
                    font-size: 1.8rem;
                    font-weight: 800;
                    color: #0c1b2d;
                    margin: 0;
                }

                .reseller-text p {
                    font-size: 1.4rem;
                    color: #ffae00; /* Orange color */
                    font-weight: 700;
                    margin: 8px 0 0 0;
                }

                .reseller-btn {
                    background-color: #000000; /* Black button */
                    color: #ffffff;
                    border: none;
                    padding: 14px 28px;
                    border-radius: 6px;
                    font-size: 1.05rem;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    cursor: pointer;
                    transition: opacity 0.2s;
                }

                .reseller-btn:hover {
                    opacity: 0.9;
                }

                /* Mobile responsiveness */
                @media (max-width: 768px) {
                    .reseller-banner {
                        flex-direction: column;
                        text-align: center;
                        gap: 25px;
                        padding: 30px 20px;
                    }
                }

                /* FAQ SECTION STYLING */
.faq-section {
    padding-bottom: 80px;
    width: 100%;
}

.faq-title {
    font-size: 2.2rem;
    font-weight: 800;
    color: #0c1b2d;
    margin-bottom: 20px;
    text-align: left;
}

.faq-card {
    background: #ffffff;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
    display: grid;
    grid-template-columns: 1fr 1.5fr; /* Left for Question, Right for Answer */
    gap: 40px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border: 1px solid #f0f0f0;
}

.faq-question {
    font-size: 1.05rem;
    font-weight: 700;
    color: #0c1b2d;
    line-height: 1.4;
}

.faq-answer {
    font-size: 1rem;
    color: #4a5568;
    line-height: 1.6;
}

/* Mobile responsive for FAQ */
@media (max-width: 768px) {
    .faq-card {
        grid-template-columns: 1fr;
        gap: 15px;
        padding: 20px;
    }
    .faq-title {
        font-size: 1.8rem;
    }
}

/* PREMIUM FOOTER STYLING */
.main-footer {
    background-color: #0a0f18; /* Deep Black/Blue */
    color: #ffffff;
   padding: 30px 0 0 0;
    font-family: 'Inter', sans-serif;
    border-top: 4px solid #2563eb; /* Top Blue Accent Bar */
}

.footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
    gap: 40px;
    padding: 0 30px;
}

.footer-brand .logo-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
}

.footer-brand p {
    color: #94a3b8;
    line-height: 1.6;
    font-size: 0.95rem;
}

.footer-heading {
    color: #ffffff;
    font-size: 1.1rem;
    font-weight: 700;
 margin-bottom: 10px;
     position: relative;
}

.footer-heading::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -8px;
    width: 30px;
    height: 2px;
    background-color: #2563eb;
}

.footer-links-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.footer-links-list li {
    margin-bottom: 12px;
}

.footer-links-list a {
    color: #94a3b8;
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 0.95rem;
}

.footer-links-list a:hover {
    color: #3b82f6;
    padding-left: 5px;
}

.social-icons {
    display: flex;
    gap: 15px;
    margin-top: 20px;
}

.social-btn {
    background: #1e293b;
    color: white;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s;
    cursor: pointer;
}

.social-btn:hover {
    background: #2563eb;
    transform: translateY(-3px);
}

/* Bottom Strip */
.footer-bottom {
padding: 15px 15px; 
    border-top: 1px solid #1e293b;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 100%;
  
    
}

.copyright-text {
    color: #64748b;
    font-size: 0.9rem;
}

.legal-links {
    display: flex;
    gap: 25px;
}

.legal-item {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #94a3b8;
    font-size: 0.85rem;
    text-decoration: none;
    transition: 0.3s;
}

.legal-item:hover {
    color: #ffffff;
}

/* Mobile Responsive */
@media (max-width: 992px) {
    .footer-content {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 600px) {
    .footer-content {
        grid-template-columns: 1fr;
        text-align: center;
    }
    .footer-heading::after {
        left: 50%;
        transform: translateX(-50%);
    }
    .footer-bottom {
        flex-direction: column;
        gap: 20px;
        text-align: center;
    }
    .social-icons {
        justify-content: center;
    }
}
    .hero-main-flex {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 40px;
}
.hero-flex-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
    margin-bottom: 20px;
}
    .hero-flex-layout {
    display: flex;
    justify-content: space-between;
    align-items: flex-start; 
    gap: 30px;
    margin-top: 10px; 
    width: 100%;
}
.hero-image-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 2 columns mein dikhegi */
    gap: 0; /* Images ke beech ka gap */
    width: 100%;
    max-width: 300px; /* Grid ki total width yahan se control hogi */
    flex-shrink: 0;
}
.hero-text-side {
    flex: 1;
}
.hero-image-grid img {
    width: 90%; 
    height: 120px; 
    object-fit: cover; 
    background: #fff; 
    padding: 0px;
    margin: 0;
    border-radius:0;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

@media (max-width: 768px) {
    .hero-image-grid {
        grid-template-columns: repeat(2, 1fr);
        max-width: 100%;
        margin-top: 20px;
    }
          .hero-image-grid img {
        height: 80px; /* Mobile par thodi choti height */
    }

.hero-text-content {
    flex: 1; /* Left side text area */
}

.hero-image-content {
    flex: 1; /* Right side image area */
    display: flex;
    justify-content: flex-end;
}

.hero-image-content img {
    max-width: 80%;
    height: auto;
    border-radius: 8px;
}

/* Mobile par image ko wapas niche laane ke liye */
@media (max-width: 1024px) {
    .hero-flex-container {
        flex-direction: column;
    }
}
      `}


            </style>

            <div className="home-container">
                <div className="content-wrapper">
                    {/* Hero Section */}
                    <div className="hero-flex-layout">

                        <div className="hero-text-side">
                            <h1 className="hero-title">
                                Your best Media Player <br />
                                <span className="brand-name">WisePlayer</span>
                            </h1>

                            <div className="yellow-badge">MEDIA PLAYER, NO CHANNELS INCLUDED</div>

                            <div className="description-section">
                                <p>Experience ultimate entertainment with WisePlayer, your go-to application for enjoying playlists.</p>
                                <p>Download WisePlayer now from the Roku Store, LG TV Store, and Samsung TV Store!</p>
                            </div>
                            <div className="gray-disclaimer">
                                <p>No channels are included in the application. We are not responsible for the content.</p>
                            </div>
                        </div>

                        <div className="hero-image-content">
                            <div className="hero-image-grid">
                            <img src={img1} alt="LG Store" />
                            <img src={img2} alt="LGG Preview" />
                            <img src={img3} alt="Samsung Store" />
                            <img src={img4} alt="TV Preview" />
                        </div>
                    </div>
                     </div>
                    {/* Disclaimer Pink Section */}
                    <div className="red-section">
                        <div className="red-section-inner">
                            <h2 style={{ fontSize: '1rem', color: '#032241', marginBottom: '20px' }}>DISCLAIMER</h2>
                            <div className="grid-layout">
                                <div style={{ color: '#1a2b3c', lineHeight: '1.6' }}>
                                    <p>We have identified unauthorized websites replicating our platform... we are <b>not affiliated with us</b>.</p>
                                    <p>Our company operates <b>solely as a media player application</b>.</p>
                                </div>
                                <div>
                                    {[
                                        "WisePlayer does not provide content.",
                                        "No connections with third-party providers.",
                                        "Users supply their own content.",
                                        "No sale of IPTV subscriptions."
                                    ].map((item, i) => (
                                        <div key={i} className="bullet-item">
                                            <span className="bullet-icon">›</span>
                                            <p style={{ margin: 0, fontSize: '0.95rem' }}>{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FEATURES SECTION START */}
                    <div className="features-section">
                        <h2 className="features-title">Features</h2>
                        <div className="orange-bar"></div>
                        <p className="features-subtitle">The latest version of WisePlayer comes with a lot of stunning features :</p>

                        <div className="features-grid">
                            {featureData.map((feature, index) => (
                                <div key={index} className="feature-card">
                                    <div className="card-header">
                                        <span className="star-icon">★</span>
                                        <h3>{feature.title}</h3>
                                    </div>
                                    <p>{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* FEATURES SECTION END */}

                    {/* TRIAL & PRICING SECTION START */}
                    <div className="trial-banner">
                        <div className="trial-text">
                            <h2>Ready to dive in?</h2>
                            <p>Start your free 30 day trial today.</p>
                        </div>
                        <div className="logo-placeholder">
                            <h2 style={{ margin: 0, color: '#000' }}>🔥 Wise<br />Player</h2>
                        </div>
                    </div>

                    <div className="pricing-container">
                        <h2 className="pricing-title">Pricing plans</h2>
                        <div className="pricing-grid">
                            {/* 1 Year Plan */}
                            <div className="price-card">
                                <div className="popular-badge">MOST POPULAR</div>
                                <h4>1 Year</h4>
                                <div className="price-value">65.00 MAD <span style={{ fontSize: '1rem', color: '#666' }}>/year</span></div>
                                <p className="price-euro">~ 5.99 € <span style={{ fontSize: '0.8rem' }}>/year</span></p>
                                <button className="activate-btn">Activate 1 Year</button>
                            </div>

                            {/* Forever Plan */}
                            <div className="price-card">
                                <h4>Forever</h4>
                                <div className="price-value">162.00 MAD <span style={{ fontSize: '1rem', color: '#666' }}>/once</span></div>
                                <p className="price-euro">~ 14.99 € <span style={{ fontSize: '0.8rem' }}>/once</span></p>
                                <button className="activate-btn">Activate Forever</button>
                            </div>
                        </div>
                    </div>
                    {/* TRIAL & PRICING SECTION END */}

                    <div className="reseller-banner">
                        <div className="reseller-text">
                            <h2>Do you want to become a Reseller ?</h2>
                            <p>Discover our packs with exceptional discounts !</p>
                        </div>
                        <button className="reseller-btn">
                            <span style={{ fontSize: '1.2rem' }}>🏪</span>
                            Discover our packs
                        </button>
                    </div>
                    {/* RESELLER SECTION END */}

                    {/* FAQ SECTION START */}
                    <div className="faq-section">
                        <h2 className="faq-title">Frequently asked questions</h2>
                        <div className="faq-list">
                            {faqData.map((faq, index) => (
                                <div key={index} className="faq-card">
                                    <div className="faq-question">{faq.q}</div>
                                    <div className="faq-answer">{faq.a}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- ATTRACTIVE FOOTER START --- */}
                    <footer className="main-footer">
                        <div className="footer-content">
                            {/* Brand Section */}
                            <div className="footer-brand">
                                <div className="logo-wrap">
                                    <Flame color="#3b82f6" size={32} fill="#2563eb" />
                                    <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '800' }}>
                                        Wise<span style={{ color: '#2563eb' }}>Player</span>
                                    </h2>
                                </div>
                                <p>
                                    Ultimate Media Player experience for your smart devices.
                                    We provide the best interface to manage and enjoy your content
                                    globally with high performance.
                                </p>
                                <div className="social-icons">
                                    <div className="social-btn"><Facebook size={18} /></div>
                                    <div className="social-btn"><Twitter size={18} /></div>
                                    <div className="social-btn"><Instagram size={18} /></div>
                                    <div className="social-btn"><Linkedin size={18} /></div>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h3 className="footer-heading">Quick Links</h3>
                                <ul className="footer-links-list">
                                    <li><a href="#">Home Page</a></li>
                                    <li><a href="#">Download List</a></li>
                                    <li><a href="#">Activation</a></li>
                                    <li><a href="#">Become a Reseller</a></li>
                                </ul>
                            </div>

                            {/* Support Section */}
                            <div>
                                <h3 className="footer-heading">Support</h3>
                                <ul className="footer-links-list">
                                    <li><a href="#">Help Center</a></li>
                                    <li><a href="#">FAQ's</a></li>
                                    <li><a href="#">Tutorials</a></li>
                                    <li><a href="#">Device Setup</a></li>
                                </ul>
                            </div>

                            {/* Contact Info */}
                            <div>
                                <h3 className="footer-heading">Contact Us</h3>
                                <ul className="footer-links-list">
                                    <li style={{ display: 'flex', gap: '10px', color: '#94a3b8', fontSize: '0.95rem' }}>
                                        <Mail size={18} color="#2563eb" /> support@wiseplayer.com
                                    </li>
                                    <li style={{ display: 'flex', gap: '10px', color: '#94a3b8', fontSize: '0.95rem', marginTop: '15px' }}>
                                        <Phone size={18} color="#2563eb" /> +1 234 567 890
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Bottom Legal Strip */}
                        <div className="footer-bottom">
                            <div className="copyright-text">
                                © 2021 / 2026 <span style={{ color: '#fff', fontWeight: '600' }}>WisePlayer</span> - All rights reserved.
                            </div>

                            <div className="legal-links">
                                <a href="#" className="legal-item">
                                    <FileText size={16} /> Terms of online sale
                                </a>
                                <a href="#" className="legal-item">
                                    <ShieldCheck size={16} /> Privacy policy
                                </a>
                            </div>
                        </div>
                    </footer>
                    {/* --- ATTRACTIVE FOOTER END --- */}
                </div>
            </div>
        </>
    );
};

export default WisePlayerHome;