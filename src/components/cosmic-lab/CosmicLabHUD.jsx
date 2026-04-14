import { useMemo } from 'react';
import { modeConfigs } from '../../data/cosmicLabModes';
import { HUD_TELEMETRY, HUD_COORDINATES, HUD_STATUS } from '../../data/hudData';
import LabModeSwitcher from './LabModeSwitcher';

export default function CosmicLabHUD({ currentMode, onModeChange }) {
  const config = useMemo(() => modeConfigs[currentMode], [currentMode]);

  return (
    <div className="fixed inset-0 z-30 pointer-events-none p-6 md:p-10 font-mono text-[9px] uppercase tracking-[0.2em]">
      
      {/* --- TOP-LEFT 3D GUIDANCE BOX --- */}
      <div className="absolute top-10 left-10 flex items-center gap-6 animate-fade-in pointer-events-auto group">
        <div className="relative w-8 h-8 preserve-3d group-hover:scale-110 transition-transform duration-500">
          {/* Wireframe Cube */}
          <div className="absolute inset-0 border border-white/20 animate-cube-rotate" />
          <div className="absolute inset-0 border border-white/10 rotate-45 scale-75" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-white/40 animate-pulse" style={{ backgroundColor: config.accent }} />
          </div>
        </div>
        
        <div className="flex flex-col gap-1">
          <span className="text-[7px] text-white/20 tracking-[0.6em] font-black">SYSTEM_INTERFACE</span>
          <div className="h-px w-8 bg-white/10" />
          <span className="text-[9px] text-white/60 tracking-[0.2em]">DRAG_TO_ROTATE</span>
        </div>
      </div>

      {/* --- BOTTOM TACTICAL TRAY --- */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-8 pointer-events-auto animate-slide-up w-full max-w-2xl px-6">
        <div className="flex items-center gap-12 w-full justify-center">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
          <div className="flex flex-col items-center gap-3">
             <span className="text-[8px] text-white/20 font-black tracking-[0.6em]">MODE_SELECT</span>
             <LabModeSwitcher currentMode={currentMode} onModeChange={onModeChange} />
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>
        
        <div className="flex items-center gap-4">
           <div className="w-12 h-px bg-white/20 animate-pulse" />
           <span className="text-[7px] text-white/10 tracking-[1em]">INTERACTIVE_SIMULATION_ACTIVE</span>
           <div className="w-12 h-px bg-white/20 animate-pulse" />
        </div>
      </div>

      <style jsx>{`
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
