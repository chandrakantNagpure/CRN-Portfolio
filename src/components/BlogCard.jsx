import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { FaClock, FaTag, FaUser, FaArrowRight } from 'react-icons/fa';
import { trackEvent } from '../utils/analytics';
import OptimizedImage from './OptimizedImage';
import { useTech } from './TechContext';
import { getContrastTextColor } from '../utils/colors';

const BlogCard = ({ post, index = 0, featured = false }) => {
  const { techColors, bgColor, selectedTech } = useTech();
  // Force dark text for better readability on glass-morphism backgrounds
  const textColor = '#1F2937'; // Dark gray text for better contrast
  const accentColor = techColors[selectedTech] || '#14B8A6';
  
  const handleReadMoreClick = () => {
    trackEvent('blog_card_click', {
      category: 'Blog',
      label: post.slug,
      blog_title: post.title,
      blog_category: post.category,
    });
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: 'easeOut',
      },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.article
      className="group bg-white bg-opacity-20 backdrop-blur-lg rounded-xl transition-all duration-300 hover:bg-opacity-30 hover:scale-105 overflow-hidden"
      style={{ border: `1px solid ${featured ? accentColor : accentColor + '33'}` }}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5 }}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        {featured && (
          <div className="absolute top-4 left-4 z-10">
            <span 
              className="px-3 py-1 rounded-full text-xs font-orbitron font-semibold text-white"
              style={{ backgroundColor: accentColor }}
            >
              Featured
            </span>
          </div>
        )}

        <motion.div variants={imageVariants} whileHover="hover">
          <OptimizedImage
            src={post.image}
            alt={post.title}
            className="w-full h-48 object-cover"
            width={400}
            height={200}
          />
        </motion.div>

        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span 
            className="px-2 py-1 rounded text-xs font-medium text-white"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
          >
            {post.category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.slice(0, 3).map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors hover:bg-opacity-30"
              style={{ 
                backgroundColor: `${accentColor}20`, 
                color: textColor,
                opacity: 0.8
              }}
            >
              <FaTag className="w-2 h-2" />
              {tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="text-xs" style={{ color: textColor, opacity: 0.5 }}>
              +{post.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Title */}
        <h3 
          className="text-xl font-orbitron font-bold mb-3 line-clamp-2 group-hover:opacity-80 transition-all"
          style={{ color: textColor }}
        >
          <Link to={`/blog/${post.slug}`} onClick={handleReadMoreClick}>
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p 
          className="mb-4 line-clamp-3 leading-relaxed text-sm"
          style={{ color: textColor, opacity: 0.8 }}
        >
          {post.excerpt}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs mb-4" style={{ color: textColor, opacity: 0.6 }}>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <FaUser className="w-3 h-3" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaClock className="w-3 h-3" />
              <span>{post.readTime}</span>
            </div>
          </div>
          <time dateTime={post.date}>{format(new Date(post.date), 'MMM dd, yyyy')}</time>
        </div>

        {/* Read More Button */}
        <Link
          to={`/blog/${post.slug}`}
          onClick={handleReadMoreClick}
          className="inline-flex items-center gap-2 font-medium transition-all group/btn hover:gap-3"
          style={{ color: accentColor }}
        >
          <span>Read More</span>
          <FaArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>

      {/* Hover Effect Overlay */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl"
        style={{ background: `linear-gradient(to top, ${accentColor}05, transparent)` }}
      />
    </motion.article>
  );
};

export default BlogCard;
