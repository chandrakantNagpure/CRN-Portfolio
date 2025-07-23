import { motion } from "framer-motion";
import { useTech } from "./TechContext";
import { FaHeart, FaReact, FaWordpress, FaCode } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss } from "react-icons/si";
import { useLanguage } from "../contexts/LanguageContext";

const getContrastTextColor = (bgColor) => {
  if (!bgColor) return "#000";
  const color = bgColor.substring(1);
  const rgb = parseInt(color, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? "#000" : "#fff";
};

function Footer() {
  const { t } = useLanguage();
  const { selectedTech, techColors, bgColor } = useTech();
  const textColor = getContrastTextColor(bgColor);
  const primaryColor = techColors[selectedTech] || "#4B5563";

  const techIcons = {
    react: FaReact,
    nextjs: SiNextdotjs,
    tailwind: SiTailwindcss,
    wordpress: FaWordpress,
    default: FaCode,
  };

  const TechIcon = techIcons[selectedTech] || techIcons.default;

  return (
    <footer
      className="py-8 px-6 md:px-16 border-t border-opacity-20"
      style={{
        background: bgColor
          ? `linear-gradient(to right, ${bgColor}22, ${bgColor}44)`
          : `linear-gradient(to right, #f8f9fa, #e9ecef)`,
        borderColor: primaryColor,
        color: textColor,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Made with love section */}
          <div className="flex items-center gap-2 text-sm md:text-base">
            <span style={{ color: textColor }}>{t('footer.madeWith')}</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <FaHeart size={16} color="#e74c3c" />
            </motion.div>
            <span style={{ color: textColor }}>{t('footer.and')}</span>
            <motion.div
              className="flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
            >
              <TechIcon size={16} color={primaryColor} />
              <span style={{ color: primaryColor }} className="font-medium">
                {selectedTech === "default" ? t('footer.passion') : selectedTech}
              </span>
            </motion.div>
          </div>

          {/* Copyright */}
          <div className="text-sm" style={{ color: textColor, opacity: 0.8 }}>
            © {new Date().getFullYear()} Chandrakant Nagpure. {t('footer.copyright')}
          </div>

          {/* Quick links */}
          <div className="flex items-center gap-4 text-sm">
            <a
              href="/about"
              className="hover:underline transition-colors duration-200"
              style={{ color: textColor }}
            >
              {t('nav.about')}
            </a>
            <a
              href="/projects"
              className="hover:underline transition-colors duration-200"
              style={{ color: textColor }}
            >
              {t('nav.projects')}
            </a>
            <a
              href="/contact"
              className="hover:underline transition-colors duration-200"
              style={{ color: textColor }}
            >
              {t('nav.contact')}
            </a>
          </div>
        </motion.div>

        {/* Additional info */}
        <motion.div
          className="mt-4 pt-4 border-t border-opacity-10 text-center text-xs"
          style={{ borderColor: primaryColor, color: textColor, opacity: 0.6 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {t('footer.tagline')}
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;