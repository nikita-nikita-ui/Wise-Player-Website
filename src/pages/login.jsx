import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, Spinner } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, User, Lock, ArrowRight, Shield, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { loginReseller } from '../auth/apiservice';
import { useDashboard } from '../context/dashboardContext';
import { useTranslation } from "react-i18next";
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { refetchDashboard } = useDashboard();
    const { setUserRole } = useAuth();

    const [view, setView] = useState('login');
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const showToast = (msg, type = "info") => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await loginReseller({ username, password });
        setLoading(false);

        if (result.success) {
            showToast('Success! Redirecting...', 'success');
            localStorage.setItem("user", JSON.stringify(result.data));
            setUserRole(result?.data?.role);
            localStorage.setItem('userName', username);
            await refetchDashboard();
            navigate('/dashboard');
        } else {
            showToast(result.message || 'Invalid credentials', 'error');
        }
    };

    const handleForgot = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            showToast('Reset link sent!', 'success');
        }, 1500);
    };

    return (
        <div className="auth-wrapper">

            <Container className="h-100 d-flex flex-column justify-content-between">

                <div className="flex-grow-1 d-flex align-items-center">
                    <Row className="justify-content-center w-100">
                        <Col xs={11} sm={8} md={6} lg={4}>

                            {/* LOGO */}
                            <motion.div
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="text-center mb-4"
                            >
                                <div className="logo-box">
                                    <Flame size={28} color="#ff5a5f" />
                                </div>

                                <h2 className="fw-bold mt-3">
                                    WISE <span className="brand">PLAYER</span>
                                </h2>

                                <div className="badge bg-dark mt-2 small">
                                    {t('reseller_portal')}
                                </div>
                            </motion.div>

                            {/* CARD */}
                            <motion.div className="auth-card">

                                <AnimatePresence mode="wait">

                                    {view === 'login' ? (
                                        <motion.div key="login">

                                            <h5 className="fw-bold mb-1">{t('sign_in_title')}</h5>

                                            {/* ✅ FIX 1: ADDED SPACE BELOW SUBTITLE */}
                                            <p className="text-muted small mb-4">
                                                {t('sign_in_subtitle')}
                                            </p>

                                            <Form onSubmit={handleLogin}>

                                                <Form.Group className="mb-3">
                                                    <InputGroup>
                                                        <InputGroup.Text><User size={15} /></InputGroup.Text>
                                                        <Form.Control
                                                            value={username}
                                                            onChange={(e) => setUsername(e.target.value)}
                                                            required
                                                        />
                                                    </InputGroup>
                                                </Form.Group>

                                                <Form.Group className="mb-3">
                                                    <InputGroup>
                                                        <InputGroup.Text><Lock size={15} /></InputGroup.Text>
                                                        <Form.Control
                                                            type={showPassword ? "text" : "password"}
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            required
                                                        />

                                                        {/* ✅ FIX 2: CLEAN EYE ICON ALIGNMENT */}
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            className="eye-btn"
                                                        >
                                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                                        </button>

                                                    </InputGroup>
                                                </Form.Group>

                                                <div className="text-end mb-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => setView('forgot')}
                                                        className="auth-link border-0 bg-transparent"
                                                    >
                                                        {t('forgot_password')}
                                                    </button>
                                                </div>

                                                <Button type="submit" disabled={loading} className="w-100 premium-btn">
                                                    {loading ? (
                                                        <Spinner size="sm" />
                                                    ) : (
                                                        <span className="d-flex align-items-center justify-content-center gap-2">
                                                            Sign In <ArrowRight size={16} />
                                                        </span>
                                                    )}
                                                </Button>
                                            </Form>

                                            <div className="text-center mt-3 small">
                                                Don’t have an account?{" "}
                                                <span className="auth-link" onClick={() => navigate('/register')}>
                                                    Register
                                                </span>
                                            </div>

                                        </motion.div>
                                    ) : (

                                        <motion.div key="forgot">

                                            <button
                                                onClick={() => setView('login')}
                                                className="auth-link d-flex align-items-center mb-3"
                                            >
                                                <ArrowLeft size={14} className="me-1" />
                                                {t('back_to_signin')}
                                            </button>

                                            <h5>Recover Password</h5>
                                            <p className="text-muted small">{t('recover_subtitle')}</p>

                                            <Form onSubmit={handleForgot}>
                                                <Form.Group className="mb-3">
                                                    <InputGroup>
                                                        <InputGroup.Text><User size={15} /></InputGroup.Text>
                                                        <Form.Control
                                                            value={username}
                                                            onChange={(e) => setUsername(e.target.value)}
                                                            required
                                                        />
                                                    </InputGroup>
                                                </Form.Group>

                                                <Button type="submit" disabled={loading} className="w-100 premium-btn">
                                                    {loading ? <Spinner size="sm" /> : t('btn_send_recovery')}
                                                </Button>
                                            </Form>

                                        </motion.div>
                                    )}

                                </AnimatePresence>

                            </motion.div>

                        </Col>
                    </Row>
                </div>

                {/* FOOTER */}
                <div className="footer-sec d-flex align-items-center justify-content-center gap-1 pb-3">
                    <Shield size={16} className="text-success" />
                    <span className="small fw-semibold footer-text">
                        Authorized Access Only
                    </span>
                </div>

            </Container>

            {toast && (
                <div className={`toast-custom ${toast.type}`}>
                    {toast.msg}
                </div>
            )}

            {/* FIXED STYLES ONLY */}
            <style>{`
                .auth-wrapper {
                    height: 100vh;
                    background: linear-gradient(135deg, #f8fafc, #fff1f2, #eef6ff);
                }

                .logo-box {
                    display: inline-block;
                    padding: 12px;
                    border-radius: 14px;
                    background: #111;
                }

                .brand { color: #ff5a5f; }

                .auth-card {
                    background: #fff;
                    padding: 24px;
                    border-radius: 18px;
                    box-shadow: 0 15px 40px rgba(0,0,0,0.08);
                }

                .premium-btn {
                    background: #000;
                    border: none;
                    padding: 11px;
                    font-weight: 600;
                    border-radius: 10px;
                }

                /* ✅ FIXED EYE ICON */
                .eye-btn {
                    border: none;
                    background: #f3f4f6;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0 12px;
                    cursor: pointer;
                    border-left: 1px solid #e5e7eb;
                }

                .eye-btn:hover {
                    background: #e5e7eb;
                }

                .auth-link {
                    font-size: 13px;
                    font-weight: 600;
                    color: #555;
                    cursor: pointer;
                }

                .auth-link:hover {
                    color: #000;
                    text-decoration: underline;
                }

                .footer-sec {
                    padding-bottom: 12px;
                }

                .toast-custom {
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    padding: 10px 18px;
                    border-radius: 10px;
                    color: #fff;
                }

                .toast-custom.success { background: #16a34a; }
                .toast-custom.error { background: #dc2626; }
            `}</style>

        </div>
    );
};

export default LoginPage;