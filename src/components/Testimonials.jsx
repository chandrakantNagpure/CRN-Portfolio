import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaStar, FaQuoteLeft, FaLinkedin, FaCheckCircle } from 'react-icons/fa';
import { useTech } from './TechContext';
import { useLanguage } from '../contexts/LanguageContext';
import { getContrastTextColor } from '../utils/colors';

// Sample testimonials data - replace with real client testimonials
const testimonialsData = [
  {
    id: 1,
    name: 'Sarah Johnson',
    company: 'TechStart Solutions',
    position: 'CEO',
    rating: 5,
    text: 'Chandrakant transformed our outdated website into a modern, responsive platform that increased our conversion rate by 40%. His attention to detail and technical expertise is outstanding.',
    project: 'E-commerce Platform Redesign',
    metrics: {
      conversionIncrease: '40%',
      performanceImprovement: '60%',
      timeToComplete: '3 weeks',
    },
    image:
      'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
    linkedinUrl: 'https://linkedin.com/in/sarahjohnson',
  },
  {
    id: 2,
    name: 'Michael Chen',
    company: 'Digital Marketing Pro',
    position: 'Marketing Director',
    rating: 5,
    text: 'Working with Chandrakant was exceptional. He delivered a WordPress site that not only looks amazing but also ranks well on Google. Our organic traffic increased by 85% within 2 months.',
    project: 'WordPress SEO Optimization',
    metrics: {
      trafficIncrease: '85%',
      seoScore: '95/100',
      timeToComplete: '2 weeks',
    },
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    linkedinUrl: 'https://linkedin.com/in/michaelchen',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    company: 'Creative Agency Ltd',
    position: 'Creative Director',
    rating: 5,
    text: "Chandrakant's React development skills are top-notch. He built our interactive portfolio website with smooth animations and perfect mobile responsiveness. Client feedback has been amazing!",
    project: 'Interactive Portfolio Website',
    metrics: {
      mobileScore: '100/100',
      loadTime: '1.2s',
      clientSatisfaction: '98%',
    },
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    linkedinUrl: 'https://linkedin.com/in/emilyrodriguez',
  },
  {
    id: 4,
    name: 'David Kumar',
    company: 'StartupHub',
    position: 'Founder',
    rating: 5,
    text: 'Best investment we made! Chandrakant created our entire web presence from scratch. The modern design and fast performance helped us secure $2M in funding.',
    project: 'Complete Web Development',
    metrics: {
      businessImpact: '$2M funding',
      performanceScore: '98/100',
      deliveryTime: 'On schedule',
    },
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    linkedinUrl: 'https://linkedin.com/in/davidkumar',
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    company: 'E-commerce Solutions',
    position: 'Operations Manager',
    rating: 5,
    text: "Chandrakant's expertise in both frontend and WordPress development saved us thousands. He integrated complex payment systems seamlessly and delivered ahead of schedule.",
    project: 'Payment Integration & Optimization',
    metrics: {
      costSavings: '$15,000',
      transactionSuccess: '99.8%',
      deliveredEarly: '1 week ahead',
    },
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    linkedinUrl: 'https://linkedin.com/in/lisathompson',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const TestimonialCard = ({ testimonial, index, techColors, selectedTech }) => {
  const primaryColor = techColors[selectedTech] || '#4B5563';

  return (
    <motion.div
      variants={cardVariants}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col"
      whileHover={{ scale: 1.02 }}
    >
      {/* Quote Icon */}
      <div className="mb-4">
        <FaQuoteLeft size={24} style={{ color: primaryColor }} className="opacity-60" />
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} size={16} color={i < testimonial.rating ? primaryColor : '#E5E7EB'} />
        ))}
        <span className="ml-2 text-sm font-medium">{testimonial.rating}.0</span>
      </div>

      {/* Testimonial Text */}
      <p className="text-gray-700 dark:text-gray-300 mb-6 flex-grow leading-relaxed">
        "{testimonial.text}"
      </p>

      {/* Project Metrics */}
      <div className="bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-700/50 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-sm mb-3" style={{ color: primaryColor }}>
          Project Results:
        </h4>
        <div className="grid grid-cols-1 gap-2 text-xs">
          {Object.entries(testimonial.metrics).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center">
              <span className="capitalize text-gray-600 dark:text-gray-400">
                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}:
              </span>
              <span className="font-semibold" style={{ color: primaryColor }}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Client Info */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.position}</p>
          <p className="text-sm font-medium" style={{ color: primaryColor }}>
            {testimonial.company}
          </p>
        </div>
        {testimonial.linkedinUrl && (
          <a
            href={testimonial.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-colors"
            aria-label={`View ${testimonial.name}'s LinkedIn profile`}
          >
            <FaLinkedin size={20} />
          </a>
        )}
      </div>

      {/* Project Tag */}
      <div className="mt-4 pt-4 border-t border-gray-200/30">
        <span
          className="text-xs px-3 py-1 rounded-full bg-opacity-20 font-medium"
          style={{
            backgroundColor: primaryColor + '20',
            color: primaryColor,
          }}
        >
          {testimonial.project}
        </span>
      </div>
    </motion.div>
  );
};

function Testimonials() {
  const { t } = useLanguage();
  const { bgColor, techColors, selectedTech } = useTech();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const textColor = getContrastTextColor(bgColor);
  const primaryColor = techColors[selectedTech] || '#4B5563';

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="testimonials"
      className="py-20 px-6 md:px-16 relative overflow-hidden"
      style={{
        background: bgColor
          ? `linear-gradient(135deg, ${bgColor}15, ${bgColor}05)`
          : 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
        color: textColor,
      }}
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, ${primaryColor} 2px, transparent 0)`,
          backgroundSize: '50px 50px',
        }}
      />

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
            Client Success Stories
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-80">
            See what my clients say about working with me and the results we achieved together
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mt-8 text-sm">
            <div className="flex items-center gap-2">
              <FaCheckCircle color={primaryColor} />
              <span>100+ Projects Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle color={primaryColor} />
              <span>98% Client Satisfaction</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle color={primaryColor} />
              <span>50+ Happy Clients</span>
            </div>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {testimonialsData.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
              techColors={techColors}
              selectedTech={selectedTech}
            />
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-4" style={{ color: textColor }}>
            Ready to Join These Success Stories?
          </h3>
          <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
            Let's discuss how I can help transform your business with modern web solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="#contact"
              className="px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl"
              style={{ backgroundColor: primaryColor }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Project
            </motion.a>
            <motion.a
              href="#projects"
              className="px-8 py-4 rounded-full font-semibold border-2 transition-all duration-300"
              style={{
                borderColor: primaryColor,
                color: primaryColor,
                backgroundColor: 'transparent',
              }}
              whileHover={{
                scale: 1.05,
                backgroundColor: primaryColor + '10',
              }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;
