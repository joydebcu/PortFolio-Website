import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { scrollToElement } from '@/lib/utils';
import { useTheme } from './ThemeProvider';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { theme, toggleTheme } = useTheme();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (sectionId: string) => {
    scrollToElement(sectionId);
    setIsMobileMenuOpen(false);
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'achievements', 'contact'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;
        
        const rect = element.getBoundingClientRect();
        const offset = 200; // Adjust based on when you want to consider a section as "active"
        
        if (rect.top <= offset && rect.bottom >= offset) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about', label: 'About', icon: 'ri-user-line' },
    { id: 'experience', label: 'Experience', icon: 'ri-briefcase-line' },
    { id: 'projects', label: 'Projects', icon: 'ri-code-box-line' },
    { id: 'skills', label: 'Skills', icon: 'ri-tools-line' },
    { id: 'achievements', label: 'Achievements', icon: 'ri-trophy-line' },
    { id: 'contact', label: 'Contact', icon: 'ri-mail-line' }
  ];

  return (
    <nav className="fixed top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-primary/20">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <a 
          href="#hero" 
          className="text-xl font-heading font-bold text-gradient"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
        >
          Joy Deb
        </a>
        
        <div className="hidden md:flex items-center space-x-6 font-medium">
          {navItems.map(item => (
            <a 
              key={item.id}
              href={`#${item.id}`}
              className={`hover:text-primary transition-colors flex items-center gap-1 ${activeSection === item.id ? 'text-primary' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
              }}
            >
              <i className={`${item.icon} text-sm`}></i>
              <span>{item.label}</span>
            </a>
          ))}
          
          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-primary/10 transition-colors flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <i className="ri-moon-line text-xl"></i>
            ) : (
              <i className="ri-sun-line text-xl text-yellow-400"></i>
            )}
          </motion.button>
        </div>
        
        <div className="flex items-center md:hidden">
          <motion.button
            onClick={toggleTheme}
            className="p-2 mr-2 rounded-full hover:bg-primary/10 transition-colors flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <i className="ri-moon-line text-xl"></i>
            ) : (
              <i className="ri-sun-line text-xl text-yellow-400"></i>
            )}
          </motion.button>
          
          <button 
            id="mobile-menu-button" 
            className="text-2xl"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <i className={isMobileMenuOpen ? "ri-close-line" : "ri-menu-line"}></i>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div 
        id="mobile-menu" 
        className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden absolute w-full bg-background/95 backdrop-blur-lg border-b border-primary/20`}
      >
        <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
          {navItems.map(item => (
            <a 
              key={item.id}
              href={`#${item.id}`}
              className={`hover:text-primary transition-colors py-2 flex items-center gap-2 ${activeSection === item.id ? 'text-primary' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
              }}
            >
              <i className={`${item.icon}`}></i>
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
