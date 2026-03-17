import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Accordion, Navbar, Nav } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Flame, ShieldCheck, Zap, Monitor, Search,
    Lock, List, Star, CheckCircle, Smartphone,
    ArrowRight, Globe, Mail, Phone, Facebook, Twitter, Instagram, AlertTriangle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// --- Typewriter Component ---
const Typewriter = ({ texts }) => {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [reverse, setReverse] = useState(false);

    useEffect(() => {
        if (subIndex === texts[index].length + 1 && !reverse) {
            setTimeout(() => setReverse(true), 1500);
            return;
        }
        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => (prev + 1) % texts.length);
            return;
        }
        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, reverse ? 75 : 150);
        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse, texts]);

    return (
        <span className="typewriter-text">
            {texts[index].substring(0, subIndex)}
            {/* <span className="cursor">|</span> */}
        </span>
    );
};

// Animation Variants
const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
};

const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } }
};

const WisePlayerHome = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    return (
        <div style={{ backgroundColor: '#f4f4f7', color: '#1a1a1a', overflowX: 'hidden', minHeight: '100vh' }}>
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Inter:wght@300;400;600;700;800&display=swap');
                
                body { font-family: 'Inter', sans-serif; background-color: #f4f4f7; }
                h1, h2, h3, .brand-font { font-family: 'Syncopate', sans-serif; text-transform: uppercase; letter-spacing: 3px; }

                /* TV Mockup Styling */
                .tv-frame {
                    background: #000;
                    padding: 12px;
                    border-radius: 20px;
                    box-shadow: 0 50px 100px -20px rgba(0,0,0,0.3);
                    border: 4px solid #222;
                    position: relative;
                }
                .tv-screen {
                    background: #111;
                    border-radius: 10px;
                    overflow: hidden;
                    aspect-ratio: 16/9;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .tv-stand {
                    width: 120px;
                    height: 10px;
                    background: #333;
                    margin: 0 auto;
                    border-bottom-left-radius: 20px;
                    border-bottom-right-radius: 20px;
                }

                .glass-card {
                    background: #ffffff;
                    border: 1px solid rgba(0,0,0,0.05);
                    border-radius: 24px;
                    transition: all 0.4s ease;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.03);
                }

                .glass-card:hover {
                    border-color: #ff0000;
                    box-shadow: 0 25px 50px rgba(255, 0, 0, 0.08);
                    transform: translateY(-8px);
                }

                .typewriter-text {
                    color: #ff0000;
                    font-weight: 800;
                }

                .cursor {
                    display: inline-block;
                    width: 3px;
                    background-color: #000;
                    margin-left: 5px;
                    animation: blink 1s infinite;
                }

                @keyframes blink {
                    0% { opacity: 1; }
                    50% { opacity: 0; }
                    100% { opacity: 1; }
                }

                .hero-section {
                    padding: 160px 0 120px 0;
                    background: linear-gradient(135deg, #f4f4f7 0%, #e9eaef 100%);
                }

                .btn-premium {
                    background: #000;
                    border: none;
                    padding: 16px 40px;
                    font-weight: 700;
                    border-radius: 12px;
                    color: white;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    transition: 0.4s;
                }

                .btn-premium:hover {
                    background: #ff0000;
                    box-shadow: 0 15px 30px rgba(255, 0, 0, 0.25);
                    color: white;
                    transform: scale(1.02);
                }

                .nav-link-custom {
                    color: #1a1a1a !important;
                    font-weight: 700;
                    text-transform: uppercase;
                    font-size: 0.8rem;
                    margin: 0 15px;
                    opacity: 0.7;
                    transition: 0.3s;
                }

                .nav-link-custom:hover { opacity: 1; color: #ff0000 !important; }

                .accordion-button { background-color: #fff !important; font-weight: 700; padding: 20px; }
                .accordion-item { border: none !important; margin-bottom: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.02); border-radius: 15px !important; overflow: hidden; }
                
                ::-webkit-scrollbar { width: 10px; }
                ::-webkit-scrollbar-track { background: #f4f4f7; }
                ::-webkit-scrollbar-thumb { background: #000; border-radius: 10px; }

                .contact-link { transition: 0.3s; }
.contact-link:hover { color: #ff0000 !important; transform: translateX(-5px); }
.hover-red-text:hover { color: #ff0000 !important; }

/* Background & Layout */
.disclaimer-area {
    background-color: #f1e5ec; /* Light pink tint */
    font-family: 'Poppins', sans-serif;
    overflow: hidden;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
}

.disclaimer-heading {
    font-weight: 800;
    color: #1e2749;
    font-size: 1.8rem;
    letter-spacing: 1px;
}

.info-box p {
    font-size: 0.95rem;
    line-height: 1.5;
    color: #444;
}

/* List Styling */
.clean-list {
    list-style: none;
    padding: 0;
}

.list-point {
    font-size: 0.9rem;
    color: #333;
    padding: 8px 12px;
    margin-bottom: 5px;
    border-radius: 6px;
    transition: all 0.3s ease-in-out;
    display: flex;
    align-items: center;
}

/* Hover Effect */
.list-point:hover {
    background: #ffffff;
    transform: scale(1.02);
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    color: #e91e63; /* Pink highlight on hover */
}

.arrow {
    color: #ff5252;
    margin-right: 12px;
    font-size: 12px;
}

/* Animations */
@keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes slideLeft {
    from { opacity: 0; transform: translateX(-30px); }
    to { opacity: 1; transform: translateX(0); }
}

@keyframes slideRight {
    from { opacity: 0; transform: translateX(30px); }
    to { opacity: 1; transform: translateX(0); }
}

.animate-up { animation: slideUp 0.8s ease-out; }
.animate-left { animation: slideLeft 1s ease-out; }
.animate-right { animation: slideRight 1s ease-out; }
                `}
            </style>



            {/* --- HERO SECTION --- */}
            <section className="hero-section">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={6} className="text-center text-lg-start">
                            <motion.div initial="initial" animate="whileInView" variants={staggerContainer}>
                                <motion.div variants={fadeInUp}>
                                    <Badge className="mb-4 px-3 py-2 text-dark" style={{ background: 'rgba(0,0,0,0.05)', borderRadius: '100px', fontWeight: '700' }}>
                                        <span className="text-danger">●</span> SYSTEM ONLINE V2.0
                                    </Badge>
                                </motion.div>
                                <motion.h1 variants={fadeInUp} className="display-4 fw-bold mb-4" style={{ color: '#000', lineHeight: 1.2 }}>
                                    {t('futureIs')} <br />
                                    <Typewriter texts={["Ultra Fast", "Crystal Clear", "Wise Player"]} />
                                    {/* NOTE: Typewriter ke andar "Ultra Fast", etc. ke liye bhi JSON key chahiye */}
                                </motion.h1>
                                <motion.p variants={fadeInUp} className="lead mb-5 opacity-75" style={{ fontWeight: '400', maxWidth: '500px' }}>
                                    {t('experienceText')}
                                </motion.p>
                                <motion.div variants={fadeInUp} className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
                                    <Button className="btn-premium">{t('freeTrial')}</Button>
                                    <Button variant="outline-dark" className="px-4 py-3 border-2 fw-bold" style={{ borderRadius: '12px' }}>{t('tutorial')}</Button>
                                </motion.div>
                            </motion.div>
                        </Col>
                        <Col lg={6} className="mt-5 mt-lg-0">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, type: 'spring' }}
                                className="px-3"
                            >
                                <div className="tv-frame">
                                    <div className="tv-screen">
                                        {/* Better Mockup Image */}
                                        <img
                                            src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=2070&auto=format&fit=crop"
                                            alt="WisePlayer UI"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                                        />
                                        <div style={{ position: 'absolute', color: 'white', textAlign: 'center' }}>
                                            <Flame size={60} color="#ff0000" fill="#ff0000" className="mb-2" />
                                            <h4 className="brand-font mb-0">WISE PLAYER</h4>
                                            <p className="small opacity-50">Ready to Stream</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="tv-stand"></div>
                            </motion.div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section class="disclaimer-area py-4">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-12 mb-3 animate-up">
                            <h2 class="disclaimer-heading">{t('disclaimerHeading')}</h2> {/* **BADLAV 1** */}
                        </div>

                        <div class="col-lg-5 mb-4 animate-left">
                            <div class="info-box">
                                <p class="text-muted">
                                    {t('disclaimerText1')} {/* **BADLAV 2** */}
                                </p>
                            </div>
                        </div>

                        <div class="col-lg-7 animate-right">
                            <ul class="clean-list">
                                <li class="list-point">
                                    <span class="arrow">➤</span>
                                    {t('disclaimerPoint1')} {/* **BADLAV 3** */}
                                </li>
                                <li class="list-point">
                                    <span class="arrow">➤</span>
                                    {t('disclaimerPoint2')} {/* **BADLAV 4** */}
                                </li>
                                <li class="list-point">
                                    <span class="arrow">➤</span>
                                    {t('disclaimerPoint3')} {/* **BADLAV 5** */}
                                </li>
                                <li class="list-point">
                                    <span class="arrow">➤</span>
                                    {t('disclaimerPoint4')} {/* **BADLAV 6** */}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            {/* --- FEATURES --- */}
            <section className="py-5">
                <Container>
                    <div className="text-center mb-5">
                        <h6 className="text-danger fw-bold letter-spacing-2">{t('featureHeadingParent')}</h6> {/* **BADLAV** */}
                        <h2 className="fw-bold">{t('featureHeadingChild')}</h2> {/* **BADLAV** */}
                    </div>
                    <Row>
                        {[
                            { icon: <Zap />, title: t('feature1Title'), desc: t('feature1Desc') }, // **BADLAV**
                            { icon: <ShieldCheck />, title: t('feature2Title'), desc: t('feature2Desc') }, // **BADLAV**
                            { icon: <Monitor />, title: t('feature3Title'), desc: t('feature3Desc') } // **BADLAV**
                        ].map((item, i) => (
                            <Col md={4} key={i} className="mb-4">
                                <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="glass-card p-5 text-center h-100">
                                    <div className="mb-4" style={{ color: '#ff0000' }}>{item.icon}</div>
                                    <h5 className="fw-bold mb-3">{item.title}</h5>
                                    <p className="text-muted small mb-0">{item.desc}</p>
                                </motion.div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* --- CTA SECTION (Hot Player) --- */}
            <section className="py-5 overflow-hidden">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 p-md-5 rounded-4 shadow-sm border d-flex flex-column flex-md-row align-items-center justify-content-between position-relative overflow-hidden"
                        style={{
                            background: 'linear-gradient(90deg, #fff5f5 0%, #ffffff 50%, #fff0f6 100%)',
                            borderColor: '#ffccd5',
                            cursor: 'pointer'
                        }}
                    >
                        {/* Background Decorative Glow */}
                        <div className="position-absolute top-0 end-0 p-5 opacity-10" style={{ backgroundColor: '#ff0000', filter: 'blur(80px)', borderRadius: '50%', width: '200px', height: '200px' }}></div>
                        <div className="text-center text-md-start mb-4 mb-md-0">
                            <motion.h2
                                initial={{ x: -20 }}
                                whileInView={{ x: 0 }}
                                className="fw-bold mb-2"
                                style={{ color: '#2d3436' }}
                            >
                                {t('cta_dive_in')}
                            </motion.h2>
                            <motion.h4
                                initial={{ x: -20 }}
                                whileInView={{ x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="fw-bold"
                                style={{ color: '#ff4d6d' }} // Pinkish Red
                            >
                                {t('cta_trial_text')}
                            </motion.h4>
                        </div>

                        <motion.div
                            className="d-flex align-items-center"
                            whileHover={{ rotate: [0, -5, 5, 0] }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Flame Icon */}
                            <div className="me-3">
                                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.6569 16.6569C16.7202 17.5935 15.4202 18.1569 14 18.1569C12.5798 18.1569 11.2798 17.5935 10.3431 16.6569C9.40645 15.7202 8.84308 14.4202 8.84308 13C8.84308 11.5798 9.40645 10.2798 10.3431 9.34315C11.2798 8.40645 12.5798 7.84308 14 7.84308C15.4202 7.84308 16.7202 8.40645 17.6569 9.34315M17.6569 16.6569C18.5935 15.7202 19.1569 14.4202 19.1569 13C19.1569 11.5798 18.5935 10.2798 17.6569 9.34315M17.6569 16.6569L21 20M17.6569 9.34315L21 6" stroke="#ff4d6d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 2C12 2 11 5 8 8C5 11 5 15 5 15C5 18.866 8.13401 22 12 22C15.866 22 19 18.866 19 15C19 11 15 8 12 2Z" fill="url(#paint0_linear)" />
                                    <defs>
                                        <linearGradient id="paint0_linear" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#ff0000" />
                                            <stop offset="1" stopColor="#ff4d6d" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <div className="lh-1">
                                <span className="d-block fs-3 fw-light" style={{ color: '#636e72', letterSpacing: '1px' }}>Wise</span>
                                <span className="d-block fs-2 fw-bold" style={{ color: '#000' }}>Player</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </Container>
            </section>

            {/* --- PRICING --- */}
            <section className="py-5" style={{ background: '#ebecee' }}>
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={4} md={6} className="mb-4">
                            <Card className="glass-card p-5 border-0 h-100">
                                <h5 className="fw-bold">{t('price_standard_title')}</h5>
                                <h2 className="display-5 fw-bold my-4">€ 5.99</h2>
                                <p className="text-muted small mb-4">{t('price_standard_desc')}</p>
                                <div className="mb-5">
                                    <div className="d-flex align-items-center mb-2"><CheckCircle size={16} className="me-2 text-danger" /> <span>{t('price_year_access')}</span></div>
                                    <div className="d-flex align-items-center mb-2"><CheckCircle size={16} className="me-2 text-danger" /> <span>{t('price_email_support')}</span></div>
                                </div>
                                <Button variant="outline-dark" className="w-100 py-3 fw-bold rounded-3">{t('price_get_started')}</Button>
                            </Card>
                        </Col>
                        <Col lg={4} md={6} className="mb-4">
                            <Card className="glass-card p-5 border-0 h-100 text-white" style={{ background: '#000' }}>
                                <Badge bg="danger" className="mb-3 w-50">{t('price_lifetime_badge')}</Badge>
                                <h5 className="fw-bold">{t('price_pro_title')}</h5>
                                <h2 className="display-5 fw-bold my-4">€ 14.99</h2>
                                <p className="text-white-50 small mb-4">{t('price_pro_desc')}</p>
                                <div className="mb-5">
                                    <div className="d-flex align-items-center mb-2"><CheckCircle size={16} className="me-2 text-danger" /> <span>{t('price_permanent_license')}</span></div>
                                    <div className="d-flex align-items-center mb-2"><CheckCircle size={16} className="me-2 text-danger" /> <span>{t('price_priority_updates')}</span></div>
                                    <div className="d-flex align-items-center mb-2"><CheckCircle size={16} className="me-2 text-danger" /> <span>{t('price_247_support')}</span></div>
                                </div>
                                <Button className="btn-premium w-100 py-3">{t('price_activate_lifetime')}</Button>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* --- FAQ --- */}
            <Container className="py-5 my-5">
                <Row className="justify-content-center">
                    <Col lg={8}>
                        <h2 className="text-center fw-bold mb-5">Frequently Asked</h2>
                        <Accordion flush>

                            {/* NOTE: The first item in the original file was an Accordion.Body without an Item header, which is invalid JSX structure. Assuming it should be the first Item. */}
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>{t('faq_mac_title')}</Accordion.Header>
                                <Accordion.Body>
                                    {t('faq_mac_answer')}
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="1">
                                <Accordion.Header>{t('faq_transfer_title')}</Accordion.Header>
                                <Accordion.Body>
                                    {t('faq_transfer_answer')}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>

                        {/* --- ANIMATION BOX AFTER QUESTIONS --- */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="mt-5 p-4 glass-card"
                            style={{
                                background: 'linear-gradient(180deg, #ffffff 0%, #f9f9fb 100%)',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                border: '1px solid rgba(0,0,0,0.05)'
                            }}
                        >
                            <div className="row align-items-center">
                                {/* <Col md={7} className="text-center text-md-start mb-4 mb-md-0">
            <h4 className="fw-bold mb-3" style={{ color: '#000' }}>Still have questions?</h4>
            <p className="text-muted mb-4">Join thousands of users who are already enjoying the best streaming experience </p>
            <Button variant="dark" className="px-4 py-2 rounded-3 shadow-sm">Contact Support</Button>
        </Col> */}



                            </div>
                        </motion.div>
                    </Col>
                </Row>
            </Container>

            {/* --- FOOTER --- */}
              <footer className="py-5" style={{ background: '#fff', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                <Container>
                    <Row className="gy-5 justify-content-between">
                        {/* 1. BRAND SECTION */}
                        <Col lg={5} md={12}>
                            <div className="mb-4">
                                <h4 className="fw-bold brand-font d-flex align-items-center mb-3">
                                    <Flame color="#ff0000" fill="#ff0000" className="me-2" size={28} />
                                    WISEPLAYER
                                </h4>
                                <p className="text-muted pe-lg-5" style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
                                    {t('footerBrandText')} {/* **CHANGE HERE** */}
                                </p>
                            </div>
                        </Col>

                        {/* 2. SUPPORT SECTION */}
                        <Col lg={4} md={7}>
                            <h6 className="fw-bold mb-4 text-uppercase" style={{ letterSpacing: '1px', fontSize: '0.85rem' }}>
                                {t('support')} {/* **CHANGE HERE (from 'Support')** */}
                            </h6>
                            <div className="d-flex flex-column gap-3">

                                {/* Reseller Row */}
                                <div className="pb-2 border-bottom border-light">
                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                        <span className="text-muted fw-bold" style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>{t('reseller')}</span> {/* **CHANGE HERE (from 'OFFICIAL RESELLER')** */}
                                        <a href="https://wa.me/212755015558" target="_blank" rel="noreferrer"
                                            className="text-decoration-none text-dark fw-bold small d-flex align-items-center contact-link">
                                            <Phone size={14} className="me-2 text-success" /> +212 755-015558
                                        </a>
                                    </div>
                                </div>

                                {/* Support Row */}
                                <div className="pb-2 border-bottom border-light">
                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                        <span className="text-muted fw-bold" style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>{t('customerSupport')}</span> {/* **CHANGE HERE (from 'CUSTOMER SUPPORT')** */}
                                        <a href="https://wa.me/212777754774" target="_blank" rel="noreferrer"
                                            className="text-decoration-none text-dark fw-bold small d-flex align-items-center contact-link">
                                            <Phone size={14} className="me-2 text-success" /> +212 777-754774
                                        </a>
                                    </div>
                                </div>

                                {/* Policy Links */}
                                <div className="d-flex gap-4 mt-2">
                                    <a href="#" className="text-decoration-none text-muted small hover-red-text fw-semibold">{t('privacyPolicy')}</a> {/* **CHANGE HERE (from 'Privacy Policy')** */}
                                    <a href="#" className="text-decoration-none text-muted small hover-red-text fw-semibold">{t('refundPolicy')}</a> {/* **CHANGE HERE (from 'Refund Policy')** */}
                                </div>
                            </div>
                        </Col>

                        {/* 3. SOCIAL SECTION */}
                        <Col lg={2} md={5} className="text-center text-lg-end">
                            <div className="d-inline-block text-center">
                                <h6 className="fw-bold mb-4 text-uppercase" style={{ letterSpacing: '1px', fontSize: '0.85rem' }}>
                                    {t('socialMedia')} {/* **CHANGE HERE (from 'Social')** */}
                                </h6>
                                <div className="d-flex gap-3 justify-content-center">
                                    <a href="#" className="social-icon-wrapper">
                                        <Instagram size={20} />
                                    </a>
                                    <a href="#" className="social-icon-wrapper">
                                        <Twitter size={20} />
                                    </a>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <hr className="my-5 opacity-10" />

                    <div className="text-center text-muted small fw-bold" style={{ letterSpacing: '2px' }}>
                        © 2026 WISEPLAYER — {t('beyondTheScreen')}. {/* **CHANGE HERE (from hardcoded text)** */}
                    </div>
                </Container>

                {/* Footer Icons ke liye extra CSS */}
                <style>{`
        .social-icon-wrapper {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            background: #f4f4f7;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #1a1a1a;
            transition: all 0.3s ease;
            text-decoration: none;
        }
        .social-icon-wrapper:hover {
            background: #000;
            color: #fff;
            transform: translateY(-3px);
        }
        .contact-link:hover {
            color: #ff0000 !important;
        }
    `}</style>
            </footer>
        </div>
    );
};

export default WisePlayerHome;