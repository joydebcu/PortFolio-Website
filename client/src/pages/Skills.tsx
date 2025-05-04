import { motion } from 'framer-motion';
import { useRef } from 'react';
import SkillsCloud from '@/components/SkillsCloud';
import { ScrollReveal } from '@/App';
import { skillsData, languageSkills, technologiesSkills } from '@/data/skills';

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
          <ScrollReveal className="scroll-reveal-left">
            <motion.div
              whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <SkillsCloud skills={skillsData} />
            </motion.div>
          </ScrollReveal>
          
          <ScrollReveal className="scroll-reveal-right">
            <div className="bg-dark/70 backdrop-blur-sm border border-primary/20 rounded-xl p-6">
              <h3 className="text-xl font-heading font-semibold mb-4 flex items-center">
                <i className="ri-code-s-slash-line text-primary mr-2"></i>
                Languages
              </h3>
              <div className="flex flex-wrap gap-3 mb-6">
                {languageSkills.map((skill, index) => (
                  <motion.span 
                    key={index} 
                    className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-lg text-sm"
                    whileHover={{ 
                      scale: 1.05, 
                      backgroundColor: 'rgba(58, 134, 255, 0.2)',
                      boxShadow: '0 2px 10px rgba(58, 134, 255, 0.15)'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
              
              <h3 className="text-xl font-heading font-semibold mb-4 flex items-center">
                <i className="ri-tools-fill text-primary mr-2"></i>
                Technologies & Frameworks
              </h3>
              <div className="flex flex-wrap gap-3">
                {technologiesSkills.map((skill, index) => (
                  <motion.span 
                    key={index} 
                    className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-lg text-sm"
                    whileHover={{ 
                      scale: 1.05, 
                      backgroundColor: 'rgba(58, 134, 255, 0.2)',
                      boxShadow: '0 2px 10px rgba(58, 134, 255, 0.15)'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Skills;
