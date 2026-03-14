import React, { useState } from 'react';
import { ChevronRight, Tv, ShieldCheck, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const WiseplayerUpload = () => {
   const navigate = useNavigate();
  const [uploadMac, setUploadMac] = useState('');
  const [deleteMac, setDeleteMac] = useState('');
  const [showModal, setShowModal] = useState(false);

  const formatMac = (val) => {
    let cleanVal = val.toUpperCase().replace(/[^0-9A-F]/g, '');
    let formatted = cleanVal.match(/.{1,2}/g)?.join(':') || '';
    return formatted.substring(0, 17);
  };

  const handleUploadChange = (e) => setUploadMac(formatMac(e.target.value));
  const handleDeleteChange = (e) => setDeleteMac(formatMac(e.target.value));

  return (
    <div className="min-h-screen bg-[#FAFAFB] text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-600">
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
          <span className="text-xl font-bold tracking-tight text-slate-800">
            WISE<span className="text-indigo-600">PLAYER</span>
          </span>
        </div>
       
      </nav>

      <main className="flex flex-col items-center px-4 py-16 max-w-4xl mx-auto">

        <div className="grid md:grid-cols-2 gap-8 w-full">

          {/* Section 1: Upload Content */}
          <div className="bg-white border-2 border-indigo-500 rounded-[2rem] shadow-[0_20px_50px_rgba(79,70,229,0.2)] overflow-hidden flex flex-col">
            <div className="p-8">
              <div className="mb-6">
                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-4">
                  <ShieldCheck size={24} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Upload your playlist</h2>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-purple-600 uppercase tracking-widest mb-2 ml-1">Device ID / MAC Address</label>
                  <input
                    type="text"
                    placeholder="00:AA:BB:CC:DD:EE"
                    value={uploadMac}
                    onChange={handleUploadChange}
                    className="w-full bg-slate-50 p-4 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-lg font-mono tracking-wider  placeholder:text-purple-300 placeholder:font-bold placeholder:text-lg"
                  />
                </div>

                <button
                  onClick={() => navigate('/upload-playlist')}
                  disabled={uploadMac.length !== 17}
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${uploadMac.length === 17
    ? 'bg-indigo-600 text-white hover:bg-[#E1BEE7] hover:text-purple-900 hover:shadow-[0px_10px_20px_rgba(186,104,200,0.5)] hover:-translate-y-1 shadow-lg shadow-indigo-100'
    : 'bg-purple-50 text-purple-300 cursor-not-allowed'
}`}
                >
                  Configure Playlist <ChevronRight size={22} />
                </button>
              </div>
            </div>
          
          </div>

          {/* Section 2: Delete Content */}
          <div className="bg-white border-2 border-red-400 rounded-[2rem] shadow-[0_20px_50px_rgba(239,68,68,0.2)] overflow-hidden flex flex-col">
            <div className="p-8">
              <div className="mb-6">
                <div className="w-10 h-10 bg-red-50 text-red-300 cursor-not-allowed text-lg font-black rounded-xl flex items-center justify-center mb-4">
                  <Trash2 size={24} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Wipe Data</h2>
                        </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-black text-red-700 uppercase tracking-widest mb-2 ml-1">Device ID / MAC Address</label>                  <input
                    type="text"
                    placeholder="00:AA:BB:CC:DD:EE"
                    value={deleteMac}
                    onChange={handleDeleteChange}
                    className="w-full bg-red-50 p-4 border-2 border-red-200 rounded-xl focus:outline-none focus:border-red-600 focus:bg-white transition-all text-lg font-mono tracking-wider placeholder:text-red-400 placeholder:font-bold"
                  />
                </div>

                <button
                  onClick={() => setShowModal(true)}
                  disabled={deleteMac.length !== 17}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${deleteMac.length === 17
                    ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-100 hover:-translate-y-0.5'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                >
                  Remove Content <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="mt-auto p-4 bg-red-100 border-t border-red-200 text-sm text-red-700 font-black text-center uppercase tracking-wider">
              Warning: This action is permanent
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
      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl border border-slate-100 transform animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
                <Trash2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Confirm Deletion?</h3>
              <p className="text-slate-500 mt-2 text-sm">
                Are you sure you want to wipe data for <span className="font-mono font-bold text-slate-700">{deleteMac}</span>? This action cannot be undone.
              </p>

              <div className="flex flex-col gap-3 w-full mt-8">
                <button
                  onClick={() => {
                    console.log("Deleted:", deleteMac); // Yahan apna delete logic likhein
                    setShowModal(false);
                  }}
                  className="w-full py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-100"
                >
                  Yes, Delete Content
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WiseplayerUpload;