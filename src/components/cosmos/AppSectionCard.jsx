import { useRef, useEffect, useState } from 'react';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import gsap from 'gsap';
import CelestialCore from './CelestialCore';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function AppSectionCard({ app, index }) {
  const isEven = index % 2 === 0;
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.card-element', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out'
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
      rotateX: -yPct * 12,
      rotateY: xPct * 12,
      scale: 1.05,
      duration: 0.8,
      ease: "power3.out",
      transformPerspective: 1800,
      overwrite: 'auto'
    });

    // Sub-element Parallax (Content only, Visual handled by R3F)
    gsap.to(cardRef.current.querySelector('.content-layer'), {
      x: xPct * 25,
      y: yPct * 25,
      opacity: 1,
      duration: 1.5,
      ease: "power3.out"
    });

    // Kinetic Light Head (Reflection Follow)
    gsap.to(cardRef.current.querySelector('.light-follow'), {
      left: x,
      top: y,
      opacity: 0.15,
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

    gsap.to(cardRef.current.querySelector('.content-layer'), {
      x: 0, y: 0,
      duration: 1.5,
      ease: "power3.inOut"
    });

    gsap.to(cardRef.current.querySelector('.light-follow'), {
      opacity: 0,
      duration: 1.5,
      ease: "power3.inOut"
    });
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-6xl mx-auto flex flex-col items-center group/section">
      {/* Background ambient glow specifically for the app */}
      <div className={cn(
        "absolute w-[800px] h-[800px] blur-[200px] rounded-full pointer-events-none opacity-20 z-0",
        app.theme.bgGlow,
        isEven ? "left-[-30%] top-1/2 -translate-y-1/2" : "right-[-30%] top-1/2 -translate-y-1/2"
      )} />

      {/* Micro-Geometric Labels (Floating outside) */}
      <div className={cn("absolute hidden lg:block opacity-20 transition-opacity duration-1000 group-hover/section:opacity-50", 
        isEven ? "top-0 right-10" : "top-0 left-10"
      )}>
        <span className="font-mono text-[8px] tracking-[1em] uppercase vertical-text">
          {app.id}_SEC_{index + 1} // SYS_STABLE
        </span>
      </div>

      <div className={cn("relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center", 
        !isEven && "lg:grid-flow-col-dense"
      )}>
        
        {/* Content Side */}
        <div className={cn("flex flex-col", !isEven && "lg:col-start-2")}>
          <div className="flex items-center gap-4 mb-4">
            <span className={cn("card-element section-label !mb-0", app.theme.accent)}>
              / 0{index + 1} {app.role}
            </span>
            <div className="h-[1px] w-8 bg-white/10"></div>
            <span className="font-mono text-[8px] text-white/20 uppercase tracking-widest">
              X: {(index * 14.5).toFixed(2)} / Y: 102.4
            </span>
          </div>
          
          <h2 className="card-element text-5xl md:text-7xl font-outfit font-bold mb-6 drop-shadow-lg leading-tight">
            {app.name}
          </h2>
          <p className="card-element text-xl md:text-2xl text-white/80 font-light leading-relaxed mb-12 drop-shadow-md">
            {app.summary}
          </p>

          <div className="card-element space-y-6 mb-12">
            {app.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-6 p-6 rounded-2xl bg-black/40 border border-white/5 transition-all duration-500 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                <div className={cn("w-12 h-12 shrink-0 rounded-full flex items-center justify-center bg-black/60 border border-white/10 shadow-inner", app.theme.accent)}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d={feature.icon} />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-1 text-white drop-shadow-sm">{feature.title}</h4>
                  <p className="text-xs text-white/50 leading-relaxed uppercase tracking-wide">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="card-element flex flex-wrap gap-8 z-50 relative">
            {app.testFlightUrl && (
              <div className="flex flex-wrap items-center gap-6">
                <a 
                  href={app.testFlightUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 px-8 py-4 h-[4.5rem] rounded-[1.25rem] bg-white/10 border border-white/20 backdrop-blur-xl group/btn transition-all duration-500 hover:bg-white/20 hover:scale-105 active:scale-95 shadow-[0_15px_45px_rgba(0,0,0,0.5)]"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3.5 13 1.5-1.5" />
                    <path d="m19 6.5 1.5-1.5" />
                    <path d="M10.23 13H17.77" />
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    <path d="M14.5 19.5 12 17l-4.5 4.5" />
                    <path d="m6 10 1.5-1.5L9 10" />
                    <path d="M11.5 4.5 9 7l4.5 4.5" />
                  </svg>
                  <div className="flex flex-col items-start leading-none text-white">
                    <span className="text-[10px] uppercase tracking-wider opacity-60">Join the Beta</span>
                    <span className="text-base font-bold tracking-tight">TestFlight</span>
                  </div>
                </a>
                
                {/* Visible QR Code beside the button */}
                {!app.hideQR && (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-28 h-28 bg-white p-2.5 rounded-2xl shadow-[0_15px_45px_rgba(0,0,0,0.5)] border border-white/10 transition-transform duration-500 hover:scale-105">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(app.testFlightUrl)}`} 
                        alt="Scan to Join Beta" 
                        className="w-full h-full object-cover mix-blend-multiply opacity-90"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {app.downloadUrl ? (
              <div className="flex flex-wrap items-center gap-6">
                <a 
                  href={app.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 px-8 py-4 h-[4.5rem] rounded-[1.25rem] bg-white/10 border border-white/20 backdrop-blur-xl group/btn transition-all duration-500 hover:bg-white/20 hover:scale-105 active:scale-95 shadow-[0_15px_45px_rgba(0,0,0,0.5)]"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.1 2.48-1.34.03-1.77-.79-3.29-.79-1.53 0-1.99.77-3.27.82-1.31.05-2.31-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.36 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div className="flex flex-col items-start leading-none text-white">
                    <span className="text-[10px] uppercase tracking-wider opacity-60">Download on the</span>
                    <span className="text-base font-bold tracking-tight">App Store</span>
                  </div>
                </a>

                {/* Visible QR Code beside the button */}
                {!app.hideQR && (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-28 h-28 bg-white p-2.5 rounded-2xl shadow-[0_15px_45px_rgba(0,0,0,0.5)] border border-white/10 transition-transform duration-500 hover:scale-105">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(app.downloadUrl)}`} 
                        alt="Scan to Download" 
                        className="w-full h-full object-cover mix-blend-multiply opacity-90"
                      />
                    </div>
                  </div>
                )}
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

        {/* Visual Side (Interactive 3D Portal with Optical Physics) */}
        <div className={cn("relative w-full aspect-[4/5] lg:aspect-square flex justify-center items-center perspective-[3000px]", !isEven && "lg:col-start-1")}>
          <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={cn(
              "w-full h-full rounded-[3rem] p-1 border bg-black/50 backdrop-blur-xl transition-shadow duration-700 relative group/card",
              app.theme.border,
              `hover:shadow-[0_0_120px_${app.theme.primaryValue}50]`
            )}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* The Conic Neon Chase Border */}
            <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000 z-0 pointer-events-none">
               <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_20%,#fff_25%,transparent_30%)] animate-spin-slow opacity-20 pointer-events-none"></div>
            </div>

            {/* Kinetic Light Follow Head */}
            <div className="light-follow absolute -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white opacity-0 blur-[80px] rounded-full pointer-events-none mix-blend-overlay z-50 transition-opacity duration-500" />

            {/* Corner Micro-Geometric Labels */}
            <div className="absolute top-8 left-8 z-50 font-mono text-[6px] text-white/20 tracking-[0.5em] uppercase">SYSTEM_STABLE</div>
            <div className="absolute bottom-8 right-8 z-50 font-mono text-[6px] text-white/20 tracking-[0.5em] uppercase">PORTAL_v2.0</div>

            <div className="relative w-full h-full rounded-[2.8rem] bg-black/40" style={{ transformStyle: 'preserve-3d' }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none" />
              
              {/* 3D Celestial Core Portal with Branded Icon */}
              <div className="visual-layer w-full h-full scale-110" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(-80px)' }}>
                <CelestialCore 
                  appId={app.id} 
                  iconUrl={app.appIcon || app.visual}
                  xPct={mousePos.x} 
                  yPct={mousePos.y} 
                />
              </div>
              
              <div className="content-layer absolute bottom-12 left-12 z-50 flex flex-col gap-4 pointer-events-auto" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(120px)' }}>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md self-start">
                  {app.tagline}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
