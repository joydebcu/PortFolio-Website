import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { getContrastColor } from '@/lib/utils';

export interface Skill {
  name: string;
  color: string;
  size: number; // Size multiplier (1-5)
  experience: number; // 1-5 scale where 5 is highest experience
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
  const { name, color, size: skillSize, experience } = skill;
  // Calculate box size based on experience level (1-5)
  const baseSize = 50; // Base size in pixels
  const boxSize = baseSize + (experience * 10); // Size increases with experience
  
  // Use CSS variable for text color that changes with color scheme
  const textColor = 'var(--text-color)';
  
  const [isBeingDragged, setIsBeingDragged] = useState(false);
  const [hasBeenClicked, setHasBeenClicked] = useState(false);
  const [isColliding, setIsColliding] = useState(false);
  const [collisionCount, setCollisionCount] = useState(0);
  const controls = useAnimation();
  
  const [pos, setPos] = useState({
    x: Math.random() * (containerWidth - boxSize),
    y: Math.random() * (containerHeight - boxSize)
  });
  const [velocity, setVelocity] = useState({
    x: (Math.random() - 0.5) * 0.5,
    y: (Math.random() - 0.5) * 0.5
  });
  
  // Update position in parent component when position changes significantly
  useEffect(() => {
    const timer = setTimeout(() => {
      updatePosition(id, pos.x, pos.y);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [Math.floor(pos.x), Math.floor(pos.y), id, updatePosition]);
  
  // Animation and collision detection
  useEffect(() => {
    if (isBeingDragged) return;
    
    const moveInterval = setInterval(() => {
      let newX = pos.x + velocity.x;
      let newY = pos.y + velocity.y;
      let hasCollision = false;
      
      // Check if circular boundary is active
      if (boundaryRadius > 0 && centerX > 0 && centerY > 0) {
        const orbCenterX = newX + boxSize/2;
        const orbCenterY = newY + boxSize/2;
        const dx = orbCenterX - centerX;
        const dy = orbCenterY - centerY;
        const distanceFromCenter = Math.sqrt(dx*dx + dy*dy);
        const maxDistance = boundaryRadius - (boxSize/2);
        
        if (distanceFromCenter > maxDistance && maxDistance > 0) {
          const angle = Math.atan2(dy, dx);
          const bounceX = centerX + Math.cos(angle) * maxDistance - boxSize/2;
          const bounceY = centerY + Math.sin(angle) * maxDistance - boxSize/2;
          
          const normalX = Math.cos(angle);
          const normalY = Math.sin(angle);
          const dotProduct = velocity.x * normalX + velocity.y * normalY;
          
          setVelocity(prev => ({
            x: prev.x - 1.8 * dotProduct * normalX,
            y: prev.y - 1.8 * dotProduct * normalY
          }));
          
          newX = bounceX;
          newY = bounceY;
          hasCollision = true;
        }
      } else {
        if (newX <= 0 || newX + boxSize >= containerWidth) {
          setVelocity(prev => ({ ...prev, x: -prev.x * 0.9 }));
          newX = newX <= 0 ? 0 : containerWidth - boxSize;
          hasCollision = true;
        }
        
        if (newY <= 0 || newY + boxSize >= containerHeight) {
          setVelocity(prev => ({ ...prev, y: -prev.y * 0.9 }));
          newY = newY <= 0 ? 0 : containerHeight - boxSize;
          hasCollision = true;
        }
      }
      
      // Enhanced collision detection with other orbs
      orbPositions.forEach(orb => {
        if (orb.id === id) return;
        
        const dx = (newX + boxSize/2) - (orb.x + orb.size/2);
        const dy = (newY + boxSize/2) - (orb.y + orb.size/2);
        const distance = Math.sqrt(dx*dx + dy*dy);
        const minDistance = (boxSize + orb.size) / 2;
        
        if (distance < minDistance) {
          const angle = Math.atan2(dy, dx);
          const pushStrength = 0.4;
          
          setVelocity(prev => ({
            x: prev.x + Math.cos(angle) * pushStrength,
            y: prev.y + Math.sin(angle) * pushStrength
          }));
          
          hasCollision = true;
          setCollisionCount(prev => prev + 1);
        }
      });
      
      // Apply friction
      setVelocity(prev => ({
        x: prev.x * 0.98,
        y: prev.y * 0.98
      }));
      
      // Update collision state
      setIsColliding(hasCollision);
      
      // Update position
      setPos({ x: newX, y: newY });
      
    }, 16);
    
    return () => clearInterval(moveInterval);
  }, [isBeingDragged, pos, velocity, containerWidth, containerHeight, boxSize, id, orbPositions, boundaryRadius, centerX, centerY]);
  
  // Handle click for highlighting effect
  const handleClick = () => {
    setHasBeenClicked(!hasBeenClicked);
    controls.start({
      scale: [1, 1.2, 1],
      transition: { duration: 0.5 }
    });
  };
  
  // Handle drag events
  const handleDragStart = () => {
    setIsBeingDragged(true);
    setVelocity({ x: 0, y: 0 });
  };
  
  const handleDragEnd = (_e: any, info: any) => {
    setIsBeingDragged(false);
    setVelocity({
      x: info.velocity.x * 0.15,
      y: info.velocity.y * 0.15
    });
  };
  
  const handleDrag = (_e: any, info: any) => {
    setPos({
      x: info.point.x - boxSize/2,
      y: info.point.y - boxSize/2
    });
  };
  
  return (
    <motion.div 
      className="skill-box absolute flex items-center justify-center skill-orb-draggable rounded-full cursor-grab active:cursor-grabbing"
      style={{ 
        width: `${boxSize}px`, 
        height: `${boxSize}px`, 
        background: `linear-gradient(135deg, ${color}40, ${color}20)`,
        color: textColor,
        borderColor: color,
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        fontSize: `${Math.max(8, Math.min(12, boxSize / 6))}px`,
        boxShadow: isColliding 
          ? `0 8px 24px ${color}30, inset 0 0 20px ${color}20` 
          : `0 4px 12px ${color}15, inset 0 0 10px ${color}10`,
        zIndex: isBeingDragged ? 999 : 1,
        border: `1.5px solid ${color}${isColliding ? '40' : '20'}`,
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        WebkitFontSmoothing: 'antialiased',
        willChange: 'transform',
        position: 'absolute',
        pointerEvents: 'auto',
        '--text-color': 'var(--foreground)',
        opacity: 1,
        transition: 'all 0.3s ease',
        touchAction: 'none',
        userSelect: 'none',
        cursor: isBeingDragged ? 'grabbing' : 'grab',
        backdropFilter: 'blur(4px)'
      } as React.CSSProperties}
      animate={controls}
      whileHover={{ 
        scale: 1.1,
        borderColor: color,
        boxShadow: `0 8px 20px ${color}30, inset 0 0 30px ${color}20`,
        background: `linear-gradient(135deg, ${color}50, ${color}30)`
      }}
      drag
      dragConstraints={{
        top: 0,
        left: 0,
        right: containerWidth - boxSize,
        bottom: containerHeight - boxSize
      }}
      dragElastic={0.05}
      dragTransition={{ 
        bounceStiffness: 200,
        bounceDamping: 20,
        power: 0.2,
        timeConstant: 200
      }}
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrag={handleDrag}
      onClick={handleClick}
      whileDrag={{ 
        scale: 1.1,
        opacity: 1,
        zIndex: 999,
        cursor: 'grabbing',
        boxShadow: `0 12px 28px ${color}40, inset 0 0 40px ${color}30`,
        background: `linear-gradient(135deg, ${color}60, ${color}40)`
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <motion.span 
        className="text-center font-medium select-none"
        style={{
          transform: 'translateZ(0)',
          WebkitFontSmoothing: 'antialiased',
          pointerEvents: 'none',
          whiteSpace: 'normal',
          overflow: 'hidden',
          maxWidth: '90%',
          padding: '0 3px',
          letterSpacing: '0.02em',
          lineHeight: '1.2',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          wordBreak: 'break-word',
          textShadow: '0 1px 2px rgba(0,0,0,0.2)'
        }}
        animate={hasBeenClicked ? { scale: [1, 1.2, 1], opacity: [1, 0.8, 1] } : {}}
        transition={{ duration: 0.5 }}
      >
        {name.split(' ').map((word, index) => (
          <span key={index} style={{ 
            display: 'block',
            textAlign: 'center',
            width: '100%',
            textShadow: '0 1px 2px rgba(0,0,0,0.2)'
          }}>
            {word}
          </span>
        ))}
      </motion.span>
      
      {/* Collision effect */}
      {isColliding && (
        <motion.div
          className="absolute inset-0 bg-transparent border-2 rounded-full"
          style={{ borderColor: color }}
          initial={{ scale: 0.8, opacity: 1 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ 
            repeat: 1, 
            duration: 0.5,
            ease: "easeOut"
          }}
        />
      )}
      
      {/* Click effect */}
      {hasBeenClicked && (
        <motion.div
          className="absolute inset-0 bg-transparent border-2 rounded-full"
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
