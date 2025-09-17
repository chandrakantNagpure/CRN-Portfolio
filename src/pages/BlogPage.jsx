import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';
import { useTech } from '../components/TechContext';
import { useLanguage } from '../contexts/LanguageContext';
import { trackEvent } from '../utils/analytics';
import SEO from '../components/SEO';
import BlogCard from '../components/BlogCard';
import Footer from '../components/Footer';
import ParticleCanvas from '../components/ParticleCanvas';
import {
  blogPosts,
  getFeaturedPosts,
  getPostsByCategory,
  getPostsByTag,
  getAllTags,
} from '../data/blogPosts';
import { getContrastTextColor } from '../utils/colors';

const BlogPage = () => {
  const { t } = useLanguage();
  const { bgColor, selectedTech, techColors } = useTech();
  const [posts, setPosts] = useState(blogPosts.filter(post => post.published));
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Force dark text for better readability on glass-morphism backgrounds
  const textColor = '#1F2937'; // Dark gray text for better contrast
  const accentColor = techColors[selectedTech] || '#14B8A6';

  // Get unique categories
  const categories = ['all', ...new Set(posts.map(post => post.category))];
  const tags = ['all', ...getAllTags()];

  // Filter posts based on search and filters
  useEffect(() => {
    let filtered = posts;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        post =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = getPostsByCategory(selectedCategory);
    }

    // Tag filter
    if (selectedTag !== 'all') {
      filtered = getPostsByTag(selectedTag);
    }

    // Apply both search and category/tag filters
    if (searchTerm && (selectedCategory !== 'all' || selectedTag !== 'all')) {
      filtered = filtered.filter(
        post =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory, selectedTag, posts]);

  const handleSearch = e => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term) {
      trackEvent('blog_search', {
        category: 'Blog',
        label: term,
        search_term: term,
      });
    }
  };

  const handleCategoryFilter = category => {
    setSelectedCategory(category);
    setSelectedTag('all'); // Reset tag when category is selected

    trackEvent('blog_filter', {
      category: 'Blog',
      label: `category_${category}`,
      filter_type: 'category',
      filter_value: category,
    });
  };

  const handleTagFilter = tag => {
    setSelectedTag(tag);
    setSelectedCategory('all'); // Reset category when tag is selected

    trackEvent('blog_filter', {
      category: 'Blog',
      label: `tag_${tag}`,
      filter_type: 'tag',
      filter_value: tag,
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedTag('all');

    trackEvent('blog_clear_filters', {
      category: 'Blog',
      label: 'clear_all_filters',
    });
  };

  const featuredPosts = getFeaturedPosts();

  return (
    <>
      <SEO
        title="Blog | Latest Articles & Tutorials"
        description="Read the latest articles and tutorials about web development, React, JavaScript, and more. Learn from practical examples and best practices."
        canonical="/blog"
        keywords={[
          'Blog',
          'Web Development',
          'React',
          'JavaScript',
          'Tutorials',
          'Frontend Development',
        ]}
      />

      <div
        className="min-h-screen font-poppins overflow-x-hidden"
        style={{
          background: bgColor
            ? `linear-gradient(to right, ${bgColor}33, ${bgColor})`
            : 'linear-gradient(to right, #ffffff33, #ffffff)',
          color: textColor,
        }}
      >
        <ParticleCanvas bgColor={bgColor || '#4B5563'} />
        {/* Hero Section */}
        <section className="pt-24 pb-12 px-4 md:px-6 lg:px-16 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1
                className="text-4xl md:text-6xl font-orbitron font-extrabold mb-6"
                style={{ color: textColor }}
              >
                Blog & Articles
              </h1>
              <p
                className="text-lg md:text-xl mb-8 max-w-3xl mx-auto"
                style={{ color: textColor, opacity: 0.8 }}
              >
                Insights, tutorials, and thoughts on modern web development
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="pb-12 px-4 md:px-6 lg:px-16 relative z-10">
          <div className="max-w-6xl mx-auto w-full">
            <motion.div
              className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 mb-8"
              style={{ border: `1px solid ${accentColor}33` }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <FaSearch 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2" 
                    style={{ color: accentColor, opacity: 0.6 }}
                  />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white bg-opacity-50 backdrop-blur-sm focus:outline-none focus:ring-2 transition-all placeholder-gray-500"
                    style={{ 
                      border: `1px solid ${accentColor}33`,
                      color: textColor,
                      boxShadow: `0 0 0 2px ${accentColor}33`
                    }}
                  />
                </div>

                {/* Filter Toggle Button (Mobile) */}
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="lg:hidden flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-300"
                  style={{ backgroundColor: accentColor, color: '#ffffff' }}
                >
                  <FaFilter />
                  <span>Filters</span>
                </button>
              </div>

              {/* Filters */}
              <div className={`mt-4 ${isFilterOpen ? 'block' : 'hidden'} lg:block`}>
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Category Filter */}
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-2" style={{ color: textColor }}>
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={e => handleCategoryFilter(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white bg-opacity-50 backdrop-blur-sm focus:outline-none focus:ring-2 transition-all"
                      style={{ 
                        border: `1px solid ${accentColor}33`,
                        color: textColor,
                        boxShadow: `0 0 0 2px ${accentColor}33`
                      }}
                    >
                      {categories.map(category => (
                        <option key={category} value={category} className="bg-gray-800 text-white">
                          {category === 'all' ? 'All Categories' : category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Tag Filter */}
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-2" style={{ color: textColor }}>
                      Tag
                    </label>
                    <select
                      value={selectedTag}
                      onChange={e => handleTagFilter(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white bg-opacity-50 backdrop-blur-sm focus:outline-none focus:ring-2 transition-all"
                      style={{ 
                        border: `1px solid ${accentColor}33`,
                        color: textColor,
                        boxShadow: `0 0 0 2px ${accentColor}33`
                      }}
                    >
                      {tags.map(tag => (
                        <option key={tag} value={tag} className="bg-gray-800 text-white">
                          {tag === 'all' ? 'All Tags' : tag}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Clear Filters */}
                  {(searchTerm || selectedCategory !== 'all' || selectedTag !== 'all') && (
                    <div className="flex items-end">
                      <button
                        onClick={clearFilters}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 transition-all"
                        style={{ color: '#EF4444', border: `1px solid #EF444433` }}
                      >
                        <FaTimes />
                        <span>Clear</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Results Count */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p style={{ color: textColor, opacity: 0.7 }}>
                {filteredPosts.length === 0
                  ? 'No articles found'
                  : `${filteredPosts.length} article${filteredPosts.length === 1 ? '' : 's'} found`}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 &&
          selectedCategory === 'all' &&
          selectedTag === 'all' &&
          !searchTerm && (
            <section className="pb-12 px-4 md:px-6 lg:px-16 relative z-10">
              <div className="max-w-6xl mx-auto w-full">
                <motion.h2
                  className="text-3xl font-orbitron font-bold mb-8"
                  style={{ color: accentColor }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Featured Articles
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredPosts.map((post, index) => (
                    <BlogCard key={post.id} post={post} index={index} featured={true} />
                  ))}
                </div>
              </div>
            </section>
          )}

        {/* All Posts */}
        <section className="pb-20 px-4 md:px-6 lg:px-16 relative z-10">
          <div className="max-w-6xl mx-auto w-full">
            {filteredPosts.length > 0 ? (
              <>
                <motion.h2
                  className="text-3xl font-orbitron font-bold mb-8"
                  style={{ color: textColor }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  {searchTerm
                    ? `Search Results for "${searchTerm}"`
                    : selectedCategory !== 'all'
                      ? `${selectedCategory} Articles`
                      : selectedTag !== 'all'
                        ? `Articles tagged with "${selectedTag}"`
                        : 'All Articles'}
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts.map((post, index) => (
                    <BlogCard key={post.id} post={post} index={index} featured={false} />
                  ))}
                </div>
              </>
            ) : (
              <motion.div
                className="text-center py-16 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl"
                style={{ border: `1px solid ${accentColor}33` }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-2xl font-orbitron font-bold mb-4" style={{ color: textColor }}>
                  No Articles Found
                </h3>
                <p className="mb-8" style={{ color: textColor, opacity: 0.7 }}>
                  Try adjusting your search terms or filters
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
                  style={{
                    backgroundColor: accentColor,
                    color: '#ffffff',
                    boxShadow: `0 4px 20px ${accentColor}33`
                  }}
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </div>
        </section>

      </div>

      <Footer />
    </>
  );
};

export default BlogPage;
