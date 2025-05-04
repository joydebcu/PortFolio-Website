import { motion } from 'framer-motion';
import AchievementCard from '@/components/AchievementCard';
import ConfettiEffect from '@/components/ConfettiEffect';
import { ScrollReveal } from '@/App';
import { achievementsData } from '@/data/achievements';
import { useRef, useState, useEffect } from 'react';

const Achievements = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const achievementsRef = useRef<HTMLDivElement>(null);
  
  // Trigger confetti effect when achievements section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowConfetti(true);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.7
      }
    );

    if (achievementsRef.current) {
      observer.observe(achievementsRef.current);
    }

    return () => {
      if (achievementsRef.current) {
        observer.unobserve(achievementsRef.current);
      }
    };
  }, []);

  return (
    <section id="achievements" className="py-20 px-4 relative">
      <div className="container mx-auto">
        <motion.h2 
          className="text-4xl font-heading font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          My <span className="text-gradient">Achievements</span>
        </motion.h2>
        
        <div ref={achievementsRef}>
          <ConfettiEffect isVisible={showConfetti} count={150} duration={8000} />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievementsData.map((achievement, index) => (
              <AchievementCard
                key={index}
                achievement={achievement}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements; 