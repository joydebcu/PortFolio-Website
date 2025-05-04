import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";

import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import ConfettiEffect from "@/components/ConfettiEffect";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Experience from "@/pages/Experience";
import Projects from "@/pages/Projects";
import Skills from "@/pages/Skills";
import Achievements from "@/pages/Achievements";
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
            <Achievements />
            <Contact />
          </main>
          
          <Footer />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export { ScrollReveal };
export default App;
