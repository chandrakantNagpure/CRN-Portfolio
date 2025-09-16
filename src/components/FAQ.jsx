import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaPlus,
  FaMinus,
  FaClock,
  FaDollarSign,
  FaCode,
  FaRocket,
  FaShield,
  FaComments,
} from 'react-icons/fa';
import { useTech } from './TechContext';
import { useLanguage } from '../contexts/LanguageContext';
import { getContrastTextColor } from '../utils/colors';

const faqData = [
  {
    id: 1,
    category: 'General',
    icon: FaComments,
    question: 'What services do you offer?',
    answer:
      'I specialize in React development, WordPress development, responsive web design, and full-stack solutions. I offer everything from simple landing pages to complex web applications with custom integrations, e-commerce functionality, and SEO optimization.',
  },
  {
    id: 2,
    category: 'Pricing',
    icon: FaDollarSign,
    question: 'How do you structure your pricing?',
    answer:
      'I offer both project-based pricing and hourly rates depending on the project scope. My packages start at $1,500 for basic websites and go up to $7,500+ for enterprise solutions. I provide detailed quotes after understanding your specific requirements. All pricing includes initial consultation, development, testing, and post-launch support.',
  },
  {
    id: 3,
    category: 'Timeline',
    icon: FaClock,
    question: 'How long does a typical project take?',
    answer:
      'Project timelines vary based on complexity. Simple websites take 1-2 weeks, WordPress sites take 2-3 weeks, and complex React applications take 4-6 weeks. I always provide realistic timelines upfront and keep you updated throughout the development process. Rush projects can be accommodated with adjusted pricing.',
  },
  {
    id: 4,
    category: 'Process',
    icon: FaRocket,
    question: "What's your development process?",
    answer:
      'My process includes: 1) Initial consultation and requirement gathering, 2) Project planning and timeline creation, 3) Design mockups and approval, 4) Development with regular updates, 5) Testing and quality assurance, 6) Client review and revisions, 7) Launch and deployment, 8) Post-launch support and training.',
  },
  {
    id: 5,
    category: 'Technical',
    icon: FaCode,
    question: 'What technologies do you use?',
    answer:
      'I work with modern technologies including React, Next.js, WordPress, PHP, JavaScript (ES6+), Tailwind CSS, Node.js, and various databases. I choose the best technology stack based on your project requirements, budget, and long-term goals. All code follows industry best practices.',
  },
  {
    id: 6,
    category: 'Support',
    icon: FaShield,
    question: 'Do you provide ongoing support and maintenance?',
    answer:
      "Yes! All projects include free support ranging from 1-6 months depending on the package. After that, I offer maintenance plans starting at $200/month which includes updates, security monitoring, backups, performance optimization, and priority support. I'm always available for additional features or modifications.",
  },
  {
    id: 7,
    category: 'General',
    icon: FaComments,
    question: 'Do you work with international clients?',
    answer:
      "Absolutely! I work with clients worldwide and am experienced in different time zones. I provide regular updates via email, Slack, or video calls based on your preference. All communication is in English, and I'm flexible with meeting times to accommodate different time zones.",
  },
  {
    id: 8,
    category: 'Process',
    icon: FaRocket,
    question: 'What do you need from me to get started?',
    answer:
      "To get started, I need: 1) Clear project requirements and goals, 2) Any existing branding materials (logos, colors, fonts), 3) Content (text, images, videos), 4) Reference websites or design inspiration, 5) Access to necessary accounts (hosting, domain, etc.). I'll guide you through everything step by step.",
  },
  {
    id: 9,
    category: 'Technical',
    icon: FaCode,
    question: 'Will my website be mobile-friendly and SEO optimized?',
    answer:
      "Yes, absolutely! All websites I create are fully responsive and mobile-optimized. I follow Google's mobile-first indexing guidelines and implement comprehensive SEO including meta tags, structured data, fast loading speeds, and clean code. I also provide SEO audits and recommendations for better search rankings.",
  },
  {
    id: 10,
    category: 'Pricing',
    icon: FaDollarSign,
    question: "What's your payment structure?",
    answer:
      'I typically work with a 50% upfront payment to start the project and 50% upon completion. For larger projects, I can break payments into milestones. I accept payments via PayPal, bank transfer, or other secure methods. All payments are secured with detailed contracts and invoices.',
  },
  {
    id: 11,
    category: 'Process',
    icon: FaRocket,
    question: 'Can you help with website hosting and domain setup?',
    answer:
      'Yes! I can help you choose the right hosting provider, set up your domain, configure DNS, SSL certificates, and handle the complete deployment process. I work with reliable hosting providers and can recommend the best solution based on your needs and budget.',
  },
  {
    id: 12,
    category: 'Support',
    icon: FaShield,
    question: 'What if I need changes after the project is completed?',
    answer:
      'Minor tweaks and bug fixes are included in the support period. For additional features or major changes, I provide detailed quotes. I maintain long-term relationships with clients and offer discounted rates for ongoing work. All changes are handled professionally with clear communication about scope and costs.',
  },
];

const categories = ['All', 'General', 'Pricing', 'Timeline', 'Process', 'Technical', 'Support'];

function FAQ() {
  const { t } = useLanguage();
  const { bgColor, techColors, selectedTech } = useTech();
  const [openFAQ, setOpenFAQ] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const textColor = getContrastTextColor(bgColor);
  const primaryColor = techColors[selectedTech] || '#4B5563';

  const filteredFAQs =
    selectedCategory === 'All' ? faqData : faqData.filter(faq => faq.category === selectedCategory);

  const toggleFAQ = id => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section
      id="faq"
      className="py-20 px-6 md:px-16 relative overflow-hidden"
      style={{
        background: bgColor
          ? `linear-gradient(135deg, ${bgColor}08, ${bgColor}03)`
          : 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
        color: textColor,
      }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-orbitron font-bold mb-6"
            style={{ color: textColor }}
          >
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-80">
            Everything you need to know about working with me
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800 bg-white/20'
              }`}
              style={{
                backgroundColor: selectedCategory === category ? primaryColor : undefined,
              }}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-4"
        >
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-all duration-300"
                style={{
                  backgroundColor: openFAQ === faq.id ? primaryColor + '10' : 'transparent',
                }}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: primaryColor + '20' }}
                  >
                    <faq.icon size={18} style={{ color: primaryColor }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1" style={{ color: textColor }}>
                      {faq.question}
                    </h3>
                    <span
                      className="text-xs px-2 py-1 rounded-full font-medium"
                      style={{
                        backgroundColor: primaryColor + '20',
                        color: primaryColor,
                      }}
                    >
                      {faq.category}
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0 ml-4">
                  {openFAQ === faq.id ? (
                    <FaMinus size={20} style={{ color: primaryColor }} />
                  ) : (
                    <FaPlus size={20} style={{ color: primaryColor }} />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {openFAQ === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pl-20">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-700/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4" style={{ color: textColor }}>
              Still Have Questions?
            </h3>
            <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
              Don't see your question here? I'm always happy to discuss your project in detail and
              answer any specific questions you might have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#contact"
                className="px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{ backgroundColor: primaryColor }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ask Your Question
              </motion.a>
              <motion.a
                href="https://calendly.com/chandrakantnagpure"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full font-semibold border-2 transition-all duration-300"
                style={{
                  borderColor: primaryColor,
                  color: primaryColor,
                  backgroundColor: 'transparent',
                }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: primaryColor + '10',
                }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule a Call
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default FAQ;
