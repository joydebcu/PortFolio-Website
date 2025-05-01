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
          
          {/* Use single-page layout with sections rather than routes */}
          <main className="relative">
            <Home />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <section id="achievements" className="py-20 px-4">
              <div className="container mx-auto">
                <h2 className="text-4xl md:text-5xl font-heading font-bold mb-12 text-center">
                  Achievements
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Competitive Coding",
                      description: "Solved 1000+ challenging questions on Leetcode, GFG, and other competitive coding platforms.",
                      icon: "ri-code-box-line",
                      iconColor: "accent"
                    },
                    {
                      title: "CodeChef Competition",
                      description: "Secured 31st rank out of 6,800 participants in CodeChef Starters Nov '21 contest. Qualified for CodeChef SnackDown 2021.",
                      icon: "ri-trophy-line",
                      iconColor: "primary"
                    },
                    {
                      title: "Professional Recognition",
                      description: "Earned an 'Exceeds Expectations' performance rating at the end of internship, leading to a Pre-Placement Offer.",
                      icon: "ri-award-line",
                      iconColor: "secondary"
                    }
                  ].map((achievement, index) => (
                    <ScrollReveal 
                      key={index} 
                      className={`scroll-reveal-${index % 2 === 0 ? 'up' : 'right'}`}
                    >
                      <div className="card-3d border-2 border-primary/40 rounded-xl p-6 h-full hover:border-primary transition-colors hover:shadow-lg bg-background">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-4`} style={{ backgroundColor: `${achievement.iconColor}25`, color: achievement.iconColor }}>
                          <i className={achievement.icon}></i>
                        </div>
                        <h3 className="text-xl font-heading font-semibold mb-2">{achievement.title}</h3>
                        <p className="text-foreground/90">{achievement.description}</p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </section>
            <Contact />
          </main>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export { ScrollReveal };
export default App;
