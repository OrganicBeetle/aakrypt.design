# 🎬 Page Transition Demo - Setup Guide

## 📦 What You Got

Interactive demos of **3 smooth page transitions** between Hero and Design Philosophy pages:

1. **Iris Wipe (Option 1B)** - Expanding circle reveal
2. **Blur + Overlay (Option 5A)** - Elegant fade with grain texture  
3. **Skeleton Morph (Option 3A)** - Particles transform (simplified version)

---

## 🚀 Quick Start (3 Steps)

### Step 1: Copy Files to Your Project

Copy these files to `src/components/`:

```
src/components/
├── IrisWipeTransition.tsx
├── BlurOverlayTransition.tsx
├── SkeletonToWheelMorph.tsx
└── TransitionDemo.tsx
```

### Step 2: Add to Your App

**Option A: Test Demo Page First (Recommended)**

Replace your `App.tsx` content temporarily:

```tsx
import { TransitionDemo } from './components/TransitionDemo';

function App() {
  return <TransitionDemo />;
}

export default App;
```

**Option B: Integrate Directly into Your Route**

```tsx
import { BlurOverlayTransitionEnhanced } from './components/BlurOverlayTransition';
import Hero from './components/Hero';
import About from './components/About';

function App() {
  return (
    <BlurOverlayTransitionEnhanced
      heroContent={<Hero />}
      aboutContent={<About />}
    />
  );
}
```

### Step 3: Run and Test

```bash
npm run dev
```

Open browser → **Scroll down slowly** → See the magic! ✨

---

## 🎨 Detailed Implementation for Each Transition

### Option 1: Iris Wipe (Expanding Circle)

**Best for:** Dramatic, focused attention, creative portfolios

```tsx
import { IrisWipeTransition } from './components/IrisWipeTransition';

<IrisWipeTransition
  heroContent={<YourHeroComponent />}
  aboutContent={<YourAboutComponent />}
  startFromCenter={true}  // false = follows cursor
/>
```

**Customization:**
- `startFromCenter={false}` - Circle expands from cursor position
- Edit scroll ranges in component for different timing
- Adjust blur amounts for softer/harder transitions

**Pros:** 
- Unique, cinematic
- Draws focus to center
- Works great with centered skeleton

**Cons:**
- Can feel gimmicky if overused
- Requires WebGL clip-path support

---

### Option 2: Blur + Overlay (Recommended)

**Best for:** Sophisticated, elegant, reliable, fashion-forward

```tsx
import { BlurOverlayTransitionEnhanced } from './components/BlurOverlayTransition';

<BlurOverlayTransitionEnhanced
  heroContent={<YourHeroComponent />}
  aboutContent={<YourAboutComponent />}
/>
```

**Customization:**

```tsx
// In BlurOverlayTransition.tsx, adjust these values:

// Blur intensity (line ~27)
const heroBlur = useTransform(scrollYProgress, [0, 0.35, 0.65], [0, 4, 12]);
// Change to: [0, 8, 20] for stronger blur

// Overlay opacity (line ~32)
const overlayOpacity = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 0.4, 0.9, 0.9, 0]);
// Adjust middle values for darker/lighter overlay

// Scale amount (line ~28)
const heroScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.98, 0.95]);
// Change to [1, 0.95, 0.90] for more dramatic scale
```

**Remove Grain Texture:**
Comment out lines ~48-54 in the component

**Change Overlay Color:**
Line ~44: Change gradient colors in `background` style

**Pros:**
- Smooth, professional
- Works on all devices
- High performance
- Easy to customize

**Cons:**
- Less "wow factor" than others
- Common pattern (but well-executed)

---

### Option 3: Skeleton Morph (Most Complex)

**Best for:** Maximum creativity, storytelling, unique portfolios

```tsx
import { SkeletonToWheelMorphSimple } from './components/SkeletonToWheelMorph';

<SkeletonToWheelMorphSimple
  heroContent={<YourHeroComponent />}
  aboutContent={<YourAboutComponent />}
  skeletonImageUrl="/skeleton-bgremoved.png"
/>
```

**Note:** The current version is a **simplified fade** because the full particle morph is complex. For the true morph effect:

1. Use `SkeletonToWheelMorph` (full version) instead of `Simple`
2. Requires more performance testing
3. May need WebGL fallbacks

**Full Morph Customization:**

```tsx
<SkeletonToWheelMorph
  heroContent={<Hero />}
  aboutContent={<About />}
  skeletonImageUrl="/skeleton-bgremoved.png"
  wheelRadius={250}  // Size of wheel circle
/>
```

**Pros:**
- Ultimate continuity
- Tells a story
- Most memorable

**Cons:**
- Complex implementation
- Performance intensive
- Needs fallback for mobile

---

## 🎛️ Tuning the Transitions

### Timing Adjustments

All transitions use scroll progress ranges. Adjust these for different feels:

**Faster transition:**
```tsx
// Current: transition happens across full scroll
const heroOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0, 0]);

// Faster: transition completes earlier
const heroOpacity = useTransform(scrollYProgress, [0, 0.4, 0.7], [1, 0, 0]);
```

**Slower transition:**
```tsx
// Slower: spread out the transition
const heroOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.5, 0]);
```

### Scroll Height

Change the container height for more/less scroll:

```tsx
// Current: 200vh (2x viewport height)
<div ref={containerRef} className="relative h-[200vh]">

// Shorter: quicker scroll
<div ref={containerRef} className="relative h-[150vh]">

// Longer: more time to appreciate
<div ref={containerRef} className="relative h-[250vh]">
```

---

## 📱 Mobile Responsiveness

### Current Behavior

All transitions work on mobile but may need optimization:

**Add mobile detection:**

```tsx
import { useState, useEffect } from 'react';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  
  return isMobile;
}

// In your component:
const isMobile = useIsMobile();

// Simplified transition for mobile
if (isMobile) {
  return <SimpleStackTransition {...props} />;
}
```

**Or adjust effects for mobile:**

```tsx
const isMobile = window.innerWidth < 768;

const heroBlur = useTransform(
  scrollYProgress, 
  [0, 0.5], 
  [0, isMobile ? 5 : 12]  // Less blur on mobile
);
```

---

## 🔧 Integration with Your Existing Components

### Using Your Real Hero Component

```tsx
import Hero from './components/Hero';
import About from './components/About';
import { BlurOverlayTransitionEnhanced } from './components/BlurOverlayTransition';

function HomePage() {
  return (
    <BlurOverlayTransitionEnhanced
      heroContent={<Hero />}
      aboutContent={<About />}
    />
  );
}
```

**Important:** Remove any height/positioning from your Hero and About components - the transition wrapper handles layout.

### Preserving Navigation

If you have a fixed navigation bar:

```tsx
function App() {
  return (
    <>
      {/* Fixed nav stays on top */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        {/* Your nav content */}
      </nav>

      {/* Transition below nav */}
      <div className="pt-20"> {/* Offset for nav height */}
        <BlurOverlayTransitionEnhanced
          heroContent={<Hero />}
          aboutContent={<About />}
        />
      </div>
    </>
  );
}
```

### Integrating with Router

If using React Router:

**Option A: Single scroll page (Recommended)**
```tsx
// One route, sections revealed by scroll
function HomePage() {
  return (
    <BlurOverlayTransitionEnhanced
      heroContent={<Hero />}
      aboutContent={<About />}
    />
  );
}
```

**Option B: Separate routes with shared transition**
```tsx
// More complex - coordinate route change with scroll
// Not recommended for this use case
```

---

## 🎭 Recommended Choice

### For Your Fashion Portfolio: **Blur + Overlay (Option 5A)**

**Why:**
1. ✅ **Sophisticated** - Matches high-end fashion aesthetic
2. ✅ **Reliable** - Works everywhere, no WebGL issues
3. ✅ **Smooth** - Premium feel, professional execution
4. ✅ **Customizable** - Easy to tune to your brand
5. ✅ **Performance** - Runs smoothly on all devices

**When to use others:**

- **Iris Wipe**: If you want something more dramatic and creative
- **Skeleton Morph**: If you're willing to invest time in the complex implementation for maximum uniqueness

---

## 🐛 Troubleshooting

### Transition doesn't start
- Check that container has height: `h-[200vh]`
- Verify scroll offset: `offset: ['start start', 'end start']`
- Ensure parent doesn't have `overflow: hidden`

### Choppy animation
- Reduce blur values
- Simplify grain texture
- Use `will-change: transform, opacity` in CSS
- Test on different devices

### Content doesn't fade properly
- Check z-index layering
- Verify opacity transforms are in correct order
- Ensure `pointer-events: none` on overlays

### Mobile layout breaks
- Add responsive height: `h-screen md:h-[200vh]`
- Reduce effects on mobile (see mobile section above)
- Test on actual devices, not just browser resize

---

## 📊 Performance Tips

1. **Use `will-change` sparingly:**
```tsx
<motion.div
  style={{ willChange: 'opacity, transform' }}
  className="..."
>
```

2. **Disable on low-end devices:**
```tsx
const isLowEnd = navigator.hardwareConcurrency < 4;
// Skip complex effects if isLowEnd
```

3. **Optimize images:**
- Use WebP format
- Lazy load images
- Compress backgrounds

4. **Monitor performance:**
```tsx
useFrame(() => {
  console.log('FPS:', Math.round(1000 / deltaTime));
});
```

---

## 📝 Next Steps

1. ✅ **Test the demo** - Run TransitionDemo.tsx
2. ✅ **Pick your favorite** - Try all three options
3. ✅ **Customize values** - Adjust timing, blur, opacity
4. ✅ **Integrate with real content** - Replace demo components
5. ✅ **Test on mobile** - Verify responsive behavior
6. ✅ **Add your images** - Skeleton, backgrounds, wheel
7. ✅ **Fine-tune** - Perfect the timing and feel

---

## 🎬 What's Next?

Once you've chosen your transition, we can:

1. **Build the rotating image wheel** component
2. **Create the full About page** layout
3. **Add smooth scroll integration** with Locomotive Scroll
4. **Implement the particle skeleton** from earlier
5. **Connect everything** into a seamless experience

**Ready to proceed?** Let me know which transition you prefer! 🚀

---

**Files Created:**
- `IrisWipeTransition.tsx` - Expanding circle reveal
- `BlurOverlayTransition.tsx` - Blur + overlay fade
- `SkeletonToWheelMorph.tsx` - Particle morph transition
- `TransitionDemo.tsx` - Interactive demo page

**Recommended:** Start with `TransitionDemo.tsx` to see all options live!
