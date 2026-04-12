import { useState } from 'react';
import { IrisWipeTransition } from './IrisWipeTransition';
import { BlurOverlayTransitionEnhanced } from './BlurOverlayTransition';
import { SkeletonToWheelMorphSimple } from './SkeletonToWheelMorph';

// Example Hero Content
function HeroDemo() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Centered content */}
      <div className="relative z-10 text-center px-8">
        <h1 className="text-7xl font-bold text-white mb-6" style={{ fontFamily: 'Anton, sans-serif' }}>
          AAKARSHITA SHARMA
        </h1>
        <p className="text-2xl text-gray-300 tracking-wider" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Fashion Designer
        </p>
        
        {/* Skeleton placeholder - replace with your interactive skeleton */}
        <div className="mt-12 w-64 h-96 mx-auto bg-gray-800/30 rounded-lg border-2 border-gray-700 flex items-center justify-center">
          <span className="text-gray-500 text-sm">Skeleton Placeholder</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// Example About/Design Philosophy Content
function AboutDemo() {
  return (
    <div 
      className="relative w-full h-full flex items-center justify-between px-16 overflow-hidden"
      style={{
        backgroundImage: 'url(/about-background.png), linear-gradient(to right, #f5f5f5, #e8e8e8)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Left: Text Content */}
      <div className="w-1/2 pr-16 z-10">
        <h2 
          className="text-6xl font-bold mb-8 text-gray-900"
          style={{ fontFamily: 'Anton, sans-serif' }}
        >
          DESIGN PHILOSOPHY
        </h2>
        
        <div 
          className="text-xl leading-relaxed text-gray-700 space-y-6"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          <p>
            Fashion is not just about aesthetics—it's about storytelling, emotion, and connection. 
            Each piece I create is a narrative woven through fabric, color, and form.
          </p>
          
          <p>
            My design philosophy centers on the intersection of traditional craftsmanship and 
            contemporary innovation. I believe in creating garments that transcend trends and 
            become timeless expressions of individuality.
          </p>
          
          <p>
            From avant-garde experimental pieces to refined ready-to-wear collections, my work 
            explores the boundaries of what fashion can be—challenging conventions while 
            honoring the artistry of the craft.
          </p>
        </div>
      </div>

      {/* Right: Image Wheel Placeholder */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="relative w-96 h-96">
          {/* Wheel placeholder - replace with your rotating image wheel */}
          <div className="absolute inset-0 rounded-full border-4 border-gray-400 bg-gray-200/50 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-2">Image Wheel</p>
              <p className="text-gray-500 text-xs">Rotating continuously</p>
            </div>
          </div>
          
          {/* Example image positions around wheel */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <div
              key={i}
              className="absolute w-20 h-20 bg-gray-800/20 rounded-lg border border-gray-400"
              style={{
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-200px) rotate(-${angle}deg)`,
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Main Demo Component with Transition Switcher
export function TransitionDemo() {
  const [activeTransition, setActiveTransition] = useState<'iris' | 'blur' | 'morph'>('blur');

  const transitions = [
    { id: 'iris', label: 'Iris Wipe (1B)', description: 'Expanding circle reveal' },
    { id: 'blur', label: 'Blur + Overlay (5A)', description: 'Smooth fade with grain' },
    { id: 'morph', label: 'Skeleton Morph (3A)', description: 'Particles transform' },
  ];

  return (
    <div className="relative">
      {/* Transition Switcher - Fixed top */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-bold text-lg mb-1">Transition Preview Demo</h3>
              <p className="text-gray-400 text-sm">Scroll down to see the transition effect</p>
            </div>
            
            <div className="flex gap-4">
              {transitions.map((transition) => (
                <button
                  key={transition.id}
                  onClick={() => setActiveTransition(transition.id as any)}
                  className={`
                    px-6 py-3 rounded-lg transition-all duration-300
                    ${activeTransition === transition.id 
                      ? 'bg-white text-black' 
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                    }
                  `}
                >
                  <div className="font-semibold">{transition.label}</div>
                  <div className="text-xs opacity-70 mt-1">{transition.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Active Transition Component */}
      <div className="pt-20">
        {activeTransition === 'iris' && (
          <IrisWipeTransition
            heroContent={<HeroDemo />}
            aboutContent={<AboutDemo />}
            startFromCenter={true}
          />
        )}

        {activeTransition === 'blur' && (
          <BlurOverlayTransitionEnhanced
            heroContent={<HeroDemo />}
            aboutContent={<AboutDemo />}
          />
        )}

        {activeTransition === 'morph' && (
          <SkeletonToWheelMorphSimple
            heroContent={<HeroDemo />}
            aboutContent={<AboutDemo />}
            skeletonImageUrl="/skeleton-bgremoved.png"
          />
        )}
      </div>

      {/* Instructions Overlay */}
      <div className="fixed bottom-8 right-8 z-50 bg-black/80 backdrop-blur-sm rounded-lg p-6 max-w-xs border border-white/10">
        <h4 className="text-white font-bold mb-3">How to Test:</h4>
        <ul className="text-gray-300 text-sm space-y-2">
          <li>• Switch between transitions using buttons above</li>
          <li>• Scroll down slowly to see the effect</li>
          <li>• Notice how hero fades and about page appears</li>
          <li>• Try different speeds of scrolling</li>
        </ul>
        
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs text-gray-400">
            <strong className="text-white">Current:</strong> {transitions.find(t => t.id === activeTransition)?.label}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TransitionDemo;
