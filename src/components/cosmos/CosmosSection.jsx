import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CosmicBackground from './CosmicBackground';
import CentralOrbScene from './CentralOrbScene';
import CosmosHero from './CosmosHero';
import CosmosOverview from './CosmosOverview';
import AppShowcaseGrid from './AppShowcaseGrid';

gsap.registerPlugin(ScrollTrigger);

export default function CosmosSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Smoother scroll interactions handling global scroll bounds if needed
    // The components will handle their own ScrollTriggers
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-cosmo-dark">
      {/* Universal Background Layer */}
      <CosmicBackground />
      
      {/* 3D Visual Centerpiece Layer (Fixed while scrolling hero/overview, then fades/shifts) */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{ mixBlendMode: 'screen' }}>
         <CentralOrbScene />
      </div>

      {/* Content Layout */}
      <div className="relative z-10 w-full flex flex-col">
        <CosmosHero />
        <CosmosOverview />
        <AppShowcaseGrid />
      </div>
    </section>
  );
}
