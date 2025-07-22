import { useState, useEffect } from "react";
import {
  FaHome,
  FaUser,
  FaProjectDiagram,
  FaEnvelope,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import OptimizedImage from "./OptimizedImage";
import StatusIndicator from "./StatusIndicator";

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 backdrop-blur-md ${
          isScrolled ? "shadow-md bg-white/70 dark:bg-gray-900/70" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <OptimizedImage
              src="/assets/logo-5.png"
              alt="CRN Logo"
              className={`object-contain transition-all duration-300 ${
                isScrolled ? "w-[120px]" : "w-[160px]"
              }`}
              width={isScrolled ? 120 : 160}
              height={isScrolled ? 40 : 50}
              effect="opacity"
            />
          </Link>

          {/* Status Indicator - Hidden on mobile */}
          <div className="hidden md:block">
            <StatusIndicator />
          </div>

          {/* Hamburger */}
          <button
            onClick={toggleSidebar}
            className="relative w-8 h-8 focus:outline-none group"
            aria-label="Toggle menu"
          >
            <span
              className={`absolute h-0.5 w-8 bg-gray-800 dark:bg-white transform transition duration-300 ease-in-out ${
                isOpen ? "rotate-45 top-3.5" : "top-2"
              }`}
            />
            <span
              className={`absolute h-0.5 w-8 bg-gray-800 dark:bg-white transition-all duration-300 ease-in-out ${
                isOpen ? "opacity-0" : "top-4"
              }`}
            />
            <span
              className={`absolute h-0.5 w-8 bg-gray-800 dark:bg-white transform transition duration-300 ease-in-out ${
                isOpen ? "-rotate-45 bottom-3.5" : "bottom-2"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-900 text-gray-900 dark:text-white z-50 transform transition-transform duration-300 ease-in-out shadow-lg ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 mt-20 space-y-6 text-lg font-medium">
          {/* Status in mobile menu */}
          <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
            <StatusIndicator />
          </div>
          
          <Link
            to="/"
            onClick={handleLinkClick}
            className={`flex items-center gap-3 hover:text-teal-500 transition cursor-pointer ${
              isActive("/") ? "text-teal-500" : ""
            }`}
          >
            <FaHome /> Home
          </Link>
          <Link
            to="/about"
            onClick={handleLinkClick}
            className={`flex items-center gap-3 hover:text-teal-500 transition cursor-pointer ${
              isActive("/about") ? "text-teal-500" : ""
            }`}
          >
            <FaUser /> About
          </Link>
          <Link
            to="/projects"
            onClick={handleLinkClick}
            className={`flex items-center gap-3 hover:text-teal-500 transition cursor-pointer ${
              isActive("/projects") ? "text-teal-500" : ""
            }`}
          >
            <FaProjectDiagram /> Projects
          </Link>
          <Link
            to="/contact"
            onClick={handleLinkClick}
            className={`flex items-center gap-3 hover:text-teal-500 transition cursor-pointer ${
              isActive("/contact") ? "text-teal-500" : ""
            }`}
          >
            <FaEnvelope /> Contact
          </Link>
        </div>
      </aside>
    </>
  );
}

export default Navbar;
