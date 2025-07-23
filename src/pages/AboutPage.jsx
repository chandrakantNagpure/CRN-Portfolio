import { useEffect, useState, useRef } from "react";
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

// Reuse existing data from AboutMe component
const techDescriptions = {
  react: "Crafting dynamic, component-based UIs with React, I build fast, scalable web applications optimized for performance and user experience.",
  nextjs: "Using Next.js, I create SEO-optimized, server-rendered applications with blazing-fast performance and static site generation.",
  tailwind: "Tailwind CSS enables rapid, responsive, and modern UI development with utility-first styling for consistent designs.",
  wordpress: "I build customizable, SEO-friendly WordPress websites with custom themes and plugins for enhanced functionality.",
  php: "PHP powers my secure, scalable backend systems, seamlessly integrated with modern frontend frameworks.",
  javascript: "JavaScript drives my interactive web experiences, leveraging ES6+, DOM manipulation, and asynchronous programming.",
  github: "GitHub streamlines my version control, CI/CD pipelines, and collaborative workflows for efficient development.",
  figma: "Figma is my tool for designing intuitive, user-centered UI/UX prototypes and collaborative design systems.",
  photoshop: "Adobe Photoshop enables me to create pixel-perfect graphics and high-quality web assets for stunning visuals.",
  gsap: "GSAP powers smooth, high-performance web animations, enhancing user engagement and interactivity.",
  framer: "Framer Motion allows me to craft advanced, motion-driven prototypes and interactive web designs.",
  default: "I'm Chandrakant Nagpure, a versatile developer and designer with over 5 years of experience, delivering innovative, user-focused web solutions.",
};

const skillsHighlights = {
  react: [
    { name: "Components", level: 90, description: "Building reusable, modular React components for scalable applications." },
    { name: "State", level: 85, description: "Managing complex state with Redux and Context API for robust UIs." },
    { name: "Hooks", level: 88, description: "Leveraging React Hooks for efficient, functional component logic." },
  ],
  nextjs: [
    { name: "SSR", level: 87, description: "Implementing server-side rendering for SEO and performance." },
    { name: "SSG", level: 85, description: "Using static site generation for fast, pre-rendered pages." },
    { name: "API Routes", level: 80, description: "Creating dynamic API routes for seamless backend integration." },
  ],
  tailwind: [
    { name: "Utility CSS", level: 92, description: "Crafting responsive UIs with Tailwind's utility-first approach." },
    { name: "Responsive", level: 90, description: "Designing mobile-first, adaptive layouts for all devices." },
    { name: "Prototyping", level: 88, description: "Rapidly prototyping designs with Tailwind CSS." },
  ],
  wordpress: [
    { name: "Themes", level: 85, description: "Developing custom WordPress themes for unique designs." },
    { name: "Plugins", level: 80, description: "Creating and customizing plugins for enhanced functionality." },
    { name: "SEO", level: 87, description: "Optimizing WordPress sites for search engine visibility." },
  ],
  php: [
    { name: "Backend", level: 82, description: "Building robust server-side applications with PHP." },
    { name: "Database", level: 80, description: "Integrating MySQL and other databases with PHP." },
    { name: "Security", level: 85, description: "Implementing secure coding practices in PHP applications." },
  ],
  javascript: [
    { name: "ES6+", level: 90, description: "Writing modern JavaScript with ES6+ features for dynamic apps." },
    { name: "DOM", level: 88, description: "Manipulating the DOM for interactive user interfaces." },
    { name: "Async", level: 85, description: "Handling asynchronous operations with Promises and async/await." },
  ],
  github: [
    { name: "Version Control", level: 88, description: "Managing codebases with Git and GitHub for version control." },
    { name: "CI/CD", level: 85, description: "Automating deployments with GitHub Actions and CI/CD pipelines." },
    { name: "Collaboration", level: 90, description: "Collaborating on open-source and team projects via GitHub." },
  ],
  figma: [
    { name: "UI/UX", level: 87, description: "Designing user-friendly interfaces with Figma." },
    { name: "Prototyping", level: 85, description: "Creating interactive UI/UX prototypes in Figma." },
    { name: "Collaboration", level: 88, description: "Streamlining team workflows with Figma's collaboration tools." },
  ],
  photoshop: [
    { name: "Graphics", level: 85, description: "Creating high-quality graphics for web and print." },
    { name: "Editing", level: 90, description: "Editing images for professional web assets." },
    { name: "Web Assets", level: 87, description: "Producing optimized visual assets for websites." },
  ],
  gsap: [
    { name: "Animations", level: 88, description: "Crafting smooth animations with GSAP for engaging UIs." },
    { name: "Scroll", level: 85, description: "Implementing scroll-triggered animations with GSAP." },
    { name: "Performance", level: 80, description: "Optimizing GSAP animations for high performance." },
  ],
  framer: [
    { name: "Motion", level: 87, description: "Building dynamic motion effects with Framer Motion." },
    { name: "Prototypes", level: 85, description: "Creating interactive prototypes with Framer." },
    { name: "Animations", level: 88, description: "Designing advanced animations for web applications." },
  ],
  default: [
    { name: "Frontend", level: 90, description: "Developing modern, responsive frontend applications." },
    { name: "UI/UX", level: 85, description: "Designing intuitive and visually appealing user interfaces." },
    { name: "Full-Stack", level: 88, description: "Building end-to-end web solutions with frontend and backend expertise." },
  ],
};

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

function AboutPage() {
  const { selectedTech, bgColor, techColors } = useTech();
  const [description, setDescription] = useState(techDescriptions.default);
  const [skills, setSkills] = useState(skillsHighlights.default);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    setDescription(techDescriptions[selectedTech] || techDescriptions.default);
    setSkills(skillsHighlights[selectedTech] || skillsHighlights.default);
  }, [selectedTech]);

  const accentColor = techColors[selectedTech] || "#4B5563";
  const textColor = getContrastTextColor(bgColor);
  const TechIcon = techIcons[selectedTech] || techIcons.default;

  return (
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
            About Me
          </h1>
          <div className="flex justify-center items-center mb-8">
            <div
              className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center"
              style={{ backgroundColor: `${accentColor}20` }}
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
              My Story
            </h2>
            <p className="text-lg leading-relaxed mb-6" style={{ color: "#000" }}>
              {description}
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: accentColor }} />
                <span className="text-base" style={{ color: "#000" }}>5+ Years of Experience</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: accentColor }} />
                <span className="text-base" style={{ color: "#000" }}>50+ Projects Completed</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: accentColor }} />
                <span className="text-base" style={{ color: "#000" }}>Full-Stack Development</span>
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
              Core Skills
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
            Let's Build Something Amazing Together
          </h3>
          <a
            href="/contact"
            className="inline-block px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: accentColor, color: getContrastTextColor(accentColor) }}
          >
            Get In Touch
          </a>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutPage;