import React, { useState, useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const LottieAnimation = ({ 
  message = null, // Set to null by default to hide text
  src = "https://lottie.host/10f90267-8137-4b72-aa7b-93bb5e474cc1/SSQPXF1KtV.lottie",
  loop = true,
  autoplay = true,
  minDisplayTime = 2500 // Minimum display time in milliseconds (2.5 seconds)
}) => {
  const [show, setShow] = useState(true);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    // Ensure minimum display time
    const elapsed = Date.now() - startTime;
    const remainingTime = Math.max(0, minDisplayTime - elapsed);
    
    const timer = setTimeout(() => {
      setShow(false);
    }, remainingTime);

    return () => clearTimeout(timer);
  }, [startTime, minDisplayTime]);

  if (!show) return null;

  return (
    <div className="lottie-fullscreen">
      <div className="lottie-wrapper">
        <div className="lottie-animation-container">
          <DotLottieReact
            src={src}
            loop={loop}
            autoplay={autoplay}
            className="lottie-animation"
          />
        </div>
        {message && (
          <div className="lottie-message">
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LottieAnimation;
