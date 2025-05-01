import { motion } from 'framer-motion';
import SkillsCloud from '@/components/SkillsCloud';
import AchievementCard from '@/components/AchievementCard';
import { skillsData, languageSkills, technologiesSkills } from '@/data/skills';
import { achievementsData } from '@/data/achievements';

const Skills = () => {
  return (
    <section id="skills" className="py-20 px-4 relative">
      <div className="container mx-auto">
        <motion.h2 
          className="text-4xl font-heading font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Technical <span className="text-gradient">Skills</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <SkillsCloud skills={skillsData} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-dark/70 backdrop-blur-sm border border-primary/20 rounded-xl p-6">
              <h3 className="text-xl font-heading font-semibold mb-4 flex items-center">
                <i className="ri-code-s-slash-line text-primary mr-2"></i>
                Languages
              </h3>
              <div className="flex flex-wrap gap-3 mb-6">
                {languageSkills.map((skill, index) => (
                  <span key={index} className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-lg text-sm">
                    {skill}
                  </span>
                ))}
              </div>
              
              <h3 className="text-xl font-heading font-semibold mb-4 flex items-center">
                <i className="ri-tools-fill text-primary mr-2"></i>
                Technologies & Frameworks
              </h3>
              <div className="flex flex-wrap gap-3">
                {technologiesSkills.map((skill, index) => (
                  <span key={index} className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-lg text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Achievements Section */}
        <div className="mt-20">
          <motion.h3 
            className="text-2xl font-heading font-semibold mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Achievements
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievementsData.map((achievement, index) => (
              <AchievementCard
                key={index}
                achievement={achievement}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
