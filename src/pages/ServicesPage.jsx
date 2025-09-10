import { motion } from "framer-motion";
// import { useLanguage } from "../contexts/LanguageContext";
import { useTech } from "../components/TechContext";
import { 
  FaReact, 
  FaWordpress, 
  FaPhp, 
  FaCode, 
  FaRocket, 
  FaClock, 
  FaDollarSign,
  FaCheckCircle,
  FaArrowRight,
  FaStar
} from "react-icons/fa";
import { SiUpwork, SiFiverr } from "react-icons/si";
import { Link } from "react-router-dom";
import StickyContact from "../components/StickyContact";
import ChatBot from "../components/ChatBot";

const ServicesPage = () => {
  // const { t } = useLanguage();
  const { techColors } = useTech();

  const services = [
    {
      icon: FaReact,
      title: "React Development",
      description: "Custom React applications with modern hooks, context API, and performance optimization",
      features: [
        "Single Page Applications (SPA)",
        "Component-based architecture",
        "State management with Redux/Context",
        "API integration",
        "Performance optimization"
      ],
      price: "Starting at $25/hour",
      color: techColors.react,
      platforms: ["upwork", "freelancer", "fiverr"]
    },
    {
      icon: FaWordpress,
      title: "WordPress Development",
      description: "Custom WordPress themes, plugins, and full website development",
      features: [
        "Custom theme development",
        "Plugin development & customization",
        "WooCommerce integration",
        "SEO optimization",
        "Performance optimization"
      ],
      price: "Starting at $20/hour",
      color: techColors.wordpress,
      platforms: ["upwork", "freelancer", "fiverr"]
    },
    {
      icon: FaCode,
      title: "Frontend Development",
      description: "Modern, responsive websites with cutting-edge technologies",
      features: [
        "HTML5, CSS3, JavaScript",
        "Responsive design",
        "Cross-browser compatibility",
        "Performance optimization",
        "UI/UX implementation"
      ],
      price: "Starting at $22/hour",
      color: techColors.javascript,
      platforms: ["upwork", "freelancer"]
    },
    {
      icon: FaRocket,
      title: "Full Stack Development",
      description: "End-to-end web application development with modern technologies",
      features: [
        "Frontend + Backend development",
        "Database design & integration",
        "API development",
        "Deployment & hosting setup",
        "Maintenance & support"
      ],
      price: "Starting at $30/hour",
      color: "#FF6B6B",
      platforms: ["upwork", "freelancer"]
    }
  ];

  const packages = [
    {
      name: "Starter Website",
      price: "$299",
      description: "Perfect for small businesses and personal brands",
      features: [
        "5-page responsive website",
        "Mobile-friendly design",
        "Basic SEO setup",
        "Contact form",
        "2 revisions",
        "7-day delivery"
      ],
      popular: false
    },
    {
      name: "Business Website",
      price: "$599",
      description: "Ideal for growing businesses and e-commerce",
      features: [
        "10-page responsive website",
        "Custom design & branding",
        "Advanced SEO optimization",
        "E-commerce integration",
        "Admin panel",
        "5 revisions",
        "14-day delivery"
      ],
      popular: true
    },
    {
      name: "Premium Web App",
      price: "$1,299",
      description: "For complex applications and enterprise solutions",
      features: [
        "Custom web application",
        "User authentication",
        "Database integration",
        "Admin dashboard",
        "API integration",
        "Unlimited revisions",
        "30-day delivery"
      ],
      popular: false
    }
  ];

  const platformLinks = {
    upwork: "https://www.upwork.com/freelancers/chandrakant-nagpure",
    freelancer: "https://www.freelancer.com/u/chandrakant-nagpure",
    fiverr: "https://fiverr.com/chandrakant_dev"
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Professional Web Development Services
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transform your ideas into powerful, scalable web solutions. 
            5+ years experience • 50+ satisfied clients • 100% job success rate
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a
              href={platformLinks.upwork}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-full font-semibold transition-colors flex items-center gap-2"
            >
              <SiUpwork /> Hire on Upwork
            </a>
            <a
              href={platformLinks.fiverr}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-400 hover:bg-green-500 px-6 py-3 rounded-full font-semibold transition-colors flex items-center gap-2"
            >
              <SiFiverr /> Order on Fiverr
            </a>
            <Link
              to="/contact"
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-full font-semibold transition-colors"
            >
              Get Free Quote
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              My Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Specialized web development services tailored to your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <service.icon 
                    size={32} 
                    color={service.color} 
                    className="mr-3"
                  />
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-700">
                      <FaCheckCircle size={12} color="#10B981" className="mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="border-t pt-4">
                  <p className="font-semibold text-lg" style={{ color: service.color }}>
                    {service.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Package Pricing Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Fixed Price Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the perfect package for your project needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                className={`bg-white rounded-xl shadow-lg p-8 relative ${
                  pkg.popular ? 'ring-4 ring-blue-500 scale-105' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <div className="text-4xl font-bold text-blue-600 mb-2">{pkg.price}</div>
                  <p className="text-gray-600">{pkg.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <FaCheckCircle size={16} color="#10B981" className="mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Me Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Me?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaStar size={24} color="#3B82F6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Job Success Rate</h3>
              <p className="text-gray-600">Perfect track record on Upwork with 5-star reviews from all clients</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaClock size={24} color="#10B981" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Always deliver projects on time or ahead of schedule</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaRocket size={24} color="#8B5CF6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Modern Technologies</h3>
              <p className="text-gray-600">Using latest tech stack for scalable, future-proof solutions</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8">
            Let's discuss your requirements and bring your vision to life
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold transition-colors flex items-center gap-2"
            >
              Get Free Consultation <FaArrowRight />
            </Link>
            <a
              href={platformLinks.upwork}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full font-semibold transition-colors"
            >
              View Upwork Profile
            </a>
          </div>
        </div>
      </section>
      
      {/* Sticky Contact */}
      <StickyContact />
      
      {/* ChatBot */}
      <ChatBot />
    </div>
  );
};

export default ServicesPage;
