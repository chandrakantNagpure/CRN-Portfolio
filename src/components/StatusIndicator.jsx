import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTech } from './TechContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useStatus, getTimeAgo } from '../contexts/StatusContext';

import { getContrastTextColor } from "../utils/colors";

const StatusIndicator = ({ className = '', showManualControls = false }) => {
  const { t } = useLanguage();
  const { bgColor } = useTech();
  const { status, lastUpdated, updateStatus, statusConfig } = useStatus();
  const [isExpanded, setIsExpanded] = useState(false);
  const statusRef = useRef(null);
  const textColor = getContrastTextColor(bgColor);

  // Click outside to close status indicator
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (statusRef.current && !statusRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  // Merge statusConfig with translations
  const currentStatusConfig = {
    ...statusConfig[status],
    text: t(`status.${status}`),
    description: t(`status.descriptions.${status}`)
  };

  return (
    <div className={`relative ${className}`} ref={statusRef}>
      <motion.div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative">
          <motion.div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: currentStatusConfig.color }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.8, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute inset-0 w-3 h-3 rounded-full"
            style={{ backgroundColor: currentStatusConfig.color }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        <span 
          className="text-sm font-medium"
          style={{ color: textColor }}
        >
          {currentStatusConfig.text}
        </span>
        <motion.span
          className="text-xs"
          style={{ color: textColor, opacity: 0.7 }}
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ▼
        </motion.span>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="absolute top-full left-0 mt-2 p-4 rounded-lg shadow-lg border z-50 min-w-[250px]"
            style={{ 
              backgroundColor: currentStatusConfig.bgColor,
              borderColor: currentStatusConfig.color + '40'
            }}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{currentStatusConfig.icon}</span>
              <span 
                className="font-semibold"
                style={{ color: '#1f2937' }}
              >
                {currentStatusConfig.text}
              </span>
            </div>
            <p 
              className="text-sm mb-3"
              style={{ color: '#4b5563' }}
            >
              {currentStatusConfig.description}
            </p>
            
            {/* Manual Status Controls */}
            {showManualControls && (
              <div className="mb-3 border-t pt-3">
                <p className="text-xs font-medium mb-2" style={{ color: '#6b7280' }}>
                  Update Status:
                </p>
                <div className="flex gap-2">
                  {Object.entries(statusConfig).map(([key, config]) => (
                    <button
                      key={key}
                      onClick={() => updateStatus(key)}
                      className={`px-2 py-1 rounded text-xs transition-colors ${
                        status === key ? 'font-semibold' : 'opacity-70 hover:opacity-100'
                      }`}
                      style={{ 
                        backgroundColor: status === key ? config.color + '20' : 'transparent',
                        color: config.color,
                        border: `1px solid ${config.color}40`
                      }}
                    >
                      {config.icon} {key}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div 
              className="text-xs"
              style={{ color: '#6b7280' }}
            >
              {t('status.lastUpdated')} {getTimeAgo(lastUpdated)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StatusIndicator;