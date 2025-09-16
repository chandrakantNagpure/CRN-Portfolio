import Hero from '../components/Hero';
import SocialProof from '../components/SocialProof';
import QuickServices from '../components/QuickServices';
import AboutMe from '../components/AboutMe';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import TestimonialsSection from '../components/TestimonialsSection';

function HomePage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <QuickServices />
      <Projects />
      <TestimonialsSection />
      <AboutMe />
      <Contact />
      <Footer />
    </>
  );
}

export default HomePage;
