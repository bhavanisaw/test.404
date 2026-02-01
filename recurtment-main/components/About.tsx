
import React from 'react';

export const About: React.FC = () => {
  return (
    <section className="relative min-h-[60vh] md:min-h-[50vh] flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-black border border-[#333] overflow-hidden group shadow-[0_0_80px_rgba(255,0,255,0.05)]">
        {/* Subtle Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
          <div className="w-full h-[2px] bg-[#00FF00]/10 animate-[scanline_6s_linear_infinite]" />
        </div>
        
        <div className="p-8 md:p-12 h-full flex flex-col font-mono relative z-10">
            <div className="flex items-center space-x-3 mb-8">
                <div className="w-2 h-2 md:w-3 h-3 bg-[#00FF00] rounded-full animate-pulse shadow-[0_0_10px_#00FF00]" />
                <h2 className="text-[#00FF00] text-xl md:text-3xl font-bold uppercase tracking-widest border-b-2 border-[#00FF00] pb-1">
                  NETRA CORE PROTOCOL
                </h2>
            </div>

            <div className="space-y-8 md:space-y-10 text-base md:text-2xl">
                <p className="text-[#00FF00] leading-relaxed flex items-start group/line">
                    <span className="text-[#FF00FF] mr-6 font-bold">01</span> 
                    <span className="text-white group-hover/line:text-[#00FF00] transition-colors duration-300">
                      Operating from the void, we forge firewalls that <span className="bg-[#FF00FF]/20 px-1 text-[#FF00FF] font-bold">devour</span> exploits alive.
                    </span>
                </p>
                <p className="text-[#00FF00] leading-relaxed flex items-start group/line">
                    <span className="text-[#FF00FF] mr-6 font-bold">02</span> 
                    <span className="text-white group-hover/line:text-[#00FF00] transition-colors duration-300">
                      AI vs AI Armageddon. We script the <span className="bg-[#00FFFF]/20 px-1 text-[#00FFFF] font-bold">apocalypse</span> – and the victory code.
                    </span>
                </p>
                <p className="text-[#00FF00] leading-relaxed flex items-start group/line">
                    <span className="text-[#FF00FF] mr-6 font-bold">03</span> 
                    <span className="text-white group-hover/line:text-[#00FF00] transition-colors duration-300">
                      No podiums. We guard the arteries of digital <span className="underline decoration-[#FF00FF] underline-offset-4">empires</span>.
                    </span>
                </p>
            </div>

            <div className="mt-16 flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6 sm:gap-0 border-t border-[#333] pt-8">
                <div className="text-[10px] md:text-xs text-white/40 font-mono text-center sm:text-left tracking-[0.2em] uppercase">
                    [SEC_PROTOCOL: VANTAGE_POINT]<br/>
                    [NODE_CLUSTER: CRYPTO_VOID_7]
                </div>
                <div className="text-center sm:text-right w-full sm:w-auto">
                    <a 
                      href="#recruitment-form" 
                      className="group relative inline-block text-[#FF00FF] uppercase text-sm md:text-xl font-bold transition-all hover:text-[#00FFFF]"
                    >
                        <span className="relative z-10">↓ DECODING_TALENT</span>
                        <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#FF00FF] scale-x-100 group-hover:bg-[#00FFFF] transition-colors" />
                    </a>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};
