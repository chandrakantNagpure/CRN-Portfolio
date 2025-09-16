import { FaReact, FaWordpress, FaPhp, FaGithub, FaFigma, FaCode } from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTailwindcss,
  SiJavascript,
  SiAdobephotoshop,
  SiGreensock,
  SiFramer,
} from 'react-icons/si';

// Use the same colors from TechContext
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

export const techIcons = [
  { tech: 'react', label: 'React', icon: FaReact },
  { tech: 'nextjs', label: 'Next.js', icon: SiNextdotjs },
  { tech: 'tailwind', label: 'Tailwind CSS', icon: SiTailwindcss },
  { tech: 'wordpress', label: 'WordPress', icon: FaWordpress },
  { tech: 'php', label: 'PHP', icon: FaPhp },
  { tech: 'javascript', label: 'JavaScript', icon: SiJavascript },
  { tech: 'github', label: 'GitHub', icon: FaGithub },
  { tech: 'figma', label: 'Figma', icon: FaFigma },
  { tech: 'photoshop', label: 'Photoshop', icon: SiAdobephotoshop },
  { tech: 'gsap', label: 'GSAP', icon: SiGreensock },
  { tech: 'framer', label: 'Framer', icon: SiFramer },
  { tech: 'default', label: 'General Tech', icon: FaCode },
];
