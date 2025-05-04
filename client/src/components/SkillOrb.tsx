import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

export interface Skill {
  name: string;
  color: string;
  experience: number;
  size: number;
}

interface Position {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

interface SkillOrbProps {
  id: number;
  skill: Skill;
  position: Position;
  containerWidth: number;
  containerHeight: number;
  orbPositions: Position[];
  updatePosition: (id: number, x: number, y: number, vx: number, vy: number) => void;
  boundaryRadius: number;
  centerX: number;
  centerY: number;
}

const SkillOrb = ({ 
  id,
  skill, 
  position,
  containerWidth, 
  containerHeight, 
  orbPositions,
  updatePosition,
  boundaryRadius,
  centerX,
  centerY
}: SkillOrbProps) => {
  const [isBeingDragged, setIsBeingDragged] = useState(false);
  const [colliding, setColliding] = useState(false);
  const orbRef = useRef<HTMLDivElement>(null);
  
  // Collision detection and movement animation
  useEffect(() => {
    if (isBeingDragged) return;
    
    const animationFrame = requestAnimationFrame(() => {
      // Use the position from props to avoid sync issues
      let { x, y, vx, vy, size } = position;
      let hasCollision = false;
      
      // Apply current velocity
      let newX = x + vx;
      let newY = y + vy;
      
      // Boundary collision detection
      if (newX < 0) {
        newX = 0;
        vx = -vx * 0.8;
        hasCollision = true;
      } else if (newX + size > containerWidth) {
        newX = containerWidth - size;
        vx = -vx * 0.8;
        hasCollision = true;
      }
      
      if (newY < 0) {
        newY = 0;
        vy = -vy * 0.8;
        hasCollision = true;
      } else if (newY + size > containerHeight) {
        newY = containerHeight - size;
        vy = -vy * 0.8;
        hasCollision = true;
      }
      
      // Circular boundary collision
      const orbCenterX = newX + size/2;
      const orbCenterY = newY + size/2;
      const dx = orbCenterX - centerX;
      const dy = orbCenterY - centerY;
      const distance = Math.sqrt(dx*dx + dy*dy);
      
      if (distance + size/2 > boundaryRadius) {
        const angle = Math.atan2(dy, dx);
        
        // Place on boundary
        newX = centerX + Math.cos(angle) * (boundaryRadius - size/2) - size/2;
        newY = centerY + Math.sin(angle) * (boundaryRadius - size/2) - size/2;
        
        // Reflect velocity
        const normalX = Math.cos(angle);
        const normalY = Math.sin(angle);
        const dot = vx * normalX + vy * normalY;
        vx = vx - 2 * dot * normalX;
        vy = vy - 2 * dot * normalY;
        
        hasCollision = true;
      }
      
      // Enhanced collision detection with other orbs
      orbPositions.forEach(orb => {
        if (orb.id === id) return;
        
        const orb1CenterX = newX + size/2;
        const orb1CenterY = newY + size/2;
        const orb2CenterX = orb.x + orb.size/2;
        const orb2CenterY = orb.y + orb.size/2;
        
        const dx = orb1CenterX - orb2CenterX;
        const dy = orb1CenterY - orb2CenterY;
        const distance = Math.sqrt(dx*dx + dy*dy);
        const minDistance = (size + orb.size) / 2;
        
        if (distance < minDistance) {
          // Calculate repulsion force
          const angle = Math.atan2(dy, dx);
          const repulsionStrength = 0.5;
          
          // Apply stronger repulsion when closer
          const overlap = minDistance - distance;
          const repulseFactor = Math.min(1, overlap / (minDistance * 0.5)) * repulsionStrength;
          
          vx += Math.cos(angle) * repulseFactor;
          vy += Math.sin(angle) * repulseFactor;
          
          hasCollision = true;
        }
      });
      
      // Apply friction to slow down movement
      vx *= 0.98;
      vy *= 0.98;
      
      // Update collision state for visual effects
      setColliding(hasCollision);
      
      // Only update position if it has changed significantly or has velocity
      if (
        Math.abs(newX - position.x) > 0.1 || 
        Math.abs(newY - position.y) > 0.1 ||
        Math.abs(vx) > 0.01 || 
        Math.abs(vy) > 0.01
      ) {
        updatePosition(id, newX, newY, vx, vy);
      }
    });
    
    return () => cancelAnimationFrame(animationFrame);
  }, [position, isBeingDragged, containerWidth, containerHeight, id, orbPositions, boundaryRadius, centerX, centerY, updatePosition]);
  
  // Handle drag events
  const handleDragStart = () => {
    setIsBeingDragged(true);
    updatePosition(id, position.x, position.y, 0, 0); // Reset velocity when dragging starts
  };
  
  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!orbRef.current) return;
    
    const rect = orbRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const x = clientX - rect.left - position.size/2;
    const y = clientY - rect.top - position.size/2;
    
    // Constrain within boundaries
    const constrainedX = Math.max(0, Math.min(containerWidth - position.size, x));
    const constrainedY = Math.max(0, Math.min(containerHeight - position.size, y));
    
    updatePosition(id, constrainedX, constrainedY, 0, 0);
  };
  
  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!orbRef.current) return;
    
    setIsBeingDragged(false);
    
    // Calculate velocity based on movement during drag
    const rect = orbRef.current.getBoundingClientRect();
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const clientY = 'changedTouches' in e ? e.changedTouches[0].clientY : e.clientY;
    
    const vx = (clientX - rect.left) * 0.05;
    const vy = (clientY - rect.top) * 0.05;
    
    updatePosition(id, position.x, position.y, vx, vy);
  };
  
  // Calculate font size based on orb size
  const fontSize = Math.max(10, Math.min(14, position.size / 3.5));
  
  // Calculate glow intensity based on experience level
  const glowIntensity = 10 + skill.experience * 5;
  
  return (
    <div 
      ref={orbRef}
      className={`absolute rounded-full flex items-center justify-center select-none
                 ${isBeingDragged ? 'cursor-grabbing z-50' : 'cursor-grab z-10'}
                 ${colliding ? 'animate-pulse' : ''}`}
      style={{
        left: position.x,
        top: position.y,
        width: position.size,
        height: position.size,
        background: `linear-gradient(135deg, ${skill.color}80, ${skill.color}30)`,
        border: `2px solid ${skill.color}${colliding ? '90' : '50'}`,
        boxShadow: `0 0 ${glowIntensity}px ${skill.color}${colliding ? '40' : '20'}`,
        color: '#fff',
        fontSize: `${fontSize}px`,
        fontWeight: 'bold',
        transform: isBeingDragged ? 'scale(1.1)' : 'scale(1)',
        transition: isBeingDragged ? 'none' : 'transform 0.2s, box-shadow 0.3s',
        touchAction: 'none',
        userSelect: 'none',
        textShadow: '0 1px 2px rgba(0,0,0,0.5)'
      }}
      onMouseDown={handleDragStart}
      onMouseMove={isBeingDragged ? handleDrag : undefined}
      onMouseUp={handleDragEnd}
      onMouseLeave={isBeingDragged ? handleDragEnd : undefined}
      onTouchStart={handleDragStart}
      onTouchMove={isBeingDragged ? handleDrag : undefined}
      onTouchEnd={handleDragEnd}
    >
      <span className="text-center px-1 leading-tight pointer-events-none">{skill.name}</span>
    </div>
  );
};

export default SkillOrb;
