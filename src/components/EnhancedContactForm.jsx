import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  FaPaper,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaRocket,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner,
} from 'react-icons/fa';
import { trackEvent, trackContactForm } from '../utils/analytics';

const EnhancedContactForm = ({
  accentColor = '#14B8A6',
  textColor = '#1F2937',
  className = '',
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [selectedService, setSelectedService] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    mode: 'onBlur',
  });

  const watchedFields = watch();

  const services = [
    { value: 'web-development', label: 'Web Development', icon: '🌐' },
    { value: 'react-app', label: 'React Application', icon: '⚛️' },
    { value: 'wordpress', label: 'WordPress Site', icon: '📝' },
    { value: 'ui-ux-design', label: 'UI/UX Design', icon: '🎨' },
    { value: 'performance-optimization', label: 'Performance Optimization', icon: '⚡' },
    { value: 'consulting', label: 'Consulting', icon: '💡' },
    { value: 'other', label: 'Other', icon: '🤔' },
  ];

  const onSubmit = async data => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Prepare template parameters for EmailJS
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        phone: data.phone || 'Not provided',
        company: data.company || 'Not provided',
        service: selectedService
          ? services.find(s => s.value === selectedService)?.label
          : 'Not specified',
        budget: data.budget || 'Not specified',
        timeline: data.timeline || 'Not specified',
        message: data.message,
        to_email: import.meta.env.VITE_CONTACT_EMAIL || 'hello@chandrakantnagpure.com',
      };

      // Send email using EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus('success');
      reset();
      setSelectedService('');

      // Track successful form submission
      trackContactForm('enhanced_contact');
      trackEvent('contact_form_success', {
        category: 'Contact',
        label: 'Enhanced Contact Form',
        service: selectedService,
        has_phone: !!data.phone,
        has_company: !!data.company,
      });
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');

      trackEvent('contact_form_error', {
        category: 'Contact',
        label: 'Enhanced Contact Form',
        error_message: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldError = fieldName => {
    return errors[fieldName]?.message;
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

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Status Messages */}
        <AnimatePresence>
          {submitStatus && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`p-4 rounded-lg flex items-center gap-3 ${
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
                  ? "Thank you! Your message has been sent successfully. I'll get back to you soon."
                  : 'Sorry, there was an error sending your message. Please try again or contact me directly.'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Personal Information Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3
            className="text-xl font-semibold mb-4 flex items-center gap-2"
            style={{ color: accentColor }}
          >
            <FaUser />
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2"
                style={{ color: textColor }}
              >
                Full Name *
              </label>
              <input
                id="name"
                type="text"
                className={inputClasses('name')}
                placeholder="John Doe"
                {...register('name', {
                  required: 'Full name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters',
                  },
                })}
              />
              {getFieldError('name') && (
                <p className="mt-1 text-sm text-red-500">{getFieldError('name')}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2"
                style={{ color: textColor }}
              >
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                className={inputClasses('email')}
                placeholder="john@example.com"
                {...register('email', {
                  required: 'Email address is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address',
                  },
                })}
              />
              {getFieldError('email') && (
                <p className="mt-1 text-sm text-red-500">{getFieldError('email')}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium mb-2"
                style={{ color: textColor }}
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                className={inputClasses('phone')}
                placeholder="+1 (555) 123-4567"
                {...register('phone')}
              />
            </div>

            {/* Company */}
            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium mb-2"
                style={{ color: textColor }}
              >
                Company/Organization
              </label>
              <input
                id="company"
                type="text"
                className={inputClasses('company')}
                placeholder="Acme Corp"
                {...register('company')}
              />
            </div>
          </div>
        </div>

        {/* Project Information Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3
            className="text-xl font-semibold mb-4 flex items-center gap-2"
            style={{ color: accentColor }}
          >
            <FaRocket />
            Project Information
          </h3>

          {/* Service Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" style={{ color: textColor }}>
              What service are you interested in?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {services.map(service => (
                <button
                  key={service.value}
                  type="button"
                  onClick={() =>
                    setSelectedService(selectedService === service.value ? '' : service.value)
                  }
                  className={`p-3 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-1 text-sm ${
                    selectedService === service.value
                      ? 'border-teal-500 bg-teal-50 dark:bg-teal-900 text-teal-700 dark:text-teal-300'
                      : 'border-gray-200 dark:border-gray-600 hover:border-teal-300 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <span className="text-lg">{service.icon}</span>
                  <span>{service.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Budget */}
            <div>
              <label
                htmlFor="budget"
                className="block text-sm font-medium mb-2"
                style={{ color: textColor }}
              >
                Project Budget
              </label>
              <select id="budget" className={inputClasses('budget')} {...register('budget')}>
                <option value="">Select budget range</option>
                <option value="under-5k">Under $5,000</option>
                <option value="5k-10k">$5,000 - $10,000</option>
                <option value="10k-25k">$10,000 - $25,000</option>
                <option value="25k-50k">$25,000 - $50,000</option>
                <option value="50k-plus">$50,000+</option>
                <option value="discuss">Let's discuss</option>
              </select>
            </div>

            {/* Timeline */}
            <div>
              <label
                htmlFor="timeline"
                className="block text-sm font-medium mb-2"
                style={{ color: textColor }}
              >
                Project Timeline
              </label>
              <select id="timeline" className={inputClasses('timeline')} {...register('timeline')}>
                <option value="">Select timeline</option>
                <option value="asap">ASAP</option>
                <option value="1-month">Within 1 month</option>
                <option value="2-3-months">2-3 months</option>
                <option value="3-6-months">3-6 months</option>
                <option value="6-months-plus">6+ months</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
          </div>
        </div>

        {/* Message Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3
            className="text-xl font-semibold mb-4 flex items-center gap-2"
            style={{ color: accentColor }}
          >
            <FaPaper />
            Project Details
          </h3>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium mb-2"
              style={{ color: textColor }}
            >
              Tell me about your project *
            </label>
            <textarea
              id="message"
              rows={6}
              className={inputClasses('message')}
              placeholder="Please describe your project, goals, and any specific requirements..."
              {...register('message', {
                required: 'Please tell me about your project',
                minLength: {
                  value: 20,
                  message: 'Please provide more details (at least 20 characters)',
                },
              })}
            />
            {getFieldError('message') && (
              <p className="mt-1 text-sm text-red-500">{getFieldError('message')}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              {watchedFields.message?.length || 0} characters
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'hover:shadow-lg transform hover:scale-105'
            } text-white`}
            style={{
              backgroundColor: isSubmitting ? undefined : accentColor,
            }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <FaSpinner className="animate-spin" />
                Sending...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <FaPaper />
                Send Message
              </span>
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default EnhancedContactForm;
