import { useRef, useEffect, useState } from 'react';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import gsap from 'gsap';
import CelestialCore from '../cosmos/CelestialCore';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function ProjectCard({ project, index }) {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const isEven = index % 2 === 0;
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.proj-card-element', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 1.5,
        stagger: 0.15,
        ease: 'power2.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPct = (x / rect.width - 0.5) * 2;
    const yPct = (y / rect.height - 0.5) * 2;
    
    setMousePos({ x: xPct, y: yPct });

    // High-inertia Comet rotation
    gsap.to(cardRef.current, {
      rotateX: -yPct * 10,
      rotateY: xPct * 10,
      scale: 1.02,
      duration: 0.8,
      ease: "power3.out",
      transformPerspective: 2000,
      overwrite: 'auto'
    });

    // Sub-element Parallax (Content only)
    gsap.to(cardRef.current.querySelector('.proj-content-layer'), {
      x: xPct * 20,
      y: yPct * 20,
      duration: 1.5,
      ease: "power3.out"
    });

    // Kinetic Light Head (Reflection Follow)
    gsap.to(cardRef.current.querySelector('.proj-light-follow'), {
      left: x,
      top: y,
      opacity: 0.1,
      duration: 1,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });

    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)",
    });

    gsap.to([
      cardRef.current.querySelector('.proj-content-layer'),
      cardRef.current.querySelector('.proj-light-follow')
    ], {
      x: 0, y: 0, opacity: 0,
      duration: 1.5,
      ease: "power3.inOut"
    });
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto flex flex-col items-center group">
      
      {/* Soft Background ambient glow isolated to this project */}
      <div className={cn(
        "absolute w-[500px] h-[500px] blur-[150px] rounded-full pointer-events-none opacity-10 z-0 transition-opacity duration-1000 group-hover:opacity-30",
        project.theme.bgGlow,
        isEven ? "left-[-10%] top-1/2 -translate-y-1/2" : "right-[-10%] top-1/2 -translate-y-1/2"
      )} />

      {/* Vertical ID Metadata (Architectural Feel) */}
      <div className={cn("absolute hidden md:block opacity-20 group-hover:opacity-40 transition-opacity", 
        !isEven ? "top-0 right-10" : "top-0 left-10"
      )}>
        <span className="font-mono text-[7px] tracking-[0.8em] uppercase vertical-text">
          PRJ_{project.id} // TYPE_{project.category.replace(/ /g, '_')}
        </span>
      </div>

      <div className={cn("relative z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center", 
        !isEven && "md:grid-flow-col-dense"
      )}>
        
        {/* Content Side */}
        <div className={cn("flex flex-col p-6", !isEven && "md:col-start-2")}>
          <div className="flex items-center gap-4 mb-4">
            <span className={cn("proj-card-element text-[10px] font-bold uppercase tracking-[0.4em] opacity-80 block", project.theme.accent)}>
              {project.category}
            </span>
            <div className="h-[1px] w-6 bg-white/10"></div>
            <span className="font-mono text-[7px] text-white/20 uppercase tracking-widest">DATA_LOC: {index}.03.92</span>
          </div>

          <h2 className="proj-card-element text-4xl md:text-5xl lg:text-6xl font-outfit font-bold mb-4 drop-shadow-sm">
            {project.name}
          </h2>
          <p className="proj-card-element text-lg md:text-xl text-white/50 font-light leading-relaxed mb-8">
            {project.description}
          </p>

          <ul className="proj-card-element space-y-3 mb-8">
            {project.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-4 text-sm text-white/50 font-light">
                <span className="w-1 h-1 rounded-full bg-white/30 backdrop-blur-sm"></span>
                {feature}
              </li>
            ))}
          </ul>

          <div className="proj-card-element self-start relative z-50">
            {project.downloadUrl ? (
              <div className="flex flex-wrap items-center gap-6">
                <a 
                  href={project.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn transition-transform duration-500 hover:scale-105 active:scale-95 shadow-[0_15px_45px_rgba(0,0,0,0.3)] rounded-[1.25rem] overflow-hidden"
                >
                  <img src="/assets/icons/app-store-badge.png" alt="Download on the App Store" className="h-[4.5rem] w-auto object-contain" />
                </a>

                {/* Visible QR Code beside the button */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-28 h-28 bg-white p-2.5 rounded-2xl shadow-[0_15px_45px_rgba(0,0,0,0.5)] border border-white/10 transition-transform duration-500 hover:scale-105">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(project.downloadUrl)}`} 
                      alt="Scan to Download" 
                      className="w-full h-full object-cover mix-blend-multiply opacity-90"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center px-8 py-4 h-[4.5rem] rounded-[1.25rem] bg-white/5 border border-white/10 backdrop-blur-md opacity-60">
                <span className="text-[12px] uppercase tracking-[0.3em] font-bold text-white/50 px-2 text-center">
                  Coming Soon to App Store
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Visual Side (Interactive Icon) */}
        <div className={cn("relative w-full aspect-[4/5] md:aspect-square flex justify-center items-center py-6 perspective-[2000px]", !isEven && "md:col-start-1")}>
          <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full h-full flex justify-center items-center relative group/card"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Kinetic Light Follow Head */}
            <div className="proj-light-follow absolute -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white opacity-0 blur-[60px] rounded-full pointer-events-none mix-blend-overlay z-50 transition-opacity duration-500" />

            <div className="relative w-[90%] h-[90%] flex justify-center items-center group" style={{ transformStyle: 'preserve-3d' }}>
              <div className="proj-visual-layer w-full h-full flex justify-center items-center" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(-40px)' }}>
                <img 
                  src={project.appIcon || project.visual} 
                  alt={project.name}
                  className="w-full h-full object-contain drop-shadow-[0_0_80px_rgba(255,255,255,0.15)] scale-[1.15]" 
                />
              </div>

              <div className="proj-content-layer absolute bottom-8 left-8 z-20 flex flex-col gap-4" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(90px)' }}>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
