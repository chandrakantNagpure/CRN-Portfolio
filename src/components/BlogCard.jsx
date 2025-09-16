import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { FaClock, FaTag, FaUser, FaArrowRight } from 'react-icons/fa';
import { trackEvent } from '../utils/analytics';
import OptimizedImage from './OptimizedImage';

const BlogCard = ({ post, index = 0, featured = false }) => {
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

  const cardClasses = featured
    ? 'group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-teal-200 dark:border-teal-700'
    : 'group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden';

  return (
    <motion.article
      className={cardClasses}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5 }}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        {featured && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
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
          <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs font-medium">
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
              className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full hover:bg-teal-100 dark:hover:bg-teal-900 transition-colors"
            >
              <FaTag className="w-2 h-2" />
              {tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="text-xs text-gray-500">+{post.tags.length - 3} more</span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
          <Link to={`/blog/${post.slug}`} onClick={handleReadMoreClick}>
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
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
          className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 font-medium transition-colors group/btn"
        >
          <span>Read More</span>
          <FaArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.article>
  );
};

export default BlogCard;
