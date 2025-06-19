import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTech } from "./TechContext";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

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
  rest: { boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)" },
  focus: {
    boxShadow: "0 0 8px 2px rgba(59, 130, 246, 0.5)",
    transition: { duration: 0.3 },
  },
};

// Contrast text color function
const getContrastTextColor = (bgColor) => {
  if (!bgColor) return "#111"; // default to dark
  const color = bgColor.substring(1);
  const rgb = parseInt(color, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? "#111" : "#fff";
};

function Contact() {
  const { selectedTech, techColors, bgColor } = useTech();
  const textColor = getContrastTextColor(bgColor);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState({
    name: false,
    email: false,
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
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
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
      const data = new FormData(e.target);
      const response = await fetch(e.target.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setFocused({ name: false, email: false, message: false });
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        setSubmitError("Failed to send message. Please try again.");
      }
    } catch (error) {
      setSubmitError("An error occurred. Please try again.");
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
      color: techColors.linkedin || "#0A66C2",
    },
    {
      icon: FaTwitter,
      label: "Twitter",
      url: "https://twitter.com/dummyuser",
      color: techColors.twitter || "#1DA1F2",
    },
    {
      icon: FaEnvelope,
      label: "Email",
      url: "mailto:dummyuser@example.com",
      color: techColors.email || "#D14836",
    },
  ];

  const primaryColor = techColors[selectedTech] || "#4B5563";
  const secondaryColor = "#6B7280";
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
        <motion.div
          className="flex flex-col justify-center"
          variants={itemVariants}
        >
          <motion.form
            ref={formRef}
            action="https://formsubmit.co/your-email@example.com"
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

            <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Name Field */}
              <div className="relative">
                <label htmlFor="name" className={`block text-sm font-medium mb-1 ${errors.name ? "text-red-500" : "text-gray-600"}`}>
                  Name
                </label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus("name")}
                  onBlur={() => handleBlur("name")}
                  placeholder="Your Name"
                  className={`w-full px-4 py-2 rounded-lg bg-gray-50 border ${errors.name ? "border-red-500" : "border-gray-200 focus:border-blue-500"} focus:outline-none transition-all duration-300`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  variants={inputVariants}
                  initial="rest"
                  animate={focused.name ? "focus" : "rest"}
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.p id="name-error" className="text-red-500 text-xs mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {errors.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Email Field */}
              <div className="relative">
                <label htmlFor="email" className={`block text-sm font-medium mb-1 ${errors.email ? "text-red-500" : "text-gray-600"}`}>
                  Email
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus("email")}
                  onBlur={() => handleBlur("email")}
                  placeholder="Your Email"
                  className={`w-full px-4 py-2 rounded-lg bg-gray-50 border ${errors.email ? "border-red-500" : "border-gray-200 focus:border-blue-500"} focus:outline-none transition-all duration-300`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  variants={inputVariants}
                  initial="rest"
                  animate={focused.email ? "focus" : "rest"}
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p id="email-error" className="text-red-500 text-xs mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Message Field */}
            <div className="relative mb-6">
              <label htmlFor="message" className={`block text-sm font-medium mb-1 ${errors.message ? "text-red-500" : "text-gray-600"}`}>
                Message
              </label>
              <motion.textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => handleFocus("message")}
                onBlur={() => handleBlur("message")}
                placeholder="Your Message"
                rows={4}
                className={`w-full px-4 py-2 rounded-lg bg-gray-50 border ${errors.message ? "border-red-500" : "border-gray-200 focus:border-blue-500"} focus:outline-none transition-all duration-300`}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                variants={inputVariants}
                initial="rest"
                animate={focused.message ? "focus" : "rest"}
              />
              <AnimatePresence>
                {errors.message && (
                  <motion.p id="message-error" className="text-red-500 text-xs mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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
          </motion.form>
        </motion.div>

        {/* Info Column */}
        <motion.div className="flex flex-col justify-center text-center lg:text-left" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: textColor }}>
            Let’s Build Something Amazing
          </h2>
          <p className="text-lg mb-8" style={{ color: textColor }}>
            Have a project idea or just want to chat? Reach out via the form or connect with me directly.
          </p>
          <div className="mb-8">
            <h4 className="text-xl font-semibold mb-4" style={{ color: textColor }}>
              Contact Info
            </h4>
            <p className="text-base" style={{ color: textColor }}>
              <a href="mailto:dummyuser@example.com" className="hover:underline" style={{ color: primaryColor }}>
                dummyuser@example.com
              </a>
            </p>
            <p className="text-base" style={{ color: textColor }}>
              <a href="https://linkedin.com/in/dummyuser" className="hover:underline" style={{ color: primaryColor }}>
                linkedin.com/in/dummyuser
              </a>
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4" style={{ color: textColor }}>
              Follow Me
            </h4>
            <div className="flex justify-center lg:justify-start gap-4">
              {socialLinks.map(({ icon: Icon, label, url, color }) => (
                <motion.a
                  key={label}
                  href={url}
                  className="relative p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Visit my ${label} profile`}
                >
                  <Icon size={24} style={{ color, transition: "color 0.2s" }} className="hover:brightness-110" />
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
