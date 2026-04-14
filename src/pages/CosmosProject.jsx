import { Helmet } from 'react-helmet-async';
import { useRef, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

import CentralOrbScene from '../components/cosmos/CentralOrbScene';
import CosmosHero from '../components/cosmos/CosmosHero';
import CosmosOverview from '../components/cosmos/CosmosOverview';
import AppShowcaseGrid from '../components/cosmos/AppShowcaseGrid';

gsap.registerPlugin(ScrollTrigger);

export default function CosmosProject() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Reveal animation for entering the page
    gsap.fromTo(containerRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 1.5, ease: "sine.inOut" }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen pt-20">
      <Helmet>
        <title>Cosmos Ecosystem | Discovery & Simulation Layers</title>
        <meta name="description" content="Explore the three layers of the Cosmos ecosystem: Discovery, Analysis, and Simulation. Architecting astronomical experiences." />
        <meta property="og:title" content="Cosmos Project Ecosystem | Pezhman Mohammadzadeh" />
      </Helmet>
      
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
    </div>
  );
}
