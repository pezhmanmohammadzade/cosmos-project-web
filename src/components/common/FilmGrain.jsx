import { useEffect, useRef } from 'react';

export default function FilmGrain() {
  const containerRef = useRef(null);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] overflow-hidden"
    >
      <svg className="absolute inset-0 w-full h-full opacity-20 contrast-150 brightness-150">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
      
      <style>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10.1% { transform: translate(-5%, -10%); }
          20.1% { transform: translate(-15%, 5%); }
          30.1% { transform: translate(7%, -25%); }
          40.1% { transform: translate(-5%, 25%); }
          50.1% { transform: translate(-15%, 10%); }
          60.1% { transform: translate(15%, 0%); }
          70.1% { transform: translate(0, 15%); }
          80.1% { transform: translate(3%, 35%); }
          90.1% { transform: translate(-10%, 10%); }
        }
        .animate-grain {
          animation: grain 8s steps(10) infinite;
        }
      `}</style>
    </div>
  );
}
