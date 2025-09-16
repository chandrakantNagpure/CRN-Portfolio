import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaReact, FaWordpress, FaPhp, FaGithub, FaFigma, FaCode } from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTailwindcss,
  SiJavascript,
  SiAdobephotoshop,
  SiGreensock,
  SiFramer,
} from 'react-icons/si';
import { useTech } from './TechContext';

import ParticleCanvas from './ParticleCanvas';
import StatusIndicator from './StatusIndicator';
import ResumeButton from './ResumeButton';
import { useLanguage } from '../contexts/LanguageContext';

const getContrastTextColor = bgColor => {
  if (!bgColor) return '#000';
  const color = bgColor.substring(1);
  const rgb = parseInt(color, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? '#000' : '#fff';
};

const textVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: i => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: 'easeOut',
      type: 'spring',
      stiffness: 100,
    },
  }),
};

// Attention-grabbing pulse animation for initial load
const attentionPulse = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 1.5,
    repeat: 3,
    ease: 'easeInOut',
    delay: 2, // Start after icons have loaded
  },
};

function Hero() {
  const { t } = useLanguage();
  const { selectedTech, bgColor, updateTech, techColors } = useTech();
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [textColor, setTextColor] = useState('#000');
  const [description, setDescription] = useState(t('hero.descriptions.default'));
  const [currentTitles, setCurrentTitles] = useState(t('hero.titles.default'));
  const heroRef = useRef(null);

  useEffect(() => {
    setTextColor(getContrastTextColor(bgColor));
    setDescription(t(`hero.descriptions.${selectedTech}`) || t('hero.descriptions.default'));
    setCurrentTitles(t(`hero.titles.${selectedTech}`) || t('hero.titles.default'));
  }, [selectedTech, bgColor, t]);

  useEffect(() => {
    const titles = Array.isArray(currentTitles) ? currentTitles : [currentTitles];
    if (index === titles.length) setIndex(0);
    if (subIndex === titles[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), 1000);
      return;
    }
    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex(prev => (prev + 1) % titles.length);
      return;
    }
    const timeout = setTimeout(
      () => {
        setSubIndex(prev => (deleting ? prev - 1 : prev + 1));
        setText(titles[index].substring(0, subIndex));
      },
      deleting ? 40 : 100
    );
    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, currentTitles]);

  const handleIconClick = tech => {
    updateTech(tech);
    setIndex(0);
    setSubIndex(0);
    setDeleting(false);
  };

  const techIcons = [
    { icon: FaReact, tech: 'react', label: 'React' },
    { icon: SiNextdotjs, tech: 'nextjs', label: 'Next.js' },
    { icon: SiTailwindcss, tech: 'tailwind', label: 'Tailwind CSS' },
    { icon: FaWordpress, tech: 'wordpress', label: 'WordPress' },
    { icon: FaPhp, tech: 'php', label: 'PHP' },
    { icon: SiJavascript, tech: 'javascript', label: 'JavaScript' },
    { icon: FaGithub, tech: 'github', label: 'GitHub' },
    { icon: FaFigma, tech: 'figma', label: 'Figma' },
    { icon: SiAdobephotoshop, tech: 'photoshop', label: 'Photoshop' },
    { icon: SiGreensock, tech: 'gsap', label: 'GSAP' },
    { icon: SiFramer, tech: 'framer', label: 'Framer' },
    { icon: FaCode, tech: 'default', label: 'General Tech' },
  ];

  const iconColor =
    selectedTech === 'default' ? '#4B5563' : techColors[selectedTech] || techColors['react'];
  const isDarkBg = getContrastTextColor(bgColor) === '#fff';
  const iconBgColor = isDarkBg ? '#1f2937' : '#ffffff';

  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Chandrakant Nagpure',
    jobTitle: 'Frontend Developer',
    description: 'Specializing in React, Next.js, WordPress, and UI/UX design.',
    url: 'https://chandrakantnagpure.com', // Replace with actual URL
    sameAs: [
      'https://github.com/chandrakantnagpure', // Replace with actual GitHub
      'https://linkedin.com/in/chandrakantnagpure', // Replace with actual LinkedIn
    ],
  };

  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>

      <section
        id="home"
        ref={heroRef}
        className="min-h-screen relative flex items-center justify-center px-6 md:px-16 py-12 pt-24 md:pt-20 font-poppins transition-colors duration-500 overflow-hidden"
        style={{
          background: bgColor
            ? `linear-gradient(to right, ${bgColor}33, ${bgColor})`
            : `linear-gradient(to right, #ffffff33, #ffffff)`,
          color: textColor,
        }}
      >
        <ParticleCanvas bgColor={bgColor || '#ffffff'} />

        {/* Hidden div for SEO to ensure all titles are crawlable */}
        <div style={{ display: 'none' }}>
          {Object.values(t('hero.titles'))
            .flat()
            .map((title, i) => (
              <span key={i}>{title}</span>
            ))}
        </div>

        <div className="relative z-10 max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            className="flex-1 text-left max-w-lg"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <h1 className="text-3xl md:text-5xl font-orbitron font-extrabold mb-4">
              <span style={{ color: iconColor }}>I'll Build Your</span> Dream Website
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold h-10 mb-4 font-orbitron">
              {text}
              <span
                className="border-r-2 animate-pulse ml-1"
                style={{ borderColor: textColor }}
              ></span>
            </h2>
            <motion.p
              className="leading-relaxed text-base md:text-lg mb-6 text-opacity-90"
              key={selectedTech}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {description}
            </motion.p>

            {/* Status and Action Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
              <StatusIndicator />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="inline-block px-6 py-3 rounded-full font-medium text-base transition-all duration-300 hover:scale-105 text-center"
                style={{ backgroundColor: iconColor, color: getContrastTextColor(iconColor) }}
                aria-label="Contact Chandrakant Nagpure to collaborate on projects"
              >
                {t('hero.cta')}
              </Link>
              <ResumeButton variant="outline" />
            </div>
          </motion.div>

          <motion.div
            className="flex-1 flex flex-col justify-center items-center w-full max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Interactive Instructions */}
            <motion.div
              className="text-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className="text-lg font-semibold mb-2 font-orbitron" style={{ color: iconColor }}>
                Click to Explore My Skills
              </h3>
              <p className="text-sm opacity-75 mb-4" style={{ color: textColor }}>
                Choose a technology to see personalized content
              </p>

              {/* Animated hint arrow */}
              <motion.div
                className="flex justify-center"
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <span className="text-2xl" style={{ color: iconColor }}>
                  ↓
                </span>
              </motion.div>
            </motion.div>

            <motion.div
              className="grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-6 w-full"
              animate={attentionPulse}
            >
              {techIcons
                .filter(item => item.tech !== 'default')
                .map(({ icon: Icon, tech, label }, i) => (
                  <motion.div
                    key={tech}
                    className="relative group flex justify-center items-center"
                    variants={iconVariants}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleIconClick(tech)}
                  >
                    {/* Interactive container with better visual cues */}
                    <div
                      className={`relative p-3 md:p-4 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
                        selectedTech === tech
                          ? 'shadow-xl ring-4 ring-opacity-50 transform scale-110'
                          : 'shadow-md hover:shadow-lg border-opacity-30'
                      }`}
                      style={{
                        backgroundColor: iconBgColor,
                        borderColor: selectedTech === tech ? techColors[tech] : 'transparent',
                        boxShadow:
                          selectedTech === tech ? `0 8px 25px ${techColors[tech]}40` : undefined,
                        '--tw-ring-color': `${techColors[tech]}50`,
                      }}
                    >
                      {/* Pulse effect for selected tech */}
                      {selectedTech === tech && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl"
                          style={{ backgroundColor: techColors[tech] }}
                          animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0, 0.2, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                      )}

                      <Icon
                        size={selectedTech === tech ? 40 : 32}
                        color={techColors[tech]}
                        aria-label={`Select ${label} technology`}
                        className="relative z-10"
                      />

                      {/* Click indicator */}
                      <motion.div
                        className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-500"
                        style={{ backgroundColor: techColors[tech] }}
                        animate={
                          selectedTech === tech
                            ? {}
                            : {
                                scale: [0.8, 1.2, 0.8],
                                opacity: [0.5, 1, 0.5],
                              }
                        }
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    </div>

                    {/* Enhanced tooltips */}
                    <motion.div
                      className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20"
                      whileHover={{ y: -2 }}
                    >
                      <div className="bg-gray-900 text-white text-xs font-medium py-2 px-3 rounded-lg whitespace-nowrap shadow-lg">
                        <span className="block">Click for {label}</span>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900" />
                      </div>
                    </motion.div>

                    {/* Hidden span for SEO */}
                    <span style={{ display: 'none' }}>{label} Developer</span>
                  </motion.div>
                ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default Hero;
