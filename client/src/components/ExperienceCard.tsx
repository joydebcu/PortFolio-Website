import { motion } from 'framer-motion';

export interface Experience {
  company: string;
  role: string;
  period: string;
  technologies: string;
  achievements: string[];
}

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

const ExperienceCard = ({ experience, index }: ExperienceCardProps) => {
  const { company, role, period, technologies, achievements } = experience;
  
  return (
    <motion.div 
      className="mb-16 relative experience-dot"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="card bg-dark/70 backdrop-blur-sm border border-primary/20 rounded-xl p-6 hover:border-primary/50 transition-colors">
        <div className="flex flex-wrap justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-heading font-semibold">{company}</h3>
            <p className="text-lg font-medium text-primary">{role}</p>
          </div>
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
            {period}
          </span>
        </div>
        <p className="text-light/70 mb-4">{technologies}</p>
        <ul className="space-y-3 text-light/90">
          {achievements.map((achievement, i) => (
            <li key={i} className="flex gap-2 items-start">
              <i className="ri-checkbox-circle-fill text-primary mt-1 flex-shrink-0"></i>
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
