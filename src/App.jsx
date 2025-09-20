import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import { trackPageView } from './utils/analytics';
import { TechProvider } from './components/TechContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { StatusProvider } from './contexts/StatusContext';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import HomePageTest from './pages/HomePageTest';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import NotFoundPage from './pages/NotFoundPage';
import StickyContact from './components/StickyContact';
import ThemeIndicator from './components/ThemeIndicator';

// Component to track page views
function PageTracker() {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    if (import.meta.env.PROD || import.meta.env.VITE_ENABLE_ANALYTICS === 'true') {
      trackPageView(location.pathname + location.search);
    }
  }, [location]);

  return null;
}

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <StatusProvider>
          <TechProvider>
            <Router>
              <PageTracker />
              {/* <ScrollToTop /> */}
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
              <StickyContact />
              <ThemeIndicator />
            </Router>
          </TechProvider>
        </StatusProvider>
      </LanguageProvider>
      <SpeedInsights />
      <Analytics />
    </HelmetProvider>
  );
}

export default App;
