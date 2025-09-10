import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTech } from "./TechContext";
import { 
  FaStar, 
  FaQuoteLeft, 
  FaChevronLeft, 
  FaChevronRight
} from "react-icons/fa";
import { SiUpwork, SiFiverr, SiFreelancer } from "react-icons/si";

const TestimonialsSection = () => {
  const { selectedTech, bgColor, techColors } = useTech();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  // Get contrast text color function
  const getContrastTextColor = (bgColor) => {
    if (!bgColor) return "#000";
    const color = bgColor.substring(1);
    const rgb = parseInt(color, 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = rgb & 0xff;
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 150 ? "#000" : "#fff";
  };
  
  const textColor = getContrastTextColor(bgColor);
  const isDarkBg = textColor === "#fff";
  const currentTechColor = techColors[selectedTech] || techColors.react;

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechStart Solutions",
      platform: "upwork",
      rating: 5,
      text: "Chandrakant delivered an exceptional React application for our startup. His attention to detail, clean code, and ability to meet tight deadlines exceeded our expectations. The project was completed 2 days ahead of schedule with perfect functionality.",
      project: "React Dashboard Development",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b2e5e008?w=64&h=64&fit=crop&crop=face",
      metrics: {
        deliveryTime: "14 days (ahead of schedule)",
        budget: "$2,500",
        satisfaction: "100%"
      }
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "E-commerce Owner",
      company: "Fashion Forward Store",
      platform: "fiverr",
      rating: 5,
      text: "Outstanding WordPress developer! Chandrakant transformed our outdated website into a modern, fast-loading e-commerce platform. Sales increased by 40% within the first month. Highly recommended for any WordPress project.",
      project: "E-commerce Website Redesign",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
      metrics: {
        deliveryTime: "21 days",
        budget: "$1,200",
        satisfaction: "100%"
      }
    },
    {
      id: 3,
      name: "Emily Chen",
      role: "Startup Founder",
      company: "InnovateLab",
      platform: "freelancer",
      rating: 5,
      text: "Brilliant full-stack developer! Chandrakant built our entire web application from scratch, including user authentication, payment integration, and admin dashboard. His expertise in modern technologies is impressive.",
      project: "Full-Stack Web Application",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      metrics: {
        deliveryTime: "30 days",
        budget: "$4,500",
        satisfaction: "100%"
      }
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Agency Owner",
      company: "Creative Digital Agency",
      platform: "upwork",
      rating: 5,
      text: "We've worked with Chandrakant on multiple projects. His consistency, communication, and technical skills are top-notch. He's become our go-to developer for React and WordPress projects. Always delivers quality work on time.",
      project: "Multiple WordPress & React Projects",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
      metrics: {
        deliveryTime: "Various projects",
        budget: "$8,000+ (total)",
        satisfaction: "100%"
      }
    },
    {
      id: 5,
      name: "Lisa Wang",
      role: "Product Manager",
      company: "HealthTech Solutions",
      platform: "upwork",
      rating: 5,
      text: "Exceptional work on our healthcare platform. Chandrakant implemented complex features including real-time notifications, data visualization, and secure patient data handling. His code quality and documentation were excellent.",
      project: "Healthcare Management Platform",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=face",
      metrics: {
        deliveryTime: "45 days",
        budget: "$6,200",
        satisfaction: "100%"
      }
    }
  ];

  const stats = [
    {
      number: "50+",
      label: "Projects Completed",
      icon: "🎯"
    },
    {
      number: "100%",
      label: "Job Success Rate",
      icon: "⭐"
    },
    {
      number: "5.0",
      label: "Average Rating",
      icon: "🌟"
    },
    {
      number: "2-30",
      label: "Days Delivery",
      icon: "⚡"
    }
  ];

  const platformIcons = {
    upwork: SiUpwork,
    fiverr: SiFiverr,
    freelancer: SiFreelancer
  };

  const platformColors = {
    upwork: "#14A800",
    fiverr: "#1DBF73",
    freelancer: "#0E4194"
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonialData = testimonials[currentTestimonial];
  const PlatformIcon = platformIcons[currentTestimonialData.platform];

  return (
    <section 
      className="py-20 transition-colors duration-500"
      style={{
        background: bgColor
          ? `linear-gradient(to right, ${bgColor}33, ${bgColor})`
          : "white",
        color: textColor
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: textColor }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Client Success Stories
          </motion.h2>
          <motion.p
            className="text-xl max-w-3xl mx-auto mb-12"
            style={{ color: isDarkBg ? '#e2e8f0' : '#64748b' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Don't just take my word for it. Here's what clients say about working with me on 
            Upwork, Fiverr, and Freelancer.
          </motion.p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: currentTechColor }}>
                  {stat.number}
                </div>
                <div className="text-sm md:text-base font-medium" style={{ color: isDarkBg ? '#cbd5e1' : '#64748b' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Testimonial */}
        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              className="rounded-2xl shadow-2xl p-8 md:p-12 relative overflow-hidden"
              style={{
                backgroundColor: isDarkBg ? '#1e293b' : '#ffffff',
                border: `2px solid ${bgColor}20`,
              }}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              {/* Quote Icon */}
              <div className="absolute top-8 right-8" style={{ color: `${currentTechColor}20` }}>
                <FaQuoteLeft size={48} />
              </div>

              {/* Platform Badge */}
              <div className="flex items-center gap-2 mb-6">
                <div 
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${platformColors[currentTestimonialData.platform]}20` }}
                >
                  <PlatformIcon 
                    size={20} 
                    color={platformColors[currentTestimonialData.platform]} 
                  />
                </div>
                <span 
                  className="text-sm font-semibold capitalize"
                  style={{ color: platformColors[currentTestimonialData.platform] }}
                >
                  Verified {currentTestimonialData.platform} Client
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(currentTestimonialData.rating)].map((_, i) => (
                  <FaStar key={i} color="#FFC107" size={24} />
                ))}
                <span className="ml-2 text-gray-600 font-medium">
                  {currentTestimonialData.rating}.0 / 5.0
                </span>
              </div>

              {/* Testimonial Text */}
              <blockquote 
                className="text-lg md:text-xl leading-relaxed mb-8 font-medium"
                style={{ color: isDarkBg ? '#e2e8f0' : '#374151' }}
              >
                "{currentTestimonialData.text}"
              </blockquote>

              {/* Client Info */}
              <div className="flex items-start justify-between flex-wrap gap-6">
                <div className="flex items-center gap-4">
                  <img
                    src={currentTestimonialData.avatar}
                    alt={currentTestimonialData.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-lg" style={{ color: textColor }}>
                      {currentTestimonialData.name}
                    </h4>
                    <p className="font-medium" style={{ color: isDarkBg ? '#cbd5e1' : '#64748b' }}>
                      {currentTestimonialData.role}
                    </p>
                    <p className="text-sm" style={{ color: isDarkBg ? '#94a3b8' : '#6b7280' }}>
                      {currentTestimonialData.company}
                    </p>
                  </div>
                </div>

                {/* Project Metrics */}
                <div 
                  className="rounded-lg p-4 min-w-[250px]"
                  style={{ backgroundColor: isDarkBg ? '#334155' : '#f8fafc' }}
                >
                  <h5 className="font-semibold mb-3" style={{ color: textColor }}>
                    Project: {currentTestimonialData.project}
                  </h5>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span style={{ color: isDarkBg ? '#cbd5e1' : '#64748b' }}>Delivery:</span>
                      <span className="font-medium" style={{ color: '#10b981' }}>
                        {currentTestimonialData.metrics.deliveryTime}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: isDarkBg ? '#cbd5e1' : '#64748b' }}>Budget:</span>
                      <span className="font-medium" style={{ color: textColor }}>
                        {currentTestimonialData.metrics.budget}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: isDarkBg ? '#cbd5e1' : '#64748b' }}>Satisfaction:</span>
                      <span className="font-medium" style={{ color: currentTechColor }}>
                        {currentTestimonialData.metrics.satisfaction}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            style={{ backgroundColor: isDarkBg ? '#1e293b' : '#ffffff' }}
            aria-label="Previous testimonial"
          >
            <FaChevronLeft size={20} color={textColor} />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            style={{ backgroundColor: isDarkBg ? '#1e293b' : '#ffffff' }}
            aria-label="Next testimonial"
          >
            <FaChevronRight size={20} color={textColor} />
          </button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial 
                  ? 'scale-125' 
                  : 'hover:scale-110'
              }`}
              style={{
                backgroundColor: index === currentTestimonial 
                  ? currentTechColor 
                  : isDarkBg ? '#64748b' : '#d1d5db'
              }}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: textColor }}>
            Ready to Join My Success Stories?
          </h3>
          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: isDarkBg ? '#e2e8f0' : '#64748b' }}>
            Let's work together to bring your project to life and achieve results 
            that exceed your expectations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              className="px-8 py-4 rounded-full font-semibold transition-colors hover:opacity-90"
              style={{ 
                backgroundColor: currentTechColor, 
                color: getContrastTextColor(currentTechColor) 
              }}
            >
              Start Your Project
            </button>
            <button 
              className="border-2 px-8 py-4 rounded-full font-semibold transition-colors hover:opacity-90"
              style={{ 
                borderColor: currentTechColor,
                color: currentTechColor,
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = currentTechColor;
                e.target.style.color = getContrastTextColor(currentTechColor);
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = currentTechColor;
              }}
            >
              View All Reviews
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
