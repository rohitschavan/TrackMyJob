/**
 * Lottie Animation Configuration
 * Replace placeholder URLs with actual Lottie animation URLs
 * Get animations from: https://lottiefiles.com/
 */

export const ANIMATIONS = {
  // Loading Animations
  loading: "https://lottie.host/10f90267-8137-4b72-aa7b-93bb5e474cc1/SSQPXF1KtV.lottie",
  
  // Success/Confirmation Animations
  success: 'https://lottie.host/30dce50a-7372-4c3b-9986-7e884c3271c0/RW9Br6axiA.lottie', // TODO: Add success animation URL
  applicationCreated: null, // TODO: Add application created animation URL
  applicationUpdated: null, // TODO: Add application updated animation URL
  applicationDeleted: null, // TODO: Add application deleted animation URL
  
  // Empty States
  emptyApplications: null, // TODO: Add empty applications animation URL
  emptyDashboard: null, // TODO: Add empty dashboard animation URL
  noResults: null, // TODO: Add no results animation URL
  
  // Error States
  error: null, // TODO: Add error animation URL
  notFound: null, // TODO: Add not found animation URL
  
  // Actions
  searching: null, // TODO: Add searching animation URL
  saving: null, // TODO: Add saving animation URL
  deleting: null, // TODO: Add deleting animation URL
  
  // Welcome/Onboarding
  welcome: null, // TODO: Add welcome animation URL
  onboarding: null, // TODO: Add onboarding animation URL
  
  // Status Icons
  applied: null, // TODO: Add applied status animation URL
  interview: null, // TODO: Add interview status animation URL
  offer: null, // TODO: Add offer status animation URL
  rejected: null, // TODO: Add rejected status animation URL
  
  // Miscellaneous
  celebration: null, // TODO: Add celebration animation URL
  thinking: null, // TODO: Add thinking animation URL
  rocket: null, // TODO: Add rocket animation URL
};

/**
 * Helper function to get animation URL with fallback
 */
export const getAnimation = (key, fallback = null) => {
  return ANIMATIONS[key] || fallback || ANIMATIONS.loading;
};

/**
 * Animation presets for common use cases
 */
export const ANIMATION_PRESETS = {
  loading: {
    src: ANIMATIONS.loading,
    loop: true,
    autoplay: true,
    size: 'fullscreen'
  },
  success: {
    src: ANIMATIONS.success,
    loop: false,
    autoplay: true,
    size: 'medium'
  },
  empty: {
    src: ANIMATIONS.emptyApplications,
    loop: true,
    autoplay: true,
    size: 'large'
  },
  error: {
    src: ANIMATIONS.error,
    loop: false,
    autoplay: true,
    size: 'medium'
  }
};
