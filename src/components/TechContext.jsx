import { createContext, useContext, useState, useEffect } from 'react';

// Create Context
const TechContext = createContext();

// Tech colors (shared across components)
const techColors = {
  react: '#61DAFB',
  nextjs: '#000000',
  tailwind: '#38BDF8',
  wordpress: '#21759B',
  php: '#8892BE',
  javascript: '#F7DF1E',
  github: '#333333',
  figma: '#F24E1E',
  photoshop: '#31A8FF',
  gsap: '#88CE02',
  framer: '#A259FF',
  shopify: '#7AB55C',
  squarespace: '#000000',
  webflow: '#4353FF',
  wix: '#0C6EFC',
};

function TechProvider({ children }) {
  const [selectedTech, setSelectedTech] = useState('default');
  const [bgColor, setBgColor] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    const storedTech = localStorage.getItem('selectedTech');
    const storedColor = localStorage.getItem('bgColor');
    if (storedTech) setSelectedTech(storedTech);
    if (storedColor) setBgColor(storedColor);
  }, []);

  // Update localStorage when selectedTech or bgColor changes
  useEffect(() => {
    if (selectedTech !== 'default') {
      localStorage.setItem('selectedTech', selectedTech);
      localStorage.setItem('bgColor', bgColor);
    }
  }, [selectedTech, bgColor]);

  // Function to update tech and color
  const updateTech = tech => {
    setSelectedTech(tech);
    setBgColor(techColors[tech] || '');
  };

  return (
    <TechContext.Provider value={{ selectedTech, bgColor, updateTech, techColors }}>
      {children}
    </TechContext.Provider>
  );
}

// Custom hook to use TechContext
function useTech() {
  const context = useContext(TechContext);
  if (!context) {
    throw new Error('useTech must be used within a TechProvider');
  }
  return context;
}

export { TechProvider, useTech };
export default TechContext;
