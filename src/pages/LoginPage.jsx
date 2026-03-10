import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();
    const [mobile, setMobile] = useState('');
    
    const handleContinue = () => {
        if (mobile.length === 10) {
            navigate('/Home');
        } else {
            alert("Please enter a valid 10-digit number");
        }
    };

    return (
        <div className="login-wrapper">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');

                .login-wrapper {
                    min-height: 100vh;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: radial-gradient(circle at center, #2b0808 0%, #000000 100%);
                    font-family: 'Roboto', sans-serif;
                    color: white;
                    padding: 20px;
                    box-sizing: border-box;
                    position: relative;
                }

                .login-box {
                    width: 100%;
                    max-width: 450px;
                    padding: 40px;
                    text-align: left;
                    box-sizing: border-box;
                }

                .login-box h1 {
                    font-size: 40px;
                    font-weight: 800;
                    margin-bottom: 8px;
                    letter-spacing: -1px;
                    line-height: 1.1;
                }

                .subtitle {
                    color: #b3b3b3;
                    font-size: 18px;
                    margin-bottom: 30px;
                }

                .input-group {
                    margin-bottom: 15px;
                }

                .input-group input {
                    width: 100%;
                    padding: 16px;
                    background: rgba(22, 22, 22, 0.7);
                    border: 1px solid #444;
                    border-radius: 4px;
                    color: white;
                    font-size: 16px;
                    outline: none;
                    transition: border 0.2s;
                    box-sizing: border-box;
                }

                .input-group input:focus {
                    border: 1px solid #E50914;
                    background: rgba(45, 45, 45, 0.9);
                }

                .continue-btn {
                    width: 100%;
                    background: #E50914;
                    color: white;
                    border: none;
                    padding: 14px;
                    font-size: 18px;
                    font-weight: 700;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-top: 10px;
                    transition: 0.2s;
                }

                .continue-btn:hover {
                    background: #c11119;
                }

                .get-help {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    color: white;
                    font-size: 16px;
                    margin-top: 25px;
                    cursor: pointer;
                    font-weight: 500;
                }

                .recaptcha-text {
                    margin-top: 30px;
                    font-size: 13px;
                    color: #8c8c8c;
                    line-height: 1.4;
                }

                .recaptcha-text span {
                    color: #0071eb;
                    cursor: pointer;
                }

                .back-btn {
                    position: absolute;
                    top: 30px;
                    left: 30px;
                    color: #E50914;
                    font-weight: 900;
                    font-size: 24px;
                    cursor: pointer;
                    text-transform: uppercase;
                    z-index: 10;
                }

                /* --- Responsive Media Queries --- */

                @media (max-width: 600px) {
                    .login-box {
                        padding: 20px;
                    }

                    .login-box h1 {
                        font-size: 32px;
                    }

                    .subtitle {
                        font-size: 16px;
                    }

                    .back-btn {
                        top: 20px;
                        left: 20px;
                        font-size: 20px;
                    }
                }

                @media (max-width: 400px) {
                    .login-box h1 {
                        font-size: 28px;
                    }
                    
                    .input-group input {
                        padding: 14px;
                        font-size: 15px;
                    }

                    .continue-btn {
                        font-size: 16px;
                        padding: 12px;
                    }
                }
            `}</style>

            {/* Top Logo / Back Button */}
            <div className="back-btn" onClick={() => navigate('/')}>
                WisePlayer
            </div>

            <div className="login-box">
                <h1>Enter your info to sign in</h1>
                <p className="subtitle">Or get started with a new account.</p>

                <div className="input-group">
                    <input
                        type="number"
                        placeholder="Enter 10 digit mobile number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        onInput={(e) => e.target.value = e.target.value.slice(0, 10)}
                    />
                </div>

                <button className="continue-btn" onClick={handleContinue}>
                    Continue
                </button>

                {/* Optional Help Text (Aapke original design ko poora karne ke liye) */}
                <div className="recaptcha-text">
                    This page is protected by Google reCAPTCHA to ensure you're not a bot. <span>Learn more.</span>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;