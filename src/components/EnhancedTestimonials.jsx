import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaStar,
  FaQuoteLeft,
  FaArrowLeft,
  FaArrowRight,
  FaLinkedin,
  FaExternalLinkAlt,
  FaPlay,
  FaPause,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';

const EnhancedTestimonials = ({
  variant = 'carousel', // 'carousel', 'grid', 'featured'
  accentColor = '#14B8A6',
  showCaseStudyLinks = true,
  autoPlay = true,
  autoPlayInterval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [hoveredTestimonial, setHoveredTestimonial] = useState(null);

  // Enhanced testimonials data with more details
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Creative Director',
      company: 'CreativeLab Interior',
      avatar: '/assets/testimonials/sarah-johnson.jpg',
      rating: 5,
      text: "Chandrakant delivered exactly what we envisioned and more. The horizontal scrolling website is absolutely stunning and perfectly represents our creative approach. Our clients love the unique experience, and we've seen a 60% increase in project inquiries since launch.",
      project: 'Interior Design Website',
      projectLink: '/case-studies/creativelab-interior-design-website',
      industry: 'Interior Design',
      projectValue: '$15,000',
      completionTime: '6 weeks',
      linkedIn: 'https://linkedin.com/in/sarahjohnson',
      location: 'Dubai, UAE',
      featured: true,
      tags: ['WordPress', 'GSAP', 'Custom Design', 'Horizontal Scroll'],
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'CEO & Founder',
      company: 'Cyberi3Secure',
      avatar: '/assets/testimonials/michael-chen.jpg',
      rating: 5,
      text: "Working with Chandrakant was exceptional. He understood our complex cybersecurity requirements and delivered a website that perfectly balances technical accuracy with user-friendly design. The lead generation results have been outstanding - we're getting 260% more qualified leads.",
      project: 'PAM Security Platform',
      projectLink: '/case-studies/cyberi3secure-pam-security-platform',
      industry: 'Cybersecurity',
      projectValue: '$20,000',
      completionTime: '8 weeks',
      linkedIn: 'https://linkedin.com/in/michaelchen',
      location: 'Singapore',
      featured: true,
      tags: ['WordPress', 'Security', 'Lead Generation', 'B2B'],
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      role: 'Marketing Manager',
      company: 'TechStart Solutions',
      avatar: '/assets/testimonials/emma-rodriguez.jpg',
      rating: 5,
      text: 'Incredible attention to detail and technical expertise. The React application Chandrakant built for us is fast, scalable, and exactly what we needed. The user experience is seamless, and our customer satisfaction scores have improved by 40%.',
      project: 'Customer Portal App',
      projectLink: null, // No case study yet
      industry: 'SaaS',
      projectValue: '$25,000',
      completionTime: '10 weeks',
      linkedIn: 'https://linkedin.com/in/emmarodriguez',
      location: 'San Francisco, CA',
      featured: false,
      tags: ['React', 'Node.js', 'API Integration', 'SaaS'],
    },
    {
      id: 4,
      name: 'James Miller',
      role: 'E-commerce Director',
      company: 'Urban Fashion Co',
      avatar: '/assets/testimonials/james-miller.jpg',
      rating: 5,
      text: 'Our online store transformation exceeded all expectations. Chandrakant optimized our site speed, improved the checkout process, and the results speak for themselves - 85% increase in conversions and 50% faster page load times.',
      project: 'E-commerce Optimization',
      projectLink: null,
      industry: 'E-commerce',
      projectValue: '$12,000',
      completionTime: '5 weeks',
      linkedIn: 'https://linkedin.com/in/jamesmiller',
      location: 'London, UK',
      featured: false,
      tags: ['WooCommerce', 'Performance', 'Conversion Optimization'],
    },
    {
      id: 5,
      name: 'Lisa Wang',
      role: 'Product Manager',
      company: 'HealthTech Innovations',
      avatar: '/assets/testimonials/lisa-wang.jpg',
      rating: 5,
      text: "Outstanding work on our healthcare platform. Chandrakant delivered a HIPAA-compliant solution that's both secure and user-friendly. The attention to accessibility and compliance requirements was impressive.",
      project: 'Healthcare Platform',
      projectLink: null,
      industry: 'Healthcare',
      projectValue: '$30,000',
      completionTime: '12 weeks',
      linkedIn: 'https://linkedin.com/in/lisawang',
      location: 'Toronto, CA',
      featured: false,
      tags: ['React', 'HIPAA Compliance', 'Healthcare', 'Accessibility'],
    },
  ];

  // Filter testimonials based on variant
  const displayedTestimonials =
    variant === 'featured' ? testimonials.filter(t => t.featured) : testimonials;

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && variant === 'carousel' && displayedTestimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex =>
          prevIndex === displayedTestimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, autoPlayInterval);

      return () => clearInterval(interval);
    }
  }, [isPlaying, displayedTestimonials.length, autoPlayInterval, variant]);

  const nextTestimonial = () => {
    setCurrentIndex(currentIndex === displayedTestimonials.length - 1 ? 0 : currentIndex + 1);
    trackEvent('testimonial_next', {
      category: 'Testimonials',
      label: displayedTestimonials[currentIndex]?.name,
    });
  };

  const prevTestimonial = () => {
    setCurrentIndex(currentIndex === 0 ? displayedTestimonials.length - 1 : currentIndex - 1);
    trackEvent('testimonial_prev', {
      category: 'Testimonials',
      label: displayedTestimonials[currentIndex]?.name,
    });
  };

  const handleTestimonialClick = testimonial => {
    trackEvent('testimonial_click', {
      category: 'Testimonials',
      label: testimonial.name,
      company: testimonial.company,
    });
  };

  const renderStars = rating => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        size={16}
      />
    ));
  };

  const TestimonialCard = ({ testimonial, isActive = true, onHover }) => (
    <motion.div
      className={`bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg relative overflow-hidden ${
        isActive ? 'ring-2 ring-opacity-50' : ''
      }`}
      style={{
        ringColor: isActive ? accentColor : 'transparent',
      }}
      onMouseEnter={() => onHover?.(testimonial.id)}
      onMouseLeave={() => onHover?.(null)}
      onClick={() => handleTestimonialClick(testimonial)}
      whileHover={{ y: -5, shadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
    >
      {/* Quote Icon */}
      <div className="absolute top-6 right-6 opacity-10">
        <FaQuoteLeft size={60} style={{ color: accentColor }} />
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-4">
        {renderStars(testimonial.rating)}
        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
          {testimonial.rating}.0
        </span>
      </div>

      {/* Testimonial Text */}
      <blockquote className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6 relative z-10">
        "{testimonial.text}"
      </blockquote>

      {/* Client Info */}
      <div className="flex items-start gap-4">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-16 h-16 rounded-full object-cover ring-2 ring-white dark:ring-gray-700"
          onError={e => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random&color=fff&size=64`;
          }}
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
            {testimonial.linkedIn && (
              <a
                href={testimonial.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 transition-colors"
                onClick={e => e.stopPropagation()}
              >
                <FaLinkedin size={16} />
              </a>
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {testimonial.role} at {testimonial.company}
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
            {testimonial.location} • {testimonial.industry}
          </p>
        </div>
      </div>

      {/* Project Details */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-400">Project:</span>
            <span className="ml-2 font-medium text-gray-900 dark:text-white">
              {testimonial.project}
            </span>
          </div>
          <div className="text-right">
            <div className="text-gray-600 dark:text-gray-400 text-xs">
              {testimonial.completionTime} • {testimonial.projectValue}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-3">
          {testimonial.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
            >
              {tag}
            </span>
          ))}
          {testimonial.tags.length > 3 && (
            <span className="text-xs text-gray-500">+{testimonial.tags.length - 3}</span>
          )}
        </div>

        {/* Case Study Link */}
        {showCaseStudyLinks && testimonial.projectLink && (
          <Link
            to={testimonial.projectLink}
            className="inline-flex items-center gap-1 mt-3 text-sm font-medium hover:underline transition-colors"
            style={{ color: accentColor }}
            onClick={e => e.stopPropagation()}
          >
            <span>View Case Study</span>
            <FaExternalLinkAlt size={12} />
          </Link>
        )}
      </div>
    </motion.div>
  );

  if (variant === 'carousel') {
    return (
      <div className="relative">
        {/* Main Testimonial Display */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <TestimonialCard testimonial={displayedTestimonials[currentIndex]} isActive={true} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-4">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200"
              style={{ color: accentColor }}
            >
              <FaArrowLeft size={16} />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200"
              style={{ color: accentColor }}
            >
              <FaArrowRight size={16} />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200"
              style={{ color: accentColor }}
            >
              {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {displayedTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex ? 'ring-2 ring-offset-2' : ''
                }`}
                style={{
                  backgroundColor: index === currentIndex ? accentColor : '#D1D5DB',
                  ringColor: accentColor,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedTestimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <TestimonialCard testimonial={testimonial} onHover={setHoveredTestimonial} />
          </motion.div>
        ))}
      </div>
    );
  }

  // Featured variant - shows only featured testimonials
  return (
    <div className="space-y-8">
      {displayedTestimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
        >
          <TestimonialCard testimonial={testimonial} isActive={true} />
        </motion.div>
      ))}
    </div>
  );
};

export default EnhancedTestimonials;
