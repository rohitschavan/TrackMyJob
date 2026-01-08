import React from 'react';
import { motion } from 'framer-motion';
import LottieWrapper from './LottieWrapper';
import { getAnimation } from '../config/animations';
import './Animations.css';

const EmptyState = ({ 
  title = "No applications yet", 
  message = "Start tracking your job applications", 
  actionLabel = "Add Your First Application",
  onAction,
  animationType = 'emptyApplications',
  animationSize = 'large'
}) => {
  const animationSrc = getAnimation(animationType);

  return (
    <motion.div 
      className="empty-state"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {animationSrc && (
        <motion.div 
          className="empty-state-animation"
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <LottieWrapper 
            src={animationSrc}
            loop={true}
            autoplay={true}
            size={animationSize}
          />
        </motion.div>
      )}
      {!animationSrc && (
        <motion.div 
          className="empty-state-icon"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          📋
        </motion.div>
      )}
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-message">{message}</p>
      {onAction && (
        <motion.button
          className="btn-primary empty-state-action"
          onClick={onAction}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {actionLabel}
        </motion.button>
      )}
    </motion.div>
  );
};

export default EmptyState;
