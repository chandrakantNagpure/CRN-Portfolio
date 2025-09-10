import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaRocket, 
  FaDownload, 
  FaTimes, 
  FaGift,
  FaCheckCircle,
  FaClock,
  FaUsers,
  FaChartLine
} from 'react-icons/fa';
import { useTech } from './TechContext';
import { useLanguage } from '../contexts/LanguageContext';
import { getContrastTextColor } from '../utils/colors';

// Lead Magnets Data
const leadMagnets = [
  {
    id: 1,
    title: "Free Website Audit Checklist",
    subtitle: "25-Point Professional Checklist",
    description: "Get a comprehensive checklist to audit any website's performance, SEO, and user experience. Used by professional developers.",
    icon: FaCheckCircle,
    downloadUrl: "#",
    buttonText: "Download Free Checklist"
  },
  {
    id: 2,
    title: "React Development Guide",
    subtitle: "From Beginner to Expert",
    description: "Complete guide covering React best practices, performance optimization, and modern development techniques.",
    icon: FaRocket,
    downloadUrl: "#",
    buttonText: "Get Free Guide"
  },
  {
    id: 3,
    title: "WordPress Speed Optimization",
    subtitle: "Step-by-Step Tutorial",
    description: "Learn how to optimize WordPress websites for speed and performance. Includes tools, plugins, and techniques.",
    icon: FaChartLine,
    downloadUrl: "#",
    buttonText: "Download Tutorial"
  }
];

// Social Proof Stats
const statsData = [
  { number: "100+", label: "Projects Completed", icon: FaRocket },
  { number: "50+", label: "Happy Clients", icon: FaUsers },
  { number: "98%", label: "Client Satisfaction", icon: FaCheckCircle },
  { number: "24h", label: "Avg Response Time", icon: FaClock }
];

function LeadCapture() {
  const { t } = useLanguage();
  const { bgColor, techColors, selectedTech } = useTech();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMagnet, setSelectedMagnet] = useState(leadMagnets[0]);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);

  const textColor = getContrastTextColor(bgColor);
  const primaryColor = techColors[selectedTech] || '#4B5563';

  // Show popup after 30 seconds or on scroll
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!localStorage.getItem('leadMagnetShown')) {
        setShowPopup(true);
      }
    }, 30000);

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent > 50 && !showFloatingCTA) {
        setShowFloatingCTA(true);
      }
      
      if (scrollPercent > 70 && !localStorage.getItem('leadMagnetShown')) {
        setShowPopup(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showFloatingCTA]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Here you would integrate with your email service
      console.log('Email submitted:', email);
      setIsSubmitted(true);
      localStorage.setItem('leadMagnetShown', 'true');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setShowPopup(false);
        setEmail('');
      }, 3000);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    localStorage.setItem('leadMagnetShown', 'true');
  };

  return (
    <>
      {/* Floating CTA Button */}
      <AnimatePresence>
        {showFloatingCTA && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed bottom-6 right-6 z-40 md:bottom-8 md:right-8"
          >
            <motion.button
              onClick={() => setShowPopup(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 text-sm font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ backgroundColor: primaryColor }}
            >
              <FaGift size={18} />
              <span className="hidden md:inline">Free Resources</span>
              <span className="md:hidden">Free</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lead Magnet Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={closePopup}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes size={20} />
              </button>

              {!isSubmitted ? (
                <>
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: primaryColor + '20' }}
                    >
                      <selectedMagnet.icon size={28} style={{ color: primaryColor }} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedMagnet.title}
                    </h3>
                    <p className="text-sm font-medium mb-2" style={{ color: primaryColor }}>
                      {selectedMagnet.subtitle}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {selectedMagnet.description}
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
                        style={{ focusRingColor: primaryColor }}
                        required
                      />
                    </div>
                    <motion.button
                      type="submit"
                      className="w-full py-3 px-6 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      style={{ backgroundColor: primaryColor }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {selectedMagnet.buttonText}
                    </motion.button>
                  </form>

                  {/* Lead Magnet Options */}
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 mb-3">Or choose another resource:</p>
                    <div className="space-y-2">
                      {leadMagnets.map((magnet) => (
                        <button
                          key={magnet.id}
                          onClick={() => setSelectedMagnet(magnet)}
                          className={`w-full text-left p-2 rounded-lg transition-all text-sm ${
                            selectedMagnet.id === magnet.id 
                              ? 'bg-opacity-20 border' 
                              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                          style={{
                            backgroundColor: selectedMagnet.id === magnet.id ? primaryColor + '20' : undefined,
                            borderColor: selectedMagnet.id === magnet.id ? primaryColor : undefined
                          }}
                        >
                          {magnet.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Trust Indicators */}
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      {statsData.slice(0, 2).map((stat, index) => (
                        <div key={index}>
                          <div className="font-bold text-lg" style={{ color: primaryColor }}>
                            {stat.number}
                          </div>
                          <div className="text-xs text-gray-500">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                /* Success State */
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ backgroundColor: primaryColor + '20' }}
                  >
                    <FaCheckCircle size={40} style={{ color: primaryColor }} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Thank You!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Your free resource is being sent to your email. 
                    Check your inbox in a few minutes.
                  </p>
                  <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-4">
                    <p className="text-green-800 dark:text-green-200 text-sm">
                      <strong>Bonus:</strong> You'll also receive exclusive web development tips and special offers!
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inline Lead Capture Section */}
      <section 
        className="py-16 px-6 md:px-16 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${primaryColor}15, ${primaryColor}05)`,
          color: textColor,
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-6">
              Ready to Transform Your Business Online?
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Join 500+ satisfied clients who've grown their business with professional web development
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {statsData.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: primaryColor + '20' }}
                  >
                    <stat.icon size={20} style={{ color: primaryColor }} />
                  </div>
                  <div className="text-2xl font-bold mb-1" style={{ color: primaryColor }}>
                    {stat.number}
                  </div>
                  <div className="text-sm opacity-70">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#contact"
                className="px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{ backgroundColor: primaryColor }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Project Today
              </motion.a>
              <motion.button
                onClick={() => setShowPopup(true)}
                className="px-8 py-4 rounded-full font-semibold border-2 transition-all duration-300 flex items-center gap-2 justify-center"
                style={{ 
                  borderColor: primaryColor, 
                  color: primaryColor,
                  backgroundColor: 'transparent'
                }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: primaryColor + '10'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload size={16} />
                Get Free Resources
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default LeadCapture;
