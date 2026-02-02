import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';

// Import Supabase client
import { createClient } from '@supabase/supabase-js';

export const RecruitmentForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    handle: '',
    skills: '',
    why: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const shockRef = useRef<HTMLDivElement>(null);

  const handleHover = () => {
    if (buttonRef.current) {
      // High-frequency jitter on hover
      gsap.to(buttonRef.current, {
        x: "random(-4, 4)",
        y: "random(-4, 4)",
        repeat: -1,
        duration: 0.05,
        ease: "none"
      });
      // Shockwave pulse
      if (shockRef.current) {
        gsap.fromTo(shockRef.current, 
          { scale: 0.8, opacity: 0.8 },
          { scale: 1.5, opacity: 0, duration: 0.6, repeat: -1, ease: "power2.out" }
        );
      }
    }
  };

  const handleHoverExit = () => {
    if (buttonRef.current) {
      gsap.killTweensOf(buttonRef.current);
      gsap.to(buttonRef.current, { x: 0, y: 0, duration: 0.2 });
      if (shockRef.current) {
        gsap.killTweensOf(shockRef.current);
        gsap.to(shockRef.current, { opacity: 0, scale: 1 });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError(null);

  const message = `
🚨 NETRA RECRUITMENT 🚨

Name: ${formData.name}
Email: ${formData.email}
Handle: ${formData.handle}
Skills: ${formData.skills}
Why Join: ${formData.why}

Injected via CyberShield Test
`;

  const encoded = encodeURIComponent(message.trim());
  const whatsappUrl = `https://wa.me/917028189554?text=${encoded}`;

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  try {
    if (supabaseUrl && supabaseAnonKey) {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      const { error } = await supabase.from("applications").insert([{
        name: formData.name,
        email: formData.email,
        handle: formData.handle,
        skills: formData.skills,
        why: formData.why
      }]);

      if (error) throw error;
    }

    const tl = gsap.timeline();
    tl.to(".form-container", {
      scale: 0.2,
      rotate: 720,
      filter: "blur(40px) brightness(300%)",
      opacity: 0,
      duration: 1.2,
      ease: "back.in(2)",
      onComplete: () => {
        setSuccess(true);
        window.open(whatsappUrl, "_blank");
      }
    });

  } catch (err) {
    console.error(err);
    window.open(whatsappUrl, "_blank"); // still send
  } finally {
    setIsSubmitting(false);
  }
};

  const inputClass = "w-full bg-black/40 border-b-2 border-[#00FF00]/30 p-3 md:p-4 font-mono text-[#00FF00] text-sm md:text-base outline-none transition-all focus:border-[#FF00FF] focus:bg-[#FF00FF]/5 hover:border-[#00FFFF] placeholder:text-[#00FF00]/40";

  return (
    <section id="recruitment-form" className="relative py-20 md:py-32 px-4 md:px-6 flex items-center justify-center overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-radial-gradient from-[#00FF00]/5 to-transparent pointer-events-none" />
      
      <div className="form-container relative w-full max-w-2xl z-20 mx-auto">
        <div className="absolute -inset-4 bg-gradient-to-r from-[#00FF00] via-[#FF00FF] to-[#00FFFF] opacity-10 blur-3xl pointer-events-none" />
        
        <div className="bg-black border border-[#00FF00]/50 p-6 md:p-12 shadow-[0_0_50px_rgba(0,255,0,0.15)] relative overflow-hidden">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00FF00]" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#FF00FF]" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#00FFFF]" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#00FF00]" />

            <h2 className="text-xl md:text-3xl font-bold text-[#00FF00] mb-8 uppercase tracking-[0.2em] md:tracking-widest text-center relative">
               <span className="relative z-10">INITIATE HANDSHAKE</span>
               <div className="absolute inset-0 blur-sm opacity-30 select-none pointer-events-none text-[#FF00FF]">INITIATE HANDSHAKE</div>
            </h2>

            {success ? (
                <div className="text-center py-10 md:py-20">
                    <div className="text-[#FF00FF] text-xl md:text-4xl font-bold mb-4 animate-bounce uppercase">ACCESS VECTOR ESTABLISHED</div>
                    <p className="text-[#00FFFF] font-mono text-xs md:text-sm uppercase tracking-widest">APPLICATION RECEIVED. AWAITING REVIEW...</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <input 
                            required
                            type="text" 
                            placeholder="OPERATIVE_NAME" 
                            className={inputClass}
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                        <input 
                            required
                            type="email" 
                            placeholder="COMM_LINK (EMAIL)" 
                            className={inputClass}
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                    
                    <input 
                        type="text" 
                        placeholder="DISCORD / LINKEDIN_NODE" 
                        className={inputClass}
                        value={formData.handle}
                        onChange={(e) => setFormData({...formData, handle: e.target.value})}
                    />

                    <textarea 
                        rows={3}
                        placeholder="TECHNICAL_EXPERTISE_PAYLOAD" 
                        className={inputClass}
                        value={formData.skills}
                        onChange={(e) => setFormData({...formData, skills: e.target.value})}
                    />

                    <textarea 
                        rows={3}
                        placeholder="WHY NETRA SHOULD CHOOSE YOU ?" 
                        className={inputClass}
                        value={formData.why}
                        onChange={(e) => setFormData({...formData, why: e.target.value})}
                    />

                    {error && (
                      <div className="text-red-500 text-sm font-mono p-2 bg-red-900/30 border border-red-500 rounded">
                        ERROR: {error}
                      </div>
                    )}

                    <div className="relative group pt-4 md:pt-8">
                      {/* Shockwave Element */}
                      <div 
                        ref={shockRef}
                        className="absolute inset-0 border-4 border-[#00FF00] opacity-0 pointer-events-none rounded-sm"
                      />
                      
                      {/* Glitch Ghost Layers */}
                      <div className="absolute inset-0 bg-[#FF00FF] opacity-0 group-hover:opacity-40 -translate-x-1 -translate-y-1 transition-all duration-75 blur-sm" />
                      <div className="absolute inset-0 bg-[#00FFFF] opacity-0 group-hover:opacity-40 translate-x-1 translate-y-1 transition-all duration-75 blur-sm" />

                      <button 
                          ref={buttonRef}
                          onMouseEnter={handleHover}
                          onMouseLeave={handleHoverExit}
                          disabled={isSubmitting}
                          type="submit"
                          className="relative w-full py-4 md:py-6 bg-[#00FF00] text-black font-extrabold text-lg md:text-2xl uppercase tracking-[0.3em] md:tracking-[0.6em] transition-all hover:bg-white active:scale-95 disabled:opacity-50 overflow-hidden"
                      >
                          <span className="relative z-10 group-hover:animate-pulse">
                            {isSubmitting ? "INJECTING..." : "INJECT_CODE"}
                          </span>
                          
                          {/* Inner Scanline */}
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-transparent h-4 -translate-y-full group-hover:animate-[scanline_1s_linear_infinite]" />
                          
                          {/* Shard Particles on Hover (Pseudo) */}
                          <div className="absolute top-0 left-0 w-full h-full pointer-events-none group-hover:bg-[radial-gradient(circle,rgba(255,0,255,0.2)_1px,transparent_1px)] bg-[size:10px_10px]" />
                      </button>
                    </div>
                </form>
            )}
        </div>
      </div>
    </section>
  );
};