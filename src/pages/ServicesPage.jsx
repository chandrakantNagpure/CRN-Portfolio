import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useTech } from '../components/TechContext';
import {
  FaReact,
  FaWordpress,
  FaPhp,
  FaCode,
  FaRocket,
  FaClock,
  FaDollarSign,
  FaCheckCircle,
  FaArrowRight,
  FaStar,
  FaExternalLinkAlt,
} from 'react-icons/fa';
import { SiUpwork, SiFiverr } from 'react-icons/si';
import { Link } from 'react-router-dom';
import ParticleCanvas from '../components/ParticleCanvas';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import BackToTopButton from '../components/BackToTopButton';
import { getContrastTextColor } from '../utils/colors';

const ServicesPage = () => {
  const { t } = useLanguage();
  const { techColors, bgColor, selectedTech } = useTech();
  const textColor = getContrastTextColor(bgColor);
  const accentColor = techColors[selectedTech] || '#14B8A6';

  const services = [
    {
      icon: FaReact,
      title: 'React Development',
      description:
        'Custom React applications with modern hooks, context API, and performance optimization',
      features: [
        'Single Page Applications (SPA)',
        'Component-based architecture',
        'State management with Redux/Context',
        'API integration',
        'Performance optimization',
      ],
      price: 'Starting at $25/hour',
      color: techColors.react,
      platforms: ['upwork', 'freelancer', 'fiverr'],
    },
    {
      icon: FaWordpress,
      title: 'WordPress Development',
      description: 'Custom WordPress themes, plugins, and full website development',
      features: [
        'Custom theme development',
        'Plugin development & customization',
        'WooCommerce integration',
        'SEO optimization',
        'Performance optimization',
      ],
      price: 'Starting at $20/hour',
      color: techColors.wordpress,
      platforms: ['upwork', 'freelancer', 'fiverr'],
    },
    {
      icon: FaCode,
      title: 'Frontend Development',
      description: 'Modern, responsive websites with cutting-edge technologies',
      features: [
        'HTML5, CSS3, JavaScript',
        'Responsive design',
        'Cross-browser compatibility',
        'Performance optimization',
        'UI/UX implementation',
      ],
      price: 'Starting at $22/hour',
      color: techColors.javascript,
      platforms: ['upwork', 'freelancer'],
    },
    {
      icon: FaRocket,
      title: 'Full Stack Development',
      description: 'End-to-end web application development with modern technologies',
      features: [
        'Frontend + Backend development',
        'Database design & integration',
        'API development',
        'Deployment & hosting setup',
        'Maintenance & support',
      ],
      price: 'Starting at $30/hour',
      color: '#FF6B6B',
      platforms: ['upwork', 'freelancer'],
    },
  ];

  const packages = [
    {
      name: 'Starter Website',
      price: '$299',
      description: 'Perfect for small businesses and personal brands',
      features: [
        '5-page responsive website',
        'Mobile-friendly design',
        'Basic SEO setup',
        'Contact form',
        '2 revisions',
        '7-day delivery',
      ],
      popular: false,
    },
    {
      name: 'Business Website',
      price: '$599',
      description: 'Ideal for growing businesses and e-commerce',
      features: [
        '10-page responsive website',
        'Custom design & branding',
        'Advanced SEO optimization',
        'E-commerce integration',
        'Admin panel',
        '5 revisions',
        '14-day delivery',
      ],
      popular: true,
    },
    {
      name: 'Premium Web App',
      price: '$1,299',
      description: 'For complex applications and enterprise solutions',
      features: [
        'Custom web application',
        'User authentication',
        'Database integration',
        'Admin dashboard',
        'API integration',
        'Unlimited revisions',
        '30-day delivery',
      ],
      popular: false,
    },
  ];

  const platformLinks = {
    upwork: 'https://www.upwork.com/freelancers/chandrakant-nagpure',
    freelancer: 'https://www.freelancer.com/u/chandrakant-nagpure',
    fiverr: 'https://fiverr.com/chandrakant_dev',
  };

  return (
    <>
      <SEO
        title="Professional Web Development Services | Chandrakant Nagpure"
        description="Transform your ideas into powerful web solutions. React, WordPress, Full-Stack development services with 5+ years experience and 100% job success rate."
        canonical="/services"
        keywords={[
          'Web Development Services',
          'React Development',
          'WordPress Development', 
          'Frontend Developer',
          'Full Stack Development',
          'Freelance Developer'
        ]}
      />
      
      <div
        className="min-h-screen font-poppins overflow-hidden"
        style={{
          background: bgColor
            ? `linear-gradient(to right, ${bgColor}33, ${bgColor})`
            : 'linear-gradient(to right, #ffffff33, #ffffff)',
          color: textColor,
        }}
      >
        <ParticleCanvas bgColor={bgColor || '#4B5563'} />
        
        {/* Hero Section */}
        <section className="pt-24 pb-12 px-6 md:px-16 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1
                className="text-4xl md:text-6xl font-orbitron font-extrabold mb-6"
                style={{ color: textColor }}
              >
                Professional Services
              </h1>
              <p
                className="text-lg md:text-xl mb-8 max-w-3xl mx-auto"
                style={{ color: textColor, opacity: 0.8 }}
              >
                Transform your ideas into powerful, scalable web solutions. 5+ years experience • 50+ satisfied clients • 100% job success rate
              </p>
            </motion.div>
            
            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <a
                href={platformLinks.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl px-6 py-3 font-semibold transition-all duration-300 hover:bg-opacity-30 flex items-center gap-2"
                style={{ border: `1px solid ${accentColor}33`, color: textColor }}
              >
                <SiUpwork /> Hire on Upwork <FaExternalLinkAlt className="w-3 h-3" />
              </a>
              <a
                href={platformLinks.fiverr}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl px-6 py-3 font-semibold transition-all duration-300 hover:bg-opacity-30 flex items-center gap-2"
                style={{ border: `1px solid ${accentColor}33`, color: textColor }}
              >
                <SiFiverr /> Order on Fiverr <FaExternalLinkAlt className="w-3 h-3" />
              </a>
              <Link
                to="/contact"
                className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg"
                style={{ 
                  backgroundColor: accentColor, 
                  color: '#ffffff',
                  boxShadow: `0 4px 20px ${accentColor}33`
                }}
              >
                Get Free Quote
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="pb-12 px-6 md:px-16 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2
                className="text-3xl md:text-4xl font-orbitron font-bold mb-4"
                style={{ color: accentColor }}
              >
                My Services
              </h2>
              <p
                className="text-lg max-w-2xl mx-auto"
                style={{ color: textColor, opacity: 0.8 }}
              >
                Specialized web development services tailored to your business needs
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 transition-all duration-300 hover:bg-opacity-30 hover:scale-105"
                  style={{ border: `1px solid ${accentColor}33` }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <div className="flex items-center mb-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mr-3"
                      style={{ backgroundColor: `${service.color}20` }}
                    >
                      <service.icon size={24} color={service.color} />
                    </div>
                    <h3 className="text-lg font-orbitron font-semibold" style={{ color: textColor }}>
                      {service.title}
                    </h3>
                  </div>
                  <p className="mb-4 text-sm" style={{ color: textColor, opacity: 0.8 }}>
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-4">
                    {service.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-center text-xs" style={{ color: textColor, opacity: 0.7 }}>
                        <FaCheckCircle size={10} color={accentColor} className="mr-2 shrink-0" />
                        {feature}
                      </li>
                    ))}
                    {service.features.length > 3 && (
                      <li className="text-xs" style={{ color: textColor, opacity: 0.5 }}>
                        +{service.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                  <div className="border-t border-opacity-20 pt-4" style={{ borderColor: accentColor }}>
                    <p className="font-semibold text-lg" style={{ color: service.color }}>
                      {service.price}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Package Pricing Section */}
        <section className="pb-12 px-6 md:px-16 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h2
                className="text-3xl md:text-4xl font-orbitron font-bold mb-4"
                style={{ color: accentColor }}
              >
                Fixed Price Packages
              </h2>
              <p
                className="text-lg max-w-2xl mx-auto"
                style={{ color: textColor, opacity: 0.8 }}
              >
                Choose the perfect package for your project needs
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <motion.div
                  key={index}
                  className={`bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-8 relative transition-all duration-300 hover:bg-opacity-30 ${
                    pkg.popular ? 'scale-105' : 'hover:scale-105'
                  }`}
                  style={{ 
                    border: pkg.popular 
                      ? `2px solid ${accentColor}` 
                      : `1px solid ${accentColor}33` 
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span 
                        className="px-4 py-2 rounded-full text-sm font-orbitron font-semibold text-white"
                        style={{ backgroundColor: accentColor }}
                      >
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-orbitron font-bold mb-2" style={{ color: textColor }}>
                      {pkg.name}
                    </h3>
                    <div className="text-4xl font-orbitron font-bold mb-2" style={{ color: accentColor }}>
                      {pkg.price}
                    </div>
                    <p style={{ color: textColor, opacity: 0.8 }}>
                      {pkg.description}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <FaCheckCircle size={14} color={accentColor} className="mr-3 shrink-0" />
                        <span style={{ color: textColor, opacity: 0.8 }}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className="w-full block text-center py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
                    style={{
                      backgroundColor: pkg.popular ? accentColor : 'transparent',
                      color: pkg.popular ? '#ffffff' : accentColor,
                      border: `2px solid ${accentColor}`,
                      boxShadow: pkg.popular ? `0 4px 20px ${accentColor}33` : 'none'
                    }}
                  >
                    Get Started
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Me Section */}
        <section className="pb-12 px-6 md:px-16 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <h2
                className="text-3xl md:text-4xl font-orbitron font-bold mb-4"
                style={{ color: accentColor }}
              >
                Why Choose Me?
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: FaStar,
                  title: '100% Job Success Rate',
                  description: 'Perfect track record on Upwork with 5-star reviews from all clients',
                  color: '#FFD700'
                },
                {
                  icon: FaClock,
                  title: 'Fast Delivery',
                  description: 'Always deliver projects on time or ahead of schedule',
                  color: '#10B981'
                },
                {
                  icon: FaRocket,
                  title: 'Modern Technologies',
                  description: 'Using latest tech stack for scalable, future-proof solutions',
                  color: '#8B5CF6'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 transition-all duration-300 hover:bg-opacity-30"
                  style={{ border: `1px solid ${accentColor}33` }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <item.icon size={24} color={item.color} />
                  </div>
                  <h3 className="text-xl font-orbitron font-semibold mb-2" style={{ color: textColor }}>
                    {item.title}
                  </h3>
                  <p style={{ color: textColor, opacity: 0.8 }}>
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="pb-20 px-6 md:px-16 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-12 text-center"
              style={{ border: `2px solid ${accentColor}33` }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              <h2
                className="text-3xl md:text-4xl font-orbitron font-bold mb-6"
                style={{ color: textColor }}
              >
                Ready to Start Your Project?
              </h2>
              <p
                className="text-xl mb-8"
                style={{ color: textColor, opacity: 0.8 }}
              >
                Let's discuss your requirements and bring your vision to life
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg flex items-center gap-2"
                  style={{
                    backgroundColor: accentColor,
                    color: '#ffffff',
                    boxShadow: `0 4px 20px ${accentColor}33`
                  }}
                >
                  Get Free Consultation <FaArrowRight />
                </Link>
                <a
                  href={platformLinks.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-opacity-30 bg-white bg-opacity-20 backdrop-blur-lg flex items-center gap-2"
                  style={{ border: `2px solid ${accentColor}`, color: textColor }}
                >
                  View Upwork Profile <FaExternalLinkAlt className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <BackToTopButton textColor={textColor} />
      </div>
      
      <Footer />
    </>
  );
};

export default ServicesPage;
