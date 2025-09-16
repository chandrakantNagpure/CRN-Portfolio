import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaEnvelope,
  FaGift,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner,
  FaDownload,
  FaTimes,
} from 'react-icons/fa';
import { trackEvent } from '../utils/analytics';
import emailjs from '@emailjs/browser';

const NewsletterSignup = ({
  variant = 'default', // 'default', 'modal', 'inline'
  accentColor = '#14B8A6',
  onClose,
  showLeadMagnet = true,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const leadMagnets = [
    {
      id: 'react-checklist',
      title: 'React Development Checklist',
      description: 'Complete checklist for building production-ready React applications',
      icon: '⚛️',
      type: 'PDF Guide',
    },
    {
      id: 'web-performance',
      title: 'Web Performance Optimization Guide',
      description: '25+ techniques to make your websites lightning fast',
      icon: '⚡',
      type: 'PDF Guide',
    },
    {
      id: 'ui-components',
      title: 'Reusable UI Components Library',
      description: 'Collection of 50+ React components with Tailwind CSS',
      icon: '🎨',
      type: 'Code Package',
    },
  ];

  const [selectedMagnet, setSelectedMagnet] = useState(leadMagnets[0].id);

  const onSubmit = async data => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const selectedLeadMagnet = leadMagnets.find(m => m.id === selectedMagnet);

      // Prepare email template for newsletter signup
      const templateParams = {
        subscriber_email: data.email,
        subscriber_name: data.name || 'New Subscriber',
        lead_magnet: selectedLeadMagnet?.title || 'None selected',
        signup_date: new Date().toLocaleDateString(),
        to_email: import.meta.env.VITE_CONTACT_EMAIL || 'hello@chandrakantnagpure.com',
      };

      // Send confirmation email
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        'newsletter_signup', // You'll need to create this template in EmailJS
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus('success');
      reset();

      // Track successful newsletter signup
      trackEvent('newsletter_signup', {
        category: 'Newsletter',
        label: variant,
        lead_magnet: selectedMagnet,
        variant: variant,
      });

      // Auto-close modal after success
      if (variant === 'modal' && onClose) {
        setTimeout(() => {
          onClose();
        }, 3000);
      }
    } catch (error) {
      console.error('Newsletter signup failed:', error);
      setSubmitStatus('error');

      trackEvent('newsletter_error', {
        category: 'Newsletter',
        label: 'signup_error',
        error_message: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = fieldName => `
    w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
    bg-white dark:bg-gray-800 
    text-gray-900 dark:text-white
    placeholder-gray-500 dark:placeholder-gray-400
    ${
      errors[fieldName]
        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
        : 'border-gray-200 dark:border-gray-600 focus:border-teal-500 focus:ring-teal-500'
    }
    focus:outline-none focus:ring-2 focus:ring-opacity-50
  `;

  const containerClasses = {
    default:
      'bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-lg',
    modal: 'bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl max-w-2xl w-full mx-4',
    inline:
      'bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700',
  };

  const NewsletterForm = () => (
    <div className={containerClasses[variant]}>
      {/* Close button for modal */}
      {variant === 'modal' && onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <FaTimes />
        </button>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl"
            style={{ backgroundColor: accentColor }}
          >
            <FaEnvelope />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Stay Updated with Latest Tips
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Get exclusive web development insights, tutorials, and resources delivered to your inbox.
        </p>
      </div>

      {/* Lead Magnets */}
      {showLeadMagnet && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <FaGift style={{ color: accentColor }} />
            Choose your free resource:
          </h4>
          <div className="space-y-3">
            {leadMagnets.map(magnet => (
              <label
                key={magnet.id}
                className={`block p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedMagnet === magnet.id
                    ? 'border-teal-500 bg-teal-50 dark:bg-teal-900'
                    : 'border-gray-200 dark:border-gray-600 hover:border-teal-300'
                }`}
              >
                <input
                  type="radio"
                  name="leadMagnet"
                  value={magnet.id}
                  checked={selectedMagnet === magnet.id}
                  onChange={e => setSelectedMagnet(e.target.value)}
                  className="sr-only"
                />
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{magnet.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-semibold text-gray-900 dark:text-white">
                        {magnet.title}
                      </h5>
                      <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                        {magnet.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{magnet.description}</p>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Status Messages */}
      <AnimatePresence>
        {submitStatus && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mb-4 p-4 rounded-lg flex items-center gap-3 ${
              submitStatus === 'success'
                ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
            }`}
          >
            {submitStatus === 'success' ? (
              <FaCheckCircle className="flex-shrink-0" />
            ) : (
              <FaExclamationTriangle className="flex-shrink-0" />
            )}
            <span>
              {submitStatus === 'success'
                ? 'Success! Check your email for the download link and to confirm your subscription.'
                : 'Something went wrong. Please try again or contact me directly.'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <input
              type="text"
              placeholder="Your name"
              className={inputClasses('name')}
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              })}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="your@email.com"
              className={inputClasses('email')}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address',
                },
              })}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting || submitStatus === 'success'}
          className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
            isSubmitting || submitStatus === 'success'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'hover:shadow-lg transform hover:scale-[1.02]'
          }`}
          style={{
            backgroundColor: isSubmitting || submitStatus === 'success' ? undefined : accentColor,
          }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <FaSpinner className="animate-spin" />
              Subscribing...
            </span>
          ) : submitStatus === 'success' ? (
            <span className="flex items-center justify-center gap-2">
              <FaCheckCircle />
              Subscribed!
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <FaDownload />
              Get My Free Resource
            </span>
          )}
        </motion.button>
      </form>

      {/* Privacy Notice */}
      <p className="text-xs text-gray-500 text-center mt-4">
        No spam, unsubscribe at any time. I respect your privacy.
      </p>
    </div>
  );

  if (variant === 'modal') {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative"
          >
            <NewsletterForm />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return <NewsletterForm />;
};

export default NewsletterSignup;
