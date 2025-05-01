import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";

import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import ConfettiEffect from "@/components/ConfettiEffect";
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
  const [showConfetti, setShowConfetti] = useState(false);
  const achievementsTriggerRef = useRef<HTMLDivElement>(null);

  // Setup intersection observer for achievements section to trigger confetti
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowConfetti(true);
          // Stop observing once triggered
          if (achievementsTriggerRef.current) {
            observer.unobserve(achievementsTriggerRef.current);
          }
        }
      },
      {
        root: null,
        rootMargin: "0px", // Trigger right as section becomes visible
        threshold: 0.1
      }
    );

    if (achievementsTriggerRef.current) {
      observer.observe(achievementsTriggerRef.current);
    }

    return () => {
      if (achievementsTriggerRef.current) {
        observer.unobserve(achievementsTriggerRef.current);
      }
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <ParticleBackground />
          <ScrollProgress />
          <Navbar />
          
          {/* Confetti effect that triggers before achievements section */}
          <ConfettiEffect isVisible={showConfetti} duration={6000} count={150} />
          
          {/* Use single-page layout with sections rather than routes */}
          <main className="relative">
            <Home />
            <About />
            <Experience />
            <Projects />
            <Skills />
            
            {/* Invisible element that triggers confetti right before achievements section */}
            <div 
              ref={achievementsTriggerRef}
              className="absolute h-1 w-full pointer-events-none"
              style={{ bottom: '100vh' }} // Position it so it triggers one viewport height before achievements
              id="achievements-trigger"
            />
            
            {/* Achievements section */}
            <section id="achievements" className="py-20 px-4">
              <div className="container mx-auto">
                <h2 className="text-4xl md:text-5xl font-heading font-bold mb-12 text-center">
                  Achievements
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Achievement cards will go here */}
                  {[
                    {
                      title: "Open Source Contributor",
                      description: "Contributed to multiple open source projects, improving code quality and adding features",
                      icon: "ri-github-fill",
                      iconColor: "#3a86ff"
                    },
                    {
                      title: "Hackathon Winner",
                      description: "First place in college hackathon for innovative web application solution",
                      icon: "ri-trophy-fill",
                      iconColor: "#ffbe0b"
                    },
                    {
                      title: "Technical Publications",
                      description: "Published articles on modern web development techniques and best practices",
                      icon: "ri-article-fill",
                      iconColor: "#8338ec"
                    }
                  ].map((achievement, index) => (
                    <ScrollReveal 
                      key={index} 
                      className={`scroll-reveal-${index % 2 === 0 ? 'up' : 'right'}`}
                    >
                      <div className="card-3d bg-background/70 backdrop-blur-sm border border-primary/20 rounded-xl p-6 h-full hover:border-primary/50 transition-colors">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-4`} style={{ backgroundColor: `${achievement.iconColor}20`, color: achievement.iconColor }}>
                          <i className={achievement.icon}></i>
                        </div>
                        <h3 className="text-xl font-heading font-semibold mb-2">{achievement.title}</h3>
                        <p className="text-foreground/80">{achievement.description}</p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </section>
            
            <Contact />
          </main>
          
          <footer className="py-8 px-4 border-t border-primary/20">
            <div className="container mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <p className="text-foreground/60 text-sm">
                    &copy; {new Date().getFullYear()} Joy Deb. All rights reserved.
                  </p>
                </div>
                <div className="flex space-x-6 text-xl">
                  <a href="mailto:joydeb1999217@gmail.com" className="text-foreground/60 hover:text-primary transition-colors" aria-label="Email">
                    <i className="ri-mail-line"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/joy-deb/" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-colors" aria-label="LinkedIn">
                    <i className="ri-linkedin-fill"></i>
                  </a>
                  <a href="https://github.com/joydeb1999" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-colors" aria-label="GitHub">
                    <i className="ri-github-fill"></i>
                  </a>
                  <a href="https://leetcode.com/joydeb1999" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-colors" aria-label="LeetCode">
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
