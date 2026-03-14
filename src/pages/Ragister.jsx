import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  // Form States
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Error state for validation messages
  const [error, setError] = useState('');

  // Entrance Animation Trigger
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Password Validation Logic
  const validations = {
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    hasNumber: /\d/.test(password),
    hasLower: /[a-z]/.test(password),
    hasUpper: /[A-Z]/.test(password),
    isLengthValid: password.length >= 8
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!validations.hasSpecial || !validations.hasNumber || !validations.hasLower || !validations.hasUpper || !validations.isLengthValid) {
      setError("Password does not meet all requirements.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!agree) {
      setError("Please agree to the terms and conditions.");
      return;
    }

    navigate('/registersuccess'); 
  };

  const getValidationStyle = (isValid) => ({
    ...styles.reqText,
    color: isValid ? '#28a745' : '#777',
    fontWeight: isValid ? 'bold' : 'normal'
  });

  return (
    <div style={styles.container}>
      <div style={{
        ...styles.contentWrapper,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s ease-out'
      }}>
        
        {/* Logo Section */}
        <div style={styles.header}>
          <span style={styles.logoEmoji}>🔥</span>
          <h1 style={styles.logoText}>Wise <span style={styles.logoBold}>IPTV</span></h1>
        </div>

        {/* Main Card */}
        <div style={styles.card}>
          <div style={styles.resellerBadge}>
            RESELLER SIGNUP
          </div>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Full name</label>
              <input 
                style={styles.input} 
                placeholder="Enter your name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
              <input 
                type="email"
                style={styles.input} 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input 
                type="password"
                style={styles.input} 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div style={styles.requirements}>
                <p style={getValidationStyle(validations.hasSpecial)}>
                  {validations.hasSpecial ? '✓' : '•'} Must contain a special character
                </p>
                <p style={getValidationStyle(validations.hasNumber)}>
                  {validations.hasNumber ? '✓' : '•'} Must contain a number
                </p>
                <p style={getValidationStyle(validations.hasLower && validations.hasUpper)}>
                  {validations.hasLower && validations.hasUpper ? '✓' : '•'} Must contain a lowercase & capital letter
                </p>
                <p style={getValidationStyle(validations.isLengthValid)}>
                  {validations.isLengthValid ? '✓' : '•'} Must contain at least 8 characters
                </p>
              </div>
            </div>

            {/* Password Confirmation */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password confirmation</label>
              <input 
                type="password"
                style={styles.input} 
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Error Message */}
            {error && <p style={styles.errorMessage}>{error}</p>}

            {/* Terms and Conditions */}
            <div style={styles.checkboxContainer} onClick={() => setAgree(!agree)}>
              <div style={{
                ...styles.checkbox,
                backgroundColor: agree ? '#ff4444' : 'transparent'
              }} />
              <span style={styles.termsText}>
                I agree to the <a href="#" style={styles.linkText}>terms and conditions</a> and the <a href="#" style={styles.linkText}>privacy policy</a>.
              </span>
            </div>

            <a href="#" style={styles.loginLink}>You have an account already?</a>

            {/* Signup Button */}
            <button 
              type="submit"
              className="signup-btn"
            >
              Signup
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .signup-btn {
          width: 100%;
          padding: 15px;
          border-radius: 8px;
          border: none;
          background-color: #ffcc00;
          color: #000;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.1s, background-color 0.2s;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .signup-btn:hover {
          background-color: #e6b800;
        }
        .signup-btn:active {
          transform: scale(0.96);
        }
        input:focus {
          outline: none;
          border-color: #ff4444;
          background-color: #fff;
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    // Gradient Background: White -> Gray -> Light Red
    background: 'linear-gradient(135deg, #ffffff 0%, #ececec 50%, #ffe5e5 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    padding: '20px',
    boxSizing: 'border-box',
  },
  contentWrapper: {
    width: '100%',
    maxWidth: '550px', // Width thoda bada kar diya gaya hai
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '30px',
  },
  logoEmoji: {
    fontSize: '32px',
    marginRight: '10px',
  },
  logoText: {
    fontSize: '28px',
    color: '#333', // White background par dark text behtar dikhta hai
    fontWeight: '300',
    margin: 0,
  },
  logoBold: {
    fontWeight: 'bold',
  },
  card: {
    position: 'relative',
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: '15px',
    padding: '45px 35px 35px 35px',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box',
  },
  resellerBadge: {
    position: 'absolute',
    top: '-15px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#ffcc00',
    padding: '8px 20px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#000',
    whiteSpace: 'nowrap',
    zIndex: 1,
  },
  inputGroup: {
    marginBottom: '20px',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    color: '#333',
    marginBottom: '8px',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#f9f9f9',
    boxSizing: 'border-box',
    transition: 'all 0.2s',
  },
  requirements: {
    marginTop: '10px',
  },
  reqText: {
    fontSize: '11px',
    margin: '3px 0',
    transition: 'color 0.3s ease',
  },
  errorMessage: {
    color: '#ff4444',
    fontSize: '13px',
    marginBottom: '10px',
    textAlign: 'left',
    fontWeight: '500'
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    marginVertical: '15px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    border: '2px solid #ff4444',
    borderRadius: '4px',
    marginRight: '10px',
    transition: 'background-color 0.2s',
    flexShrink: 0,
  },
  termsText: {
    fontSize: '12px',
    color: '#555',
    lineHeight: '1.4',
  },
  linkText: {
    color: '#007bff',
    textDecoration: 'none',
  },
  loginLink: {
    display: 'block',
    textAlign: 'left',
    color: '#ff8c00',
    fontSize: '14px',
    marginBottom: '25px',
    fontWeight: '500',
    textDecoration: 'none',
  },
};

export default Register;