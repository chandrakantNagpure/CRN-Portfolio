import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTech } from "../components/TechContext";
import OptimizedImage from "../components/OptimizedImage";
import ParticleCanvas from "../components/ParticleCanvas";
import Footer from "../components/Footer";
import {
  FaArrowUp,
  FaThumbtack,
  FaLink,
  FaShareAlt,
  FaTimes,
  FaFilter,
} from "react-icons/fa";

// Reuse project data from Projects component
const projectsData = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A responsive online store with product filtering, cart, and secure checkout. Features advanced search, user authentication, and payment integration for a seamless shopping experience.",
    techs: ["react", "nextjs", "tailwind"],
    image: "https://images.unsplash.com/photo-1661956600684-97d3a4320e45?w=400&h=250&fit=crop",
    liveLink: "https://example.com/ecommerce-platform",
    repoLink: "https://github.com/dummyuser/ecommerce-platform",
    featured: true,
  },
  {
    id: 2,
    title: "Personal Blog",
    description: "A customizable blog platform with SEO optimization and a user-friendly CMS. Supports rich media, comments, and social sharing for engaging content delivery.",
    techs: ["wordpress", "php", "javascript"],
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=250&fit=crop",
    liveLink: "https://example.com/personal-blog",
    repoLink: "https://github.com/dummyuser/personal-blog",
    featured: false,
  },
  {
    id: 3,
    title: "Task Manager App",
    description: "A productivity tool with drag-and-drop tasks, real-time sync, and intuitive UI. Designed for team collaboration with role-based access and notifications.",
    techs: ["react", "javascript", "figma"],
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=250&fit=crop",
    liveLink: "https://example.com/task-manager",
    repoLink: "https://github.com/dummyuser/task-manager",
    featured: true,
  },
  {
    id: 4,
    title: "Animated Portfolio",
    description: "A dynamic portfolio site with smooth animations and modern design. Showcases developer skills with interactive elements and responsive layouts.",
    techs: ["gsap", "framer", "tailwind"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    liveLink: "https://example.com/animated-portfolio",
    repoLink: "https://github.com/dummyuser/animated-portfolio",
    featured: false,
  },
  {
    id: 5,
    title: "Social Media Dashboard",
    description: "A dashboard for managing social media accounts with analytics and post scheduling. Features real-time insights and cross-platform integration.",
    techs: ["react", "nextjs", "javascript"],
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=250&fit=crop",
    liveLink: "https://example.com/social-dashboard",
    repoLink: "https://github.com/dummyuser/social-dashboard",
    featured: true,
  },
  {
    id: 6,
    title: "Photography Website",
    description: "A visually stunning site for photographers with galleries and booking forms. Built with a CMS for easy content updates and SEO optimization.",
    techs: ["wordpress", "php", "photoshop"],
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=250&fit=crop",
    liveLink: "https://example.com/photography-website",
    repoLink: "https://github.com/dummyuser/photography-website",
    featured: false,
  },
];

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

function ProjectsPage() {
  const { selectedTech, techColors, bgColor } = useTech();
  const textColor = getContrastTextColor(bgColor);
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [activeFilter, setActiveFilter] = useState("all");
  const [modalProject, setModalProject] = useState(null);
  const [pinnedIds, setPinnedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("pinnedIds")) || [];
    } catch {
      return [];
    }
  });

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    localStorage.setItem("pinnedIds", JSON.stringify(pinnedIds));
  }, [pinnedIds]);

  useEffect(() => {
    let filtered = projectsData;
    
    if (activeFilter === "featured") {
      filtered = filtered.filter(project => project.featured);
    } else if (activeFilter !== "all") {
      filtered = filtered.filter(project => project.techs.includes(activeFilter));
    }
    
    filtered.sort((a, b) => {
      const aPinned = pinnedIds.includes(a.id);
      const bPinned = pinnedIds.includes(b.id);
      return aPinned === bPinned ? 0 : aPinned ? -1 : 1;
    });
    
    setFilteredProjects(filtered);
  }, [activeFilter, pinnedIds]);

  const togglePin = (id) => {
    setPinnedIds(prev => 
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  const filters = [
    { key: "all", label: "All Projects" },
    { key: "featured", label: "Featured" },
    { key: "react", label: "React" },
    { key: "nextjs", label: "Next.js" },
    { key: "wordpress", label: "WordPress" },
    { key: "javascript", label: "JavaScript" },
  ];

  const primaryColor = techColors[selectedTech] || "#4B5563";

  return (
    <div
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center py-20 px-6 md:px-16 relative font-poppins overflow-hidden"
      style={{
        background: bgColor
          ? `linear-gradient(to right, ${bgColor}33, ${bgColor})`
          : `linear-gradient(to right, #ffffff33, #ffffff)`,
        color: textColor,
      }}
    >
      <ParticleCanvas bgColor={bgColor || "#4B5563"} />

      <div className="max-w-7xl w-full z-10 relative">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            className="text-4xl md:text-6xl font-orbitron font-extrabold mb-6"
            style={{ color: textColor }}
          >
            My Projects
          </h1>
          <p
            className="text-lg md:text-xl max-w-3xl mx-auto"
            style={{ color: textColor, opacity: 0.8 }}
          >
            A showcase of my work spanning web development, design, and digital solutions.
            Each project represents a unique challenge and creative solution.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {filters.map(filter => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter.key
                  ? 'text-white shadow-lg'
                  : 'bg-white bg-opacity-20 backdrop-blur-lg hover:bg-opacity-30'
              }`}
              style={{
                backgroundColor: activeFilter === filter.key ? primaryColor : undefined,
                color: activeFilter === filter.key ? getContrastTextColor(primaryColor) : textColor,
                border: `1px solid ${primaryColor}33`
              }}
            >
              <FaFilter className="inline mr-2" size={12} />
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          {filteredProjects.length === 0 ? (
            <motion.div
              key="no-projects"
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-xl" style={{ color: textColor }}>
                No projects found for the selected filter.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="projects-grid"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to Action */}
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
          <a
            href="/contact"
            className="inline-block px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: primaryColor, color: getContrastTextColor(primaryColor) }}
          >
            Let's Collaborate
          </a>
        </motion.div>
      </div>
      <Footer />

      {/* Project Modal */}
      <AnimatePresence>
        {modalProject && (
          <ProjectModal
            project={modalProject}
            techColors={techColors}
            selectedTech={selectedTech}
            setModalProject={setModalProject}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Project Card Component (simplified version)
const ProjectCard = ({ project, index, setModalProject, techColors, selectedTech, togglePin, isPinned }) => {
  const [ref, isInView] = useInView({ once: false, amount: 0.1 });
  const primaryTech = project.techs.includes(selectedTech) ? selectedTech : project.techs[0];
  const primaryColor = techColors[primaryTech] || "#4B5563";

  return (
    <motion.div
      ref={ref}
      className={`bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-800/30 transition-all duration-300 relative overflow-hidden ${
        isPinned ? "order-first" : ""
      }`}
      style={{ borderColor: isPinned ? primaryColor : "rgba(31, 41, 55, 0.3)" }}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
    >
      {project.featured && (
        <div
          className="absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-bold"
          style={{ backgroundColor: primaryColor, color: getContrastTextColor(primaryColor) }}
        >
          Featured
        </div>
      )}
      
      <div className="relative overflow-hidden rounded-lg mb-4">
        <OptimizedImage
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
          width={400}
          height={192}
        />
      </div>
      
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-orbitron font-bold" style={{ color: "#000" }}>
          {project.title}
        </h3>
        <button
          className="p-1 rounded-full hover:bg-gray-700 transition"
          onClick={(e) => {
            e.stopPropagation();
            togglePin(project.id);
          }}
        >
          <FaThumbtack size={16} color={isPinned ? primaryColor : "#000"} />
        </button>
      </div>
      
      <p className="text-sm mb-4" style={{ color: "#000" }}>
        {project.description.slice(0, 120)}...
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.techs.map(tech => (
          <span
            key={tech}
            className="px-2 py-1 rounded-full text-xs font-medium"
            style={{ 
              backgroundColor: `${techColors[tech] || "#4B5563"}20`,
              color: techColors[tech] || "#4B5563"
            }}
          >
            {tech}
          </span>
        ))}
      </div>
      
      <button
        className="w-full px-4 py-2 rounded-lg text-white font-medium transition"
        style={{ backgroundColor: primaryColor }}
        onClick={() => setModalProject(project)}
      >
        View Details
      </button>
    </motion.div>
  );
};

// Project Modal Component (simplified)
const ProjectModal = ({ project, techColors, selectedTech, setModalProject }) => {
  const primaryTech = project.techs.includes(selectedTech) ? selectedTech : project.techs[0];
  const primaryColor = techColors[primaryTech] || "#4B5563";

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0, 0, 0, 0.7)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setModalProject(null)}
    >
      <motion.div
        className="bg-white rounded-xl shadow-2xl p-6 max-w-2xl w-full relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 transition"
          onClick={() => setModalProject(null)}
        >
          <FaTimes size={20} color="#000" />
        </button>
        
        <h3 className="text-2xl font-orbitron font-bold mb-4" style={{ color: "#000" }}>
          {project.title}
        </h3>
        
        <OptimizedImage
          src={project.image}
          alt={project.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
          width={600}
          height={256}
        />
        
        <p className="text-base mb-6" style={{ color: "#000" }}>
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techs.map(tech => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{ 
                backgroundColor: `${techColors[tech] || "#4B5563"}20`,
                color: techColors[tech] || "#4B5563"
              }}
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-4">
          <a
            href={project.liveLink}
            className="flex-1 px-4 py-2 rounded-lg text-white font-medium text-center transition"
            style={{ backgroundColor: primaryColor }}
          >
            Live Demo
          </a>
          <a
            href={project.repoLink}
            className="flex-1 px-4 py-2 rounded-lg border font-medium text-center transition hover:bg-gray-50"
            style={{ borderColor: primaryColor, color: primaryColor }}
          >
            GitHub
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectsPage;