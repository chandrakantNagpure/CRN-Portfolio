import { createContext, useContext, useState, useEffect } from 'react';

// Language translations
const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      contact: 'Contact'
    },
    
    // Hero Section
    hero: {
      greeting: "Hi, I'm Chandrakant Nagpure",
      titles: {
        react: "React Developer",
        nextjs: "Next.js Developer",
        tailwind: "Tailwind CSS Developer",
        wordpress: "WordPress Expert",
        php: "PHP Developer",
        javascript: "JavaScript Developer",
        github: "GitHub Specialist",
        figma: "UI/UX Designer",
        photoshop: "Graphic Designer",
        gsap: "Animation Developer",
        framer: "Framer Motion Expert",
        default: [
          "Frontend Developer",
          "WordPress Expert",
          "React Enthusiast",
          "UI/UX Designer",
          "Freelancer"
        ]
      },
      descriptions: {
        react: "Expert React developer building fast, scalable, and user-friendly web applications with modern JavaScript frameworks.",
        nextjs: "Specialized in Next.js for server-side rendering and static site generation, optimizing performance and SEO.",
        tailwind: "Proficient in Tailwind CSS for rapid, responsive, and visually appealing UI development.",
        wordpress: "Experienced WordPress developer creating custom themes, plugins, and SEO-optimized websites.",
        php: "Skilled PHP developer building dynamic, server-side web applications and custom CMS solutions.",
        javascript: "Advanced JavaScript developer crafting interactive and performant web experiences.",
        github: "Proficient in GitHub for version control, collaboration, and open-source contributions.",
        figma: "Expert in Figma for designing intuitive and visually stunning UI/UX prototypes.",
        photoshop: "Skilled in Adobe Photoshop for creating high-quality graphics and visual assets.",
        gsap: "Experienced in GSAP for creating smooth, engaging animations for web applications.",
        framer: "Proficient in Framer Motion for building advanced, interactive web animations.",
        default: "Versatile frontend developer with expertise in React, WordPress, UI/UX design, and modern web technologies."
      },
      cta: "Let's Work Together",
      downloadResume: "Download Resume",
      viewResume: "View"
    },

    // About Section
    about: {
      title: "About Me",
      myStory: "My Story",
      coreSkills: "Core Skills",
      experience: "5+ Years of Experience",
      projectsCompleted: "50+ Projects Completed",
      fullStack: "Full-Stack Development",
      cta: "Let's Build Something Amazing Together",
      getInTouch: "Get In Touch",
      skillDescriptions: {
        react: [
          { name: "Components", description: "Building reusable, modular React components for scalable applications." },
          { name: "State", description: "Managing complex state with Redux and Context API for robust UIs." },
          { name: "Hooks", description: "Leveraging React Hooks for efficient, functional component logic." }
        ],
        nextjs: [
          { name: "SSR", description: "Implementing server-side rendering for SEO and performance." },
          { name: "SSG", description: "Using static site generation for fast, pre-rendered pages." },
          { name: "API Routes", description: "Creating dynamic API routes for seamless backend integration." }
        ],
        default: [
          { name: "Frontend", description: "Developing modern, responsive frontend applications." },
          { name: "UI/UX", description: "Designing intuitive and visually appealing user interfaces." },
          { name: "Full-Stack", description: "Building end-to-end web solutions with frontend and backend expertise." }
        ]
      }
    },

    // Projects Section
    projects: {
      title: "My Projects",
      subtitle: "A showcase of my work spanning web development, design, and digital solutions. Each project represents a unique challenge and creative solution.",
      filters: {
        all: "All Projects",
        featured: "Featured",
        react: "React",
        nextjs: "Next.js",
        wordpress: "WordPress",
        javascript: "JavaScript"
      },
      viewDetails: "View Details",
      liveDemo: "Live Demo",
      github: "GitHub",
      share: "Share",
      copyLink: "Copy Link",
      linkCopied: "Link copied!",
      cta: "Have a Project in Mind?",
      collaborate: "Let's Collaborate",
      noProjects: "No projects found for the selected filter."
    },

    // Contact Section
    contact: {
      title: "Get In Touch",
      subtitle: "Ready to bring your ideas to life? Let's discuss your project and create something amazing together.",
      form: {
        title: "Send Me a Message",
        name: "Name",
        email: "Email",
        subject: "Subject",
        message: "Message",
        send: "Send Message",
        required: "*",
        placeholders: {
          name: "Your Name",
          email: "your.email@example.com",
          subject: "Project Discussion",
          message: "Tell me about your project..."
        },
        errors: {
          nameRequired: "Name is required",
          emailRequired: "Email is required",
          emailInvalid: "Invalid email format",
          subjectRequired: "Subject is required",
          messageRequired: "Message is required"
        },
        success: "Thank you for your message! I'll get back to you soon.",
        error: "An error occurred. Please try again."
      },
      info: {
        title: "Contact Information",
        email: "Email",
        phone: "Phone",
        location: "Location"
      },
      resume: {
        title: "Download My Resume",
        description: "Get a detailed overview of my experience, skills, and projects."
      },
      social: {
        title: "Connect With Me"
      },
      availability: {
        title: "Availability",
        status: "Available for new projects",
        description: "I'm currently accepting new freelance projects and collaborations. Let's discuss how we can work together!"
      }
    },

    // Footer
    footer: {
      madeWith: "Made with",
      and: "and",
      passion: "passion",
      copyright: "All rights reserved.",
      tagline: "Building amazing web experiences with modern technologies"
    },

    // Status Indicator
    status: {
      available: "Available for work",
      busy: "Currently busy",
      away: "Away",
      descriptions: {
        available: "Open to new opportunities and projects",
        busy: "Working on existing projects",
        away: "Not available at the moment"
      },
      lastUpdated: "Last updated:"
    },

    // Resume
    resume: {
      downloading: "Downloading...",
      downloaded: "Resume downloaded successfully!"
    }
  },

  es: {
    // Navigation
    nav: {
      home: 'Inicio',
      about: 'Acerca de',
      projects: 'Proyectos',
      contact: 'Contacto'
    },
    
    // Hero Section
    hero: {
      greeting: "Hola, soy Chandrakant Nagpure",
      titles: {
        react: "Desarrollador React",
        nextjs: "Desarrollador Next.js",
        tailwind: "Desarrollador Tailwind CSS",
        wordpress: "Experto en WordPress",
        php: "Desarrollador PHP",
        javascript: "Desarrollador JavaScript",
        github: "Especialista en GitHub",
        figma: "Diseñador UI/UX",
        photoshop: "Diseñador Gráfico",
        gsap: "Desarrollador de Animaciones",
        framer: "Experto en Framer Motion",
        default: [
          "Desarrollador Frontend",
          "Experto en WordPress",
          "Entusiasta de React",
          "Diseñador UI/UX",
          "Freelancer"
        ]
      },
      descriptions: {
        react: "Desarrollador React experto construyendo aplicaciones web rápidas, escalables y fáciles de usar con frameworks JavaScript modernos.",
        nextjs: "Especializado en Next.js para renderizado del lado del servidor y generación de sitios estáticos, optimizando rendimiento y SEO.",
        tailwind: "Competente en Tailwind CSS para desarrollo de UI rápido, responsivo y visualmente atractivo.",
        wordpress: "Desarrollador WordPress experimentado creando temas personalizados, plugins y sitios web optimizados para SEO.",
        php: "Desarrollador PHP hábil construyendo aplicaciones web dinámicas del lado del servidor y soluciones CMS personalizadas.",
        javascript: "Desarrollador JavaScript avanzado creando experiencias web interactivas y de alto rendimiento.",
        github: "Competente en GitHub para control de versiones, colaboración y contribuciones de código abierto.",
        figma: "Experto en Figma para diseñar prototipos UI/UX intuitivos y visualmente impresionantes.",
        photoshop: "Hábil en Adobe Photoshop para crear gráficos de alta calidad y activos visuales.",
        gsap: "Experimentado en GSAP para crear animaciones suaves y atractivas para aplicaciones web.",
        framer: "Competente en Framer Motion para construir animaciones web avanzadas e interactivas.",
        default: "Desarrollador frontend versátil con experiencia en React, WordPress, diseño UI/UX y tecnologías web modernas."
      },
      cta: "Trabajemos Juntos",
      downloadResume: "Descargar CV",
      viewResume: "Ver"
    },

    // About Section
    about: {
      title: "Acerca de Mí",
      myStory: "Mi Historia",
      coreSkills: "Habilidades Principales",
      experience: "5+ Años de Experiencia",
      projectsCompleted: "50+ Proyectos Completados",
      fullStack: "Desarrollo Full-Stack",
      cta: "Construyamos Algo Increíble Juntos",
      getInTouch: "Ponte en Contacto",
      skillDescriptions: {
        react: [
          { name: "Componentes", description: "Construyendo componentes React reutilizables y modulares para aplicaciones escalables." },
          { name: "Estado", description: "Gestionando estado complejo con Redux y Context API para UIs robustas." },
          { name: "Hooks", description: "Aprovechando React Hooks para lógica de componentes funcionales eficiente." }
        ],
        nextjs: [
          { name: "SSR", description: "Implementando renderizado del lado del servidor para SEO y rendimiento." },
          { name: "SSG", description: "Usando generación de sitios estáticos para páginas rápidas y pre-renderizadas." },
          { name: "Rutas API", description: "Creando rutas API dinámicas para integración backend sin problemas." }
        ],
        default: [
          { name: "Frontend", description: "Desarrollando aplicaciones frontend modernas y responsivas." },
          { name: "UI/UX", description: "Diseñando interfaces de usuario intuitivas y visualmente atractivas." },
          { name: "Full-Stack", description: "Construyendo soluciones web de extremo a extremo con experiencia frontend y backend." }
        ]
      }
    },

    // Projects Section
    projects: {
      title: "Mis Proyectos",
      subtitle: "Una muestra de mi trabajo abarcando desarrollo web, diseño y soluciones digitales. Cada proyecto representa un desafío único y una solución creativa.",
      filters: {
        all: "Todos los Proyectos",
        featured: "Destacados",
        react: "React",
        nextjs: "Next.js",
        wordpress: "WordPress",
        javascript: "JavaScript"
      },
      viewDetails: "Ver Detalles",
      liveDemo: "Demo en Vivo",
      github: "GitHub",
      share: "Compartir",
      copyLink: "Copiar Enlace",
      linkCopied: "¡Enlace copiado!",
      cta: "¿Tienes un Proyecto en Mente?",
      collaborate: "Colaboremos",
      noProjects: "No se encontraron proyectos para el filtro seleccionado."
    },

    // Contact Section
    contact: {
      title: "Ponte en Contacto",
      subtitle: "¿Listo para dar vida a tus ideas? Hablemos sobre tu proyecto y creemos algo increíble juntos.",
      form: {
        title: "Envíame un Mensaje",
        name: "Nombre",
        email: "Email",
        subject: "Asunto",
        message: "Mensaje",
        send: "Enviar Mensaje",
        required: "*",
        placeholders: {
          name: "Tu Nombre",
          email: "tu.email@ejemplo.com",
          subject: "Discusión de Proyecto",
          message: "Cuéntame sobre tu proyecto..."
        },
        errors: {
          nameRequired: "El nombre es requerido",
          emailRequired: "El email es requerido",
          emailInvalid: "Formato de email inválido",
          subjectRequired: "El asunto es requerido",
          messageRequired: "El mensaje es requerido"
        },
        success: "¡Gracias por tu mensaje! Te responderé pronto.",
        error: "Ocurrió un error. Por favor intenta de nuevo."
      },
      info: {
        title: "Información de Contacto",
        email: "Email",
        phone: "Teléfono",
        location: "Ubicación"
      },
      resume: {
        title: "Descargar Mi CV",
        description: "Obtén una descripción detallada de mi experiencia, habilidades y proyectos."
      },
      social: {
        title: "Conéctate Conmigo"
      },
      availability: {
        title: "Disponibilidad",
        status: "Disponible para nuevos proyectos",
        description: "Actualmente acepto nuevos proyectos freelance y colaboraciones. ¡Hablemos sobre cómo podemos trabajar juntos!"
      }
    },

    // Footer
    footer: {
      madeWith: "Hecho con",
      and: "y",
      passion: "pasión",
      copyright: "Todos los derechos reservados.",
      tagline: "Construyendo experiencias web increíbles con tecnologías modernas"
    },

    // Status Indicator
    status: {
      available: "Disponible para trabajar",
      busy: "Actualmente ocupado",
      away: "Ausente",
      descriptions: {
        available: "Abierto a nuevas oportunidades y proyectos",
        busy: "Trabajando en proyectos existentes",
        away: "No disponible en este momento"
      },
      lastUpdated: "Última actualización:"
    },

    // Resume
    resume: {
      downloading: "Descargando...",
      downloaded: "¡CV descargado exitosamente!"
    }
  },

  fr: {
    // Navigation
    nav: {
      home: 'Accueil',
      about: 'À propos',
      projects: 'Projets',
      contact: 'Contact'
    },
    
    // Hero Section
    hero: {
      greeting: "Salut, je suis Chandrakant Nagpure",
      titles: {
        react: "Développeur React",
        nextjs: "Développeur Next.js",
        tailwind: "Développeur Tailwind CSS",
        wordpress: "Expert WordPress",
        php: "Développeur PHP",
        javascript: "Développeur JavaScript",
        github: "Spécialiste GitHub",
        figma: "Designer UI/UX",
        photoshop: "Designer Graphique",
        gsap: "Développeur d'Animations",
        framer: "Expert Framer Motion",
        default: [
          "Développeur Frontend",
          "Expert WordPress",
          "Passionné React",
          "Designer UI/UX",
          "Freelancer"
        ]
      },
      descriptions: {
        react: "Développeur React expert construisant des applications web rapides, évolutives et conviviales avec des frameworks JavaScript modernes.",
        nextjs: "Spécialisé en Next.js pour le rendu côté serveur et la génération de sites statiques, optimisant les performances et le SEO.",
        tailwind: "Compétent en Tailwind CSS pour un développement d'interface utilisateur rapide, réactif et visuellement attrayant.",
        wordpress: "Développeur WordPress expérimenté créant des thèmes personnalisés, des plugins et des sites web optimisés pour le SEO.",
        php: "Développeur PHP compétent construisant des applications web dynamiques côté serveur et des solutions CMS personnalisées.",
        javascript: "Développeur JavaScript avancé créant des expériences web interactives et performantes.",
        github: "Compétent en GitHub pour le contrôle de version, la collaboration et les contributions open source.",
        figma: "Expert en Figma pour concevoir des prototypes UI/UX intuitifs et visuellement époustouflants.",
        photoshop: "Compétent en Adobe Photoshop pour créer des graphiques de haute qualité et des ressources visuelles.",
        gsap: "Expérimenté en GSAP pour créer des animations fluides et engageantes pour les applications web.",
        framer: "Compétent en Framer Motion pour construire des animations web avancées et interactives.",
        default: "Développeur frontend polyvalent avec une expertise en React, WordPress, design UI/UX et technologies web modernes."
      },
      cta: "Travaillons Ensemble",
      downloadResume: "Télécharger CV",
      viewResume: "Voir"
    },

    // About Section
    about: {
      title: "À Propos de Moi",
      myStory: "Mon Histoire",
      coreSkills: "Compétences Principales",
      experience: "5+ Années d'Expérience",
      projectsCompleted: "50+ Projets Complétés",
      fullStack: "Développement Full-Stack",
      cta: "Construisons Quelque Chose d'Incroyable Ensemble",
      getInTouch: "Entrer en Contact",
      skillDescriptions: {
        react: [
          { name: "Composants", description: "Construction de composants React réutilisables et modulaires pour des applications évolutives." },
          { name: "État", description: "Gestion d'état complexe avec Redux et Context API pour des interfaces utilisateur robustes." },
          { name: "Hooks", description: "Utilisation des React Hooks pour une logique de composants fonctionnels efficace." }
        ],
        nextjs: [
          { name: "SSR", description: "Implémentation du rendu côté serveur pour le SEO et les performances." },
          { name: "SSG", description: "Utilisation de la génération de sites statiques pour des pages rapides et pré-rendues." },
          { name: "Routes API", description: "Création de routes API dynamiques pour une intégration backend transparente." }
        ],
        default: [
          { name: "Frontend", description: "Développement d'applications frontend modernes et réactives." },
          { name: "UI/UX", description: "Conception d'interfaces utilisateur intuitives et visuellement attrayantes." },
          { name: "Full-Stack", description: "Construction de solutions web de bout en bout avec une expertise frontend et backend." }
        ]
      }
    },

    // Projects Section
    projects: {
      title: "Mes Projets",
      subtitle: "Une vitrine de mon travail couvrant le développement web, le design et les solutions numériques. Chaque projet représente un défi unique et une solution créative.",
      filters: {
        all: "Tous les Projets",
        featured: "En Vedette",
        react: "React",
        nextjs: "Next.js",
        wordpress: "WordPress",
        javascript: "JavaScript"
      },
      viewDetails: "Voir les Détails",
      liveDemo: "Démo en Direct",
      github: "GitHub",
      share: "Partager",
      copyLink: "Copier le Lien",
      linkCopied: "Lien copié !",
      cta: "Avez-vous un Projet en Tête ?",
      collaborate: "Collaborons",
      noProjects: "Aucun projet trouvé pour le filtre sélectionné."
    },

    // Contact Section
    contact: {
      title: "Entrer en Contact",
      subtitle: "Prêt à donner vie à vos idées ? Discutons de votre projet et créons quelque chose d'incroyable ensemble.",
      form: {
        title: "Envoyez-moi un Message",
        name: "Nom",
        email: "Email",
        subject: "Sujet",
        message: "Message",
        send: "Envoyer le Message",
        required: "*",
        placeholders: {
          name: "Votre Nom",
          email: "votre.email@exemple.com",
          subject: "Discussion de Projet",
          message: "Parlez-moi de votre projet..."
        },
        errors: {
          nameRequired: "Le nom est requis",
          emailRequired: "L'email est requis",
          emailInvalid: "Format d'email invalide",
          subjectRequired: "Le sujet est requis",
          messageRequired: "Le message est requis"
        },
        success: "Merci pour votre message ! Je vous répondrai bientôt.",
        error: "Une erreur s'est produite. Veuillez réessayer."
      },
      info: {
        title: "Informations de Contact",
        email: "Email",
        phone: "Téléphone",
        location: "Localisation"
      },
      resume: {
        title: "Télécharger Mon CV",
        description: "Obtenez un aperçu détaillé de mon expérience, mes compétences et mes projets."
      },
      social: {
        title: "Connectez-vous avec Moi"
      },
      availability: {
        title: "Disponibilité",
        status: "Disponible pour de nouveaux projets",
        description: "J'accepte actuellement de nouveaux projets freelance et collaborations. Discutons de la façon dont nous pouvons travailler ensemble !"
      }
    },

    // Footer
    footer: {
      madeWith: "Fait avec",
      and: "et",
      passion: "passion",
      copyright: "Tous droits réservés.",
      tagline: "Construire des expériences web incroyables avec des technologies modernes"
    },

    // Status Indicator
    status: {
      available: "Disponible pour travailler",
      busy: "Actuellement occupé",
      away: "Absent",
      descriptions: {
        available: "Ouvert aux nouvelles opportunités et projets",
        busy: "Travaillant sur des projets existants",
        away: "Non disponible pour le moment"
      },
      lastUpdated: "Dernière mise à jour :"
    },

    // Resume
    resume: {
      downloading: "Téléchargement...",
      downloaded: "CV téléchargé avec succès !"
    }
  }
};

// Language Context
const LanguageContext = createContext();

// Language Provider
export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    // Get language from localStorage or default to 'en'
    return localStorage.getItem('language') || 'en';
  });

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('language', currentLanguage);
    // Update document language attribute
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const changeLanguage = (language) => {
    setCurrentLanguage(language);
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    availableLanguages: [
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'es', name: 'Español', flag: '🇪🇸' },
      { code: 'fr', name: 'Français', flag: '🇫🇷' }
    ]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export default LanguageContext;