import { Project } from '@/components/ProjectCard';

export const projectsData: Project[] = [
  {
    title: 'File Vault Application',
    icon: 'ri-folder-shield-line',
    description: 'Abnormal File Vault is a file hosting application designed to optimize storage by using file deduplication and improve file retrieval through an intelligent search and filtering system. It consists of a React frontend and a Django REST Framework backend, containerized using Docker for easy deployment. The system focuses on reducing redundancy, tracking storage savings, and enabling fast, flexible file searches based on file name, type, size, and upload date.',
    technologies: ['React', 'Django REST Framework', 'Docker', 'PostgreSQL'],
    githubUrl: 'https://github.com/joydebcu/File-Management-System-Django-React-',
    features: [
      'File Deduplication: Avoid storing duplicate files by checking at upload and referencing existing stored files.',
      'Search & Filtering: Allow users to search by filename and filter based on file type, size range, and upload date with support for multiple simultaneous filters.',
      'Optimized Performance: Database indexing and query optimization to handle large datasets efficiently.'
    ],
    period: 'Apr 2025 - Present'
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
