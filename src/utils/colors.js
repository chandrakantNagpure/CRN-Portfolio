/**
 * Calculates the appropriate text color (black or white) based on background color brightness
 * @param {string} bgColor - Hex color (e.g., "#4B5563")
 * @returns {string} - Either "#000" for dark text or "#fff" for light text
 */
export const getContrastTextColor = bgColor => {
  if (!bgColor) return '#000';

  // Remove # if present
  const color = bgColor.startsWith('#') ? bgColor.substring(1) : bgColor;

  // Parse hex to RGB
  const rgb = parseInt(color, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;

  // Calculate brightness using luminance formula
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return contrasting color
  return brightness > 150 ? '#000' : '#fff';
};

/**
 * Generates a CSS color with opacity
 * @param {string} color - Base color
 * @param {number} opacity - Opacity value (0-1)
 * @returns {string} - CSS color with opacity
 */
export const colorWithOpacity = (color, opacity = 1) => {
  if (!color) return `rgba(0, 0, 0, ${opacity})`;

  const hexColor = color.startsWith('#') ? color.substring(1) : color;
  const rgb = parseInt(hexColor, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

/**
 * Tech-specific color palette
 */
export const techColors = {
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
  default: '#4B5563',
};
