

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertCircle,
  ChevronRight,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Zap,
  HelpCircle,
  Lock
} from 'lucide-react';
import { generateDeviceKey, activateDeviceApi } from '../../auth/apiservice';
import './Activation.css'; // Importing the CSS file

const WisePlayerActivation = () => {
  const [macAddress, setMacAddress] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isKeyGenerated, setIsKeyGenerated] = useState(false);
  const [isKeyLoading, setIsKeyLoading] = useState(false);
  const [generatedKey, setGeneratedKey] = useState('');

  // Logical States
  const isMacValid = macAddress.length === 12;
  const canActivate = isMacValid && isKeyGenerated && isAgreed;

  // MAC Address formatting logic
  const handleMacChange = (e) => {
    let value = e.target.value.toUpperCase();
    value = value.replace(/[^0-9A-Z]/g, '');
    if (value.length <= 12) {
      setMacAddress(value);
      setIsKeyGenerated(false);
    }
  };

  const formatMac = (val) => {
    return val.match(/.{1,2}/g)?.join(':') || val;
  };

  const handleGenerateKey = async () => {
    if (!isMacValid) return;
    setIsKeyLoading(true);
    const formattedMac = formatMac(macAddress);
    const result = await generateDeviceKey(formattedMac);
    if (result.success) {
      setGeneratedKey(result.data.activationKey);
      setIsKeyGenerated(true);
    } else {
      alert(result.message || "Failed to generate key");
    }
    setIsKeyLoading(false);
  };

  const handleActivate = async () => {
    if (!canActivate) return;
    setIsLoading(true);

    const deviceId = formatMac(macAddress);


    const result = await activateDeviceApi(deviceId, generatedKey);

    if (result.success) {
      setIsSuccess(true);
    } else {
      alert(result.message || "Activation Failed");
    }

    setIsLoading(false);
  };

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

      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div variants={containerVars} initial="hidden" animate="visible" className="w-full max-w-xl z-10">

        {/* Logo Section */}
        <motion.div variants={itemVars} className="text-center mb-10">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-3xl shadow-2xl shadow-red-200 mb-6 cursor-pointer"
          >
            <Cpu className="text-white w-10 h-10" />
          </motion.div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            WISE<span className="text-red-600">PLAYER</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Fast • Secure • Premium Activation</p>
        </motion.div>

        {/* Content Card */}
        <motion.div variants={itemVars} className="bg-white border border-slate-100 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden">

          <div className="bg-red-50/50 px-6 py-4 flex items-center gap-3 border-b border-red-100">
            <AlertCircle className="text-red-600 w-5 h-5 flex-shrink-0" />
            <p className="text-red-800 text-[10px] md:text-xs font-bold uppercase tracking-wider">
              No content/channels included. Player license only.
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
                <div className="mb-8">
                  <label className="block text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 ml-1">
                    Your Device MAC Address
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="00:00:00:00:00:00"
                      value={formatMac(macAddress)}
                      onChange={handleMacChange}
                      className={`mac-input-base ${isMacValid ? 'mac-input-valid' : 'mac-input-invalid'}`}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full transition-colors duration-300 ${isMacValid ? 'bg-green-500 text-white' : 'bg-white/20 text-white'}`}>
                        {macAddress.length}/12
                      </span>
                    </div>
                  </div>
                </div>

                {/* Generate Activation Key Button Section */}
                <div className="flex items-center justify-between mb-8 p-1">
                  <button
                    onClick={handleGenerateKey}
                    disabled={!isMacValid || isKeyLoading}
                    className={`btn-generate ${isMacValid && !isKeyLoading ? 'btn-generate-active' : 'btn-generate-disabled'}`}
                  >
                    {isKeyLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin-custom" />
                        Generating...
                      </>
                    ) : (
                      'Generate Activation Key'
                    )}
                  </button>

                  <AnimatePresence>
                    {isKeyGenerated ? (
                      <motion.div
                        initial={{ scale: 0, opacity: 0, rotate: -45 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-xl border border-green-200"
                      >
                        <span className="text-green-700 text-xs font-bold uppercase tracking-tighter">Key Ready</span>
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center shadow-lg shadow-green-200">
                          <CheckCircle2 size={18} color="white" />
                        </div>
                      </motion.div>
                    ) : (
                      <div className="flex items-center gap-2 opacity-30">
                        <Lock size={16} className="text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Locked</span>
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Agreement Checkbox */}
                <motion.label
                  whileHover={isKeyGenerated ? { x: 5 } : {}}
                  className={`flex items-start gap-4 mb-10 transition-opacity duration-300 ${isKeyGenerated ? 'opacity-100 cursor-pointer' : 'opacity-40 cursor-not-allowed'}`}
                >
                  <div className="relative flex items-center h-6 mt-1">
                    <input
                      type="checkbox"
                      disabled={!isKeyGenerated}
                      checked={isAgreed}
                      onChange={() => setIsAgreed(!isAgreed)}
                      className="peer h-6 w-6 cursor-pointer appearance-none rounded-lg border-2 border-black-200 checked:bg-red-600 checked:border-red-600 transition-all"
                    />
                    <CheckCircle2 className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none ml-1 transition-opacity" />
                  </div>
                  <span className="text-sm text-slate-500 leading-relaxed font-medium">
                    I confirm that I have my own content and I am paying for the <span className="font-bold text-slate-800 underline decoration-red-200">Wise Player lifetime license.</span>
                  </span>
                </motion.label>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <motion.button
                    whileHover={canActivate ? { scale: 1.02 } : {}}
                    whileTap={canActivate ? { scale: 0.98 } : {}}
                    onClick={handleActivate}
                    disabled={!canActivate || isLoading}
                    className={`relative w-full md:w-auto min-w-[240px] flex items-center justify-center gap-3 py-4 px-10 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-500 
                    ${canActivate
                        ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-2xl shadow-blue-200 cursor-pointer'
                        : 'bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed shadow-none'
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
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin-custom" />
                          Verifying...
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
                </div>
              </>
            ) : (
              <>
                {/* Success State - Attractive & Compact Version */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 px-2"
                >
                  {/* Glowing Icon Container */}
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <div className="absolute inset-0 bg-green-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                    <div className="relative w-full h-full bg-gradient-to-br from-green-50 to-emerald-100 rounded-full flex items-center justify-center shadow-inner border border-green-200">
                      <ShieldCheck className="w-12 h-12 text-emerald-600" strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Title with Gradient */}
                  <h2 className="text-3xl font-black mb-3 tracking-tight bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
                    Verified & Active
                  </h2>

                  {/* Device Badge */}
                  <div className="inline-block px-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl mb-8 shadow-sm">
                    <p className="text-slate-500 text-sm font-medium">
                      Device <span className="text-blue-600 font-mono font-bold tracking-wider">{formatMac(macAddress)}</span> is now premium.
                    </p>
                  </div>

                  {/* Professional Button */}
                  <div>
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setMacAddress('');
                        setIsKeyGenerated(false);
                        setIsAgreed(false);
                      }}
                      className="px-10 py-3.5 bg-slate-900 text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-slate-800 hover:shadow-lg transition-all active:scale-95"
                    >
                      Activate Another
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </div>

          <div className="bg-slate-50 p-6 flex justify-center items-center border-t border-slate-100 gap-8">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <CheckCircle2 className="w-4 h-4 text-green-500" /> Secure SSL
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <CheckCircle2 className="w-4 h-4 text-green-500" /> 24/7 Support
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVars} className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 px-4">
          <div className="flex gap-8">
            <a href="#" className="flex items-center gap-2 text-slate-400 hover:text-red-600 transition-colors text-xs font-bold uppercase tracking-wider group">
              <HelpCircle className="w-4 h-4" />
              Support
            </a>
            <a href="#" className="flex items-center gap-2 text-slate-400 hover:text-red-600 transition-colors text-xs font-bold uppercase tracking-wider group">
              <ExternalLink className="w-4 h-4" />
              License Policy
            </a>
          </div>
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.1em]">
            © 2024 <span className="text-slate-600">WISE PLAYER TECHNOLOGY</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WisePlayerActivation;