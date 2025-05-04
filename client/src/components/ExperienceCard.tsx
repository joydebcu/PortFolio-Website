import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// Helper to format text with highlighted percentages
function AnimatedNumbers({ text, inView }: { text: string; inView: boolean }) {
  // Regex to match only percentages
  const regex = /([0-9]+(?:\.[0-9]+)?%)/g;
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) => {
        if (part.match(regex)) {
          // Highlight percentage numbers
          return (
            <span key={i} className="font-bold text-primary underline decoration-2 underline-offset-4">
              {part}
            </span>
          );
        }
        // Normal text
        return <span key={i} className="font-normal">{part}</span>;
      })}
    </span>
  );
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  technologies: string;
  achievements: string[];
}

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

const ExperienceCard = ({ experience, index }: ExperienceCardProps) => {
  const { company, role, period, location, technologies, achievements } = experience;
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, margin: "-10% 0px -10% 0px" });
  
  // Random pattern images for card backgrounds
  const bgPatterns = [
    'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")',
    'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h20v20H0V0zm10 17.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zm0-2.5a5 5 0 1 1 0-10 5 5 0 0 1 0 10z\' fill=\'%239C92AC\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
    'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M2 10a8 8 0 1 0 16 0 8 8 0 0 0-16 0zm5-2.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zm7 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z\' fill=\'%239C92AC\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
    'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M2 0h16v20H2V0zm8 10a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0 2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z\' fill=\'%239C92AC\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
    'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h20v20H0V0zm2.5 7.5a5 5 0 1 1 0-5 5 5 0 0 1 0 5zm15 5a5 5 0 1 1 0-5 5 5 0 0 1 0 5z\' fill=\'%239C92AC\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")'
  ];
  
  const bgPattern = bgPatterns[index % bgPatterns.length];
  
  return (
    <div ref={cardRef} className={`pl-5 md:pl-8 mb-16 relative timeline-tiktok ${isInView ? 'timeline-visible' : ''}`}>
      {/* Timeline dot with animation */}
      <div className="timeline-dot"></div>
      
      <motion.div 
        className="card-3d"
        initial={{ opacity: 0, y: 50, rotateX: -5 }}
        animate={isInView ? { 
          opacity: 1, 
          y: 0, 
          rotateX: 0,
          transition: { 
            duration: 0.5, 
            delay: index * 0.1, 
            type: "spring", 
            stiffness: 100 
          }
        } : { opacity: 0, y: 50, rotateX: -5 }}
        viewport={{ once: false, margin: "-100px" }}
      >
        <div 
          className="card bg-background/70 backdrop-blur-sm border border-primary/20 rounded-xl p-6 hover:border-primary/50 transition-all overflow-hidden relative"
          style={{ backgroundImage: bgPattern }}
        >
          <div className="flex flex-wrap justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-heading font-semibold">{company}</h3>
              <p className="text-lg font-medium text-primary">{role}</p>
              <p className="text-sm text-foreground/70">{location}</p>
            </div>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              {period}
            </span>
          </div>
          
          <p className="text-foreground/70 mb-4">{technologies}</p>
          
          <ul className="space-y-3 text-foreground/90">
            {achievements.map((achievement, i) => (
              <motion.li 
                key={i} 
                className="flex gap-2 items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { 
                  opacity: 1, 
                  x: 0,
                  transition: { 
                    duration: 0.3, 
                    delay: 0.3 + (i * 0.1) 
                  }
                } : { opacity: 0, x: -20 }}
              >
                <i className="ri-checkbox-circle-fill text-primary mt-1 flex-shrink-0"></i>
                <AnimatedNumbers text={achievement} inView={isInView} />
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default ExperienceCard;
