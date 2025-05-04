import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SkillOrb from './SkillOrb';

interface Skill {
  name: string;
  color: string;
  experience: number;
  size: number;
}

interface SkillsCloudProps {
  skills: Skill[];
}

interface OrbPosition {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
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
        
        // Calculate radius for circular boundary based on screen size
        let radius;
        if (width < 640) { // Mobile
          radius = Math.min(width, height) * 0.35; // Back to original size
        } else if (width < 1024) { // Tablet
          radius = Math.min(width, height) * 0.38;
        } else { // Desktop
          radius = Math.min(width, height) * 0.42;
        }
        
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
  
  // Initialize orb positions in a circular pattern based on experience
  useEffect(() => {
    if (dimensions.width <= 0 || dimensions.height <= 0 || boundaryRadius <= 0) return;
    
    // Sort skills by experience level (highest to lowest)
    const sortedSkills = [...skills].sort((a, b) => b.experience - a.experience);
    
    const initialPositions = sortedSkills.map((skill, index) => {
      // Calculate base size based on screen width and skill's size property
      let baseSize;
      if (dimensions.width < 640) { // Mobile
        baseSize = 18 + (skill.size * 3);
      } else if (dimensions.width < 1024) { // Tablet
        baseSize = 22 + (skill.size * 4);
      } else { // Desktop
        baseSize = 24 + (skill.size * 5);
      }
      
      // Calculate distance from center based on experience (1-5)
      const experienceFactor = (6 - skill.experience) / 5;
      
      // Create concentric circles based on experience
      // Experience 5: innermost circle (20% of radius)
      // Experience 4: second circle (40% of radius)
      // Experience 3: third circle (60% of radius)
      // Experience 2: fourth circle (80% of radius)
      // Experience 1: outermost circle (90% of radius)
      const distanceFromCenter = boundaryRadius * (0.2 + (experienceFactor * 0.7));
      
      // Distribute orbs evenly within their experience level circle
      const skillsInSameLevel = sortedSkills.filter(s => s.experience === skill.experience).length;
      const angleStep = (Math.PI * 2) / skillsInSameLevel;
      const angle = angleStep * sortedSkills.filter(s => s.experience === skill.experience)
        .findIndex(s => s.name === skill.name);
      
      // Add slight random offset to prevent perfect alignment
      const randomOffset = (Math.random() - 0.5) * 0.1; // Reduced random offset for better alignment
      const finalAngle = angle + randomOffset;
      
      // Calculate position within the circle
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;
      
      const x = centerX + Math.cos(finalAngle) * distanceFromCenter - baseSize / 2;
      const y = centerY + Math.sin(finalAngle) * distanceFromCenter - baseSize / 2;
      
      // Add slight random velocity
      const vx = (Math.random() - 0.5) * 0.1; // Reduced initial velocity for more stability
      const vy = (Math.random() - 0.5) * 0.1;
      
      return {
        id: index,
        x: Math.max(0, Math.min(dimensions.width - baseSize, x)),
        y: Math.max(0, Math.min(dimensions.height - baseSize, y)),
        vx,
        vy,
        size: baseSize
      };
    });
    
    setOrbPositions(initialPositions);
  }, [dimensions, skills, boundaryRadius]);
  
  // Update position of a specific orb
  const updateOrbPosition = (id: number, x: number, y: number, vx: number, vy: number) => {
    setOrbPositions(prev => 
      prev.map(orb => 
        orb.id === id 
          ? { ...orb, x, y, vx, vy } 
          : orb
      )
    );
  };
  
  return (
    <div 
      ref={containerRef}
      className="relative flex items-center justify-center backdrop-blur-sm rounded-2xl mx-auto overflow-hidden"
      style={{ 
        height: 'clamp(300px, 60vh, 600px)', // Back to original height
        width: 'clamp(300px, 90vw, 700px)', // Back to original width
        margin: '2rem auto', // Increased margin for better spacing
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}
    >
      {/* Circular boundary indicator */}
      {boundaryRadius > 0 && (
        <div 
          className="absolute border-2 border-blue-500/20 rounded-full"
          style={{ 
            width: boundaryRadius * 2,
            height: boundaryRadius * 2,
            pointerEvents: 'none'
          }}
        />
      )}
      
      {/* Experience level indicators */}
      {boundaryRadius > 0 && [5, 4, 3, 2, 1].map(level => (
        <div 
          key={level}
          className="absolute border border-blue-500/10 rounded-full"
          style={{ 
            width: boundaryRadius * 2 * (0.2 + ((6 - level) / 5) * 0.7),
            height: boundaryRadius * 2 * (0.2 + ((6 - level) / 5) * 0.7),
            pointerEvents: 'none'
          }}
        />
      ))}
      
      {dimensions.width > 0 && dimensions.height > 0 && orbPositions.length > 0 && (
        skills.map((skill, index) => {
          const orbPos = orbPositions.find(orb => orb.id === index);
          if (!orbPos) return null;
          
          return (
            <SkillOrb 
              key={index} 
              id={index}
              skill={skill}
              position={orbPos}
              containerWidth={dimensions.width}
              containerHeight={dimensions.height}
              orbPositions={orbPositions}
              updatePosition={updateOrbPosition}
              boundaryRadius={boundaryRadius}
              centerX={dimensions.width / 2}
              centerY={dimensions.height / 2}
            />
          );
        })
      )}
    </div>
  );
};

export default SkillsCloud;
