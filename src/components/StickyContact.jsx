import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaEnvelope, FaPhoneAlt, FaTimes, FaCommentDots, FaCog, FaRobot, FaUser, FaPaperPlane, FaLightbulb, FaDollarSign, FaClock, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useTech } from './TechContext';
import { techIcons } from '../utils/techIcons';

// Animation variants for better performance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    x: 50,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
  exit: {
    opacity: 0,
    x: 50,
    scale: 0.8,
    transition: {
      duration: 0.2,
    },
  },
};

const buttonVariants = {
  initial: { scale: 0, rotate: -180 },
  animate: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 12,
    },
  },
  exit: {
    scale: 0,
    rotate: 180,
    transition: {
      duration: 0.3,
    },
  },
  hover: {
    scale: 1.1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
  tap: { scale: 0.95 },
};

// Chatbot conversation flow
const chatbotFlow = {
  welcome: {
    id: 'welcome',
    type: 'bot',
    message: "👋 Hi! I'm here to help with your project needs. What brings you here today?",
    options: [
      { id: 'new_project', label: '🚀 Start a new project', next: 'project_type' },
      { id: 'get_quote', label: '💰 Get a quote', next: 'budget_range' },
      { id: 'ask_question', label: '❓ Ask a question', next: 'question_input' },
      { id: 'direct_contact', label: '📞 Contact directly', next: 'contact_options' }
    ]
  },
  project_type: {
    id: 'project_type',
    type: 'bot',
    message: "Great! What type of project are you thinking about?",
    options: [
      { id: 'website', label: '🌐 Website Development', next: 'budget_range' },
      { id: 'webapp', label: '⚡ Web Application', next: 'budget_range' },
      { id: 'ecommerce', label: '🛒 E-commerce Store', next: 'budget_range' },
      { id: 'redesign', label: '🎨 Website Redesign', next: 'budget_range' },
      { id: 'maintenance', label: '🔧 Maintenance & Support', next: 'contact_options' }
    ]
  },
  budget_range: {
    id: 'budget_range',
    type: 'bot',
    message: "Perfect! What's your budget range for this project?",
    options: [
      { id: 'small', label: '💵 $500 - $2,000', next: 'timeline' },
      { id: 'medium', label: '💰 $2,000 - $5,000', next: 'timeline' },
      { id: 'large', label: '💸 $5,000 - $10,000', next: 'timeline' },
      { id: 'enterprise', label: '🏦 $10,000+', next: 'timeline' },
      { id: 'discuss', label: '💬 Let\'s discuss', next: 'contact_options' }
    ]
  },
  timeline: {
    id: 'timeline',
    type: 'bot',
    message: "When would you like to get this completed?",
    options: [
      { id: 'urgent', label: '🔥 ASAP (Rush job)', next: 'contact_urgent' },
      { id: 'month', label: '📅 Within 1 month', next: 'contact_ready' },
      { id: 'quarter', label: '📆 2-3 months', next: 'contact_ready' },
      { id: 'flexible', label: '🕒 No rush', next: 'contact_ready' }
    ]
  },
  question_input: {
    id: 'question_input',
    type: 'input',
    message: "What would you like to know? Type your question and I'll help!",
    placeholder: "e.g., How long does it take to build a website?",
    next: 'question_response'
  },
  question_response: {
    id: 'question_response',
    type: 'bot',
    message: "Thanks for your question! I'd love to give you a detailed answer. Let's connect:",
    options: []
  },
  contact_urgent: {
    id: 'contact_urgent',
    type: 'bot',
    message: "For urgent projects, let's connect immediately! I prioritize quick communication:",
    options: []
  },
  contact_ready: {
    id: 'contact_ready',
    type: 'bot',
    message: "Awesome! Based on your needs, I think we're a great match. Let's discuss your project:",
    options: []
  },
  contact_options: {
    id: 'contact_options',
    type: 'bot',
    message: "Perfect! How would you like to get in touch?",
    options: []
  }
};

function StickyContact() {
  const { techColors, selectedTech, bgColor, updateTech } = useTech();
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [mode, setMode] = useState('chat'); // 'chat', 'contact', 'tech'
  const [currentStep, setCurrentStep] = useState('welcome');
  const [conversation, setConversation] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [_userData, setUserData] = useState({});
  const stickyContactRef = useRef(null);
  const chatContainerRef = useRef(null);
  const primaryColor = bgColor || techColors[selectedTech] || '#4B5563';

  // Chatbot functions
  const addToConversation = (message, type = 'bot', options = []) => {
    const newMessage = {
      id: Date.now(),
      message,
      type,
      options,
      timestamp: new Date()
    };
    setConversation(prev => [...prev, newMessage]);
    
    // Auto-scroll to bottom
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, 100);
  };

  const handleChatOption = (optionId, optionLabel, nextStep) => {
    // Add user response
    addToConversation(optionLabel, 'user');
    
    // Store user data
    setUserData(prev => ({ ...prev, [currentStep]: optionId }));
    
    // Move to next step
    setTimeout(() => {
      if (nextStep && chatbotFlow[nextStep]) {
        setCurrentStep(nextStep);
        const nextStepData = chatbotFlow[nextStep];
        addToConversation(nextStepData.message, 'bot', nextStepData.options);
      } else {
        // Show contact options
        showContactOptions();
      }
    }, 500);
  };

  const handleUserInput = (input) => {
    if (!input.trim()) return;
    
    addToConversation(input, 'user');
    setUserInput('');
    
    // Store user input
    setUserData(prev => ({ ...prev, userQuestion: input }));
    
    setTimeout(() => {
      const responseStep = chatbotFlow[chatbotFlow[currentStep].next];
      if (responseStep) {
        addToConversation(responseStep.message, 'bot');
        showContactOptions();
      }
    }, 500);
  };

  const showContactOptions = () => {
    setTimeout(() => {
      addToConversation(
        "Here are the best ways to reach me:",
        'contact-options'
      );
    }, 300);
  };

  const startChat = () => {
    setMode('chat');
    setConversation([]);
    setCurrentStep('welcome');
    
    setTimeout(() => {
      const welcomeStep = chatbotFlow.welcome;
      addToConversation(welcomeStep.message, 'bot', welcomeStep.options);
    }, 300);
  };

  const resetChat = () => {
    setConversation([]);
    setUserData({});
    setCurrentStep('welcome');
    startChat();
  };

  // Auto-hide tooltip after 3 seconds
  // Auto-hide tooltip after 3 seconds
  useEffect(() => {
    if (showButton && !isOpen) {
      const timer = setTimeout(() => setShowTooltip(true), 1000);
      const hideTimer = setTimeout(() => setShowTooltip(false), 5000);
      return () => {
        clearTimeout(timer);
        clearTimeout(hideTimer);
      };
    }
  }, [showButton, isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldShow = scrollY > 200; // Reduced threshold

      if (shouldShow !== showButton) {
        setShowButton(shouldShow);
        if (!shouldShow) {
          setIsOpen(false); // Close menu when hiding
          setShowTooltip(false);
        }
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showButton]);

  // Click outside to close contact menu
  useEffect(() => {
    const handleClickOutside = event => {
      if (stickyContactRef.current && !stickyContactRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowTooltip(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const contactOptions = [
    {
      icon: FaWhatsapp,
      label: 'WhatsApp',
      action: () =>
        window.open(
          "https://wa.me/919767847979?text=Hi Chandrakant! I found your portfolio and I'm interested in discussing a project.",
          '_blank'
        ),
      color: '#25D366',
      description: 'Quick chat',
    },
    {
      icon: FaEnvelope,
      label: 'Email',
      action: () =>
        window.open(
          'mailto:nagpure.cr@gmail.com?subject=Project Inquiry&body=Hi Chandrakant, I found your portfolio and would like to discuss a project...',
          '_blank'
        ),
      color: '#EA4335',
      description: 'Detailed inquiry',
    },
    {
      icon: FaPhoneAlt,
      label: 'Call',
      action: () => window.open('tel:+919767847979', '_blank'),
      color: '#4285F4',
      description: 'Immediate talk',
    },
  ];

  return (
    <AnimatePresence mode="wait">
      {showButton && (
        <motion.div
          className="fixed bottom-4 right-4 z-50"
          variants={buttonVariants}
          ref={stickyContactRef}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Simplified Menu Panel */}
          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.div
                className="absolute bottom-20 right-0 w-96 mb-2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
                  {/* Header with Mode Tabs */}
                  <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 p-3">
                    <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => setMode('chat')}
                        className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                          mode === 'chat'
                            ? 'bg-white shadow-sm text-gray-900'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <FaRobot className="inline mr-1" /> Smart Chat
                      </button>
                      <button
                        onClick={() => setMode('contact')}
                        className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                          mode === 'contact'
                            ? 'bg-white shadow-sm text-gray-900'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <FaCommentDots className="inline mr-1" /> Contact
                      </button>
                      <button
                        onClick={() => setMode('tech')}
                        className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                          mode === 'tech'
                            ? 'bg-white shadow-sm text-gray-900'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <FaCog className="inline mr-1" /> Themes
                      </button>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="h-[28rem] overflow-hidden">
                    {/* Chat Mode */}
                    {mode === 'chat' && (
                      <div className="h-full flex flex-col">
                        {conversation.length === 0 ? (
                          <div className="flex-1 flex items-center justify-center p-6">
                            <div className="text-center">
                              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaRobot className="text-white text-2xl" />
                              </div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Assistant</h3>
                              <p className="text-sm text-gray-600 mb-4">I'll help you find the perfect solution for your project!</p>
                              <button
                                onClick={startChat}
                                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                              >
                                Start Conversation
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            {/* Chat Messages */}
                            <div
                              ref={chatContainerRef}
                              className="flex-1 overflow-y-auto p-4 space-y-3"
                            >
                              {conversation.map((msg) => (
                                <div key={msg.id}>
                                  {msg.type === 'bot' && (
                                    <div className="flex gap-2 items-start">
                                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <FaRobot className="text-white text-sm" />
                                      </div>
                                      <div className="bg-gray-100 rounded-lg rounded-tl-none px-3 py-2 max-w-xs">
                                        <p className="text-sm text-gray-800">{msg.message}</p>
                                      </div>
                                    </div>
                                  )}
                                  
                                  {msg.type === 'user' && (
                                    <div className="flex gap-2 items-start justify-end">
                                      <div
                                        className="rounded-lg rounded-tr-none px-3 py-2 max-w-xs text-white"
                                        style={{ backgroundColor: primaryColor }}
                                      >
                                        <p className="text-sm">{msg.message}</p>
                                      </div>
                                      <div
                                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                                        style={{ backgroundColor: primaryColor }}
                                      >
                                        <FaUser className="text-white text-sm" />
                                      </div>
                                    </div>
                                  )}
                                  
                                  {msg.type === 'contact-options' && (
                                    <div className="flex gap-2 items-start">
                                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <FaRobot className="text-white text-sm" />
                                      </div>
                                      <div className="bg-gray-100 rounded-lg rounded-tl-none px-3 py-2 w-full">
                                        <p className="text-sm text-gray-800 mb-2">{msg.message}</p>
                                        <div className="space-y-2">
                                          {contactOptions.map((option) => (
                                            <button
                                              key={option.label}
                                              onClick={() => {
                                                option.action();
                                                setIsOpen(false);
                                              }}
                                              className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-white transition-colors text-left"
                                            >
                                              <div
                                                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
                                                style={{ backgroundColor: option.color }}
                                              >
                                                <option.icon size={12} />
                                              </div>
                                              <div className="flex-1">
                                                <div className="font-medium text-xs text-gray-800">{option.label}</div>
                                                <div className="text-xs text-gray-600">{option.description}</div>
                                              </div>
                                            </button>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  
                                  {/* Chat Options */}
                                  {msg.options && msg.options.length > 0 && (
                                    <div className="flex flex-wrap gap-2 ml-10 mt-2">
                                      {msg.options.map((option) => (
                                        <button
                                          key={option.id}
                                          onClick={() => handleChatOption(option.id, option.label, option.next)}
                                          className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-50 transition-colors"
                                        >
                                          {option.label}
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                            
                            {/* Input Area for text questions */}
                            {currentStep === 'question_input' && (
                              <div className="border-t border-gray-200 p-3">
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    placeholder={chatbotFlow[currentStep]?.placeholder || "Type your message..."}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                    onKeyPress={(e) => e.key === 'Enter' && handleUserInput(userInput)}
                                  />
                                  <button
                                    onClick={() => handleUserInput(userInput)}
                                    className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                  >
                                    <FaPaperPlane size={14} />
                                  </button>
                                </div>
                              </div>
                            )}
                            
                            {/* Chat Footer */}
                            {conversation.length > 0 && (
                              <div className="border-t border-gray-200 p-2">
                                <button
                                  onClick={resetChat}
                                  className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                  🔄 Start over
                                </button>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    )}

                    {/* Quick Contact Mode */}
                    {mode === 'contact' && (
                      <div className="p-4 space-y-3">
                        <div className="text-center pb-2">
                          <h3 className="text-sm font-semibold text-gray-800">Get In Touch</h3>
                          <p className="text-xs text-gray-500">Choose your preferred method</p>
                        </div>
                        {contactOptions.map((option, index) => (
                          <motion.button
                            key={option.label}
                            variants={itemVariants}
                            onClick={() => {
                              option.action();
                              setIsOpen(false);
                            }}
                            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 group"
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform duration-200"
                              style={{ backgroundColor: option.color }}
                            >
                              <option.icon size={16} />
                            </div>
                            <div className="text-left flex-1">
                              <div className="font-medium text-gray-800 text-sm">{option.label}</div>
                              <div className="text-xs text-gray-500">{option.description}</div>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    )}

                    {/* Tech Theme Mode */}
                    {mode === 'tech' && (
                      <div className="h-full flex flex-col">
                        <div className="text-center p-4 pb-2 border-b border-gray-200">
                          <h3 className="text-sm font-semibold text-gray-800">Portfolio Themes</h3>
                          <p className="text-xs text-gray-500">Choose your favorite tech style</p>
                        </div>
                        
                        {/* Scrollable Tech Grid */}
                        <div className="flex-1 overflow-y-auto p-3">
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            {techIcons
                              .filter(item => item.tech !== 'default')
                              .map(({ icon: TechIcon, tech, label }) => {
                                const isSelected = selectedTech === tech;
                                return (
                                  <motion.button
                                    key={tech}
                                    onClick={() => {
                                      updateTech(tech);
                                    }}
                                    className={`relative flex flex-col items-center justify-center gap-2 p-3 rounded-xl transition-all duration-200 min-h-[90px] ${
                                      isSelected
                                        ? 'bg-gray-900 text-white shadow-lg ring-2 ring-blue-500'
                                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
                                    }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    style={{
                                      ...(isSelected && {
                                        backgroundColor: techColors[tech],
                                        boxShadow: `0 4px 12px ${techColors[tech]}40`,
                                      })
                                    }}
                                  >
                                    {/* Selected indicator */}
                                    {isSelected && (
                                      <motion.div 
                                        className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                      >
                                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                                      </motion.div>
                                    )}
                                    
                                    <TechIcon 
                                      size={24} 
                                      color={isSelected ? '#fff' : techColors[tech]} 
                                    />
                                    <span className="text-xs font-medium text-center leading-tight px-1">
                                      {label}
                                    </span>
                                  </motion.button>
                                );
                              })}
                          </div>
                          
                          {/* Selected Tech Info */}
                          <motion.div 
                            key={selectedTech}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gray-50 rounded-lg p-3 border border-gray-200"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div 
                                className="w-6 h-6 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: techColors[selectedTech] }}
                              >
                                {(() => {
                                  const iconData = techIcons.find(icon => icon.tech === selectedTech);
                                  if (iconData) {
                                    const IconComponent = iconData.icon;
                                    return <IconComponent size={14} color="white" />;
                                  }
                                  return null;
                                })()}
                              </div>
                              <span className="text-sm font-semibold text-gray-800">
                                {techIcons.find(icon => icon.tech === selectedTech)?.label || 'Technology'} Theme
                              </span>
                            </div>
                            <p className="text-xs text-gray-600">
                              ✨ Your portfolio now uses {techIcons.find(icon => icon.tech === selectedTech)?.label || 'this'} colors and styling throughout the site.
                            </p>
                          </motion.div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Arrow pointer */}
                <div
                  className="absolute -bottom-1 right-6 w-3 h-3 bg-white border-r border-b border-gray-200/50 transform rotate-45"
                  style={{ borderRadius: '0 0 2px 0' }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Main Toggle Button */}
          <motion.button
            onClick={() => {
              setIsOpen(!isOpen);
              setShowTooltip(false);
              if (!isOpen) {
                setMode('chat'); // Default to chat when opening
              }
            }}
            className="relative w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-white font-bold overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)` }}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {/* Enhanced pulse animation */}
            {!isOpen && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: primaryColor }}
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.7, 0, 0.7],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}

            {/* Button Icon with mode indication */}
            <motion.div
              animate={{
                rotate: isOpen ? 135 : 0,
                scale: isOpen ? 0.9 : 1,
              }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 12,
              }}
              className="relative z-10 flex items-center justify-center"
            >
              {isOpen ? (
                <FaTimes size={20} />
              ) : (
                <div className="relative">
                  <FaRobot size={20} />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                </div>
              )}
            </motion.div>
          </motion.button>

          {/* Enhanced Tooltip */}
          <AnimatePresence>
            {!isOpen && showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                transition={{ type: 'spring', duration: 0.4 }}
                className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2"
              >
                <div className="bg-gray-900 text-white px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap shadow-xl">
                  <div className="flex items-center gap-2">
                    <FaRobot size={16} />
                    <span>Hi! Need help with your project?</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">Click to start our AI assistant</div>
                  <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2">
                    <div className="w-0 h-0 border-l-8 border-r-0 border-t-4 border-b-4 border-l-gray-900 border-t-transparent border-b-transparent" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default StickyContact;
