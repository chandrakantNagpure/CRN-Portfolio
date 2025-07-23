import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTech } from "../components/TechContext";
import ParticleCanvas from "../components/ParticleCanvas";
import ResumeButton from "../components/ResumeButton";
import Footer from "../components/Footer";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { useLanguage } from "../contexts/LanguageContext";

const getContrastTextColor = (bgColor) => {
  if (!bgColor) return "#111";
  const color = bgColor.substring(1);
  const rgb = parseInt(color, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? "#111" : "#fff";
};

function ContactPage() {
  const { t } = useLanguage();
  const { selectedTech, techColors, bgColor } = useTech();
  const textColor = getContrastTextColor(bgColor);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSubmitError("");
  };

  const handleFocus = (name) => {
    setFocused((prev) => ({ ...prev, [name]: true }));
  };

  const handleBlur = (name) => {
    setFocused((prev) => ({
      ...prev,
      [name]: formData[name].trim() !== "",
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
    if (!formData.subject.trim()) newErrors.subject = t('contact.form.errors.subjectRequired');
    if (!formData.message.trim()) newErrors.message = t('contact.form.errors.messageRequired');
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setFocused({ name: false, email: false, subject: false, message: false });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      setSubmitError(t('contact.form.error'));
    }
  };

  const socialLinks = [
    {
      icon: FaGithub,
      label: "GitHub",
      url: "https://github.com/dummyuser",
      color: techColors.github || "#181717",
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      url: "https://linkedin.com/in/dummyuser",
      color: "#0A66C2",
    },
    {
      icon: FaTwitter,
      label: "Twitter",
      url: "https://twitter.com/dummyuser",
      color: "#1DA1F2",
    },
    {
      icon: FaEnvelope,
      label: "Email",
      url: "mailto:dummyuser@example.com",
      color: "#D14836",
    },
  ];

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: t('contact.info.email'),
      value: "dummyuser@example.com",
      link: "mailto:dummyuser@example.com",
    },
    {
      icon: FaPhone,
      label: t('contact.info.phone'),
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: FaMapMarkerAlt,
      label: t('contact.info.location'),
      value: "San Francisco, CA",
      link: null,
    },
  ];

  const primaryColor = techColors[selectedTech] || "#4B5563";
  const secondaryColor = "#6B7280";

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 md:px-16 py-20 relative font-poppins overflow-hidden"
      style={{
        background: bgColor
          ? `linear-gradient(to right, ${bgColor}33, ${bgColor})`
          : `linear-gradient(to right, #ffffff33, #ffffff)`,
        color: textColor,
      }}
    >
      <ParticleCanvas bgColor={bgColor || "#4B5563"} />

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

            <h2 className="text-2xl font-bold mb-8" style={{ color: "#000" }}>
              {t('contact.form.title')}
            </h2>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="relative">
                  <label
                    htmlFor="name"
                    className={`block text-sm font-medium mb-2 ${
                      errors.name ? "text-red-500" : "text-gray-700"
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
                    onFocus={() => handleFocus("name")}
                    onBlur={() => handleBlur("name")}
                    placeholder={t('contact.form.placeholders.name')}
                    className={`w-full px-4 py-3 rounded-lg bg-white border ${
                      errors.name
                        ? "border-red-500"
                        : "border-gray-200 focus:border-blue-500"
                    } focus:outline-none transition-all duration-300`}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div className="relative">
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium mb-2 ${
                      errors.email ? "text-red-500" : "text-gray-700"
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
                    onFocus={() => handleFocus("email")}
                    onBlur={() => handleBlur("email")}
                    placeholder={t('contact.form.placeholders.email')}
                    className={`w-full px-4 py-3 rounded-lg bg-white border ${
                      errors.email
                        ? "border-red-500"
                        : "border-gray-200 focus:border-blue-500"
                    } focus:outline-none transition-all duration-300`}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Subject Field */}
              <div className="relative">
                <label
                  htmlFor="subject"
                  className={`block text-sm font-medium mb-2 ${
                    errors.subject ? "text-red-500" : "text-gray-700"
                  }`}
                >
                  {t('contact.form.subject')} {t('contact.form.required')}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => handleFocus("subject")}
                  onBlur={() => handleBlur("subject")}
                  placeholder={t('contact.form.placeholders.subject')}
                  className={`w-full px-4 py-3 rounded-lg bg-white border ${
                    errors.subject
                      ? "border-red-500"
                      : "border-gray-200 focus:border-blue-500"
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
                    errors.message ? "text-red-500" : "text-gray-700"
                  }`}
                >
                  {t('contact.form.message')} {t('contact.form.required')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus("message")}
                  onBlur={() => handleBlur("message")}
                  placeholder={t('contact.form.placeholders.message')}
                  rows={6}
                  className={`w-full px-4 py-3 rounded-lg bg-white border ${
                    errors.message
                      ? "border-red-500"
                      : "border-gray-200 focus:border-blue-500"
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
              <h3
                className="text-2xl font-bold mb-6 font-orbitron"
                style={{ color: textColor }}
              >
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
                        <p style={{ color: "#000", opacity: 0.8 }}>{value}</p>
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
      <Footer />
    </div>
  );
}

export default ContactPage;