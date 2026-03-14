import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Globe, User, Mail, Send } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    macAddress: '',
    classification: '',
    description: '',
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
<div className="min-h-screen bg-gradient-to-br from-white via-gray-300 to-red-100 text-gray-900 flex flex-col items-center justify-center p-4 font-sans">      
      <motion.h1 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-black mb-10 tracking-widest text-white uppercase"
        style={{ textShadow: '0 0 15px rgba(255, 0, 0, 0.7)' }}
      >
        CONTACT <span className="text-red-600">US</span>
      </motion.h1>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-3xl bg-[#111] border border-red-900/30 rounded-xl p-8 shadow-2xl hover:shadow-[0_0_40px_rgba(255,0,0,0.2)] transition-shadow duration-500"
      >
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">First Name</label>
              <input 
                type="text" 
                className="w-full bg-black border border-gray-800 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-lg p-3 outline-none transition-all duration-300" 
              />
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Last Name</label>
              <input 
                type="text" 
                className="w-full bg-black border border-gray-800 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-lg p-3 outline-none transition-all duration-300" 
              />
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Email</label>
            <input 
              type="email" 
              className="w-full bg-black border border-gray-800 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-lg p-3 outline-none transition-all duration-300" 
            />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">MAC Address <span className="text-[10px] lowercase text-gray-600">(optional)</span></label>
            <input 
              type="text" 
              className="w-full bg-black border border-gray-800 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-lg p-3 outline-none transition-all duration-300" 
            />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Classification</label>
            <select className="w-full bg-black border border-gray-800 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-lg p-3 outline-none appearance-none transition-all duration-300">
              <option>Select...</option>
              <option>Technical Support</option>
              <option>Billing Issue</option>
              <option>General Inquiry</option>
            </select>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Description</label>
            <div className="border border-gray-800 rounded-lg overflow-hidden bg-black focus-within:border-red-600 transition-all duration-300">
              <div className="flex gap-4 p-2 border-b border-gray-800 bg-[#151515]">
                <button type="button" className="text-gray-400 hover:text-red-500 font-bold">B</button>
                <button type="button" className="text-gray-400 hover:text-red-500 italic font-serif">I</button>
                <button type="button" className="text-gray-400 hover:text-red-500 underline">U</button>
              </div>
              <textarea 
                rows="4"
                placeholder="Write your message here..."
                className="w-full bg-transparent p-3 outline-none resize-none placeholder:text-gray-700"
              ></textarea>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Attachment - <span className="text-[10px] text-gray-600">Only 1 photo or video allowed</span></label>
            <div className="border-2 border-dashed border-gray-800 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-red-600 hover:bg-red-950/5 transition-all group">
              <Upload className="text-gray-600 group-hover:text-red-500 mb-2 transition-colors" />
              <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">Drag & drop file here, or click to select file</p>
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: '#dc2626', boxShadow: '0 0 20px rgba(220, 38, 38, 0.5)' }}
            whileTap={{ scale: 0.98 }}
            className="w-full md:w-32 bg-red-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg uppercase tracking-tighter"
          >
            Send
          </motion.button>
        </form>
      </motion.div>

      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 w-full max-w-5xl flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 gap-4 border-t border-gray-900 pt-6"
      >
        <p>© 2021 / 2026 HotPlayer - All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-red-500 flex items-center gap-1 transition-colors">
            <FileText size={12} /> Terms of online sale
          </a>
          <a href="#" className="hover:text-red-500 flex items-center gap-1 transition-colors">
            <Globe size={12} /> Privacy policy
          </a>
        </div>
      </motion.footer>
    </div>
  );
};

export default ContactUs;