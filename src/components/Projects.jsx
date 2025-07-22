import { useEffect, useState, useRef, memo } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { useTech } from "./TechContext";
import OptimizedImage from "./OptimizedImage";
import {
  FaArrowUp,
  FaThumbtack,
  FaLink,
  FaShareAlt,
  FaTimes,
} from "react-icons/fa";

// Project data
const projectsData = [
  {
    id: 1,
    title: "E-commerce Platform",
    description:
      "A responsive online store with product filtering, cart, and secure checkout. Features advanced search, user authentication, and payment integration for a seamless shopping experience.",
    techs: ["react", "nextjs", "tailwind"],
    image:
      "https://images.unsplash.com/photo-1661956600684-97d3a4320e45?w=400&h=250&fit=crop",
    liveLink: "https://example.com/ecommerce-platform",
    repoLink: "https://github.com/dummyuser/ecommerce-platform",
  },
  {
    id: 2,
    title: "Personal Blog",
    description:
      "A customizable blog platform with SEO optimization and a user-friendly CMS. Supports rich media, comments, and social sharing for engaging content delivery.",
    techs: ["wordpress", "php", "javascript"],
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=250&fit=crop",
    liveLink: "https://example.com/personal-blog",
    repoLink: "https://github.com/dummyuser/personal-blog",
  },
  {
    id: 3,
    title: "Task Manager App",
    description:
      "A productivity tool with drag-and-drop tasks, real-time sync, and intuitive UI. Designed for team collaboration with role-based access and notifications.",
    techs: ["react", "javascript", "figma"],
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=250&fit=crop",
    liveLink: "https://example.com/task-manager",
    repoLink: "https://github.com/dummyuser/task-manager",
  },
  {
    id: 4,
    title: "Animated Portfolio",
    description:
      "A dynamic portfolio site with smooth animations and modern design. Showcases developer skills with interactive elements and responsive layouts.",
    techs: ["gsap", "framer", "tailwind"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    liveLink: "https://example.com/animated-portfolio",
    repoLink: "https://github.com/dummyuser/animated-portfolio",
  },
  {
    id: 5,
    title: "Social Media Dashboard",
    description:
      "A dashboard for managing social media accounts with analytics and post scheduling. Features real-time insights and cross-platform integration.",
    techs: ["react", "nextjs", "javascript"],
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=250&fit=crop",
    liveLink: "https://example.com/social-dashboard",
    repoLink: "https://github.com/dummyuser/social-dashboard",
  },
  {
    id: 6,
    title: "Photography Website",
    description:
      "A visually stunning site for photographers with galleries and booking forms. Built with a CMS for easy content updates and SEO optimization.",
    techs: ["wordpress", "php", "photoshop"],
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=250&fit=crop",
    liveLink: "https://example.com/photography-website",
    repoLink: "https://github.com/dummyuser/photography-website",
  },
  {
    id: 7,
    title: "Code Collaboration Tool",
    description:
      "A platform for developers to collaborate on code with version control and real-time editing. Supports syntax highlighting and team workflows.",
    techs: ["github", "javascript", "react"],
    image:
      "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=400&h=250&fit=crop",
    liveLink: "https://example.com/code-collaboration",
    repoLink: "https://github.com/dummyuser/code-collaboration",
  },
  {
    id: 8,
    title: "UI Design Prototype",
    description:
      "An interactive prototype for a mobile app with pixel-perfect designs and animations. Created for user testing and stakeholder feedback.",
    techs: ["figma", "framer", "photoshop"],
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=250&fit=crop",
    liveLink: "https://example.com/ui-prototype",
    repoLink: "https://github.com/dummyuser/ui-prototype",
  },
];

// Animation variants
const cardVariants = {
  hidden: { y: 50 },
  visible: (i) => ({
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

const badgeVariants = {
  hidden: { width: "0%" },
  visible: (progress) => ({
    width: `${progress}%`,
    transition: { duration: 0.8, ease: "easeOut" },
  }),
};

const rippleVariants = {
  initial: { scale: 0, opacity: 0.5 },
  animate: { scale: 4, opacity: 0, transition: { duration: 0.6 } },
};

const toastVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
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

// Project Card Component
const ProjectCard = memo(
  ({
    project,
    index,
    setModalProject,
    techColors,
    selectedTech,
    togglePin,
    isPinned,
  }) => {
    const [ref, isInView] = useInView({ once: false, amount: 0.1 });
    const [ripple, setRipple] = useState(null);
    const cardRef = useRef(null);
    const primaryTech = project.techs.includes(selectedTech)
      ? selectedTech
      : project.techs[0];
    const primaryColor = techColors[primaryTech] || "#4B5563";
    const secondaryTech = project.techs[1] || project.techs[0];
    const secondaryColor = techColors[secondaryTech] || "#6B7280";

    const handleOpenModal = (e) => {
      e.stopPropagation();
      setRipple({
        x: e.clientX - cardRef.current.getBoundingClientRect().left,
        y: e.clientY - cardRef.current.getBoundingClientRect().top,
        id: Date.now(),
      });
      setTimeout(() => setRipple(null), 600);
      setModalProject(project);
    };

    return (
      <motion.div
        ref={cardRef}
        className={`project-card bg-gray-100 bg-opacity-30 backdrop-blur-[8px] rounded-xl shadow-lg p-5 border border-gray-800/30 transition-all duration-300 relative overflow-hidden max-w-sm min-h-[350px] ${
          isPinned ? "order-first" : ""
        } pulse-glow`}
        style={{
          "--glow-color": primaryColor,
          "--ripple-color": `${primaryColor}33`,
          borderColor: isPinned ? primaryColor : "rgba(31, 41, 55, 0.3)",
        }}
        variants={cardVariants}
        custom={index}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        whileHover={{ scale: 1.03, borderWidth: "3px" }}
        tabIndex={0}
        role="region"
        aria-labelledby={`title-${project.id}`}
      >
        {ripple && (
          <motion.div
            className="ripple absolute"
            style={{ left: ripple.x, top: ripple.y }}
            variants={rippleVariants}
            initial="initial"
            animate="animate"
          />
        )}
        <div className="relative overflow-hidden rounded-lg mb-4">
          <OptimizedImage
            src={project.image}
            alt={project.title}
            className="w-full h-60 object-cover transition-transform duration-300 hover:scale-105"
            width={400}
            height={240}
            effect="blur"
          />
        </div>
        <div className="flex justify-between items-center mb-2">
          <h3
            id={`title-${project.id}`}
            className="text-xl font-orbitron font-bold"
            style={{ color: "#000" }}
          >
            {project.title}
          </h3>
          <button
            className="p-1 rounded-full hover:bg-gray-700 transition"
            onClick={(e) => {
              e.stopPropagation();
              togglePin(project.id);
            }}
            aria-label={
              isPinned ? `Unpin ${project.title}` : `Pin ${project.title}`
            }
          >
            <FaThumbtack size={16} color={isPinned ? primaryColor : "#000"} />
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mb-3 justify-start relative">
          {project.techs.map((tech, i) => {
            const progress = Math.floor(Math.random() * (100 - 50 + 1)) + 50; // Random 50-100%
            return (
              <motion.div
                key={tech}
                className="w-20"
                variants={badgeVariants}
                custom={progress}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="h-full"
                    style={{ backgroundColor: techColors[tech] || "#4B5563" }}
                    variants={badgeVariants}
                    custom={progress}
                    aria-label={`${tech} progress: ${progress}%`}
                  />
                </div>
                <p
                  className="text-xs mt-1 text-center capitalize"
                  style={{ color: "#000" }}
                >
                  {tech} ({progress}%)
                </p>
              </motion.div>
            );
          })}
        </div>
        <button
          className="text-sm font-medium px-3 py-1 rounded text-white transition mb-3"
          style={{ backgroundColor: primaryColor }}
          onClick={handleOpenModal}
          aria-label={`View details of ${project.title}`}
        >
          View Details
        </button>
      </motion.div>
    );
  }
);

// Project Modal Component
const ProjectModal = ({
  project,
  techColors,
  selectedTech,
  setModalProject,
  setToast,
}) => {
  const primaryTech = project.techs.includes(selectedTech)
    ? selectedTech
    : project.techs[0];
  const primaryColor = techColors[primaryTech] || "#4B5563";
  const secondaryTech = project.techs[1] || project.techs[0];
  const secondaryColor = techColors[secondaryTech] || "#6B7280";

  const handleShare = async (e) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: project.description.slice(0, 100) + "...",
          url: project.liveLink,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      navigator.clipboard.writeText(project.liveLink);
      setToast({ message: "Link copied!", id: Date.now() });
      setTimeout(() => setToast(null), 2000);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0, 0, 0, 0.7)" }}
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={() => setModalProject(null)}
      onKeyDown={(e) => e.key === "Escape" && setModalProject(null)}
      tabIndex={0}
      role="dialog"
      aria-labelledby={`modal-title-${project.id}`}
    >
      <motion.div
        className="bg-gray-100 bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl p-6 max-w-lg w-full relative"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 transition"
          onClick={() => setModalProject(null)}
          aria-label={`Close details of ${project.title}`}
        >
          <FaTimes size={20} color="#000" />
        </button>
        <h3
          id={`modal-title-${project.id}`}
          className="text-2xl font-orbitron font-bold mb-4"
          style={{ color: "#000" }}
        >
          {project.title}
        </h3>
        <OptimizedImage
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
          width={400}
          height={192}
          effect="blur"
        />
        <p className="text-sm font-semibold mb-4" style={{ color: "#000" }}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          {project.techs.map((tech, i) => {
            const progress = Math.floor(Math.random() * (100 - 50 + 1)) + 50; // Random 50-100%
            return (
              <motion.div
                key={tech}
                className="w-16"
                variants={badgeVariants}
                custom={progress}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full"
                    style={{ backgroundColor: techColors[tech] || "#4B5563" }}
                    variants={badgeVariants}
                    custom={progress}
                    aria-label={`${tech} progress: ${progress}%`}
                  />
                </div>
                <p
                  className="text-xs mt-1 text-center capitalize"
                  style={{ color: "#000" }}
                >
                  {tech} ({progress}%)
                </p>
              </motion.div>
            );
          })}
        </div>
        <div className="flex gap-3 flex-wrap justify-center">
          <a
            href={project.liveLink}
            className="text-sm font-medium px-3 py-1 rounded text-white transition"
            style={{ backgroundColor: primaryColor }}
            aria-label={`View live demo of ${project.title}`}
          >
            Live Demo
          </a>
          <a
            href={project.repoLink}
            className="text-sm font-medium px-3 py-1 rounded text-white transition"
            style={{ backgroundColor: secondaryColor }}
            aria-label={`View GitHub repository for ${project.title}`}
          >
            GitHub
          </a>
          <button
            className="text-sm font-medium px-3 py-1 rounded text-white transition"
            style={{ backgroundColor: primaryColor }}
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(project.liveLink);
              setToast({ message: "Link copied!", id: Date.now() });
              setTimeout(() => setToast(null), 2000);
            }}
            aria-label={`Copy live demo link for ${project.title}`}
          >
            <FaLink size={12} />
          </button>
          <button
            className="text-sm font-medium px-3 py-1 rounded text-white transition"
            style={{ backgroundColor: secondaryColor }}
            onClick={handleShare}
            aria-label={`Share ${project.title}`}
          >
            <FaShareAlt size={12} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main Projects Component
function Projects() {
  const techContext = useTech();
  const selectedTech = techContext?.selectedTech || "default";
  const setSelectedTech = techContext?.updateTech || (() => {});
  const bgColor = techContext?.bgColor || "#ffffff";
  const techColors = techContext?.techColors || { default: "#4B5563" };
  const textColor = getContrastTextColor(bgColor);

  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [modalProject, setModalProject] = useState(null);
  const [pinnedIds, setPinnedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("pinnedIds")) || [];
    } catch {
      return [];
    }
  });
  const [toast, setToast] = useState(null);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const showBackToTop = useTransform(scrollYProgress, (value) => value > 0.2);

  // Persist pinnedIds
  useEffect(() => {
    localStorage.setItem("pinnedIds", JSON.stringify(pinnedIds));
  }, [pinnedIds]);

  // Filter projects based on selectedTech
  useEffect(() => {
    let filtered = projectsData;
    if (selectedTech !== "default") {
      filtered = filtered.filter((project) =>
        project.techs.includes(selectedTech)
      );
    }
    filtered.sort((a, b) => {
      const aPinned = pinnedIds.includes(a.id);
      const bPinned = pinnedIds.includes(b.id);
      return aPinned === bPinned ? 0 : aPinned ? -1 : 1;
    });
    setFilteredProjects(filtered);
  }, [selectedTech, pinnedIds]);

  const togglePin = (id) => {
    setPinnedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const primaryColor = techColors[selectedTech] || "#4B5563";

  return (
    <>
      <section
        id="projects"
        ref={sectionRef}
        className="min-h-screen flex flex-col items-center py-16 px-6 md:px-16 relative font-poppins overflow-hidden"
        style={{
          background: bgColor
            ? `linear-gradient(to right, ${bgColor}33, ${bgColor})`
            : `linear-gradient(to right, #ffffff33, #ffffff)`,
          color: textColor,
          opacity: 1,
        }}
      >
        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 h-1 z-20 progress-bar"
          style={{
            width: progressWidth,
            "--accent-color": techColors[selectedTech || "default"],
          }}
        />

        <div className="max-w-6xl w-full z-10 relative">
          <motion.h2
            className="text-4xl md:text-5xl font-orbitron font-extrabold text-center mb-12"
            style={{ color: textColor }}
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
          >
            My Projects
          </motion.h2>

          <AnimatePresence mode="wait">
            {filteredProjects.length === 0 ? (
              <motion.p
                key="no-projects"
                className="text-lg text-center"
                style={{ color: textColor }}
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                exit={{ y: 20 }}
                transition={{ duration: 0.3 }}
              >
                No projects found.
              </motion.p>
            ) : (
              <div
                key="grid"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    setModalProject={setModalProject}
                    techColors={techColors}
                    selectedTech={selectedTech}
                    togglePin={togglePin}
                    isPinned={pinnedIds.includes(project.id)}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>

          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3
              className="text-2xl md:text-3xl font-bold mb-6 font-orbitron"
              style={{ color: textColor }}
            >
              Have a Project in Mind?
            </h3>
            <Link
              to="/contact"
              className="inline-block px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: primaryColor, color: getContrastTextColor(primaryColor) }}
            >
              Let's Collaborate
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {modalProject && (
          <ProjectModal
            project={modalProject}
            techColors={techColors}
            selectedTech={selectedTech}
            setModalProject={setModalProject}
            setToast={setToast}
          />
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="fixed bottom-16 left-1/2 -translate-x-1/2 bg-gray-800 px-4 py-2 rounded-lg"
            variants={toastVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            aria-live="polite"
            style={{ color: textColor }}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop.get() && (
          <motion.button
            className="back-to-top p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll back to top"
          >
            <FaArrowUp size={20} color={textColor} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

export default Projects;