import { useMemo } from 'react';
import { modeConfigs, LAB_MODES } from '../../data/cosmicLabModes';
import LabModeSwitcher from './LabModeSwitcher';

export default function CosmicLabHUD({ currentMode, onModeChange, isInteractive, onInteractiveToggle }) {
  const config = useMemo(() => modeConfigs[currentMode] || {}, [currentMode]);

  return (
    <div className="fixed inset-0 z-30 pointer-events-none p-6 md:p-10 font-mono text-[9px] uppercase tracking-[0.2em]">
      
      {/* --- TOP-LEFT 3D GUIDANCE BOX --- */}
      <div className="absolute top-10 left-10 flex items-center gap-6 animate-fade-in pointer-events-auto group">
        <div className="relative w-8 h-8 preserve-3d group-hover:scale-110 transition-transform duration-500">
          <div className="absolute inset-0 border border-white/20 animate-cube-rotate" />
          <div className="absolute inset-0 border border-white/10 rotate-45 scale-75" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-white/40 animate-pulse" style={{ backgroundColor: config.accent || '#fff' }} />
          </div>
        </div>
        
        <div className="flex flex-col gap-1">
          <span className="text-[7px] text-white/20 tracking-[0.6em] font-black">SYSTEM_INTERFACE</span>
          <div className="h-px w-8 bg-white/10" />
          <button 
            onClick={onInteractiveToggle}
            className={`text-[9px] tracking-[0.2em] transition-colors duration-300 text-left hover:text-white ${isInteractive ? 'text-cosmo-cyan' : 'text-white/60'}`}
          >
            {isInteractive ? '> INTERACTIVE_MODE: ON' : '> ENABLE_INTERACTION'}
          </button>
        </div>
      </div>

      {/* --- LOWER SIDE TELEMETRY PANELS --- */}
      <div className="absolute bottom-32 right-10 flex flex-col gap-8 animate-fade-in delay-500 text-right">
        <div className="flex flex-col gap-4 border-r border-white/10 pr-6 items-end">
          <span className="text-[7px] text-white/20 font-black tracking-[0.6em]">SCI_METRICS</span>
          {currentMode === LAB_MODES.ORBIT && (
            <>
              <div className="flex flex-col items-end">
                <span className="text-white/40">G_CONSTANT</span>
                <span className="text-[9px] text-white/80 tracking-widest">6.6743E-11</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-white/40">ORBIT_EPOCH</span>
                <span className="text-[9px] text-white/80 tracking-widest">J2000.0</span>
              </div>
            </>
          )}
          {currentMode === LAB_MODES.NEBULA && (
            <>
              <div className="flex flex-col items-end">
                <span className="text-white/40">S-II_CONC</span>
                <span className="text-[9px] text-[#FF4500] tracking-widest">0.428 MG/M3</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-white/40">H-ALPHA</span>
                <span className="text-[9px] text-[#76FF03] tracking-widest">1.124 MG/M3</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-white/40">O-III_SIG</span>
                <span className="text-[9px] text-[#00D2FF] tracking-widest">0.892 MG/M3</span>
              </div>
            </>
          )}
          {currentMode === LAB_MODES.EXPLORE && (
            <>
              <div className="flex flex-col items-end">
                <span className="text-white/40">STAR_COUNT</span>
                <span className="text-[9px] text-white/80 tracking-widest">6,124</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-white/40">GAIA_REF</span>
                <span className="text-[9px] text-white/80 tracking-widest">DR3-A.1</span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="absolute bottom-32 left-10 flex flex-col gap-8 animate-fade-in delay-500">
        <div className="flex flex-col gap-4 border-l border-white/10 pl-6 items-start">
          <span className="text-[7px] text-white/20 font-black tracking-[0.6em]">POSITIONAL_DATA</span>
          <div className="flex flex-col items-start">
            <span className="text-white/40">COORD_X</span>
            <span className="text-[9px] text-white/80 tracking-widest">± 12.049.21</span>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-white/40">COORD_Y</span>
            <span className="text-[9px] text-white/80 tracking-widest">± 08.112.44</span>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-white/40">COORD_Z</span>
            <span className="text-[9px] text-white/80 tracking-widest">± 04.992.81</span>
          </div>
        </div>
      </div>

      {/* --- BOTTOM TACTICAL TRAY --- */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 pointer-events-auto animate-slide-up w-full max-w-2xl px-6">
        <div className="flex items-center gap-10 w-full justify-center opacity-40 hover:opacity-100 transition-opacity duration-500">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
          <div className="flex flex-col items-center gap-2">
             <span className="text-[7px] text-white/20 font-black tracking-[0.6em]">MODE_SELECT</span>
             <LabModeSwitcher currentMode={currentMode} onModeChange={onModeChange} />
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>
        
        <div className="flex items-center gap-4">
           <div className="w-10 h-px bg-white/10" />
           <span className="text-[7px] text-white/10 tracking-[1em]">SYSTEM_READY_STABLE</span>
           <div className="w-10 h-px bg-white/10" />
        </div>
      </div>

      <style>{`
        @keyframes cube-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .animate-cube-rotate {
          animation: cube-rotate 8s linear infinite;
        }
        @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes slide-up { 0% { opacity: 0; transform: translate(-50%, 20px); } 100% { opacity: 1; transform: translate(-50%, 0); } }
        .animate-fade-in { animation: fade-in 1.5s ease-out forwards; }
        .animate-slide-up { animation: slide-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
}
