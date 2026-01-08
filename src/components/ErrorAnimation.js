import React from 'react';
import { motion } from 'framer-motion';
import LottieWrapper from './LottieWrapper';
import { getAnimation } from '../config/animations';
import './Animations.css';

/**
 * Error Animation Component
 * Shows an error animation with message
 */
const ErrorAnimation = ({ 
  message = "Something went wrong",
  animationType = 'error',
  size = 'medium',
  onRetry,
  retryLabel = "Try Again"
}) => {
  const animationSrc = getAnimation(animationType);

  return (
    <motion.div 
      className="error-animation-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {animationSrc && (
        <motion.div
          className="error-animation"
          animate={{ 
            y: [0, -10, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <LottieWrapper 
            src={animationSrc}
            loop={true}
            autoplay={true}
            size={size}
          />
        </motion.div>
      )}
      {message && (
        <motion.p
          className="error-message"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {message}
        </motion.p>
      )}
      {onRetry && (
        <motion.button
          className="btn-primary error-retry-button"
          onClick={onRetry}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {retryLabel}
        </motion.button>
      )}
    </motion.div>
  );
};

export default ErrorAnimation;
