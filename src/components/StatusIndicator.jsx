import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StatusIndicator = ({ className = '' }) => {
  const [status, setStatus] = useState('available');
  const [isExpanded, setIsExpanded] = useState(false);

  // Simulate status updates (in a real app, this would come from an API or manual update)
  useEffect(() => {
    const statuses = ['available', 'busy', 'away'];
    const interval = setInterval(() => {
      // For demo purposes, randomly change status occasionally
      if (Math.random() < 0.1) { // 10% chance every 30 seconds
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        setStatus(randomStatus);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const statusConfig = {
    available: {
      color: '#10B981',
      bgColor: '#D1FAE5',
      text: 'Available for work',
      description: 'Open to new opportunities and projects',
      icon: '✅'
    },
    busy: {
      color: '#F59E0B',
      bgColor: '#FEF3C7',
      text: 'Currently busy',
      description: 'Working on existing projects',
      icon: '⏳'
    },
    away: {
      color: '#EF4444',
      bgColor: '#FEE2E2',
      text: 'Away',
      description: 'Not available at the moment',
      icon: '🔴'
    }
  };

  const currentStatus = statusConfig[status];

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative">
          <motion.div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: currentStatus.color }}
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
            style={{ backgroundColor: currentStatus.color }}
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
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {currentStatus.text}
        </span>
        <motion.span
          className="text-xs text-gray-500"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ▼
        </motion.span>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="absolute top-full left-0 mt-2 p-3 rounded-lg shadow-lg border z-50 min-w-[200px]"
            style={{ 
              backgroundColor: currentStatus.bgColor,
              borderColor: currentStatus.color + '40'
            }}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{currentStatus.icon}</span>
              <span className="font-semibold text-gray-800">
                {currentStatus.text}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              {currentStatus.description}
            </p>
            <div className="text-xs text-gray-500">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StatusIndicator;