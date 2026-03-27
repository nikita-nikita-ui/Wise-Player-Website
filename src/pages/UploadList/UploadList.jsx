import  { useState, useEffect  } from 'react';
import { ChevronRight, Tv, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { validateDevice } from '../../auth/apiservice';
import './UploadList.css'; // ✅ ADD THIS
import { useLocation } from 'react-router-dom';

const WiseplayerUpload = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [uploadMac, setUploadMac] = useState('');
  const [statusError, setStatusError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
useEffect(() => {
  const query = new URLSearchParams(location.search);
  const mac = query.get("mac");
  if (mac) {
    setUploadMac(mac);
  }
}, [location]);
  const handleUploadChange = (e) => setUploadMac(e.target.value);

  const handleConfigure = async () => {
    setIsLoading(true);
    setStatusError('');

    try {
      const res = await validateDevice(uploadMac);

      if (!res.success || !res.data) {
        setStatusError("Device is not registered.");
        return;
      }

      const { status, allowed, message } = res.data;

      if (!allowed) {
        setStatusError(message || "Your Subscription expired. Please renew.");
      }

      if (status === "ACTIVE") {
        navigate('/upload-playlist');
      } else if (status === "INACTIVE") {
        setStatusError("Device is registered but status is Inactive.");
      } else {
        setStatusError("Device is not registered.");
      }

    } catch {
      setStatusError("Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">

      <nav className="navbar">
        <div className="logo">
          <div className="logo-icon">
            <Tv size={22} />
          </div>
          <span className="logo-text">
            WISE<span>PLAYER</span>
          </span>
        </div>
      </nav>

      <main className="main-container">
        <div className="card">

          <div className="card-header">
            <div className="icon-box">
              <ShieldCheck size={24} />
            </div>
            <h2>Upload your playlist</h2>
          </div>

          <label>Device ID / MAC Address</label>

          <input
            type="text"
            placeholder="00:AA:BB:CC:DD:EE"
            value={uploadMac}
            onChange={(e) => {
              handleUploadChange(e);
              if (statusError) setStatusError('');
            }}
            className={statusError ? 'input error' : 'input'}
          />

          {statusError && <p className="error-text">{statusError}</p>}

          <button
            onClick={handleConfigure}
            disabled={isLoading}
            className={uploadMac.length === 17 && !isLoading ? 'btn active' : 'btn'}
          >
            {isLoading ? 'Checking status...' : 'Validate'}
            {!isLoading && <ChevronRight size={20} />}
          </button>

        </div>
      </main>

      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} Wiseplayer Management Portal.
        </p>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Help Desk</a>
        </div>
      </footer>

    </div>
  );
};

export default WiseplayerUpload;