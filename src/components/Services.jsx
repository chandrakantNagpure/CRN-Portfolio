import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaReact, 
  FaWordpress, 
  FaMobile, 
  FaRocket, 
  FaCheckCircle, 
  FaClock,
  FaUsers,
  FaChartLine,
  FaCode,
  FaPalette,
  FaSearch,
  FaShoppingCart,
  FaBolt,
  FaShield
} from 'react-icons/fa';
import { useTech } from './TechContext';
import { useLanguage } from '../contexts/LanguageContext';
import { getContrastTextColor } from '../utils/colors';

const servicesData = [
  {
    id: 1,
    icon: FaReact,
    title: "React Development",
    subtitle: "Modern Web Applications",
    description: "Custom React applications with state management, routing, and optimized performance.",
    features: [
      "Component-based architecture",
      "State management (Redux/Context)",
      "API integration",
      "Performance optimization",
      "Responsive design",
      "Testing & deployment"
    ],
    deliverables: [
      "Fully functional React application",
      "Source code with documentation",
      "Deployment setup",
      "Performance report",
      "3 months support"
    ],
    timeline: "2-4 weeks",
    startingPrice: "$2,500",
    popular: false,
    tech: "react"
  },
  {
    id: 2,
    icon: FaWordpress,
    title: "WordPress Development",
    subtitle: "Custom CMS Solutions",
    description: "Professional WordPress websites with custom themes, plugins, and SEO optimization.",
    features: [
      "Custom theme development",
      "Plugin customization",
      "SEO optimization",
      "E-commerce integration",
      "Performance optimization",
      "Security implementation"
    ],
    deliverables: [
      "Custom WordPress website",
      "Admin training",
      "SEO setup",
      "Security configuration",
      "6 months support"
    ],
    timeline: "1-3 weeks",
    startingPrice: "$1,500",
    popular: true,
    tech: "wordpress"
  },
  {
    id: 3,
    icon: FaMobile,
    title: "Responsive Web Design",
    subtitle: "Mobile-First Approach",
    description: "Modern, responsive designs that work perfectly on all devices and screen sizes.",
    features: [
      "Mobile-first design",
      "Cross-browser compatibility",
      "UI/UX optimization",
      "Fast loading speed",
      "Accessibility compliance",
      "Modern animations"
    ],
    deliverables: [
      "Responsive website",
      "Design system",
      "Performance report",
      "Browser testing results",
      "1 month support"
    ],
    timeline: "1-2 weeks",
    startingPrice: "$1,200",
    popular: false,
    tech: "tailwind"
  },
  {
    id: 4,
    icon: FaRocket,
    title: "Full-Stack Solutions",
    subtitle: "End-to-End Development",
    description: "Complete web solutions from frontend to backend, database, and deployment.",
    features: [
      "Frontend & backend development",
      "Database design",
      "API development",
      "Third-party integrations",
      "Cloud deployment",
      "Monitoring & analytics"
    ],
    deliverables: [
      "Complete web application",
      "Database setup",
      "API documentation",
      "Deployment guide",
      "6 months support"
    ],
    timeline: "4-8 weeks",
    startingPrice: "$4,000",
    popular: false,
    tech: "javascript"
  }
];

const packageData = [
  {
    id: 1,
    name: "Starter",
    price: "$1,500",
    duration: "1-2 weeks",
    description: "Perfect for small businesses and startups",
    features: [
      "5-page responsive website",
      "Mobile optimization",
      "Basic SEO setup",
      "Contact form integration",
      "1 month support",
      "Performance optimization"
    ],
    popular: false,
    cta: "Get Started"
  },
  {
    id: 2,
    name: "Professional",
    price: "$3,500",
    duration: "2-4 weeks",
    description: "Ideal for growing businesses",
    features: [
      "Custom React/WordPress site",
      "E-commerce integration",
      "Advanced SEO optimization",
      "Analytics setup",
      "Social media integration",
      "3 months support",
      "Training included"
    ],
    popular: true,
    cta: "Most Popular"
  },
  {
    id: 3,
    name: "Enterprise",
    price: "$7,500+",
    duration: "4-8 weeks",
    description: "Complete solutions for large businesses",
    features: [
      "Full-stack application",
      "Custom integrations",
      "Database design",
      "API development",
      "Cloud deployment",
      "6 months support",
      "Dedicated project manager",
      "24/7 monitoring"
    ],
    popular: false,
    cta: "Contact Us"
  }
];

const whyChooseMeData = [
  {
    icon: FaClock,
    title: "Fast Delivery",
    description: "Quick turnaround without compromising quality"
  },
  {
    icon: FaUsers,
    title: "Client-Focused",
    description: "Your success is my priority"
  },
  {
    icon: FaChartLine,
    title: "Results-Driven",
    description: "Focus on measurable business outcomes"
  },
  {
    icon: FaShield,
    title: "Quality Assured",
    description: "Rigorous testing and code reviews"
  }
];

function Services() {
  const { t } = useLanguage();
  const { bgColor, techColors, selectedTech, updateTech } = useTech();
  const [activeService, setActiveService] = useState(0);
  const [showPackages, setShowPackages] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const textColor = getContrastTextColor(bgColor);
  const primaryColor = techColors[selectedTech] || '#4B5563';

  const handleServiceClick = (index, service) => {
    setActiveService(index);
    updateTech(service.tech);
  };

  return (
    <section
      id="services"
      className="py-20 px-6 md:px-16 relative overflow-hidden"
      style={{
        background: bgColor
          ? `linear-gradient(135deg, ${bgColor}10, ${bgColor}05)`
          : 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
        color: textColor,
      }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 
            className="text-4xl md:text-5xl font-orbitron font-bold mb-6"
            style={{ color: textColor }}
          >
            My Services
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-80 mb-8">
            Professional web development services to grow your business online
          </p>
          
          {/* Service Toggle */}
          <div className="flex justify-center mb-12">
            <div className="flex bg-white/20 backdrop-blur-md rounded-full p-2 border border-white/30">
              <button
                onClick={() => setShowPackages(false)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  !showPackages 
                    ? 'text-white shadow-lg' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                style={{
                  backgroundColor: !showPackages ? primaryColor : 'transparent'
                }}
              >
                Services
              </button>
              <button
                onClick={() => setShowPackages(true)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  showPackages 
                    ? 'text-white shadow-lg' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                style={{
                  backgroundColor: showPackages ? primaryColor : 'transparent'
                }}
              >
                Packages
              </button>
            </div>
          </div>
        </motion.div>

        {/* Services Grid */}
        {!showPackages && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {servicesData.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border cursor-pointer transition-all duration-300 ${
                  activeService === index 
                    ? 'border-opacity-80 shadow-2xl' 
                    : 'border-white/20 hover:border-opacity-40'
                }`}
                style={{
                  borderColor: activeService === index ? primaryColor : undefined
                }}
                onClick={() => handleServiceClick(index, service)}
                whileHover={{ scale: 1.02 }}
              >
                {service.popular && (
                  <div 
                    className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-white text-sm font-medium"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Most Popular
                  </div>
                )}

                <div className="flex items-center gap-4 mb-6">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: primaryColor + '20' }}
                  >
                    <service.icon size={32} style={{ color: primaryColor }} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold" style={{ color: textColor }}>
                      {service.title}
                    </h3>
                    <p className="text-sm opacity-70">{service.subtitle}</p>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {service.description}
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Features */}
                  <div>
                    <h4 className="font-semibold mb-3" style={{ color: primaryColor }}>
                      What's Included:
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <FaCheckCircle size={12} style={{ color: primaryColor }} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Deliverables */}
                  <div>
                    <h4 className="font-semibold mb-3" style={{ color: primaryColor }}>
                      You'll Receive:
                    </h4>
                    <ul className="space-y-2">
                      {service.deliverables.map((deliverable, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <FaCheckCircle size={12} style={{ color: primaryColor }} />
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-200/30">
                  <div>
                    <span className="text-2xl font-bold" style={{ color: primaryColor }}>
                      {service.startingPrice}
                    </span>
                    <span className="text-sm opacity-70 ml-2">starting from</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-70">Timeline:</p>
                    <p className="font-medium">{service.timeline}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Packages Grid */}
        {showPackages && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {packageData.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border transition-all duration-300 ${
                  pkg.popular 
                    ? 'border-opacity-80 shadow-2xl transform scale-105' 
                    : 'border-white/20'
                }`}
                style={{
                  borderColor: pkg.popular ? primaryColor : undefined
                }}
                whileHover={{ scale: pkg.popular ? 1.05 : 1.02 }}
              >
                {pkg.popular && (
                  <div 
                    className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-white text-sm font-medium"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Recommended
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2" style={{ color: textColor }}>
                    {pkg.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold" style={{ color: primaryColor }}>
                      {pkg.price}
                    </span>
                  </div>
                  <p className="text-sm opacity-70">{pkg.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <FaCheckCircle size={16} style={{ color: primaryColor }} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="text-center">
                  <motion.button
                    className={`w-full py-3 px-6 rounded-full font-semibold transition-all duration-300 ${
                      pkg.popular 
                        ? 'text-white shadow-lg' 
                        : 'border-2'
                    }`}
                    style={{
                      backgroundColor: pkg.popular ? primaryColor : 'transparent',
                      borderColor: !pkg.popular ? primaryColor : undefined,
                      color: !pkg.popular ? primaryColor : undefined
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {pkg.cta}
                  </motion.button>
                  <p className="text-xs mt-2 opacity-60">
                    Timeline: {pkg.duration}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Why Choose Me */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold mb-12" style={{ color: textColor }}>
            Why Choose Me?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {whyChooseMeData.map((item, index) => (
              <div key={index} className="text-center">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: primaryColor + '20' }}
                >
                  <item.icon size={24} style={{ color: primaryColor }} />
                </div>
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm opacity-70">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Final CTA */}
          <div className="bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-700/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4" style={{ color: textColor }}>
              Ready to Start Your Project?
            </h3>
            <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
              Let's discuss your requirements and create something amazing together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#contact"
                className="px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{ backgroundColor: primaryColor }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Free Quote
              </motion.a>
              <motion.a
                href="https://calendly.com/chandrakantnagpure"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full font-semibold border-2 transition-all duration-300"
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
                Schedule Call
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Services;
