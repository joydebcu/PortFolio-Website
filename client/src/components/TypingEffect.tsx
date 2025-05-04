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
  typingSpeed = 100,    // Slower typing speed for more natural feel
  deleteSpeed = 50,     // Slower deletion speed
  pauseTime = 2000,     // Longer pause to read
  initialDelay = 500    // Longer initial delay
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
      const randomVariation = Math.random() * 50 - 25; // ±25ms variation
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
  }, [currentText, currentIndex, isDeleting, phrases, typingSpeed, deleteSpeed, pauseTime, initialDelay]);

  return (
    <span className="relative inline-block min-w-[300px]">
      <span id="role-text" className="inline-block">{currentText}</span>
      <span className={`absolute -right-4 top-0 h-full w-1 bg-primary ${isPaused ? 'animate-none' : 'animate-pulse'}`}></span>
    </span>
  );
};

export default TypingEffect;
