import { useState, useEffect } from 'react';

interface TypingEffectProps {
  phrases: string[];
  typingSpeed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
  initialDelay?: number;
}

const TypingEffect = ({ 
  phrases,
  typingSpeed = 50,    // Faster typing speed
  deleteSpeed = 30,    // Faster deletion speed
  pauseTime = 1000,    // Shorter pause to read
  initialDelay = 100   // Shorter initial delay
}: TypingEffectProps) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const type = () => {
      const currentPhrase = phrases[currentIndex];

      // Determine the next text based on whether we're typing or deleting
      const nextText = isDeleting
        ? currentPhrase.substring(0, currentText.length - 1)
        : currentPhrase.substring(0, currentText.length + 1);

      setCurrentText(nextText);

      // Add random variation to typing speed for more natural feel
      const randomVariation = Math.random() * 20 - 10; // ±10ms variation
      let speed = isDeleting ? deleteSpeed : typingSpeed;
      speed += randomVariation;

      // Handle text completion and phase changes
      if (!isDeleting && nextText === currentPhrase) {
        // Typing complete, pause before deleting
        setIsPaused(true);
        timeout = setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseTime);
      } else if (isDeleting && nextText === '') {
        // Deleting complete, move to next phrase
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % phrases.length);
        // Add a pause between phrases
        timeout = setTimeout(type, pauseTime / 2);
      } else {
        // Continue typing or deleting
        timeout = setTimeout(type, speed);
      }
    };

    // Start with initial delay
    timeout = setTimeout(type, initialDelay);

    return () => clearTimeout(timeout);
  }, [currentIndex, currentText, isDeleting, isPaused, phrases, typingSpeed, deleteSpeed, pauseTime, initialDelay]);

  return (
    <span className="relative inline-block">
      <span className="inline-block">{currentText}</span>
      <span 
        className={`absolute top-0 h-full w-0.5 bg-primary ${isPaused ? 'animate-none' : 'animate-pulse'}`}
        style={{ left: '100%' }}
      ></span>
    </span>
  );
};

export default TypingEffect;
