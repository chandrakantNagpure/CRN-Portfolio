import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLaptopCode,
  FaDollarSign,
  FaClock,
  FaRocket,
  FaCheckCircle,
  FaPaperPlane,
} from 'react-icons/fa';

const LeadCaptureForm = ({ onSubmit, variant = 'default' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
    urgency: 'normal',
    source: 'website',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const projectTypes = [
    { value: 'react', label: 'React Application', icon: '⚛️', popular: true },
    { value: 'wordpress', label: 'WordPress Website', icon: '📝', popular: true },
    { value: 'ecommerce', label: 'E-commerce Store', icon: '🛒', popular: true },
    { value: 'fullstack', label: 'Full-Stack Application', icon: '🔧', popular: false },
    { value: 'landing', label: 'Landing Page', icon: '📄', popular: false },
    { value: 'redesign', label: 'Website Redesign', icon: '🎨', popular: false },
    { value: 'maintenance', label: 'Website Maintenance', icon: '⚙️', popular: false },
    { value: 'other', label: 'Other', icon: '💡', popular: false },
  ];

  const budgetRanges = [
    { value: '500-1500', label: '$500 - $1,500', description: 'Small projects' },
    { value: '1500-3000', label: '$1,500 - $3,000', description: 'Medium projects' },
    { value: '3000-7000', label: '$3,000 - $7,000', description: 'Large projects' },
    { value: '7000+', label: '$7,000+', description: 'Enterprise projects' },
    { value: 'discuss', label: "Let's discuss", description: 'Not sure yet' },
  ];

  const timelines = [
    { value: 'urgent', label: 'ASAP (Rush job)', icon: '🔥', extra: '+25% fee' },
    { value: 'week', label: 'Within 1 week', icon: '⚡' },
    { value: '2weeks', label: '2-3 weeks', icon: '📅' },
    { value: 'month', label: '1 month', icon: '📆' },
    { value: 'flexible', label: 'Flexible timeline', icon: '🕒' },
  ];

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Here you would typically send to your backend or email service
    console.log('Form submitted:', formData);

    setIsSubmitting(false);
    setIsSubmitted(true);

    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const getEstimatedPrice = () => {
    const basePrice = {
      react: 2000,
      wordpress: 800,
      ecommerce: 1500,
      fullstack: 3500,
      landing: 500,
      redesign: 1200,
      maintenance: 300,
      other: 1000,
    };

    const timelineMultiplier = {
      urgent: 1.25,
      week: 1.1,
      '2weeks': 1,
      month: 0.95,
      flexible: 0.9,
    };

    const base = basePrice[formData.projectType] || 1000;
    const multiplier = timelineMultiplier[formData.timeline] || 1;

    return Math.round(base * multiplier);
  };

  if (isSubmitted) {
    return (
      <motion.div
        className="bg-white rounded-2xl shadow-xl p-8 max-w-lg mx-auto text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaCheckCircle size={40} color="#10B981" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Thank You! 🎉</h3>
        <p className="text-gray-600 mb-6">
          I've received your project details and will get back to you within 2 hours with a detailed
          proposal and next steps.
        </p>
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>✓ I'll review your project requirements</li>
            <li>✓ Prepare a detailed proposal with timeline</li>
            <li>✓ Schedule a free consultation call</li>
            <li>✓ Send you my portfolio of similar projects</li>
          </ul>
        </div>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setCurrentStep(1);
            setFormData({
              name: '',
              email: '',
              phone: '',
              company: '',
              projectType: '',
              budget: '',
              timeline: '',
              description: '',
              urgency: 'normal',
              source: 'website',
            });
          }}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Submit Another Project
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <h3 className="text-2xl font-bold mb-2">Get Your Free Project Quote</h3>
        <p className="text-blue-100">Tell me about your project and get an instant estimate</p>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>Step {currentStep} of 3</span>
            <span>{Math.round((currentStep / 3) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-blue-700 rounded-full h-2">
            <div
              className="bg-white rounded-full h-2 transition-all duration-500"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-xl font-semibold mb-6">Let's start with your details</h4>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaUser className="inline mr-2" />
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaEnvelope className="inline mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaPhone className="inline mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company/Organization
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your Company"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Project Details */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-xl font-semibold mb-6">Tell me about your project</h4>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <FaLaptopCode className="inline mr-2" />
                Project Type *
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {projectTypes.map(type => (
                  <div key={type.value} className="relative">
                    <input
                      type="radio"
                      name="projectType"
                      value={type.value}
                      onChange={handleInputChange}
                      className="sr-only"
                      id={type.value}
                    />
                    <label
                      htmlFor={type.value}
                      className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.projectType === type.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{type.icon}</span>
                        <div>
                          <div className="font-medium">{type.label}</div>
                          {type.popular && (
                            <div className="text-xs text-green-600 font-medium">Popular Choice</div>
                          )}
                        </div>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <FaDollarSign className="inline mr-2" />
                Budget Range *
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {budgetRanges.map(budget => (
                  <div key={budget.value}>
                    <input
                      type="radio"
                      name="budget"
                      value={budget.value}
                      onChange={handleInputChange}
                      className="sr-only"
                      id={budget.value}
                    />
                    <label
                      htmlFor={budget.value}
                      className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.budget === budget.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="font-medium">{budget.label}</div>
                      <div className="text-sm text-gray-500">{budget.description}</div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <FaClock className="inline mr-2" />
                Timeline *
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {timelines.map(timeline => (
                  <div key={timeline.value}>
                    <input
                      type="radio"
                      name="timeline"
                      value={timeline.value}
                      onChange={handleInputChange}
                      className="sr-only"
                      id={timeline.value}
                    />
                    <label
                      htmlFor={timeline.value}
                      className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.timeline === timeline.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="mr-2">{timeline.icon}</span>
                          {timeline.label}
                        </div>
                        {timeline.extra && (
                          <span className="text-xs text-orange-600 font-medium">
                            {timeline.extra}
                          </span>
                        )}
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Project Description */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-xl font-semibold mb-6">Project Description</h4>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Describe your project in detail *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Please describe your project requirements, goals, features needed, design preferences, target audience, and any specific technical requirements..."
              />
              <div className="text-sm text-gray-500 mt-1">
                Minimum 50 characters ({formData.description.length}/50)
              </div>
            </div>

            {/* Estimated Price */}
            {formData.projectType && formData.timeline && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h5 className="font-semibold text-green-800 mb-2">💰 Estimated Project Cost</h5>
                <div className="text-2xl font-bold text-green-700">
                  ${getEstimatedPrice().toLocaleString()}
                </div>
                <div className="text-sm text-green-600 mt-1">
                  *This is a rough estimate. Final price will be determined after detailed
                  consultation.
                </div>
              </div>
            )}

            <div className="bg-blue-50 rounded-lg p-4">
              <h5 className="font-semibold text-blue-800 mb-2">🚀 Why Choose Me?</h5>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>✓ 100% Job Success Rate on Upwork</li>
                <li>✓ 5+ Years of Experience</li>
                <li>✓ Fast Turnaround Time</li>
                <li>✓ Free Revisions Included</li>
                <li>✓ 24/7 Support During Project</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              currentStep === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            Previous
          </button>

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={
                (currentStep === 1 && (!formData.name || !formData.email)) ||
                (currentStep === 2 &&
                  (!formData.projectType || !formData.budget || !formData.timeline))
              }
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              Next Step <FaRocket />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting || formData.description.length < 50}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  Submitting...
                </>
              ) : (
                <>
                  Get My Quote <FaPaperPlane />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default LeadCaptureForm;
