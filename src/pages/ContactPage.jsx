import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTech } from '../components/TechContext';
import ParticleCanvas from '../components/ParticleCanvas';
import ResumeButton from '../components/ResumeButton';
import Footer from '../components/Footer';
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLightbulb,
  FaDollarSign,
  FaClock,
  FaRocket,
} from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';
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

function ContactPage() {
  const { t } = useLanguage();
  const { selectedTech, techColors, bgColor } = useTech();
  const textColor = '#000000'; // white with 80% opacity

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
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState({
    name: false,
    email: false,
    company: false,
    phone: false,
    subject: false,
    message: false,
  });
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
    if (!formData.name.trim()) newErrors.name = t('contact.form.errors.nameRequired');
    if (!formData.email.trim()) {
      newErrors.email = t('contact.form.errors.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('contact.form.errors.emailInvalid');
    }
    // Subject and message are only required if no interactive answers exist
    if (Object.keys(interactiveAnswers).length === 0) {
      if (!formData.subject.trim()) newErrors.subject = t('contact.form.errors.subjectRequired');
      if (!formData.message.trim()) newErrors.message = t('contact.form.errors.messageRequired');
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
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('company', formData.company);
      data.append('phone', formData.phone);

      // Generate message from interactive answers or use manual message
      let finalMessage = '';
      if (Object.keys(interactiveAnswers).length > 0) {
        const generatedMessage = generateMessageFromAnswers();
        finalMessage = formData.message.trim()
          ? `${generatedMessage}\n\nAdditional Message:\n${formData.message}`
          : generatedMessage;
        data.append('subject', formData.subject || 'New Project Inquiry via Interactive Form');
      } else {
        finalMessage = formData.message;
        data.append('subject', formData.subject);
      }
      data.append('message', finalMessage);

      // FormSubmit configuration
      data.append('_captcha', 'false');
      data.append('_autoresponse', 'Thanks for reaching out!');

      const response = await fetch('https://formsubmit.co/nagpure.cr@gmail.com', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', company: '', phone: '', subject: '', message: '' });
        setFocused({
          name: false,
          email: false,
          company: false,
          phone: false,
          subject: false,
          message: false,
        });
        setInteractiveAnswers({});
        setCurrentStep(0);
        setShowTraditionalForm(false);
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setSubmitError(t('contact.form.error'));
      }
    } catch (error) {
      setSubmitError(t('contact.form.error'));
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
      color: '#0A66C2',
    },
    {
      icon: FaTwitter,
      label: 'Twitter',
      url: 'https://twitter.com/chandrakantNP',
      color: '#1DA1F2',
    },
    {
      icon: FaEnvelope,
      label: 'Email',
      url: 'mailto:nagpure.cr@gmail.com',
      color: '#D14836',
    },
  ];

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: t('contact.info.email'),
      value: 'nagpure.cr@gmail.com',
      link: 'mailto:nagpure.cr@gmail.com',
    },
    {
      icon: FaPhone,
      label: t('contact.info.phone'),
      value: '+91 9767847979',
      link: 'tel:+919767847979',
    },
    {
      icon: FaMapMarkerAlt,
      label: t('contact.info.location'),
      value: 'Nagpur, Maharashtra, India',
      link: null,
    },
  ];

  const primaryColor = techColors[selectedTech] || '#4B5563';
  const secondaryColor = '#6B7280';

  return (
    <>
      <SEO
        title={t('contact.title')}
        description={t('contact.subtitle')}
        canonical="/contact"
        keywords={[
          'Contact Chandrakant Nagpure',
          'Hire Frontend Developer',
          'React Developer Contact',
          'WordPress Expert Hire',
          'Web Development Services',
        ]}
      />
      <div
        className="min-h-screen flex items-center justify-center px-6 md:px-16 py-20 relative font-poppins overflow-hidden"
        style={{
          background: bgColor
            ? `linear-gradient(to right, ${bgColor}33, ${bgColor})`
            : `linear-gradient(to right, #ffffff33, #ffffff)`,
          color: textColor,
        }}
      >
        <ParticleCanvas bgColor={bgColor || '#4B5563'} />

        <div className="max-w-7xl w-full z-10 relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              className="text-4xl md:text-6xl font-orbitron font-extrabold mb-6"
              style={{ color: textColor }}
            >
              {t('contact.title')}
            </h1>
            <p
              className="text-lg md:text-xl max-w-3xl mx-auto"
              style={{ color: textColor, opacity: 0.8 }}
            >
              {t('contact.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl shadow-xl p-8 relative"
              style={{ border: `1px solid ${primaryColor}33` }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    className="absolute top-4 left-4 right-4 p-4 bg-green-100 text-green-700 rounded-lg text-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {t('contact.form.success')}
                  </motion.div>
                )}
                {submitError && (
                  <motion.div
                    className="absolute top-4 left-4 right-4 p-4 bg-red-100 text-red-700 rounded-lg text-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {submitError}
                  </motion.div>
                )}
              </AnimatePresence>

              {!showTraditionalForm ? (
                // Interactive Questionnaire
                <>
                  <h2 className="text-2xl font-bold mb-8" style={{ color: '#000' }}>
                    Let's Get Started
                  </h2>
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
                          <span className="text-sm font-medium" style={{ color: '#000' }}>
                            Step {currentStep + 1} of {interactiveQuestions.length}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div
                            className="h-2 rounded-full"
                            style={{
                              background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                            }}
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
                        <h4
                          className="text-xl font-semibold mb-6 flex items-center gap-3"
                          style={{ color: '#000' }}
                        >
                          {React.createElement(interactiveQuestions[currentStep].icon, {
                            size: 24,
                            color: primaryColor,
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
                                    <div className="font-medium" style={{ color: '#000' }}>
                                      {option.label}
                                    </div>
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
                          className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                          whileHover={{ scale: currentStep === 0 ? 1 : 1.05 }}
                        >
                          Previous
                        </motion.button>

                        <motion.button
                          type="button"
                          onClick={nextStep}
                          disabled={!canProceed()}
                          className="px-6 py-2 rounded-lg text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{
                            background: canProceed()
                              ? `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`
                              : '#9CA3AF',
                          }}
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
                </>
              ) : (
                // Traditional Form
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold" style={{ color: '#000' }}>
                      {t('contact.form.title')}
                    </h2>
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

                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name Field */}
                      <div className="relative">
                        <label
                          htmlFor="name"
                          className={`block text-sm font-medium mb-2 ${
                            errors.name ? 'text-red-500' : 'text-gray-700'
                          }`}
                        >
                          {t('contact.form.name')} {t('contact.form.required')}
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => handleFocus('name')}
                          onBlur={() => handleBlur('name')}
                          placeholder={t('contact.form.placeholders.name')}
                          className={`w-full px-4 py-3 rounded-lg bg-white border ${
                            errors.name ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                          } focus:outline-none transition-all duration-300`}
                          aria-invalid={!!errors.name}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                      </div>

                      {/* Email Field */}
                      <div className="relative">
                        <label
                          htmlFor="email"
                          className={`block text-sm font-medium mb-2 ${
                            errors.email ? 'text-red-500' : 'text-gray-700'
                          }`}
                        >
                          {t('contact.form.email')} {t('contact.form.required')}
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => handleFocus('email')}
                          onBlur={() => handleBlur('email')}
                          placeholder={t('contact.form.placeholders.email')}
                          className={`w-full px-4 py-3 rounded-lg bg-white border ${
                            errors.email
                              ? 'border-red-500'
                              : 'border-gray-200 focus:border-blue-500'
                          } focus:outline-none transition-all duration-300`}
                          aria-invalid={!!errors.email}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>

                      {/* Company Field */}
                      <div className="relative">
                        <label
                          htmlFor="company"
                          className="block text-sm font-medium mb-2 text-gray-700"
                        >
                          Company (Optional)
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          onFocus={() => handleFocus('company')}
                          onBlur={() => handleBlur('company')}
                          placeholder="Your Company"
                          className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-300"
                        />
                      </div>

                      {/* Phone Field */}
                      <div className="relative">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium mb-2 text-gray-700"
                        >
                          Phone (Optional)
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onFocus={() => handleFocus('phone')}
                          onBlur={() => handleBlur('phone')}
                          placeholder="Your Phone Number"
                          className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-300"
                        />
                      </div>
                    </div>

                    {/* Subject Field */}
                    <div className="relative">
                      <label
                        htmlFor="subject"
                        className={`block text-sm font-medium mb-2 ${
                          errors.subject ? 'text-red-500' : 'text-gray-700'
                        }`}
                      >
                        {t('contact.form.subject')}{' '}
                        {Object.keys(interactiveAnswers).length === 0
                          ? t('contact.form.required')
                          : '(Optional)'}
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => handleFocus('subject')}
                        onBlur={() => handleBlur('subject')}
                        placeholder={
                          Object.keys(interactiveAnswers).length > 0
                            ? 'Optional subject...'
                            : t('contact.form.placeholders.subject')
                        }
                        className={`w-full px-4 py-3 rounded-lg bg-white border ${
                          errors.subject
                            ? 'border-red-500'
                            : 'border-gray-200 focus:border-blue-500'
                        } focus:outline-none transition-all duration-300`}
                        aria-invalid={!!errors.subject}
                      />
                      {errors.subject && (
                        <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                      )}
                    </div>

                    {/* Message Field */}
                    <div className="relative">
                      <label
                        htmlFor="message"
                        className={`block text-sm font-medium mb-2 ${
                          errors.message ? 'text-red-500' : 'text-gray-700'
                        }`}
                      >
                        {Object.keys(interactiveAnswers).length > 0
                          ? 'Additional Message (Optional)'
                          : `${t('contact.form.message')} ${t('contact.form.required')}`}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => handleFocus('message')}
                        onBlur={() => handleBlur('message')}
                        placeholder={
                          Object.keys(interactiveAnswers).length > 0
                            ? "Any additional details you'd like to share..."
                            : t('contact.form.placeholders.message')
                        }
                        rows={6}
                        className={`w-full px-4 py-3 rounded-lg bg-white border ${
                          errors.message
                            ? 'border-red-500'
                            : 'border-gray-200 focus:border-blue-500'
                        } focus:outline-none transition-all duration-300 resize-vertical`}
                        aria-invalid={!!errors.message}
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      className="w-full px-6 py-4 rounded-lg text-white font-medium text-lg transition relative overflow-hidden"
                      style={{ backgroundColor: primaryColor }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {t('contact.form.send')}
                    </motion.button>
                  </form>
                </>
              )}
            </motion.div>

            {/* Contact Information */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Contact Details */}
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 font-orbitron" style={{ color: textColor }}>
                  {t('contact.info.title')}
                </h3>
                <div className="space-y-4">
                  {contactInfo.map(({ icon: Icon, label, value, link }) => (
                    <div key={label} className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${primaryColor}20` }}
                      >
                        <Icon size={20} color={primaryColor} />
                      </div>
                      <div>
                        <p className="font-medium" style={{ color: textColor }}>
                          {label}
                        </p>
                        {link ? (
                          <a
                            href={link}
                            className="hover:underline"
                            style={{ color: primaryColor }}
                          >
                            {value}
                          </a>
                        ) : (
                          <p style={{ color: '#000', opacity: 0.8 }}>{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resume Section */}
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-8 shadow-lg">
                <h4
                  className="text-xl font-semibold mb-4 font-orbitron"
                  style={{ color: textColor }}
                >
                  {t('contact.resume.title')}
                </h4>
                <p className="mb-6" style={{ color: textColor, opacity: 0.8 }}>
                  {t('contact.resume.description')}
                </p>
                <ResumeButton variant="primary" />
              </div>

              {/* Social Links */}
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-8 shadow-lg">
                <h4
                  className="text-xl font-semibold mb-6 font-orbitron"
                  style={{ color: textColor }}
                >
                  {t('contact.social.title')}
                </h4>
                <div className="flex gap-4">
                  {socialLinks.map(({ icon: Icon, label, url, color }) => (
                    <motion.a
                      key={label}
                      href={url}
                      className="w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={`Visit my ${label} profile`}
                    >
                      <Icon size={20} color={color} />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-8 shadow-lg">
                <h4
                  className="text-xl font-semibold mb-4 font-orbitron"
                  style={{ color: textColor }}
                >
                  {t('contact.availability.title')}
                </h4>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span style={{ color: textColor }}>{t('contact.availability.status')}</span>
                </div>
                <p style={{ color: textColor, opacity: 0.8 }}>
                  {t('contact.availability.description')}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />

    </>
  );
}

export default ContactPage;
