import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { secondaryProjects } from '../../data/secondaryProjects';
import ProjectCard from './ProjectCard';

gsap.registerPlugin(ScrollTrigger);

export default function SelectedProjects() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.header-element', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full z-10 bg-cosmo-dark">
      
      {/* 
        Visual Separation / Gradient Divider 
        Fades from Cosmos background seamlessly into an ultra-dark 
        gradient with a subtle particle/blur boundary.
      */}
      <div className="w-full h-40 bg-gradient-to-b from-transparent to-[#020202] pointer-events-none" />
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="relative w-full min-h-screen bg-[#020202] pt-32 pb-40 px-6 lg:px-24">
        
        {/* Subtle independent background ambient mapping */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center mb-32">
          <span className="header-element section-label text-white/30 tracking-[0.5em] mb-4">
            Explorations beyond the Cosmos ecosystem
          </span>
          <h2 className="header-element text-4xl md:text-6xl font-outfit font-bold mb-8 text-white/90">
            Selected Projects
          </h2>
          <p className="header-element text-lg text-white/40 font-light max-w-2xl mx-auto">
            A collection of independent high-end applications exploring focus, thinking, and human performance.
          </p>
        </div>

        <div className="relative z-10 flex flex-col gap-32">
          {secondaryProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
