import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertCircle, 
  ChevronRight, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink,
  Zap,
  HelpCircle
} from 'lucide-react';

const WisePlayerActivation = () => {
  const [macAddress, setMacAddress] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // MAC Address formatting logic
  const handleMacChange = (e) => {
    let value = e.target.value.toUpperCase();
    value = value.replace(/[^0-9A-F]/g, '');
    if (value.length <= 12) {
      setMacAddress(value);
    }
  };

  const formatMac = (val) => {
    return val.match(/.{1,2}/g)?.join(':') || val;
  };

  const isValid = isAgreed && macAddress.length === 12;

  const handleActivate = () => {
    setIsLoading(true);
    // Simulating API Call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  // Animation Variants
  const containerVars = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center py-12 px-4 font-sans text-slate-800 relative overflow-hidden">
      
      {/* Background Red Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main Container */}
      <motion.div 
        variants={containerVars}
        initial="hidden"
        animate="visible"
        className="w-full max-w-xl z-10"
      >
        {/* Logo Section */}
        <motion.div variants={itemVars} className="text-center mb-10">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-red-600 rounded-3xl shadow-2xl shadow-red-200 mb-6 cursor-pointer"
          >
            <Cpu className="text-white w-10 h-10" />
          </motion.div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            WISE<span className="text-red-600">PLAYER</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Fast • Secure • Premium Activation</p>
        </motion.div>

        {/* Content Card */}
        <motion.div 
          variants={itemVars}
          className="bg-white border border-slate-100 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden"
        >
          {/* Top Warning Alert */}
          <div className="bg-red-50/50 px-6 py-4 flex items-center gap-3 border-b border-red-100">
            <AlertCircle className="text-red-600 w-5 h-5 flex-shrink-0" />
            <p className="text-red-800 text-xs font-semibold uppercase tracking-wider">
              No content/channels included. Player only.
            </p>
          </div>

          <div className="p-8 md:p-10">
            {!isSuccess ? (
              <>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800">Device Activation</h2>
                </div>

                {/* MAC Input */}
                <div className="mb-6">
                  <label className="block text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-3 ml-1">
                    Your Device MAC Address
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder="00:00:00:00:00:00"
                      value={formatMac(macAddress)}
                      onChange={handleMacChange}
                      className="w-full bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl focus:bg-white focus:border-red-500 focus:ring-8 focus:ring-red-50 outline-none transition-all text-2xl font-mono tracking-widest placeholder:text-slate-200 text-slate-700"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded ${macAddress.length === 12 ? 'bg-green-100 text-green-600' : 'bg-slate-200 text-slate-500'}`}>
                        {macAddress.length}/12
                      </span>
                    </div>
                  </div>
                </div>

                {/* Agreement Checkbox */}
                <motion.label 
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 mb-8 cursor-pointer group"
                >
                  <div className="relative flex items-center h-6 mt-1">
                    <input
                      type="checkbox"
                      checked={isAgreed}
                      onChange={() => setIsAgreed(!isAgreed)}
                      className="peer h-6 w-6 cursor-pointer appearance-none rounded-lg border-2 border-slate-200 checked:bg-red-600 checked:border-red-600 transition-all"
                    />
                    <CheckCircle2 className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none ml-1 transition-opacity" />
                  </div>
                  <span className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors">
                    I confirm that I have my own content and I am only paying for the <span className="font-bold text-slate-800 underline decoration-red-200">Wise Player lifetime license.</span>
                  </span>
                </motion.label>

                {/* Submit Button */}
                <motion.button
                  whileHover={isValid ? { scale: 1.02 } : {}}
                  whileTap={isValid ? { scale: 0.98 } : {}}
                  onClick={handleActivate}
                  disabled={!isValid || isLoading}
                  className={`relative w-full overflow-hidden flex items-center justify-center gap-3 py-5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl 
                    ${isValid
                      ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-200 cursor-pointer'
                      : 'bg-blue-100 text-blue-400cursor-not-allowed shadow-none'
                    }`}
                >
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.div
                        key="loader"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </motion.div>
                    ) : (
                      <motion.div
                        key="text"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        Activate Device <ChevronRight className="w-5 h-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </>
            ) : (
              /* Success State */
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-2">Ready to Go!</h2>
                <p className="text-slate-500 mb-8">Your MAC {formatMac(macAddress)} has been successfully verified.</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="text-red-600 font-bold hover:underline"
                >
                  Go Back
                </button>
              </motion.div>
            )}
          </div>

          {/* Footer Info */}
          <div className="bg-slate-50 p-6 flex justify-around items-center border-t border-slate-100">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" /> 256-Bit SSL
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <CheckCircle2 className="w-4 h-4" /> Instant Activation
            </div>
          </div>
        </motion.div>

        {/* Support & Links */}
        <motion.div 
          variants={itemVars}
          className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 px-4"
        >
          <div className="flex gap-8">
            <a href="#" className="flex items-center gap-2 text-slate-400 hover:text-red-600 transition-colors text-sm font-medium group">
              <HelpCircle className="w-4 h-4" />
              Support
            </a>
            <a href="#" className="flex items-center gap-2 text-slate-400 hover:text-red-600 transition-colors text-sm font-medium group">
              <ExternalLink className="w-4 h-4" />
              Terms
            </a>
          </div>
          <p className="text-slate-400 text-sm">
            © 2024 <span className="font-bold text-slate-600">WISE PLAYER</span>. All rights reserved.
          </p>
        </motion.div>
      </motion.div>

      {/* CSS for custom animations if needed */}
      <style jsx="true">{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default WisePlayerActivation;