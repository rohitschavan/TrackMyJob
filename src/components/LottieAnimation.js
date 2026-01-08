import React, { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import './Lottie.css'
const LOTTIES = [
  "https://lottie.host/10f90267-8137-4b72-aa7b-93bb5e474cc1/SSQPXF1KtV.lottie",
  "https://lottie.host/56468207-696b-4d07-9408-f8e7c2d626f2/EzBd38sBxA.lottie"
];

const QUOTES = [
  "Convincing the internet to do its job…",
  "Good things take time. Great things buffer.",
  "Please wait. This moment is loading.",
  "Patience detected. Respect increased.",
  "Almost there… probably.",
  "Turning coffee into code ☕",
];

const LottieAnimation = () => {
  const [animationIndex] = useState(() =>
    Math.floor(Math.random() * LOTTIES.length)
  );

  const [quote] = useState(() =>
    QUOTES[Math.floor(Math.random() * QUOTES.length)]
  );

  return (
    <div className="loader-screen">
      <DotLottieReact
        key={animationIndex}
        src={LOTTIES[animationIndex]}
        autoplay
        loop
        className="loader-lottie"
      />

      <h2 className="clip-text">
        <span>{quote}</span>
      </h2>
    </div>
  );
};

export default LottieAnimation;
