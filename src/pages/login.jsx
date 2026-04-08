import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, Alert, Spinner } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, User, Lock, ArrowRight, ShieldCheck, ArrowLeft, KeyRound } from 'lucide-react'; // Mail ki jagah User
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { loginReseller } from '../auth/apiservice';
const LoginPage = () => {
    const navigate = useNavigate();
    const [view, setView] = useState('login');
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);
    const showToast = (msg, type = "info") => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };
    const [message, setMessage] = useState({ type: '', text: '' });

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => { // async कीवर्ड जोड़ा गया है
        e.preventDefault();
        setLoading(true);

        // const usernameRegex = /^[a-zA-Z0-9._]+$/;
        // if (!usernameRegex.test(username)) {
        //     setLoading(false);
        //     setMessage({
        //         type: 'danger',
        //         text: 'Username can only contain letters, numbers, underscores, and dots.'
        //     });
        //     return;
        // }

        // 2. Real API Call (Mock logic को हटाकर)
        const result = await loginReseller({ username, password });

        setLoading(false); // API response के बाद loading बंद

        if (result.success) {
            showToast('Success! Redirecting to dashboard...', 'success');
            localStorage.setItem('userName', username);
            setTimeout(() => {

                navigate('/dashboard');
            }, 1000);
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
            color: '#000',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #ffffff 0%, #fff5f5 50%, #f0f7ff 100%)',
        }}>

            {/* Background Decorative Elements (Retained) */}
            <div className="position-absolute w-100 h-100" style={{ zIndex: 0, pointerEvents: 'none' }}>
                <div style={{
                    position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px',
                    background: 'radial-gradient(circle, rgba(220,53,69,0.03) 0%, rgba(255,255,255,0) 70%)',
                }}></div>
                <div style={{
                    position: 'absolute', bottom: '-5%', left: '-5%', width: '400px', height: '400px',
                    background: 'radial-gradient(circle, rgba(0,0,0,0.02) 0%, rgba(255,255,255,0) 70%)',
                }}></div>
            </div>

            <Container style={{ zIndex: 1 }}>
                <Row className="justify-content-center">
                    <Col md={7} lg={5}>
                        <motion.div
                            initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="text-center mb-5"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }} className="d-inline-block p-3 mb-3"
                                style={{ background: '#000', borderRadius: '22px', boxShadow: '0 15px 35px rgba(0,0,0,0.15)' }}
                            >
                                <Flame size={35} color="#dc3545" fill="#dc3545" />
                            </motion.div>
                            <h1 className="fw-black m-0 mt-2" style={{ letterSpacing: '-2px', fontWeight: 900, fontSize: '2.2rem' }}>
                                WISE <span style={{ color: '#dc3545' }}>PLAYER</span>
                            </h1>
                            <div className="badge bg-dark px-3 py-2 mt-2" style={{ fontSize: '10px', borderRadius: '100px', letterSpacing: '1px' }}>
                                RESELLER PORTAL
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            whileHover={{ boxShadow: '0 40px 80px rgba(0,0,0,0.15)', borderColor: '#000' }}
                            style={{
                                background: '#fff', padding: '45px 40px', borderRadius: '32px',
                                boxShadow: '0 30px 60px rgba(220,53,69,0.15)', border: '1px solid #f0f0f0',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                        >
                            <AnimatePresence mode="wait">
                                {view === 'login' ? (
                                    <motion.div key="login" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                                        <div className="mb-4">
                                            <h3 className="fw-bold mb-1">Sign In</h3>
                                            <p className="text-muted small">Access your reseller dashboard</p>
                                        </div>

                                        {/* {message.text && (
                                            <Alert variant={message.type} className="py-2 small border-0 mb-4" style={{ borderRadius: '12px' }}>
                                                {message.text}
                                            </Alert>
                                        )} */}

                                        <Form onSubmit={handleLogin}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="small fw-bold text-dark ms-1">Username</Form.Label>
                                                <InputGroup className="custom-input">
                                                    <InputGroup.Text className="bg-transparent border-end-0">
                                                        <User size={18} className="text-muted" />
                                                    </InputGroup.Text>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Username"
                                                        required
                                                        className="border-start-0 ps-0 shadow-none"
                                                        value={username}
                                                        onChange={(e) => setUsername(e.target.value)}
                                                    />
                                                </InputGroup>
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label className="small fw-bold text-dark ms-1">Password</Form.Label>
                                                <InputGroup className="custom-input">
                                                    <InputGroup.Text className="bg-transparent border-end-0">
                                                        <Lock size={18} className="text-muted" />
                                                    </InputGroup.Text>
                                                    <Form.Control
                                                        type="password" placeholder="••••••••" required
                                                        className="border-start-0 ps-0 shadow-none"
                                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                </InputGroup>
                                            </Form.Group>

                                            <div className="text-end mb-4">
                                                <button type="button" onClick={() => { setView('forgot'); setMessage({ type: '', text: '' }); }} className="btn btn-link p-0 small  text-decoration-none text-white hover-red">
                                                    Forgot password?
                                                </button>
                                            </div>

                                            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                                                <Button type="submit" disabled={loading} className="w-100 py-3 border-0 d-flex align-items-center justify-content-center shadow-lg premium-btn">
                                                    {loading ? <Spinner animation="border" size="sm" /> : (
                                                        <><span className="me-2">SIGN IN TO PORTAL</span><ArrowRight size={18} /></>
                                                    )}
                                                </Button>
                                            </motion.div>
                                        </Form>
                                    </motion.div>
                                ) : (
                                    <motion.div key="forgot" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                                        <button onClick={() => { setView('login'); setMessage({ type: '', text: '' }); }} className="btn btn-link p-0 mb-4 text-white hover-red text-decoration-none small d-flex align-items-center fw-bold">
                                            <ArrowLeft size={16} className="me-2" /> Back to Sign In
                                        </button>
                                        <div className="mb-4">
                                            <div className="p-3 bg-light d-inline-block rounded-circle mb-3"><KeyRound size={24} className="text-dark" /></div>
                                            <h3 className="fw-bold mb-1">Recover Password</h3>
                                            <p className="text-muted small">We'll send a recovery link to your username contact.</p>
                                        </div>
                                        <Form onSubmit={handleForgot}>
                                            <Form.Group className="mb-4">
                                                <Form.Label className="small fw-bold text-dark ms-1">Username</Form.Label>
                                                <InputGroup className="custom-input">
                                                    <InputGroup.Text className="bg-transparent border-end-0"><User size={18} className="text-muted" /></InputGroup.Text>
                                                    <Form.Control type="text" placeholder="Username" required className="border-start-0 ps-0 shadow-none" />
                                                </InputGroup>
                                            </Form.Group>
                                            <Button type="submit" disabled={loading} className="w-100 py-3 bg-dark border-0 fw-bold" style={{ borderRadius: '14px' }}>
                                                {loading ? <Spinner animation="border" size="sm" /> : 'SEND RECOVERY LINK'}
                                            </Button>
                                        </Form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <motion.div style={{ color: '#ffffff' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-center mt-5">
                            <div className="d-flex align-items-center justify-content-center text-muted gap-2" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                                <ShieldCheck size={14} className="text-success" />
                                <span style={{ color: '#fff' }} className="text-uppercase fw-bold">Authorized Access Only</span>
                            </div>
                            {/* <p className="mt-4 text-muted" style={{ color: '#fff' ,fontSize: '10px', opacity: 0.6 }}>
                                &copy; {new Date().getFullYear()} WISE PLAYER GLOBAL LTD. <br />
                               
                            </p> */}
                        </motion.div>

                    </Col>
                </Row>
            </Container>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap');
                .custom-input .input-group-text, .custom-input .form-control { background-color: #fcfcfc !important; border: 1.5px solid #eee !important; padding: 12px 15px; transition: all 0.3s ease; }
                .custom-input .form-control { border-radius: 0 14px 14px 0 !important; font-size: 15px; }
                .custom-input .input-group-text { border-radius: 14px 0 0 14px !important; }
                .custom-input .form-control:focus { border-color: #000 !important; background-color: #fff !important; }
                .premium-btn { background: #000 !important; border-radius: 14px !important; font-weight: 800 !important; font-size: 14px !important; letter-spacing: 1px !important; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important; }
                .premium-btn:hover { background: #c5a0a0 !important; transform: translateY(-3px) scale(1.01); box-shadow: 0 15px 30px rgba(167, 97, 207, 0.2), 0 0 10px rgba(100, 200, 214, 0.3) !important; color: #fff !important; }
                .hover-red:hover { color: #dc3545 !important; }
                .bg-dark { background-color: #000 !important; }
            `}</style>
            {toast && (
                <div style={{
                    position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
                    background: toast.type === 'error' ? '#dc3545' : '#198754',
                    color: '#fff', padding: '12px 28px', borderRadius: '12px',
                    fontWeight: '700', fontSize: '0.9rem', zIndex: 99999,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)', whiteSpace: 'nowrap'
                }}>
                    {toast.msg}
                </div>
            )}
        </div>
    );
};

export default LoginPage;