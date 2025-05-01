import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getContrastColor } from '@/lib/utils';

export interface Skill {
  name: string;
  color: string;
  size: number;
}

interface SkillOrbProps {
  skill: Skill;
  containerWidth: number;
  containerHeight: number;
  orbPositions: Array<{id: number, x: number, y: number, size: number}>;
  id: number;
  updatePosition: (id: number, x: number, y: number) => void;
  boundaryRadius?: number;
  centerX?: number;
  centerY?: number;
}

const SkillOrb = ({ 
  skill, 
  containerWidth, 
  containerHeight, 
  orbPositions,
  id,
  updatePosition,
  boundaryRadius = 0,
  centerX = 0,
  centerY = 0
}: SkillOrbProps) => {
  const { name, color, size: skillSize } = skill;
  const boxSize = 80 + skillSize * 5; // Larger size for the box
  const textColor = getContrastColor(color);
  
  const [isBeingDragged, setIsBeingDragged] = useState(false);
  const [hasBeenClicked, setHasBeenClicked] = useState(false);
  const [pos, setPos] = useState({
    x: Math.random() * (containerWidth - boxSize),
    y: Math.random() * (containerHeight - boxSize)
  });
  const [velocity, setVelocity] = useState({
    x: (Math.random() - 0.5) * 1.5,
    y: (Math.random() - 0.5) * 1.5
  });
  
  // Update position in parent component when position changes significantly
  useEffect(() => {
    const timer = setTimeout(() => {
      updatePosition(id, pos.x, pos.y);
    }, 100); // Debounce to avoid too many updates
    
    return () => clearTimeout(timer);
  }, [Math.floor(pos.x), Math.floor(pos.y), id, updatePosition]);
  
  // Animation and collision detection
  useEffect(() => {
    if (isBeingDragged) return;
    
    const moveInterval = setInterval(() => {
      // Calculate new position
      let newX = pos.x + velocity.x;
      let newY = pos.y + velocity.y;
      
      // Check if circular boundary is active
      if (boundaryRadius > 0 && centerX > 0 && centerY > 0) {
        // Calculate center of orb
        const orbCenterX = newX + boxSize/2;
        const orbCenterY = newY + boxSize/2;
        
        // Calculate distance from center of container
        const dx = orbCenterX - centerX;
        const dy = orbCenterY - centerY;
        const distanceFromCenter = Math.sqrt(dx*dx + dy*dy);
        
        // Maximum allowed distance (boundary radius minus half of orb size)
        const maxDistance = boundaryRadius - (boxSize/2);
        
        // If orb is outside the boundary
        if (distanceFromCenter > maxDistance && maxDistance > 0) {
          // Calculate angle from center of container to orb
          const angle = Math.atan2(dy, dx);
          
          // Set new position at boundary
          const bounceX = centerX + Math.cos(angle) * maxDistance - boxSize/2;
          const bounceY = centerY + Math.sin(angle) * maxDistance - boxSize/2;
          
          // Reflect velocity (bounce)
          const normalX = Math.cos(angle);
          const normalY = Math.sin(angle);
          const dotProduct = velocity.x * normalX + velocity.y * normalY;
          
          setVelocity(prev => ({
            x: prev.x - 2 * dotProduct * normalX,
            y: prev.y - 2 * dotProduct * normalY
          }));
          
          newX = bounceX;
          newY = bounceY;
        }
      } else {
        // Default rectangle boundary behavior
        if (newX <= 0 || newX + boxSize >= containerWidth) {
          setVelocity(prev => ({ ...prev, x: -prev.x * 0.85 }));
          newX = newX <= 0 ? 0 : containerWidth - boxSize;
        }
        
        if (newY <= 0 || newY + boxSize >= containerHeight) {
          setVelocity(prev => ({ ...prev, y: -prev.y * 0.85 }));
          newY = newY <= 0 ? 0 : containerHeight - boxSize;
        }
      }
      
      // Check for collisions with other orbs
      orbPositions.forEach(orb => {
        if (orb.id === id) return; // Skip self
        
        // Calculate distance between centers
        const dx = (newX + boxSize/2) - (orb.x + orb.size/2);
        const dy = (newY + boxSize/2) - (orb.y + orb.size/2);
        const distance = Math.sqrt(dx*dx + dy*dy);
        
        // Minimum distance to avoid collision
        const minDistance = (boxSize + orb.size) / 2;
        
        // If collision detected - stronger repulsion for TikTok-style bouncy effect
        if (distance < minDistance) {
          // Calculate repulsion angle
          const angle = Math.atan2(dy, dx);
          
          // Increase repulsion strength for more obvious effect
          const pushStrength = 0.8;
          
          // Update velocity with repel force
          setVelocity(prev => ({
            x: prev.x + Math.cos(angle) * pushStrength,
            y: prev.y + Math.sin(angle) * pushStrength
          }));
        }
      });
      
      // Apply friction (slow down over time)
      setVelocity(prev => ({
        x: prev.x * 0.97, // Less friction = more movement
        y: prev.y * 0.97
      }));
      
      // Update position
      setPos({ x: newX, y: newY });
      
    }, 16);
    
    return () => clearInterval(moveInterval);
  }, [isBeingDragged, pos, velocity, containerWidth, containerHeight, boxSize, id, orbPositions, boundaryRadius, centerX, centerY]);
  
  // Handle click for highlighting effect
  const handleClick = () => {
    setHasBeenClicked(!hasBeenClicked);
  };
  
  // Handle drag events
  const handleDragStart = () => {
    setIsBeingDragged(true);
    setVelocity({ x: 0, y: 0 }); // Reset velocity
  };
  
  const handleDragEnd = (_e: any, info: any) => {
    setIsBeingDragged(false);
    // Apply velocity based on drag speed
    setVelocity({
      x: info.velocity.x * 0.1,
      y: info.velocity.y * 0.1
    });
  };
  
  const handleDrag = (_e: any, info: any) => {
    // Keep position updated during drag
    setPos({
      x: info.point.x - boxSize/2,
      y: info.point.y - boxSize/2
    });
  };
  
  return (
    <motion.div 
      className="skill-box absolute flex items-center justify-center skill-orb-draggable"
      style={{ 
        width: `${boxSize}px`, 
        height: `${boxSize}px`, 
        backgroundColor: `${color}10`,
        color: textColor,
        borderColor: color,
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        fontSize: `${boxSize / 7}px`,
        boxShadow: `0 4px 12px rgba(0, 0, 0, 0.1)`,
        zIndex: isBeingDragged ? 50 : 1
      }}
      initial={{ scale: 0 }}
      animate={{ 
        scale: hasBeenClicked ? [1, 1.2, 1] : 1
      }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: Math.random() * 0.5 
      }}
      whileHover={{ 
        scale: 1.05,
        borderColor: color,
        boxShadow: `0 8px 20px rgba(58, 134, 255, 0.2)`
      }}
      drag
      dragConstraints={{
        top: 0,
        left: 0,
        right: containerWidth - boxSize,
        bottom: containerHeight - boxSize
      }}
      dragElastic={0.2}
      dragTransition={{ bounceStiffness: 400, bounceDamping: 10 }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrag={handleDrag}
      onClick={handleClick}
    >
      <motion.span 
        animate={hasBeenClicked ? { scale: [1, 1.2, 1], opacity: [1, 0.8, 1] } : {}}
        transition={{ duration: 0.5 }}
      >
        {name}
      </motion.span>
      
      {/* Pulse effect when clicked */}
      {hasBeenClicked && (
        <motion.div
          className="absolute inset-0 bg-transparent border-2 rounded-lg"
          style={{ borderColor: color }}
          initial={{ scale: 0.8, opacity: 1 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ 
            repeat: 2, 
            duration: 1,
            ease: "easeOut"
          }}
        />
      )}
    </motion.div>
  );
};

export default SkillOrb;
