import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';

const Contact = () => {
  return (
    <section id="contact" className="py-20 px-4 relative">
      <div className="container mx-auto max-w-4xl">
        <motion.h2 
          className="text-4xl font-heading font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Get In <span className="text-gradient">Touch</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div 
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-lg mb-8 leading-relaxed">
              I'm always open to new opportunities, collaborations, or just a friendly chat about technology. 
              Feel free to reach out through any of the channels below.
            </p>
            
            <div className="space-y-4">
              <motion.div 
                className="flex items-center gap-4"
                whileHover={{ x: 5 }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl">
                  <i className="ri-mail-line"></i>
                </div>
                <div>
                  <h4 className="text-sm text-light/50">Email</h4>
                  <a href="mailto:joydeb1999217@gmail.com" className="text-lg hover:text-primary transition-colors">
                    joydeb1999217@gmail.com
                  </a>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-4"
                whileHover={{ x: 5 }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl">
                  <i className="ri-map-pin-line"></i>
                </div>
                <div>
                  <h4 className="text-sm text-light/50">Location</h4>
                  <p className="text-lg">Noida, Uttar Pradesh, India</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-4"
                whileHover={{ x: 5 }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl">
                  <i className="ri-linkedin-fill"></i>
                </div>
                <div>
                  <h4 className="text-sm text-light/50">LinkedIn</h4>
                  <a href="https://www.linkedin.com/in/joy-deb/" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-primary transition-colors">
                    linkedin.com/in/joy-deb
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-dark/70 backdrop-blur-sm border border-primary/20 rounded-xl p-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
