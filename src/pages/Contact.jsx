import { Helmet } from 'react-helmet-async';
import { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import WormholeConnector from '../components/cosmos/WormholeConnector';

/**
 * TacticalDataTag: A decorative UI element for the 'Data Terminal' look.
 */
function TacticalDataTag({ label, value, colorClass = "text-cosmo-blue" }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[8px] uppercase tracking-[0.3em] text-white/20">{label}</span>
      <span className={`text-[10px] uppercase tracking-widest font-mono ${colorClass}`}>{value}</span>
    </div>
  );
}

export default function Contact() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-beautify-anim', {
        y: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.4
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen pt-40 pb-40 px-6 lg:px-24 overflow-hidden">
      <Helmet>
        <title>Contact | Initiate Connection</title>
        <meta name="description" content="Reach out for architectural challenges, innovative collaborations, and cosmic inquiries. My communication bridge is open." />
        <meta property="og:title" content="Contact Pezhman Mohammadzadeh | Secure Transmission" />
      </Helmet>
      
      {/* 3D COSMIC INTERLINK (WORMHOLE) */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <WormholeConnector />
        </Canvas>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        
        {/* IDENTITY TERMINAL (Left Side) */}
        <div className="contact-beautify-anim p-10 md:p-16 rounded-[40px] bg-white/[0.02] border border-white/10 backdrop-blur-3xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]">
          <div className="flex justify-between items-start mb-12">
            <span className="section-label text-cosmo-cyan/50 tracking-[0.5em] text-[10px] uppercase">
              Origin_Signal
            </span>
            <div className="flex gap-6">
              <TacticalDataTag label="Status" value="Linked" colorClass="text-green-400" />
              <TacticalDataTag label="Coord" value="40.71° N" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-outfit font-bold leading-[1.1] mb-8 text-white">
            Initiate <br /> <span className="text-cosmo-cyan">Contact.</span>
          </h1>
          
          <p className="text-xl text-white/50 font-light leading-relaxed mb-16 max-w-md">
            My communication bridge is open for architectural challenges, innovative collaborations, and cosmic inquiries.
          </p>

          <div className="space-y-12">
            <div className="flex items-center gap-8">
               <span className="w-16 h-[1px] bg-white/10"></span>
               <div className="flex gap-6">
                 {[
                   { 
                     name: 'Instagram', 
                     url: 'https://www.instagram.com/_thepejman/',
                     icon: <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z M12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6z M16.5 7.5a.5.5 0 11-1 0 .5.5 0 011 0z" />
                   },
                   { 
                     name: 'LinkedIn', 
                     url: 'https://www.linkedin.com/in/pezhman-mohammadzadeh-21462838a/',
                     icon: <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a2.7 2.7 0 0 0-2.7-2.7c-1.2 0-1.8.7-2.1 1.2v-1h-3v7.8h3v-4.2c0-.2 0-.5.1-.7.2-.5.6-.9 1.2-.9.8 0 1.1.6 1.1 1.5v4.3h3M7.3 18.5V8.8h-3v9.7h3M5.8 7.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                   },
                   { 
                     name: 'GitHub', 
                     url: 'https://github.com/pezhmanmohammadzade',
                     icon: <path d="M12 2A10 10 0 0 0 2 12c0 4.4 2.8 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.8.8.1-.6.4-1 .6-1.3-2.2-.2-4.5-1.1-4.5-4.9 0-1.1.4-1.9 1.1-2.6-.1-.3-.5-1.2.1-2.5 0 0 .8-.3 2.7 1a9.5 9.5 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .6 1.3.2 2.2.1 2.5.7.7 1.1 1.5 1.1 2.6 0 3.8-2.3 4.7-4.5 4.9.3.3.6.9.6 1.8v2.7c0 .3.2.6.7.5A10 10 0 0 0 12 2z" />
                   }
                 ].map(social => (
                   <a 
                    key={social.name} 
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow Pezhman on ${social.name}`}
                    className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/30 hover:text-cosmo-cyan transition-all duration-500 hover:scale-110 hover:bg-cosmo-cyan/10 hover:border-cosmo-cyan/40 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] group"
                   >
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                       {social.icon}
                     </svg>
                   </a>
                 ))}
               </div>
            </div>
          </div>
        </div>

        {/* TRANSMISSION PORTAL (Right Side / Form) */}
        <div className="contact-beautify-anim p-10 md:p-16 rounded-[40px] bg-white/[0.02] border border-white/10 backdrop-blur-3xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]">
          <div className="flex justify-between items-start mb-12">
            <span className="section-label text-cosmo-purple/50 tracking-[0.5em] text-[10px] uppercase">
              Comm_Channel
            </span>
            <TacticalDataTag label="Encryption" value="Quantum_256" colorClass="text-cosmo-cyan" />
          </div>

          <form 
            name="contact"
            method="POST"
            data-netlify="true"
            className="space-y-12"
          >
            <input type="hidden" name="form-name" value="contact" />
            
            <div className="relative group">
              <input 
                id="contact-name"
                name="name"
                type="text" 
                required 
                className="w-full bg-transparent border-b border-white/10 py-4 text-white text-lg placeholder-transparent focus:outline-none focus:border-cosmo-blue transition-all duration-500 peer" 
                placeholder="Name" 
              />
              <label htmlFor="contact-name" className="absolute left-0 top-4 text-white/20 text-[10px] uppercase tracking-[0.3em] transition-all duration-500 peer-focus:-top-6 peer-focus:text-cosmo-blue peer-valid:-top-6 peer-valid:text-white/40 pointer-events-none">
                Identifier
              </label>
            </div>

            <div className="relative group">
              <input 
                id="contact-email"
                name="email"
                type="email" 
                required 
                className="w-full bg-transparent border-b border-white/10 py-4 text-white text-lg placeholder-transparent focus:outline-none focus:border-cosmo-purple transition-all duration-500 peer" 
                placeholder="Email" 
              />
              <label htmlFor="contact-email" className="absolute left-0 top-4 text-white/20 text-[10px] uppercase tracking-[0.3em] transition-all duration-500 peer-focus:-top-6 peer-focus:text-cosmo-purple peer-valid:-top-6 peer-valid:text-white/40 pointer-events-none">
                Return Vector
              </label>
            </div>

            <div className="relative group">
              <input 
                id="contact-message"
                name="message"
                required 
                className="hidden" // Hidden input for label trick if needed, or just use textarea ID
              />
              <textarea 
                id="contact-message-area"
                name="message"
                required 
                className="w-full bg-transparent border-b border-white/10 py-4 text-white text-lg placeholder-transparent focus:outline-none focus:border-cosmo-cyan transition-all duration-500 peer resize-none" 
                rows="3" 
                placeholder="Message"
              ></textarea>
              <label htmlFor="contact-message-area" className="absolute left-0 top-4 text-white/20 text-[10px] uppercase tracking-[0.3em] transition-all duration-500 peer-focus:-top-6 peer-focus:text-cosmo-cyan peer-valid:-top-6 peer-valid:text-white/40 pointer-events-none">
                Payload
              </label>
            </div>

            <button className="w-full py-6 rounded-2xl border border-white/10 text-[10px] font-bold uppercase tracking-[0.5em] transition-all duration-700 bg-white/[0.05] hover:bg-white hover:text-black hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] group overflow-hidden relative">
              <span className="relative z-10">Initiate Transmission</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cosmo-cyan/0 via-white/10 to-cosmo-cyan/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>

            {/* Direct Link Box BEAUTIFIED */}
            <div className="pt-12 border-t border-white/5 mt-16">
              <a 
                href="mailto:pejmanmohamadzade22@gmail.com"
                className="group flex items-center justify-between p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-cosmo-cyan/30 transition-all duration-500"
              >
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase tracking-widest text-white/20 mb-1">Direct Link</span>
                  <span className="text-sm font-mono text-white/60 group-hover:text-cosmo-cyan transition-colors">pejmanmohamadzade22@gmail.com</span>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-cosmo-cyan group-hover:text-black transition-all duration-500">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
              </a>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
