import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {
  Play, ShieldCheck, Zap, Globe,
  Tv, Cpu, Headphones, ChevronRight, Languages
} from 'lucide-react';

const TwentyFourSeven = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // Language Toggle Function
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans overflow-hidden position-relative">
      {/* Inline Professional CSS */}
      <style>
        {`
          .red-gradient-bg {
            background: radial-gradient(circle at top right, rgba(230, 57, 70, 0.05), transparent),
                        radial-gradient(circle at bottom left, rgba(59, 130, 246, 0.03), transparent);
          }
          .glass-card {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.5);
            border-radius: 24px;
            transition: all 0.3s ease;
          }
          .glass-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.05);
            border-color: #ffe5e5;
          }
          .btn-red {
            background: #e63946;
            color: white;
            padding: 12px 30px;
            border-radius: 50px;
            font-weight: 600;
            border: none;
            transition: 0.3s;
          }
          .btn-red:hover {
            background: #c32f3a;
            box-shadow: 0 10px 20px rgba(230, 57, 70, 0.2);
          }
          .icon-box-red {
            background: #fff1f1;
            color: #e63946;
            padding: 15px;
            border-radius: 18px;
            display: inline-flex;
          }
          .lang-toggle {
            position: absolute;
            top: 20px;
            right: 20px;
            z-index: 1000;
            background: white;
            border: 1px solid #ddd;
            padding: 8px 15px;
            border-radius: 50px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          }
        `}
      </style>




      <div className="container py-5 mt-5 red-gradient-bg">
        {/* 1. HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-5"
        >
          <span className="badge rounded-pill px-3 py-2 mb-3" style={{ backgroundColor: '#fff1f1', color: '#e63946', fontWeight: 'bold' }}>
            {t('tfs_badge')}
          </span>
          <h1 className="display-4 fw-bold text-slate-900 mb-3">
            {t('tfs_hero_title')} <span style={{ color: '#e63946' }}>{t('tfs_hero_span')}</span>
          </h1>
          <p className="text-muted fs-5 mx-auto" style={{ maxWidth: '700px' }}>
            {t('tfs_hero_sub')}
          </p>
          <div className="mt-4 d-flex gap-3 justify-content-center">
            <button className="btn-red d-flex align-items-center gap-2">
              {t('tfs_btn_start')} <Play size={18} fill="white" />
            </button>
            <button className="btn btn-outline-secondary rounded-pill px-4">{t('tfs_btn_specs')}</button>
          </div>
        </motion.div>

        {/* 2. WHY CHOOSE (Feature Grid) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="row g-4 mt-5"
        >
          {[
            { icon: <Zap />, title: t('tfs_feat1_title'), desc: t('tfs_feat1_desc') },
            { icon: <Globe />, title: t('tfs_feat2_title'), desc: t('tfs_feat2_desc') },
            { icon: <Tv />, title: t('tfs_feat3_title'), desc: t('tfs_feat3_desc') },
            { icon: <Cpu />, title: t('tfs_feat4_title'), desc: t('tfs_feat4_desc') }
          ].map((feature, idx) => (
            <motion.div key={idx} variants={itemVariants} className="col-md-6 col-lg-3">
              <div className="glass-card p-4 h-100 text-center">
                <div className="icon-box-red mb-3">
                  {feature.icon}
                </div>
                <h5 className="fw-bold">{feature.title}</h5>
                <p className="small text-muted mb-0">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 3. TECHNICAL SPEC & CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-5 p-5 glass-card text-center position-relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #ffffff 0%, #fff1f1 100%)' }}
        >
          <div className="row align-items-center">
            <div className="col-lg-8 text-lg-start">
              <h3 className="fw-bold">{t('tfs_cta_title')} <span style={{ color: '#e63946' }}>{t('tfs_cta_span')}</span></h3>
              <p className="text-muted">{t('tfs_cta_sub')}</p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <button
                className="btn-red w-100 py-3 d-flex align-items-center justify-content-center gap-2"
                onClick={() => navigate("/home")}
              >
                {t('tfs_btn_get_access')} <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* 4. FOOTER SUPPORT MODULE */}
        <div className="d-flex justify-content-center mt-5">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="d-flex align-items-center bg-white border rounded-pill px-4 py-2 shadow-sm"
            style={{ cursor: 'pointer' }}
          >
            <div style={{ background: '#fff1f1', padding: '10px', borderRadius: '50%', color: '#e63946', marginRight: '15px' }}>
              <Headphones size={20} />
            </div>
            <div className="text-start">
              <p className="m-0 fw-bold small">{t('tfs_support_title')}</p>
              <p className="m-0 text-muted" style={{ fontSize: '10px' }}>{t('tfs_support_sub')}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TwentyFourSeven;