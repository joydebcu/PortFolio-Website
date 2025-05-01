import { useState, useEffect, useRef } from 'react';
import SkillOrb, { Skill } from './SkillOrb';

interface SkillsCloudProps {
  skills: Skill[];
}

interface OrbPosition {
  id: number;
  x: number;
  y: number;
  size: number;
}

const SkillsCloud = ({ skills }: SkillsCloudProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [orbPositions, setOrbPositions] = useState<OrbPosition[]>([]);
  
  // Update dimensions when component mounts or window resizes
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
  
  // Initialize orb positions
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      const initialPositions = skills.map((skill, index) => {
        const size = 80 + skill.size * 5;
        return {
          id: index,
          x: Math.random() * (dimensions.width - size),
          y: Math.random() * (dimensions.height - size),
          size: size
        };
      });
      setOrbPositions(initialPositions);
    }
  }, [dimensions, skills]);
  
  // Function to update position of a specific orb
  const updateOrbPosition = (id: number, x: number, y: number) => {
    setOrbPositions(prev => 
      prev.map(orb => 
        orb.id === id 
          ? { ...orb, x, y } 
          : orb
      )
    );
  };
  
  return (
    <div 
      ref={containerRef}
      className="word-cloud-container relative"
      style={{ height: '500px' }} // Increased height for more space
    >
      {dimensions.width > 0 && dimensions.height > 0 && orbPositions.length > 0 && (
        skills.map((skill, index) => (
          <SkillOrb 
            key={index} 
            id={index}
            skill={skill} 
            containerWidth={dimensions.width}
            containerHeight={dimensions.height}
            orbPositions={orbPositions}
            updatePosition={updateOrbPosition}
          />
        ))
      )}
    </div>
  );
};

export default SkillsCloud;
