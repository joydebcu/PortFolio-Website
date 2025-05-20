import { Project } from '@/components/ProjectCard';

export const projectsData: Project[] = [
  {
    title: 'File Vault Application',
    icon: 'ri-folder-shield-line',
    description: 'File Vault is a file hosting application designed to optimize storage by using file deduplication and improve file retrieval through an intelligent search and filtering system. It consists of a React frontend and a Django REST Framework backend, containerized using Docker for easy deployment. The system focuses on reducing redundancy, tracking storage savings, and enabling fast, flexible file searches based on file name, type, size, and upload date.',
    technologies: ['React', 'Django REST Framework', 'Docker', 'PostgreSQL'],
    githubUrl: 'https://github.com/joydebcu/File-Management-System-Django-React-',
    period: 'Apr 2025 - Present'
  },
  {
    title: 'E-commerce Product URL Crawler',
    icon: 'ri-pages-line',
    technologies: ['Python', 'Beautiful Soap'],
    description: 'A Python-based web crawler designed to discover product URLs on e-commerce websites. The crawler implements a breadth-first search approach and uses asynchronous requests to efficiently explore websites, identify product pages, and compile a list of product URLs.',
    githubUrl: 'https://github.com/joydebcu/Ecommerce-Crawler',
    period: 'March 2025 - May 2025'
  },
  {
    title: 'PokerPlanner',
    icon: 'ri-gamepad-line',
    description: 'A full-stack project providing a seamless user experience for poker planning sessions. Implemented secure email verification and real-time communication using WebSockets. Enhanced functionality by integrating Jira\'s library for pokerboards and groups.',
    technologies: ['Django', 'React', 'Docker', 'WebSocket', 'Celery'],
    githubUrl: 'https://github.com/joydeb1999/pokerplanner'
  },
  {
    title: 'Codeorzo',
    icon: 'ri-code-box-line',
    description: 'Integrated passport-jwt strategy to ensure secure authentication and authorization. Leveraged Nodemailer to enable email notifications on posts and comments, keeping users informed and engaged with the platform\'s latest activities.',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'Template Engine'],
    githubUrl: 'https://github.com/joydeb1999/codeorzo'
  }
];
