import { useEffect, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { Link } from "react-router-dom";
import { useTech } from "./TechContext";
import OptimizedImage from "./OptimizedImage";
import { FaReact, FaWordpress, FaPhp, FaGithub, FaFigma, FaCode } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiJavascript,
  SiAdobephotoshop,
  SiGreensock,
  SiFramer,
} from "react-icons/si";

import ParticleCanvas from "./ParticleCanvas";

// Define tech-specific descriptions
const techDescriptions = {
  react:
    "Crafting dynamic, component-based UIs with React, I build fast, scalable web applications optimized for performance and user experience.",
  nextjs:
    "Using Next.js, I create SEO-optimized, server-rendered applications with blazing-fast performance and static site generation.",
  tailwind:
    "Tailwind CSS enables rapid, responsive, and modern UI development with utility-first styling for consistent designs.",
  wordpress:
    "I build customizable, SEO-friendly WordPress websites with custom themes and plugins for enhanced functionality.",
  php: "PHP powers my secure, scalable backend systems, seamlessly integrated with modern frontend frameworks.",
  javascript:
    "JavaScript drives my interactive web experiences, leveraging ES6+, DOM manipulation, and asynchronous programming.",
  github:
    "GitHub streamlines my version control, CI/CD pipelines, and collaborative workflows for efficient development.",
  figma:
    "Figma is my tool for designing intuitive, user-centered UI/UX prototypes and collaborative design systems.",
  photoshop:
    "Adobe Photoshop enables me to create pixel-perfect graphics and high-quality web assets for stunning visuals.",
  gsap: "GSAP powers smooth, high-performance web animations, enhancing user engagement and interactivity.",
  framer:
    "Framer Motion allows me to craft advanced, motion-driven prototypes and interactive web designs.",
  default:
    "I’m Chandrakant Nagpure, a versatile developer and designer with over 5 years of experience, delivering innovative, user-focused web solutions.",
};

// Define key skills with expertise levels and descriptions
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

// Contrast text color function
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

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Chandrakant Nagpure",
    jobTitle: "Frontend Developer",
    description: "Specializing in React, Next.js, WordPress, UI/UX design, and modern web technologies with over 5 years of experience.",
    url: "https://chandrakantnagpure.com", // Replace with actual URL
    knowsAbout: Object.keys(techDescriptions).map((tech) => ({
      "@type": "Thing",
      name: tech.charAt(0).toUpperCase() + tech.slice(1),
      description: techDescriptions[tech],
    })),
    sameAs: [
      "https://github.com/chandrakantnagpure", // Replace with actual GitHub
      "https://linkedin.com/in/chandrakantnagpure", // Replace with actual LinkedIn
    ],
  };

  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>

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

        {/* Hidden div for SEO to ensure all descriptions and skills are crawlable */}
        <div style={{ display: "none" }}>
          {Object.entries(techDescriptions).map(([tech, desc], i) => (
            <span key={i}>{desc}</span>
          ))}
          {Object.entries(skillsHighlights).map(([tech, skills], i) => (
            <div key={i}>
              {skills.map((skill, j) => (
                <span key={j}>{`${skill.name}: ${skill.description}`}</span>
              ))}
            </div>
          ))}
          <span>{selectedTech.charAt(0).toUpperCase() + selectedTech.slice(1)} Developer</span>
        </div>

        {/* Orbital Cluster */}
        <motion.div className="relative max-w-4xl w-full h-[80vh] flex items-center justify-center z-10 orbital-cluster">
          {/* Central Star */}
          <motion.div
            className="absolute w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center central-star"
            variants={starVariants}
            initial="hidden"
            animate={["visible", "pulse"]}
            viewport={{ once: false }}
            aria-label={`Selected technology: ${selectedTech.charAt(0).toUpperCase() + selectedTech.slice(1)}`}
          >
            <TechIcon
              size={48}
              color={accentColor}
              aria-label={`${selectedTech.charAt(0).toUpperCase() + selectedTech.slice(1)} icon`}
            />
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
                  style={{ color: "#000" }}
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
                    role="group"
                    aria-label={`${skill.name}: ${skill.description}, Expertise level ${skill.level}%`}
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
                      style={{ color: "#000" }}
                    >
                      {skill.name}
          <Link
            to="/contact"
                  </motion.div>
                ))}
              </div>
            </div>
          </Link>
        </motion.div>
      </section>
    </>
  );
}

export default AboutMe;