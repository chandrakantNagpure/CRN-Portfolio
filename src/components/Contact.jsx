import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTech } from './TechContext';
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaCheckCircle,
  FaArrowRight,
  FaArrowLeft,
  FaLightbulb,
  FaDollarSign,
  FaClock,
  FaRocket,
} from 'react-icons/fa';
import ResumeButton from './ResumeButton';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const buttonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const alertVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

const inputVariants = {
  rest: { boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)' },
  focus: {
    boxShadow: '0 0 8px 2px rgba(59, 130, 246, 0.5)',
    transition: { duration: 0.3 },
  },
};

import { getContrastTextColor } from '../utils/colors';

// Interactive questions configuration
const interactiveQuestions = [
  {
    id: 'projectType',
    question: 'What type of project are you looking for?',
    type: 'single-choice',
    icon: FaLightbulb,
    required: true,
    options: [
      {
        value: 'website',
        label: 'New Website',
        description: 'Build a website from scratch',
        icon: '🌐',
      },
      {
        value: 'redesign',
        label: 'Website Redesign',
        description: 'Improve existing website',
        icon: '🎨',
      },
      { value: 'webapp', label: 'Web Application', description: 'Interactive web app', icon: '⚡' },
      {
        value: 'ecommerce',
        label: 'E-commerce Store',
        description: 'Online shopping platform',
        icon: '🛒',
      },
      {
        value: 'maintenance',
        label: 'Maintenance & Support',
        description: 'Ongoing website care',
        icon: '🔧',
      },
      { value: 'other', label: 'Something Else', description: 'Tell me what you need', icon: '💡' },
    ],
  },
  {
    id: 'budget',
    question: "What's your budget range?",
    type: 'single-choice',
    icon: FaDollarSign,
    required: true,
    options: [
      { value: 'small', label: '$500 - $2,000', description: 'Small project budget', icon: '💵' },
      {
        value: 'medium',
        label: '$2,000 - $5,000',
        description: 'Medium project budget',
        icon: '💰',
      },
      {
        value: 'large',
        label: '$5,000 - $10,000',
        description: 'Large project budget',
        icon: '💸',
      },
      { value: 'enterprise', label: '$10,000+', description: 'Enterprise budget', icon: '🏦' },
      {
        value: 'discuss',
        label: "Let's Discuss",
        description: 'Not sure about budget',
        icon: '💬',
      },
    ],
  },
  {
    id: 'timeline',
    question: 'When do you need this completed?',
    type: 'single-choice',
    icon: FaClock,
    required: true,
    options: [
      { value: 'urgent', label: 'ASAP', description: 'Rush job (extra fees apply)', icon: '🔥' },
      { value: 'month', label: 'Within 1 month', description: 'Standard timeline', icon: '📅' },
      { value: 'quarter', label: '2-3 months', description: 'Flexible timeline', icon: '📆' },
      { value: 'flexible', label: 'No rush', description: 'Take your time', icon: '🕒' },
    ],
  },
  {
    id: 'features',
    question: 'Which features do you need?',
    type: 'multi-choice',
    icon: FaRocket,
    required: false,
    options: [
      {
        value: 'responsive',
        label: 'Mobile Responsive',
        description: 'Works on all devices',
        icon: '📱',
      },
      {
        value: 'seo',
        label: 'SEO Optimization',
        description: 'Better search rankings',
        icon: '🔍',
      },
      {
        value: 'cms',
        label: 'Content Management',
        description: 'Easy content updates',
        icon: '✏️',
      },
      {
        value: 'analytics',
        label: 'Analytics Setup',
        description: 'Track visitor behavior',
        icon: '📊',
      },
      {
        value: 'payment',
        label: 'Payment Integration',
        description: 'Accept online payments',
        icon: '💳',
      },
      {
        value: 'social',
        label: 'Social Media Integration',
        description: 'Connect social accounts',
        icon: '📲',
      },
      {
        value: 'blog',
        label: 'Blog/News Section',
        description: 'Regular content updates',
        icon: '📝',
      },
      { value: 'contact', label: 'Contact Forms', description: 'Customer inquiries', icon: '📧' },
    ],
  },
];

function Contact() {
  const { selectedTech, techColors, bgColor } = useTech();
  const textColor = getContrastTextColor(bgColor);

  // Interactive form state
  const [currentStep, setCurrentStep] = useState(0);
  const [interactiveAnswers, setInteractiveAnswers] = useState({});
  const [showTraditionalForm, setShowTraditionalForm] = useState(false);

  // Traditional form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const formRef = useRef(null);

  // Interactive form handlers
  const handleInteractiveAnswer = (questionId, value, isMultiChoice = false) => {
    setInteractiveAnswers(prev => {
      if (isMultiChoice) {
        const currentAnswers = prev[questionId] || [];
        if (currentAnswers.includes(value)) {
          return { ...prev, [questionId]: currentAnswers.filter(v => v !== value) };
        } else {
          return { ...prev, [questionId]: [...currentAnswers, value] };
        }
      } else {
        return { ...prev, [questionId]: value };
      }
    });
  };

  const nextStep = () => {
    if (currentStep < interactiveQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowTraditionalForm(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    const currentQuestion = interactiveQuestions[currentStep];
    if (!currentQuestion.required) return true;
    const answer = interactiveAnswers[currentQuestion.id];
    return answer && (Array.isArray(answer) ? answer.length > 0 : true);
  };

  const generateMessageFromAnswers = () => {
    let message = "Hi Chandrakant! I'm interested in working with you.\n\nProject Details:\n";

    Object.entries(interactiveAnswers).forEach(([questionId, answer]) => {
      const question = interactiveQuestions.find(q => q.id === questionId);
      if (question) {
        message += `\n${question.question}\n`;
        if (Array.isArray(answer)) {
          answer.forEach(val => {
            const option = question.options.find(opt => opt.value === val);
            message += `- ${option?.label || val}\n`;
          });
        } else {
          const option = question.options.find(opt => opt.value === answer);
          message += `${option?.label || answer}\n`;
        }
      }
    });

    return message + '\nLooking forward to hearing from you!';
  };

  // Traditional form handlers
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    setSubmitError('');
  };

  const handleFocus = name => {
    setFocused(prev => ({ ...prev, [name]: true }));
  };

  const handleBlur = name => {
    setFocused(prev => ({
      ...prev,
      [name]: formData[name].trim() !== '',
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    // Message is only required if no interactive answers exist
    if (Object.keys(interactiveAnswers).length === 0 && !formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    return newErrors;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const data = new FormData(e.target);

      // Add interactive answers to form data if they exist
      if (Object.keys(interactiveAnswers).length > 0) {
        const generatedMessage = generateMessageFromAnswers();
        const finalMessage = formData.message.trim()
          ? `${generatedMessage}\n\nAdditional Message:\n${formData.message}`
          : generatedMessage;

        // Update the message field in form data
        data.set('message', finalMessage);
      }

      const response = await fetch(e.target.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', company: '', phone: '', message: '' });
        setFocused({ name: false, email: false, company: false, phone: false, message: false });
        setInteractiveAnswers({});
        setCurrentStep(0);
        setShowTraditionalForm(false);
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        setSubmitError('Failed to send message. Please try again.');
      }
    } catch (error) {
      setSubmitError('An error occurred. Please try again.');
    }
  };

  const socialLinks = [
    {
      icon: FaGithub,
      label: 'GitHub',
      url: 'https://github.com/chandrakantNagpure/',
      color: techColors.github || '#181717',
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/chandrakant-nagpure-04419b135/',
      color: techColors.linkedin || '#0A66C2',
    },
    {
      icon: FaEnvelope,
      label: 'Email',
      url: 'mailto:nagpure.cr@gmail.com',
      color: techColors.email || '#D14836',
    },
  ];

  const primaryColor = techColors[selectedTech] || '#4B5563';
  const secondaryColor = '#6B7280';
  const gradient = `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`;

  return (
    <section
      id="contact"
      className="flex items-center justify-center px-6 md:px-16 py-16"
      style={{
        background: bgColor
          ? `linear-gradient(to right, ${bgColor}33, ${bgColor})`
          : `linear-gradient(to right, #ffffff33, #ffffff)`,
        color: textColor,
      }}
    >
      <motion.div
        className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Form Column */}
        <motion.div className="flex flex-col justify-center" variants={itemVariants}>
          <motion.form
            ref={formRef}
            action="https://formsubmit.co/nagpure.cr@gmail.com"
            method="POST"
            onSubmit={handleSubmit}
            className="bg-white text-gray-800 rounded-2xl shadow-xl p-8 relative"
            variants={itemVariants}
            noValidate
          >
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_subject" value="New Portfolio Contact!" />
            <input type="hidden" name="_autoresponse" value="Thanks for reaching out!" />

            <AnimatePresence>
              {submitted && (
                <motion.div
                  className="absolute top-4 left-4 right-4 p-3 bg-green-100 text-green-700 rounded-lg text-center"
                  variants={alertVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  Thank you for your message!
                </motion.div>
              )}
              {submitError && (
                <motion.div
                  className="absolute top-4 left-4 right-4 p-3 bg-red-100 text-red-700 rounded-lg text-center"
                  variants={alertVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {submitError}
                </motion.div>
              )}
            </AnimatePresence>

            {!showTraditionalForm ? (
              // Interactive Questionnaire
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Progress Bar */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-bold">Let's Get Started</h3>
                      <span className="text-sm text-gray-500">
                        Step {currentStep + 1} of {interactiveQuestions.length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full"
                        style={{ background: gradient }}
                        initial={{ width: 0 }}
                        animate={{
                          width: `${((currentStep + 1) / interactiveQuestions.length) * 100}%`,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  {/* Current Question */}
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold mb-6 flex items-center gap-3">
                      {React.createElement(interactiveQuestions[currentStep].icon, {
                        size: 24,
                        className: 'text-blue-600',
                      })}
                      {interactiveQuestions[currentStep].question}
                    </h4>

                    <div className="space-y-3">
                      {interactiveQuestions[currentStep].options.map(option => {
                        const isSelected =
                          interactiveQuestions[currentStep].type === 'multi-choice'
                            ? (
                                interactiveAnswers[interactiveQuestions[currentStep].id] || []
                              ).includes(option.value)
                            : interactiveAnswers[interactiveQuestions[currentStep].id] ===
                              option.value;

                        return (
                          <motion.button
                            key={option.value}
                            type="button"
                            onClick={() =>
                              handleInteractiveAnswer(
                                interactiveQuestions[currentStep].id,
                                option.value,
                                interactiveQuestions[currentStep].type === 'multi-choice'
                              )
                            }
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                              isSelected
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300 bg-white'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{option.icon}</span>
                              <div>
                                <div className="font-medium">{option.label}</div>
                                {option.description && (
                                  <div className="text-sm text-gray-500 mt-1">
                                    {option.description}
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between">
                    <motion.button
                      type="button"
                      onClick={prevStep}
                      disabled={currentStep === 0}
                      className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: currentStep === 0 ? 1 : 1.05 }}
                    >
                      Previous
                    </motion.button>

                    <motion.button
                      type="button"
                      onClick={nextStep}
                      disabled={!canProceed()}
                      className="px-6 py-2 rounded-lg text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ background: canProceed() ? gradient : '#9CA3AF' }}
                      whileHover={{ scale: canProceed() ? 1.05 : 1 }}
                    >
                      {currentStep === interactiveQuestions.length - 1
                        ? 'Continue to Form'
                        : 'Next'}
                    </motion.button>
                  </div>

                  {/* Skip Option */}
                  <div className="text-center mt-4">
                    <button
                      type="button"
                      onClick={() => setShowTraditionalForm(true)}
                      className="text-sm text-gray-500 hover:text-gray-700 underline"
                    >
                      Skip questionnaire and use traditional form
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              // Traditional Form
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold">Contact Details</h3>
                  {Object.keys(interactiveAnswers).length > 0 && (
                    <button
                      type="button"
                      onClick={() => setShowTraditionalForm(false)}
                      className="text-sm text-blue-600 hover:text-blue-700 underline"
                    >
                      ← Back to questionnaire
                    </button>
                  )}
                </div>

                {/* Show Summary of Interactive Answers */}
                {Object.keys(interactiveAnswers).length > 0 && (
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Your Project Summary:</h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      {Object.entries(interactiveAnswers).map(([questionId, answer]) => {
                        const question = interactiveQuestions.find(q => q.id === questionId);
                        if (!question) return null;
                        return (
                          <div key={questionId}>
                            <span className="font-medium">{question.question}</span>
                            {Array.isArray(answer) ? (
                              <ul className="ml-4 list-disc">
                                {answer.map(val => {
                                  const option = question.options.find(opt => opt.value === val);
                                  return <li key={val}>{option?.label || val}</li>;
                                })}
                              </ul>
                            ) : (
                              <span className="ml-2">
                                {question.options.find(opt => opt.value === answer)?.label ||
                                  answer}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Name Field */}
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className={`block text-sm font-medium mb-1 ${errors.name ? 'text-red-500' : 'text-gray-600'}`}
                    >
                      Name *
                    </label>
                    <motion.input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus('name')}
                      onBlur={() => handleBlur('name')}
                      placeholder="Your Name"
                      className={`w-full px-4 py-2 rounded-lg bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'} focus:outline-none transition-all duration-300`}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      variants={inputVariants}
                      initial="rest"
                      animate={focused.name ? 'focus' : 'rest'}
                    />
                    <AnimatePresence>
                      {errors.name && (
                        <motion.p
                          id="name-error"
                          className="text-red-500 text-xs mt-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className={`block text-sm font-medium mb-1 ${errors.email ? 'text-red-500' : 'text-gray-600'}`}
                    >
                      Email *
                    </label>
                    <motion.input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus('email')}
                      onBlur={() => handleBlur('email')}
                      placeholder="Your Email"
                      className={`w-full px-4 py-2 rounded-lg bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'} focus:outline-none transition-all duration-300`}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      variants={inputVariants}
                      initial="rest"
                      animate={focused.email ? 'focus' : 'rest'}
                    />
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p
                          id="email-error"
                          className="text-red-500 text-xs mt-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Company Field */}
                  <div className="relative">
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium mb-1 text-gray-600"
                    >
                      Company (Optional)
                    </label>
                    <motion.input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      onFocus={() => handleFocus('company')}
                      onBlur={() => handleBlur('company')}
                      placeholder="Your Company"
                      className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-300"
                      variants={inputVariants}
                      initial="rest"
                      animate={focused.company ? 'focus' : 'rest'}
                    />
                  </div>

                  {/* Phone Field */}
                  <div className="relative">
                    <label htmlFor="phone" className="block text-sm font-medium mb-1 text-gray-600">
                      Phone (Optional)
                    </label>
                    <motion.input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => handleFocus('phone')}
                      onBlur={() => handleBlur('phone')}
                      placeholder="Your Phone Number"
                      className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-300"
                      variants={inputVariants}
                      initial="rest"
                      animate={focused.phone ? 'focus' : 'rest'}
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div className="relative mb-6">
                  <label
                    htmlFor="message"
                    className={`block text-sm font-medium mb-1 ${errors.message ? 'text-red-500' : 'text-gray-600'}`}
                  >
                    {Object.keys(interactiveAnswers).length > 0
                      ? 'Additional Message (Optional)'
                      : 'Message *'}
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={() => handleBlur('message')}
                    placeholder={
                      Object.keys(interactiveAnswers).length > 0
                        ? "Any additional details you'd like to share..."
                        : 'Tell me about your project or what you need help with...'
                    }
                    rows={4}
                    className={`w-full px-4 py-2 rounded-lg bg-gray-50 border ${errors.message ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'} focus:outline-none transition-all duration-300`}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    variants={inputVariants}
                    initial="rest"
                    animate={focused.message ? 'focus' : 'rest'}
                  />
                  <AnimatePresence>
                    {errors.message && (
                      <motion.p
                        id="message-error"
                        className="text-red-500 text-xs mt-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {errors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full px-6 py-3 rounded-lg text-white font-medium transition relative overflow-hidden"
                  style={{ background: gradient }}
                  variants={buttonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <span className="relative z-10">Send Message</span>
                  <motion.span
                    className="absolute inset-0 bg-white opacity-0"
                    whileTap={{ opacity: 0.2, scale: 2 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </>
            )}
          </motion.form>
        </motion.div>

        {/* Info Column */}
        <motion.div
          className="flex flex-col justify-center text-center lg:text-left"
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: textColor }}>
            Let’s Build Something Amazing
          </h2>
          <p className="text-lg mb-8" style={{ color: textColor }}>
            Have a project idea or just want to chat? Reach out via the form or connect with me
            directly.
          </p>

          {/* Resume Download Section */}
          <div className="mb-8 p-4 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg">
            <h4 className="text-xl font-semibold mb-3" style={{ color: textColor }}>
              Download My Resume
            </h4>
            <p className="text-sm mb-4" style={{ color: textColor }}>
              Get a detailed overview of my experience, skills, and projects.
            </p>
            <ResumeButton variant="primary" />
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4" style={{ color: textColor }}>
              Contact Info
            </h3>
            <p className="text-base" style={{ color: textColor }}>
              <a
                href="mailto:nagpure.cr@gmail.com"
                className="hover:underline"
                style={{ color: primaryColor }}
              >
                nagpure.cr@gmail.com
              </a>
            </p>
            <p className="text-base" style={{ color: textColor }}>
              <a
                href="https://www.linkedin.com/in/chandrakant-nagpure-04419b135/"
                className="hover:underline"
                style={{ color: primaryColor }}
              >
                https://www.linkedin.com/in/chandrakant-nagpure-04419b135/
              </a>
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4" style={{ color: textColor }}>
              Follow Me
            </h3>
            <div className="flex justify-center lg:justify-start gap-4">
              {socialLinks.map(({ icon: Icon, label, url, color }) => (
                <motion.a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Visit my ${label} profile`}
                >
                  <Icon
                    size={24}
                    style={{ color, transition: 'color 0.2s' }}
                    className="hover:brightness-110"
                  />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Contact;
