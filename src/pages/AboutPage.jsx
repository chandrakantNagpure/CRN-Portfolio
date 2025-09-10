import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTech } from "../components/TechContext";
import OptimizedImage from "../components/OptimizedImage";
import ParticleCanvas from "../components/ParticleCanvas";
import Footer from "../components/Footer";
import { FaReact, FaWordpress, FaPhp, FaGithub, FaFigma, FaCode } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiJavascript,
  SiAdobephotoshop,
  SiGreensock,
  SiFramer,
} from "react-icons/si";
import { useLanguage } from "../contexts/LanguageContext";
import SEO from "../components/SEO";
import BackToTopButton from "../components/BackToTopButton";
import StickyContact from "../components/StickyContact";
import ChatBot from "../components/ChatBot";
import { getContrastTextColor } from "../utils/colors";


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

function AboutPage() {
  const { t } = useLanguage();
  const { selectedTech, bgColor, techColors } = useTech();
  const [description, setDescription] = useState(t('hero.descriptions.default'));
  const [skills, setSkills] = useState(t('about.skillDescriptions.default'));
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    setDescription(t(`hero.descriptions.${selectedTech}`) || t('hero.descriptions.default'));
    setSkills(t(`about.skillDescriptions.${selectedTech}`) || t('about.skillDescriptions.default'));
  }, [selectedTech, t]);

  const accentColor = techColors[selectedTech] || "#4B5563";
  const textColor = getContrastTextColor(bgColor);
  const TechIcon = techIcons[selectedTech] || techIcons.default;

  return (
    <>
      <SEO
        title={t('about.title')}
        description={`Learn more about ${description}`}
        canonical="/about"
        keywords={['About Chandrakant Nagpure', 'Frontend Developer Bio', 'React Expert', 'WordPress Developer', 'UI/UX Designer Experience']}
      />
      <div
        ref={sectionRef}
        className="min-h-screen flex flex-col items-center justify-center py-20 px-6 md:px-16 relative font-poppins overflow-hidden"
        style={{
          background: bgColor
            ? `linear-gradient(to right, ${bgColor}33, ${bgColor})`
            : "white",
          color: textColor,
        }}
      >
      <ParticleCanvas bgColor={bgColor || "#4B5563"} />

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
            <p className="text-lg leading-relaxed mb-6" style={{ color: "#000" }}>
              {description}
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: accentColor }} />
                <span className="text-base" style={{ color: "#000" }}>{t('about.experience')}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: accentColor }} />
                <span className="text-base" style={{ color: "#000" }}>{t('about.projectsCompleted')}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: accentColor }} />
                <span className="text-base" style={{ color: "#000" }}>{t('about.fullStack')}</span>
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
            <div className="grid grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <div className="relative mb-3">
                    <svg className="w-20 h-20 mx-auto" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke={accentColor}
                        strokeWidth="8"
                        strokeDasharray={`${skill.level * 2.51} 251`}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                      />
                      <text
                        x="50"
                        y="55"
                        textAnchor="middle"
                        className="text-sm font-bold"
                        fill="#000"
                      >
                        {skill.level}%
                      </text>
                    </svg>
                  </div>
                  <h4 className="font-semibold text-lg mb-2" style={{ color: "#000" }}>
                    {skill.name}
                  </h4>
                  <p className="text-sm" style={{ color: "#666" }}>
                    {skill.description}
                  </p>
                </motion.div>
              ))}
            </div>
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

        
        {/* Back to Top Button */}
        <BackToTopButton textColor={getContrastTextColor(bgColor)} />
        
        {/* Sticky Contact */}
        <StickyContact />
        
        {/* ChatBot */}
        <ChatBot />
      </div>
              <Footer />
    </>
  );
}

export default AboutPage;