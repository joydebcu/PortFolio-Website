import { useState, useEffect } from 'react';
import { scrollToElement } from '@/lib/utils';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

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
      const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'contact'];
      
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

  return (
    <nav className="fixed top-0 z-50 w-full backdrop-blur-md bg-dark/80 border-b border-primary/20">
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
        
        <div className="hidden md:flex space-x-6 font-medium">
          {[
            { id: 'about', label: 'About' },
            { id: 'experience', label: 'Experience' },
            { id: 'projects', label: 'Projects' },
            { id: 'skills', label: 'Skills' },
            { id: 'contact', label: 'Contact' }
          ].map(item => (
            <a 
              key={item.id}
              href={`#${item.id}`}
              className={`hover:text-primary transition-colors ${activeSection === item.id ? 'text-primary' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
        
        <button 
          id="mobile-menu-button" 
          className="md:hidden text-2xl"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <i className={isMobileMenuOpen ? "ri-close-line" : "ri-menu-line"}></i>
        </button>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div 
        id="mobile-menu" 
        className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden absolute w-full bg-dark/95 backdrop-blur-lg border-b border-primary/20`}
      >
        <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
          {[
            { id: 'about', label: 'About' },
            { id: 'experience', label: 'Experience' },
            { id: 'projects', label: 'Projects' },
            { id: 'skills', label: 'Skills' },
            { id: 'contact', label: 'Contact' }
          ].map(item => (
            <a 
              key={item.id}
              href={`#${item.id}`}
              className={`hover:text-primary transition-colors py-2 ${activeSection === item.id ? 'text-primary' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
