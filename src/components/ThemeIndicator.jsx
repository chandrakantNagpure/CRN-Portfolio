import { useTech } from './TechContext';
import { getContrastTextColor } from '../utils/colors';

function ThemeIndicator() {
  const { selectedTech, bgColor, techColors } = useTech();
  const textColor = getContrastTextColor(bgColor);
  const primaryColor = bgColor || techColors[selectedTech] || '#4B5563';

  // Only show if not default and in development
  if (selectedTech === 'default' || process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div 
      className="fixed opacity-0 top-4 left-4 z-40 px-3 py-2 rounded-lg shadow-lg backdrop-blur-sm border transition-all duration-500"
      style={{ 
        backgroundColor: primaryColor + '20',
        borderColor: primaryColor + '40',
        color: textColor 
      }}
    >
      <div className="text-xs font-medium">
        <div>Current Theme: <span className="font-bold capitalize">{selectedTech}</span></div>
        <div>Color: <span style={{ color: primaryColor }}>{primaryColor}</span></div>
      </div>
    </div>
  );
}

export default ThemeIndicator;
