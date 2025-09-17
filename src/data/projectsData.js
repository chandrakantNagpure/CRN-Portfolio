// Project images
const cyberi3secure_splashscreen = '/assets/projects/Cyber3Secure.png';
const share_proximacloud_splashscreen = '/assets/projects/share.proximacloud.png';
const inheritance_infra_splashscreen = '/assets/projects/Inheritance_Infra.png';
const palloti_splashscreen = '/assets/projects/Palloti.png';

// Real project data
export const projectsData = [
  {
    id: 2,
    title: 'Cyberi3Secure',
    description:
      'A cybersecurity firm specializing in Privileged Access Management (PAM) to enhance identity security, compliance, and operational efficiency for organizations.',
    techs: ['wordpress', 'php', 'javascript', 'gsap', 'css'],
    image: cyberi3secure_splashscreen,
    liveLink: 'https://cyberi3secure.com/',
    repoLink: 'https://github.com/chandrakantNagpure/Cyber3Secure',
    featured: true,
  },
  {
    id: 3,
    title: 'ProximaShare',
    description:
      'A lightweight and secure file-sharing platform with drag-and-drop support. Files are limited to 2MB and shared via expiring links that auto-delete after 3 downloads or 3 days, ensuring privacy and simplicity.',
    techs: ['nextjs', 'javascript', 'tailwind'],
    image: share_proximacloud_splashscreen,
    liveLink: 'https://share.proximacloud.in/',
    repoLink: 'https://github.com/proxima-cloud/proxima-share-fe',
    featured: true,
  },
  {
    id: 4,
    title: 'Inheritance Infrastructure',
    description:
      'A forward-thinking real estate company based in Nagpur, Maharashtra, focused on delivering quality residential and commercial land investments and developments.',
    techs: ['react', 'tailwind', 'javascript', 'gsap'],
    image: inheritance_infra_splashscreen,
    liveLink: 'https://inheritance-infrastructure.vercel.app/',
    repoLink: 'https://github.com/chandrakantNagpure/InheritanceInfrastructure',
    featured: false,
  },
  {
    id: 5,
    title: 'St. Vincent Pallotti College',
    description:
      'An autonomous engineering college website with modern design and user-friendly interface for students and faculty.',
    techs: ['html', 'php', 'css', 'bootstrap', 'javascript'],
    image: palloti_splashscreen,
    liveLink: 'https://svpcet.ac.in/',
    repoLink: 'https://github.com/chandrakantNagpure/pallotti',
    featured: false,
  },
];
