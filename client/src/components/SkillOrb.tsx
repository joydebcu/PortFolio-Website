import { useRef, useEffect } from 'react';
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
}

const SkillOrb = ({ skill, containerWidth, containerHeight }: SkillOrbProps) => {
  const { name, color, size } = skill;
  const textColor = getContrastColor(color);
  
  // Generate random positions that won't overlap too much
  const leftPos = Math.random() * (containerWidth - size);
  const topPos = Math.random() * (containerHeight - size);
  
  return (
    <motion.div 
      className="skill-orb absolute flex items-center justify-center rounded-full cursor-pointer"
      style={{ 
        width: `${size}px`, 
        height: `${size}px`, 
        backgroundColor: color,
        color: textColor,
        left: `${leftPos}px`,
        top: `${topPos}px`,
        fontSize: `${size / 6}px`,
        boxShadow: `0 10px 20px rgba(58, 134, 255, 0.15)`
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: Math.random() * 0.5 
      }}
      whileHover={{ 
        scale: 1.1,
        boxShadow: `0 15px 30px rgba(58, 134, 255, 0.25)`
      }}
    >
      {name}
    </motion.div>
  );
};

export default SkillOrb;
