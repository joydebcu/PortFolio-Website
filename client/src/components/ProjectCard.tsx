import { motion } from 'framer-motion';

export interface Project {
  title: string;
  icon: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const { title, icon, description, technologies, githubUrl, liveUrl } = project;
  
  return (
    <motion.div 
      className="card bg-dark/70 backdrop-blur-sm border border-primary/20 rounded-xl overflow-hidden transition-transform hover:border-primary/50"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="aspect-video w-full bg-primary/5 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-8xl text-primary/20">
            <i className={icon}></i>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-heading font-semibold">{title}</h3>
          <div className="flex space-x-2">
            {githubUrl && (
              <a 
                href={githubUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-lg text-primary hover:text-white transition-colors"
                aria-label={`View ${title} source code on GitHub`}
              >
                <i className="ri-github-fill"></i>
              </a>
            )}
            {liveUrl && (
              <a 
                href={liveUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-lg text-primary hover:text-white transition-colors"
                aria-label={`Visit ${title} website`}
              >
                <i className="ri-external-link-line"></i>
              </a>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, i) => {
            // Alternate colors for visual interest
            const colorClasses = [
              "bg-primary/10 text-primary",
              "bg-secondary/10 text-secondary", 
              "bg-accent/10 text-accent",
              "bg-accent2/10 text-accent2"
            ];
            const colorClass = colorClasses[i % colorClasses.length];
            
            return (
              <span key={i} className={`text-xs ${colorClass} px-2 py-1 rounded-full`}>
                {tech}
              </span>
            );
          })}
        </div>
        <p className="text-light/80 text-sm">{description}</p>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
