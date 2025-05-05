import { motion } from 'framer-motion';
import '@/styles/about.scss';

const About = () => {
  return (
    <section id="about" className="py-20 px-4 relative about-section mt-16">
      <div className="container mx-auto">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          About <span className="text-gradient">Me</span>
        </motion.h2>
        
        <div className="about-grid">
          <motion.div 
            className="about-content"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p>
              I'm a <span className="highlight-primary">Software Developer</span> with experience in building efficient, 
              scalable applications using modern web technologies. Currently working as an 
              <span className="highlight-accent"> SDE 1 at GeeksForGeeks</span>, I specialize in NextJS, Django, 
              and database technologies.
            </p>
            <p>
              With a strong foundation in Computer Science from <span className="highlight-primary">Chandigarh University</span>, 
              I enjoy solving complex problems and building user-friendly applications. I've successfully 
              solved <span className="highlight-accent">1000+ coding challenges</span> on platforms like LeetCode and GFG, 
              demonstrating my algorithmic thinking and problem-solving abilities.
            </p>
            <p>
              I'm passionate about creating software that makes a real difference, whether it's improving user experience, 
              optimizing performance, or solving critical business problems.
            </p>
          </motion.div>
          
          <motion.div 
            className="profile-container"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="profile-image-wrapper">
              <img 
                src="/images/profile.jpg" 
                alt="Joy Deb - Software Developer" 
              />
            </div>
            
            <motion.div 
              className="achievement-card bottom-left"
              animate={{ y: [0, -10, 0] }}
              transition={{ 
                repeat: Infinity, 
                duration: 6,
                ease: "easeInOut" 
              }}
            >
              <div className="achievement-content">
                <i className="ri-code-s-slash-line primary"></i>
                <span>1000+ coding problems solved</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="achievement-card top-right"
              animate={{ y: [0, -8, 0] }}
              transition={{ 
                repeat: Infinity, 
                duration: 5,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <div className="achievement-content">
                <i className="ri-trophy-line accent"></i>
                <span>Ranked 31st out of 6,800</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
