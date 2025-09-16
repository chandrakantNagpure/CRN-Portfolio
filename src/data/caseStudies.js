// Case Studies Data - Detailed project breakdowns for portfolio
export const caseStudies = [
  {
    id: 1,
    slug: 'creativelab-interior-design-website',
    title: 'CreativeLab Interior - Horizontal Scrolling Website',
    client: 'CreativeLab Interior Design',
    category: 'Web Development',
    status: 'Completed',
    featured: true,

    // Project Overview
    overview: {
      challenge:
        'Create a unique, visually stunning website that showcases interior design projects in an innovative way that stands out from traditional portfolio websites.',
      solution:
        'Developed a custom horizontal scrolling website using WordPress, GSAP animations, and custom CSS to create an immersive browsing experience.',
      result:
        "Delivered a cutting-edge website that perfectly represents the client's creative approach and has become a showcase piece for the industry.",
    },

    // Project Details
    duration: '6 weeks',
    budget: '$8,000 - $15,000',
    year: '2024',
    industry: 'Interior Design',

    // Visual Assets
    heroImage: '/assets/projects/CreativeLab-Interior.png',
    images: [
      {
        url: '/assets/case-studies/creativelab-hero.jpg',
        caption: 'Homepage with horizontal scroll navigation',
        alt: 'CreativeLab Interior homepage',
      },
      {
        url: '/assets/case-studies/creativelab-projects.jpg',
        caption: 'Project showcase with smooth transitions',
        alt: 'Interior design project gallery',
      },
      {
        url: '/assets/case-studies/creativelab-mobile.jpg',
        caption: 'Responsive mobile design',
        alt: 'Mobile version of CreativeLab website',
      },
    ],

    // Technologies Used
    technologies: [
      { name: 'WordPress', category: 'CMS', icon: '📝' },
      { name: 'Custom PHP', category: 'Backend', icon: '🐘' },
      { name: 'GSAP', category: 'Animation', icon: '✨' },
      { name: 'Custom CSS', category: 'Styling', icon: '🎨' },
      { name: 'JavaScript ES6+', category: 'Frontend', icon: '⚡' },
      { name: 'Figma', category: 'Design', icon: '🎯' },
    ],

    // Project Process
    process: [
      {
        phase: 'Discovery & Research',
        duration: '1 week',
        description:
          'Conducted client interviews and competitor analysis to understand the interior design industry and identify opportunities for differentiation.',
        deliverables: [
          'Client questionnaire',
          'Competitor analysis',
          'User personas',
          'Project requirements',
        ],
      },
      {
        phase: 'Design & Prototyping',
        duration: '2 weeks',
        description:
          'Created wireframes and high-fidelity designs focusing on the horizontal scrolling concept and smooth user experience.',
        deliverables: ['Wireframes', 'Visual designs', 'Interactive prototype', 'Style guide'],
      },
      {
        phase: 'Development',
        duration: '2.5 weeks',
        description:
          'Built custom WordPress theme with horizontal scrolling, GSAP animations, and responsive design.',
        deliverables: [
          'Custom WordPress theme',
          'GSAP animations',
          'Responsive layouts',
          'Performance optimization',
        ],
      },
      {
        phase: 'Testing & Launch',
        duration: '0.5 weeks',
        description:
          'Comprehensive testing across devices and browsers, client training, and successful launch.',
        deliverables: [
          'Cross-browser testing',
          'Performance testing',
          'Client training',
          'Live deployment',
        ],
      },
    ],

    // Key Features
    features: [
      {
        title: 'Horizontal Scroll Navigation',
        description:
          'Smooth horizontal scrolling with momentum and easing for an immersive experience',
        impact: 'Created a unique browsing experience that sets the site apart from competitors',
      },
      {
        title: 'GSAP Animations',
        description: 'Advanced animations and transitions using GreenSock for smooth performance',
        impact: 'Enhanced user engagement with 40% longer average session duration',
      },
      {
        title: 'Custom WordPress Theme',
        description:
          'Built from scratch to match exact design requirements and functionality needs',
        impact: "Perfect integration with client's workflow and easy content management",
      },
      {
        title: 'Mobile-First Responsive Design',
        description: 'Fully responsive design that works beautifully on all devices',
        impact: 'Mobile traffic increased by 60% after launch',
      },
    ],

    // Challenges & Solutions
    challenges: [
      {
        challenge: 'Horizontal Scrolling Performance',
        solution:
          'Implemented virtual scrolling and optimized GSAP animations to maintain 60fps performance',
        technical: 'Used requestAnimationFrame and debounced scroll events for smooth performance',
      },
      {
        challenge: 'Mobile UX for Horizontal Scroll',
        solution:
          'Created alternative navigation patterns for mobile devices while maintaining design integrity',
        technical: 'Implemented touch gestures and fallback vertical scrolling for mobile devices',
      },
      {
        challenge: 'SEO Optimization',
        solution: 'Ensured proper URL structure and meta tags despite unconventional navigation',
        technical: 'Implemented proper semantic HTML and structured data for search engines',
      },
    ],

    // Results & Metrics
    results: {
      metrics: [
        { label: 'Page Load Speed', before: '4.2s', after: '1.8s', improvement: '57%' },
        { label: 'Mobile Traffic', before: '35%', after: '56%', improvement: '+60%' },
        { label: 'Session Duration', before: '1.2 min', after: '2.1 min', improvement: '+75%' },
        { label: 'Conversion Rate', before: '2.3%', after: '4.1%', improvement: '+78%' },
      ],
      testimonial: {
        text: 'Chandrakant delivered exactly what we envisioned and more. The horizontal scrolling website is absolutely stunning and perfectly represents our creative approach. Our clients love the unique experience.',
        author: 'Sarah Johnson',
        role: 'Creative Director, CreativeLab Interior',
        avatar: '/assets/testimonials/sarah-johnson.jpg',
      },
    },

    // Links
    links: {
      live: 'https://creativelabinteriors.ae/',
      github: null, // Private project
      figma: null, // Private design files
    },

    // SEO
    seo: {
      title: 'CreativeLab Interior Design Website Case Study | Custom WordPress Development',
      description:
        'Discover how we created a unique horizontal scrolling website for CreativeLab Interior using WordPress, GSAP animations, and custom development.',
      keywords: [
        'WordPress development',
        'Interior design website',
        'GSAP animations',
        'Horizontal scrolling',
        'Custom web development',
      ],
    },
  },

  {
    id: 2,
    slug: 'cyberi3secure-pam-security-platform',
    title: 'Cyberi3Secure - PAM Security Platform',
    client: 'Cyberi3Secure',
    category: 'Web Application',
    status: 'Completed',
    featured: true,

    overview: {
      challenge:
        'Build a professional website for a cybersecurity firm specializing in Privileged Access Management (PAM) with complex technical content and compliance requirements.',
      solution:
        'Created a modern, secure WordPress website with custom functionality, detailed service pages, and lead generation features.',
      result:
        'Launched a high-converting website that effectively communicates complex cybersecurity concepts and generates qualified leads.',
    },

    duration: '8 weeks',
    budget: '$12,000 - $20,000',
    year: '2024',
    industry: 'Cybersecurity',

    heroImage: '/assets/projects/Cyber3Secure.png',
    images: [
      {
        url: '/assets/case-studies/cyber3secure-homepage.jpg',
        caption: 'Professional homepage with clear value proposition',
        alt: 'Cyberi3Secure homepage design',
      },
      {
        url: '/assets/case-studies/cyber3secure-services.jpg',
        caption: 'Detailed service breakdown and features',
        alt: 'Cybersecurity services page',
      },
    ],

    technologies: [
      { name: 'WordPress', category: 'CMS', icon: '📝' },
      { name: 'PHP', category: 'Backend', icon: '🐘' },
      { name: 'JavaScript', category: 'Frontend', icon: '⚡' },
      { name: 'CSS3', category: 'Styling', icon: '🎨' },
      { name: 'GSAP', category: 'Animation', icon: '✨' },
      { name: 'Security Plugins', category: 'Security', icon: '🔒' },
    ],

    process: [
      {
        phase: 'Security & Compliance Research',
        duration: '1 week',
        description:
          'Researched cybersecurity industry standards, compliance requirements, and competitor analysis.',
        deliverables: [
          'Industry analysis',
          'Compliance checklist',
          'Security requirements',
          'Content strategy',
        ],
      },
      {
        phase: 'Information Architecture',
        duration: '1.5 weeks',
        description:
          'Structured complex technical content into user-friendly navigation and page hierarchy.',
        deliverables: ['Site architecture', 'Content taxonomy', 'User journey maps', 'Wireframes'],
      },
      {
        phase: 'Design & Development',
        duration: '4 weeks',
        description:
          'Created professional design and developed secure WordPress theme with custom functionality.',
        deliverables: [
          'Visual design',
          'Custom WordPress theme',
          'Security implementation',
          'Content management',
        ],
      },
      {
        phase: 'Security Hardening & Launch',
        duration: '1.5 weeks',
        description:
          'Implemented security measures, performance optimization, and successful launch.',
        deliverables: [
          'Security audit',
          'Performance optimization',
          'SSL implementation',
          'Launch preparation',
        ],
      },
    ],

    features: [
      {
        title: 'Security-First Architecture',
        description:
          'Implemented advanced security measures including SSL, security headers, and secure coding practices',
        impact: 'Achieved A+ security rating and meets industry compliance standards',
      },
      {
        title: 'Lead Generation System',
        description: 'Custom contact forms, resource downloads, and newsletter integration',
        impact: 'Increased qualified leads by 150% within first 3 months',
      },
      {
        title: 'Technical Content Management',
        description: 'Custom post types and fields for managing complex technical documentation',
        impact: 'Streamlined content updates and improved information accessibility',
      },
    ],

    challenges: [
      {
        challenge: 'Complex Technical Content',
        solution:
          'Created clear information hierarchy and simplified technical jargon for broader audience',
        technical: 'Implemented progressive disclosure and contextual help systems',
      },
      {
        challenge: 'Security Requirements',
        solution: 'Implemented enterprise-grade security measures and compliance standards',
        technical: 'Used security hardening, regular updates, and monitoring systems',
      },
    ],

    results: {
      metrics: [
        { label: 'Security Score', before: 'N/A', after: 'A+', improvement: 'Perfect' },
        { label: 'Lead Generation', before: '5/month', after: '18/month', improvement: '+260%' },
        { label: 'Page Speed', before: 'N/A', after: '2.1s', improvement: 'Excellent' },
        { label: 'Organic Traffic', before: '120/month', after: '340/month', improvement: '+183%' },
      ],
      testimonial: {
        text: 'Chandrakant understood our complex cybersecurity requirements and delivered a website that perfectly balances technical accuracy with user-friendly design. The lead generation results have been outstanding.',
        author: 'Michael Chen',
        role: 'CEO, Cyberi3Secure',
        avatar: '/assets/testimonials/michael-chen.jpg',
      },
    },

    links: {
      live: 'https://cyberi3secure.com/',
      github: 'https://github.com/chandrakantNagpure/Cyber3Secure',
      figma: null,
    },

    seo: {
      title: 'Cyberi3Secure PAM Security Platform Case Study | WordPress Development',
      description:
        'Learn how we built a secure, high-converting website for a cybersecurity firm specializing in Privileged Access Management solutions.',
      keywords: [
        'Cybersecurity website',
        'PAM platform',
        'WordPress security',
        'Lead generation',
        'B2B website development',
      ],
    },
  },
];

// Helper functions
export const getFeaturedCaseStudies = () => caseStudies.filter(study => study.featured);

export const getCaseStudyBySlug = slug => caseStudies.find(study => study.slug === slug);

export const getCaseStudiesByCategory = category =>
  caseStudies.filter(study => study.category === category);

export const getAllCategories = () => {
  const categories = new Set();
  caseStudies.forEach(study => categories.add(study.category));
  return Array.from(categories).sort();
};

export const getRelatedCaseStudies = (currentStudy, limit = 2) => {
  return caseStudies
    .filter(study => study.id !== currentStudy.id && study.category === currentStudy.category)
    .slice(0, limit);
};
