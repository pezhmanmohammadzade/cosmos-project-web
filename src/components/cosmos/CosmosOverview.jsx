import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CosmosOverview() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.overview-element', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full py-32 px-6 lg:px-24 bg-gradient-to-b from-transparent to-cosmo-dark/50">
      <div className="max-w-4xl mx-auto text-center z-10 relative">
        <span className="overview-element section-label text-cosmo-blue">
          The Ecosystem
        </span>
        <h2 className="overview-element text-3xl md:text-5xl font-outfit font-bold mb-10 leading-snug">
          Four Layers of <br/> Cosmic Engagement
        </h2>
        <div className="overview-element grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 text-left">
          <div className="p-8 glass-panel rounded-3xl hover:border-white/20 transition-colors">
            <h3 className="text-xl font-bold font-outfit mb-3 text-white">Discovery</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Experience the universe through poetic stories and interactive visual timelines.
            </p>
          </div>
          <div className="p-8 glass-panel rounded-3xl hover:border-white/20 transition-colors">
            <h3 className="text-xl font-bold font-outfit mb-3 text-white">Analysis</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Dive into real NASA datasets, hunting for exoplanets using scientific methods.
            </p>
          </div>
          <div className="p-8 glass-panel rounded-3xl hover:border-white/20 transition-colors">
            <h3 className="text-xl font-bold font-outfit mb-3 text-white">Simulation</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Guide civilizations through cosmic evolution and filter events to shape history.
            </p>
          </div>
          <div className="p-8 glass-panel rounded-3xl hover:border-white/20 transition-colors">
            <h3 className="text-xl font-bold font-outfit mb-3 text-white">Exploration</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Embark on profound journeys across atmospheric 3D space environments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
