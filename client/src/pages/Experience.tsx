import { motion } from 'framer-motion';
import ExperienceCard from '@/components/ExperienceCard';
import { experienceData } from '@/data/experience';

const Experience = () => {
  return (
    <section id="experience" className="py-20 px-4 relative">
      <div className="container mx-auto">
        <motion.h2 
          className="text-4xl font-heading font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Work <span className="text-gradient">Experience</span>
        </motion.h2>
        
        <div className="relative timeline pl-10 max-w-3xl mx-auto">
          {experienceData.map((experience, index) => (
            <ExperienceCard 
              key={index} 
              experience={experience}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
