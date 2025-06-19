// Hero.jsx
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaReact,
  FaWordpress,
  FaPhp,
  FaGithub,
  FaFigma,
  FaCode,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiJavascript,
  SiAdobephotoshop,
  SiGreensock,
  SiFramer,
} from "react-icons/si";
import { useTech } from "./TechContext";

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

const techDescriptions = {
  react: "React description...",
  nextjs: "Next.js description...",
  tailwind: "Tailwind description...",
  wordpress: "WordPress description...",
  php: "PHP description...",
  javascript: "JavaScript description...",
  github: "GitHub description...",
  figma: "Figma description...",
  photoshop: "Photoshop description...",
  gsap: "GSAP description...",
  framer: "Framer description...",
  default: "General tech description...",
};

const techTitles = {
  react: "React Developer",
  nextjs: "Next.js Developer",
  tailwind: "Tailwind CSS Developer",
  wordpress: "WordPress Expert",
  php: "PHP Developer",
  javascript: "JavaScript Developer",
  github: "GitHub Specialist",
  figma: "UI/UX Designer",
  photoshop: "Graphic Designer",
  gsap: "Animation Developer",
  framer: "Framer Motion Expert",
  default: [
    "Frontend Developer",
    "WordPress Expert",
    "React Enthusiast",
    "UI/UX Designer",
    "Freelancer",
  ],
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

const textVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

function Hero() {
  const { selectedTech, bgColor, updateTech, techColors } = useTech();
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [textColor, setTextColor] = useState("#000");
  const [description, setDescription] = useState(techDescriptions.default);
  const [currentTitles, setCurrentTitles] = useState(techTitles.default);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHeroInView, setIsHeroInView] = useState(true);
  const heroRef = useRef(null);

  useEffect(() => {
    setTextColor(getContrastTextColor(bgColor));
    setDescription(techDescriptions[selectedTech] || techDescriptions.default);
    setCurrentTitles(techTitles[selectedTech] || techTitles.default);
  }, [selectedTech, bgColor]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroInView(entry.isIntersecting),
      { threshold: 0 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => heroRef.current && observer.unobserve(heroRef.current);
  }, []);

  useEffect(() => {
    const titles = Array.isArray(currentTitles) ? currentTitles : [currentTitles];
    if (index === titles.length) setIndex(0);
    if (subIndex === titles[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), 1000);
      return;
    }
    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % titles.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => (deleting ? prev - 1 : prev + 1));
      setText(titles[index].substring(0, subIndex));
    }, deleting ? 40 : 100);
    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, currentTitles]);

  const handleIconClick = (tech) => {
    updateTech(tech);
    setIndex(0);
    setSubIndex(0);
    setDeleting(false);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const techIcons = [
    { icon: FaReact, tech: "react", label: "React" },
    { icon: SiNextdotjs, tech: "nextjs", label: "Next.js" },
    { icon: SiTailwindcss, tech: "tailwind", label: "Tailwind CSS" },
    { icon: FaWordpress, tech: "wordpress", label: "WordPress" },
    { icon: FaPhp, tech: "php", label: "PHP" },
    { icon: SiJavascript, tech: "javascript", label: "JavaScript" },
    { icon: FaGithub, tech: "github", label: "GitHub" },
    { icon: FaFigma, tech: "figma", label: "Figma" },
    { icon: SiAdobephotoshop, tech: "photoshop", label: "Photoshop" },
    { icon: SiGreensock, tech: "gsap", label: "GSAP" },
    { icon: SiFramer, tech: "framer", label: "Framer" },
    { icon: FaCode, tech: "default", label: "General Tech" },
  ];

  const SelectedIcon = techIcons.find((item) => item.tech === selectedTech)?.icon || FaCode;
  const iconColor = selectedTech === "default" ? "#4B5563" : techColors[selectedTech] || techColors["react"];
  const isDarkBg = getContrastTextColor(bgColor) === "#fff";
  const iconBgColor = isDarkBg ? "#1f2937" : "#ffffff";

  return (
    <>
      <section
        id="home"
        ref={heroRef}
        className="min-h-screen relative flex items-center justify-center px-6 md:px-16 py-12 font-poppins transition-colors duration-500 overflow-hidden"
        style={{
          background: bgColor
            ? `linear-gradient(to right, ${bgColor}33, ${bgColor})`
            : `linear-gradient(to right, #ffffff33, #ffffff)`,
          color: textColor,
        }}
      >
        <ParticleCanvas bgColor={bgColor || "#ffffff"} />

        <div className="relative z-10 max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            className="flex-1 text-left max-w-lg"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <h1 className="text-3xl md:text-5xl font-orbitron font-extrabold mb-4">
              Hi, I’m Chandrakant Nagpure
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
            <a
              href="#contact"
              className="inline-block px-6 py-3 rounded-full font-medium text-base transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: iconColor, color: getContrastTextColor(iconColor) }}
            >
              Let’s Work Together
            </a>
          </motion.div>

          <motion.div
            className="flex-1 flex justify-center items-center w-full max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-6 w-full">
              {techIcons.filter((item) => item.tech !== "default").map(({ icon: Icon, tech, label }, i) => (
                <motion.div
                  key={tech}
                  className="relative group flex justify-center items-center"
                  variants={iconVariants}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.1 }}
                  onClick={() => handleIconClick(tech)}
                >
                  <div
                    className="p-3 rounded-full cursor-pointer transition-all duration-200"
                    style={{ backgroundColor: iconBgColor }}
                  >
                    <Icon
                      size={selectedTech === tech ? 36 : 32}
                      color={techColors[tech]}
                      aria-label={`Click to select ${label} technology`}
                    />
                  </div>
                  <div className="hidden md:block absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-800 text-white text-xs rounded px-2 py-1 pointer-events-none">
                    Click to select {label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating Dropdown */}
      <AnimatePresence>
        {!isHeroInView && (
          <motion.div
            className="fixed bottom-4 right-4 z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center justify-center w-12 h-12 bg-gray-800 rounded-full shadow-lg hover:bg-gray-700 transition"
                aria-label={isDropdownOpen ? "Close tech dropdown" : "Open tech dropdown"}
              >
                <motion.div
                  key={selectedTech}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: isDropdownOpen ? 0.9 : 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <SelectedIcon size={24} color={iconColor} />
                </motion.div>
              </button>
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.ul
                    className="absolute bottom-14 left-0 bg-gray-800 bg-opacity-90 backdrop-blur-md rounded-lg p-2 flex flex-col items-center gap-2"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {techIcons.filter((item) => item.tech !== "default").map(({ icon: Icon, tech, label }) => (
                      <motion.li
                        key={tech}
                        className="p-2 rounded-full cursor-pointer"
                        style={{ backgroundColor: iconBgColor }}
                        onClick={() => handleIconClick(tech)}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Icon size={24} color={techColors[tech]} aria-label={`Click to select ${label} technology`} />
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Hero;
