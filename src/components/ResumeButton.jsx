import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaEye, FaSpinner } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const ResumeButton = ({ className = '', variant = 'primary' }) => {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);

    try {
      // Simulate download delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create download link
      const link = document.createElement('a');
      link.href = '/resume.pdf';
      link.download = 'Chandrakant_Nagpure_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Show success toast
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = () => {
    window.open('/resume.pdf', '_blank');
  };

  const baseClasses =
    'inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 relative overflow-hidden';

  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 border border-gray-300',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
  };

  return (
    <>
      <div className={`flex items-center gap-2 ${className}`}>
        <motion.button
          className={`${baseClasses} ${variants[variant]}`}
          onClick={handleDownload}
          disabled={isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Download resume"
        >
          <motion.div
            animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
            transition={isLoading ? { duration: 1, repeat: Infinity, ease: 'linear' } : {}}
          >
            {isLoading ? <FaSpinner size={16} /> : <FaDownload size={16} />}
          </motion.div>
          <span>{isLoading ? t('resume.downloading') : t('hero.downloadResume')}</span>

          {/* Ripple effect */}
          <motion.div
            className="absolute inset-0 bg-white opacity-0"
            whileTap={{ opacity: 0.3, scale: 2 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        <motion.button
          className={`${baseClasses} ${variants.secondary}`}
          onClick={handleView}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="View resume"
        >
          <FaEye size={16} />
          <span>{t('hero.viewResume')}</span>
        </motion.button>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <span>✅</span>
              <span>{t('resume.downloaded')}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ResumeButton;
