import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function CosmosHero() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-element', {
        y: 40,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.2
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[100vh] flex items-center pt-24 px-6 lg:px-24">
      <div className="max-w-2xl z-10 pointer-events-auto" ref={textRef}>
        <span className="hero-element section-label text-white/50 tracking-[0.5em] mb-6 block uppercase">
          Phase 01 / <span className="opacity-fade">Echosystem</span>
        </span>
        <h1 className="hero-element text-5xl md:text-7xl lg:text-9xl font-outfit font-bold uppercase tracking-tighter leading-[0.85] mb-8">
          COSMOS<br />
          <span className="text-cosmo-cyan">
            PROJECT
          </span>
        </h1>
        <p className="hero-element text-lg md:text-xl text-white/60 font-light tracking-wide mb-12 leading-relaxed">
          Explore. Understand. Create the Universe. <br />
          A multi-app ecosystem that transforms astronomy into discovery, scientific understanding, and simulation-based interaction.
        </p>
        <div className="hero-element flex items-center gap-6">
          <button className="group relative px-8 py-4 bg-white/5 border border-white/10 hover:border-white/30 rounded-full overflow-hidden transition-colors">
            <span className="relative z-10 font-outfit font-bold text-xs uppercase tracking-[0.2em]">Explore Layers</span>
            <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
          </button>
        </div>
      </div>
    </div>
  );
}
