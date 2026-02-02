
import React from 'react';

interface SkillOrbProps {
  text: string;
}

const SkillOrb: React.FC<SkillOrbProps> = ({ text }) => (
  <div className="flex items-center space-x-3 group cursor-help">
    <div className="w-2.5 h-2.5 min-w-[10px] rounded-full bg-[#00FF00] group-hover:bg-[#FF00FF] group-hover:shadow-[0_0_15px_#FF00FF] transition-all shadow-[0_0_8px_#00FF00]" />
    <span className="text-[#00FFFF] font-mono text-xs sm:text-sm group-hover:translate-x-2 transition-transform duration-200">
      {text}
    </span>
  </div>
);

interface SkillCategoryProps {
  title: string;
  skills: string[];
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ title, skills }) => (
  <div className="space-y-3">
    <h5 className="text-[#FF00FF] font-mono text-[10px] tracking-[0.2em] uppercase opacity-70 border-l border-[#FF00FF] pl-2">
      {title}
    </h5>
    <div className="grid grid-cols-1 gap-2">
      {skills.map((skill) => (
        <SkillOrb key={skill} text={skill} />
      ))}
    </div>
  </div>
);

export const Teaser: React.FC = () => {
  return (
    <section className="relative py-20 md:py-32 px-4 md:px-6 bg-black overflow-hidden">
      {/* Background Glitch Elements - Subtle and non-obstructive */}
      <div className="absolute top-0 right-4 md:right-10 text-[#00FF00]/5 font-mono text-4xl md:text-8xl pointer-events-none select-none uppercase">
          Neural_Net_Link
      </div>
      <div className="absolute bottom-10 left-4 md:left-10 text-[#FF00FF]/5 font-mono text-4xl md:text-8xl pointer-events-none select-none uppercase">
          Shadow_Ops
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
        <div className="space-y-10 md:space-y-16">
           <div className="border-l-4 border-[#FF00FF] pl-5 md:pl-8 py-3 md:py-6">
              <h3 className="text-[#FF00FF] text-xl md:text-3xl font-bold mb-3 uppercase tracking-tight">Zero-day killchains. Deployed.</h3>
              <p className="text-gray-400 font-mono text-sm md:text-base leading-relaxed">
                High-velocity exploit synthesis – we don't detect; we precipitate failure.
              </p>
           </div>
           
           <div className="border-l-4 border-[#00FFFF] pl-5 md:pl-8 py-3 md:py-6">
              <h3 className="text-[#00FFFF] text-xl md:text-3xl font-bold mb-3 uppercase tracking-tight">Techfest engineered. Elite core.</h3>
              <p className="text-gray-400 font-mono text-sm md:text-base leading-relaxed">
                Apocalypse-grade architecture. Victory as baseline protocol.
              </p>
           </div>

           <div className="border-l-4 border-[#00FF00] pl-5 md:pl-8 py-3 md:py-6">
              <h3 className="text-[#00FF00] text-xl md:text-3xl font-bold mb-3 uppercase tracking-tight">Threat termination protocols.</h3>
              <p className="text-gray-400 font-mono text-sm md:text-base leading-relaxed">
                Light-speed evolution. Adversarial AIs neutralized pre-ignition.
              </p>
           </div>
        </div>

        <div className="bg-[#0A0A0A] border border-[#00FF00]/20 p-6 md:p-10 rounded-sm backdrop-blur-md relative z-10 shadow-[0_0_40px_rgba(0,255,0,0.05)]">
            <h4 className="text-[#00FF00] text-xs font-mono mb-10 tracking-[0.6em] uppercase border-b border-[#00FF00]/20 pb-4 flex justify-between items-center">
               <span className="flex items-center">
                 TARGET-SKILLSZ
                 <span className="animate-pulse ml-1">_</span>
               </span>
            </h4>
            
            <div className="grid grid-cols-1 gap-10">
                <SkillCategory 
                    title="Software / UI / Dev" 
                    skills={[
                        "UI/UX design (with intent)",
                        "Database design",
                        "API logic",
                        "Cloud infrastructure",
                        "Deployment",
                        "Debugging",
                        "Web hosting",
                        "Code quality"
                    ]} 
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <SkillCategory 
                        title="Networking / Core" 
                        skills={["Network fundamentals"]} 
                    />
                    
                    <SkillCategory 
                        title="Hardware / Electronics" 
                        skills={[
                            "SoCs (System on Chip)",
                            "Electronics assembly",
                            "Programming fundamentals"
                        ]} 
                    />
                </div>

                <div className="pt-4 border-t border-[#333]">
                     <h5 className="text-[#00FFFF] font-mono text-[10px] tracking-[0.2em] uppercase mb-4">CRITICAL_TRAITS</h5>
                     <div className="bg-[#FF00FF]/5 p-4 border-l-2 border-[#FF00FF]">
                        <p className="text-[#FF00FF] font-mono text-xs sm:text-sm leading-relaxed">
                            <span className="font-bold">DISCIPLINE, DISCRETION, EXECUTION</span><br/>
                            <span className="opacity-70 text-[10px] mt-2 block">(THE REAL FILTER)</span>
                        </p>
                     </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};
