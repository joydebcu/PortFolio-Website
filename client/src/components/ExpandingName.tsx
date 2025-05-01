import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface ExpandingNameProps {
  text: string;
  className?: string;
}

const ExpandingName = ({ text, className = '' }: ExpandingNameProps) => {
  const [isAnimating, setIsAnimating] = useState(true);
  
  // Restart animation periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(false);
      setTimeout(() => setIsAnimating(true), 50);
    }, 4000); // Shorter interval for more frequent animations
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={`w-full ${className}`}>
      <motion.div
        className="group"
        animate={isAnimating ? { 
          scale: [1, 1.2, 1],
          letterSpacing: ['0px', '2px', '0px']
        } : { scale: 1, letterSpacing: '0px' }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.5, 1]
        }}
      >
        <motion.h1 
          className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-wide"
          style={{
            background: 'linear-gradient(to right, #3a86ff, #8338ec, #ff006e)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: `0 5px 20px rgba(58, 134, 255, 0.3)`
          }}
        >
          {text}
        </motion.h1>
      </motion.div>
    </div>
  );
};

export default ExpandingName; 