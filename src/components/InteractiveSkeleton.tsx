import { ParticleSkeleton } from './ParticleSkeletonImproved';
import { useShouldShowInteractive } from './useInteractionDetection';

interface InteractiveSkeletonProps {
  imageUrl: string;
  fallbackImageUrl?: string;
  className?: string;
  particleDensity?: number;
  repelStrength?: number;
  repelRadius?: number;
  returnSpeed?: number;
  particleSize?: number;
  displayWidth?: number;
}

/**
 * Interactive skeleton component that shows particle effect on capable devices
 * and falls back to static image on touch devices, reduced motion, or no WebGL
 */
export function InteractiveSkeleton({
  imageUrl,
  fallbackImageUrl,
  className = '',
  particleDensity = 0.4,
  repelStrength = 40,
  repelRadius = 100,
  returnSpeed = 0.12,
  particleSize = 2.5,
  displayWidth = 400,
}: InteractiveSkeletonProps) {
  const shouldShowInteractive = useShouldShowInteractive();

  // Use fallback image if provided, otherwise use the same image
  const fallbackSrc = fallbackImageUrl || imageUrl;

  if (!shouldShowInteractive) {
    // Fallback: static image for touch devices, reduced motion, or no WebGL
    return (
      <div className={`relative ${className}`}>
        <img
          src={fallbackSrc}
          alt="Skeleton"
          className="w-full h-full object-contain pointer-events-none"
          loading="lazy"
        />
      </div>
    );
  }

  // Interactive particle version
  return (
    <div className={`relative ${className}`}>
      <ParticleSkeleton
        imageUrl={imageUrl}
        particleDensity={particleDensity}
        repelStrength={repelStrength}
        repelRadius={repelRadius}
        returnSpeed={returnSpeed}
        particleSize={particleSize}
        displayWidth={displayWidth}
      />
    </div>
  );
}

export default InteractiveSkeleton;
