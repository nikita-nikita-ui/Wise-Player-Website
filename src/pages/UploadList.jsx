import React, { useState } from 'react';
import { ChevronRight, Tv, ShieldCheck, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { validateDevice } from '../auth/apiservice';
const WiseplayerUpload = () => {
  const navigate = useNavigate();
  const [uploadMac, setUploadMac] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [statusError, setStatusError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const formatMac = (val) => {
    let cleanVal = val.toUpperCase().replace(/[^0-9A-F]/g, '');
    let formatted = cleanVal.match(/.{1,2}/g)?.join(':') || '';
    return formatted.substring(0, 17);
  };

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

      // ❌ Agar allowed false hai (subscription expired etc.)
      if (!allowed) {
        setStatusError(message || "Your Subscription expired . Please renew to continue access.");
      }

      // ✅ Status check (uppercase)
      if (status === "ACTIVE") {
        navigate('/upload-playlist');
      } else if (status === "INACTIVE") {
        setStatusError("Device is registered but status is Inactive.");
      } else {
        setStatusError("Device is not registered.");
      }

    } catch (err) {
      setStatusError("Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-sky-50 font-sans selection:bg-indigo-100 selection:text-indigo-600">
      {/* Dynamic Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-40">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[100px]"></div>
      </div>

      {/* Header */}
      <nav className="w-full p-5 flex justify-center items-center max-w-6xl mx-auto border-b border-slate-100 bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg shadow-lg">
            <Tv size={22} className="text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-800 drop-shadow-md transition-shadow hover:shadow-lg cursor-pointer">
            WISE<span className="text-indigo-600">PLAYER</span>
          </span>
        </div>

      </nav>

      <main className="flex flex-col items-center px-4 py-16 max-w-4xl mx-auto">

        <div className="grid md:grid-cols-1 place-items-center gap-8 w-full">
          {/* Section 1: Upload Content */}
          <div className="bg-white border-2 border-indigo-500 rounded-[2rem] shadow-[0_20px_50px_rgba(79,70,229,0.2)] overflow-hidden flex flex-col w-full md:w-[700px] p-12">         
               <div className="p-8">
            <div className="mb-12 flex items-center gap-4">
              <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                <ShieldCheck size={24} />
              </div>
              <h2 className="text-3xl font-extrabold text-purple-700 drop-shadow-lg">Upload your playlist</h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-purple-600 uppercase tracking-widest mb-2 ml-1">Device ID / MAC Address</label>
                <input
                  type="text"
                  placeholder="00:AA:BB:CC:DD:EE"
                  value={uploadMac}
                  onChange={(e) => {
                    handleUploadChange(e);
                    if (statusError) setStatusError(''); // Typing shuru karte hi error hat jayega
                  }}
                  className={`w-full bg-slate-50 p-4 border-2 rounded-xl focus:outline-none transition-all text-lg font-mono tracking-wider placeholder:text-purple-300 ${statusError ? 'border-red-500 bg-red-50' : 'border-slate-100 focus:border-indigo-500 focus:bg-white'
                    }`}
                />
                {/* Error Message Display */}
                {statusError && (
                  <p className="mt-2 ml-1 text-sm font-bold text-red-500 animate-bounce">
                    {statusError}
                  </p>
                )}
              </div>

              <button
                onClick={handleConfigure}
                disabled={isLoading} className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${uploadMac.length === 17 && !isLoading
                  ? 'bg-indigo-600 text-white hover:bg-[#E1BEE7] hover:text-purple-900 hover:shadow-[0px_10px_20px_rgba(186,104,200,0.5)] hover:-translate-y-1 shadow-lg shadow-indigo-100'
                  : 'bg-purple-50 text-purple-300 cursor-not-allowed'
                  }`}
              >
                {isLoading ? 'Checking status...' : 'Validate'}
                {!isLoading && <ChevronRight size={22} />}
              </button>
            </div>
          </div>

          </div>



        </div>

        {/* Footer info */}
        <footer className="mt-16 w-full pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-black text-[14px] font-bold">
            &copy; {new Date().getFullYear()} Wiseplayer Management Portal. All rights reserved.
          </p>
          <div className="flex gap-6 text-[13px] text-black font-black uppercase tracking-wider">
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Help Desk</a>
          </div>
        </footer>
      </main>


    </div>
  );
};

export default WiseplayerUpload;