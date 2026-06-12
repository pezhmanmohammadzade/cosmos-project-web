import { useState, useEffect, useLayoutEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import CosmicLabScene from '../components/cosmic-lab/CosmicLabScene';
import CosmicLabHUD from '../components/cosmic-lab/CosmicLabHUD';
import LabInfoSection from '../components/cosmic-lab/LabInfoSection';
import { LAB_MODES } from '../data/cosmicLabModes';

export default function CosmicLab() {
  const [currentMode, setCurrentMode] = useState(LAB_MODES.EXPLORE);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.lab-content', {
        opacity: 0,
        y: 20,
        duration: 1.5,
        ease: 'power3.out',
        stagger: 0.1
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-cosmo-dark text-white overflow-x-hidden selection:bg-cosmo-blue/30 selection:text-white">
      <Helmet>
        <title>Cosmic Lab | Tactical Simulation Interface</title>
        <meta name="description" content="Engage with a professional astronomical simulation dashboard featuring real-time data telemetry and volumetric nebula generation." />
      </Helmet>

      {/* Hero & Interactive Scene */}
      <section className="relative h-screen min-h-[800px] overflow-hidden">
        <CosmicLabScene mode={currentMode} isInteractive={isInteractive} />
        
        <div className="lab-content relative z-30">
          <CosmicLabHUD 
            currentMode={currentMode} 
            onModeChange={setCurrentMode} 
            isInteractive={isInteractive}
            onInteractiveToggle={() => setIsInteractive(!isInteractive)}
          />
        </div>
      </section>

      {/* Detailed Info Section */}
      <section className="relative z-10 bg-cosmo-dark">
        <div className="lab-content">
          <LabInfoSection 
            currentMode={currentMode} 
            onModeSelect={setCurrentMode} 
          />
        </div>
      </section>
      
      {/* Visual Depth Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] bg-cosmo-purple/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-cosmo-indigo/5 blur-[150px] rounded-full" />
      </div>
    </div>
  );
}
