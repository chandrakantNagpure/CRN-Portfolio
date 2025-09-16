import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaUser, FaSpinner } from 'react-icons/fa';
import { useTech } from './TechContext';

// Chatbot conversation flow configuration
const chatFlow = {
  welcome: {
    message:
      "👋 Hi there! I'm Chandrakant's AI assistant. I'm here to help you explore my services and potentially work together. What brings you here today?",
    options: [
      { text: 'I need a website built', next: 'website_type', value: 'website' },
      { text: 'I want to redesign my site', next: 'redesign_details', value: 'redesign' },
      { text: 'I need ongoing support', next: 'support_type', value: 'support' },
      { text: 'Just exploring', next: 'exploration', value: 'explore' },
    ],
    collectLead: false,
  },

  website_type: {
    message: 'Great choice! What type of website are you looking to build?',
    options: [
      { text: 'Business/Corporate', next: 'business_details', value: 'business' },
      { text: 'E-commerce Store', next: 'ecommerce_details', value: 'ecommerce' },
      { text: 'Portfolio/Personal', next: 'portfolio_details', value: 'portfolio' },
      { text: 'Blog/Content Site', next: 'blog_details', value: 'blog' },
    ],
    collectLead: false,
  },

  business_details: {
    message:
      "Perfect! Business websites are my specialty. What's most important for your business site?",
    options: [
      { text: 'Professional appearance', next: 'tech_preferences', value: 'professional' },
      { text: 'Lead generation', next: 'lead_focus', value: 'leads' },
      { text: 'SEO & visibility', next: 'seo_focus', value: 'seo' },
      { text: 'All of the above', next: 'comprehensive', value: 'comprehensive' },
    ],
    collectLead: false,
  },

  ecommerce_details: {
    message:
      "E-commerce is exciting! I've built several successful online stores. What will you be selling?",
    options: [
      { text: 'Physical products', next: 'physical_products', value: 'physical' },
      { text: 'Digital products', next: 'digital_products', value: 'digital' },
      { text: 'Services', next: 'service_products', value: 'services' },
      { text: 'Mix of everything', next: 'mixed_products', value: 'mixed' },
    ],
    collectLead: false,
  },

  redesign_details: {
    message:
      "Smart move! A fresh design can work wonders. What's the main issue with your current site?",
    options: [
      { text: 'Looks outdated', next: 'modern_design', value: 'outdated' },
      { text: 'Poor performance', next: 'performance_focus', value: 'performance' },
      { text: 'Not mobile-friendly', next: 'mobile_focus', value: 'mobile' },
      { text: 'Low conversion rates', next: 'conversion_focus', value: 'conversion' },
    ],
    collectLead: false,
  },

  support_type: {
    message: 'I offer comprehensive support services! What kind of ongoing help do you need?',
    options: [
      { text: 'Regular updates & maintenance', next: 'maintenance_details', value: 'maintenance' },
      { text: 'Content management', next: 'content_details', value: 'content' },
      { text: 'Performance optimization', next: 'performance_details', value: 'performance' },
      { text: 'Security monitoring', next: 'security_details', value: 'security' },
    ],
    collectLead: false,
  },

  exploration: {
    message:
      "Welcome! I'd love to show you what I can do. I specialize in React, WordPress, and modern web development. What interests you most?",
    options: [
      { text: 'See my portfolio', next: 'portfolio_showcase', value: 'portfolio' },
      { text: 'Learn about my skills', next: 'skills_showcase', value: 'skills' },
      { text: 'Check my experience', next: 'experience_showcase', value: 'experience' },
      { text: 'Discuss a potential project', next: 'project_discussion', value: 'project' },
    ],
    collectLead: false,
  },

  // Lead collection flows
  tech_preferences: {
    message:
      "Excellent! I can create a stunning professional site that drives results. I'd love to discuss this further with you. May I get your contact details?",
    collectLead: true,
    leadContext: 'business_professional',
  },

  lead_focus: {
    message:
      "Lead generation is my forte! I've helped businesses increase their leads by 200%+ with optimized websites. Let's chat about your specific goals!",
    collectLead: true,
    leadContext: 'business_leads',
  },

  seo_focus: {
    message:
      "SEO is crucial! I build SEO-optimized sites that rank well and attract organic traffic. I'd be happy to discuss your SEO strategy!",
    collectLead: true,
    leadContext: 'business_seo',
  },

  comprehensive: {
    message:
      "Perfect! A comprehensive approach is exactly what successful businesses need. I'd love to create a proposal tailored to your needs!",
    collectLead: true,
    leadContext: 'business_comprehensive',
  },

  physical_products: {
    message:
      "Great! I've built e-commerce sites that handle inventory, shipping, and payments seamlessly. Let's discuss your product catalog and requirements!",
    collectLead: true,
    leadContext: 'ecommerce_physical',
  },

  digital_products: {
    message:
      'Digital products are fantastic for scaling! I can build you a platform for secure downloads, licensing, and customer management. Interested in learning more?',
    collectLead: true,
    leadContext: 'ecommerce_digital',
  },

  service_products: {
    message:
      "Service-based e-commerce is my specialty! Booking systems, service catalogs, and customer management - I've got you covered. Let's talk!",
    collectLead: true,
    leadContext: 'ecommerce_services',
  },

  mixed_products: {
    message:
      'A comprehensive e-commerce solution! I love complex projects that showcase different product types. This sounds like an exciting challenge!',
    collectLead: true,
    leadContext: 'ecommerce_mixed',
  },

  modern_design: {
    message:
      "I specialize in modern, conversion-focused designs that look amazing and perform even better. Let's give your site the makeover it deserves!",
    collectLead: true,
    leadContext: 'redesign_modern',
  },

  performance_focus: {
    message:
      'Performance optimization is crucial! I can make your site lightning-fast, improving user experience and search rankings. Ready to accelerate?',
    collectLead: true,
    leadContext: 'redesign_performance',
  },

  mobile_focus: {
    message:
      "Mobile-first design is essential today! I'll make sure your site looks perfect on all devices and converts mobile visitors into customers.",
    collectLead: true,
    leadContext: 'redesign_mobile',
  },

  conversion_focus: {
    message:
      "Conversion optimization is my superpower! I've helped clients increase their conversion rates by 150%+. Let's boost your results!",
    collectLead: true,
    leadContext: 'redesign_conversion',
  },

  // Missing conversation flows
  portfolio_details: {
    message:
      "Personal portfolios are a great way to showcase your work! I can create something that really makes you stand out. What's your main goal?",
    options: [
      {
        text: 'Show my work professionally',
        next: 'portfolio_professional',
        value: 'professional',
      },
      { text: 'Get more clients/jobs', next: 'portfolio_business', value: 'business' },
      { text: 'Personal branding', next: 'portfolio_branding', value: 'branding' },
      { text: 'All of the above', next: 'portfolio_comprehensive', value: 'comprehensive' },
    ],
    collectLead: false,
  },

  blog_details: {
    message:
      'Blogs are powerful for building authority and audience! What type of content will you be sharing?',
    options: [
      { text: 'Business/Industry insights', next: 'blog_business', value: 'business' },
      { text: 'Personal stories/lifestyle', next: 'blog_personal', value: 'personal' },
      { text: 'Tutorial/Educational content', next: 'blog_educational', value: 'educational' },
      { text: 'Mixed content', next: 'blog_mixed', value: 'mixed' },
    ],
    collectLead: false,
  },

  portfolio_professional: {
    message:
      "Perfect! I'll create a portfolio that showcases your work in the most professional way possible. Let's discuss your vision!",
    collectLead: true,
    leadContext: 'portfolio_professional',
  },

  portfolio_business: {
    message:
      "Great strategy! A well-designed portfolio can significantly increase your opportunities. I'd love to help you create something that converts!",
    collectLead: true,
    leadContext: 'portfolio_business',
  },

  blog_business: {
    message:
      "Excellent choice! Business blogs are fantastic for establishing thought leadership. Let's create something that positions you as an expert!",
    collectLead: true,
    leadContext: 'blog_business',
  },

  maintenance_details: {
    message:
      "Smart thinking! Regular maintenance keeps your site secure and performing well. I offer comprehensive maintenance packages. Let's discuss your needs!",
    collectLead: true,
    leadContext: 'maintenance_support',
  },

  portfolio_showcase: {
    message:
      "I'd love to show you my work! You can check out my portfolio page to see my recent projects. Would you like me to open it for you?",
    options: [
      { text: 'Yes, show me your portfolio', next: 'portfolio_redirect', value: 'portfolio' },
      { text: 'Tell me about a specific project', next: 'specific_project', value: 'specific' },
      { text: "I'm interested in working together", next: 'work_together', value: 'work' },
    ],
    collectLead: false,
  },

  work_together: {
    message:
      "That's wonderful! I'd love to work with you. Let me get your contact details so we can discuss your project in detail.",
    collectLead: true,
    leadContext: 'direct_interest',
  },
};

const ChatBot = () => {
  const { techColors, selectedTech, bgColor } = useTech();
  const [isOpen, setIsOpen] = useState(false);
  const [currentFlow, setCurrentFlow] = useState('welcome');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData] = useState({ name: '', email: '', company: '', phone: '' });
  const [conversationData, setConversationData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasEngaged, setHasEngaged] = useState(false);

  const messagesEndRef = useRef(null);
  const chatbotRef = useRef(null);
  const primaryColor = techColors[selectedTech] || '#4B5563';

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial welcome message with options
      setTimeout(() => {
        addMessage(chatFlow.welcome.message, 'bot', chatFlow.welcome.options);
      }, 500);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-show chatbot after some time if user hasn't engaged
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasEngaged && !isOpen) {
        // Show a subtle notification or pulse
        const chatButton = document.querySelector('.chatbot-trigger');
        if (chatButton) {
          chatButton.style.animation = 'pulse 2s infinite';
        }
      }
    }, 10000); // Show after 10 seconds

    return () => clearTimeout(timer);
  }, [hasEngaged, isOpen]);

  // Click outside to close chatbot
  useEffect(() => {
    const handleClickOutside = event => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (text, sender, options = null) => {
    setMessages(prev => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        text,
        sender,
        options,
        timestamp: new Date(),
      },
    ]);
  };

  const handleOptionClick = option => {
    console.log('🤖 ChatBot Interaction:', {
      currentFlow,
      selectedOption: option,
      timestamp: new Date().toISOString(),
    });

    setHasEngaged(true);

    // Add user's choice to messages
    addMessage(option.text, 'user');

    // Store conversation data
    setConversationData(prev => ({
      ...prev,
      [currentFlow]: option.value,
    }));

    // Show typing indicator
    setIsTyping(true);

    // Simulate bot thinking and respond
    setTimeout(
      () => {
        setIsTyping(false);

        const nextFlow = chatFlow[option.next];
        if (nextFlow) {
          if (nextFlow.collectLead) {
            addMessage(nextFlow.message, 'bot');
            setShowLeadForm(true);
            setConversationData(prev => ({ ...prev, leadContext: nextFlow.leadContext }));
          } else {
            addMessage(nextFlow.message, 'bot', nextFlow.options);
            setCurrentFlow(option.next);
          }
        }
      },
      1000 + Math.random() * 1000
    ); // Random delay for natural feel
  };

  const handleLeadFormChange = e => {
    const { name, value } = e.target;
    setLeadData(prev => ({ ...prev, [name]: value }));
  };

  const handleLeadSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call to store lead
      const leadPayload = {
        ...leadData,
        conversationData,
        source: 'chatbot',
        timestamp: new Date().toISOString(),
        leadContext: conversationData.leadContext,
      };

      // In a real app, send to your backend/CRM
      console.log('🎉 LEAD CAPTURED via ChatBot:', leadPayload);
      console.log('📧 Email sent to: nagpure.cr@gmail.com');

      // Also log to help you track leads
      console.log('💼 Lead Summary:', {
        name: leadData.name,
        email: leadData.email,
        company: leadData.company,
        phone: leadData.phone,
        interest: conversationData.leadContext,
        conversationPath: conversationData,
      });

      // Send email using FormSubmit
      const formData = new FormData();
      formData.append('name', leadData.name);
      formData.append('email', leadData.email);
      formData.append('company', leadData.company || 'Not provided');
      formData.append('phone', leadData.phone || 'Not provided');
      formData.append('subject', '🤖 New Chatbot Lead - High Interest!');
      formData.append(
        'message',
        `
New lead captured via AI chatbot!

Contact Details:
- Name: ${leadData.name}
- Email: ${leadData.email}
- Company: ${leadData.company || 'Not provided'}
- Phone: ${leadData.phone || 'Not provided'}

Conversation Context: ${conversationData.leadContext}

Conversation Flow:
${JSON.stringify(conversationData, null, 2)}

This lead showed high engagement and is ready to discuss their project!
      `
      );
      formData.append('_captcha', 'false');
      formData.append(
        '_autoresponse',
        'Thanks for your interest! Chandrakant will get back to you within 24 hours.'
      );

      await fetch('https://formsubmit.co/nagpure.cr@gmail.com', {
        method: 'POST',
        body: formData,
      });

      // Success message
      setShowLeadForm(false);
      addMessage(
        `Thank you, ${leadData.name}! 🎉 I'll personally reach out within 24 hours to discuss your project. In the meantime, feel free to explore my portfolio or check out my services page!`,
        'bot',
        [
          { text: 'View Portfolio', next: 'portfolio_redirect', value: 'portfolio' },
          { text: 'See Services', next: 'services_redirect', value: 'services' },
          { text: 'Start Over', next: 'restart', value: 'restart' },
        ]
      );
    } catch (error) {
      console.error('Failed to submit lead:', error);
      addMessage(
        'Oops! Something went wrong. Please try contacting me directly at nagpure.cr@gmail.com or use the contact form on my website.',
        'bot'
      );
    }

    setIsSubmitting(false);
  };

  const handleSpecialActions = option => {
    switch (option.value) {
      case 'portfolio':
        window.open('/projects', '_blank');
        break;
      case 'services':
        window.open('/services', '_blank');
        break;
      case 'restart':
        console.log('🔄 ChatBot conversation restarted');
        setMessages([]);
        setCurrentFlow('welcome');
        setConversationData({});
        setShowLeadForm(false);
        setLeadData({ name: '', email: '', company: '', phone: '' });
        setIsTyping(false);
        setTimeout(
          () => addMessage(chatFlow.welcome.message, 'bot', chatFlow.welcome.options),
          500
        );
        break;
    }
  };

  return (
    <div ref={chatbotRef}>
      {/* Chat Trigger Button */}
      <motion.button
        className="chatbot-trigger fixed bottom-4 left-4 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white z-40 md:bottom-4 md:left-4"
        style={{
          backgroundColor: primaryColor,
          animation: !hasEngaged && !isOpen ? 'pulse 2s infinite' : 'none',
        }}
        onClick={() => {
          setIsOpen(!isOpen);
          setHasEngaged(true);
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={isOpen ? { rotate: 0 } : { rotate: 0 }}
      >
        {isOpen ? <FaTimes size={20} /> : <FaRobot size={20} />}

        {!hasEngaged && !isOpen && (
          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-white text-xs font-bold">!</span>
          </motion.div>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 left-4 w-80 max-w-[calc(100vw-2rem)] h-96 max-h-[calc(100vh-6rem)] bg-white rounded-lg shadow-2xl z-50 flex flex-col md:w-80 md:h-96"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Chat Header */}
            <div
              className="p-4 rounded-t-lg text-white flex items-center justify-between"
              style={{ backgroundColor: primaryColor }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <FaRobot size={16} />
                </div>
                <div>
                  <h3 className="font-semibold">Chandrakant's AI</h3>
                  <p className="text-xs opacity-90">Usually replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
              >
                <FaTimes size={14} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex items-start gap-2 max-w-[80%]">
                    {message.sender === 'bot' && (
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                        style={{ backgroundColor: primaryColor }}
                      >
                        <FaRobot size={12} className="text-white" />
                      </div>
                    )}

                    <div className="space-y-2">
                      <div
                        className={`p-3 rounded-lg text-sm ${
                          message.sender === 'user'
                            ? 'bg-gray-100 text-gray-800 ml-auto'
                            : 'bg-blue-50 text-gray-800'
                        }`}
                      >
                        {message.text}
                      </div>

                      {/* Options */}
                      {message.options && (
                        <div className="space-y-2">
                          {message.options.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                if (['portfolio', 'services', 'restart'].includes(option.value)) {
                                  handleSpecialActions(option);
                                } else {
                                  handleOptionClick(option);
                                }
                              }}
                              className="w-full text-left p-2 text-xs border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                              style={{ borderColor: primaryColor + '40' }}
                            >
                              {option.text}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {message.sender === 'user' && (
                      <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <FaUser size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <FaRobot size={12} className="text-white" />
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <FaSpinner className="animate-spin text-gray-500" size={14} />
                    </div>
                  </div>
                </div>
              )}

              {/* Lead Form */}
              {showLeadForm && (
                <motion.div
                  className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h4 className="font-semibold text-sm mb-3 text-gray-800">Let's connect! 🚀</h4>
                  <form onSubmit={handleLeadSubmit} className="space-y-3">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name *"
                      value={leadData.name}
                      onChange={handleLeadFormChange}
                      required
                      className="w-full p-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email *"
                      value={leadData.email}
                      onChange={handleLeadFormChange}
                      required
                      className="w-full p-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="company"
                      placeholder="Company (optional)"
                      value={leadData.company}
                      onChange={handleLeadFormChange}
                      className="w-full p-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone (optional)"
                      value={leadData.phone}
                      onChange={handleLeadFormChange}
                      className="w-full p-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-2 text-xs text-white rounded font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {isSubmitting ? (
                        <FaSpinner className="animate-spin" size={12} />
                      ) : (
                        <FaPaperPlane size={12} />
                      )}
                      {isSubmitting ? 'Connecting...' : 'Start Conversation'}
                    </button>
                  </form>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat Footer */}
            <div className="p-3 border-t border-gray-200">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <FaRobot size={12} />
                <span>Powered by AI • Always here to help</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;
