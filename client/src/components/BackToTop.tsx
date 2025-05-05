import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { scrollToElement } from '@/lib/utils';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.pageYOffset / totalScroll) * 100;
      setScrollProgress(currentProgress);

      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    scrollToElement('hero');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={handleClick}
          className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-br from-primary/20 to-primary/10 
                     backdrop-blur-sm border border-primary/30 rounded-full 
                     text-primary transition-all duration-300
                     shadow-lg hover:shadow-primary/20"
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="relative w-12 h-12 flex items-center justify-center">
            {/* Circular progress indicator */}
            <svg className="absolute inset-0 -rotate-90 w-full h-full" viewBox="0 0 48 48">
              <motion.circle
                className="stroke-primary"
                strokeWidth="2"
                fill="none"
                cx="24"
                cy="24"
                r="22"
                strokeDasharray="138.2"
                strokeDashoffset={138.2 - (138.2 * scrollProgress) / 100}
                initial={{ strokeDashoffset: 138.2 }}
                animate={{ strokeDashoffset: 138.2 - (138.2 * scrollProgress) / 100 }}
                transition={{ duration: 0.1 }}
              />
            </svg>

            {/* Up button with icon */}
            <motion.div
              className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-primary/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className="relative"
                animate={{
                  y: [0, -2, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <i className="ri-arrow-up-s-line text-2xl"></i>
                <motion.div
                  className="absolute inset-0 bg-primary/20 rounded-full -z-10"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.2, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop; 