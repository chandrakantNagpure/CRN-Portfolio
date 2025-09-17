import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHome, FaArrowLeft } from 'react-icons/fa';
import { useTech } from '../components/TechContext';
import { useLanguage } from '../contexts/LanguageContext';
import { getContrastTextColor } from '../utils/colors';
import ParticleCanvas from '../components/ParticleCanvas';
import Footer from '../components/Footer';

function NotFoundPage() {
  const { t } = useLanguage();
  const { selectedTech, techColors, bgColor } = useTech();
  const textColor = getContrastTextColor(bgColor);
  const primaryColor = techColors[selectedTech] || '#4B5563';

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 md:px-16 relative font-poppins overflow-hidden"
      style={{
        background: bgColor
          ? `linear-gradient(to right, ${bgColor}33, ${bgColor})`
          : `linear-gradient(to right, #ffffff33, #ffffff)`,
        color: textColor,
      }}
    >
      <ParticleCanvas bgColor={bgColor || '#4B5563'} />

      <div className="max-w-2xl w-full z-10 relative text-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 404 Number */}
          <motion.h1
            className="text-8xl md:text-9xl font-orbitron font-bold mb-4"
            style={{ color: primaryColor }}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            404
          </motion.h1>

          {/* Error Message */}
          <h2
            className="text-3xl md:text-4xl font-bold mb-6 font-orbitron"
            style={{ color: textColor }}
          >
            Page Not Found
          </h2>

          <p
            className="text-lg md:text-xl mb-8 max-w-lg mx-auto"
            style={{ color: textColor, opacity: 0.8 }}
          >
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or
            you entered the wrong URL.
          </p>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-lg transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: primaryColor,
                color: getContrastTextColor(primaryColor),
              }}
            >
              <FaHome size={18} />
              Go Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-lg border-2 transition-all duration-300 hover:scale-105"
              style={{
                borderColor: primaryColor,
                color: primaryColor,
                backgroundColor: 'transparent',
              }}
              onMouseEnter={e => {
                e.target.style.backgroundColor = primaryColor;
                e.target.style.color = getContrastTextColor(primaryColor);
              }}
              onMouseLeave={e => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = primaryColor;
              }}
            >
              <FaArrowLeft size={18} />
              Go Back
            </button>
          </motion.div>

          {/* Quick Navigation */}
          <motion.div
            className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 shadow-lg"
            style={{ border: `1px solid ${primaryColor}33` }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-4 font-orbitron" style={{ color: textColor }}>
              Quick Navigation
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                to="/"
                className="p-3 rounded-lg transition-all duration-300 hover:scale-105 bg-white bg-opacity-10 hover:bg-opacity-20"
                style={{ color: textColor }}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🏠</div>
                  <div className="text-sm font-medium">Home</div>
                </div>
              </Link>

              <Link
                to="/about"
                className="p-3 rounded-lg transition-all duration-300 hover:scale-105 bg-white bg-opacity-10 hover:bg-opacity-20"
                style={{ color: textColor }}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">👨‍💻</div>
                  <div className="text-sm font-medium">About</div>
                </div>
              </Link>

              <Link
                to="/projects"
                className="p-3 rounded-lg transition-all duration-300 hover:scale-105 bg-white bg-opacity-10 hover:bg-opacity-20"
                style={{ color: textColor }}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">💼</div>
                  <div className="text-sm font-medium">Projects</div>
                </div>
              </Link>

              <Link
                to="/contact"
                className="p-3 rounded-lg transition-all duration-300 hover:scale-105 bg-white bg-opacity-10 hover:bg-opacity-20"
                style={{ color: textColor }}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">📧</div>
                  <div className="text-sm font-medium">Contact</div>
                </div>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <Footer />

    </div>
  );
}

export default NotFoundPage;
