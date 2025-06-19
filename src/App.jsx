import { TechProvider } from "./components/TechContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
function App() {
  return (
    <TechProvider>
      <Navbar />
      <div>
        <Hero />
        <AboutMe />
        <Projects />
        <Contact />
      </div>
    </TechProvider>
  );
}

export default App;
