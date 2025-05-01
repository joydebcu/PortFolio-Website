import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    
    // In a real app, you would send this data to a server
    // Since this is frontend only, we'll just simulate a submission
    setTimeout(() => {
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
    }, 1000);
  };

  return (
    <form id="contact-form" className="space-y-4" onSubmit={handleSubmit}>
      <div>
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
      </div>
      
      <div>
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
      </div>
      
      <div>
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
      </div>
      
      <button 
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-primary hover:bg-primary/90 rounded-lg font-medium transition-colors disabled:opacity-70"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default ContactForm;
