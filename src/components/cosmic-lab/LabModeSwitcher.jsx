import { LAB_MODES, modeConfigs } from '../../data/cosmicLabModes';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function LabModeSwitcher({ currentMode, onModeChange }) {
  return (
    <div className="flex items-center gap-0 bg-white/5 border border-white/10 rounded-sm overflow-hidden p-1 shadow-2xl backdrop-blur-xl">
      {Object.values(LAB_MODES).map((mode) => {
        const isActive = currentMode === mode;
        const config = modeConfigs[mode];
        
        return (
          <button
            key={mode}
            onClick={() => onModeChange(mode)}
            className={cn(
              "relative px-10 py-3 text-[9px] font-black uppercase tracking-[0.3em] transition-all duration-300",
              isActive 
                ? "text-black bg-white shadow-[0_0_20px_rgba(255,255,255,0.4)]" 
                : "text-white/40 hover:text-white hover:bg-white/5"
            )}
          >
            <span className="relative z-10">{mode}</span>
            {isActive && (
              <div 
                className="absolute top-0 left-0 w-1 h-full"
                style={{ backgroundColor: config.accent }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
