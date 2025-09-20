import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll } from 'framer-motion';
import { useTech } from '../components/TechContext';
import OptimizedImage from '../components/OptimizedImage';
import ParticleCanvas from '../components/ParticleCanvas';
import Footer from '../components/Footer';
import { FaReact, FaWordpress, FaPhp, FaGithub, FaFigma, FaCode } from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTailwindcss,
  SiJavascript,
  SiAdobephotoshop,
  SiGreensock,
  SiFramer,
} from 'react-icons/si';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';
import { getContrastTextColor } from '../utils/colors';

const techIcons = {
  react: FaReact,
  nextjs: SiNextdotjs,
  tailwind: SiTailwindcss,
  wordpress: FaWordpress,
  php: FaPhp,
  javascript: SiJavascript,
  github: FaGithub,
  figma: FaFigma,
  photoshop: SiAdobephotoshop,
  gsap: SiGreensock,
  framer: SiFramer,
  default: FaCode,
};

// Enhanced SkillCard component with advanced animations
const SkillCard = ({ skill, accentColor, delay }) => {
  const [isInView, setIsInView] = useState(false);
  const [animatedLevel, setAnimatedLevel] = useState(0);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Animate the skill level with easing
          const timer = setTimeout(() => {
            const duration = 2000; // 2 seconds
            const startTime = Date.now();
            
            const animate = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);
              
              // Easing function for smooth animation
              const easeOutCubic = 1 - Math.pow(1 - progress, 3);
              const currentValue = skill.level * easeOutCubic;
              
              setAnimatedLevel(currentValue);
              
              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setAnimatedLevel(skill.level);
              }
            };
            animate();
          }, delay * 1000);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [skill.level, delay]);

  const circumference = 2 * Math.PI * 40; // radius = 40
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (animatedLevel / 100) * circumference;

  return (
    <motion.div
      ref={cardRef}
      className="text-center group cursor-pointer"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: delay,
        type: "spring",
        stiffness: 100,
        damping: 12
      }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative mb-6">
        {/* Container for circle and percentage overlay */}
        <div className="relative w-32 h-32 mx-auto">
          {/* Outer glow effect */}
          <div 
            className="absolute inset-0 rounded-full opacity-20 animate-pulse"
            style={{
              background: `radial-gradient(circle, ${accentColor}40 0%, transparent 70%)`,
            }}
          />
          
          {/* Skill circle */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
              opacity="0.3"
            />
            
            {/* Progress circle with animation */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={accentColor}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
              style={{
                filter: `drop-shadow(0 0 8px ${accentColor}50)`
              }}
            />
          </svg>
          
          {/* HTML Percentage Overlay - Positioned absolutely in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div 
                className="text-3xl font-black leading-none"
                style={{ 
                  color: accentColor,
                  textShadow: `0 0 10px ${accentColor}30, 0 2px 4px rgba(0,0,0,0.1)`
                }}
              >
                {Math.round(animatedLevel)}
              </div>
              <div 
                className="text-sm font-bold -mt-1"
                style={{ 
                  color: accentColor,
                  opacity: 0.8
                }}
              >
                %
              </div>
            </div>
          </div>
        </div>
        
        {/* Skill level indicator dots */}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500`}
              style={{
                backgroundColor: i < (animatedLevel / 20) ? accentColor : '#e5e7eb',
                transitionDelay: `${delay + i * 0.1}s`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Skill info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.3 }}
      >
        <h4 className="font-semibold text-lg mb-2 group-hover:text-opacity-80 transition-colors" 
            style={{ color: '#1f2937' }}>
          {skill.name}
        </h4>
        <p className="text-sm leading-relaxed group-hover:text-opacity-80 transition-colors" 
           style={{ color: '#6b7280' }}>
          {skill.description}
        </p>
      </motion.div>
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-lg" />
    </motion.div>
  );
};

function AboutPage() {
  const { t } = useLanguage();
  const { selectedTech, bgColor, techColors } = useTech();
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef(null);
  useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Default skills fallback
  const defaultSkills = [
    {
      name: 'Frontend Development',
      level: 95,
      description: 'Expert in React, Next.js, and modern frontend technologies'
    },
    {
      name: 'UI/UX Design',
      level: 88,
      description: 'Creating beautiful and intuitive user experiences'
    },
    {
      name: 'WordPress Development',
      level: 92,
      description: 'Custom themes, plugins, and WordPress solutions'
    },
    {
      name: 'JavaScript/TypeScript',
      level: 90,
      description: 'Advanced JavaScript and TypeScript development'
    }
  ];

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate loading delay for better UX
    const loadingTimer = setTimeout(() => {
      const desc = t(`hero.descriptions.${selectedTech}`) || t('hero.descriptions.default') || 
        'Passionate frontend developer with expertise in modern web technologies, creating beautiful and functional digital experiences.';
      
      let skillData = t(`about.skillDescriptions.${selectedTech}`) || t('about.skillDescriptions.default');
      
      // Use default skills if translation data is not available or not an array
      if (!Array.isArray(skillData) || skillData.length === 0) {
        skillData = defaultSkills;
      }
      
      setDescription(desc);
      setSkills(skillData);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(loadingTimer);
  }, [selectedTech, t, defaultSkills]);

  const accentColor = techColors[selectedTech] || '#4B5563';
  const textColor = getContrastTextColor(bgColor);
  const TechIcon = techIcons[selectedTech] || techIcons.default;

  return (
    <>
      <SEO
        title={t('about.title')}
        description={`Learn more about ${description}`}
        canonical="/about"
        keywords={[
          'About Chandrakant Nagpure',
          'Frontend Developer Bio',
          'React Expert',
          'WordPress Developer',
          'UI/UX Designer Experience',
        ]}
      />
      <div
        ref={sectionRef}
        className="min-h-screen flex flex-col items-center justify-center py-20 px-6 md:px-16 relative font-poppins overflow-hidden"
        style={{
          background: bgColor ? `linear-gradient(to right, ${bgColor}33, ${bgColor})` : 'white',
          color: textColor,
          position: 'relative',
        }}
      >
        <ParticleCanvas bgColor={bgColor || '#4B5563'} />

        <div className="max-w-6xl w-full z-10 relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              className="text-4xl md:text-6xl font-orbitron font-extrabold mb-6"
              style={{ color: textColor }}
            >
              {t('about.title')}
            </h1>
            <div className="flex justify-center items-center mb-8">
              <div
                className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center"
                style={{ backgroundColor: `#d3d3d3` }}
              >
                <TechIcon size={40} color={accentColor} />
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <motion.div
              className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-8 shadow-lg"
              style={{ border: `1px solid ${accentColor}33` }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2
                className="text-2xl md:text-3xl font-bold mb-6 font-orbitron"
                style={{ color: accentColor }}
              >
                {t('about.myStory')}
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: '#000' }}>
                {description}
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: accentColor }} />
                  <span className="text-base" style={{ color: '#000' }}>
                    {t('about.experience')}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: accentColor }} />
                  <span className="text-base" style={{ color: '#000' }}>
                    {t('about.projectsCompleted')}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: accentColor }} />
                  <span className="text-base" style={{ color: '#000' }}>
                    {t('about.fullStack')}
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-8 shadow-lg"
              style={{ border: `1px solid ${accentColor}33` }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3
                className="text-2xl md:text-3xl font-bold mb-6 font-orbitron"
                style={{ color: accentColor }}
              >
                {t('about.coreSkills')}
              </h3>
              {isLoading ? (
                <div className="grid grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((item, index) => (
                    <motion.div
                      key={`skeleton-${index}`}
                      className="text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="relative mb-3">
                        <div className="w-20 h-20 mx-auto bg-gray-200 rounded-full animate-pulse" />
                      </div>
                      <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse" />
                      <div className="h-4 bg-gray-100 rounded animate-pulse" />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {skills.map((skill, index) => (
                    <SkillCard
                      key={`skill-${index}`}
                      skill={skill}
                      index={index}
                      accentColor={accentColor}
                      delay={0.6 + index * 0.15}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h3
              className="text-2xl md:text-3xl font-bold mb-6 font-orbitron"
              style={{ color: textColor }}
            >
              {t('about.cta')}
            </h3>
            <Link
              to="/contact"
              className="inline-block px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: accentColor, color: getContrastTextColor(accentColor) }}
            >
              {t('about.getInTouch')}
            </Link>
          </motion.div>
        </div>

      </div>
      <Footer />
    </>
  );
}

export default AboutPage;
