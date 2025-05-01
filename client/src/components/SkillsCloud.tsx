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
  const [boundaryRadius, setBoundaryRadius] = useState(0);
  
  // Update dimensions when component mounts or window resizes
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const height = containerRef.current.offsetHeight;
        
        // Calculate radius for circular boundary (slightly smaller than container)
        const radius = Math.min(width, height) * 0.45;
        
        setDimensions({ width, height });
        setBoundaryRadius(radius);
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
  
  // Initialize orb positions in a circular pattern
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0 && boundaryRadius > 0) {
      const initialPositions = skills.map((skill, index) => {
        const size = 80 + skill.size * 5;
        
        // Position in a circular pattern
        const angle = (index / skills.length) * Math.PI * 2;
        const distanceFromCenter = boundaryRadius * 0.6 * Math.random(); // Random distance from center
        
        // Calculate position within the circle
        const centerX = dimensions.width / 2;
        const centerY = dimensions.height / 2;
        
        const x = centerX + Math.cos(angle) * distanceFromCenter - size / 2;
        const y = centerY + Math.sin(angle) * distanceFromCenter - size / 2;
        
        return {
          id: index,
          x: Math.max(0, Math.min(dimensions.width - size, x)),
          y: Math.max(0, Math.min(dimensions.height - size, y)),
          size: size
        };
      });
      setOrbPositions(initialPositions);
    }
  }, [dimensions, skills, boundaryRadius]);
  
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
      className="word-cloud-container relative flex items-center justify-center"
      style={{ height: '550px' }} // Increased height for more space
    >
      {/* Circular boundary indicator */}
      {boundaryRadius > 0 && (
        <div 
          className="absolute border-2 border-primary/20 rounded-full"
          style={{ 
            width: boundaryRadius * 2 + 'px', 
            height: boundaryRadius * 2 + 'px',
            pointerEvents: 'none' // Allow interactions with orbs below
          }}
        />
      )}
      
      {dimensions.width > 0 && dimensions.height > 0 && orbPositions.length > 0 && boundaryRadius > 0 && (
        skills.map((skill, index) => (
          <SkillOrb 
            key={index} 
            id={index}
            skill={skill} 
            containerWidth={dimensions.width}
            containerHeight={dimensions.height}
            orbPositions={orbPositions}
            updatePosition={updateOrbPosition}
            boundaryRadius={boundaryRadius}
            centerX={dimensions.width / 2}
            centerY={dimensions.height / 2}
          />
        ))
      )}
    </div>
  );
};

export default SkillsCloud;
