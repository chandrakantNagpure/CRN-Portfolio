import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { FaGlobe, FaChevronDown } from 'react-icons/fa';

const LanguageSwitcher = ({ className = '' }) => {
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = availableLanguages.find(lang => lang.code === currentLanguage);

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <motion.button
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white bg-opacity-20 backdrop-blur-lg hover:bg-opacity-30 transition-all duration-300 border border-white border-opacity-20"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Change language"
      >
        <FaGlobe size={16} />
        <span className="text-sm font-medium">{currentLang?.flag}</span>
        <span className="hidden sm:inline text-sm">{currentLang?.name}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FaChevronDown size={12} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              className="absolute top-full right-0 mt-2 bg-white bg-opacity-95 backdrop-blur-lg rounded-lg shadow-lg border border-white border-opacity-20 overflow-hidden z-50 min-w-[150px]"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {availableLanguages.map((language) => (
                <motion.button
                  key={language.code}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 transition-colors duration-200 ${
                    currentLanguage === language.code ? 'bg-gray-50 font-medium' : ''
                  }`}
                  onClick={() => handleLanguageChange(language.code)}
                  whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                  style={{ color: '#1f2937' }}
                >
                  <span className="text-lg">{language.flag}</span>
                  <span className="text-sm">{language.name}</span>
                  {currentLanguage === language.code && (
                    <motion.div
                      className="ml-auto w-2 h-2 bg-blue-500 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;