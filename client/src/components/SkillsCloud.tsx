import { useState, useEffect, useRef } from 'react';
import SkillOrb, { Skill } from './SkillOrb';

interface SkillsCloudProps {
  skills: Skill[];
}

const SkillsCloud = ({ skills }: SkillsCloudProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };
    
    // Initial measurement
    updateDimensions();
    
    // Update on resize
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="word-cloud-container relative"
      style={{ height: '300px' }}
    >
      {dimensions.width > 0 && dimensions.height > 0 && (
        skills.map((skill, index) => (
          <SkillOrb 
            key={index} 
            skill={skill} 
            containerWidth={dimensions.width}
            containerHeight={dimensions.height}
          />
        ))
      )}
    </div>
  );
};

export default SkillsCloud;
