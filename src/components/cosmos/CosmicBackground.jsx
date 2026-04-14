import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function CosmicBackground() {
  const bgRef = useRef(null);

  useEffect(() => {
    // Subtle background drift animation
    gsap.to(bgRef.current, {
      backgroundPosition: '100px 100px',
      duration: 30,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-0 bg-cosmo-dark pointer-events-none"></div>
      
      {/* Noise filter */}
      <svg className="hidden">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
      </svg>
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-5 mix-blend-overlay"
        style={{ filter: 'url(#noiseFilter)' }}
      ></div>

      {/* Gradient Drift */}
      <div 
        ref={bgRef}
        className="fixed inset-0 z-0 pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 210, 255, 0.1) 0%, rgba(5, 5, 10, 0) 50%)',
          backgroundSize: '200% 200%'
        }}
      ></div>
    </>
  );
}
