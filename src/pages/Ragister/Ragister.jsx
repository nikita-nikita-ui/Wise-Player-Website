

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerReseller } from '../../auth/apiservice';
import './Ragister.css';
import logo from '../../assets/logo.png';
import { useTranslation } from "react-i18next";
const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const validations = {
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    hasNumber: /\d/.test(password),
    hasLower: /[a-z]/.test(password),
    hasUpper: /[A-Z]/.test(password),
    isLengthValid: password.length >= 8,
    usernameLength: username.length >= 1 && username.length <= 30,
    usernameAllowedChars: /^[a-zA-Z0-9._]*$/.test(username),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validations.hasSpecial || !validations.hasNumber || !validations.hasLower || !validations.hasUpper || !validations.isLengthValid) {
      setError(t("reg_err_pass_req")); return;
    }
    if (!validations.usernameLength || !validations.usernameAllowedChars) {
      setError(t("reg_err_user_format")); return;
    }
    if (password !== confirmPassword) {
      setError(t("reg_err_mismatch")); return;
    }
    if (!agree) {
      setError(t("reg_err_terms")); return;
    }

    const formData = { fullName, username, password };
    const result = await registerReseller(formData);
    if (result.success) {
      navigate('/registersuccess');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="main-page-wrapper">
      <div className="branding-panel"> {/* 2. class ki jagah className use karein */}
        <div className="branding-content">
          <p className="welcome-text">{t('reg_hello')}<br /><span>{t('reg_welcome')}</span></p> {/* 3. <br> ko <br /> likhna hoga */}

          <div className="logo-circle">
            <img src={logo} alt="logo" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'contain' }} />
          </div>
          <h1 className="brand-name">wiseplayer</h1>

          <div className="branding-footer">
            CREATOR <span className="white-text">HERE</span> | DIRECTOR <span className="white-text">HERE</span>
          </div>
        </div>
        <div className="corner-fold"></div>
      </div>

      <div className="register-container">
        <div className={`content-wrapper ${isVisible ? 'visible' : ''}`}>
          <div className="header-section">
            <h1 className="logo-text">Wise <span className="logo-bold">IPTV</span></h1>

          </div>

          <div className="glass-card">
            <div className="reseller-badge">{t('reg_signup_badge')}</div>
            <form onSubmit={handleSubmit} className="form-content">
              <div className="input-row">
                <div className="input-group">
                  <label className="custom-label">{t('reg_fullname')}</label>
                  <input
                    className="modern-input"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div className="input-group">
                  <label className="custom-label">{t('reg_username')}</label>                  <input
                    type="text"
                    className="modern-input"
                    placeholder="username123"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="custom-label">{t('reg_password')}</label>
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="modern-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "👁️" : "🔒"}
                  </button>
                </div>
                <div className="validation-grid">
                  <span className={validations.hasSpecial ? 'v-done' : 'v-pending'}>{t('reg_v_special')}</span>
                  <span className={validations.hasNumber ? 'v-done' : 'v-pending'}> {t('reg_v_number')}</span>
                  <span className={validations.hasLower && validations.hasUpper ? 'v-done' : 'v-pending'}>{t('reg_v_case')}</span>
                  <span className={validations.isLengthValid ? 'v-done' : 'v-pending'}>{t('reg_v_length')}</span>
                </div>
              </div>

              <div className="input-group">
                <label className="custom-label">{t('reg_confirm_password')}</label>
                <div className="password-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="modern-input"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button type="button" className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? "👁️" : "🔒"}
                  </button>
                </div>
              </div>

              {error && <div className="error-alert">{error}</div>}

              <div className="terms-row" onClick={() => setAgree(!agree)}>
                <div className={`custom-checkbox ${agree ? 'checked' : ''}`}>
                  {agree && "✓"}
                </div>
                <span className="terms-txt">{t('reg_agree')} <span className="highlight">{t('reg_terms')}</span></span>              </div>

              <button type="submit" className="main-signup-btn">
                {t('reg_create_btn')}
              </button>

              <div className="footer-login">
                <span>{t('reg_already_member')}</span>
                <button type="button" onClick={() => navigate('/login')} className="text-btn">{t('reg_login_now')}</button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Register;