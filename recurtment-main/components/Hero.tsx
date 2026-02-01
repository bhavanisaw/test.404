
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

export const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState("");
  const targetText = "NETRA RECRUITMENT";
  const buttonRef = useRef<HTMLButtonElement>(null);
  const shockwaveRef = useRef<HTMLDivElement>(null);
  const glitchRef1 = useRef<HTMLDivElement>(null);
  const glitchRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        targetText.split("").map((char, index) => {
          if (index < iteration) {
            return targetText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      
      if (iteration >= targetText.length) {
        clearInterval(interval);
      }
      
      iteration += 1/3;
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const handleMouseEnter = () => {
    if (buttonRef.current) {
      // Intense Jitter
      gsap.to(buttonRef.current, {
        x: "random(-5, 5)",
        y: "random(-5, 5)",
        repeat: -1,
        duration: 0.04,
        ease: "none"
      });

      // Glitch Ghosts
      if (glitchRef1.current && glitchRef2.current) {
        gsap.to(glitchRef1.current, {
          x: -15,
          y: 5,
          opacity: 0.7,
          duration: 0.1,
          repeat: -1,
          yoyo: true,
          ease: "none"
        });
        gsap.to(glitchRef2.current, {
          x: 15,
          y: -5,
          opacity: 0.7,
          duration: 0.1,
          repeat: -1,
          yoyo: true,
          ease: "none",
          delay: 0.05
        });
      }

      // Shockwave Pulse
      if (shockwaveRef.current) {
        gsap.fromTo(shockwaveRef.current, 
          { scale: 0.5, opacity: 1, borderWeight: "10px" },
          { scale: 2.5, opacity: 0, borderWeight: "1px", duration: 0.8, repeat: -1, ease: "power2.out" }
        );
      }
    }
  };

  const handleMouseLeave = () => {
    if (buttonRef.current) {
      gsap.killTweensOf(buttonRef.current);
      gsap.to(buttonRef.current, { x: 0, y: 0, duration: 0.2 });
      
      if (glitchRef1.current && glitchRef2.current) {
        gsap.killTweensOf(glitchRef1.current);
        gsap.killTweensOf(glitchRef2.current);
        gsap.to([glitchRef1.current, glitchRef2.current], { x: 0, y: 0, opacity: 0, duration: 0.2 });
      }

      if (shockwaveRef.current) {
        gsap.killTweensOf(shockwaveRef.current);
        gsap.to(shockwaveRef.current, { opacity: 0, scale: 0.5 });
      }
    }
  };

  const scrollToForm = () => {
      document.getElementById('recruitment-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section relative min-h-screen w-full flex flex-col items-center justify-center p-4 text-center overflow-hidden">
      <div className="hero-overlay absolute inset-0 bg-gradient-to-b from-transparent to-black pointer-events-none z-0" />
      
      <div className="z-10 w-full max-w-6xl mx-auto px-4 relative">
        <div className="mb-8">
          <h1 
            className="font-bold text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-[#00FF00] tracking-tighter uppercase break-words leading-none hover-glitch transition-all duration-75 cursor-default"
            style={{ textShadow: '0 0 15px rgba(0, 255, 0, 0.4)' }}
          >
            {displayText}
          </h1>
        </div>
        
        <p className="text-[#FF00FF] font-mono text-sm sm:text-lg md:text-2xl mb-12 opacity-100 uppercase tracking-[0.15em] max-w-3xl mx-auto leading-relaxed">
           Elite cybersecurity phantoms: <span className="text-white font-bold border-b border-[#00FFFF]">Hackers</span>. <span className="text-white font-bold border-b border-[#00FFFF]">Coders</span>. <span className="text-white font-bold border-b border-[#00FFFF]">Digital ghosts</span>.
           <br className="hidden sm:block"/>
           <span className="text-[#00FFFF] font-bold mt-4 inline-block animate-pulse">BECOME THE UNSEEN BLADE.</span>
        </p>

        <div className="relative inline-block mt-4 group">
            {/* Shockwave Rings */}
            <div 
              ref={shockwaveRef}
              className="absolute inset-0 border-[10px] border-[#00FF00] rounded-sm pointer-events-none opacity-0 z-0"
            />
            
            {/* Glitch Ghosts */}
            <div 
              ref={glitchRef1}
              className="absolute inset-0 bg-[#FF00FF] opacity-0 z-0 pointer-events-none mix-blend-screen blur-[2px]"
              style={{ clipPath: 'polygon(0 15%, 100% 15%, 100% 25%, 0 25%, 0 50%, 100% 50%, 100% 60%, 0 60%)' }}
            />
            <div 
              ref={glitchRef2}
              className="absolute inset-0 bg-[#00FFFF] opacity-0 z-0 pointer-events-none mix-blend-screen blur-[2px]"
              style={{ clipPath: 'polygon(0 30%, 100% 30%, 100% 45%, 0 45%, 0 75%, 100% 75%, 100% 85%, 0 85%)' }}
            />

            <button 
              ref={buttonRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={scrollToForm}
              className="relative px-12 py-5 md:px-20 md:py-8 bg-black border-2 border-[#00FF00] text-[#00FF00] font-black text-xl md:text-3xl uppercase tracking-[0.4em] transition-all shadow-[0_0_30px_rgba(0,255,0,0.3)] overflow-hidden"
            >
              <span className="relative z-20 transition-colors duration-200 group-hover:text-black">
                BREACH_ENTRY
              </span>

              {/* Background Fill Glitch */}
              <div className="absolute inset-0 bg-[#00FF00] translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out z-10" />
              
              {/* Internal Static Noise (Pseudo) */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 z-20 pointer-events-none bg-[url('https://media.giphy.com/media/oEI9uWUic9VKM/giphy.gif')] bg-cover" />

              {/* Scanline Sweep */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-white opacity-0 group-hover:opacity-100 group-hover:animate-[scanline_0.5s_linear_infinite] z-30" />
            </button>
            
            {/* Ambient Aura */}
            <div className="absolute -inset-4 bg-[#00FF00] opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-300 pointer-events-none" />
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden sm:flex flex-col items-center opacity-40">
          <span className="text-[#00FFFF] text-[10px] font-mono tracking-widest uppercase">Initiate Handshake</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#00FFFF] to-transparent mt-2" />
      </div>
    </section>
  );
};
