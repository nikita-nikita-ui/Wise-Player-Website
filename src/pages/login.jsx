import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, Spinner } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, User, Lock, ArrowRight, ShieldCheck, ArrowLeft, KeyRound, Eye, EyeOff } from 'lucide-react';
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
            showToast('Success! Redirecting to dashboard...', 'success');
            // ✅ store full user (VERY IMPORTANT)
            localStorage.setItem("user", JSON.stringify(result.data));
            // ✅ set role correctly
            setUserRole(result?.data?.role);
            // ✅ optional (your existing)
            localStorage.setItem('userName', username);
            // ✅ wait for dashboard fetch
            await refetchDashboard();
            // ✅ then navigate
            navigate('/dashboard');
        } else {
            showToast(result.message || 'Invalid credentials. Please try again.', 'error');
        }
    };

    const handleForgot = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            showToast('Reset link has been sent to your registered account.', 'success');
        }, 1500);
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            fontFamily: "'Inter', sans-serif",
            background: 'linear-gradient(135deg, #ffffff 0%, #fff5f5 50%, #f0f7ff 100%)',
        }}>

            {/* Background */}
            <div className="position-absolute w-100 h-100" style={{ zIndex: 0 }}>
                <div style={{
                    position: 'absolute', top: '-10%', right: '-5%',
                    width: '500px', height: '500px',
                    background: 'radial-gradient(circle, rgba(220,53,69,0.03), transparent)'
                }} />
                <div style={{
                    position: 'absolute', bottom: '-5%', left: '-5%',
                    width: '400px', height: '400px',
                    background: 'radial-gradient(circle, rgba(0,0,0,0.02), transparent)'
                }} />
            </div>

            <Container style={{ zIndex: 1 }}>
                <Row className="justify-content-center">
                    <Col md={7} lg={5}>

                        {/* Logo */}
                        <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-5">
                            <div className="d-inline-block p-3 mb-3" style={{ background: '#000', borderRadius: '20px' }}>
                                <Flame size={30} color="#dc3545" />
                            </div>
                            <h1 style={{ fontWeight: 900 }}>
                                WISE <span style={{ color: '#dc3545' }}>PLAYER</span>
                            </h1>
                            <div className="badge bg-dark mt-2">{t('reseller_portal')}</div>
                        </motion.div>

                        {/* Card */}
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            style={{
                                background: '#fff',
                                padding: '40px',
                                borderRadius: '20px',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
                            }}
                        >
                            <AnimatePresence mode="wait">

                                {/* LOGIN */}
                                {view === 'login' ? (
                                    <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                                        <h3 className="fw-bold">{t('sign_in_title')}</h3>
                                        <p className="text-muted small">{t('sign_in_subtitle')}</p>

                                        <Form onSubmit={handleLogin}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Username</Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Text><User size={16} /></InputGroup.Text>
                                                    <Form.Control
                                                        value={username}
                                                        onChange={(e) => setUsername(e.target.value)}
                                                        required
                                                    />
                                                </InputGroup>
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>{t('password')}</Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Text><Lock size={16} /></InputGroup.Text>
                                                    <Form.Control
                                                        type={showPassword ? "text" : "password"}
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        required
                                                    />
                                                    <InputGroup.Text
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    >
                                                        {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                                                    </InputGroup.Text>
                                                </InputGroup>
                                            </Form.Group>

                                            {/* Forgot Password */}
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
                                                {loading ? <Spinner size="sm" /> : <>Sign In <ArrowRight size={16} /></>}
                                            </Button>
                                        </Form>
                                    </motion.div>
                                ) : (

                                    /* FORGOT PASSWORD */
                                    <motion.div key="forgot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                                        <button
                                            onClick={() => setView('login')}
                                            className="auth-link border-0 bg-transparent d-flex align-items-center mb-3"
                                        >
                                            <ArrowLeft size={16} className="me-2" />
                                            {t('back_to_signin')}
                                        </button>

                                        <h3>Recover Password</h3>
                                        <p className="text-muted small">{t('recover_subtitle')}</p>

                                        <Form onSubmit={handleForgot}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>{t('username')}</Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Text><User size={16} /></InputGroup.Text>
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

                        {/* Footer */}
                        <div className="text-center mt-4 small text-muted">
                            <ShieldCheck size={14} className="text-success me-1" />
                            {t('authorized_only')}
                        </div>

                    </Col>
                </Row>
            </Container>

            {/* Toast */}
            {toast && (
                <div style={{
                    position: 'fixed',
                    top: 20,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: toast.type === 'error' ? '#dc3545' : '#198754',
                    color: '#fff',
                    padding: '10px 20px',
                    borderRadius: '10px'
                }}>
                    {toast.msg}
                </div>
            )}

            {/* Styles */}
            <style>{`
                .premium-btn {
                    background: #000;
                    color: #fff;
                    border: none;
                    padding: 12px;
                    font-weight: 600;
                    border-radius: 10px;
                }

                .premium-btn:hover {
                    background: #222;
                }

                .auth-link {
                    font-size: 13px;
                    font-weight: 600;
                    color: #555;
                    text-decoration: none;
                    transition: all 0.2s ease;
                }

                .auth-link:hover {
                    color: #000;
                    text-decoration: underline;
                }
            `}</style>
        </div>
    );
};

export default LoginPage;