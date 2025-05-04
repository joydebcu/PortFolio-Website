import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      name: 'GitHub',
      icon: 'ri-github-fill',
      url: 'https://github.com/joydeb1999'
    },
    {
      name: 'LinkedIn',
      icon: 'ri-linkedin-fill',
      url: 'https://www.linkedin.com/in/joydeb-cu/'
    },
    {
      name: 'Twitter',
      icon: 'ri-twitter-fill',
      url: 'https://twitter.com/joydebcu'
    },
    {
      name: 'Email',
      icon: 'ri-mail-fill',
      url: 'mailto:joydebcu@gmail.com'
    }
  ];

  return (
    <footer className="bg-dark/50 backdrop-blur-sm border-t border-primary/20 py-6">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center text-sm text-primary/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Crafted and designed by{' '}
          <span className="text-primary font-semibold relative inline-block">
            Joy
            <span className="absolute inset-0 blur-[3px] bg-blue-500/40 animate-pulse"></span>
            <span className="absolute inset-0 blur-[6px] bg-blue-400/30 animate-pulse" style={{ animationDelay: '0.2s' }}></span>
            <span className="absolute inset-0 blur-[9px] bg-blue-300/20 animate-pulse" style={{ animationDelay: '0.4s' }}></span>
          </span>
          {' '}with the help of{' '}
          <span className="text-primary/60">AI</span>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 