import { useState, useEffect } from 'react';
import { FaHome, FaUser, FaProjectDiagram, FaEnvelope, FaCog, FaBlog } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';
import StatusIndicator from './StatusIndicator';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';

function Navbar() {
  const { t } = useLanguage();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return (
      localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  });

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    const handleKeyDown = e => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const isActive = path => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 backdrop-blur-md ${
          isScrolled ? 'shadow-md bg-white/70 dark:bg-gray-900/70' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <OptimizedImage
              src="/assets/logo-5.png"
              alt="CRN Logo"
              className={`object-contain transition-all duration-300 ${
                isScrolled ? 'w-[120px]' : 'w-[160px]'
              }`}
              width={isScrolled ? 120 : 160}
              height={isScrolled ? 40 : 50}
              effect="opacity"
            />
          </Link>

          {/* Desktop Navigation Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-teal-500 ${
                isActive('/') ? 'text-teal-500' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hover:text-teal-500 ${
                isActive('/about') ? 'text-teal-500' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {t('nav.about')}
            </Link>
            <Link
              to="/projects"
              className={`text-sm font-medium transition-colors hover:text-teal-500 ${
                isActive('/projects') ? 'text-teal-500' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {t('nav.projects')}
            </Link>
            <Link
              to="/services"
              className={`text-sm font-medium transition-colors hover:text-teal-500 ${
                isActive('/services') ? 'text-teal-500' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {t('nav.services')}
            </Link>
            <Link
              to="/blog"
              className={`text-sm font-medium transition-colors hover:text-teal-500 ${
                isActive('/blog') ? 'text-teal-500' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {t('nav.blog') || 'Blog'}
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors hover:text-teal-500 ${
                isActive('/contact') ? 'text-teal-500' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {t('nav.contact')}
            </Link>
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* Status Indicator - Hidden on mobile */}
            <div className="hidden md:block">
              <StatusIndicator />
            </div>

            {/* Language Switcher - Hidden on mobile */}
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
          
            {/* Hamburger */}
            <button
              onClick={toggleSidebar}
              className={`relative w-12 h-12 ml-4 lg:hidden focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 group rounded-lg transition-all duration-300 flex items-center justify-center ${
                isScrolled
                  ? 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 shadow-sm'
                  : 'bg-white/30 dark:bg-gray-900/30 hover:bg-white/40 dark:hover:bg-gray-900/40 backdrop-blur-sm border border-white/20 dark:border-gray-700/50'
              } ${isOpen ? 'bg-gray-200 dark:bg-gray-700 scale-95' : 'hover:scale-105'}`}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              style={{ cursor: 'pointer' }}
            >
              <div className="relative w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={`block absolute h-0.5 w-6 bg-gray-800 dark:bg-white transform transition-all duration-300 ease-in-out ${
                    isOpen ? 'rotate-45' : '-translate-y-2'
                  }`}
                />
                <span
                  className={`block absolute h-0.5 w-6 bg-gray-800 dark:bg-white transition-all duration-300 ease-in-out ${
                    isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                  }`}
                />
                <span
                  className={`block absolute h-0.5 w-6 bg-gray-800 dark:bg-white transform transition-all duration-300 ease-in-out ${
                    isOpen ? '-rotate-45' : 'translate-y-2'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/50 z-80 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-900 text-gray-900 dark:text-white z-90 transform transition-transform duration-300 ease-in-out shadow-lg ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Sidebar Header with Close Button */}
        <div className="flex justify-between items-center p-6 pb-0">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {t('nav.menu') || 'Menu'}
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Close menu"
          >
            <div className="relative w-5 h-5">
              <span className="absolute top-1/2 left-1/2 w-4 h-0.5 bg-gray-600 dark:bg-gray-300 transform -translate-x-1/2 -translate-y-1/2 rotate-45" />
              <span className="absolute top-1/2 left-1/2 w-4 h-0.5 bg-gray-600 dark:bg-gray-300 transform -translate-x-1/2 -translate-y-1/2 -rotate-45" />
            </div>
          </button>
        </div>

        <div className="flex flex-col p-6 pt-4 space-y-6 text-lg font-medium">
          {/* Status in mobile menu */}
          <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
            <StatusIndicator useSidebarColors={true} />
            <div className="mt-3">
              <LanguageSwitcher />
            </div>
          </div>

          <Link
            to="/"
            onClick={handleLinkClick}
            className={`flex items-center gap-3 hover:text-teal-500 transition cursor-pointer ${
              isActive('/') ? 'text-teal-500' : ''
            }`}
          >
            <FaHome /> {t('nav.home')}
          </Link>
          <Link
            to="/about"
            onClick={handleLinkClick}
            className={`flex items-center gap-3 hover:text-teal-500 transition cursor-pointer ${
              isActive('/about') ? 'text-teal-500' : ''
            }`}
          >
            <FaUser /> {t('nav.about')}
          </Link>
          <Link
            to="/projects"
            onClick={handleLinkClick}
            className={`flex items-center gap-3 hover:text-teal-500 transition cursor-pointer ${
              isActive('/projects') ? 'text-teal-500' : ''
            }`}
          >
            <FaProjectDiagram /> {t('nav.projects')}
          </Link>
          <Link
            to="/services"
            onClick={handleLinkClick}
            className={`flex items-center gap-3 hover:text-teal-500 transition cursor-pointer ${
              isActive('/services') ? 'text-teal-500' : ''
            }`}
          >
            <FaCog /> {t('nav.services')}
          </Link>
          <Link
            to="/blog"
            onClick={handleLinkClick}
            className={`flex items-center gap-3 hover:text-teal-500 transition cursor-pointer ${
              isActive('/blog') ? 'text-teal-500' : ''
            }`}
          >
            <FaBlog /> {t('nav.blog') || 'Blog'}
          </Link>
          <Link
            to="/contact"
            onClick={handleLinkClick}
            className={`flex items-center gap-3 hover:text-teal-500 transition cursor-pointer ${
              isActive('/contact') ? 'text-teal-500' : ''
            }`}
          >
            <FaEnvelope /> {t('nav.contact')}
          </Link>
        </div>
      </aside>
    </>
  );
}

export default Navbar;
