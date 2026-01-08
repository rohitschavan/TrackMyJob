import { motion } from "framer-motion";

const Background = () => {
  return (
    <motion.svg
      viewBox="0 0 320 384"
      className="absolute inset-0 z-0"
      variants={{
        hover: { scale: 1.4 },
        rest: { scale: 1 },
      }}
      transition={{ duration: 1, ease: "backInOut" }}
    >
      <motion.circle
        cx="160"
        cy="120"
        r="100"
        fill="#262626"
        variants={{
          hover: { scaleY: 0.6, y: -20 },
          rest: { scaleY: 1, y: 0 },
        }}
        transition={{ duration: 1, ease: "backInOut" }}
      />
      <motion.ellipse
        cx="160"
        cy="270"
        rx="100"
        ry="45"
        fill="#262626"
        variants={{
          hover: { scaleY: 2.2, y: -25 },
          rest: { scaleY: 1, y: 0 },
        }}
        transition={{ duration: 1, ease: "backInOut" }}
      />
    </motion.svg>
  );
};

export default Background;
