import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const SuccessPage = () => {
  const navigate = useNavigate();
    const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  const checkmarkVariants = {
    hidden: { scale: 0, rotate: -45 },
    visible: { 
      scale: 1, 
      rotate: 0, 
      transition: { delay: 0.3, type: "spring", stiffness: 200 } 
    }
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 1,
      transition: { delay: 0.5 + (i * 0.1) }
    })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans">
      <motion.div 
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center border-t-8 border-green-500"
      >
        {/* Success Icon Animation */}
        <div className="flex justify-center mb-6">
          <motion.div 
            variants={checkmarkVariants}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center border-4 border-green-500"
          >
            <Check size={40} className="text-green-600 stroke-[3px]" />
          </motion.div>
        </div>

        {/* Main Heading */}
        <motion.h1 
          custom={1}
          variants={textVariants}
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
        >
          Great, your account is <span className="text-green-600">created successfully!</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p 
          custom={2}
          variants={textVariants}
          className="text-gray-600 mb-8 text-lg"
        >
          Please check your inbox, an email was sent to you to confirm your registration.
        </motion.p>

        {/* Action Buttons (Red Theme as requested) */}
        <motion.div 
          custom={3}
          variants={textVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
          onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg"
          >
            Go to home
          </motion.button>
          
          <motion.button
            onClick={() => navigate('/login')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 font-semibold py-3 px-6 rounded-lg transition-colors shadow-md"
          >
            Go to login page
          </motion.button>
        </motion.div>

        {/* Footer small note */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 text-sm text-gray-400"
        >
          Didn't receive email? <span className="text-red-500 cursor-pointer underline">Resend</span>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SuccessPage;