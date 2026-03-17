import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, EyeOff, Lock, Zap, ShieldAlert } from 'lucide-react';

const SecurityPage = () => {
  // Enhanced Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.2 } }
  };

  const floatAnim = {
    animate: {
      y: [0, -10, 0],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfdfe] text-slate-900 py-5 font-sans overflow-hidden">
      {/* Professional CSS for Custom Effects */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
          
          body { font-family: 'Inter', sans-serif; }

          .secure-card {
            background: white;
            border-radius: 28px;
            border: 1px solid #f1f1f1;
            transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          }
          .secure-card:hover {
            transform: translateY(-15px);
            box-shadow: 0 30px 60px rgba(230, 57, 70, 0.12);
            border-color: #ffcccc;
          }
          .icon-bg-red {
            background: #fff1f1;
            color: #e63946;
            padding: 18px;
            border-radius: 20px;
            display: inline-flex;
            position: relative;
            box-shadow: 0 10px 20px rgba(230, 57, 70, 0.05);
          }
          /* Scanning animation effect */
          .scan-line {
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, transparent, #e63946, transparent);
            position: absolute;
            top: 0;
            left: 0;
            animation: scan 2.5s infinite linear;
          }
          @keyframes scan {
            0% { top: 0; opacity: 0; }
            50% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }
          .stats-badge {
            background: #ffffff;
            border: 1px solid #eef2f6;
            padding: 10px 24px;
            border-radius: 50px;
            font-size: 14px;
            font-weight: 700; /* Bold text */
            color: #475569;
            box-shadow: 0 4px 10px rgba(0,0,0,0.02);
          }
          .text-bold-heavy {
            font-weight: 800 !important;
          }
        `}
      </style>

      <div className="container mt-5">
        {/* HERO SECTION */}
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={fadeInUp} 
          className="text-center mb-5"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="d-inline-flex align-items-center gap-2 mb-4 bg-white px-4 py-2 rounded-pill shadow-sm border"
          >
            <ShieldCheck size={18} className="text-danger" />
            <span className="small text-bold-heavy text-uppercase tracking-wider">Military-Grade Protection</span>
          </motion.div>
          
          <h1 className="display-4 text-bold-heavy mb-3 tracking-tight">
            Secure. Private. <span className="text-danger">Always.</span>
          </h1>
          <p className="text-muted mx-auto fw-semibold" style={{maxWidth: '650px', fontSize: '1.1rem'}}>
            "Security isn't an option; it's our foundation. Watch what you want, knowing you are <span className="text-dark fw-bold">100% invisible</span>."
          </p>
        </motion.div>

        {/* FEATURE CARDS (Privacy & Security) */}
        <motion.div 
          variants={stagger} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          className="row g-4 justify-content-center"
        >
          {/* Total Privacy Card */}
          <motion.div variants={fadeInUp} className="col-md-5 col-lg-4">
            <div className="secure-card p-5 h-100 text-center position-relative">
              <motion.div {...floatAnim} className="icon-bg-red mb-4">
                <EyeOff size={36} />
                <div className="scan-line"></div>
              </motion.div>
              <h3 className="text-bold-heavy mb-3">Total Privacy</h3>
              <ul className="list-unstyled text-muted">
                <li className="mb-3"><span className="text-danger">●</span> <b className="text-dark">Zero Logs:</b> No tracking history ever.</li>
                <li><span className="text-danger">●</span> <b className="text-dark">Anonymous:</b> No digital footprint left.</li>
              </ul>
            </div>
          </motion.div>

          {/* AES-256 Security Card */}
          <motion.div variants={fadeInUp} className="col-md-5 col-lg-4">
            <div className="secure-card p-5 h-100 text-center">
              <motion.div {...floatAnim} className="icon-bg-red mb-4" style={{animationDelay: '0.5s'}}>
                <Lock size={36} />
              </motion.div>
              <h3 className="text-bold-heavy mb-3">AES-256 Shield</h3>
              <ul className="list-unstyled text-muted">
                <li className="mb-3"><span className="text-danger">●</span> <b className="text-dark">Encrypted:</b> Industry-leading protocols.</li>
                <li><span className="text-danger">●</span> <b className="text-dark">IP Hidden:</b> End-to-end secure tunnels.</li>
              </ul>
            </div>
          </motion.div>
        </motion.div>

        {/* STATS SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-5 pt-5"
        >
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <div className="stats-badge">Encryption: <span className="text-danger">AES-256</span></div>
            <div className="stats-badge">Protocols: <span className="text-dark">WireGuard</span></div>
            <div className="stats-badge flex-nowrap">Status: <span className="text-success">● 24/7 LIVE</span></div>
          </div>
        </motion.div>

        {/* BOTTOM SUPPORT MODULE (Jo image mein tha) */}
        <div className="d-flex justify-content-center mt-5 mb-4">
           <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ 
                scale: 1.08, 
                boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                borderColor: "#e63946" 
            }}
            className="d-flex align-items-center bg-white border rounded-4 px-4 py-3 shadow-sm"
            style={{cursor: 'pointer', transition: 'all 0.3s ease'}}
           >
              <div style={{background: '#fff1f1', padding: '12px', borderRadius: '16px', color: '#e63946', marginRight: '18px'}}>
                <ShieldAlert size={24} />
              </div>
              <div className="text-start">
                <h6 className="m-0 text-bold-heavy" style={{fontSize: '1.1rem'}}>Secure Encrypted</h6>
                <p className="m-0 text-muted fw-semibold" style={{fontSize: '0.85rem'}}>Your data is safe with us.</p>
              </div>
           </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;