import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20 px-4 relative">
      <div className="container mx-auto">
        <motion.h2 
          className="text-4xl font-heading font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          About <span className="text-gradient">Me</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div 
            className="order-2 md:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-lg mb-6 leading-relaxed">
              I'm a <span className="text-primary font-medium">Software Developer</span> with experience in building efficient, 
              scalable applications using modern web technologies. Currently working as an 
              <span className="text-accent font-medium"> SDE 1 at GeeksForGeeks</span>, I specialize in NextJS, Django, 
              and database technologies.
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              With a strong foundation in Computer Science from <span className="text-primary font-medium">Chandigarh University</span>, 
              I enjoy solving complex problems and building user-friendly applications. I've successfully 
              solved <span className="text-accent font-medium">1000+ coding challenges</span> on platforms like LeetCode and GFG, 
              demonstrating my algorithmic thinking and problem-solving abilities.
            </p>
            <p className="text-lg leading-relaxed">
              I'm passionate about creating software that makes a real difference, whether it's improving user experience, 
              optimizing performance, or solving critical business problems.
            </p>
          </motion.div>
          
          <motion.div 
            className="order-1 md:order-2 relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="aspect-square rounded-2xl overflow-hidden border-4 border-primary/30 shadow-xl shadow-primary/10 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80" 
                alt="Professional software developer at work" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <motion.div 
              className="absolute -bottom-10 -left-10 bg-dark p-4 rounded-lg border border-primary/30 shadow-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ 
                repeat: Infinity, 
                duration: 6,
                ease: "easeInOut" 
              }}
            >
              <div className="flex items-center gap-2">
                <i className="ri-code-s-slash-line text-xl text-primary"></i>
                <span className="text-sm font-mono">1000+ coding problems solved</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute -top-8 -right-8 bg-dark p-4 rounded-lg border border-primary/30 shadow-lg"
              animate={{ y: [0, -8, 0] }}
              transition={{ 
                repeat: Infinity, 
                duration: 5,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <div className="flex items-center gap-2">
                <i className="ri-trophy-line text-xl text-accent"></i>
                <span className="text-sm font-mono">Ranked 31st out of 6,800</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
