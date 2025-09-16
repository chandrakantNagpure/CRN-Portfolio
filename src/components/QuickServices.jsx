import { motion } from 'framer-motion';
import {
  FaReact,
  FaWordpress,
  FaMobile,
  FaRocket,
  FaDollarSign,
  FaClock,
  FaCheckCircle,
} from 'react-icons/fa';
import { useTech } from './TechContext';
import { getContrastTextColor } from '../utils/colors';

const quickServices = [
  {
    icon: FaReact,
    title: 'React Development',
    description: 'Modern, fast web applications',
    price: 'From $2,500',
    features: ['Custom Components', 'State Management', 'API Integration'],
    timeline: '2-4 weeks',
    popular: false,
  },
  {
    icon: FaWordpress,
    title: 'WordPress Sites',
    description: 'Professional business websites',
    price: 'From $1,500',
    features: ['Custom Design', 'SEO Optimized', 'Mobile Ready'],
    timeline: '1-3 weeks',
    popular: true,
  },
  {
    icon: FaMobile,
    title: 'Landing Pages',
    description: 'High-converting sales pages',
    price: 'From $800',
    features: ['Conversion Focused', 'Fast Loading', 'Lead Capture'],
    timeline: '1 week',
    popular: false,
  },
  {
    icon: FaRocket,
    title: 'Full Projects',
    description: 'Complete web solutions',
    price: 'From $4,000',
    features: ['Full Stack', 'Database', 'Deployment'],
    timeline: '4-8 weeks',
    popular: false,
  },
];

function QuickServices() {
  const { bgColor, techColors, selectedTech } = useTech();
  const textColor = getContrastTextColor(bgColor);
  const primaryColor = techColors[selectedTech] || '#4B5563';

  return (
    <section
      className="py-16 px-6 md:px-16 relative overflow-hidden transition-all duration-500 ease-in-out"
      style={{
        // Match Hero gradient exactly
        background: bgColor
          ? `linear-gradient(to right, ${bgColor}33, ${bgColor})`
          : `linear-gradient(to right, #ffffff33, #ffffff)`,
        color: textColor,
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-4">
            🎯 What I Can Build For You
          </h2>
          <p className="text-lg md:text-xl opacity-80 max-w-3xl mx-auto">
            Professional web development services with transparent pricing and fast delivery
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl p-6 shadow-lg border hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm ${
                service.popular ? 'border-2 transform scale-105' : 'border border-white/40'
              }`}
              style={{
                borderColor: service.popular ? primaryColor : undefined,
              }}
              whileHover={{ scale: service.popular ? 1.05 : 1.02 }}
            >
              {service.popular && (
                <div
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-white text-sm font-medium"
                  style={{ backgroundColor: primaryColor }}
                >
                  Most Popular
                </div>
              )}

              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: primaryColor + '20' }}
                >
                  <service.icon size={28} style={{ color: primaryColor }} />
                </div>

                <h3 className="text-xl font-bold mb-2" style={{ color: textColor }}>
                  {service.title}
                </h3>

                <p className="text-gray-600 mb-4 text-sm">{service.description}</p>

                <div className="mb-4">
                  <div className="text-2xl font-bold mb-1" style={{ color: primaryColor }}>
                    {service.price}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center justify-center gap-1">
                    <FaClock size={12} />
                    {service.timeline}
                  </div>
                </div>

                <ul className="text-left mb-6 space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <FaCheckCircle size={12} style={{ color: primaryColor }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  className="w-full py-3 px-4 rounded-full font-semibold transition-all duration-300"
                  style={{
                    backgroundColor: service.popular ? primaryColor : 'transparent',
                    color: service.popular ? 'white' : primaryColor,
                    border: `2px solid ${primaryColor}`,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Get Quote
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Value Propositions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-white/60 to-white/30 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/40"
        >
          <h3 className="text-2xl font-bold text-center mb-8" style={{ color: textColor }}>
            ✨ Why Choose Me?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: primaryColor + '20' }}
              >
                <FaClock size={20} style={{ color: primaryColor }} />
              </div>
              <h4 className="font-semibold mb-2">Fast Delivery</h4>
              <p className="text-sm text-gray-600">
                Most projects delivered within 1-4 weeks with regular updates
              </p>
            </div>

            <div className="text-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: primaryColor + '20' }}
              >
                <FaDollarSign size={20} style={{ color: primaryColor }} />
              </div>
              <h4 className="font-semibold mb-2">Transparent Pricing</h4>
              <p className="text-sm text-gray-600">
                No hidden fees. Clear pricing upfront with detailed quotes
              </p>
            </div>

            <div className="text-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: primaryColor + '20' }}
              >
                <FaCheckCircle size={20} style={{ color: primaryColor }} />
              </div>
              <h4 className="font-semibold mb-2">100% Satisfaction</h4>
              <p className="text-sm text-gray-600">
                Unlimited revisions until you're completely happy
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              style={{ backgroundColor: primaryColor }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaRocket size={20} />
              Start Your Project Today
            </motion.a>
            <p className="text-sm text-gray-600 mt-3">
              💬 Free consultation • Quick response • No obligation
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default QuickServices;
