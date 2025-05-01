import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
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
}

const SkillOrb = ({ skill, containerWidth, containerHeight }: SkillOrbProps) => {
  const { name, color, size } = skill;
  const textColor = getContrastColor(color);
  const [isDragging, setIsDragging] = useState(false);
  const [isBeingDragged, setIsBeingDragged] = useState(false);
  const [hasBeenClicked, setHasBeenClicked] = useState(false);
  
  // Generate random positions that won't overlap too much
  const leftPos = Math.random() * (containerWidth - size);
  const topPos = Math.random() * (containerHeight - size);
  
  // Motion values for drag
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Scale based on drag state
  const scale = useTransform(
    [x, y],
    ([latestX, latestY]) => {
      const moveDistance = Math.sqrt(latestX * latestX + latestY * latestY);
      const maxDistance = 500;
      const scaleRange = isDragging ? [1, 1.2] : [1, 1];
      const scaleFactor = 1 + (moveDistance / maxDistance) * (scaleRange[1] - scaleRange[0]);
      return Math.min(scaleFactor, scaleRange[1]);
    }
  );
  
  // Bounce effect when dragging ends
  const handleDragEnd = () => {
    setIsDragging(false);
    setIsBeingDragged(false);
  };

  // Handle click for highlighting effect
  const handleClick = () => {
    setHasBeenClicked(!hasBeenClicked);
  };
  
  return (
    <motion.div 
      className="skill-orb absolute flex items-center justify-center rounded-full skill-orb-draggable"
      style={{ 
        width: `${size}px`, 
        height: `${size}px`, 
        backgroundColor: color,
        color: textColor,
        left: `${leftPos}px`,
        top: `${topPos}px`,
        fontSize: `${size / 6}px`,
        boxShadow: `0 10px 20px rgba(58, 134, 255, 0.15)`,
        zIndex: isBeingDragged ? 50 : 1,
        x,
        y,
        scale
      }}
      initial={{ scale: 0 }}
      animate={{ 
        scale: hasBeenClicked ? [1, 1.3, 1] : 1
      }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: Math.random() * 0.5 
      }}
      whileHover={{ 
        scale: 1.1
      }}
      drag
      dragConstraints={{
        top: 0,
        left: 0,
        right: containerWidth - size,
        bottom: containerHeight - size
      }}
      dragElastic={0.5}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      onDragStart={() => {
        setIsDragging(true);
        setIsBeingDragged(true);
      }}
      onDragEnd={handleDragEnd}
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
          className="absolute inset-0 rounded-full bg-transparent border-2"
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
