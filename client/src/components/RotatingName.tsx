import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface RotatingNameProps {
  text: string;
  className?: string;
}

const RotatingName = ({ text, className = '' }: RotatingNameProps) => {
  const [isAnimating, setIsAnimating] = useState(true);
  
  // Restart animation periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(false);
      setTimeout(() => setIsAnimating(true), 50);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  const letterVariants = {
    hover: (i: number) => ({
      y: [-2, -15, -2],
      transition: {
        duration: 0.6,
        ease: "easeInOut", 
        delay: i * 0.05
      }
    })
  };
  
  return (
    <div className={`w-full ${className}`}>
      <motion.div
        className="group"
        animate={isAnimating ? { 
          scale: [1, 1.05, 1]
        } : { scale: 1 }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.5, 1]
        }}
        whileHover="hover"
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
          {text.split('').map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              custom={index}
              className="inline-block"
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </motion.h1>
      </motion.div>
    </div>
  );
};

export default RotatingName;