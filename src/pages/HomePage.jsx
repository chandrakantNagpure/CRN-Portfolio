import { useMemo } from 'react';
import Hero from '../components/Hero';
import SocialProof from '../components/SocialProof';
import QuickServices from '../components/QuickServices';
import AboutMe from '../components/AboutMe';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import TestimonialsSection from '../components/TestimonialsSection';
import { useTech } from '../components/TechContext';
import { projectsData } from '../data/projectsData';

function HomePage() {
  const { selectedTech } = useTech();
  
  // Check if there are projects for the selected tech
  const hasProjectsForSelectedTech = useMemo(() => {
    if (selectedTech === 'default') {
      return projectsData.length > 0;
    }
    return projectsData.some(project => project.techs.includes(selectedTech));
  }, [selectedTech]);

  return (
    <>
      <Hero />
      <SocialProof />
      <QuickServices />
      {hasProjectsForSelectedTech && <Projects />}
      <TestimonialsSection />
      <AboutMe />
      <Contact />
      <Footer />
    </>
  );
}

export default HomePage;
