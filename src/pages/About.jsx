import { Helmet } from 'react-helmet-async';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import CentralOrbScene from '../components/cosmos/CentralOrbScene';
import CosmosHero from '../components/cosmos/CosmosHero';
import CosmosOverview from '../components/cosmos/CosmosOverview';
import AppShowcaseGrid from '../components/cosmos/AppShowcaseGrid';
import GalacticCore from '../components/cosmos/GalacticCore';

const cn = (...classes) => classes.filter(Boolean).join(' ');

export default function About() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray('.about-anim');

      elements.forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none"
          },
          y: 30,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out'
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen pt-40 pb-40 px-6 lg:px-24">
      <Helmet>
        <title>About | Pezhman Mohammadzadeh</title>
        <meta name="description" content="Product designer and front-end architect specializing in building immersive, high-performance digital environments. Explore the trajectory and identity of a digital architect." />
        <meta property="og:title" content="About Pezhman Mohammadzadeh | Digital Architecture" />
      </Helmet>

      {/* Background ambient depth for About page */}
      <div className="fixed inset-0 pointer-events-none z-[-1] bg-gradient-to-b from-cosmo-navy/20 to-cosmo-dark/80" />

      {/* Bio / Identity Section with 3D Portrait */}
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-40">
        <div className="max-w-4xl">
          <span className="about-anim section-label text-cosmo-blue/50 tracking-[0.5em] mb-6 block">
            01 / Identity
          </span>
          <h1 className="about-anim text-5xl md:text-7xl font-outfit font-bold leading-[1.1] mb-8 text-white">
            Pezhman <span className="text-cosmo-cyan">Mohammadzadeh</span>
          </h1>
          <p className="about-anim text-2xl text-white/70 font-light max-w-3xl leading-relaxed mb-6">
            A creative product designer and front-end architect specializing in building immersive, high-performance digital environments.
          </p>

          {/* Architectural Logic Badge */}
          <div className="about-anim flex flex-wrap items-center gap-4 mb-8">
            <div className="px-4 py-2 rounded-lg bg-cosmo-cyan/10 border border-cosmo-cyan/20 text-cosmo-cyan text-[10px] font-bold uppercase tracking-widest">
              Architectural Logic
            </div>
            <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/50 text-[10px] font-bold uppercase tracking-widest">
              DBE @ University of FEDERICO II
            </div>
          </div>

          <p className="about-anim text-lg text-white/40 font-light max-w-2xl leading-relaxed">
            My workflow is rooted in Architectural Logic applying spatial thinking, structural integrity, and human-centric proportions to digital architecture. I blend systematic engineering with cinematic visual identity to create tools that resonate emotionally.
          </p>
        </div>

        {/* 3D Galactic Core - Placed on the Right */}
        <div className="about-anim w-full h-[600px] flex justify-center lg:justify-end relative">
          <GalacticCore />
        </div>
      </div>

      {/* Certifications Section */}
      <div className="relative z-10 max-w-6xl mb-40">
        <span className="about-anim section-label text-cosmo-purple/50 tracking-[0.5em] mb-8">
          02 / Credentials
        </span>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              id: 'CS50x',
              title: 'CS50x: Computer Science',
              org: 'Harvard University',
              year: '2025',
              color: 'bg-[#A51C30]',
              desc: 'Foundations of computational thinking, algorithms, and data structures across multiple languages.',
              url: 'https://cs50.harvard.edu/certificates/677883b6-1bc6-42bf-8eb4-8d9af87774a8'
            },
            {
              id: 'cs50python',
              title: 'CS50 Python: Programming',
              org: 'Harvard University',
              year: '2025',
              color: 'bg-[#A51C30]',
              desc: 'Advanced scripting, automated testing, and robust object-oriented programming patterns.',
              url: 'https://cs50.harvard.edu/certificates/ff32bb7e-76fb-4c96-893e-f608429e8b8d'
            },
            {
              id: 'CS50AI',
              title: 'CS50 AI: Artificial Intelligence',
              org: 'Harvard University',
              year: '2025',
              color: 'bg-[#A51C30]',
              desc: 'Exploration of search algorithms, machine learning, and neural networks for intelligent systems.',
              url: 'https://cs50.harvard.edu/certificates/f80cc9c2-0797-4a69-b57e-8a4e72dbf982'
            }
          ].map((cert) => (
            <div key={cert.id} className="about-anim relative p-10 rounded-[2.5rem] bg-white/[0.04] border border-white/10 backdrop-blur-xl overflow-hidden hover:bg-white/[0.06] transition-all duration-500 group flex flex-col min-h-[450px]">
              {/* Dynamic Accent Glow */}
              <div className={`absolute -top-20 -right-20 w-80 h-80 ${cert.color} opacity-10 blur-[100px] rounded-full group-hover:opacity-20 transition-opacity duration-700`} />

              <div className="flex justify-between items-start mb-8 z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:border-white/20 transition-all duration-500">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 15l-3 3-5-5M22 4L12 14l-3-3" className="text-white/80" />
                  </svg>
                </div>
                <p className="text-[10px] font-mono text-white/30 tracking-[0.3em]">{cert.year}</p>
              </div>

              <div className="relative z-10 mb-auto">
                <h3 className="text-2xl font-bold font-outfit text-white mb-2 group-hover:text-cosmo-blue transition-colors duration-500">{cert.title}</h3>
                <p className="text-xs text-white/40 uppercase tracking-[0.2em] mb-6">{cert.org}</p>
                <p className="text-sm text-white/60 font-light leading-relaxed max-w-[90%]">
                  {cert.desc}
                </p>
              </div>

              {/* Certificate Miniature Preview */}
              <div className="relative w-full h-32 mt-8 mb-8 rounded-xl overflow-hidden bg-black/40 border border-white/5 transition-transform duration-700 group-hover:scale-[1.02]">
                <img
                  src={`/assets/certificates/${cert.id}.png`}
                  alt={cert.title}
                  className="w-full h-full object-cover opacity-30 group-hover:opacity-60 transition-opacity duration-500"
                  onError={(e) => e.target.style.display = 'none'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>

              <div className="mt-4 pt-6 border-t border-white/5 flex items-center justify-between z-10">
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/40 hover:text-white transition-colors duration-300 flex items-center gap-2 group/link"
                >
                  Verify Credential
                  <span className="w-4 h-[1px] bg-white/20 group-hover/link:w-8 transition-all duration-300" />
                </a>
                <div className={`w-2 h-2 rounded-full ${cert.color} animate-pulse opacity-50`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resume/Timeline Section */}
      <div className="relative z-10 max-w-6xl">
        <span className="about-anim section-label text-cosmo-cyan/50 tracking-[0.5em] mb-8">
          03 / Trajectory
        </span>

        <div className="about-anim relative w-full p-1 lg:p-[1px] rounded-[3rem] bg-gradient-to-b from-white/20 to-transparent">
          <div className="w-full bg-black/80 backdrop-blur-3xl rounded-[3rem] overflow-hidden p-10 md:p-20 flex flex-col items-start relative">

            {/* Ambient inner glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-cosmo-blue/5 blur-[150px] pointer-events-none" />

            <div className="w-full flex flex-col md:flex-row md:items-start justify-between gap-12 z-10 mb-20">
              <div className="max-w-xl">
                <h3 className="text-5xl lg:text-6xl font-bold font-outfit mb-6">Professional Record</h3>
                <p className="text-xl text-white/50 font-light leading-relaxed">
                  Design leadership, technical architecture, and a specialized background in spatial design.
                </p>
              </div>

              <a
                href="/assets/resume.pdf"
                download
                className="shrink-0 group relative px-12 py-6 rounded-full overflow-hidden transition-all duration-500"
              >
                <div className="absolute inset-0 bg-white group-hover:bg-cosmo-blue transition-colors duration-500" />
                <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.4em] text-black">
                  Download Resume
                </span>
              </a>
            </div>

            {/* Real Timeline milestones */}
            <div className="w-full space-y-20 z-10">
            {[
                {
                  date: 'DEC 2025 - PRESENT',
                  role: 'Founder',
                  company: 'Cosmos Project',
                  points: [
                    'Developing an integrated ecosystem of learning applications.',
                    'Directing product vision and design-led strategic growth.',
                    'Implementing advanced AI narrators and high-fidelity 3D engines.'
                  ],
                  isCurrent: true
                },
                {
                  date: 'NOV 2024 - PRESENT',
                  role: 'Interaction Designer',
                  company: 'Freelance / Specialized Projects',
                  points: [
                    'Built high-fidelity web experiences using HTML, Python, React, Three.js, and GSAP.',
                    'Focused on immersive interaction patterns and micro-animations.',
                  ]
                },
                {
                  date: 'OCT 2023 - PRESENT',
                  role: "Master's degree in Design for the Built Environment",
                  company: 'Federico II University of Naples',
                  points: ['Digital Design specialization']
                },
                {
                  date: 'FEB 2012 - MAY 2017',
                  role: 'Bachelor of Architecture',
                  company: 'Islamic Azad University of Kermanshah',
                  points: []
                }
              ].map((milestone, idx) => (
              <div key={idx} className={cn("grid grid-cols-1 md:grid-cols-4 gap-8 group/milestone", milestone.isCurrent && "relative")}>
                <div className="md:col-span-1">
                  <p className={cn("text-xs font-mono tracking-widest mb-2 transition-colors duration-500", milestone.isCurrent ? "text-cosmo-blue" : "text-white/30 group-hover/milestone:text-white/60")}>
                    {milestone.date}
                  </p>
                </div>
                <div className="md:col-span-3 border-l border-white/10 pl-8 md:pl-12 pb-4">
                  <h4 className="text-2xl font-bold mb-2 text-white group-hover/milestone:text-cosmo-blue transition-colors duration-500">{milestone.role}</h4>
                  <p className="text-sm font-bold text-white/40 uppercase tracking-widest mb-6">{milestone.company}</p>
                  <ul className="space-y-4">
                    {milestone.points && milestone.points.map((p, pIdx) => (
                      <li key={pIdx} className="text-sm text-white/50 font-light flex items-start gap-4 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20 mt-1.5 shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              ))}
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
