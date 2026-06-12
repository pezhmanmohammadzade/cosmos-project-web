import { Helmet } from 'react-helmet-async';
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function PortalCard({ to, className, children }) {
  const cardRef = useRef(null);
  
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation (-10 to 10 degrees)
    const xPct = (x / rect.width - 0.5) * 2;
    const yPct = (y / rect.height - 0.5) * 2;
    
    gsap.to(cardRef.current, {
      rotateX: -yPct * 10,
      rotateY: xPct * 10,
      scale: 1.02,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return (
    <Link 
      ref={cardRef}
      to={to} 
      className={`portal-card group relative overflow-hidden rounded-[3rem] bg-white/[0.03] backdrop-blur-md flex flex-col justify-end p-12 lg:p-16 transition-colors duration-700 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Micro-label inner */}
      <div className="absolute top-8 left-8 z-50 font-mono text-[6px] text-white/20 tracking-[0.5em] uppercase">PORTAL_LINK_v2</div>
      {children}
    </Link>
  );
}

export default function Home() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation for the container
      gsap.from('.portal-card', {
        y: 60,
        opacity: 0,
        duration: 1.8,
        stagger: 0.2,
        ease: 'expo.out',
        delay: 0.2
      });

      // Variable Typography (Breathing Weight)
      gsap.fromTo('.breathing-text', 
        { fontWeight: 100, letterSpacing: '0.1em' },
        {
           fontWeight: 900, 
           letterSpacing: '-0.02em',
           scrollTrigger: {
             trigger: containerRef.current,
             start: "top top",
             end: "bottom center",
             scrub: 1.5
           }
        }
      );

      // Subtle floating animation
      gsap.to('.portal-wrapper', {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 0.5,
          from: 'start'
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
      <Helmet>
        <title>The Cosmos Echosystem | Pezhman Mohammadzadeh</title>
        <meta name="description" content="Experience the intersection of spatial architecture and digital engineering. Architecting the beyond through cinematic interaction design." />
        <meta property="og:title" content="The Cosmos Echosystem | Pezhman Mohammadzadeh" />
        <meta property="og:image" content="/assets/hubble_ultra_deep_field.png" />
      </Helmet>
      
      {/* Top Graphical Text */}
      <div className="relative z-10 mb-20 text-center">
        <div className="inline-block relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cosmo-blue/20 blur-[100px] rounded-full pointer-events-none" />
          
          {/* Micro-Geometric Labels */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-30 flex items-center gap-4">
             <span className="font-mono text-[7px] tracking-[0.8em] uppercase">SYSTEM_NAV_01</span>
             <div className="w-8 h-[1px] bg-white/20"></div>
             <span className="font-mono text-[7px] tracking-[0.8em] uppercase">LOC_34.02</span>
          </div>

          <span className="block text-[10px] md:text-xs font-bold tracking-[0.5em] uppercase text-cosmo-blue/80 mb-4 portal-card drop-shadow-[0_0_10px_rgba(0,210,255,0.5)]">Architecting the Beyond</span>
          <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-outfit tracking-tighter leading-none portal-card breathing-text">
            <span className="text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]">THE COSMOS</span> <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cosmo-blue via-cosmo-purple to-cosmo-cyan animate-gradient-x drop-shadow-[0_0_20px_rgba(189,0,255,0.3)]">
              ECHOSYSTEM
            </span>
          </h1>
        </div>
      </div>

      <div className="w-full max-w-7xl z-10 perspective-[2000px]">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-stretch">
          
          {/* Cosmos Project Portal */}
          <div className="portal-wrapper rounded-[3rem] h-full aspect-[4/5] md:aspect-square">
            <PortalCard 
              to="/cosmos-project" 
              className="border border-white/20 hover:border-cosmo-blue/80 hover:shadow-[0_0_80px_rgba(0,210,255,0.4)] h-full w-full"
            >
              {/* Background Image - Hubble Ultra Deep Field (Infinite Depth) */}
              <img 
                src="/assets/hubble_ultra_deep_field.jpg" 
                alt="Hubble Ultra Deep Field" 
                fetchpriority="high"
                className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:scale-110 transition-transform duration-[3s] ease-out z-0 filter brightness-[1.1] contrast-[1.2] saturate-[1.1]"
                style={{ transform: 'translateZ(-50px)' }}
              />
              
              {/* Strong Light Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-cosmo-dark via-cosmo-dark/40 to-transparent z-[1]" style={{ transform: 'translateZ(-10px)' }}></div>
              <div className="absolute inset-0 bg-cosmo-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-[2]"></div>
              
              {/* Content */}
              <div className="relative z-10 space-y-4" style={{ transform: 'translateZ(50px)' }}>
                <span className="inline-block px-5 py-2 rounded-full bg-cosmo-blue text-[10px] font-bold tracking-[0.3em] uppercase text-white shadow-[0_0_20px_rgba(0,210,255,1)]">
                  The Ecosystem
                </span>
                <h2 className="text-6xl md:text-7xl lg:text-8xl font-outfit font-bold text-white tracking-tighter drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)] leading-[0.9]">
                  Cosmos <br/> Project
                </h2>
                <p className="text-xl text-white/90 max-w-md group-hover:text-white transition-colors duration-500 font-medium drop-shadow-2xl">
                  Explore a vast universe of astronomical tools, systemic discovery, and cinematic simulations.
                </p>
              </div>

              {/* Icon */}
              <div className="absolute right-12 top-12 md:right-16 md:top-16 opacity-70 group-hover:opacity-100 transition-all duration-500 pointer-events-none" style={{ transform: 'translateZ(80px)' }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </PortalCard>
          </div>

          {/* Selected Projects Portal (Apple Vibe) */}
          <div className="portal-wrapper rounded-[3rem] h-full aspect-[4/5] md:aspect-square">
            <PortalCard 
              to="/selected-projects" 
              className="border border-white/20 hover:border-white/60 hover:shadow-[0_0_80px_rgba(255,255,255,0.25)] h-full w-full"
            >
              {/* Background Image - Clean Apple-esque Mesh Gradient */}
              <img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800" 
                alt="Selected Projects" 
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:scale-110 transition-transform duration-[3s] ease-out z-0 filter saturate-150 contrast-125 brightness-125"
                style={{ transform: 'translateZ(-50px)' }}
              />
              
              {/* Strong Light Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-[1]" style={{ transform: 'translateZ(-10px)' }}></div>
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-[1]"></div>
              
              {/* Content */}
              <div className="relative z-10 space-y-4" style={{ transform: 'translateZ(50px)' }}>
                <span className="inline-block px-5 py-2 rounded-full bg-white text-[10px] font-bold tracking-[0.3em] uppercase text-black shadow-[0_0_20px_rgba(255,255,255,0.8)]">
                  Premium Tools
                </span>
                <h2 className="text-6xl md:text-7xl lg:text-8xl font-outfit font-bold text-white tracking-tighter drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)] leading-[0.9]">
                  Selected <br/> Projects
                </h2>
                <p className="text-xl text-white/90 max-w-md group-hover:text-white transition-colors duration-500 font-medium drop-shadow-2xl">
                  High-performance applications designed with focus, precision, and human-centric experience at their core.
                </p>
              </div>

              {/* Icon */}
              <div className="absolute right-12 top-12 md:right-16 md:top-16 opacity-70 group-hover:opacity-100 transition-all duration-500 pointer-events-none" style={{ transform: 'translateZ(80px)' }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </PortalCard>
          </div>

        </div>
      </div>
    </div>
  );
}
