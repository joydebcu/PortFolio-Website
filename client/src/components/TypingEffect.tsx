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
  typingSpeed = 50,    // Much faster typing speed
  deleteSpeed = 30,    // Much faster deletion speed
  pauseTime = 1000,    // Longer pause time to read
  initialDelay = 100 // Initial delay before starting
}: TypingEffectProps) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const type = () => {
      const currentPhrase = phrases[currentIndex];

      // Determine the next text based on whether we're typing or deleting
      const nextText = isDeleting
        ? currentPhrase.substring(0, currentText.length - 1)
        : currentPhrase.substring(0, currentText.length + 1);

      setCurrentText(nextText);

      // Determine typing speed based on current action
      let speed = isDeleting ? deleteSpeed : typingSpeed;

      // Handle text completion and phase changes
      if (!isDeleting && nextText === currentPhrase) {
        // Typing complete, pause before deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      } else if (isDeleting && nextText === '') {
        // Deleting complete, move to next phrase
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % phrases.length);
        timeout = setTimeout(type, pauseTime / 2); // Use half of pause time before typing next phrase
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
    <span className="relative">
      <span id="role-text">{currentText}</span>
      <span className="absolute -right-4 top-0 h-full w-1 bg-primary animate-pulse"></span>
    </span>
  );
};

export default TypingEffect;
