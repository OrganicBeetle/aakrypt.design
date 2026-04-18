import React from 'react';
import bgTexture from '../assets/Landing Page/landing_page.png';

interface TransitionSpacerProps {
  height?: string;
  className?: string;
}

const TransitionSpacer: React.FC<TransitionSpacerProps> = ({ 
  height = "40vh", 
  className = "" 
}) => {
  return (
    <section 
      className={`relative w-full overflow-hidden bg-paper pointer-events-none ${className}`}
      style={{ height }}
    >
      {/* Background Texture matching Hero exactly */}
      <img
        src={bgTexture}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      
      {/* 
        NO gradients, NO grain, NO blending. 
        This ensures it is identical to the Hero background.
      */}
    </section>
  );
};

export default TransitionSpacer;
