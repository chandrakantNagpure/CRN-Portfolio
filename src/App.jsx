import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TechProvider } from "./components/TechContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { StatusProvider } from "./contexts/StatusContext";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import HomePageTest from "./pages/HomePageTest";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";
import ServicesPage from "./pages/ServicesPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <LanguageProvider>
      <StatusProvider>
        <TechProvider>
          <Router>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          </Router>
        </TechProvider>
      </StatusProvider>
    </LanguageProvider>
  );
}

export default App;