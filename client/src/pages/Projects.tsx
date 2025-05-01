import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import { projectsData } from '@/data/projects';

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-4 relative">
      <div className="container mx-auto">
        <motion.h2 
          className="text-4xl font-heading font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Featured <span className="text-gradient">Projects</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projectsData.map((project, index) => (
            <ProjectCard 
              key={index}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
