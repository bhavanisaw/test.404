
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative py-20 px-6 border-t border-[#333] flex flex-col items-center justify-center bg-black">
        <div className="mb-8 text-center">
            <div className="text-[#FF0000] font-mono text-sm animate-pulse mb-2 tracking-[0.3em] uppercase">
                DARK_MATRIX DENIED – ELITE CLEARANCE NEEDED
            </div>
            <div className="h-[1px] w-64 bg-gradient-to-r from-transparent via-[#FF0000] to-transparent mx-auto" />
        </div>

        <div className="text-[#00FF00]/40 font-mono text-[10px] tracking-widest uppercase text-center space-y-2 mt-8">
            <div>© 2026 Netra Ops. Forged in the abyss.</div>
            <div>[NEURAL_LINK: ACTIVE] [QUANTUM_PING: 0.001ms] [PROTOCOL: OMEGA-9]</div>
        </div>

        {/* Floating Matrix Elements in Footer */}
        <div className="absolute left-10 bottom-10 opacity-10 pointer-events-none text-xs text-[#00FF00] font-mono hidden md:block">
            SCANNING...<br/>
            ROOT_ACCESS: DENIED<br/>
            ENCRYPTION: AES-256-GCM
        </div>
    </footer>
  );
};
