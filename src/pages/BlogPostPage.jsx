import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import {
  FaClock,
  FaUser,
  FaTag,
  FaShare,
  FaTwitter,
  FaLinkedin,
  FaFacebook,
  FaArrowLeft,
  FaArrowRight,
  FaLink,
} from 'react-icons/fa';
import { useTech } from '../components/TechContext';
import { useLanguage } from '../contexts/LanguageContext';
import { trackEvent } from '../utils/analytics';
import SEO from '../components/SEO';
import BlogCard from '../components/BlogCard';
import BackToTopButton from '../components/BackToTopButton';
import Footer from '../components/Footer';
import ParticleCanvas from '../components/ParticleCanvas';
import { getPostBySlug, getRelatedPosts } from '../data/blogPosts';
import { renderMarkdown, generateTableOfContents } from '../utils/markdown';
import { getContrastTextColor } from '../utils/colors';

const BlogPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { bgColor, selectedTech, techColors } = useTech();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [tableOfContents, setTableOfContents] = useState([]);
  const [activeSection, setActiveSection] = useState('');
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  const textColor = getContrastTextColor(bgColor);
  const accentColor = techColors[selectedTech] || '#14B8A6';

  useEffect(() => {
    const foundPost = getPostBySlug(slug);
    if (foundPost) {
      setPost(foundPost);
      setRelatedPosts(getRelatedPosts(foundPost));
      setTableOfContents(generateTableOfContents(foundPost.content));

      // Track blog post view
      trackEvent('blog_post_view', {
        category: 'Blog',
        label: foundPost.slug,
        blog_title: foundPost.title,
        blog_category: foundPost.category,
      });
    } else {
      navigate('/blog');
    }
  }, [slug, navigate]);

  // Reading progress calculation
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('article-content');
      if (element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const totalHeight = rect.height;
        const scrolled = windowHeight - rect.top;
        const progress = Math.min(Math.max(scrolled / totalHeight, 0), 1) * 100;
        setReadingProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section tracking for table of contents
  useEffect(() => {
    const handleScroll = () => {
      const sections = tableOfContents
        .map(item => document.getElementById(item.slug))
        .filter(Boolean);

      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollPosition >= sections[i].offsetTop) {
          setActiveSection(tableOfContents[i]?.slug || '');
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tableOfContents]);

  const handleShare = platform => {
    const url = window.location.href;
    const title = post?.title || '';

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard!');
      });
    } else {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }

    trackEvent('blog_share', {
      category: 'Blog',
      label: platform,
      blog_slug: post?.slug,
      share_platform: platform,
    });

    setIsShareMenuOpen(false);
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">📝</div>
          <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
          <Link to="/blog" className="text-teal-500 hover:text-teal-600 underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${post.seo?.title || post.title} | Blog`}
        description={post.seo?.description || post.excerpt}
        canonical={`/blog/${post.slug}`}
        keywords={post.seo?.keywords || post.tags}
        article={{
          publishedTime: post.date,
          modifiedTime: post.date,
          author: post.author,
          section: post.category,
          tags: post.tags,
        }}
        image={post.image}
      />

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <motion.div
          className="h-full"
          style={{ width: `${readingProgress}%`, backgroundColor: accentColor }}
          initial={{ width: 0 }}
          animate={{ width: `${readingProgress}%` }}
        />
      </div>

      <div
        className="min-h-screen font-poppins overflow-hidden"
        style={{
          background: bgColor
            ? `linear-gradient(to right, ${bgColor}33, ${bgColor})`
            : 'linear-gradient(to right, #ffffff33, #ffffff)',
          color: textColor,
        }}
      >
        <ParticleCanvas bgColor={bgColor || '#4B5563'} />
        <div className="max-w-6xl mx-auto px-6 md:px-16 pt-24 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Table of Contents - Desktop Sidebar */}
            {tableOfContents.length > 0 && (
              <div className="hidden lg:block lg:w-64 shrink-0">
                <div className="sticky top-32">
                  <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6" style={{ border: `1px solid ${accentColor}33` }}>
                    <h3 className="text-lg font-orbitron font-semibold mb-4" style={{ color: accentColor }}>
                      Table of Contents
                    </h3>
                    <nav className="space-y-2">
                      {tableOfContents.map((item, index) => (
                        <a
                          key={index}
                          href={`#${item.slug}`}
                          className={`block py-2 px-3 text-sm rounded transition-all duration-300 ${
                            activeSection === item.slug
                              ? 'font-medium'
                              : 'hover:bg-white hover:bg-opacity-20'
                          }`}
                          style={{
                            paddingLeft: `${(item.level - 1) * 12 + 12}px`,
                            color: activeSection === item.slug ? accentColor : textColor,
                            opacity: activeSection === item.slug ? 1 : 0.7,
                            backgroundColor: activeSection === item.slug ? `${accentColor}20` : 'transparent'
                          }}
                          onClick={() => {
                            trackEvent('blog_toc_click', {
                              category: 'Blog',
                              label: item.slug,
                              heading_text: item.text,
                            });
                          }}
                        >
                          {item.text}
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
            )}

            {/* Main Content */}
            <div className="flex-1 max-w-4xl">
              {/* Back to Blog */}
              <div className="mb-8">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg hover:bg-opacity-30 transition-all duration-300"
                  style={{ color: accentColor, border: `1px solid ${accentColor}33` }}
                >
                  <FaArrowLeft className="w-4 h-4" />
                  <span>Back to Blog</span>
                </Link>
              </div>

              {/* Article Header */}
              <motion.header
                className="mb-8 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-8"
                style={{ border: `1px solid ${accentColor}33` }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Category Badge */}
                <div className="mb-4">
                  <span 
                    className="inline-block px-3 py-1 text-sm font-medium rounded-full text-white"
                    style={{ backgroundColor: accentColor }}
                  >
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h1
                  className="text-3xl md:text-5xl font-orbitron font-extrabold mb-6 leading-tight"
                  style={{ color: textColor }}
                >
                  {post.title}
                </h1>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 mb-6" style={{ color: textColor, opacity: 0.7 }}>
                  <div className="flex items-center gap-2">
                    <FaUser className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                  <time dateTime={post.date}>{format(new Date(post.date), 'MMMM dd, yyyy')}</time>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full hover:bg-opacity-30 transition-colors cursor-pointer"
                      style={{ backgroundColor: `${accentColor}20`, color: textColor, opacity: 0.8 }}
                    >
                      <FaTag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Share Buttons */}
                <div className="relative">
                  <button
                    onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg text-white"
                    style={{
                      backgroundColor: accentColor,
                      boxShadow: `0 4px 20px ${accentColor}33`
                    }}
                  >
                    <FaShare className="w-4 h-4" />
                    <span>Share</span>
                  </button>

                  {isShareMenuOpen && (
                    <div className="absolute top-full left-0 mt-2 bg-white bg-opacity-90 backdrop-blur-lg rounded-lg shadow-xl p-2 z-10" style={{ border: `1px solid ${accentColor}33` }}>
                      <button
                        onClick={() => handleShare('twitter')}
                        className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-white hover:bg-opacity-50 rounded transition-colors"
                        style={{ color: textColor }}
                      >
                        <FaTwitter className="w-4 h-4 text-blue-400" />
                        <span>Twitter</span>
                      </button>
                      <button
                        onClick={() => handleShare('linkedin')}
                        className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-white hover:bg-opacity-50 rounded transition-colors"
                        style={{ color: textColor }}
                      >
                        <FaLinkedin className="w-4 h-4 text-blue-600" />
                        <span>LinkedIn</span>
                      </button>
                      <button
                        onClick={() => handleShare('facebook')}
                        className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-white hover:bg-opacity-50 rounded transition-colors"
                        style={{ color: textColor }}
                      >
                        <FaFacebook className="w-4 h-4 text-blue-500" />
                        <span>Facebook</span>
                      </button>
                      <button
                        onClick={() => handleShare('copy')}
                        className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-white hover:bg-opacity-50 rounded transition-colors"
                        style={{ color: textColor }}
                      >
                        <FaLink className="w-4 h-4" style={{ color: accentColor }} />
                        <span>Copy Link</span>
                      </button>
                    </div>
                  )}
                </div>
              </motion.header>

              {/* Featured Image */}
              {post.image && (
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-auto rounded-lg shadow-lg"
                    loading="lazy"
                  />
                </motion.div>
              )}

              {/* Article Content */}
              <motion.article
                id="article-content"
                className="prose prose-lg dark:prose-invert max-w-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
              />

              {/* Article Footer */}
              <motion.footer
                className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Written by <strong>{post.author}</strong>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      Published on {format(new Date(post.date), 'MMMM dd, yyyy')}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">Share this article:</span>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <FaTwitter className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <FaLinkedin className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.footer>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-16 pt-16 border-t border-gray-200 dark:border-gray-700">
              <motion.h2
                className="text-3xl font-bold mb-8 text-center"
                style={{ color: accentColor }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Related Articles
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <BlogCard key={relatedPost.id} post={relatedPost} index={index} />
                ))}
              </div>
            </section>
          )}

          {/* Navigation to Next/Previous Posts */}
          <nav className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <FaArrowLeft className="w-4 h-4" />
                <span>All Articles</span>
              </Link>

              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
              >
                <span>More Articles</span>
                <FaArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </nav>
        </div>

        <BackToTopButton textColor={getContrastTextColor(bgColor)} />
      </div>

      <Footer />
    </>
  );
};

export default BlogPostPage;
