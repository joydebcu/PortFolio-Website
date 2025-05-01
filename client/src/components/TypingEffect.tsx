import { useState, useEffect } from 'react';

interface TypingEffectProps {
  phrases: string[];
  typingSpeed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
}

const TypingEffect = ({ 
  phrases,
  typingSpeed = 60,   // Faster typing speed 
  deleteSpeed = 30,   // Faster deletion speed
  pauseTime = 1000    // Shorter pause time
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
      let speed = typingSpeed;

      if (isDeleting) {
        speed = deleteSpeed;
      }

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
        timeout = setTimeout(type, 500); // Pause before typing next phrase
      } else {
        // Continue typing or deleting
        timeout = setTimeout(type, speed);
      }
    };

    timeout = setTimeout(type, 1000);

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, phrases, typingSpeed, deleteSpeed, pauseTime]);

  return (
    <span className="relative">
      <span id="role-text">{currentText}</span>
      <span className="absolute -right-4 top-0 h-full w-1 bg-primary animate-pulse"></span>
    </span>
  );
};

export default TypingEffect;
