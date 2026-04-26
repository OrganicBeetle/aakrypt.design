import React from 'react';

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
      className={`relative w-full overflow-hidden pointer-events-none ${className}`}
      style={{ height }}
    />
  );
};

export default TransitionSpacer;
