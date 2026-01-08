import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LottieWrapper from './LottieWrapper';
import { getAnimation } from '../config/animations';
import './Animations.css';

/**
 * Success Animation Component
 * Shows a success animation with optional message
 */
const SuccessAnimation = ({ 
  message = "Success!",
  animationType = 'success',
  duration = 2000,
  onComplete,
  show = true
}) => {
  const [visible, setVisible] = useState(show);
  const animationSrc = getAnimation(animationType);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        if (onComplete) onComplete();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onComplete]);

  if (!visible || !animationSrc) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="success-animation-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="success-animation-container"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4, type: "spring" }}
          >
            <LottieWrapper 
              src={animationSrc}
              loop={false}
              autoplay={true}
              size="large"
            />
            {message && (
              <motion.p
                className="success-message"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {message}
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessAnimation;
