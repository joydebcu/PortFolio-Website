import { Experience } from '@/components/ExperienceCard';

export const experienceData: Experience[] = [
  {
    company: 'GeeksForGeeks',
    role: 'SDE 1',
    period: 'Dec 2023 - Present',
    location: 'Noida',
    technologies: 'NextJS, Django, MySQL, Websockets, Amazon SES',
    achievements: [
      'Developed report generation tool serving 5,000+ university users, enabling 30% faster access across 12 colleges and 40+ sections; implemented 15 custom components improving user satisfaction by 25%.',
      'Integrated Amazon SES, reducing failed deliveries by 85% and segmenting 100,000+ users; increased email click rates by 32%. Led Push notification implementation boosting user engagement by 45%.',
      'Refactored code for course sales, streamlining operations by 65% across web and app platforms.',
      'Collaborated with ML team to improve course search results by 30% through search optimization compared to elasticsearch.',
      'Migrated CRM from PHP to Django, adding features like user action tracking and automated email notifications, improving sales team efficiency by 15%.',
      'Simplified attendance marking for 500+ live classes per week, reducing manual effort by 75%.',
      'Collaborated with ML team for proctoring image monitoring during contests, processing 10,000+ candidate snapshots daily and increasing recruiter access speed by 40%.',
      'Led a team of 2 interns reducing AWS costs by 35% through DB optimizations and strategic indexing; cut response times from 300ms to 85ms across 25+ endpoints.',
      'Interviewed 20+ entry-level engineering candidates for hiring evaluations.'
    ]
  },
  {
    company: 'Josh Technology Group',
    role: 'Software Developer',
    period: 'Jan 2023 - Nov 2023',
    location: 'Gurugram',
    technologies: 'Django, React, Postgres, TypeScript, Sentry, Angular, Redis',
    achievements: [
      'Developed JWT authentication system for 5,000+ ZZF University users, enhancing security by 40% and reducing unauthorized access attempts by 75% through custom middleware implementation.',
      'Integrated Mailchimp for bulk emails reaching 15,000+ subscribers with 28% higher open rates; implemented 8 dynamic templates.',
      'Automated processes with 12 cron jobs reducing manual tasks by 65%; created report generation system processing 300+ reports weekly with notifications.'
    ]
  }
];
