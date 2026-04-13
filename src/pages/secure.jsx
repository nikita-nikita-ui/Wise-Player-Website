import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, EyeOff, Lock, Zap, ShieldAlert, Languages } from 'lucide-react';

const SecurityPage = () => {
  const { t, i18n } = useTranslation();


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
    <div className="min-h-screen bg-[#fcfdfe] text-slate-900 py-5 font-sans overflow-hidden position-relative">
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
          }
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
            font-weight: 700;
            color: #475569;
          }
          .text-bold-heavy { font-weight: 800 !important; }
        
        `}
      </style>



      <div className="container mt-5">
        {/* HERO SECTION */}
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-5">
          <motion.div whileHover={{ scale: 1.05 }} className="d-inline-flex align-items-center gap-2 mb-4 bg-white px-4 py-2 rounded-pill shadow-sm border">
            <ShieldCheck size={18} className="text-danger" />
            <span className="small text-bold-heavy text-uppercase tracking-wider">{t('sec_badge')}</span>
          </motion.div>

          <h1 className="display-4 text-bold-heavy mb-3 tracking-tight">
            {t('sec_hero_title1')} <span className="text-danger">{t('sec_hero_title2')}</span>
          </h1>
          <p className="text-muted mx-auto fw-semibold" style={{ maxWidth: '650px', fontSize: '1.1rem' }}>
            {t('sec_hero_sub')}
          </p>
        </motion.div>

        {/* FEATURE CARDS */}
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="row g-4 justify-content-center">
          {/* Total Privacy Card */}
          <motion.div variants={fadeInUp} className="col-md-5 col-lg-4">
            <div className="secure-card p-5 h-100 text-center position-relative">
              <motion.div {...floatAnim} className="icon-bg-red mb-4">
                <EyeOff size={36} />
                <div className="scan-line"></div>
              </motion.div>
              <h3 className="text-bold-heavy mb-3">{t('sec_card1_title')}</h3>
              <ul className="list-unstyled text-muted">
                <li className="mb-3"><span className="text-danger">●</span> <b className="text-dark">{t('sec_card1_item1')}</b> {t('sec_card1_desc1')}</li>
                <li><span className="text-danger">●</span> <b className="text-dark">{t('sec_card1_item2')}</b> {t('sec_card1_desc2')}</li>
              </ul>
            </div>
          </motion.div>

          {/* AES-256 Card */}
          <motion.div variants={fadeInUp} className="col-md-5 col-lg-4">
            <div className="secure-card p-5 h-100 text-center">
              <motion.div {...floatAnim} className="icon-bg-red mb-4" style={{ animationDelay: '0.5s' }}>
                <Lock size={36} />
              </motion.div>
              <h3 className="text-bold-heavy mb-3">{t('sec_card2_title')}</h3>
              <ul className="list-unstyled text-muted">
                <li className="mb-3"><span className="text-danger">●</span> <b className="text-dark">{t('sec_card2_item1')}</b> {t('sec_card2_desc1')}</li>
                <li><span className="text-danger">●</span> <b className="text-dark">{t('sec_card2_item2')}</b> {t('sec_card2_desc2')}</li>
              </ul>
            </div>
          </motion.div>
        </motion.div>

        {/* STATS SECTION */}
        <div className="mt-5 pt-5 text-center">
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <div className="stats-badge">{t('sec_stat_enc')} <span className="text-danger">AES-256</span></div>
            <div className="stats-badge">{t('sec_stat_prot')} <span className="text-dark">WireGuard</span></div>
            <div className="stats-badge">{t('sec_stat_status')} <span className="text-success">● {t('sec_stat_live')}</span></div>
          </div>
        </div>

        {/* BOTTOM SUPPORT */}
        <div className="d-flex justify-content-center mt-5 mb-4">
          <motion.div whileHover={{ scale: 1.08 }} className="d-flex align-items-center bg-white border rounded-4 px-4 py-3 shadow-sm" style={{ cursor: 'pointer' }}>
            <div style={{ background: '#fff1f1', padding: '12px', borderRadius: '16px', color: '#e63946', marginRight: '18px' }}>
              <ShieldAlert size={24} />
            </div>
            <div className="text-start">
              <h6 className="m-0 text-bold-heavy">{t('sec_footer_title')}</h6>
              <p className="m-0 text-muted fw-semibold" style={{ fontSize: '0.85rem' }}>{t('sec_footer_sub')}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;