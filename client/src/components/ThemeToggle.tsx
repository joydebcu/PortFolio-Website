import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="fixed top-20 right-5 z-50">
      <motion.button
        onClick={toggleTheme}
        className="theme-switch group p-2.5 rounded-full bg-background/80 backdrop-blur-sm border border-primary/20 shadow-md"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        data-state={theme === 'dark' ? 'checked' : 'unchecked'}
      >
        <motion.div
          className="theme-switch-thumb flex items-center justify-center"
          layout
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
        >
          {theme === 'light' ? (
            <motion.i 
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              className="ri-sun-line text-amber-500"
            />
          ) : (
            <motion.i 
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              className="ri-moon-line text-indigo-300"
            />
          )}
        </motion.div>
      </motion.button>
    </div>
  );
};

export default ThemeToggle;