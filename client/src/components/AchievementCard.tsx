import { motion } from 'framer-motion';

export interface Achievement {
  icon: string;
  title: string;
  description: string;
  iconColor: string;
}

interface AchievementCardProps {
  achievement: Achievement;
  index: number;
}

const AchievementCard = ({ achievement, index }: AchievementCardProps) => {
  const { icon, title, description, iconColor } = achievement;
  
  return (
    <motion.div 
      className="card bg-dark/70 backdrop-blur-sm border border-primary/20 rounded-xl p-6 text-center transition-transform"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className={`text-3xl text-${iconColor} mb-4`}>
        <i className={icon}></i>
      </div>
      <h4 className="text-lg font-medium mb-2">{title}</h4>
      <p className="text-light/80 text-sm">
        {description}
      </p>
    </motion.div>
  );
};

export default AchievementCard;
