import { Project } from '@/components/ProjectCard';

export const projectsData: Project[] = [
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
