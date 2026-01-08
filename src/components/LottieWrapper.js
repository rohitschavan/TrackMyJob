import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

/**
 * Reusable Lottie Animation Wrapper Component
 * Supports different animation types and sizes
 */
const LottieWrapper = ({ 
  src, 
  loop = true, 
  autoplay = true, 
  className = '',
  style = {},
  size = 'medium' // 'small', 'medium', 'large', 'fullscreen', or custom object {width, height}
}) => {
  if (!src) return null;

  // Size presets
  const sizePresets = {
    small: { width: '100px', height: '100px' },
    medium: { width: '200px', height: '200px' },
    large: { width: '400px', height: '400px' },
    fullscreen: { width: '100%', height: '100%' }
  };

  // Get size styles
  const sizeStyle = typeof size === 'string' 
    ? sizePresets[size] || sizePresets.medium
    : size;

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: sizeStyle.width,
    height: sizeStyle.height,
    ...style
  };

  return (
    <div className={`lottie-wrapper ${className}`} style={containerStyle}>
      <DotLottieReact
        src={src}
        loop={loop}
        autoplay={autoplay}
        className="lottie-animation"
      />
    </div>
  );
};

export default LottieWrapper;
