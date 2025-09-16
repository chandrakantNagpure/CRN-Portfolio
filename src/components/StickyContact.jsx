import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaEnvelope, FaPhoneAlt, FaTimes, FaCommentDots, FaCog } from 'react-icons/fa';
import { useTech } from './TechContext';
import { techIcons } from '../utils/techIcons';

// Animation variants for better performance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    x: 50,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
  exit: {
    opacity: 0,
    x: 50,
    scale: 0.8,
    transition: {
      duration: 0.2,
    },
  },
};

const buttonVariants = {
  initial: { scale: 0, rotate: -180 },
  animate: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 12,
    },
  },
  exit: {
    scale: 0,
    rotate: 180,
    transition: {
      duration: 0.3,
    },
  },
  hover: {
    scale: 1.1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
  tap: { scale: 0.95 },
};

function StickyContact() {
  const { techColors, selectedTech, bgColor, updateTech } = useTech();
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const stickyContactRef = useRef(null);
  const primaryColor = bgColor || techColors[selectedTech] || '#4B5563';

  // Auto-hide tooltip after 3 seconds
  useEffect(() => {
    if (showButton && !isOpen) {
      const timer = setTimeout(() => setShowTooltip(true), 1000);
      const hideTimer = setTimeout(() => setShowTooltip(false), 5000);
      return () => {
        clearTimeout(timer);
        clearTimeout(hideTimer);
      };
    }
  }, [showButton, isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldShow = scrollY > 200; // Reduced threshold

      if (shouldShow !== showButton) {
        setShowButton(shouldShow);
        if (!shouldShow) {
          setIsOpen(false); // Close menu when hiding
          setShowTooltip(false);
        }
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showButton]);

  // Click outside to close contact menu
  useEffect(() => {
    const handleClickOutside = event => {
      if (stickyContactRef.current && !stickyContactRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowTooltip(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const contactOptions = [
    {
      icon: FaWhatsapp,
      label: 'WhatsApp',
      action: () =>
        window.open(
          "https://wa.me/919767847979?text=Hi Chandrakant! I found your portfolio and I'm interested in discussing a project.",
          '_blank'
        ),
      color: '#25D366',
      description: 'Quick chat',
    },
    {
      icon: FaEnvelope,
      label: 'Email',
      action: () =>
        window.open(
          'mailto:nagpure.cr@gmail.com?subject=Project Inquiry&body=Hi Chandrakant, I found your portfolio and would like to discuss a project...',
          '_blank'
        ),
      color: '#EA4335',
      description: 'Detailed inquiry',
    },
    {
      icon: FaPhoneAlt,
      label: 'Call',
      action: () => window.open('tel:+919767847979', '_blank'),
      color: '#4285F4',
      description: 'Immediate talk',
    },
  ];

  return (
    <AnimatePresence mode="wait">
      {showButton && (
        <motion.div
          className="fixed bottom-4 right-4 z-50"
          variants={buttonVariants}
          ref={stickyContactRef}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Contact Options Menu */}
          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.div
                className="absolute bottom-20 right-0 w-72 mb-2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 p-3 space-y-2">
                  {/* Contact Section */}
                  <div className="text-center pb-2 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-800">Get In Touch</h3>
                    <p className="text-xs text-gray-500">Choose your preferred method</p>
                  </div>

                  {contactOptions.map((option, index) => (
                    <motion.button
                      key={option.label}
                      variants={itemVariants}
                      onClick={() => {
                        option.action();
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 group"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform duration-200"
                        style={{ backgroundColor: option.color }}
                      >
                        <option.icon size={16} />
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-medium text-gray-800 text-sm">{option.label}</div>
                        <div className="text-xs text-gray-500">{option.description}</div>
                      </div>
                    </motion.button>
                  ))}

                  {/* Tech Selection Section */}
                  <div className="pt-2 border-t border-gray-200">
                    <div className="text-center pb-2">
                      <h3 className="text-sm font-semibold text-gray-800 flex items-center justify-center gap-2">
                        <FaCog size={12} /> Tech Theme
                      </h3>
                      <p className="text-xs text-gray-500">Change portfolio style</p>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center">
                      {techIcons
                        .filter(item => item.tech !== 'default')
                        .map(({ icon: TechIcon, tech, label }) => {
                          const isSelected = selectedTech === tech;
                          return (
                            <motion.button
                              key={tech}
                              onClick={() => {
                                updateTech(tech);
                                // Keep menu open for tech selection
                              }}
                              className={`p-2 rounded-full transition-all duration-200 ${
                                isSelected
                                  ? 'bg-gray-800 scale-110'
                                  : 'bg-gray-100 hover:bg-gray-200'
                              }`}
                              whileHover={{ scale: isSelected ? 1.1 : 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              title={`Switch to ${label} theme`}
                            >
                              <TechIcon size={16} color={isSelected ? '#fff' : techColors[tech]} />
                            </motion.button>
                          );
                        })}
                    </div>
                  </div>
                </div>

                {/* Arrow pointer */}
                <div
                  className="absolute -bottom-1 right-6 w-3 h-3 bg-white border-r border-b border-gray-200/50 transform rotate-45"
                  style={{ borderRadius: '0 0 2px 0' }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Toggle Button */}
          <motion.button
            onClick={() => {
              setIsOpen(!isOpen);
              setShowTooltip(false);
            }}
            className="relative w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-white font-bold overflow-hidden"
            style={{ backgroundColor: primaryColor }}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {/* Pulse animation - only when closed */}
            {!isOpen && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: primaryColor }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}

            {/* Button Icon */}
            <motion.div
              animate={{
                rotate: isOpen ? 135 : 0,
                scale: isOpen ? 0.9 : 1,
              }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 12,
              }}
              className="relative z-10"
            >
              {isOpen ? <FaTimes size={20} /> : <FaCommentDots size={20} />}
            </motion.div>
          </motion.button>

          {/* Notification Badge */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow-sm"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-white rounded-full"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tooltip */}
          <AnimatePresence>
            {!isOpen && showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                transition={{ type: 'spring', duration: 0.4 }}
                className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2"
              >
                <div className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap shadow-lg">
                  💬 Let's discuss your project!
                  <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2">
                    <div className="w-0 h-0 border-l-8 border-r-0 border-t-4 border-b-4 border-l-gray-900 border-t-transparent border-b-transparent" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default StickyContact;
