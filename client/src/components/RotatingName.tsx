import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface RotatingNameProps {
  text: string;
  className?: string;
}

const RotatingName = ({ text, className = '' }: RotatingNameProps) => {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    // Slow continuous rotation effect
    if (!isHovered) {
      controls.start({
        rotateY: [0, 360],
        transition: {
          duration: 20,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop"
        }
      });
    }
  }, [isHovered, controls]);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    setMousePosition({ x, y });
    
    controls.start({
      rotateY: x * 0.05,
      rotateX: -y * 0.05,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    });
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    controls.start({
      rotateY: [0, 360],
      rotateX: 0,
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop"
      }
    });
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current || !e.touches[0]) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left - rect.width / 2;
    const y = e.touches[0].clientY - rect.top - rect.height / 2;
    
    setMousePosition({ x, y });
    
    controls.start({
      rotateY: x * 0.05,
      rotateX: -y * 0.05,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    });
  };
  
  return (
    <div 
      ref={containerRef}
      className={`w-full perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
    >
      <motion.div
        className="preserve-3d"
        animate={controls}
        initial={{ rotateY: 0, rotateX: 0 }}
      >
        <motion.h1 
          className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold"
          style={{
            background: 'linear-gradient(to right, #3a86ff, #8338ec, #ff006e)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: `0 10px 30px rgba(58, 134, 255, 0.4)`
          }}
        >
          {text}
        </motion.h1>
      </motion.div>
    </div>
  );
};

export default RotatingName;