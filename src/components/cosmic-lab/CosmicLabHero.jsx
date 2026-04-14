import { useMemo } from 'react';
import { modeConfigs } from '../../data/cosmicLabModes';
import LabModeSwitcher from './LabModeSwitcher';

export default function CosmicLabHero({ currentMode, onModeChange }) {
  const config = useMemo(() => modeConfigs[currentMode], [currentMode]);

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pointer-events-none">
      <div className="flex flex-col items-center text-center">
        {/* Guidance Badge - Minimal Top Style */}
        <div className="mb-6 animate-fade-in pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-sm">
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30">Drag to Rotate • Select Modes to Explore</span>
          </div>
        </div>

        {/* Top-Aligned Content (No Central Box) */}
        <div className="relative z-10 pointer-events-auto">
          {/* Header Section */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: config.accent, boxShadow: `0 0 10px ${config.accent}` }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">Research Facility</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-outfit font-black tracking-tight mb-4 text-white uppercase italic text-glow transition-all duration-700" style={{ '--tw-shadow-color': config.accent }}>
            Cosmic <span className="text-transparent bg-clip-text bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, white, ${config.accent})` }}>Lab</span>
          </h1>

          <p className="max-w-xl mx-auto text-sm md:text-md text-white/70 font-medium leading-relaxed mb-8 animate-slide-up drop-shadow-xl">
            {config.description}
          </p>

          <div className="flex justify-center">
            <LabModeSwitcher currentMode={currentMode} onModeChange={onModeChange} />
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white vertical-text">Explore</span>
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
      </div>

      <style>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 1s ease-out 0.2s forwards;
        }
      `}</style>
    </div>
  );
}
