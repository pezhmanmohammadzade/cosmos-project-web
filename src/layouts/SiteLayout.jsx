import { Outlet, useLocation } from 'react-router-dom';
import { useLayoutEffect, useRef } from 'react';
import Navbar from '../components/navigation/Navbar';
import AnimatedBackground from '../components/common/AnimatedBackground';
import CometCursor from '../components/common/CometCursor';
import FilmGrain from '../components/common/FilmGrain';
import gsap from 'gsap';

export default function SiteLayout() {
  const location = useLocation();
  const mainRef = useRef(null);

  useLayoutEffect(() => {
    // Spatial Warp Transition on Route Change
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (prefersReducedMotion) {
        gsap.set(mainRef.current, { opacity: 1, scale: 1, filter: 'blur(0px)' });
        return;
      }

      gsap.fromTo(mainRef.current, 
        { 
          opacity: 0, 
          scale: 0.9,
          filter: 'blur(20px)'
        },
        { 
          opacity: 1, 
          scale: 1, 
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'expo.out',
          clearProps: 'all'
        }
      );
    }, mainRef);

    return () => ctx.revert();
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen text-white bg-cosmo-dark overflow-hidden font-sans selection:bg-cosmo-blue selection:text-dark perspective-[2000px]">
      <CometCursor />
      <FilmGrain />
      <AnimatedBackground />
      <Navbar />
      
      <main ref={mainRef} className="relative z-10 w-full min-h-screen origin-center">
        <Outlet />
      </main>

      {/* Global Cinematic Footer */}
      <footer className="relative z-20 w-full py-12 px-6 lg:px-24 border-t border-white/5 bg-black/20 backdrop-blur-md">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">
              © 2026 Pezhman Mohammadzadeh Kordestani. All Rights Reserved.
            </p>
            <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest">
              Digital Architecture & Front-end Engineering
            </p>
          </div>
          <div className="flex gap-8">
            <span className="w-1.5 h-1.5 rounded-full bg-cosmo-blue/50 animate-pulse" />
            <span className="w-1.5 h-1.5 rounded-full bg-cosmo-cyan/50 animate-pulse delay-700" />
            <span className="w-1.5 h-1.5 rounded-full bg-cosmo-purple/50 animate-pulse delay-1000" />
          </div>
        </div>
      </footer>
    </div>
  );
}
