import { useEffect, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useTech } from "./TechContext";
import { FaReact, FaWordpress, FaPhp, FaGithub, FaFigma, FaCode } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiJavascript,
  SiAdobephotoshop,
  SiGreensock,
  SiFramer,
} from "react-icons/si";

// Define tech-specific descriptions
const techDescriptions = {
  react:
    "Crafting dynamic, component-based UIs with React, I build fast, scalable web apps that shine.",
  nextjs:
    "Using Next.js, I create SEO-optimized, server-rendered apps with blazing performance.",
  tailwind:
    "Tailwind CSS lets me design responsive, modern interfaces with rapid, utility-first styling.",
  wordpress:
    "I build customizable, SEO-friendly WordPress sites with tailored themes and plugins.",
  php: "PHP powers my secure, scalable backend systems, seamlessly integrated with modern frontends.",
  javascript:
    "JavaScript fuels my interactive web experiences, from DOM magic to async logic.",
  github:
    "GitHub streamlines my workflows, enabling version control and CI/CD collaboration.",
  figma:
    "Figma is my canvas for designing intuitive, user-centered interfaces and prototypes.",
  photoshop:
    "Photoshop helps me create pixel-perfect graphics and stunning web visuals.",
  gsap: "GSAP brings my web animations to life with smooth, high-performance motion.",
  framer:
    "Framer lets me craft interactive prototypes with advanced, motion-driven designs.",
  default:
    "I’m Chandrakant Nagpure, a developer and designer with 5+ years of experience, creating innovative, user-focused web solutions.",
};

// Define key skills with expertise levels
const skillsHighlights = {
  react: [
    { name: "Components", level: 90 },
    { name: "State", level: 85 },
    { name: "Hooks", level: 88 },
  ],
  nextjs: [
    { name: "SSR", level: 87 },
    { name: "SSG", level: 85 },
    { name: "API Routes", level: 80 },
  ],
  tailwind: [
    { name: "Utility CSS", level: 92 },
    { name: "Responsive", level: 90 },
    { name: "Prototyping", level: 88 },
  ],
  wordpress: [
    { name: "Themes", level: 85 },
    { name: "Plugins", level: 80 },
    { name: "SEO", level: 87 },
  ],
  php: [
    { name: "Backend", level: 82 },
    { name: "Database", level: 80 },
    { name: "Security", level: 85 },
  ],
  javascript: [
    { name: "ES6+", level: 90 },
    { name: "DOM", level: 88 },
    { name: "Async", level: 85 },
  ],
  github: [
    { name: "Version Control", level: 88 },
    { name: "CI/CD", level: 85 },
    { name: "Collaboration", level: 90 },
  ],
  figma: [
    { name: "UI/UX", level: 87 },
    { name: "Prototyping", level: 85 },
    { name: "Collaboration", level: 88 },
  ],
  photoshop: [
    { name: "Graphics", level: 85 },
    { name: "Editing", level: 90 },
    { name: "Web Assets", level: 87 },
  ],
  gsap: [
    { name: "Animations", level: 88 },
    { name: "Scroll", level: 85 },
    { name: "Performance", level: 80 },
  ],
  framer: [
    { name: "Motion", level: 87 },
    { name: "Prototypes", level: 85 },
    { name: "Animations", level: 88 },
  ],
  default: [
    { name: "Frontend", level: 90 },
    { name: "UI/UX", level: 85 },
    { name: "Full-Stack", level: 88 },
  ],
};

// Map tech to icons
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

// Animation variants
const starVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1, ease: "easeOut" },
  },
  pulse: {
    scale: [1, 1.1, 1],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
};

const planetVariants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -90 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 1.2, delay: i * 0.3, ease: "easeOut" },
  }),
};

const orbitPathVariants = {
  hidden: { strokeDashoffset: 628 },
  visible: {
    strokeDashoffset: 0,
    transition: { duration: 2, ease: "easeOut" },
  },
};

const hexBadgeVariants = {
  hidden: { rotate: -10, opacity: 0 },
  visible: {
    rotate: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
  hover: { rotate: 10, scale: 1.1 },
};

// Particle animation canvas
const ParticleCanvas = ({ bgColor }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speedX: Math.random() * 0.3 - 0.15,
      speedY: Math.random() * 0.3 - 0.15,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${bgColor}33`;
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [bgColor]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
};

// Contrast text color function
const getContrastTextColor = (bgColor) => {
  if (!bgColor) return "#000";
  const color = bgColor.substring(1);
  const rgb = parseInt(color, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? "#000" : "#000";
};

function AboutMe() {
  const { selectedTech, bgColor, techColors } = useTech();
  const [description, setDescription] = useState(techDescriptions.default);
  const [skills, setSkills] = useState(skillsHighlights.default);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbitAngle = useSpring(useTransform(scrollYProgress, [0, 1], [0, 90]), {
    stiffness: 100,
    damping: 20,
  });

  // Update description and skills when selectedTech changes
  useEffect(() => {
    setDescription(techDescriptions[selectedTech] || techDescriptions.default);
    setSkills(skillsHighlights[selectedTech] || skillsHighlights.default);
  }, [selectedTech]);

  // Get tech color or fallback
  const accentColor = techColors[selectedTech] || "#4B5563";
  const textColor = getContrastTextColor(bgColor);
  const TechIcon = techIcons[selectedTech] || techIcons.default;

  return (
    <>
      <style>
        {`
          @media (max-width: 990px) {
            .about-section {
              min-height: 100vh;
            }
            .orbital-cluster {
              flex-direction: column;
              height: auto !important;
              gap: 2rem;
              align-items: center;
              justify-content: space-between;
              padding: 1rem 0;
            }
            .central-star {
              position: relative !important;
              margin-bottom: 1rem;
            }
            .orbital-paths {
              display: none !important;
            }
            .skills-planet {
              position: relative !important;
              left: 50% !important;
              transform: translateX(-50%) !important;
              top: 0 !important;
              margin-bottom: 1rem;
            }
            .bio-planet {
              position: relative !important;
              right: 50% !important;
              transform: translateX(50%) !important;
              bottom: 0 !important;
              margin-top: 1rem;
            }
          }
        `}
      </style>
      <section
        id="about"
        ref={sectionRef}
        className="flex flex-col items-center justify-start py-5 px-6 md:px-16 relative font-poppins overflow-hidden about-section"
        style={{
          background: bgColor
            ? `linear-gradient(to right, ${bgColor}33, ${bgColor})`
            : "white",
          color: textColor,
        }}
      >
        {/* Particle Background */}
        <ParticleCanvas bgColor={bgColor || "#4B5563"} />

        {/* Orbital Cluster */}
        <motion.div className="relative max-w-4xl w-full h-[80vh] flex items-center justify-center z-10 orbital-cluster">
          {/* Central Star */}
          <motion.div
            className="absolute w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center central-star"
            variants={starVariants}
            initial="hidden"
            animate={["visible", "pulse"]}
            viewport={{ once: false }}
          >
            <TechIcon size={48} color={accentColor} />
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, ${accentColor}33, transparent 70%)`,
                opacity: 0.5,
              }}
            />
          </motion.div>

          {/* Orbital Paths */}
          <svg className="absolute w-full h-full orbital-paths">
            <motion.circle
              cx="50%"
              cy="50%"
              r="100"
              fill="none"
              stroke={accentColor}
              strokeWidth="1"
              strokeDasharray="10 10"
              variants={orbitPathVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="150"
              fill="none"
              stroke={accentColor}
              strokeWidth="1"
              strokeDasharray="10 10"
              variants={orbitPathVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
            />
          </svg>

          {/* Bio Planet */}
          <motion.div
            className="absolute right-4 w-64 md:w-80 bio-planet"
            variants={planetVariants}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
          >
            <div
              className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              style={{ border: `1px solid ${accentColor}33` }}
            >
              <h2
                className="text-xl md:text-2xl font-bold mb-4 font-orbitron"
                style={{
                  color: accentColor,
                  textShadow: `0 0 8px ${accentColor}33`,
                }}
              >
                About Me
              </h2>
              <AnimatePresence mode="wait">
                <motion.p
                  key={selectedTech}
                  className="text-base leading-relaxed"
                  style={{ color: textColor }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {description}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Skills Planet */}
          <motion.div
            className="absolute left-5 w-64 md:w-80 skills-planet"
            variants={planetVariants}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
          >
            <div
              className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              style={{ border: `1px solid ${accentColor}33` }}
            >
              <h3
                className="text-lg md:text-xl font-bold mb-4 font-orbitron"
                style={{
                  color: accentColor,
                  textShadow: `0 0 8px ${accentColor}33`,
                }}
              >
                Core Skills
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="relative flex flex-col items-center"
                    variants={hexBadgeVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    viewport={{ once: false }}
                  >
                    <svg className="w-16 h-16" viewBox="0 0 100 100">
                      <polygon
                        points="50,10 90,30 90,70 50,90 10,70 10,30"
                        fill="none"
                        stroke="#4B5563"
                        strokeWidth="4"
                      />
                      <text
                        x="50"
                        y="55"
                        textAnchor="middle"
                        className="text-base font-bold"
                        fill="black"
                      >
                        {skill.level}%
                      </text>
                    </svg>
                    <span
                      className="mt-1 text-base text-center"
                      style={{ color: textColor }}
                    >
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}

export default AboutMe;