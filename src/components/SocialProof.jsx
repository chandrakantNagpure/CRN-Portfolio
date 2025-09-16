import { motion } from 'framer-motion';
import { FaStar, FaCheckCircle, FaClock, FaUsers, FaRocket } from 'react-icons/fa';
import { useTech } from './TechContext';
import { getContrastTextColor } from '../utils/colors';

const stats = [
  { number: '100+', label: 'Projects Delivered', icon: FaRocket },
  { number: '50+', label: 'Happy Clients', icon: FaUsers },
  { number: '98%', label: 'Client Satisfaction', icon: FaCheckCircle },
  { number: '24hrs', label: 'Response Time', icon: FaClock },
];

const testimonialQuotes = [
  {
    text: 'Chandrakant delivered exactly what we needed. Professional, fast, and great communication!',
    client: 'Sarah Johnson, TechStart Solutions',
    rating: 5,
    project: 'E-commerce Platform',
  },
  {
    text: 'Outstanding React developer! Our website performance improved by 60% after his optimization.',
    client: 'Michael Chen, Digital Agency',
    rating: 5,
    project: 'Performance Optimization',
  },
  {
    text: 'Best investment we made! The WordPress site he built generates leads daily.',
    client: 'Emma Rodriguez, Local Business',
    rating: 5,
    project: 'Business Website',
  },
];

function SocialProof() {
  const { bgColor, techColors, selectedTech } = useTech();
  const textColor = getContrastTextColor(bgColor);
  const primaryColor = techColors[selectedTech] || '#4B5563';

  return (
    <section
      className="py-12 px-6 md:px-16 relative overflow-hidden transition-all duration-500 ease-in-out"
      style={{
        // Updated gradient to match Hero section
        background: bgColor
          ? `linear-gradient(to right, ${bgColor}33, ${bgColor})`
          : `linear-gradient(to right, #ffffff33, #ffffff)`,
        color: textColor,
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8 font-orbitron">
            🚀 <span style={{ color: primaryColor }}>Trusted by 50+ Businesses</span> Worldwide
          </h2>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/40"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: primaryColor + '20' }}
                >
                  <stat.icon size={20} style={{ color: primaryColor }} />
                </div>
                <div
                  className="text-2xl md:text-3xl font-bold mb-1"
                  style={{ color: primaryColor }}
                >
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Testimonials Carousel */}

        {/* Quick CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-lg md:text-xl mb-6 opacity-90">
            ⚡ <strong>Available Now</strong> • Fast 24hr Response • 100% Satisfaction Guaranteed
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="#contact"
              className="px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
              style={{ backgroundColor: primaryColor }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🚀 Start Your Project - Free Quote
            </motion.a>
            <p className="text-sm text-gray-600">💬 Let's discuss your project in 15 minutes!</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default SocialProof;
