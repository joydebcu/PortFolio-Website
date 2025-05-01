import { useEffect, useState } from 'react';

type Confetti = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotate: number;
  animationDuration: number;
};

interface ConfettiEffectProps {
  isVisible: boolean;
  duration?: number;
  count?: number;
}

const ConfettiEffect = ({ isVisible, duration = 5000, count = 100 }: ConfettiEffectProps) => {
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  
  useEffect(() => {
    if (!isVisible) {
      setConfetti([]);
      return;
    }
    
    // Generate confetti pieces
    const colors = ['#3a86ff', '#8338ec', '#ff006e', '#fb5607', '#ffbe0b'];
    const newConfetti: Confetti[] = [];
    
    for (let i = 0; i < count; i++) {
      newConfetti.push({
        id: i,
        x: Math.random() * 100, // percentage of viewport width
        y: -5 - Math.random() * 10, // start above viewport
        size: 5 + Math.random() * 15,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotate: Math.random() * 360,
        animationDuration: 3 + Math.random() * 3
      });
    }
    
    setConfetti(newConfetti);
    
    // Clean up after duration
    const timer = setTimeout(() => {
      setConfetti([]);
    }, duration);
    
    return () => clearTimeout(timer);
  }, [isVisible, duration, count]);
  
  if (!isVisible || confetti.length === 0) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}vw`,
            top: `${piece.y}vh`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotate}deg)`,
            animation: `confetti-fall ${piece.animationDuration}s ease-in-out forwards`,
            opacity: 0.8,
            clipPath: Math.random() > 0.5 
              ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' // diamond
              : 'polygon(50% 0%, 100% 100%, 0% 100%)' // triangle
          }}
        />
      ))}
    </div>
  );
};

export default ConfettiEffect;