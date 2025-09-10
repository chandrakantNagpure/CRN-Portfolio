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
import {
  FaArrowUp,
  FaThumbtack,
  FaLink,
  FaShareAlt,
  FaTimes,
} from "react-icons/fa";
// Project images
const creativeLab_splashscreen = "/assets/projects/CreativeLab-Interior.png";
const cyberi3secure_splashscreen = "/assets/projects/Cyber3Secure.png";
const share_proximacloud_splashscreen = "/assets/projects/share.proximacloud.png";
const inheritance_infra_splashscreen = "/assets/projects/Inheritance_Infra.png";
const palloti_splashscreen = "/assets/projects/Palloti.png";
// Real project data
const projectsData = [
  {
    id: 1,
    title: "Creative for CreativeLab Interior",
    description: "A unique horizontal scrolling website built completely from scratch with custom WordPress theme. Features creative layouts and fresh design elements for an interior design company.",
    techs: ["figma", "wordpress", "css", "gsap", "javascript"],
    image: creativeLab_splashscreen,
    liveLink: "https://creativelabinteriors.ae/",
    featured: true,
  },
  {
    id: 2,
    title: "Cyberi3Secure",
    description: "A cybersecurity firm specializing in Privileged Access Management (PAM) to enhance identity security, compliance, and operational efficiency for organizations.",
    techs: ["wordpress", "php", "javascript", "gsap", "css"],
    image: cyberi3secure_splashscreen,
    liveLink: "https://cyberi3secure.com/",
    repoLink: "https://github.com/chandrakantNagpure/Cyber3Secure",
    featured: true,
  },
  {
    id: 3,
    title: "ProximaShare",
    description: "A lightweight and secure file-sharing platform with drag-and-drop support. Files are limited to 2MB and shared via expiring links that auto-delete after 3 downloads or 3 days, ensuring privacy and simplicity.",
    techs: ["nextjs", "javascript", "tailwind"],
    image: share_proximacloud_splashscreen,
    liveLink: "https://share.proximacloud.in/",
    repoLink: "https://github.com/proxima-cloud/proxima-share-fe",
    featured: true,
  },
  {
    id: 4,
    title: "Inheritance Infrastructure",
    description: "A forward-thinking real estate company based in Nagpur, Maharashtra, focused on delivering quality residential and commercial land investments and developments.",
    techs: ["react", "tailwind", "javascript", "gsap"],
    image: inheritance_infra_splashscreen,
    liveLink: "https://inheritance-infrastructure.vercel.app/",
    repoLink: "https://github.com/chandrakantNagpure/InheritanceInfrastructure",
    featured: false,
  },
  {
    id: 5,
    title: "St. Vincent Pallotti College",
    description: "An autonomous engineering college website with modern design and user-friendly interface for students and faculty.",
    techs: ["html", "php", "css", "bootstrap", "javascript"],
    image: palloti_splashscreen,
    liveLink: "https://svpcet.ac.in/",
    repoLink: "https://github.com/chandrakantNagpure/pallotti",
    featured: false,
  },
  {
    id: 6,
    title: "Task Manager App",
    description: "A productivity tool with drag-and-drop tasks, real-time sync, and intuitive UI. Designed for team collaboration with role-based access and notifications.",
    techs: ["react", "javascript", "figma"],
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=250&fit=crop",
    liveLink: "https://example.com/task-manager",
    repoLink: "https://github.com/dummyuser/task-manager",
    featured: false,
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
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-60 object-cover"
            loading="lazy"
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
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
<div className="flex flex-wrap gap-4 mb-3 justify-start relative">
  {project.techs.map((tech, i) => {
    const progress = Math.floor(Math.random() * (100 - 50 + 1)) + 50; // Random 50-100%
    return (
      <motion.div
        key={tech}
        className="w-28" // a bit wider so text fits nicely
        variants={badgeVariants}
        custom={progress}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.05 }}
      >
        {/* Progress container */}
        <div className="bg-gray-200 rounded-full h-3 overflow-hidden relative shadow-sm">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${techColors[tech] || "#4B5563"}, #9ca3af)`,
            }}
            variants={badgeVariants}
            custom={progress}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            aria-label={`${tech} progress: ${progress}%`}
          />
          {/* Animated shine effect */}
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </div>

        {/* Label */}
        <p className="text-xs mt-1 text-center capitalize font-medium text-gray-800">
          {tech} <span className="text-gray-500">({progress}%)</span>
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
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
          loading="lazy"
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
    </>
  );
}

export default Projects;