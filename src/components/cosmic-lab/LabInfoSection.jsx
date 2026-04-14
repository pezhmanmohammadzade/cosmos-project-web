import { modeConfigs, LAB_MODES } from '../../data/cosmicLabModes';
import { clsx } from 'clsx';

export default function LabInfoSection({ currentMode, onModeSelect }) {
  const modes = Object.entries(modeConfigs);

  const handleLearnMore = (mode) => {
    onModeSelect(mode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24 border-t border-white/5 bg-cosmo-dark">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {modes.map(([key, config]) => {
          const isActive = currentMode === key;
          
          return (
            <div 
              key={key} 
              className={clsx(
                "group relative p-8 rounded-3xl transition-all duration-500 overflow-hidden border",
                isActive 
                  ? "bg-white/[0.05] border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.05)]" 
                  : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/10"
              )}
            >
              {/* Background Glow */}
              <div 
                className={clsx(
                  "absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] transition-opacity duration-700",
                  isActive ? "opacity-30" : "opacity-0 group-hover:opacity-20"
                )}
                style={{ backgroundColor: config.accent }}
              />
              
              <div className="relative z-10">
                <div className="mb-6 flex items-center justify-between">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 bg-white/5"
                    style={{ color: config.accent }}
                  >
                    {key === LAB_MODES.EXPLORE && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                    {key === LAB_MODES.ORBIT && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 7v5l3 3" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                    {key === LAB_MODES.NEBULA && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                      </svg>
                    )}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">
                    {isActive ? 'Current Phase' : `Phase 0${key === LAB_MODES.EXPLORE ? '1' : key === LAB_MODES.ORBIT ? '2' : '3'}`}
                  </span>
                </div>

                <h3 className="text-2xl font-outfit font-bold text-white mb-4 group-hover:translate-x-1 transition-transform duration-500">
                  {config.title}
                </h3>
                
                <p className="text-white/40 text-sm leading-relaxed mb-8">
                  {config.description} Explore the underlying mathematics and physics that drive this cosmic simulation module.
                </p>

                <button 
                  onClick={() => handleLearnMore(key)}
                  className={clsx(
                    "flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all group-hover:gap-4 duration-300",
                    isActive ? "text-white" : "text-white/60 hover:text-white"
                  )}
                >
                  <span>{isActive ? 'Active Module' : 'Learn More'}</span>
                  <span style={{ color: config.accent }}>→</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Branding */}
      <div className="mt-32 flex flex-col items-center">
        <div className="w-px h-24 bg-gradient-to-b from-white/10 to-transparent mb-12" />
        <h2 className="text-4xl md:text-6xl font-outfit font-black text-white/5 uppercase tracking-tighter text-center">
          The Universe is the Laboratory
        </h2>
      </div>
    </div>
  );
}
