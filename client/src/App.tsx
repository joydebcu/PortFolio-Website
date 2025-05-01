import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";

import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import ThemeToggle from "@/components/ThemeToggle";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Experience from "@/pages/Experience";
import Projects from "@/pages/Projects";
import Skills from "@/pages/Skills";
import Contact from "@/pages/Contact";

// Add ScrollReveal wrapper
import { useEffect, useState, useRef } from "react";

// ScrollReveal component for scroll animations
const ScrollReveal = ({ children, className }: { children: React.ReactNode, className: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when observer callback fires
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div 
      ref={ref}
      className={`${className} ${isVisible ? 'scroll-reveal-visible' : ''}`}
    >
      {children}
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <ParticleBackground />
          <ScrollProgress />
          <Navbar />
          <ThemeToggle />
          
          {/* Use single-page layout with sections rather than routes */}
          <main className="relative">
            <Home />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Contact />
          </main>
          
          <footer className="py-8 px-4 border-t border-primary/20">
            <div className="container mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <p className="text-light/60 text-sm">
                    &copy; {new Date().getFullYear()} Joy Deb. All rights reserved.
                  </p>
                </div>
                <div className="flex space-x-6 text-xl">
                  <a href="mailto:joydeb1999217@gmail.com" className="text-light/60 hover:text-primary transition-colors" aria-label="Email">
                    <i className="ri-mail-line"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/joy-deb/" target="_blank" rel="noopener noreferrer" className="text-light/60 hover:text-primary transition-colors" aria-label="LinkedIn">
                    <i className="ri-linkedin-fill"></i>
                  </a>
                  <a href="https://github.com/joydeb1999" target="_blank" rel="noopener noreferrer" className="text-light/60 hover:text-primary transition-colors" aria-label="GitHub">
                    <i className="ri-github-fill"></i>
                  </a>
                  <a href="https://leetcode.com/joydeb1999" target="_blank" rel="noopener noreferrer" className="text-light/60 hover:text-primary transition-colors" aria-label="LeetCode">
                    <i className="ri-code-box-line"></i>
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export { ScrollReveal };
export default App;
