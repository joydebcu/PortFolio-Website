import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export interface Project {
  title: string;
  icon: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  period?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

// Random technology-related pattern backgrounds
const techPatterns = [
  'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'%3E%3Cg fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
  'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556l-1.414-1.414L28 0h4zM.284 0l28 28-1.414 1.414L0 2.544v2.83L26.272 32l-1.414 1.414-28-28V0h3.427zM60 0L45.414 14.586l-1.414-1.414L58.586 0H60zm0 5.542L40.414 25.128l-1.414-1.414L60 2.544v2.998zm0 5.656L35.414 35.682l-1.414-1.414L60 8.198v2.998zm0 5.656L30.414 46.24l-1.414-1.414L60 13.855v2.999zm0 5.657L25.414 56.795l-1.414-1.414L60 19.511v2.998zm0 5.657l-24 24V45.82L36.414 60H60v-5.657zM42.586 60L60 42.586v2.829L45.414 60h-2.828zm-5.656 0L60 36.929v2.828L39.757 60h-2.827zm-5.657 0L60 31.272v2.828L34.1 60h-2.827zm-5.657 0L60 25.615v2.828L28.443 60h-2.827zm-5.657 0L60 19.958v2.828L22.786 60h-2.827zm-5.657 0L60 14.3v2.83L17.13 60h-2.828zm-5.657 0L60 8.644v2.83L11.472 60H8.644zm-5.656 0L60 2.987v2.83L5.815 60H2.987z\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
  'url("data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23FFF\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z\' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
  'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 56 28\' width=\'56\' height=\'28\'%3E%3Cpath fill=\'%23FFF\' fill-opacity=\'0.05\' d=\'M56 26v2h-7.75c2.3-1.27 4.94-2 7.75-2zm-26 2a2 2 0 1 0-4 0h-4.09A25.98 25.98 0 0 0 0 16v-2c.67 0 1.34.02 2 .07V14a2 2 0 0 0-2-2v-2a4 4 0 0 1 3.98 3.6 28.09 28.09 0 0 1 2.8-3.86A8 8 0 0 0 0 6V4a9.99 9.99 0 0 1 8.17 4.23c.94-.95 1.96-1.83 3.03-2.63A13.98 13.98 0 0 0 0 0h7.75c2 1.1 3.73 2.63 5.1 4.45 1.12-.72 2.3-1.37 3.53-1.93A20.1 20.1 0 0 0 14.28 0h2.7c.45.56.88 1.14 1.29 1.74 1.3-.48 2.63-.87 4-1.15-.11-.2-.23-.4-.36-.59H26v.07a28.4 28.4 0 0 1 4 0V0h4.09l-.37.59c1.38.28 2.72.67 4.01 1.15.4-.6.84-1.18 1.3-1.74h2.69a20.1 20.1 0 0 0-2.1 2.52c1.23.56 2.41 1.2 3.54 1.93A16.08 16.08 0 0 1 48.25 0H56c-4.58 0-8.65 2.2-11.2 5.6 1.07.8 2.09 1.68 3.03 2.63A9.99 9.99 0 0 1 56 4v2a8 8 0 0 0-6.77 3.74c1.03 1.2 1.97 2.5 2.79 3.86A4 4 0 0 1 56 10v2a2 2 0 0 0-2 2.07 28.4 28.4 0 0 1 2-.07v2c-9.2 0-17.3 4.78-21.91 12H30zM7.75 28H0v-2c2.81 0 5.46.73 7.75 2zM56 20v2c-.67 0-1.34.02-2 .07V22a2 2 0 0 0 2-2zm-2 4h-7.75A25.98 25.98 0 0 0 56 16v2a2 2 0 0 0-2 2v4zm-22-2c-1.66 0-3.22.33-4.65.91 1.1 1.49 2.01 3.13 2.67 4.88 1.4-.66 2.89-1.08 4.46-1.22-.6-1.37-1.24-2.68-1.95-3.92.28-.5.68-.87 1.16-1.12A12.1 12.1 0 0 0 30 22h-2zM32 28h2c0 1.32.45 2.58 1.24 3.59-1.04.21-2 .63-2.84 1.22A5.98 5.98 0 0 1 30 28h2zm2-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm8-10a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0-14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0-14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 28a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8-14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0-14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 28a2 2 0 1 0 0 4 2 2 0 0 0 0-4z\'%3E%3C/path%3E%3C/svg%3E")',
  'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'20\' viewBox=\'0 0 100 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z\' fill=\'%23FFF\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")'
];

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const { title, icon, description, technologies, githubUrl, liveUrl, period } = project;
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, margin: "-10% 0px -10% 0px" });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  // Select a pattern for the background
  const bgPattern = techPatterns[index % techPatterns.length];
  
  // Images for project backgrounds - using SVG data URLs for consistent, tech-like patterns
  const getCardRotation = () => {
    if (!isHovered) return { rotateX: 0, rotateY: 0 };
    
    // Calculate rotation based on mouse position
    const rotateY = mousePosition.x * 10; // max 10 degrees rotation
    const rotateX = -mousePosition.y * 10;
    
    return { rotateX, rotateY };
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    // Calculate normalized mouse position (-1 to 1)
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setMousePosition({ x, y });
  };
  
  return (
    <motion.div 
      ref={cardRef}
      className="card-3d relative perspective-1000"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: false, margin: "-100px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="bg-background/70 backdrop-blur-sm border border-primary/20 rounded-xl overflow-hidden transition-colors preserve-3d"
        animate={getCardRotation()}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
        style={{ backgroundImage: bgPattern }}
      >
        <div className="aspect-video w-full bg-primary/5 overflow-hidden relative">
          {/* Random pattern for dynamic background */}
          <div className="absolute inset-0" style={{ backgroundImage: bgPattern, opacity: 0.1 }}></div>
          
          <div className="w-full h-full flex items-center justify-center relative">
            <motion.div 
              className="text-8xl text-primary/50 transform preserve-3d"
              animate={isHovered ? { rotateY: 360 } : { rotateY: 0 }}
              transition={{ duration: 3, ease: "linear", repeat: isHovered ? Infinity : 0 }}
            >
              <i className={icon}></i>
            </motion.div>
          </div>
        </div>
        
        <div className="p-6 relative z-10">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-xl font-heading font-semibold">{title}</h3>
              {period && (
                <p className="text-sm text-foreground/60 mt-1">{period}</p>
              )}
            </div>
            <div className="flex space-x-2">
              {githubUrl && (
                <motion.a 
                  href={githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-lg text-primary hover:text-foreground transition-colors"
                  aria-label={`View ${title} source code on GitHub`}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                >
                  <i className="ri-github-fill"></i>
                </motion.a>
              )}
              {liveUrl && (
                <motion.a 
                  href={liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-lg text-primary hover:text-foreground transition-colors"
                  aria-label={`Visit ${title} website`}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                >
                  <i className="ri-external-link-line"></i>
                </motion.a>
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
                <motion.span 
                  key={i} 
                  className={`text-xs ${colorClass} px-2 py-1 rounded-full`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { 
                    opacity: 1, 
                    scale: 1,
                    transition: { delay: 0.3 + (i * 0.1) }
                  } : { opacity: 0, scale: 0.8 }}
                >
                  {tech}
                </motion.span>
              );
            })}
          </div>
          
          <p className="text-foreground/80 text-sm">{description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
