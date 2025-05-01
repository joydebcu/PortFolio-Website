import { motion } from 'framer-motion';
import TypingEffect from '@/components/TypingEffect';
import RotatingName from '@/components/RotatingName';
import { scrollToElement } from '@/lib/utils';
import { ScrollReveal } from '@/App';

const Home = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-16 px-4">
      <div className="container mx-auto text-center">
        <motion.div 
          className="animate-float"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* 3D rotating name instead of 3D text */}
          <div className="mb-6">
            <RotatingName text="Joy Deb" />
          </div>
          
          <div className="relative inline-block">
            <h2 className="text-xl md:text-2xl font-medium mb-8 relative">
              <TypingEffect phrases={['Software Developer', 'Problem Solver', 'Full Stack Developer', 'SDE 1']} />
            </h2>
          </div>
          
          <ScrollReveal className="scroll-reveal-up">
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-foreground/80">
              Crafting efficient software solutions with expertise in NextJS, Django, and database technologies.
            </p>
          </ScrollReveal>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <motion.a 
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToElement('contact');
              }}
              className="px-6 py-3 bg-primary hover:bg-primary/90 rounded-lg font-medium transition-colors"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.a>
            <motion.a 
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToElement('projects');
              }}
              className="px-6 py-3 border border-primary/50 hover:bg-primary/10 rounded-lg font-medium transition-colors"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>
          </div>
          
          <ScrollReveal className="scroll-reveal-up">
            <div className="flex justify-center space-x-6 text-2xl">
              <motion.a 
                href="mailto:joydeb1999217@gmail.com" 
                className="hover:text-primary transition-colors" 
                aria-label="Email"
                whileHover={{ y: -5, scale: 1.2 }}
              >
                <i className="ri-mail-line"></i>
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/joy-deb/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-primary transition-colors" 
                aria-label="LinkedIn"
                whileHover={{ y: -5, scale: 1.2 }}
              >
                <i className="ri-linkedin-fill"></i>
              </motion.a>
              <motion.a 
                href="https://github.com/joydeb1999" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-primary transition-colors" 
                aria-label="GitHub"
                whileHover={{ y: -5, scale: 1.2 }}
              >
                <i className="ri-github-fill"></i>
              </motion.a>
              <motion.a 
                href="https://leetcode.com/joydeb1999" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-primary transition-colors" 
                aria-label="LeetCode"
                whileHover={{ y: -5, scale: 1.2 }}
              >
                <i className="ri-code-box-line"></i>
              </motion.a>
            </div>
          </ScrollReveal>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
