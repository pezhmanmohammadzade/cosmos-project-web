import { Helmet } from 'react-helmet-async';
import { useRef, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { secondaryProjects } from '../data/secondaryProjects';
import ProjectCard from '../components/projects/ProjectCard';
import SpiralGalaxy from '../components/cosmos/SpiralGalaxy';

gsap.registerPlugin(ScrollTrigger);

export default function SelectedProjects() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.page-header-element', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen pt-40 pb-40 px-6 lg:px-24 overflow-hidden">
      <Helmet>
        <title>Other Projects | Peak Human Performance</title>
        <meta name="description" content="Explore a collection of high-end applications focusing on strategic thinking, focus, and human performance engineering." />
        <meta property="og:title" content="Other Projects Showcase | Pezhman Mohammadzadeh" />
      </Helmet>
      
      {/* 3D SPIRAL GALAXY BACKGROUND (FINAL VISIBILITY FIX) */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.8} />
            <pointLight position={[0, 0, 10]} intensity={2} />
            <SpiralGalaxy />
          </Suspense>
        </Canvas>
      </div>

      {/* Ambient background layering (Behind the galaxy) */}
      <div className="fixed inset-0 bg-[#020202] z-[-2] pointer-events-none" />
      
      {/* Subtle Contrast Overlay (Ensures text pop) */}
      <div className="fixed inset-0 bg-[#020202]/10 z-0 pointer-events-none" />

      {/* Dynamic Vignette (Balanced for background depth) */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#020202_100%)] z-0 pointer-events-none opacity-70" />

      <div className="relative z-10 max-w-4xl mx-auto text-center mb-32">
        <span className="page-header-element section-label text-cosmo-blue/50 tracking-[0.6em] text-[10px] uppercase mb-4 block">
          Independent Explorations
        </span>
        <h1 className="page-header-element text-5xl md:text-8xl font-outfit font-bold mb-8 text-white">
          Other <span className="text-cosmo-cyan">Projects</span>
        </h1>
        <p className="page-header-element text-xl text-white/40 font-light max-w-2xl mx-auto leading-relaxed italic border-x border-white/5 px-12">
          "A collection of high-end applications exploring focus, strategic thinking, and human performance outside of the Cosmos ecosystem."
        </p>
      </div>

      <div className="relative z-10 flex flex-col gap-48">
        {secondaryProjects.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={index} 
          />
        ))}
      </div>
    </div>
  );
}
