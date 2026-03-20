


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { registerReseller } from '../../auth/apiservice';
// import './Ragister.css'; 

// const Register = () => {
//   const navigate = useNavigate();
//   const [fullName, setFullName] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [agree, setAgree] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   const validations = {
//     hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
//     hasNumber: /\d/.test(password),
//     hasLower: /[a-z]/.test(password),
//     hasUpper: /[A-Z]/.test(password),
//     isLengthValid: password.length >= 8,
//     usernameLength: username.length >= 1 && username.length <= 30,
//     usernameAllowedChars: /^[a-zA-Z0-9._]*$/.test(username),
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!validations.hasSpecial || !validations.hasNumber || !validations.hasLower || !validations.hasUpper || !validations.isLengthValid) {
//       setError("Password does not meet all requirements.");
//       return;
//     }

//     if (!validations.usernameLength) {
//       setError("Username must be between 1 and 30 characters.");
//       return;
//     }
//     if (!validations.usernameAllowedChars) {
//       setError("Username can only contain letters, numbers, periods, and underscores.");
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }

//     if (!agree) {
//       setError("Please agree to the terms and conditions.");
//       return;
//     }

//     const formData = { fullName, username, password };
//     const result = await registerReseller(formData);

//     if (result.success) {
//       navigate('/registersuccess');
//     } else {
//       setError(result.message);
//     }
//   };

//   return (
//     <div className="register-container">
//       {/* Dynamic Class for Animation */}
//       <div className={`content-wrapper ${isVisible ? 'visible' : ''}`}>
        
//         <div className="header">
//           <h1 className="logo-text">Wise <span className="logo-bold">IPTV</span></h1>
//         </div>

//         <div className="card">
//           <div className="reseller-badge">RESELLER SIGNUP</div>

//           <form onSubmit={handleSubmit}>
//             <div className="input-group">
//               <label className="label">Full name</label>
//               <input
//                 className="input"
//                 placeholder="Enter your name"
//                 value={fullName}
//                 onChange={(e) => setFullName(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="input-group">
//               <label className="label">Username</label>
//               <input
//                 type="text"
//                 className="input"
//                 placeholder="Enter your username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="input-group">
//               <label className="label">Password</label>
//               <input
//                 type="password"
//                 className="input"
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <div className="requirements">
//                 <p className={`req-text ${validations.hasSpecial ? 'valid' : ''}`}>
//                   {validations.hasSpecial ? '✓' : '•'} Must contain a special character
//                 </p>
//                 <p className={`req-text ${validations.hasNumber ? 'valid' : ''}`}>
//                   {validations.hasNumber ? '✓' : '•'} Must contain a number
//                 </p>
//                 <p className={`req-text ${(validations.hasLower && validations.hasUpper) ? 'valid' : ''}`}>
//                   {validations.hasLower && validations.hasUpper ? '✓' : '•'} Must contain a lowercase & capital letter
//                 </p>
//                 <p className={`req-text ${validations.isLengthValid ? 'valid' : ''}`}>
//                   {validations.isLengthValid ? '✓' : '•'} Must contain at least 8 characters
//                 </p>
//               </div>
//             </div>

//             <div className="input-group">
//               <label className="label">Password confirmation</label>
//               <input
//                 type="password"
//                 className="input"
//                 placeholder="Confirm password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//               />
//             </div>

//             {error && <p className="error-message">{error}</p>}

//             <div className="checkbox-container" onClick={() => setAgree(!agree)}>
//               <div className={`checkbox ${agree ? 'active' : ''}`} />
//               <span className="terms-text">
//                 I agree to the <a href="#" className="link-text">terms and conditions</a> and the <a href="#" className="link-text">privacy policy</a>.
//               </span>
//             </div>

//             <div className="login-row">
//               <span className="login-link">You have an account already?</span>
//               <button
//                 type="button"
//                 onClick={() => navigate('/login')}
//                 className="login-button"
//               >
//                 Login
//               </button>
//             </div>

//             <button type="submit" className="signup-btn">
//               Signup
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerReseller } from '../../auth/apiservice';
import './Ragister.css'; 

const Register = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState('');

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
      setError("Password requirements not met."); return;
    }
    if (!validations.usernameLength || !validations.usernameAllowedChars) {
      setError("Invalid Username format."); return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match!"); return;
    }
    if (!agree) {
      setError("Please agree to terms."); return;
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
              <p className="welcome-text">Hello,<br /><span>welcome to!</span></p> {/* 3. <br> ko <br /> likhna hoga */}
              
              <div className="logo-circle">
                  <i className="fas fa-fire"></i> {/* 4. HTML comment (<!-- -->) hata diya */}
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
            <p className="subtitle">Premium Reseller Program</p>
          </div>

          <div className="glass-card">
            <div className="reseller-badge">RESELLER SIGNUP</div>
            <form onSubmit={handleSubmit} className="form-content">
              <div className="input-row">
                <div className="input-group">
                  <label className="custom-label">Full Name</label>
                  <input
                    className="modern-input"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div className="input-group">
                  <label className="custom-label">Username</label>
                  <input
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
                <label className="custom-label">Password</label>
                <input
                  type="password"
                  className="modern-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="validation-grid">
                  <span className={validations.hasSpecial ? 'v-done' : 'v-pending'}>Special Char</span>
                  <span className={validations.hasNumber ? 'v-done' : 'v-pending'}>Number</span>
                  <span className={validations.hasLower && validations.hasUpper ? 'v-done' : 'v-pending'}>Aa/BB</span>
                  <span className={validations.isLengthValid ? 'v-done' : 'v-pending'}>8+ Chars</span>
                </div>
              </div>

              <div className="input-group">
                <label className="custom-label">Confirm Password</label>
                <input
                  type="password"
                  className="modern-input"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {error && <div className="error-alert">{error}</div>}

              <div className="terms-row" onClick={() => setAgree(!agree)}>
                <div className={`custom-checkbox ${agree ? 'checked' : ''}`}>
                  {agree && "✓"}
                </div>
                <span className="terms-txt">I agree to the <span className="highlight">Terms & Privacy</span></span>
              </div>

              <button type="submit" className="main-signup-btn">
                Create Account
              </button>

              <div className="footer-login">
                <span>Already a member?</span>
                <button type="button" onClick={() => navigate('/login')} className="text-btn">Login Now</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default Register;