import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const ContactForm = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSendAnimating, setIsSendAnimating] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSendAnimating(true);
    
    // In a real app, you would send this data to a server
    // Since this is frontend only, we'll just simulate a submission
    setTimeout(() => {
      // Show paper plane animation
      const buttonEl = formRef.current?.querySelector('button');
      if (buttonEl) {
        buttonEl.classList.add('send-animation', 'animate');
        
        // Create and animate a paper plane
        const paperPlane = document.createElement('div');
        paperPlane.innerHTML = '<i class="ri-send-plane-fill"></i>';
        paperPlane.className = 'absolute text-2xl text-primary';
        paperPlane.style.top = '50%';
        paperPlane.style.left = '50%';
        paperPlane.style.transform = 'translate(-50%, -50%)';
        buttonEl.appendChild(paperPlane);
        
        // Animate the paper plane
        setTimeout(() => {
          paperPlane.style.transition = 'all 0.8s ease-in-out';
          paperPlane.style.transform = 'translate(100vw, -100vh) rotate(45deg)';
          paperPlane.style.opacity = '0';
        }, 100);
        
        // Clean up the animation
        setTimeout(() => {
          buttonEl.classList.remove('send-animation', 'animate');
          if (paperPlane.parentNode) {
            paperPlane.parentNode.removeChild(paperPlane);
          }
          setIsSendAnimating(false);
          
          // Show success toast
          toast({
            title: "Message sent!",
            description: "Thank you for reaching out. I'll get back to you soon.",
          });
          
          // Reset form
          setFormData({
            name: '',
            email: '',
            message: ''
          });
          
          setIsSubmitting(false);
        }, 1200);
      }
    }, 600);
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.form
      ref={formRef}
      id="contact-form"
      className="space-y-4"
      onSubmit={handleSubmit}
      variants={formVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.div variants={itemVariants}>
        <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
        <input 
          type="text" 
          id="name" 
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-dark border border-primary/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
          placeholder="Your name"
          required
        />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
        <input 
          type="email" 
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-dark border border-primary/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
          placeholder="Your email"
          required
        />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
        <textarea 
          id="message" 
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-dark border border-primary/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
          placeholder="Your message"
          required
        ></textarea>
      </motion.div>
      
      <motion.button 
        type="submit"
        disabled={isSubmitting}
        className="relative w-full py-3 bg-primary hover:bg-primary/90 rounded-lg font-medium transition-colors disabled:opacity-70 overflow-hidden"
        variants={itemVariants}
        whileHover={{ scale: 1.02, boxShadow: '0 4px 20px rgba(58, 134, 255, 0.25)' }}
        whileTap={{ scale: 0.98 }}
      >
        {isSubmitting ? (
          <>
            {isSendAnimating ? (
              <span className="opacity-0">Sending...</span>
            ) : (
              <span>Sending...</span>
            )}
          </>
        ) : (
          "Send Message"
        )}
      </motion.button>
    </motion.form>
  );
};

export default ContactForm;
