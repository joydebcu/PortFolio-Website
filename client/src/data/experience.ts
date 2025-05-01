import { Experience } from '@/components/ExperienceCard';

export const experienceData: Experience[] = [
  {
    company: 'GeeksForGeeks',
    role: 'SDE 1',
    period: 'Dec 2023 - Present',
    technologies: 'NextJS, Django, MySQL, Websockets, Amazon SES',
    achievements: [
      'Developed report generation tool serving 5,000+ university users, enabling 30% faster access across 12 colleges and 40+ sections; implemented 15 custom components improving user satisfaction by 25%.',
      'Integrated Amazon SES, reducing failed deliveries by 85% and segmenting 100,000+ users; increased email click rates by 32%. Led Push notification implementation boosting user engagement by 45%.',
      'Refactored code for course sales, streamlining operations by 65% across web and app platforms.',
      'Led a team of 2 interns reducing AWS costs by 35% through DB optimizations and strategic indexing; cut response times from 300ms to 85ms.'
    ]
  },
  {
    company: 'Josh Technology Group',
    role: 'Software Developer',
    period: 'Jan 2023 - Nov 2023',
    technologies: 'Django, React, Postgres, TypeScript, Sentry, Angular, Redis',
    achievements: [
      'Delivered JWT authentication system for 5,000+ ZZF University users, enhancing security by 40% and reducing unauthorized access attempts by 75%.',
      'Integrated Mailchimp for bulk emails reaching 15,000+ subscribers with 28% higher open rates; Designed 8 dynamic templates.',
      'Automated processes with 12 cron jobs reducing manual tasks by 65%; created report generation system processing 300+ reports weekly.'
    ]
  }
];
